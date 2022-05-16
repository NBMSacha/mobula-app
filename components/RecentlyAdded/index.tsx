import React, { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ethers } from 'ethers';
import styles from "./RecentlyAdded.module.scss";
import { Twitter, Globe, ArrowUp, ArrowDown } from "react-feather";
import { formatName, getTokenPrice, getTokenPercentage, formatAmount } from '../../helpers/formaters';

export default function RecentlyAdded({tokens}) {


 
        
        
          {/* <tr className={styles["token-container"]}>
            <td className={styles["token-id"]}>{tokens.indexOf(token) + 1}</td>
            <td className={styles["token-name"]}><img src={token.logo} className={styles["token-logo"]} alt="token logo" />{token.name}<span className={styles["token-symbol"]}>{token.symbol}</span></td>
            <td className={styles["token-links"]}>
              {token.chat ? <a href={token.chat} target="_blank"><img className={styles["links-icons"]} src="telegram.png"></img></a> : ""}
              {token.discord ? <a href={token.discord} target="_blank"><img className={styles["links-icons"]} src="discord.png"></img></a> : ""}
              {token.website ? <a href={token.website} target="_blank"><img className={styles["links-icons"]} src="website.png"></img></a> : ""}
              {token.twitter ? <a href={token.twitter} target="_blank"><img className={styles["links-icons"]} src="twitter.png"></img></a> : ""}</td>
            <td className="token-contract">
              {token.blockchain == "BNB" && <a className="tokenURL" href={"https://bscscan.com/token/" + token.contract} target="_blank">{token.contract.substring(0, 4) + '..' + token.contract.substring(token.contract.length - 4, token.contract.length)}</a>}
              {token.blockchain == "Ethereum" && <a className="tokenURL" href={"https://etherscan.com/token/" + token.contract} target="_blank">{token.contract.substring(0, 4) + '..' + token.contract.substring(token.contract.length - 4, token.contract.length)}</a>}
              {token.blockchain == "Avalanche" && <a className="tokenURL" href={"https://snowtrace.io/token/" + token.contract} target="_blank">{token.contract.substring(0, 4) + '..' + token.contract.substring(token.contract.length - 4, token.contract.length)}</a>}
            </td>
            <td className="token-blockchain"><div className="blockchain">
              <div className="token-blockchain-images">
                {token.blockchain == "BNB" && <img src="bnb.png"></img>}
                {token.blockchain == "Ethereum" && <img src="eth.png"></img>}
                {token.blockchain == "Avalanche" && <img src="avax.png"></img>}
              </div>
              <span className="token-blockchain-name">{token.blockchain}</span>
            </div>

            </td>
            <td className="token-timestamp">

              {format == "seconds" && <span>{postedDate} seconds ago</span>}
              {format == "minute" && <span>{Math.floor(postedDate / 60)} minute ago</span>}
              {format == "minutes" && <span>{Math.floor(postedDate / 60)} minutes ago</span>}
              {format == "hour" && <span>{Math.floor(postedDate / 3600)} hour ago</span>}
              {format == "hours" && <span>{Math.floor(postedDate / 3600)} hours ago</span>}
              {format == "day" && <span>{Math.floor(postedDate / 86400)} day ago</span>}
              {format == "days" && <span>{Math.floor(postedDate / 86400)} days ago</span>}
            </td>

          </tr> */}
  
 

     
       

 


  const [isLoading, setIsLoading] = useState(false)

  function showData() {
    console.log(tokens)
  }

  
 
  return (

    <div className={styles["listing"]}>
      <div className={styles["dflex"]}>

        <header>
              <h1 className={styles["title"]}>Recently Added</h1>

         
          <span className={styles["subtitle"]} >
            Find out what are the latest tokens listed on Mobula!
            {/* {tokens.length}   */}
          </span>
        </header>
        {/* <div className="line"></div> */}
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
         
           {tokens.map((token:any) => {

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
           
            return <tbody className={styles["border-bot"]} key={token.id} onClick={() => document.location.href = String(token.id)}>
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

