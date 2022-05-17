import React, { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ethers } from 'ethers';
import styles from "./RecentlyAdded.module.scss";
import { Twitter, Globe, ArrowUp, ArrowDown } from "react-feather";
import { formatName, getTokenPrice, getTokenPercentage, formatAmount, getUrlFromName } from '../../helpers/formaters';
import { Text, Heading, Flex, Box, Spacer, Button, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router';

export default function RecentlyAdded({ tokens }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  return (
    <div className={styles["listing"]}>
      <div className={styles["dflex"]}>

        <header>
          <Heading mb={'20px'}>Recently Added assets</Heading>
          <Text whiteSpace="normal" fontSize={['14px', '14px', '16px', '17px']}>
            Here are the latest listings on Mobula. Do you want to see an asset here?
            <a
              className={styles.link}
              href='https://app.mobula.finance/list'
            >
              Try to list it.
            </a>
          </Text>
        </header>
        <div className={styles["line"]}></div>
        <table className={styles["tables"]}>
          <thead className={styles["thead"]}>
            <tr className={styles["table-head"]}>
              <th className={`${styles['token-title-datas']} ${styles["datas-title"]}`}>Rank</th>
              <th className={`${styles['token-title-assets']} ${styles["datas-title"]}`}>Asset</th>
              <th className={`${styles['token-title-price']} ${styles["datas-title"]}`}>Price</th>
              <th className={`${styles['token-title-percentage']} ${styles["datas-title"]}`}>Change (24h)</th>
              <th className={`${styles['token-title-marketCap']} ${styles["datas-title"]}`}>Market cap</th>
              <th className={`${styles['token-title-marketFully']} ${styles["datas-title"]}`}>Volume (24h)</th>
              <th className={`${styles['token-title-links']} ${styles["datas-title"]}`}>Socials</th>
              <th className={`${styles['token-title-chart']} ${styles["datas-title"]}`}>Added</th>
            </tr>
          </thead>

          {tokens.map((token: any) => {

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

            console.log(token.rank)

            return <tbody className={styles["border-bot"]} key={token.id} onClick={() => router.push('/asset/' + getUrlFromName(token.name))}>
              <tr className={styles["token-containers"]}>
                <td className={`${styles["token-ids"]} ${styles["font-char"]}`}>
                  <a href="" className={styles["white"]}>
                    {token.rank < 0 ? (
                      <span className={`${styles["white"]} ${styles["font-char"]} ${styles['token-percentage-box']}`} id="noColor">

                        {token.rank}
                      </span>
                    ) : token.rank == 0 ? <div>--</div> : (
                      <span className={` ${styles["font-char"]} ${styles['token-percentage-box']}`} id="noColor">


                        {token.rank}
                      </span>
                    )}
                  </a>
                </td>
                <td className={styles["token-infos"]}>
                  <img src={token.logo} className={styles["token-logos"]} />
                  <div>
                    <span className={`${styles["token-names"]} ${styles["font-char"]}`}>{token.name}</span>
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
                  {format == "seconds" && <span>{postedDate} seconds ago</span>}
                  {format == "minute" && <span>{Math.floor(postedDate / 60)} minute ago</span>}
                  {format == "minutes" && <span>{Math.floor(postedDate / 60)} minutes ago</span>}
                  {format == "hour" && <span>{Math.floor(postedDate / 3600)} hour ago</span>}
                  {format == "hours" && <span>{Math.floor(postedDate / 3600)} hours ago</span>}
                  {format == "day" && <span>{Math.floor(postedDate / 86400)} day ago</span>}
                  {format == "days" && <span>{Math.floor(postedDate / 86400)} days ago</span>}
                </td>


              </tr>

            </tbody>

          })}



        </table>
      </div>
    </div>

  )

}

