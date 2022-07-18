import React, { useEffect, useState, useRef } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import styles from './Main.module.scss';
import Token from "./Token";
import ButtonBlock from "./Block/ButtonBlock";
import GainerBlock from "./Block/GainerBlock";
import MainBlock from './Block/MainBlock';
import Pagination from "./Pagination"
import BigNumber from 'bignumber.js';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router';
import Widget from "../../Utils/Widget"
import HeaderTable from "../../Utils/HeaderTable"
import { Button, useColorMode, IconButton, useColorModeValue, Flex, Box, Text, Heading, Input, Image, } from "@chakra-ui/react";
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
import ConnectWallet from "../../Utils/ConnectWallet"
import Data from "../../Utils/Data";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"

function News(props: any) {
  const [tokens, setTokens] = useState([]);
  const [myAssets, setMyAssets] = useState([]);
  const [search, setSearch] = useState([]);
  const [display, setDisplay] = useState('Top 100');
  const [chains, setChains] = useState({});
  const { account } = useWeb3React();
  const alert = useAlert()
  const [textResponsive, setTextResponsive] = useState(false);
  const percentageRef = useRef()
  const router = useRouter();
  const page = router.query.page ? parseInt(router.query.page as string) : 1;
  const [settings, setSettings] = useState({ liquidity: 1000, volume: 50_000, onChainOnly: false, default: true })
  const [widgetVisibility, setWidgetVisibility] = useState(false);
  const [orderBy, setOrderBy]: [any, Function] = useState();

  const defaultSettings = {
    'BNB Smart Chain (BEP20)': { liquidity: 0, volume: 10_000, onChainOnly: false, default: false },
    'Ethereum': { liquidity: 1000, volume: 50_000, onChainOnly: false, default: false },
    'Avalanche C-Chain': { liquidity: 0, volume: 0, onChainOnly: false, default: false },
    'Polygon': { liquidity: 0, volume: 0, onChainOnly: false, default: false },
    'Cronos': { liquidity: 0, volume: 0, onChainOnly: false, default: false },
    'Arbitrum': { liquidity: 0, volume: 0, onChainOnly: false, default: false },
    'Harmony': { liquidity: 0, volume: 0, onChainOnly: false, default: false },
  }

  useEffect(() => {
    if (percentageRef && percentageRef.current) {
      if ((window.matchMedia("(max-width: 768px)").matches)) {
        setTextResponsive(true)
      } else {
        setTextResponsive(false)
      }
    }
  }, [])

  useEffect(() => {
    if (!page) return
    if (router.isReady) {
      console.log(page)
      shouldLoadMore()
    }
  }, [page])

  console.log(account)
  function loadChain(chain: string) {
    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )
      console.log(defaultSettings[chain])
    const bufferSettings = settings.default ? defaultSettings[chain] : settings;

    supabase
      .from('assets')
      .select('blockchains,market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price,rank_change_24h,id,contracts,blockchains,pairs,liquidity,rank')
      .contains('blockchains[1]', '{ ' + chain + ' }')
      .filter('volume', 'gte', page < 5 ? bufferSettings.volume : 0)
      .filter('liquidity', 'gte', page < 5 ? bufferSettings.liquidity : 0)
      .order('market_cap', { ascending: false })
      .range(0 + (page - 1) * 100, 200 + (page - 1) * 100)
      .then(r => {
        console.log(r.data, r.error)
        if (r.data) {
          const newChains = {
            ...chains
          }
          newChains[chain] = r.data.filter(token => token.blockchains[0] == chain).slice(0, 100);
          setChains(newChains);
        } else {
          alert.show('Something went wrong')
        }
      })
  }

  function getTokensToDisplay(filterCondition = { type: 'market_cap', ascending: false }): any[] {
    if (display == 'Top 100') {
      return (tokens.length > 0) ? tokens?.sort((a, b) => filterCondition.ascending ? a[filterCondition.type] - b[filterCondition.type] : b[filterCondition.type] - a[filterCondition.type]) :
        page == 1 ? (props.tokens?.sort((a, b) => filterCondition.ascending ? a[filterCondition.type] - b[filterCondition.type] : b[filterCondition.type] - a[filterCondition.type]) || []) : []
    } else if (display == 'My Assets') {

      if (account) {
        if (myAssets.length == 0) {

          axios.get('https://mobulaspark.com/holdings?account=' + account).then(r => {
            if (r.data) {
              const assets = r.data.holdings
                .filter((a: any, index: number) => a.logo && r.data.holdings.map((asset: any) => asset.name).indexOf(a.name) == index)
                .concat(r.data.holdings.filter((a: any, index: number) => !a.logo && !a.name.split('.')[1] && r.data.holdings.map((asset: any) => asset.name).indexOf(a.name) == index))
              setMyAssets(assets)
              return assets?.sort((a, b) => filterCondition.ascending ? a[filterCondition.type] - b[filterCondition.type] : b[filterCondition.type] - a[filterCondition.type]);
            } else {
              alert.error('Something went wrong.')
              return []
            }
          })
          return []
        } else {
          return myAssets?.sort((a, b) => filterCondition.ascending ? a[filterCondition.type] - b[filterCondition.type] : b[filterCondition.type] - a[filterCondition.type]);
        }
      } else {
        alert.show('You must connect your wallet to see your assets.')
        return []
      }

    } else if (display == 'search') {
      return search?.sort((a, b) => filterCondition.ascending ? a[filterCondition.type] - b[filterCondition.type] : b[filterCondition.type] - a[filterCondition.type])
    } else {

      if (!chains[display]) {
        loadChain(display)
        return []
      } else {
        return chains[display]?.sort((a, b) => filterCondition.ascending ? a[filterCondition.type] - b[filterCondition.type] : b[filterCondition.type] - a[filterCondition.type])
      }
    }
  }



  async function shouldLoadMore() {
    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )

    if (display == 'Top 100') {
      supabase
        .from('assets')
        .select('market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price,rank_change_24h,id,contracts,blockchains,pairs,liquidity,rank')
        .filter('volume', 'gte', page < 5 ? settings.volume : 0)
        .order('market_cap', { ascending: false })
        .range(0 + (page - 1) * 100, 200 + (page - 1) * 100)
        .then(r => {
          if (r.data) {
            setTokens(r.data.filter(token => token.liquidity >= (page < 5 ? settings.liquidity : 0) || (token.contracts.length == 0 && !settings.onChainOnly)).slice(0, 100))
          }
        });
    } else if (display != 'My Assets') {
      supabase
        .from('assets')
        .select('blockchains,market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price,rank_change_24h,id,contracts,blockchains,pairs,liquidity,rank')
        .contains('blockchains[1]', '{ ' + display + ' }')
        .filter('volume', 'gte', page < 5 ? settings.volume : 0)
        .order('market_cap', { ascending: false })
        .range(0 + (page - 1) * 100, 200 + (page - 1) * 100)
        .then(r => {
          console.log(r.data, r.error)
          if (r.data) {
            const newChains = {
              ...chains
            }
            newChains[display] = r.data.filter(token => token.blockchains[0] == display).slice(0, 100);
            console.log('Setting cronos chain : ', newChains[display])
            setChains(newChains);
          } else {
            alert.show('Something went wrong')
          }

        })
    }
  }

  useEffect(() => {
    if (settings && !settings.default) {
      shouldLoadMore()
    }
  }, [settings])

  const [ infoGainer, setInfoGainer] = useState(false)
  const [ infoTrend, setInfoTrend] = useState(false)
  const [ infoRecent, setInfoRecent] = useState(false)
  console.log(props.recents)
  return (
    <>

      {/* PAGE 1 */}
      <div className={styles["main-news"]} >
        <MainBlock setDisplay={setDisplay} />
        <Flex bg="var(--gradient)" display={["none", "none", "flex", "flex"]} w="100%" justify="space-around" px="50px" pb="50px" >
          <Flex w="100%" justify="space-around" maxWidth="1750px" mb="10px">
            {props.gainers && props.gainers.length >= 3 ?
              <GainerBlock
                title={'Top Gainers'}
                info={infoGainer}
                setInfo={setInfoGainer}
                logo1={props.gainers[0].logo}
                name1={props.gainers[0].name}
                id1={props.gainers[0].id}
                change1={props.gainers[0].price_change_24h.toFixed(2)}
                logo2={props.gainers[1].logo}
                name2={props.gainers[1].name}
                id2={props.gainers[1].id}
                change2={props.gainers[1].price_change_24h.toFixed(2)}
                logo3={props.gainers[2].logo}
                name3={props.gainers[2].name}
                id3={props.gainers[2].id}
                change3={props.gainers[2].price_change_24h.toFixed(2)}
              /> : <GainerBlock
                info={infoGainer}
                setInfo={setInfoGainer}
                title={'Top Gainers'}
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
            {/* @ts-ignore */}
            {props.trendings && props.trendings.length > 0 ? <GainerBlock
              setInfo={setInfoTrend}
              info={infoTrend}
              title={'Trendings'}
              logo1={props.trendings[0].logo}
              name1={props.trendings[0].name}
              id1={props.trendings[0].id}

              change1={props.trendings[0]?.price_change_24h?.toFixed(2)}
              logo2={props.trendings[1].logo}
              name2={props.trendings[1].name}
              id2={props.trendings[1].id}
              change2={props.trendings[1]?.price_change_24h?.toFixed(2)}
              logo3={props.trendings[2].logo}
              name3={props.trendings[2].name}
              id3={props.trendings[2].id}
              change3={props.trendings[2]?.price_change_24h?.toFixed(2)}
            /> : <GainerBlock
              info={infoTrend}
              setInfo={setInfoTrend}
              title={'Trendings'}
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
            {props.recents && props.recents.length > 0 ?
              <GainerBlock
                setInfo={setInfoRecent}
                info={infoRecent}
                title={'Recently Added'}
                logo1={props.recents[0].logo}
                name1={props.recents[0].name}
                id1={props.recents[0].id}
                change1={props.recents[0].price_change_24h.toFixed(2)}
                logo2={props.recents[1].logo}
                name2={props.recents[1].name}
                id2={props.recents[1].id}
                change2={props.recents[1].price_change_24h.toFixed(2)}
                logo3={props.recents[2].logo}
                name3={props.recents[2].name}
                id3={props.recents[2].id}
                change3={props.recents[2].price_change_24h.toFixed(2)}
              /> : <GainerBlock
                info={infoRecent}
                setInfo={setInfoRecent}
                title={'Recently Added'}
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
          </Flex>
        </Flex>
        <ButtonBlock display={display} setDisplay={setDisplay} setResults={setSearch} widgetVisibility={widgetVisibility} setWidgetVisibility={setWidgetVisibility} />
      </div>
      {/* PAGE 2 */}
      <div className={styles["tables-main-container"]}>
        <HeaderTable title={"Top100"} setOrderBy={setOrderBy} textResponsive={textResponsive} display={display} orderBy={orderBy} getTokensToDisplay={getTokensToDisplay}/>
      </div>
      <Widget settings={settings} setSettings={setSettings} visible={widgetVisibility} setVisible={setWidgetVisibility} />
      {display != 'My Assets' ? <Pagination maxPage={props[display.split(' ')[0].toLowerCase()]} /> : <></>}
    </>
  )
}

export default News;