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
import { Button, useColorMode, IconButton,useColorModeValue, Flex, Box, Text, Heading, Input, Image, } from "@chakra-ui/react";
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

function News(props: any) {

  const [tokens, setTokens] = useState([]);
  const [myAssets, setMyAssets] = useState([]);
  const [search, setSearch] = useState([]);
  const [display, setDisplay] = useState('Top 100');
  const [chains, setChains] = useState({});
  const { account, active, activate, deactivate } = useWeb3React();
  const alert = useAlert()
  const [textResponsive, setTextResponsive] = useState(false);
  const percentageRef = useRef()
  const router = useRouter();
  const page = router.query.page ? parseInt(router.query.page as string) : 1;
  const [ widgetVisible, setWidgetVisible] = useState(false)

  console.log(props, props[display.split(' ')[0].toLowerCase()])
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
    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )
    if (router.isReady) {
      console.log(page)
      shouldLoadMore(supabase)
    }

  }, [page])

  function loadChain(chain: string) {
    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )

    supabase
      .from('assets')
      .select('blockchains,market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price,rank_change_24h,id,contracts,blockchains,pairs,liquidity')
      .contains('blockchains[1]', '{ ' + chain + ' }')
      .filter('volume', 'gte', page < 5 ? 50000 : 0)
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

  function getTokensToDisplay(): any[] {
    if (display == 'Top 100') {
      return (tokens.length > 0) ? tokens : page == 1 ? (props.tokens || []) : []
    } else if (display == 'My Assets') {

      if (account) {
        if (myAssets.length == 0) {

          axios.get('https://mobulaspark.com/holdings?account=' + account).then(r => {
            if (r.data) {
              const assets = r.data.holdings
                .filter((a: any, index: number) => a.logo && r.data.holdings.map((asset: any) => asset.name).indexOf(a.name) == index)
                .concat(r.data.holdings.filter((a: any, index: number) => !a.logo && !a.name.split('.')[1] && r.data.holdings.map((asset: any) => asset.name).indexOf(a.name) == index))
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

    } else if (display == 'Ethereum') {

      if (!chains['Ethereum']) {
        loadChain('Ethereum')
        return []
      } else {
        return chains['Ethereum']
      }
    } else if (display == 'BNB Smart Chain (BEP20)') {

      if (!chains['BNB Smart Chain (BEP20)']) {
        loadChain('BNB Smart Chain (BEP20)')
        return []
      } else {
        return chains['BNB Smart Chain (BEP20)']
      }
    } else if (display == 'Avalanche C-Chain') {

      if (!chains['Avalanche C-Chain']) {
        loadChain('Avalanche C-Chain')
        return []
      } else {
        return chains['Avalanche C-Chain']
      }
    } else if (display == 'Polygon') {

      if (!chains['Polygon']) {
        loadChain('Polygon')
        return []
      } else {
        return chains['Polygon']
      }
    } else if (display == 'search') {
      return search
    }
    else {
      return []
    }
  }

  console.log(props)
  async function shouldLoadMore(supabase: SupabaseClient) {

    if (display == 'Top 100') {
      supabase
        .from('assets')
        .select('market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price,rank_change_24h,id,contracts,blockchains,pairs,liquidity')
        .filter('volume', 'gte', page < 5 ? 50000 : 0)
        .order('market_cap', { ascending: false })
        .range(0 + (page - 1) * 100, 200 + (page - 1) * 100)
        .then(r => {
          if (r.data) {
            setTokens(r.data.filter(token => token.liquidity >= (page < 5 ? 1000 : 0) || token.contracts.length == 0).slice(0, 100))
          }
        });
    } else if (display != 'My Assets') {
      supabase
        .from('assets')
        .select('blockchains,market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price,rank_change_24h,id,contracts,blockchains,pairs,liquidity')
        .contains('blockchains[1]', '{ ' + display + ' }')
        .filter('volume', 'gte', page < 5 ? 50000 : 0)
        .order('market_cap', { ascending: false })
        .range(0 + (page - 1) * 100, 200 + (page - 1) * 100)
        .then(r => {
          console.log(r.data, r.error)
          if (r.data) {
            const newChains = {
              ...chains
            }
            newChains[display] = r.data.filter(token => token.blockchains[0] == display).slice(0, 100);
            setChains(newChains);
          } else {
            alert.show('Something went wrong')
          }

        })
    }
  }

  const gradient = useColorModeValue("white_gradient", "dark_gradient")
  const border = useColorModeValue("#E5E5E5", "var(--chakra-colors-dark_border_title)")
  const sticky = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")

  return (
    <>

      {/* PAGE 1 */}
      <div className={styles["main-news"]}>
     
        <MainBlock setDisplay={setDisplay} />
        <Flex bg={gradient} display={["none", "none", "flex", "flex"]}  w="100%" justify="space-around" px="50px" pb="50px">
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
          {props.trendings && props.trendings.length > 0 ? <GainerBlock
            title={'Trendings'}
            logo1={props.trendings[0].logo}
            name1={props.trendings[0].name}
            id1={props.trendings[0].id}
            change1={props.trendings[0].price_change_24h.toFixed(2)}
            logo2={props.trendings[1].logo}
            name2={props.trendings[1].name}
            id2={props.trendings[1].id}
            change2={props.trendings[1].price_change_24h.toFixed(2)}
            logo3={props.trendings[2].logo}
            name3={props.trendings[2].name}
            id3={props.trendings[2].id}
            change3={props.trendings[2].price_change_24h.toFixed(2)}
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
        <ButtonBlock display={display} widget={widgetVisible} setWidget={setWidgetVisible} setDisplay={setDisplay} setResults={setSearch} />
      </div>
      <ConnectWallet />
      {console.log(display)}
      {/* PAGE 2 */}
      <div className={styles["tables-main-container"]}>
      <TableContainer>
        <Table style={{minWidth: "1220px"}} className={styles["table-style"]}>
          <Thead borderBottom={`2px solid ${border}`} borderTop={`2px solid ${border}`} >
            <Tr className={styles[""]}>
              <Th maxWidth="100px" isNumeric className={`${styles["ths"]} ${styles["removes"]}`} minWidth={["220px","220px","220px",""]}>Rank</Th>
              <Th className={`${styles["ths"]} ${styles["asset-title-start"]}`} style={{background: sticky}}>Asset</Th>
              <Th isNumeric className={`${styles["ths"]} ${styles["price-title-center"]}`}>Price</Th>
              <Th isNumeric className={`${styles["ths"]} ${styles["nowrap"]}`} ref={percentageRef}>
                {textResponsive ? (
                  <p>24h %</p>
                ) : (
                  <p>Change (24h)</p>
                )}
              </Th>
              <Th isNumeric className={`${styles["ths"]}`}>Market cap</Th>
              <Th isNumeric className={`${styles["ths"]} ${styles["nowrap"]}`}>{display == 'My Assets' ? 'Balance' : 'Volume (24h)'}</Th>
              <Th className={`${styles["ths"]} ${styles["center-social"]}`}>Socials</Th>
              <Th className={`${styles["ths"]} ${styles["chart-title-center"]}`}>Chart</Th>
            </Tr>
          </Thead>

          {
            getTokensToDisplay().map((token: any, index: number) => token ? <Token

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
              rank={(page - 1) * 100 + index + 1}
              isMyAsset={display == 'My Assets'}
            /> : <></>)
          }
        </Table>
        </TableContainer>
      </div>
      {widgetVisible && (
         <Widget />
      )}
     
      {display != 'My Assets' ? <Pagination maxPage={props[display.split(' ')[0].toLowerCase()]} /> : <></>}
    </>
  )
}

export default News;