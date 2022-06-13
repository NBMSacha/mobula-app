import React, { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';
import { Twitter, Globe, ArrowUp, ArrowDown } from "react-feather";
import { formatName, getTokenPrice, getTokenPercentage, formatAmount, getUrlFromName } from '../../../../helpers/formaters';
import styles from "../Token/Token.module.scss"
import { useRouter } from 'next/router';
import { stableTokens, tokensPerBlockchain, volumeOracles } from '../../../../constants';
import axios from 'axios';
import { Flex, Text, useColorModeValue, Button, Input } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react'
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
async function refreshPrice(contracts: string[], blockchains: string[], pairs: string[], setPrice: Function, name) {
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
            // console.log(`Reserve0ETH: ${result.data.eth[0].reserve0}`);
            // console.log(`Reserve1ETH: ${result.data.eth[0].reserve1}`);
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
            // console.log('[SUBGRAPH ISSUE] : ' + '\n' + e, 'low ', e);
          }
          currentSubgraph++;
        }
      } else {
        // console.log('Not scraping volume because ' + blockchains[i] + ' not supported.')
      }
    } catch (e) {
      // console.log('[VOLUME ISSUE] : ' + name + '\n' + e, 'low', e)
      // console.log(blockchains)
    }
  }
  if (totalLiquidity > 0) {
    var price = Number(averagePrice / totalLiquidity);
    if (price && !isNaN(price)) {
      setPrice(price);
    }
    //console.log(price + ':' + name)
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
  discord: string
  website: string
  market_cap: number
  volume: number
  price_change_24h: number
  price_change_7d: number
  rank_change_24h: number
  price: number
  rank: number
  id: number
  isMyAsset: boolean
}) {
  const router = useRouter();
  const [price, setPrice] = useState(token.price)
  const [isWinner, setIsWinner]: [boolean | null, Function] = useState();
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
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const hover = useColorModeValue("white", "var(--chakra-colors-dark_inactive_gainer)")
  const border = useColorModeValue("#E5E5E5", "var(--chakra-colors-dark_border)")
  const sticky = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
  const testRef = useRef();
  return (
    <Tbody id="nul" ref={testRef} borderBottom={`2px solid ${border}`} _hover={{ background: hover }} className={`${styles["tbodys"]} ${(!token.contracts || token.contracts.length > 0) ? '' : styles['hide']}`} >
      <Tr className={styles["trs"]} >
        <Td py={["5px", "5px", "5px", "5px", "15px"]} maxWidth="100px" className={` ${styles["rank-title-start"]} ${styles["ths"]}`} onClick={() => router.push('/asset/' + getUrlFromName(token.name))} >
          <a href="" className={styles["white"]}>
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
            <span style={{ marginLeft: "10px", opacity: .6 }}>{token.rank}</span>
          </a>
        </Td>
        <Td py={["5px", "5px", "5px", "5px", "15px"]} minWidth={["220px", "220px", "220px", ""]} bg={[sticky, sticky, "none", "none"]} position="sticky" left="0px" onClick={() => router.push('/asset/' + getUrlFromName(token.name))}>
          <Flex align="center" >
            <img src={(token.logo || '/unknown.png')} className={styles["token-logos"]} />
            <div className={styles["wrap-name"]}>
              <span className={`${styles["name-title-margin"]} ${styles["font-char"]}`}>{getNameFormat(token.name)}</span>
              <span className={`${styles["font-char"]} ${styles["symbol-weight"]}`}>{token.symbol}</span>
            </div>
          </Flex>
        </Td>
        <Td py={["5px", "5px", "5px", "5px", "31px"]} my="0px" isNumeric className={`${styles["ths"]} ${styles["price-title-center"]} ${isWinner === true ? styles['green'] : isWinner === false ? styles['red'] : ''}`}>
          <span className={` ${styles["font-char"]}`}>${separator(getTokenPrice(price))}</span>
        </Td>
        <Td py={["5px", "5px", "5px", "5px", "15px"]} isNumeric className={styles["ths"]}>
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
        </Td>
        <Td py={["5px", "5px", "5px", "5px", "15px"]} isNumeric className={styles["ths"]}>
          <span className={`${styles["font-char"]} `}>${token.market_cap ? formatAmount(token.market_cap) : '???'}</span>
        </Td>
        <Td py={["5px", "5px", "5px", "5px", "15px"]} isNumeric className={`${styles["ths"]} ${styles["chart-title-center"]}`}>
          <span className={` ${styles["font-char"]}`}>
            {token.isMyAsset ? formatAmount(token.volume) + ' ' + token.symbol : '$' + formatAmount(token.volume)}</span>
        </Td>
        <Td py={["5px", "5px", "5px", "5px", "15px"]} className={styles["ths"]}>
          <div className={styles["media-icons"]}>
            {token.website ? <a href={token.website} className={`${styles["fis"]} ${styles["white"]} ${styles["nomargin"]}`}><Globe className={styles["fi"]} /></a> : <></>}
            {token.twitter ? <a href={token.twitter} className={`${styles["fus"]} ${styles["white"]} ${styles["nomargin"]}`}><img style={{ minWidth: "30px" }} src="/new-twitter.png" className={styles["fu"]} /></a> : <></>}
            {token.discord ? <a href={token.discord} className={`${styles["fus"]} ${styles["white"]} ${styles["nomargin"]}`}><img style={{ minWidth: "30px" }} src="/new-discord.png" className={styles["fo"]} /></a> : <></>}
          </div>
        </Td>
        <Td py={["5px", "5px", "5px", "5px", "15px"]}>
          {token.id ?
            <img style={{ margin: "0px auto" }} src={"https://mobulaspark.com/spark?id=" + token.id + '.svg'} className={styles["chart-image"]} /> :
            token.isMyAsset ? <Button ml={["0%", "0%", "30px"]} borderRadius="12px" w={["100%", "100%", "80%"]} h="30px" fontSize="xs" fontWeight="md" bg="blue" onClick={() => router.push('/list')}>List this asset</Button> : <></>}
        </Td>
      </Tr>
    </Tbody>
  )
};
export default Token