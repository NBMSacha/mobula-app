import React, { useEffect, useState } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';
import styles from './Main.module.scss';
import Token from "./Token";
import TrendingBlock from "./Block/TrendingBlock";
import ButtonBlock from "./Block/ButtonBlock";
import RecentBlock from "./Block/RecentBlock";
import GainerBlock from "./Block/GainerBlock";
import Tendance from '../Header/Tendance';
import MainBlock from './Block/MainBlock';
import TopPages from './TopPages';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

function News(props: any) {
  const [tokens, setTokens] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [recents, setRecents] = useState([]);
  //const [losers, setLosers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  //const scrollPosition = useScrollPosition();

  async function shouldLoadMore(supabase: SupabaseClient) {
    let loaded = false;
    while (true || loaded) {
      await new Promise(r => setTimeout(r, 1000))
      if (window.pageYOffset > 300) {
        supabase.from('assets').select('market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price,rank_change_24h,id,contracts,liquidity').filter('volume', 'gt', 50000).order('market_cap', { ascending: false }).limit(200).then(r => {
          if (r.data) {
            setTokens(r.data.filter(token => token.liquidity > 1000 || token.contracts.length == 0))
          }
        });
        loaded = true
      }
    }
  }

  // useEffect(() => {
  //   if (scrollPosition > 500 && !loaded) {
  //     const supabase = createClient(
  //       "https://ylcxvfbmqzwinymcjlnx.supabase.co",
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
  //     )

  //     setLoaded(true);

  //   }

  // }, [scrollPosition])

  useEffect(() => {
    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )

    supabase.from('assets').select('name,price_change_24h,logo,id,liquidity,contracts').filter('volume', 'gt', 50000).order('price_change_24h', { ascending: false }).limit(10).then(r => {
      setGainers(r.data.filter(token => token.liquidity > 10000 || token.contracts.length == 0))
    });

    // supabase.from('assets').select('name,price_change_24h,logo,id').filter('volume', 'gt', 50000).order('price_change_24h', { ascending: true }).limit(3).then(r => {
    //   setLosers(r.data)
    // });

    supabase.from('assets').select('name,price_change_24h,logo,id').order('created_at', { ascending: false }).limit(3).then(r => {
      setRecents(r.data)
    });

    shouldLoadMore(supabase)

  }, [])

  return (
    <>
      {/* PAGE 1 */}
      <div className={styles["main-news"]}>
        <MainBlock />
        <div className={styles["three-container"]}>
          {gainers.length >= 3 ?
            <GainerBlock
              logo1={gainers[0].logo}
              name1={gainers[0].name}
              id1={gainers[0].id}
              change1={gainers[0].price_change_24h}
              logo2={gainers[1].logo}
              name2={gainers[1].name}
              id2={gainers[1].id}
              change2={gainers[1].price_change_24h}
              logo3={gainers[2].logo}
              name3={gainers[2].name}
              id3={gainers[2].id}
              change3={gainers[2].price_change_24h}
            /> : <GainerBlock
              logo1={''}
              name1={'Loading...'}
              id1={0}
              change1={0}
              logo2={''}
              name2={'Loading...'}
              id2={0}
              change2={0}
              logo3={''}
              name3={'Loading...'}
              id3={0}
              change3={0} />}
          <TrendingBlock
            logo1={''}
            name1={'????'}
            change1={'??'}
            logo2={''}
            name2={'????'}
            change2={'??'}
            logo3={''}
            name3={'????'}
            change3={'??'} />
          {recents.length > 0 ?
            <RecentBlock
              logo1={recents[0].logo}
              name1={recents[0].name}
              id1={recents[0].id}
              change1={recents[0].price_change_24h}
              logo2={recents[1].logo}
              name2={recents[1].name}
              id2={recents[1].id}
              change2={recents[1].price_change_24h}
              logo3={recents[2].logo}
              name3={recents[2].name}
              id3={recents[2].id}
              change3={recents[2].price_change_24h}
            /> : <RecentBlock
              logo1={''}
              name1={'Loading...'}
              id1={0}
              change1={0}
              logo2={''}
              name2={'Loading...'}
              id2={0}
              change2={0}
              logo3={''}
              name3={'Loading...'}
              id3={0}
              change3={0} />}
        </div>
        <ButtonBlock />
      </div>
      {/* PAGE 2 */}
      <div className={styles["ranked-main-container"]}>
        <table className={styles["tables"]}>
          <thead>
            <tr className={styles["table-head"]}>
              <th className={`${styles['token-title-datas']} ${styles["datas-title"]}`}>Rank</th>
              <th className={`${styles['token-title-assets']} ${styles["datas-title"]}`}>Asset</th>
              <th className={`${styles['token-title-price']} ${styles["datas-title"]}`}>Price</th>
              <th className={`${styles['token-title-percentage']} ${styles["datas-title"]}`}>Change (24h)</th>
              <th className={`${styles['token-title-marketCap']} ${styles["datas-title"]}`}>Market cap</th>
              <th className={`${styles['token-title-marketFully']} ${styles["datas-title"]}`}>Volume (24h)</th>
              <th className={`${styles['token-title-links']} ${styles["datas-title"]}`}>Socials</th>
              <th className={`${styles['token-title-chart']} ${styles["datas-title"]}`}>Chart</th>
            </tr>
          </thead>
          {(tokens || props.tokens) ?? (tokens || props.tokens).map((token, index) => <Token
            key={token.id}
            id={token.id}
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
            rank_change_24h={token.rank_change_24h}
            rank={index + 1}
          />)}
        </table>

      </div>
      {/* {tokens ? tokens.map((token, index) => <TopPages
            key={token.id}
            id={token.id}
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
            rank_change_24h={token.rank_change_24h}
            rank={index + 1}
          />) : <></>} */}
    </>

  )
}

export default News;