import React, { useEffect, useState, useRef } from 'react'
import { ChakraProvider,Input,InputLeftElement,InputGroup,  Link, Progress,ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import TokenInfo from "./TokenInfo";
import {Search2Icon} from "@chakra-ui/icons"
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
  getUrlFromName
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

const Token = ({ baseAsset }) => { 

  const socialLink = useColorModeValue("none","rgba(41, 44, 56, 0.3)")
  const [ selector, setSelector ] = useState("Volume")
  const router = useRouter()
  const [chart, setChart] = useState({})
  const [day, setDay] = useState()
  const [week, setWeek] = useState()
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [all, setAll] = useState()
  const [timeFormat, setTimeFormat] = useState('7D')
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState('Overview');
  const [volume, setVolume] = useState(0);
  const [liquidity, setLiquidity] = useState(0);
  const [price, setPrice] = useState(0);
  const [beforeToken, setBeforeToken] = useState({ name: 'Loading...', rank: '?' })
  const [afterToken, setAfterToken] = useState({ name: 'Loading...', rank: '?' })
  const daoRef = useRef();
  const dropdownRef = useRef();
  const hideRef = useRef();
  const hidedaoRef = useRef();
  const changeRef = useRef();
  const [historyData, setHistoryData] = useState(null);
  const [mobile] = useMediaQuery('(max-width: 768px)');
  const fillStyle = useColorModeValue("#666", "#b8b8b8");
  const [isPriceWinner, setIsWinner] = useState();
  const [ selectorInfo, setSelectorInfo ] = useState("")
  const [moreStat, setMoreStat] = useState(false)

  const [title, setTitle] = useState("price")

  if (!baseAsset) {
    var [baseAsset, setBaseAsset] = useState({})
  }

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1] ? el[1].toFixed(2) : 0,
      }
    })
  }

  const getChart = async (id, timeframe) => {
    const supabase = createClient(
      'https://ylcxvfbmqzwinymcjlnx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
    )
    let multiplier;

    const recentLoad = () => {

            return baseAsset ? baseAsset.price_history.price
            .filter((entry) => entry[0] + multiplier * 24 * 60 * 60 * 1000 > Date.now())
            .map((price) => [price[0], price[1] * 1000000000])
            : null

    }

    const historyLoad = async () => {
      let old;

      if (!historyData) {
        const { data } = await supabase
          .from('history')
          .select(`${title}_history`)
          .match({ asset: id })

        old = data
        setHistoryData(data)
      } else {
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

  const fetchData = async () => {
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

  const fetchChart = async () => {
    try {
      console.log("loading chart")
      const days = await getChart(baseAsset.id, '1D')

      setChart({ price: formatData(days) })
      setDay({ price: formatData(days) })

      const weeks = await getChart(baseAsset.id, '7D')

      setWeek({ price: formatData(weeks) })

      const months = await getChart(baseAsset.id, '1M')

      setMonth({ price: formatData(months) })

      const years = await getChart(baseAsset.id, '1Y')

      setYear({ price: formatData(years) })

      const alls = await getChart(baseAsset.id, 'ALL')

      setAll({ price: formatData(alls) })
    } catch (err) {
      console.log(err)
    }
  }

  const generateChart = () => {
    var dayIf

    if (timeFormat == '7D') {
      dayIf = 'day'
    }
    if (timeFormat == '30D') {
      dayIf = 'week'
    }
    if (timeFormat == '1Y') {
      dayIf = 'quarter'
    }
    if (timeFormat == 'ALL') {
      dayIf = 'year'
    }

    if (window.chartInstance != undefined) {
      window.chartInstance.destroy()
    }

    var ctx = document.getElementById('chart').getContext('2d')

    const data = determineTimeFormat()
    const isMobile = window.innerWidth < 768
    const isGiant = window.innerWidth > 1500
    const isWinner =
      data && data[0]
        ? parseFloat(data[0].y) < parseFloat(data[data.length - 1].y)
        : true

    let gradient = ctx.createLinearGradient(
      0,
      0,
      0,
      isMobile ? 100 : isGiant ? 400 : 300
    )
    gradient.addColorStop(0, isWinner ? '#00ba7c' : '#D8494A')
    gradient.addColorStop(1, bgChart)

    console.log(isWinner, data)

    window.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Price                ',
            data: data,
            fill: true,
            datasetFill: true,
            borderColor: isWinner ? '#00ba7c' : '#EA3943',
            tension: 0.4,
            backgroundColor: gradient,
            borderWidth: 2,
            pointRadius: 0,
            pointHitRadius: 0,
            highlightFill: 'rgba(220,220,220,0.5)',
            highlightStroke: 'rgba(220,220,220,1)',
            maintainAspectRatio: false,
            pointHoverBorderColor: 'white',
            pointHoverBackgroundColor: isWinner ? 'green' : 'red',
            pointHoverBorderWidth: 2,
            pointHoverBorderRadius: 4,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            usePointStyle: true,
          },
        },
        usePointStyle: true,
        responsive: true,
        plugins: {
          tooltips: {
            enable: false,
            external: externalTooltipHandler,
          },
        },
        tooltips: {
          borderWidth: 2,
          borderColor: 'rgba(47, 54, 88, 1)',
          usePointStyle: true,
          padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0,
          },
          enabled: true,
          backgroundColor: '#05072c',
          displayColors: false,
          callbacks: {
            // HERE YOU CUSTOMIZE THE LABELS
            title: function (tooltipItem, data) {
              return ''
            },
            beforeLabel: function (tooltipItem, data) {
              return tooltipItem.xLabel
            },
            label: function (tooltipItem, data) {
              return '                     '
            },
            afterLabel: function (tooltipItem, data) {
              return (
                data.datasets[tooltipItem.datasetIndex].label +
                ': ' +
                tooltipItem.yLabel / 1000000000
              )
            },
            afterBody: function (tooltipItem, data) {
              return ''
            },
          },
        },
        interaction: {
          mode: 'index',
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: { color: borderChart },
              ticks: {
                beginAtZero: false,
                color: "red",
                maxTicksLimit: isMobile ? 4 : 8,
                callback: function (tick) {
                  if (tick == 0) return 0
                  const price = parseFloat(tick / 1000000000).toFixed(
                    Math.max(12 - String(parseInt(tick)).length, 0)
                  )

                  const exp = price.match(/0\.0+[1-9]/)?.[0] || ''

                  console.log('exxxp', exp)
                  if (exp.length > 5) {
                    return price.split('.')[0] + '...' + price.split(exp.slice(0, exp.length - 2))[1];
                  } else {
                    return price
                  }
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: { color: borderChart },
              type: 'time',
              distribution: 'linear',
              ticks: { color:"red", fontFamily:"Poppins"},
              time: {
                unit: dayIf,
                tooltipFormat: 'MM/DD/YYYY        HH:MM:SS',
                displayFormats: {
                  hour: 'HH:mm',
                  week: "MMM D"
                },
        
              },
              ticks: {
                maxTicksLimit: isMobile ? (dayIf == 'week' ? 2 : 4) : 8,
              },
            },
          ],
        },
      },
    })

    window.chartInstance.canvas.addEventListener('mousemove', (e) => {
      crosshairLine(window.chartInstance, e)
    });

    function crosshairLine(chart, mousemove) {
      const { canvas, ctx, chartArea: { left, right, top, bottom } } = chart;
      chart.update(null);
      ctx.restore();
      if (mousemove.offsetX >= left && mousemove.offsetX <= right && mousemove.offsetY >= top && mousemove.offsetY <= bottom) {
        canvas.style.cursor = "crosshair";
      } else {
        canvas.style.cursor = "default";
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = "#666";
      ctx.setLineDash([3, 3]);

      ctx.beginPath();
      if (mousemove.offsetY >= top && mousemove.offsetY <= bottom) {
        ctx.moveTo(left, mousemove.offsetY);
        ctx.lineTo(right, mousemove.offsetY);
        ctx.stroke();
      }
      ctx.closePath();

      ctx.beginPath();
      if (mousemove.offsetX >= left && mousemove.offsetX <= right) {
        ctx.moveTo(mousemove.offsetX, top);
        ctx.lineTo(mousemove.offsetX, bottom);
        ctx.stroke();
      }
      ctx.closePath();

      crosshairLabel(chart, mousemove);
    }

    function crosshairLabel(chart, mousemove) {
      const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales } = chart;
      const y = scales["y-axis-0"];
      ctx.beginPath();
      ctx.fillStyle = fillStyle;
      ctx.fillRect(0, mousemove.offsetY - 10, left, 20);
      ctx.closePath();

      ctx.font = '10px Inter';
      ctx.fillStyle = "white";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const number = y.getValueForPixel(mousemove.offsetY) / 1000000000;
      ctx.fillText(getTokenPrice(number), left / 2, mousemove.offsetY)
    }

    if (!data || data.length == 0) {
      setVisible(true)
    } else {
      setVisible(false)
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

  useEffect(() => {
    fetchData()
    if (baseAsset) {
      fetchChart()
      fetchLiveData()
    }
  }, [])

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



  const externalTooltipHandler = () => {
    let tooltipEl = document.getElementById('chartjs-tooltip')

    // Create element on first render
    if (!tooltipEl) {
      tooltipEl = document.createElement('div')
      tooltipEl.id = 'chartjs-tooltip'
      tooltipEl.innerHTML = '<table></table>'
      document.body.appendChild(tooltipEl)
    }

    // Hide if no tooltip
    const tooltipModel = context.tooltip
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0
      return
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform')
    if (tooltipModel.yAlign) {
      tooltipEl.classList.add('test')
    } else {
      tooltipEl.classList.add('no-transform')
    }

    function getBody(bodyItem) {
      return bodyItem.lines
    }

    // Set Text
    if (tooltipModel.body) {
      const titleLines = tooltipModel.title || []
      const bodyLines = tooltipModel.body.map(getBody)

      let innerHtml = '<thead>'

      titleLines.forEach(function (title) {
        innerHtml += '<tr><th>' + title + '</th></tr>'
      })
      innerHtml += '</thead><tbody>'

      bodyLines.forEach(function (body, i) {
        const colors = tooltipModel.labelColors[i]
        let style = 'background:' + colors.backgroundColor
        style += '; border-color:' + colors.borderColor
        style += '; border-width: 2px'
        const span = '<span style="' + style + '"></span>'
        innerHtml += '<tr><td>' + span + body + '</td><tr>'
      })
      innerHtml += '</tbody>'

      let tableRoot = tooltipEl.querySelector('table')
      tableRoot.innerHTML = innerHtml
    }

    const position = context.chart.canvas.getBoundingClientRect()
    const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont)

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1
    tooltipEl.style.position = 'absolute'
    tooltipEl.style.left =
      position.left + window.pageXOffset + tooltipModel.caretX + 'px'
    tooltipEl.style.top =
      position.top + window.pageYOffset + tooltipModel.caretY + 'px'
    tooltipEl.style.font = bodyFont.string
    tooltipEl.style.padding =
      tooltipModel.padding + 'px ' + tooltipModel.padding + 'px'
    tooltipEl.style.pointerEvents = 'none'
  }

  useEffect(() => {
    generateChart()
  }, [timeFormat, day])

  useEffect(() => {
    if (timeFormat == '7D') {
      generateChart()
    }
  }, [week])

  useEffect(() => {
    if (timeFormat == '30D') {
      generateChart()
    }
  }, [month])

  useEffect(() => {
    if (timeFormat == '1Y') {
      generateChart()
    }
  }, [year])

  useEffect(() => {
    if (timeFormat == 'ALL') {
      generateChart()
    }
  }, [all])

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case '1D':
        return day?.price
      case '7D':
        return week?.price
      case '30D':
        return month?.price
      case '1Y':
        return year?.price
      case 'ALL':
        return all?.price
      default:
        return week?.price
    }
  }

  const borderChart = useColorModeValue("#EAEAEA", "rgba(229, 229, 229, 0.1)")
  const bgChart = useColorModeValue("#F5F5F5", "#131727")
  const borderBox = useColorModeValue("#E5E5E5", "#282C3A")
  const active = useColorModeValue("black", "white")
  const dateChangerBg = useColorModeValue("white_date_changer", "dark_box_list")
  const daoMobile = useColorModeValue("#EFEFEF", "none")
  const shadow = useColorModeValue('0px 1px 6px 1px #d0d6e3', '0px 1px 12px 3px rgba(0,0,0,0.2)')
  const shadowbis = useColorModeValue("var(--chakra-colors-shadow)", "none")
  const totalScore = baseAsset.social_score + baseAsset.trust_score + baseAsset.utility_score + baseAsset.market_score;

 return (

   <Flex justify="center" w="90%" m="auto" className={styles["main"]}>

        {/* Left */}
        <Flex direction="column" w={["100%","100%","100%","65%"]} minWidth={["350px", "350px","350px","780px"]}>
            {/* Token Information Top */}
            <TokenInfo totalScore={totalScore} setSelectorInfo={setSelectorInfo} selectorInfo={selectorInfo} socialLink={socialLink} baseAsset={baseAsset} />
            <Flex display={["flex", "flex", "flex", "none"]} w="100%" direction="column" align="center" justify="center" mt="20px">
                {/* COMPO */}
                <Box display={moreStat ? "block" : "none"}>
                    <Text p="0px 25px" fontSize="10px" lineHeight="18px">{baseAsset.description}</Text>
                    <Flex justify="space-between" w='100%' p="0px 25px" mt="20px">
                        <Box mb="20px">
                            <Text fontSize="9px" opacity=".6">Marketcap</Text>
                            <Text mb="10px" fontSize="12px">${baseAsset.market_cap}</Text>
                            <Text fontSize="9px" opacity=".6">Volume (24h)</Text>
                            <Text mb="10px" fontSize="12px">${baseAsset.volume}</Text>
                            <Text fontSize="9px" opacity=".6">Fully diluted Marketcap</Text>
                            <Text fontSize="12px">${baseAsset.market_cap_diluted}</Text>
                        </Box>
                        <Box mb="20px">
                            <Text fontSize="9px" opacity=".6">Circulating supply</Text>
                            <Text mb="10px" fontSize="12px">${baseAsset.circulating_supply}</Text>
                            <Text fontSize="9px" opacity=".6">Total supply</Text>
                            <Text mb="10px" fontSize="12px">${baseAsset.total_supply}</Text>
                            <Text fontSize="9px" opacity=".6">Max supply</Text>
                            <Text fontSize="12px">--</Text>
                        </Box>
                    </Flex>
                    <Box px="25px" mr="auto">
                        <Flex fontSize="10px" align="center" >
                            <Text opacity=".6" mr="10px">DAO Score</Text>
                            <Text color={ totalScore > 10 ? "green" : totalScore == 0 ? "none" : "red"}>{totalScore !== 0 ? totalScore : "--" }/20</Text>
                        </Flex>
                        <Flex opacity=".6" align="center" mt="10px" mb="15px">
                            <Flex fontSize="9px" align="center" >
                                <Text mr="15px">Reliability</Text>
                                <Text mr="25px">{baseAsset.trust_score}/5</Text>
                            </Flex>
                            <Flex fontSize="9px" align="center" >
                                <Text mr="15px">Market</Text>
                                <Text mr="25px">{baseAsset.market_score}/5</Text>
                            </Flex>
                            <Flex fontSize="9px" align="center" >
                                <Text mr="15px">Utility</Text>
                                <Text mr="25px">{baseAsset.utility_score}/5</Text>
                            </Flex>
                        </Flex>
                        <Flex mb="20px" wrap="wrap"justify="center" w="100%" maxHeight="80px" overflowY="scroll">
                        {baseAsset.contracts.map((contract: string, idx: number) => {
                        
                        return (
                       
                           <Contract contract={contract} blockchain={baseAsset.blockchains[idx]} />
                       )
                   } )}
                        </Flex>
                        
                    </Box>
                </Box>
                
                {/*  */}
                <Button
                    onClick={() => setMoreStat(!moreStat)}
                    w="80%" _focus={{boxShadow:"none"}}
                    boxShadow={`1px 2px 12px 3px ${shadowbis}`}
                    py="6px"
                    fontSize="10px"
                    
                >
                    {moreStat ? "Show less stats" : "Show more stats"}
                </Button>
                <Flex fontWeight="400px" fontSize={["10px","10px","13px","13px"]} mt="15px">
                    <Button _focus={{boxShadow:"none"}} mr="10px" w="75px" h="24px" bg={selector === "Price" ? "blue" : socialLink } onClick={() => {setSelector("Price"); setTitle("price")}}>Price</Button>
                    <Button _focus={{boxShadow:"none"}} mr="10px" w="75px" h="24px" bg={selector === "Market" ? "blue" : socialLink } onClick={() => {setSelector("Market"); setTitle("rank")}}>Market Cap</Button>
                    <Button _focus={{boxShadow:"none"}} mr="10px" w="75px" h="24px" bg={selector === "Volume" ? "blue" : socialLink } onClick={() => {setSelector("Volume"); setTitle("volume")}}>Volume</Button>
                    <Button _focus={{boxShadow:"none"}} mr="10px" w="75px" h="24px" bg={selector === "Swap" ? "blue" : socialLink } onClick={() => {setSelector("Swap")}}>Swap</Button>
                </Flex>
            </Flex>
            {/* Chart Box */}
            {selector !== "Swap" ? (
                <ChartBox setTitle={setTitle} setTimeFormat={setTimeFormat} timeFormat={timeFormat} socialLink={socialLink} selector={selector} baseAsset={baseAsset} setSelector={setSelector} />
            ) : ( 
                <Flex justify="center" display={["flex","flex","flex","none"]}>
                    <Swap shadowbis={shadowbis} baseAsset={baseAsset} />
                </Flex>
            )}
            
        </Flex>
        {/* Right */}
        <Flex display={["none", "none","none","flex"]} direction="column" w="30%" mt="50px">
            {/* SWAP */}
           <Swap baseAsset={baseAsset} />
           {/* Contract  */}
           <Box boxShadow={`1px 2px 12px 3px ${shadowbis}`} borderRadius="12px" m="0px 20px" p="30px 10px" mt="10px">
               <Text fontSize="20px" ml="20px">Ethereum contract(s)</Text>
               <Flex  direction="column" w="95%" p="20px" maxHeight="264px" overflowY="scroll" className={styles["scroll"]}> 
                    {baseAsset.contracts.map((contract: string, idx: number) => {
                        
                         return (
                        
                            <Contract contract={contract} blockchain={baseAsset.blockchains[idx]} />
                        )
                    } )}
                </Flex>
                
            </Box>  
          
        </Flex>
    
    </Flex>
    )
}

export default Token;

