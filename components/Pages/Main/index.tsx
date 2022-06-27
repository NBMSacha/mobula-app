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
import AdvancedSetting from "../../Utils/AdvancedSetting"
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

  return (
    <>

      {/* PAGE 1 */}
      <div className={styles["main-news"]} >
        <MainBlock setDisplay={setDisplay} />
        <Flex bg="var(--gradient)" display={["none", "none", "flex", "flex"]} w="100%" justify="space-around" px="50px" pb="50px" >
          <Flex w="100%" justify="space-around" maxWidth="1750px">
            {props.gainers && props.gainers.length >= 3 ?
              <GainerBlock
                title={'Top Gainers'}
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
      {/* <AdvancedSetting /> */}
      <div className={styles["tables-main-container"]}>

        <TableContainer bg="var(--table)" display="flex" flexDirection="column" alignItems="center">
          {/* <Data /> */}
          <Table style={{ minWidth: "1220px" }} className={styles["table-style"]}>

            <Thead textTransform="capitalize" fontFamily="Inter" borderTop={`2px solid var(--box_border)`} borderBottom={`2px solid var(--box_border)`} color="var(--text-grey)">
              <Tr className={styles[""]}>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" maxWidth="100px" isNumeric className={`${styles["ths"]} ${styles["removes"]}`} minWidth={["220px", "220px", "220px", ""]}>
                  Rank
                  <IconButton ml="3px" fontSize="10px" aria-label='Search database' color="green" _focus={{ boxShadow: "none" }} icon={<TriangleUpIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'rank', ascending: false })
                    }} />
                  <IconButton ml="1px" fontSize="10px" aria-label='Search database' color="red" _focus={{ boxShadow: "none" }} icon={<TriangleDownIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'rank', ascending: true })
                    }} />
                </Th>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" px={["15px", "15px", "20px", "20px"]} className={`${styles["ths"]} ${styles["asset-title-start"]}`} bg="var(--tables)" zIndex="33" style={{ background: "var(--table)" }}>
                  Asset
                </Th>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" isNumeric p={['15px 5px', '15px 5px', 6, 6]} px={["5px", "5px", "20px", "20px"]} className={`${styles["ths"]} ${styles["price-title-center"]}`}>
                  Price
                  <IconButton ml="3px" fontSize="10px" aria-label='Search database' color="green" _focus={{ boxShadow: "none" }} icon={<TriangleUpIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'price', ascending: false })
                    }} />
                  <IconButton ml="1px" fontSize="10px" aria-label='Search database' color="red" _focus={{ boxShadow: "none" }} icon={<TriangleDownIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'price', ascending: true })
                    }} />
                </Th>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" isNumeric className={`${styles["ths"]} ${styles["nowrap"]}`} px={["5px", "5px", "20px", "20px"]} ref={percentageRef}>
                  {textResponsive ? "24h %" : "Change (24h)"}
                  <IconButton ml="3px" fontSize="10px" aria-label='Search database' color="green" _focus={{ boxShadow: "none" }} icon={<TriangleUpIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'price_change_24h', ascending: false })
                    }}
                  />
                  <IconButton ml="1px" fontSize="10px" aria-label='Search database' color="red" _focus={{ boxShadow: "none" }} icon={<TriangleDownIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'price_change_24h', ascending: true })
                    }} />
                </Th>
                <Th fontSize={['12px', "12px", "14x", "14px"]} fontFamily="Inter" textTransform="capitalize" isNumeric className={`${styles["ths"]}`}>
                  Market cap
                  <IconButton ml="3px" fontSize="10px" aria-label='Search database' color="green" _focus={{ boxShadow: "none" }} icon={<TriangleUpIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'market_cap', ascending: false })
                    }} />
                  <IconButton ml="1px" fontSize="10px" aria-label='Search database' color="red" _focus={{ boxShadow: "none" }} icon={<TriangleDownIcon />} onClick={() => {
                    setOrderBy({ type: 'market_cap', ascending: true })
                  }} />
                </Th>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" isNumeric className={`${styles["ths"]} ${styles["nowrap"]}`}>
                  {display == 'My Assets' ? 'Balance' : 'Volume (24h)'}
                  <IconButton ml="3px" fontSize="10px" aria-label='Search database' color="green" _focus={{ boxShadow: "none" }} icon={<TriangleUpIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'volume', ascending: false })
                    }} />
                  <IconButton ml="1px" fontSize="10px" aria-label='Search database' color="red" _focus={{ boxShadow: "none" }} icon={<TriangleDownIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'volume', ascending: true })
                    }} />
                </Th>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" className={`${styles["ths"]} ${styles["center-social"]}`}>
                  Socials
                </Th>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" className={`${styles["ths"]} ${styles["chart-title-center"]}`}>
                  Chart
                </Th>
              </Tr>
            </Thead>

            {
              (orderBy ? getTokensToDisplay(orderBy) : getTokensToDisplay()).map((token: any, index: number) => token ? <Token

                key={token.id || token.balance + token.name}
                id={token.id}
                name={token.name}
                symbol={token.symbol}
                contracts={token.contracts}
                blockchains={token.blockchains}
                pairs={token.pairs}
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
                rank={token.rank}
                isMyAsset={display == 'My Assets'}
              /> : <></>)
            }
          </Table>
        </TableContainer>
      </div>
      <Widget settings={settings} setSettings={setSettings} visible={widgetVisibility} setVisible={setWidgetVisibility} />
      {display != 'My Assets' ? <Pagination maxPage={props[display.split(' ')[0].toLowerCase()]} /> : <></>}
    </>
  )
}

export default News;