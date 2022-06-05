import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';
import { Twitter, Globe, ArrowUp, ArrowDown } from "react-feather";
import { formatName, getTokenPrice, getTokenPercentage, formatAmount, getUrlFromName } from '../../../../helpers/formaters';
import styles from "../Token/Token.module.scss"
import { useRouter } from 'next/router';
import { stableTokens, tokensPerBlockchain, volumeOracles } from '../../../../constants';
import axios from 'axios';
import { Flex, Text, useColorModeValue, Button, Input } from '@chakra-ui/react'

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

            console.log(`Reserve0ETH: ${result.data.eth[0].reserve0}`);
            console.log(`Reserve1ETH: ${result.data.eth[0].reserve1}`);

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
                  console.log(`Price ignored as one reserve does not contain a decimal point`);
                }

                totalLiquidity += bufferLiquidity;
                averagePrice += prixToken * bufferLiquidity;

                //console.log(`Liquidity: ${pair.reserveUSD/2}`);

                if (bufferLiquidity == 0) {
                  console.log(`LP null or ignored due to the threshold`);
                }

                subgraphSuccess++;
                console.log(`Success subgraph: ${subgraphSuccess}/${expectedPairs}`);
              }


            }

          } catch (e) {
            console.log('[SUBGRAPH ISSUE] : ' + '\n' + e, 'low ', e);
          }

          currentSubgraph++;

        }

      } else {
        console.log('Not scraping volume because ' + blockchains[i] + ' not supported.')
      }
    } catch (e) {
      console.log('[VOLUME ISSUE] : ' + name + '\n' + e, 'low', e)
      console.log(blockchains)
    }

  }

  if (totalLiquidity > 0) {
    var price = Number(averagePrice / totalLiquidity);
    if (price && !isNaN(price)) {
      setPrice(price);
    }
    console.log(price + ':' + name)
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
  darkTheme: boolean
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

  const border = useColorModeValue("white_border", "dark_border")
  const sticky = useColorModeValue("bg_white", "dark_primary")

  return (
    <tbody id="nul" style={{ borderBottom: `1px solid ${border}` }} className={`${styles["tbodys"]} ${(!token.contracts || token.contracts.length > 0) ? '' : styles['hide']}`} onClick={() => router.push('/asset/' + getUrlFromName(token.name))}>
      <tr className={styles["trs"]}>
        <td className={` ${styles["rank-title-start"]} ${styles["ths"]}`} >
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
        </td>
        <td className={` ${styles["asset-title-start"]} ${styles["ths"]}`} style={{ background: sticky }}>
          <Flex align="center">
            <img src={token.logo} className={styles["token-logos"]} />
            <div className={styles["wrap-name"]}>
              <span className={`${styles["name-title-margin"]} ${styles["font-char"]}`}>{getNameFormat(token.name)}</span>
              <span className={`${styles["font-char"]} ${styles["symbol-weight"]}`}>{token.symbol}</span>
            </div>
          </Flex>

        </td>
        <td className={`${styles["ths"]} ${styles["price-title-center"]} ${isWinner === true ? styles['green'] : isWinner === false ? styles['red'] : ''}`}>
          <span className={` ${styles["font-char"]}`}>${separator(getTokenPrice(price))}</span>
        </td>
        <td className={styles["ths"]}>
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
        </td>
        <td className={styles["ths"]}>
          <span className={`${styles["font-char"]} `}>${token.market_cap ? formatAmount(token.market_cap) : '???'}</span>
        </td>
        <td className={`${styles["ths"]} ${styles["chart-title-center"]}`}>
          <span className={` ${styles["font-char"]}`}>
            {token.isMyAsset ? formatAmount(token.volume) + ' ' + token.symbol : '$' + formatAmount(token.volume)}</span>
        </td>
        <td className={styles["ths"]} style={{ display: "flex", justifyContent: "end" }}>
          <div className={styles["media-icons"]}>
            {token.website ? <a href={token.website} className={`${styles["fis"]} ${styles["white"]} ${styles["nomargin"]}`}><Globe className={styles["fi"]} /></a> : <></>}
            {token.twitter ? <a href={token.twitter} className={`${styles["fus"]} ${styles["white"]} ${styles["nomargin"]}`}><img src="/new-twitter.png" className={styles["fu"]} /></a> : <></>}
            {token.discord ? <a href={token.discord} className={`${styles["fus"]} ${styles["white"]} ${styles["nomargin"]}`}><img src="/new-discord.png" className={styles["fo"]} /></a> : <></>}
          </div>
        </td>
        <td className={styles["ths"]}>
          {(token.id ? <img style={{ margin: "0px auto" }} src={"https://mobulaspark.com/spark?id=" + token.id + '.svg'} className={styles["chart-image"]} /> : <></>)}
        </td>
      </tr>
    </tbody>
  )
};

export default Token