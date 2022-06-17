import React, { useEffect, useState, useRef } from 'react'
import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import TokenInfo from "./TokenInfo";
import { Search2Icon } from "@chakra-ui/icons"
import axios from 'axios'
import { Chart, ChartType, registerables } from 'chart.js'
import Tendance from '../../Page/Header/Tendance'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ArrowUp, ArrowDown } from 'react-feather'
import {
  formatAmount,
  getTokenPrice,
  getTokenPercentage,
  getClosest,
  getUrlFromName,
  getClosestUltimate
} from '../../../helpers/formaters'
import { ethers } from 'ethers';
import { volumeOracles, priceOracles, specialTokens, providers, stableTokens, tokensPerBlockchain, } from '../../../constants';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { CSSReset, useMediaQuery } from '@chakra-ui/react'
import ChartBox from "./Chart"
import Contract from "../../Utils/Contract"
import styles from './newChart.module.scss';
import Swap from "./Swap"
import MobileInfo from "./MobileInfo"

const Token = ({ baseAsset }) => {
  const socialLink = useColorModeValue("none", "rgba(41, 44, 56, 0.3)")
  const [selector, setSelector] = useState("price")
  const router = useRouter()
  const [timeFormat, setTimeFormat] = useState('7D')
  const [visible, setVisible] = useState(false);
  const [volume, setVolume] = useState(0);
  const [liquidity, setLiquidity] = useState(0);
  const [price, setPrice] = useState(0);
  const [beforeToken, setBeforeToken] = useState({ name: 'Loading...', rank: '?', id: '' })
  const [afterToken, setAfterToken] = useState({ name: 'Loading...', rank: '?' })
  const daoRef = useRef();
  const dropdownRef = useRef();
  const hideRef = useRef();
  const hidedaoRef = useRef();
  const changeRef = useRef();
  const [historyData, setHistoryData] = useState(null);
  const [mobile] = useMediaQuery('(max-width: 768px)');
  const fillStyle = useColorModeValue("#666", "#b8b8b8");
  const [isPriceWinner, setIsWinner]: [boolean, Function] = useState();
  const [selectorInfo, setSelectorInfo] = useState("")
  const [moreStat, setMoreStat] = useState(false)
  const { asset } = router.query;

  const [title, setTitle] = useState("price")

  if (!baseAsset) {
    var [baseAsset, setBaseAsset]: [any, Function] = useState({})
  }

  function roundRect(
    ctx,
    x,
    y,
    width,
    height,
    radius: any = 5,
    fill = false,
    stroke = false
  ) {
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      radius = { ...{ tl: 0, tr: 0, br: 0, bl: 0 }, ...radius };
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1] ? el[1].toFixed(2) : 0,
      }
    })
  }

  const getChart = async (id: number, timeframe: string, type: string) => {
    const supabase = createClient(
      'https://ylcxvfbmqzwinymcjlnx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
    )
    let multiplier;

    const recentLoad = () => {

      return baseAsset ? baseAsset[type + '_history'][type]
        .filter((entry) => entry[0] + multiplier * 24 * 60 * 60 * 1000 > Date.now())
        .map((price) => [price[0], price[1] * 1000000000])
        : null

    }

    const historyLoad = async () => {
      let old;

      if (!historyData) {
        const { data } = await supabase
          .from('history')
          .select(`${type}_history`)
          .match({ asset: id })

        old = data
        console.log('===========')
        console.log(data)
        setHistoryData(data)
      } else {
        console.log('===========')
        console.log(historyData)
        old = historyData
      }

      if (old[0]) {
        const oldData = old[0].price_history
          .filter(
            (entry) => entry[0] + multiplier * 24 * 60 * 60 * 1000 > Date.now()
          )
          .map((price) => [price[0], price[1] * 1000000000])

        return oldData.concat(baseAsset.price_history.price.filter((entry) => entry[0] > oldData[oldData.length - 1][0])
          .map((price) => [price[0], price[1] * 1000000000]))
      } else {
        return null
      }

    }

    switch (timeframe) {
      case '1D':
        multiplier = 1;
        return recentLoad();
      case '7D':
        multiplier = 7;
        return recentLoad()
      case '1M':
        multiplier = 30;
        return await historyLoad()
      case '1Y':
        multiplier = 365;
        return await historyLoad()
      case 'ALL':
        multiplier = Infinity
        return await historyLoad()
    }

  }

  const fetchBeforeToken = async () => {
    const supabase = createClient(
      'https://ylcxvfbmqzwinymcjlnx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
    )

    if (baseAsset) {

      if (baseAsset.rank && baseAsset.rank != 1) {
        supabase.from('assets').select('name,id,rank,volume,liquidity,contracts').or('rank.eq.' + (baseAsset.rank - 1) + ',rank.eq.' + (baseAsset.rank + 1)).then(r => {
          if (r.data) {

            console.log('YOOOOO', r.data)
            r.data = r.data.filter(asset => asset.volume > 50000 && (asset.liquidity > 1000 || asset.contracts.length == 0)).sort((a, b) => a.rank - b.rank)
            setBeforeToken(r.data[0])
            setAfterToken(r.data[r.data.length - 1])

          }
        })
      } else if (baseAsset.rank) {
        setBeforeToken({ name: 'Back to Top 100', id: '/', rank: '0' })
        supabase.from('assets').select('name,id,rank,volume,liquidity,contracts').match({ rank: baseAsset.rank + 1 }).then(r => {
          if (r.data) {
            r.data = r.data.filter(asset => asset.volume > 50000 && (asset.liquidity > 1000 || asset.contracts.length == 0));
            setAfterToken(r.data[0])
          }
        })
      }
    } else {
      router.push("/")
    }
  }


  const fetchLiveData = async () => {
    let subgraphSuccess = 0;
    let expectedPairs = -1;
    let totalLiquidity = 0;
    let averagePrice = 0;

    if (baseAsset.contracts && baseAsset.total_volume_history && baseAsset.blockchains) {

      let error = false;

      for (let i = 0; i < baseAsset.contracts.length; i++) {

        try {
          if (volumeOracles[baseAsset.blockchains[i]]) {
            let currentSubgraph = 0;

            for (const subgraph of volumeOracles[baseAsset.blockchains[i]]) {
              const dead = '0x000000000000000000000000000000000000dead';

              try {

                const { data: result } = await axios.post(subgraph.url, {
                  query: `
                                  {
                                      tokens(where: {id: "${baseAsset.contracts[i].toLowerCase()}"}) {
                                          id,
                                          ${subgraph.query}
                                      }
    
                                     pair0:  pairs(where: {id: "${(baseAsset.pairs[i][currentSubgraph][0] ? baseAsset.pairs[i][currentSubgraph][0] : dead).toLowerCase()}"}) {
                                        reserveUSD
                                        reserve0
                                        reserve1
                                        id
                                        token0{
                                          id
                                          }
                                          token1{
                                          id
                                          }
                                        volumeUSD
                                      }
    
                                      pair1:  pairs(where: {id: "${(baseAsset.pairs[i][currentSubgraph][1] ? baseAsset.pairs[i][currentSubgraph][1] : dead).toLowerCase()}"}) {
                                          reserveUSD
                                          reserve0
                                          reserve1
                                          id
                                          token0{
                                              id
                                          }
                                          token1{
                                              id
                                          }
                                          volumeUSD
                                      }
    
                                      pair2:  pairs(where: {id: "${(baseAsset.pairs[i][currentSubgraph][2] ? baseAsset.pairs[i][currentSubgraph][2] : dead).toLowerCase()}"}) {
                                          reserveUSD
                                          reserve0
                                          reserve1
                                          id
                                          token0{
                                              id
                                          }
                                          token1{
                                              id
                                          }
                                          volumeUSD
                                      }
    
                                      eth: pairs(
                                          first:1,
                                          orderBy:reserveUSD,
                                          orderDirection:desc,
                                          where: {
                                              token0_in: ["${tokensPerBlockchain[baseAsset.blockchains[i]][1].toLowerCase()}", "${tokensPerBlockchain[baseAsset.blockchains[i]][0].toLowerCase()}"],
                                              token1_in: ["${tokensPerBlockchain[baseAsset.blockchains[i]][1].toLowerCase()}", "${tokensPerBlockchain[baseAsset.blockchains[i]][0].toLowerCase()}"],
                                          }
                                      ){
                                      reserveUSD
                                        reserve0
                                        reserve1
                                        token0 {
                                          id
                                        }
                                        volumeUSD
                                      }
                                    }
                                      
                                  `
                })

                var prixETH =
                  tokensPerBlockchain[baseAsset.blockchains[i]][0].toLowerCase() == result.data.eth[0].token0.id ?
                    (result.data.eth[0].reserve1 / result.data.eth[0].reserve0) :
                    (result.data.eth[0].reserve0 / result.data.eth[0].reserve1);

                for (let k = 0; k < 3; k++) {
                  let coef = prixETH;
                  let pair = result.data[`pair${k}`][0];
                  const ETH = tokensPerBlockchain[baseAsset.blockchains[i]][0].toLowerCase();
                  if (pair) {
                    let isBackedOnStable = false;
                    let prixToken = 0;
                    for (let l = 0; l < 2; l++) {
                      const stable = stableTokens[baseAsset.blockchains[i]][0][`vsToken${l}`];
                      if (!isBackedOnStable && (pair.token0.id == stable || pair.token1.id == stable)) {
                        isBackedOnStable = true;
                        coef = 1;
                      }
                    }

                    prixToken =
                      baseAsset.contracts[i].toLowerCase() == pair.token0.id ?
                        (pair.reserve1 / pair.reserve0) * coef :
                        (pair.reserve0 / pair.reserve1) * coef;

                    if (isBackedOnStable && (pair.token0.id == ETH || pair.token1.id == ETH)) {

                      prixToken = baseAsset.contracts[i].toLowerCase() == ETH ? prixETH : 1;

                    }

                    let bufferLiquidity =
                      (pair.reserveUSD / 2) > 500 ?
                        (pair.reserveUSD / 2) : 0;

                    if (!(pair.reserve1.includes('.') && pair.reserve1.includes('.') && pair.reserve0.includes('.') && pair.reserve0.includes('.'))) {
                      bufferLiquidity = 0;
                      console.log(`Price ignored as one reserve does not contain a decimal point`);
                    }

                    totalLiquidity += bufferLiquidity;
                    averagePrice += prixToken * bufferLiquidity;

                    if (bufferLiquidity == 0) {
                      console.log(`LP null or ignored due to the threshold`);
                    }

                    subgraphSuccess++;
                    console.log(`Success subgraph: ${subgraphSuccess}/${expectedPairs}`);
                  }

                }

              } catch (e) {
                console.log('[SUBGRAPH ISSUE] : ' + '\n' + e, 'low ', e);
              }

              currentSubgraph++;

            }

          } else {
            console.log('Not scraping volume because ' + baseAsset.blockchains[i] + ' not supported.')
          }
        } catch (e) {
          console.log('[VOLUME ISSUE] : ' + name + '\n' + e, 'low', e)
          console.log(baseAsset.blockchains)
        }
      }

      if (totalLiquidity > 0) {
        var price = Number(averagePrice / totalLiquidity);
        if (price && !isNaN(price)) {
          setPrice(price);
          console.log('BORRRRR', price)
        }

        console.log(price + ':' + name)
      }

    }
  }

  const fetchHistory = async () => {
    const supabase = createClient(
      'https://ylcxvfbmqzwinymcjlnx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
    )

    const { data } = await supabase
      .from('assets')
      .select('price_history,liquidity_history,rank_history,volume_history')
      .match({ asset: baseAsset.id })

    setHistoryData(data[0] || [])
  }

  useEffect(() => {
    if (baseAsset) {
      fetchBeforeToken()
      fetchHistory()
    }

    try {
      (window as any).chartInstance.destroy()
    } catch (e) { }
  }, [asset])

  useEffect(() => {

    if (price) {
      if (baseAsset.price < price) {
        setIsWinner(true)
      } else if (baseAsset.price > price) {
        setIsWinner(false)
      }

      setTimeout(() => {
        setIsWinner(null)
      }, 500)
    }

  }, [price])

  const getRightData = () => {
    switch (timeFormat) {
      case '1D':
        return baseAsset?.[selector + '_history'][selector].filter((entry: [number, number]) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
          .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * 1000000000 } });
      case '7D':
        return baseAsset?.[selector + '_history'][selector].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
          .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * 1000000000 } });
      case '30D':
        return historyData?.[selector + '_history']
      case '1Y':
        return historyData?.[selector + '_history']
      case 'ALL':
        return historyData?.[selector + '_history']
      default:
        return baseAsset?.[selector + '_history'][selector].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
          .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * 1000000000 } });
    }
  }

  const borderChart = useColorModeValue("#EAEAEA", "rgba(229, 229, 229, 0.1)")
  const bgChart = useColorModeValue("#F5F5F5", "#171B2B")
  const borderBox = useColorModeValue("#E5E5E5", "#282C3A")
  const active = useColorModeValue("black", "white")
  const dateChangerBg = useColorModeValue("white_date_changer", "dark_box_list")
  const daoMobile = useColorModeValue("#EFEFEF", "none")
  const shadow = useColorModeValue('0px 1px 6px 1px #d0d6e3', '0px 1px 12px 3px rgba(0,0,0,0.2)')
  const shadowbis = useColorModeValue("var(--chakra-colors-shadow)", "none")
  const totalScore = baseAsset.social_score + baseAsset.trust_score + baseAsset.utility_score + baseAsset.market_score;
  const border = useColorModeValue("1px solid rgba(229, 229, 229, 0.6)", "none")
  return (

    <Flex justify="center" w="90%" m="auto" className={styles["main"]} mb="50px">

      {/* Left */}
      <Flex direction="column" w={["100%", "100%", "100%", "65%"]} minWidth={["350px", "350px", "350px", "780px"]}>
        {/* Token Information Top */}
        <TokenInfo totalScore={totalScore} setSelectorInfo={setSelectorInfo} selectorInfo={selectorInfo} socialLink={socialLink} baseAsset={baseAsset} />
        <Flex display={["flex", "flex", "flex", "none"]} w="100%" direction="column" align="center" justify="center" mt="20px">
          {/* COMPO */}
          <MobileInfo moreStat={moreStat} totalScore={totalScore} baseAsset={baseAsset} />

          {/*  */}
          <Button
            onClick={() => setMoreStat(!moreStat)}
            w="80%" _focus={{ boxShadow: "none" }}
            boxShadow={`1px 2px 12px 3px ${shadowbis}`}
            py="6px"
            fontSize="10px"

          >
            {moreStat ? "Show less stats" : "Show more stats"}
          </Button>
          <Flex fontWeight="400px" fontSize={["10px", "10px", "13px", "13px"]} mt="15px">
            <Button border={border} _focus={{ boxShadow: "none" }} mr="5px" w="60px" h="24px" color={selector === "price" ? "white" : "none"} bg={selector === "price" ? "blue" : socialLink} onClick={() => { setSelector("price"); }}>Price</Button>
            <Button border={border} _focus={{ boxShadow: "none" }} mr="5px" w="60px" h="24px" color={selector === "liquidity" ? "white" : "none"} bg={selector === "liquidity" ? "blue" : socialLink} onClick={() => { setSelector("liquidity"); }}>Liquidity</Button>
            <Button border={border} _focus={{ boxShadow: "none" }} mr="5px" w="60px" h="24px" color={selector === "volume" ? "white" : "none"} bg={selector === "volume" ? "blue" : socialLink} onClick={() => { setSelector("volume"); }}>Volume</Button>
            <Button border={border} _focus={{ boxShadow: "none" }} mr="5px" w="60px" h="24px" color={selector === "rank" ? "white" : "none"} bg={selector === "rank" ? "blue" : socialLink} onClick={() => { setSelector("rank"); }}>Rank</Button>
            <Button border={border} _focus={{ boxShadow: "none" }} mr="5px" w="60px" h="24px" color={selector === "swap" ? "white" : "none"} bg={selector === "swap" ? "blue" : socialLink} onClick={() => { setSelector("swap") }}>Swap</Button>
          </Flex>
        </Flex>
        {/* Chart Box */}
        {selector !== "Swap" ? (
          <ChartBox historyData={historyData} setTitle={setTitle} setTimeFormat={setTimeFormat} timeFormat={timeFormat} socialLink={socialLink} selector={selector} baseAsset={baseAsset} setSelector={setSelector} />
        ) : (
          <Flex justify="center" display={["flex", "flex", "flex", "none"]}>
            <Swap baseAsset={baseAsset} />
          </Flex>
        )}

      </Flex>
      {/* Right */}
      <Flex display={["none", "none", "none", "flex"]} direction="column" w="30%" mt="50px">
        {/* SWAP */}
        <Swap baseAsset={baseAsset} />
        {/* Contract  */}
        <Box boxShadow={`1px 2px 12px 3px ${shadowbis}`} borderRadius="12px" m="0px 20px" p="30px 10px" mt="10px">
          <Text fontSize="20px" ml="20px">{baseAsset.name} contract(s)</Text>
          <Flex direction="column" w="95%" p="20px" maxHeight="264px" overflowY="scroll" className={styles["scroll"]}>
            {baseAsset.contracts.map((contract: string, idx: number) => {
              return (
                <Contract contract={contract} blockchain={baseAsset.blockchains[idx]} />
              )
            })}
          </Flex>

        </Box>

      </Flex>

    </Flex>
  )
}

export default Token;

