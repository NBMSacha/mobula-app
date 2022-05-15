import React, { useEffect, useState } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import styles from './Main.module.scss';
import Token from "./Token";
import TrendingBlock from "./Block/TrendingBlock";
import ButtonBlock from "./Block/ButtonBlock";
import RecentBlock from "./Block/RecentBlock";
import GainerBlock from "./Block/GainerBlock";
import MainBlock from './Block/MainBlock';
import BigNumber from 'bignumber.js';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { ethers } from 'ethers';
import { RPC_URL } from '../../constants'

function News(props: any) {
  const [tokens, setTokens] = useState([]);
  const [myAssets, setMyAssets] = useState([]);
  const [display, setDisplay] = useState('Top 100');
  const [account, setAccount] = useState(null);
  const alert = useAlert()

  async function shouldLoadMore(supabase: SupabaseClient) {
    // let loaded = false;
    // while (true || loaded) {
    //   await new Promise(r => setTimeout(r, 1000))
    //   if (window.pageYOffset > 300) {
    //     supabase.from('assets').select('market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price,rank_change_24h,id,contracts,liquidity').filter('volume', 'gt', 50000).order('market_cap', { ascending: false }).limit(200).then(r => {
    //       if (r.data) {
    //         setTokens(r.data.filter(token => token.liquidity > 1000 || token.contracts.length == 0))
    //       }
    //     });
    //     loaded = true
    //   }
    // }
  }

  function getTokensToDisplay(): any[] {
    if (display == 'Top 100') {
      return (tokens.length > 0) ? tokens : (props.tokens || [])
    } else if (display == 'My Assets') {

      if (account) {
        if (myAssets.length == 0) {
          axios.get('https://mobulaspark.com/holdings?account=' + account).then(r => {
            if (r.data) {
              const assets = r.data.holdings
                .filter((a: any, index: number) => a.logo && r.data.holdings.map((asset: any) => asset.name).indexOf(a.name) == index)
                .concat(r.data.holdings.filter((a: any, index: number) => !a.logo && r.data.holdings.map((asset: any) => asset.name).indexOf(a.name) == index))
              setMyAssets(assets)
              return assets;
            } else {
              alert.error('Something went wrong.')
              return []
            }
          })
          return []
        } else {
          return myAssets;
        }
      } else {
        alert.show('You must connect your wallet to see your assets.')
        return []
      }

    }
  }

  useEffect(() => {
    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )

    shouldLoadMore(supabase)

    setTimeout(() => {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)
      provider.listAccounts().then((accounts) => {
        console.log(accounts);
        setAccount(accounts[0]);
      })
    }, 1000);
  }, [])

  return (
    <>
      {/* PAGE 1 */}
      <div className={styles["main-news"]}>
        <MainBlock />
        <div className={styles["three-container"]}>
          {props.gainers && props.gainers.length >= 3 ?
            <GainerBlock
              logo1={props.gainers[0].logo}
              name1={props.gainers[0].name}
              id1={props.gainers[0].id}
              change1={props.gainers[0].price_change_24h}
              logo2={props.gainers[1].logo}
              name2={props.gainers[1].name}
              id2={props.gainers[1].id}
              change2={props.gainers[1].price_change_24h}
              logo3={props.gainers[2].logo}
              name3={props.gainers[2].name}
              id3={props.gainers[2].id}
              change3={props.gainers[2].price_change_24h}
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
          {props.recents && props.recents.length > 0 ?
            <RecentBlock
              logo1={props.recents[0].logo}
              name1={props.recents[0].name}
              id1={props.recents[0].id}
              change1={props.recents[0].price_change_24h}
              logo2={props.recents[1].logo}
              name2={props.recents[1].name}
              id2={props.recents[1].id}
              change2={props.recents[1].price_change_24h}
              logo3={props.recents[2].logo}
              name3={props.recents[2].name}
              id3={props.recents[2].id}
              change3={props.recents[2].price_change_24h}
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
        <ButtonBlock display={display} setDisplay={setDisplay} />
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

          {
            getTokensToDisplay().map((token: any, index: number) => <Token
              key={token.id || token.balance + token.name}
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
              volume={token.volume || ((new BigNumber(token.balance)).div(new BigNumber(10).pow(token.decimals))).toFixed(2)}
              price_change_24h={token.price_change_24h}
              price_change_7d={token.price_change_7d}
              price={token.price}
              rank_change_24h={token.rank_change_24h}
              rank={index + 1}
              isMyAsset={display == 'My Assets'}
            />)
          }
        </table>

      </div>
    </>
  )
}

export default News;