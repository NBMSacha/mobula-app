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

  console.log(token.id)
  return (
    <tbody className={styles["border-bot"]} onClick={() => router.push('/asset/' + getUrlFromName(token.name))}>
      <tr className={styles["token-containers"]}>
        <td className={`${styles["token-ids"]} ${styles["font-char"]}`}>
          <a href="" className={styles["white"]}>
            {token.rank_change_24h < 0 ? (
              <span className={`${styles['red']} ${styles["font-char"]} ${styles['token-percentage-box']}`} id="noColor">

                <ArrowDown className={styles["arrowDown"]} />
                {Math.abs(token.rank_change_24h)}
              </span>
            ) : token.rank_change_24h == 0 ? <div>--</div> : (
              <span className={`${styles['green']} ${styles["font-char"]} ${styles['token-percentage-box']}`} id="noColor">

                <ArrowUp className={styles["arrowDown"]} />
                {token.rank_change_24h}
              </span>
            )}
          </a>
          <span>{token.rank}</span></td>
        <td className={styles["token-infos"]}>
          <img src={token.logo} className={styles["token-logos"]} />
          <div>
            <span className={`${styles["token-names"]} ${styles["font-char"]}`}>{getNameFormat(token.name)}</span>
            <span className={`${styles["font-char"]} ${styles["token-symbols"]}`}>{token.symbol}</span>
          </div>
        </td>
        <td className={styles["tokens-price"]}>
          <span className={`${styles["token-price-box"]} ${styles["font-char"]}`}>${getTokenPrice(token.price)}</span>

        </td>
        <td className={styles["token-percentage"]}>
          {token.price_change_24h < 0.01 ? (
            <span className={`${styles['red']} ${styles["font-char"]} ${styles["token-percentage-box"]}`} id="noColor">

              <ArrowDown className={styles["arrowDown"]} />
              {getTokenPercentage(token.price_change_24h)}%
            </span>
          ) || (
              <div></div>
            ) : (
            <span className={`${styles['green']} ${styles["font-char"]} ${styles["token-percentage-box"]}`} id="noColor">

              <ArrowUp className={styles["arrowDown"]} />
              {getTokenPercentage(token.price_change_24h)}%
            </span>


          )}
        </td>
        <td className={styles["token-marketCap"]}>
          <span className={`${styles["font-char"]} ${styles["token-marketCap-box"]}`}>${token.market_cap ? formatAmount(token.market_cap) : '???'}</span>

        </td>
        <td className={styles["token-marketFully"]}>
          <span className={`${styles["token-marketFully-box"]} ${styles["font-char"]}`}>
            {token.isMyAsset ? formatAmount(token.volume) + ' ' + token.symbol : '$' + formatAmount(token.volume)}</span>
        </td>
        <td className={styles["tokens-links"]}>

          <div className={styles["media-icons"]}>
            {token.website ? <a href={token.website} className={`${styles["fis"]} ${styles["white"]} ${styles["nomargin"]}`}><Globe className={styles["fi"]} /></a> : <></>}
            {token.twitter ? <a href={token.twitter} className={`${styles["fus"]} ${styles["white"]} ${styles["nomargin"]}`}><Twitter className={styles["fu"]} /></a> : <></>}
          </div>


        </td>
        <td className={styles["token-chart"]}>
          {(token.id ? <img src={"https://mobulaspark.com/spark?id=" + token.id + '.svg'} className={styles["chart-image"]} /> : <></>)}
        </td>
      </tr>
    </tbody>
  )
};

export default Token