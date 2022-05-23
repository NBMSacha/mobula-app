import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';
import { Twitter, Globe, ArrowUp, ArrowDown } from "react-feather";
import { formatName, getTokenPrice, getTokenPercentage, formatAmount, getUrlFromName } from '../../../helpers/formaters';
import styles from "../Token/Token.module.scss"
import { useRouter } from 'next/router';

function Token(token: {
  name: string
  symbol: string
  contract: string
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
  
  function getNameFormat(status: string) {
    if (status.length > 13) {
      return formatName(token.name, 13)
    }
    return token.name
  }
  return (
    <tbody className={styles["tbodys"]}  onClick={() => router.push('/asset/' + getUrlFromName(token.name))}>
      <tr>
        <td className={` ${styles["rank-title-start"]} ${styles["ths"]}`} >
          <a href="" className={styles["white"]}>
            {token.rank_change_24h < 0 ? (
              <span className={`${styles['red']} ${styles["font-char"]} `} id="noColor">
                <ArrowDown className={styles["arrowDown"]} />
                {Math.abs(token.rank_change_24h)}
              </span>
            ) : token.rank_change_24h == 0 ? <div>--</div> : (
              <span className={`${styles['green']} ${styles["font-char"]} `} id="noColor">
                <ArrowUp className={styles["arrowDown"]} />
                {token.rank_change_24h}
              </span>
            )}
          <span style={{marginLeft: "10px"}}>{token.rank}</span>
          </a>
        </td>
        <td className={` ${styles["asset-title-start"]} ${styles["ths"]}`} >
          <img src={token.logo} className={styles["token-logos"]} />
          <div className={styles["wrap-name"]}>
            <span className={`${styles["name-title-margin"]} ${styles["font-char"]}`}>{getNameFormat(token.name)}</span>
            <span className={`${styles["font-char"]}`}>{token.symbol}</span>
          </div>
        </td>
        <td className={`${styles["ths"]} ${styles["price-title-center"]}`}>
          <span className={` ${styles["font-char"]}`}>${getTokenPrice(token.price)}</span>
        </td>
        <td className={styles["ths"]}>
          {token.price_change_24h < 0.01 ? (
            <span className={`${styles['red']} ${styles["font-char"]}`} id="noColor">
              <ArrowDown className={styles["arrowDown"]} />
              {getTokenPercentage(token.price_change_24h)}%
            </span>
          ) || (
              <div></div>
            ) : (
            <span className={`${styles['green']} ${styles["font-char"]}`} id="noColor">
              <ArrowUp className={styles["arrowDown"]} />
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
        <td className={styles["ths"]}>
          <div className={styles["media-icons"]}>
            {token.website ? <a href={token.website} className={`${styles["fis"]} ${styles["white"]} ${styles["nomargin"]}`}><Globe className={styles["fi"]} /></a> : <></>}
            {token.twitter ? <a href={token.twitter} className={`${styles["fus"]} ${styles["white"]} ${styles["nomargin"]}`}><Twitter className={styles["fu"]} /></a> : <></>}
          </div>
        </td>
        <td className={styles["ths"]}>
          {(token.id ? <img src={"https://mobulaspark.com/spark?id=" + token.id + '.svg'} className={styles["chart-image"]} /> : <></>)}
        </td>
      </tr>
    </tbody>
  )
};

export default Token