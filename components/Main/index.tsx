import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';

import Token from "./Token";
import DaoBlock from "./Block/DaoBlock";
import ButtonBlock from "./Block/ButtonBlock";
import MobulaBlock from "./Block/MobulaBlock";
import GainerBlock from "./Block/GainerBlock";
import Tendance from '../Header/Tendance';
import MainBlock from './Block/MainBlock';

function News(props: any) {
  const [tokens, setTokens] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )

    supabase.from('assets').select('market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price').filter('volume', 'gt', 50000).order('market_cap', { ascending: false }).limit(10).then(r => {
      setTokens(r.data)
    });

    supabase.from('assets').select('market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price').filter('volume', 'gt', 50000).order('market_cap', { ascending: false }).limit(100).then(r => {
      setTokens(r.data)
    });

    supabase.from('assets').select('name,price_change_24h').order('price_change_24h', { ascending: false }).limit(3).then(r => {
      setGainers(r.data)
    });

    supabase.from('assets').select('name,price_change_24h').order('price_change_24h', { ascending: true }).limit(3).then(r => {
      setLosers(r.data)
    });

  }, [])

  return (
    <>
      {/* PAGE 1 */}
      <div className="main-news">
        <Tendance />
        <MainBlock />
        <div className="three-container">
          {gainers.length + losers.length == 6 ?
            <GainerBlock
              name1={gainers[0].name}
              change1={gainers[0].price_change_24h}
              name2={gainers[1].name}
              change2={gainers[1].price_change_24h}
              name3={gainers[2].name}
              change3={gainers[2].price_change_24h}
              name4={losers[0].name}
              change4={losers[0].price_change_24h}
              name5={losers[1].name}
              change5={losers[1].price_change_24h}
              name6={losers[2].name}
              change6={losers[2].price_change_24h}
            /> : <GainerBlock
              name1={'Loading...'}
              change1={0}
              name2={'Loading...'}
              change2={0}
              name3={'Loading...'}
              change3={0}
              name4={'Loading...'}
              change4={0}
              name5={'Loading...'}
              change5={0}
              name6={'Loading...'}
              change6={0} />}
          <DaoBlock />
          <MobulaBlock />
        </div>
        <ButtonBlock />
      </div>
      {/* PAGE 2 */}
      <div className="ranked-main-container">
        <table className="tables">
          <thead>
            <tr className="table-head">
              <th className="token-title-datas datas-title">DATA</th>
              <th className="token-title-assets datas-title">Crypto Asset Name</th>
              <th className="token-title-price datas-title">Price</th>
              <th className="token-title-percentage datas-title">Percentage</th>
              <th className="token-title-marketCap datas-title">Market cap</th>
              <th className="token-title-marketFully datas-title">Market cap fully diluted</th>
              <th className="token-title-links datas-title">Links</th>
              <th className="token-title-chart datas-title">Chart</th>
            </tr>
          </thead>
          {tokens.map((token, index) => <Token
            key={token.id}
            name={token.name}
            symbol={token.symbol}
            contract={token.contract}
            logo={token.logo}
            twitter={token.twitter}
            chat={token.chat}
            discord={token.discord}
            website={token.website}
            market_cap={token.market_cap}
            volume={token.volume}
            price_change_24h={token.price_change_24h}
            price_change_7d={token.price_change_7d}
            price={token.price}
            rank={index + 1}
          />)}
        </table>

      </div>
    </>

  )
}

export default News;