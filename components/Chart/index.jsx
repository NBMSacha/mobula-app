import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Chart, ChartType, registerables } from 'chart.js'
import Tendance from '../Header/Tendance'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ArrowUp, ArrowDown } from 'react-feather'
import styles from './Charts.module.scss'
import {
  formatAmount,
  getTokenPrice,
  getTokenPercentage,
  getClosest,
  getUrlFromName
} from '../../helpers/formaters'
import { ethers } from 'ethers';
import ProjectInfo from "./ProjectInfo"
import Head from 'next/head'
import SkipBtn from './SkipBtn'
import { volumeOracles, priceOracles, specialTokens, providers } from '../../constants';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import Swap from "./Swap";
import { ChakraProvider, ColorModeProvider, useColorModeValue, Button, Flex,Box, Text} from '@chakra-ui/react'
import { CSSReset } from '@chakra-ui/react'
import theme from '../../theme/index'
import Charts from "./Charts/index.jsx"


const ChartCryptos = ({ baseAsset, darkTheme }) => {
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
          .select('price_history')
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

    console.log(chart)
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
      isMobile ? 100 : isGiant ? 600 : 400
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
                maxTicksLimit: isMobile ? 4 : 8,
                callback: function (tick) {
                  if (tick == 0) return 0
                  return parseFloat(tick / 1000000000).toFixed(
                    Math.max(12 - String(parseInt(tick)).length, 0)
                  )
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: { color: borderChart },
              type: 'time',
              distribution: 'linear',
              time: {
                unit: dayIf,
                tooltipFormat: 'MM/DD/YYYY        HH:MM:SS',
                displayFormats: {
                  hour: 'HH:mm',
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
      ctx.fillStyle = "#2E3557";
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
    let total_volume = 0;
    let averagePrice = new BigNumber(0)
    let totalLiquidity = new BigNumber(0)

    if (baseAsset.contracts && baseAsset.total_volume_history && baseAsset.blockchains) {

      let error = false;

      for (let i = 0; i < baseAsset.contracts.length; i++) {

        if (priceOracles[baseAsset.blockchains[i]]) {
          const [tokenPrice, tokenLiquidity] = specialTokens.includes(baseAsset.contracts[i]) ? await (new ethers.Contract(
            priceOracles[baseAsset.blockchains[i]],
            ['function getGeneralUSDPrice(address tokenAddress) public view returns(uint256, uint256)'],
            providers[baseAsset.blockchains[i]])).getGeneralUSDPriceUsingStable(baseAsset.contracts[i]) : await (new ethers.Contract(
              priceOracles[baseAsset.blockchains[i]],
              ['function getGeneralUSDPrice(address tokenAddress) public view returns(uint256, uint256)'],
              providers[baseAsset.blockchains[i]])).getGeneralUSDPrice(baseAsset.contracts[i]);

          const safeTokenPrice = new BigNumber(tokenPrice.toString())
          const safeTokenLiquidity = new BigNumber(tokenLiquidity.toString())

          const tokenDecimals = await (new ethers.Contract(
            baseAsset.contracts[i],
            ['function decimals() external view returns (uint256)'],
            providers[baseAsset.blockchains[i]]).decimals());

          //console.log(ethers.utils.parseUnits("10", tokenDecimals.toNumber()))

          const decimalsDivider = new BigNumber(10).pow(18 - tokenDecimals.toNumber());
          const normalizer = new BigNumber(10).pow(18);

          let normalPrice = safeTokenPrice.div(normalizer).div(decimalsDivider);
          let normalLiquidity = safeTokenLiquidity.div(normalizer);

          averagePrice = averagePrice.plus(normalPrice.times(normalLiquidity));
          totalLiquidity = totalLiquidity.plus(normalLiquidity);
        }

        if (volumeOracles[baseAsset.blockchains[i]]) {

          for (const subgraph of volumeOracles[baseAsset.blockchains[i]]) {

            try {
              const { data: result, error } = await axios.post(subgraph.url, {
                query: `
                      {
                        tokens(where: {id: "${baseAsset.contracts[i]}"}) {
                          id,
                          ${subgraph.query}
                        }
                      }
                    `
              })
              console.log(subgraph.url, result.data.tokens[0] ? result.data.tokens[0][subgraph.query] : 0)
              total_volume += parseInt(result.data.tokens[0] ? result.data.tokens[0][subgraph.query] : 0)
            } catch (e) {
              console.log(e)
              error = true;
            }
          }
        }
      }
      if (totalLiquidity.toNumber() > 0) {
        console.log('MODIFYING PRICE')
        //setPrice(averagePrice.div(totalLiquidity).toNumber())
        //setLiquidity(totalLiquidity.toNumber());
        console.log('Updated price : ' + price)
        console.log('Updated liquidity : ' + liquidity)
      } else {
        console.log('CLOCHARD')
      }
      const volume = total_volume - getClosest(baseAsset.total_volume_history.total_volume, Date.now() - 24 * 60 * 60 * 1000)

      if (!error) {
        //setVolume(volume);
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

  useEffect(() => {
    if (state == 'Overview') {
      generateChart()
    }
  }, [state])

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

  function moreStats() {
    try {
      if (hideRef.current.style.display == 'none') {
        console.log('changin style to flex')
        changeRef.current.innerHTML = ' Show Less Stats -'
        hidedaoRef.current.style.display = 'flex'

        return (hideRef.current.style.display = 'flex')
      } else {

        changeRef.current.innerHTML = 'Show More Stats +'
        hidedaoRef.current.style.setProperty('display', 'none', 'important')
        return (hideRef.current.style.display = 'none')
      }
    } catch (err) {
      console.log(err)
    }
  }

  function daoBtn() {
    var x = window.matchMedia('(max-width: 1650px')
    if (x.matches) {
      if (daoRef.current.style.display == 'none') {
        daoRef.current.style.display = 'block'
        dropdownRef.current.style.margin =
          '0px 0px 150px 0px'
      } else {
        daoRef.current.style.display = 'none'
        dropdownRef.current.style.margin =
          '0px 0px 0px 0px'
      }
    } else {
      daoRef.current.preventDefault()
    }
  }
  const borderChart = useColorModeValue("#EAEAEA", "rgba(229, 229, 229, 0.1)")
  const bgChart = useColorModeValue("#F5F5F5", "#131727")
  const borderBox = useColorModeValue("#E5E5E5", "#282C3A")
  const active = useColorModeValue("black", "white")
  const dateChangerBg = useColorModeValue("white_date_changer", "dark_box_list")
  const daoMobile = useColorModeValue("#EFEFEF", "none")

  
  console.log(baseAsset)
  const renderData = () => {

    const [scoreVisible, setScoreVisible] = useState(false)
    const [isRed, setIsRed] = useState(false)
    // if(baseAsset.utility_score + baseAsset.social_score + baseAsset.market_score + baseAsset.trust_score !== 0) {
    //   setIsRed(true)
    // } else {
    //   setIsRed(false)
    // }
    console.log(baseAsset)
    console.log(Math.abs(baseAsset.price_change_24h))
    const shadowColor = useColorModeValue("var(--chakra-colors-shadow)", "none")
    return (
      <>

        <CSSReset />

        <Head>
          <title>{baseAsset.name} price today, {baseAsset.symbol} to USD live, marketcap and chart | Mobula</title>
        </Head>
        <div className='App'>
          <div className={styles['chart-main-container']}>
            <Flex direction="column" className={styles['chart-top-token']}>
              <Flex  w="90%" margin="auto" justify={["space-between","space-between","space-between","space-between"]} align="center">
                <Flex w="45%" h="auto" className={styles['chart-left-top']} justify="center" align={["start","start","start","space-around"]} direction="column">
                 <Flex  mb="8px" align="center" direction="column">
                    <Flex>
                      <img style={{marginRight: "10px"}} src={baseAsset.logo} className={styles['chart-token-logo']} />
                      <Flex className={styles['chart-name-box']}>
                        <div className={styles['chart-token-name']}>
                          <Text className={styles["rank-span"]} mr="5px" color="white_grey">#{baseAsset.rank}</Text>
                          <Text>{baseAsset.name}</Text>
                        </div>
                      </Flex>
                    </Flex>
                    
                      <Text mb="0px" ml="25px" mt={["0px","0px", "-10px",'-10px']} fontSize="10px"><a href="/">Top 100</a> > {baseAsset.name}</Text>
                    
                </Flex>
                <Flex>
                  <Flex align="center" mt="0px" display={["flex", "flex", "flex", "none"]}>
                    <Text boxShadow={`1px 2px 12px 3px ${shadowColor}`} borderRadius="6px" p="2px 5px" bg={daoMobile} fontSize="13px">Dao Score <span style={{color: baseAsset.utility_score +
                    baseAsset.social_score +
                    baseAsset.market_score +
                    baseAsset.trust_score !== 0 ? "#5C7DF9" : "#5C7DF9", marginLeft: "20px"}}>{baseAsset.utility_score +
                      baseAsset.social_score +
                      baseAsset.market_score +
                      baseAsset.trust_score } /20</span></Text>
                    <Button fontSize="12px" ml="10px" onClick={() => {

                      setScoreVisible(!scoreVisible)}
                      }>+</Button>
                  </Flex>
                </Flex>
                </Flex>
                <Flex  direction="column">
                  <Flex whiteSpace="nowrap">
                    <Text fontSize={["22px", "22px", "22px","34px"]} >$ <span style={{marginLeft:"10px"}}> {getTokenPrice(baseAsset.price)}</span></Text>
                    <Flex align="center" ml="10px" color={getTokenPercentage(baseAsset.price_change_24h) > 0 ? "green" : "red"}>

                      <Box className={getTokenPercentage(baseAsset.price_change_24h) > 0 ? styles['triangle-green'] : styles['triangle-red'] }></Box>
                      {getTokenPercentage(baseAsset.price_change_24h)}%
                    </Flex>
                  </Flex>
                  <Flex>
                  <Flex fontSize="13px" direction="column" justify="center" w="108px">
                        <Text display="flex" justifyContent="space-between">High: <span>$2235</span></Text>
                        <Text display="flex" justifyContent="space-between">Low: <span >$2125</span></Text>
                  </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex  w="100%" justify={["space-between","space-between","space-between","start"]} align="center">
                <Flex w="100%"  justify={["space-between","space-between","space-between","space-around"]}>
                 
                  
                </Flex>
                
              </Flex>
             
              
            </Flex>
             {scoreVisible ? (
                <Flex  w="100%" justify='center' align="center" mt="20px">

                   
                <Flex align="center" w='85%' justify={"center"} direction="column" bg={daoMobile} py="10px" boxShadow={`1px 2px 12px 3px ${shadowColor}`} borderRadius="10px"> 
                  <Flex w="90%" fontSize="12px"  display="flex" justifyContent="space-between" mr="20px" m="auto"> 
                    <Flex width="120px" justify="space-between">
                      <Text>Market : </Text>
                      <Text color={baseAsset.market_score >=4  ?'green' :  baseAsset.market_score == 0 ? "none" : baseAsset.market_score <= 2 ? "red" : "none"} ml="20px"> {baseAsset.market_score > 0 ? baseAsset.market_score : "--"}/5</Text>
                    </Flex>
                    <Flex width="120px" justify="space-between">
                      <Text>Reliability : </Text>
                      <Text  color={baseAsset.trust_score >=4  ? 'green' :  baseAsset.trust_score == 0 ? "none" : baseAsset.trust_score <= 2 ? "red" : "none"}>{baseAsset.trust_score > 0 ? baseAsset.market_score : "--"}/5</Text>
                    </Flex>
                  </Flex>

                  <Flex w="90%" fontSize="12px"  display="flex" justifyContent="space-between" mr="20px" m="auto" mt="10px"> 
                    <Flex width="120px" justify="space-between">
                      <Text>Ativity : </Text>
                      <Text  color={baseAsset.social_score >=4  ? 'green' :  baseAsset.social_score == 0 ? "none" : baseAsset.social_score <= 2 ? "red" : "none"} ml="20px">{baseAsset.social_score > 0 ? baseAsset.market_score : "--"}/5</Text>
                    </Flex>
                    <Flex width="120px" justify="space-between">
                      <Text>Utility : </Text>
                      <Text  color={baseAsset.utility_score >=4  ? 'green' :  baseAsset.utility_score == 0 ? "none" : baseAsset.utility_score <= 2 ?"red" : "none"} ml="20px">{baseAsset.utility_score > 0 ? baseAsset.market_score : "--"}/5</Text>
                    </Flex>
                  </Flex>
                </Flex>
            </Flex>
              ) : (<></>)} 
            <Flex justify="center" w="100%" >
                  {/* DAO SCORE */}
                  {baseAsset.utility_score +
                    baseAsset.social_score +
                    baseAsset.market_score +
                    baseAsset.trust_score !== 0 ? (

                   <>
                   <Flex mt={["0px","0px","0px","14px"]}>
                      <Flex align="center" display={["none","none","none","flex"]} mr="150px">
                            <Text fontSize="14px" >DAO Score : <span style={{color:'#3861FB', marginLeft:"14px"}} > {baseAsset.utility_score +
                        baseAsset.social_score +
                        baseAsset.market_score +
                        baseAsset.trust_score} /20</span></Text>
                      </Flex>

                      
                      <Flex align="center" display={["none","none","none","flex"]}> 
                        <Flex fontSize="14px" w="120px" display="flex" justifyContent="space-between" mr="20px">Market : 
                          <Text color={baseAsset.market_score >=4  ?'green' :  baseAsset.market_score <= 2 ? "red" :"none"}> {baseAsset.market_score}/5</Text>
                        </Flex>
                        <Flex fontSize="14px" w="120px" display="flex" justifyContent="space-between" >Reliability : 
                          <Text color={baseAsset.trust_score >=4  ? 'green' :  baseAsset.trust_score <= 2 ? "red" :"none"} ml="20px">{baseAsset.trust_score}/5</Text>
                        </Flex>
                        <Flex fontSize="14px" w="120px" display="flex" justifyContent="space-between" ml="20px" mr="20px">Activity : 
                          <Text color={baseAsset.social_score >=4  ? 'green' :  baseAsset.social_score <= 2 ? "red" :"none"} >{baseAsset.social_score}/5</Text>
                        </Flex>
                        <Flex fontSize="14px" w="120px" display="flex" justifyContent="space-between">Utility : 
                          <Text color={baseAsset.utility_score >=4  ? 'green' :  baseAsset.utility_score <= 2 ? "red" :"none"} ml="20px">{baseAsset.utility_score}/5</Text>
                        </Flex>
                      
                      </Flex>
            
                    </Flex>
                  </>

                   ) : (
                    <>
                  <Flex mt="10px">
                    <Flex align="center" display={["none","none","none","flex"]} mt="20px">
                          <Text fontSize="14px" marginRight="120px">DAO Score : <span style={{color:'#3861FB', marginLeft:"14px"}} > --/20</span></Text>
                    </Flex>
                    <Flex align="center" display={["none","none","none","flex"]} mt="20px" >
                        <Flex fontSize="14px" w="128px" display="flex" justifyContent="space-between" mr="20px">Market : 
                          <Text color={baseAsset.market_score >=4  ?'green' :  baseAsset.market_score <= 2 ? "red" :"none"}>-- /5</Text>
                        </Flex>
                        <Flex fontSize="14px" w="128px" display="flex" justifyContent="space-between" >Reliability : 
                          <Text color={baseAsset.trust_score >=4  ? 'green' :  baseAsset.trust_score <= 2 ? "red" :"none"} ml="20px">-- /5</Text>
                        </Flex>
                        <Flex fontSize="14px" w="128px" display="flex" justifyContent="space-between" ml="20px" mr="20px">Activity : 
                          <Text color={baseAsset.social_score >=4  ? 'green' :  baseAsset.social_score <= 2 ? "red" :"none"} >-- /5</Text>
                        </Flex>
                        <Flex fontSize="14px" w="128px" display="flex" justifyContent="space-between">Utility : 
                          <Text color={baseAsset.utility_score >=4  ? 'green' :  baseAsset.utility_score <= 2 ? "red" :"none"} ml="20px">-- /5</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                 
                    </>)} 
                 
                  
            </Flex>
            <div className={styles['mobile-showInfo-container']}>
              <div
                style={{ 'display': 'none' }}
                className={styles['mobile-info-element']}
                id='hide'
                ref={hideRef}
              >
                <div className={styles['mobile-info-left-column']}>
                  <div className={styles['mobbox']}>
                    <span className={styles['grey']}>MARKET CAP</span>
                    <p className={(!baseAsset.circulating_supply_addresses || baseAsset.circulating_supply_addresses.length == 0 ? `${styles['numbers']} ${styles['unsure']}` : styles['numbers'])}>
                      ${formatAmount(baseAsset.market_cap)}
                    </p>
                  </div>
                  <div className={styles['mobbox']}>
                    <span className={styles['grey']}>VOLUME (24H)</span>
                    <p className={styles['numbers']}>
                      ${formatAmount(volume || baseAsset.volume)}
                    </p>
                  </div>
                  <div className={styles['mobbox']}>
                    <span className={styles['grey']}>
                      FULLY DILUTED MARKET CAP
                    </span>
                    <p className={styles['numbers']}>
                      $
                      {baseAsset.market_cap_diluted
                        ? formatAmount(baseAsset.market_cap_diluted)
                        : '???'}
                    </p>
                  </div>
                </div>
                <div className={styles['mobile-info-right-column']}>
                  <div className={styles['mobboxx']}>
                    <span className={styles['grey']}>CIRCULATING SUPPLY</span>
                    <p className={(!baseAsset.circulating_supply_addresses || baseAsset.circulating_supply_addresses.length == 0 ? `${styles['numbers']} ${styles['unsure']}` : styles['numbers'])}>
                      {baseAsset.circulating_supply
                        ? formatAmount(baseAsset.circulating_supply)
                        : '???'}{' '}
                      {baseAsset.symbol}
                    </p>
                  </div>
                  <div className={styles['mobboxx']}>
                    <span className={styles['grey']}>TOTAL SUPPLY </span>
                    <p className={styles['numbers']}>
                      {baseAsset.total_supply
                        ? formatAmount(baseAsset.total_supply)
                        : '???'}{' '}
                      {baseAsset.symbol}
                    </p>
                  </div>
                  <div className={styles['mobboxx']}>
                    <span className={styles['grey']}>LIQUIDITY </span>
                    <p className={styles['numbers']}>

                      {baseAsset.liquidity
                        ? '$' + formatAmount(parseInt(liquidity || baseAsset.liquidity))
                        : '???'}
                    </p>
                  </div>
                </div>
              </div>
              <button
                id='hidedao'
                ref={hidedaoRef}
                onClick={() => {
                  // mobileDaoBtn()
                }}
              >
       
              </button>
              <Button
                w="90%"
                display={["flex","flex","none","none"]}
                boxShadow={`1px 2px 13px 3px ${shadowColor}`}
                className={styles['btn-more-less']}
                onClick={() => moreStats()}
              >
                <span id='change' ref={changeRef} >Show More Stats +</span>
              </Button>
            </div>
            <Flex className={styles['chart-bottom-container']} borderTop={["none","none","none",`1px solid ${borderBox}`] } borderLeft={["none","none","none",`1px solid ${borderBox}`] }>
              <Flex className={styles['chart-bottom-left']} display={["none", "none" , "none", "flex"]}>
                <div className={styles['left-top-box']}>
                  <span>
                    <p
                      className={`${styles['text-top-chart']} ${styles['topOne']}`}
                    >
                      MARKET CAP
                    </p>
                    <p className={(!baseAsset.circulating_supply_addresses || baseAsset.circulating_supply_addresses.length == 0 ? `${styles['text-bottom-chart']} ${styles['unsure']}` : styles['text-bottom-chart'])}>
                      ${formatAmount(baseAsset.market_cap)}
                      {/* {(!baseAsset.circulating_supply_addresses || baseAsset.circulating_supply_addresses.length == 0 ? <div className={styles['tooltip']}>This data may not be accurate.</div> : <></>)} */}
                    </p>
                  </span>
                  <span>
                    <p className={styles['text-top-chart']}>VOLUME (24H)</p>
                    <p className={styles['text-bottom-chart']}>
                      ${formatAmount(volume > 0 ? volume : baseAsset.volume || '???')}
                    </p>
                  </span>
                  <span>
                    <p className={styles['text-top-chart']}>
                      FULLY DILUTED MARKET CAP
                    </p>
                    <p className={styles['text-bottom-chart']}>
                      $
                      {baseAsset.market_cap_diluted
                        ? formatAmount(baseAsset.market_cap_diluted)
                        : '???'}
                    </p>
                  </span>
                  <span>
                    <p className={styles['text-top-chart']}>CIRCULATING SUPPLY</p>
                    <p className={(!baseAsset.circulating_supply_addresses || baseAsset.circulating_supply_addresses.length == 0 ? `${styles['text-bottom-chart']} ${styles['unsure']}` : styles['text-bottom-chart'])}>
                      {baseAsset.circulating_supply
                        ? formatAmount(baseAsset.circulating_supply)
                        : '???'}{' '}
                      {baseAsset.symbol}
                    </p>
                  </span>
                  <span>
                    <p className={styles['text-top-chart']}>TOTAL SUPPLY </p>
                    <p className={styles['text-bottom-chart']}>
                      {baseAsset.total_supply
                        ? formatAmount(baseAsset.total_supply)
                        : '???'}{' '}
                      {baseAsset.symbol}
                    </p>
                  </span>
                  <span>
                    <p className={styles['text-top-chart']}>LIQUIDITY</p>
                    <p className={styles['text-bottom-chart']}>

                      {baseAsset.liquidity
                        ? '$' + formatAmount(parseInt(liquidity || baseAsset.liquidity))
                        : '???'}
                    </p>
                  </span>
                </div>
               
              </Flex>
              <div className={styles['chart-bottom-right']} >
                <Flex className={styles['chart-box']} id='chart-box' borderLeft={["none","none","none",`1px solid ${borderBox}`] }>
                  <Flex className={styles['chart-header']} borderBottom={["none","none",`1px solid ${borderBox}`,`1px solid ${borderBox}`] } >
             
                      <Button
                        variant={state === 'Overview' ? "secondary" : "none" }
                        onClick={() => { setState('Overview'); }}
                        className={`${styles['chart-header-link']} ${styles['active-chart']}`}
                      >
                        Overview
                      </Button>
                    
                     {state === 'Overview' && visible ? (

                        <p className={styles['warning']}>Loading...</p>
                      ) : (
                        <></>
                      )}
                      <Button variant={state === 'Details' ? "secondary" : "none" } className={`${styles['chart-header-link']} ${styles['active-chart']}`} onClick={() => { setState('Details'); console.log(state) }}>
                        <span>Infos</span>
                      </Button>
                      <Button variant={state === 'Charts' ? "secondary" : "none" } onClick={() => { setState('Charts'); console.log(state) }} className={`${styles['chart-header-link']} ${styles['active-chart']}`}>
                        <span>Market</span>
                      </Button>      
                      <Button disabled variant={state === 'Buy' ? "secondary" : "none" } onClick={() => { setState('Buy'); console.log(state) }} className={`${styles['chart-header-link']} ${styles['active-chart']}`}>
                        <span>Buy</span>
                      </Button>
                    <a
                      href='https://discord.gg/2a8hqNzkzN'
                      className={`${styles['chart-header-link']} ${styles['report-problem']}`}
                    >
                      <span id='inner'>A problem ? report to the DAO </span>
                    </a>
                  </Flex>
                  {state === 'Charts' && (
                    <Charts baseAsset={baseAsset} darkTheme={darkTheme} />
                  )}
                  <div className={styles['chart-content']}>
                    <div className={styles['canvas-container']}>

                      {state === 'Details' && (

                        <ProjectInfo token={baseAsset} blockchain={baseAsset.blockchains} />
                      )}
                      {state === 'Buy' && (
                        <Swap baseAsset={baseAsset} />
                      )}
                      {state === 'Overview' && (
                        <>
                          <canvas id='chart' className={styles["chartCanvas"]}></canvas>
                          <Flex
                            bg={dateChangerBg}
                            className={styles['change-chart-date']}
                            style={{
                              display: 'flex',
                              justifyContent: 'end',
                              marginLeft: 'auto',

                            }}
                          >
                         {(!day || (day.price && day.price.length != 0)) ? timeFormat === "1D" ? (
                              <Button
                                onClick={() => {
                                  setTimeFormat('1D')
                                }}
                                className={`${styles['button-chart']} ${styles['button-chart-active']} ${styles['d']}`} color={active} style={{ margin: "0px !important"}}
                                id='1d'
                              >
                                1D
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  setTimeFormat('1D')
                                }}
                                className={`${styles['button-chart']} ${styles['d']}`}
                                color="grey"
                                
                              >
                                1D
                              </Button>
                            ) : <></>}
                            {(!week || (week.price && week.price.length)) ? timeFormat === "7D" ? (
                              <Button
                                color={active} 
                                onClick={() => {
                                  setTimeFormat('7D')
                                }}
                                className={`${styles['button-chart']} ${styles['button-chart-active']}`}
                               
                                id='7d'
                              >
                                7D
                              </Button>
                            ) : (
                              <button
                                onClick={() => {
                                  setTimeFormat('7D')
                                }}
                                className={styles['button-chart']}
                                color="grey"
                               
                              >
                                7D
                              </button>
                            ) : <></>}

                             


                                  {(!month || (month.price && month.price.length)) ? timeFormat === "30D" && (
                                        <Button
                                          color={active} 
                                          onClick={() => {
                                            setTimeFormat('30D')
                                          }}
                                          className={`${styles['button-chart']} ${styles['button-chart-active']}`}
                                          
                                          id='30d'
                                        >
                                          1M
                                        </Button>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            setTimeFormat('30D')
                                          }}
                                          className={styles['button-chart']}
                                          color="grey"
                                          id='30d'
                                        >
                                          1M
                                        </button>
                                    )}

                                {(!year || (year.price && year.price.length)) ? timeFormat === "1Y" ? (
                                  <Button
                                  color={active} 
                                    onClick={() => {
                                      setTimeFormat('1Y')
                                    }}
                                    className={`${styles['button-chart']} ${styles['button-chart-active']}`}
                                  
                                    id='1Y'
                                  >
                                    1Y
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => {
                                      setTimeFormat('1Y')
                                    }}
                                    className={styles['button-chart']}
                                    color="grey"
                                    id='1Y'
                                  >
                                    1Y
                                  </Button>
                            ) : <></>}
                                {(!all || (all.price && all.price.length)) ? timeFormat === "ALL" ? (
                                  <Button
                                  color={active} 
                                    onClick={() => {
                                      setTimeFormat('ALL')
                                    }}
                                    className={`${styles['button-chart']} ${styles['button-chart-active']}`}
                                  
                                    id='ALL'
                                  >
                                    ALL
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => {
                                      setTimeFormat('ALL')
                                    }}
                                    className={styles['button-chart']}
                                    color="grey"
                                    id='ALL'
                                  >
                                    ALL
                                  </Button>
                            ) : <></>}
                          </Flex>

                        </>
                      )}

                    </div>
                  </div>
                </Flex>
              </div>
            </Flex>
          </div>
          <SkipBtn beforeToken={beforeToken} afterToken={afterToken} />
          <header className=''>
            <div
              className='tokenpage-details '
              style={{ display: 'flex', justifyContent: 'start' }}
            >
            </div>
          </header>
        </div>
      </>
    )

    // return <div>{test()}</div>
  }

  return <div>{renderData()}</div>
}

export default ChartCryptos
