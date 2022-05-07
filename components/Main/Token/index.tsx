import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';
import { AiOutlineArrowRight } from "@react-icons/all-files/ai/AiOutlineArrowRight";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { HiOutlineGlobeAlt } from "@react-icons/all-files/hi/HiOutlineGlobeAlt";
import { SiDiscord } from "@react-icons/all-files/si/SiDiscord";
import { ImStarEmpty } from "@react-icons/all-files/im/ImStarEmpty";
import { IoIosGlobe } from "@react-icons/all-files/Io/IoIosGlobe";
import { FaDiscord } from "@react-icons/all-files/Fa/FaDiscord";
import { AiOutlineArrowDown } from "@react-icons/all-files/ai/AiOutlineArrowDown"
import { AiOutlineArrowUp } from "@react-icons/all-files/ai/AiOutlineArrowUp"
import { formatName, getTokenPrice, getTokenPercentage, formatAmount } from '../../../helpers/formaters';
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
}) {

  function getNameFormat(status) {
    if (status.length > 13) {
      return formatName(token.name, 13)
    }
    return token.name
  }

  console.log(token.id)
  return (
    <tbody className="border-bot" onClick={() => document.location.href = String(token.id)}>
      <tr className="token-containers">
        <td className="token-ids font-char">
          <a href="" className="white">
            {token.rank_change_24h < 0 ? (
              <span className="token-percentage-box font-char red" id="noColor">

                <AiOutlineArrowDown className="arrowDown" />
                {Math.abs(token.rank_change_24h)}
              </span>
            ) : token.rank_change_24h == 0 ? <div>--</div> : (
              <span className="token-percentage-box font-char green" id="noColor">

                <AiOutlineArrowUp className="arrowDown" />
                {token.rank_change_24h}
              </span>
            )}
          </a>
          <span>{token.rank}</span></td>
        <td className="token-infos">
          <img src={token.logo} className="token-logos" />
          <div>
            <span className="token-names font-char">{getNameFormat(token.name)}</span>
            <span className="token-symbols font-char">{token.symbol}</span>
          </div>
        </td>
        <td className="tokens-price">
          <span className="token-price-box font-char">${getTokenPrice(token.price)}</span>

        </td>
        <td className="token-percentage">
          {token.price_change_24h < 0.01 ? (
            <span className="token-percentage-box font-char red" id="noColor">

              <AiOutlineArrowDown className="arrowDown" />
              {getTokenPercentage(token.price_change_24h)}%
            </span>
          ) || (
              <div></div>
            ) : (
            <span className="token-percentage-box font-char green" id="noColor">

              <AiOutlineArrowUp className="arrowDown" />
              {getTokenPercentage(token.price_change_24h)}%
            </span>


          )}
        </td>
        <td className="token-marketCap">
          <span className="token-marketCap-box font-char">${formatAmount(token.market_cap)}</span>

        </td>
        <td className="token-marketFully">
          <span className="token-marketFully-box font-char">${formatAmount(token.volume)}</span>
        </td>
        <td className="tokens-links">

          {token.website ? <a href={token.website} className="nomargin white fis"><IoIosGlobe className="fi" /></a> : <></>}
          {token.twitter ? <a href={token.twitter} className="nomargin white fus"><FaTwitter className="fu" /></a> : <></>}
          {token.discord ? <a href={token.discord} className="white fos"><SiDiscord className="fo" /></a> : <></>}
        </td>
        <td className="token-chart">
          <img src={"http://136.244.118.168:2112/spark?id=" + token.id + '.svg'} className="chart-image" />
        </td>
      </tr>
    </tbody>
  )
};

export default Token