import React, { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';
import { Twitter, Globe, ArrowUp, ArrowDown } from "react-feather";
import { formatName, getTokenPrice, getTokenPercentage, formatAmount, getUrlFromName } from '../../../helpers/formaters';
import styles from "./Token.module.scss"
import { useRouter } from 'next/router';
import { stableTokens, tokensPerBlockchain, volumeOracles } from '../../../constants';
import axios from 'axios';
import { Flex, Image, useColorModeValue, Button, Input, IconButton } from '@chakra-ui/react';
import { useMediaQuery, Link, Box } from '@chakra-ui/react';
import { createClient, SupabaseClient } from '@supabase/supabase-js'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
async function refreshPrice(contracts: string[], blockchains: string[], pairs: string[], setPrice: Function) {
  let subgraphSuccess = 0;
  let expectedPairs = -1;
  let totalLiquidity = 0;
  let averagePrice = 0;

  for (let i = 0; i < contracts?.length; i++) {
    //Working on volume
    try {
      if (volumeOracles[blockchains[i]]) {
        let currentSubgraph = 0;
        for (const subgraph of volumeOracles[blockchains[i]]) {
          const dead = '0x000000000000000000000000000000000000dead';
          try {
            const { data: result } = await axios.post(subgraph.url, {
              query: `
                              {
                                  tokens(where: {id: "${contracts[i].toLowerCase()}"}) {
                                      id,
                                      ${subgraph.query}
                                  }
                                 pair0:  pairs(where: {id: "${(pairs[i][currentSubgraph][0] ? pairs[i][currentSubgraph][0] : dead).toLowerCase()}"}) {
                                    reserveUSD
                                    reserve0
                                    reserve1
                                    id
                                    token0{
                                      id
                                      }
                                      token1{
                                      id
                                      }
                                    volumeUSD
                                  }
                                  pair1:  pairs(where: {id: "${(pairs[i][currentSubgraph][1] ? pairs[i][currentSubgraph][1] : dead).toLowerCase()}"}) {
                                      reserveUSD
                                      reserve0
                                      reserve1
                                      id
                                      token0{
                                          id
                                      }
                                      token1{
                                          id
                                      }
                                      volumeUSD
                                  }
                                  pair2:  pairs(where: {id: "${(pairs[i][currentSubgraph][2] ? pairs[i][currentSubgraph][2] : dead).toLowerCase()}"}) {
                                      reserveUSD
                                      reserve0
                                      reserve1
                                      id
                                      token0{
                                          id
                                      }
                                      token1{
                                          id
                                      }
                                      volumeUSD
                                  }
                                  eth: pairs(
                                      first:1,
                                      orderBy:reserveUSD,
                                      orderDirection:desc,
                                      where: {
                                          token0_in: ["${tokensPerBlockchain[blockchains[i]][1].toLowerCase()}", "${tokensPerBlockchain[blockchains[i]][0].toLowerCase()}"],
                                          token1_in: ["${tokensPerBlockchain[blockchains[i]][1].toLowerCase()}", "${tokensPerBlockchain[blockchains[i]][0].toLowerCase()}"],
                                      }
                                  ){
                                  reserveUSD
                                    reserve0
                                    reserve1
                                    token0 {
                                      id
                                    }
                                    volumeUSD
                                  }
                                }
                                  
                              `
            })

            var prixETH =
              tokensPerBlockchain[blockchains[i]][0].toLowerCase() == result.data.eth[0].token0.id ?
                (result.data.eth[0].reserve1 / result.data.eth[0].reserve0) :
                (result.data.eth[0].reserve0 / result.data.eth[0].reserve1);
            for (let k = 0; k < 3; k++) {
              let coef = prixETH;
              let pair = result.data[`pair${k}`][0];
              const ETH = tokensPerBlockchain[blockchains[i]][0].toLowerCase();
              if (pair) {
                let isBackedOnStable = false;
                let prixToken = 0;
                for (let l = 0; l < 2; l++) {
                  const stable = stableTokens[blockchains[i]][0][`vsToken${l}`];
                  if (!isBackedOnStable && (pair.token0.id == stable || pair.token1.id == stable)) {
                    isBackedOnStable = true;
                    coef = 1;
                  }
                }
                prixToken =
                  contracts[i].toLowerCase() == pair.token0.id ?
                    (pair.reserve1 / pair.reserve0) * coef :
                    (pair.reserve0 / pair.reserve1) * coef;
                if (isBackedOnStable && (pair.token0.id == ETH || pair.token1.id == ETH)) {
                  prixToken = contracts[i].toLowerCase() == ETH ? prixETH : 1;
                }
                let bufferLiquidity =
                  (pair.reserveUSD / 2) > 500 ?
                    (pair.reserveUSD / 2) : 0;
                if (!(pair.reserve1.includes('.') && pair.reserve1.includes('.') && pair.reserve0.includes('.') && pair.reserve0.includes('.'))) {
                  bufferLiquidity = 0;
                  // console.log(`Price ignored as one reserve does not contain a decimal point`);
                }
                totalLiquidity += bufferLiquidity;
                averagePrice += prixToken * bufferLiquidity;
                //console.log(`Liquidity: ${pair.reserveUSD/2}`);
                if (bufferLiquidity == 0) {
                  // console.log(`LP null or ignored due to the threshold`);
                }
                subgraphSuccess++;
                // console.log(`Success subgraph: ${subgraphSuccess}/${expectedPairs}`);
              }
            }
          } catch (e) {

          }
          currentSubgraph++;
        }
      } else {

      }
    } catch (e) {

    }
  }
  if (totalLiquidity > 0) {
    var price = Number(averagePrice / totalLiquidity);
    if (price && !isNaN(price)) {
      setPrice(price);
    }
  }
}
function Token(token: {
  name: string
  symbol: string
  contracts: string[]
  blockchains: string[]
  pairs: string[]
  logo: string
  twitter: string
  chat: string
  title:string,
  discord: string
  website: string
  market_cap: number
  volume: number
  price_change_24h: number
  price_change_7d: number
  rank_change_24h: number
  price: number,
  created_at:number,
  rank: number
  id: number
  isMyAsset: boolean
  tokens:string[]
}) {
  const router = useRouter();
  const [price, setPrice] = useState(token.price)
  const [tokens, setTokens] = useState([]);
  const [isWinner, setIsWinner]: [boolean | null, Function] = useState();
  const [settings, setSettings] = useState({ liquidity: 1000, volume: 50_000, onChainOnly: false, default: true })
  useEffect(() => {
    if (token.contracts && token.contracts.length > 0) {
      if (token.blockchains && token.blockchains.length > 0 && token.pairs && token.pairs.length > 0) {
        refreshPrice(token.contracts, token.blockchains, token.pairs, setPrice, token.name)
      }
      setInterval(refreshPrice, 1000 * 30)
    }
  }, [])
  useEffect(() => {
    if (token.price < price) {
      setIsWinner(true)
    } else if (token.price > price) {
      setIsWinner(false)
    }
    setTimeout(() => {
      setIsWinner(null)
    }, 500)
  }, [price])
  const separator = (numb: number) => {
    if (numb) {
      var str = numb.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return str.join(".");
    }
  }
  function getNameFormat(status: string) {
    if (status.length > 13) {
      return formatName(token.name, 13)
    }
    return token.name
  }

  const testRef = useRef();


  if (token.title === "Trendings") {
      let date = new Date(token.created_at);
      let seconds = date.getTime();
      let postedDate = Math.round((Date.now() - seconds) / 1000);
      let format = "";
      if (postedDate < 60) {
          format = "seconds";
      }
      else if (60 <= postedDate && postedDate < 120) {
          format = "minute"
      }
      else if (120 <= postedDate && postedDate < 3600) {
          format = "minutes"
      }
      else if (3600 <= postedDate && postedDate < 7200) {
          format = "hour"
      }
      else if (7200 <= postedDate && postedDate < 86400) {
          format = "hours"
      }
      else if (86400 <= postedDate && postedDate < 172800) {
          format = "day"
      }
      else if (172800 <= postedDate) {
          format = "days"
      }
  }
  
  return (
    <Tbody id="nul" ref={testRef} transition="background 200ms ease-in-out" _hover={{ background: 'var(--box_active)', transition: "background 200ms ease-in-out", cursor: "pointer", color: "none" }} borderBottom="none" className={`${styles["tbodys"]} ${(!token.contracts || token.contracts.length > 0) ? '' : styles['hide']}`} >
      <Tr className={styles["trs"]} >
        <Td borderBottom="1px solid rgba(122, 122, 122, 0.1) !important" fontWeight="700" px={["5px", "5px", "20px", "20px"]} fontSize={["13px", "13px", "15px", "15px"]} py={["5px", "5px", "5px", "5px", "15px"]} maxWidth="100px" className={` ${styles["rank-title-start"]} ${styles["ths"]}`}  >
          <a href={`/asset/${getUrlFromName(token.name)}`} target='_blank' className={styles["white"]}>
            {token.rank_change_24h < 0 ? (
              <span className={`${styles['red']} ${styles["font-char"]} `} id="noColor">
                <div className={styles['triangle-red']}></div>
                {Math.abs(token.rank_change_24h)}
              </span>
            ) : token.rank_change_24h == 0 ? <div>--</div> : (
              <span className={`${styles['green']} ${styles["font-char"]} `} id="noColor">
                <div className={styles['triangle-green']}></div>
                {token.rank_change_24h}
              </span>
            )}
            <span style={{ marginLeft: "10px", opacity: .6, color: "var(--text-secondary)" }} >{token.rank}</span>
          </a>
        </Td>
        <Td px={["10px", "10px", "20px", "20px"]} py="10px" fontSize={["13px", "13px", "15px", "15px"]} className={styles["hover-child"]} minWidth={["150px", "150px", "150px", ""]} bg={[token.title === "Trendings" || token.title === "Advanced Settings" ? "var(--background)" : "var(--table)", token.title === "Trendings" ? "var(--background)" : "var(--table)", "none", "none"]} position="sticky" left="0px" onClick={() => router.push('/asset/' + getUrlFromName(token.name))}>
          <a href={`/asset/${getUrlFromName(token.name)}`}>
            <Flex align="center" >
              <img src={(token.logo || '/unknown.png')} className={styles["token-logos"]} />
              <Flex fontWeight="700" mr={["0px", "0px", "-70px", "-150px"]} className={styles["wrap-name"]} direction={["column", "column", "row", "row"]}>
                <Box mr="15px" display={["none", "none", "none", "block"]} whiteSpace="pre-wrap" as="span">{token.name.length > 15 ? formatName(token.name, 15) : token.name}</Box>
                <Box mr="10px" display={["block", "block", "block", "none"]} whiteSpace="pre-wrap" as="span" >{token.name}</Box>
                <Flex>
                  <Box display={["block", "block", "none", "none"]} mr="10px" color="var(--text-secondary)">{token.rank}</Box>
                  <Box as="span" fontWeight="700" color="var(--text-secondary)">{token.symbol}</Box>
                </Flex>
              </Flex>
            </Flex>
          </a>
        </Td>
        <Td borderBottom="1px solid var(--box_border) !important" fontWeight="700" px={["5px", "5px", "20px", "20px"]} fontSize={["13px", "13px", "15px", "15px"]} onClick={(e) => {
          console.log("WHY ??????§")
          window.open(`/asset/${getUrlFromName(token.name)}`, '_blank')//  router.push('/asset/' + getUrlFromName(token.name))
        }} py={["5px", "5px", "5px", "5px", "31px"]} my="0px" isNumeric className={`${styles["ths"]} ${styles["price-title-center"]}`} color={isWinner === true ? "green" : isWinner === false ? "red" : "none"}>
          <a href={`/asset/${getUrlFromName(token.name)}`}> ${price ? separator(getTokenPrice(price)) : '??'}</a>
        </Td>
        <Td borderBottom="1px solid var(--box_border) !important" fontWeight="700" px={["5px", "5px", "20px", "20px"]} fontSize={["13px", "13px", "15px", "15px"]} py={["5px", "5px", "5px", "5px", "15px"]} isNumeric className={styles["ths"]}>
          <a href={`/asset/${getUrlFromName(token.name)}`} target='_blank'>
            {token.price_change_24h < 0.01 ? (
              <span className={`${styles['red']} ${styles["font-char"]}`} id="noColor">
                <div className={styles['triangle-red']} ></div>
                {getTokenPercentage(token.price_change_24h)}%
              </span>
            ) || (
                <div></div>
              ) : (
              <span className={`${styles['green']} ${styles["font-char"]}`} id="noColor">
                <div className={styles['triangle-green']}></div>
                {getTokenPercentage(token.price_change_24h)}%
              </span>
            )}
          </a>
        </Td>

        <Td borderBottom="1px solid var(--box_border) !important" fontWeight="700" fontSize={["13px", "13px", "15px", "15px"]} py={["5px", "5px", "5px", "5px", "15px"]} isNumeric className={styles["ths"]}>
          <a href={`/asset/${getUrlFromName(token.name)}`} target='_blank'>
            <span className={`${styles["font-char"]} `}>${token.market_cap ? formatAmount(token.market_cap) : '???'}</span>
          </a>
        </Td>
        {/* </a> */}
        <Td borderBottom="1px solid var(--box_border) !important" fontWeight="700" fontSize={["13px", "13px", "15px", "15px"]} py={["5px", "5px", "5px", "5px", "15px"]} isNumeric className={`${styles["ths"]} ${styles["chart-title-center"]}`}>
          <a href={`/asset/${getUrlFromName(token.name)}`} target='_blank'>
            <span className={` ${styles["font-char"]}`}>
              {token.isMyAsset ? formatAmount(token.volume) + ' ' + token.symbol : '$' + formatAmount(token.volume)}
            </span>
          </a>
        </Td>
        <Td borderBottom="1px solid var(--box_border) !important" fontWeight="700" fontSize={["13px", "13px", "15px", "15px"]} py={["5px", "5px", "5px", "5px", "15px"]} className={styles["ths"]}>
          <div className={styles["media-icons"]}>
            {token.website ? <a href={token.website} target='_blank' className={`${styles["fis"]} ${styles["white"]} ${styles["nomargin"]}`}><Globe className={styles["fi"]} /></a> : <></>}
            {token.twitter ? <a href={token.twitter} target='_blank' className={`${styles["fus"]} ${styles["white"]} ${styles["nomargin"]}`}><img style={{ minWidth: "30px" }} src="/new-twitter.png" className={styles["fu"]} /></a> : <></>}
            {token.discord ? <a href={token.discord} target='_blank' className={`${styles["fus"]} ${styles["white"]} ${styles["nomargin"]}`}><img style={{ minWidth: "30px" }} src="/new-discord.png" className={styles["fo"]} /></a> : <></>}
          </div>
        </Td>
             <Td borderBottom="1px solid var(--box_border) !important" fontWeight="700" fontSize={["13px", "13px", "15px", "15px"]} py={["5px", "5px", "5px", "5px", "15px"]}>
             {token.id ?
               <Image style={{ margin: "0px auto" }} w={["200%", "200%", "150%", "80%"]} maxWidth="200%" src={"https://mobulaspark.com/spark?id=" + token.id + '.svg'} className={styles["chart-image"]} /> :
               token.isMyAsset ? <Button ml={["0%", "0%", "30px"]} color="white" borderRadius="8px" w={["100%", "100%", "80%"]} h="30px" fontSize="xs" fontWeight="md" bg="blue" onClick={() => router.push('/list')}>List this asset</Button> : <></>}
           </Td>
      </Tr>
    </Tbody >
  )
};
export default Token