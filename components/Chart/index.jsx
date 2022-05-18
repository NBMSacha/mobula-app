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
} from '../../helpers/formaters'
import { ethers } from 'ethers';
import ProjectInfo from "./ProjectInfo"
import Head from 'next/head'
import SkipBtn from './SkipBtn'
import { volumeOracles, priceOracles, specialTokens, providers } from '../../constants';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import Swap from "./Swap";
import {
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
} from '@chakra-ui/react'
import { CSSReset } from '@chakra-ui/react'
import theme from '../../theme/index'
import Charts from "./Charts/index.jsx"


const ChartCryptos = ({ baseAsset }) => {
  const router = useRouter()
  const [coins, setCoins] = useState([])
  const [chart, setChart] = useState({})
  const [day, setDay] = useState({})
  const [week, setWeek] = useState({})
  const [month, setMonth] = useState({})
  const [year, setYear] = useState({})
  const [all, setAll] = useState({})
  const [timeFormat, setTimeFormat] = useState('')
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState('Overview');
  const [volume, setVolume] = useState(0);
  const [liquidity, setLiquidity] = useState(0);
  const [price, setPrice] = useState(0);
  const [beforeToken, setBeforeToken] = useState({ name: 'Loading...', rank: '?', id: '' })
  const [afterToken, setAfterToken] = useState({ name: 'Loading...', rank: '?', id: '' })

  if (!baseAsset) {
    var [baseAsset, setBaseAsset] = useState({})
  }

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      }
    })
  }

  const getChart = async (id, timeframe) => {
    const supabase = createClient(
      'https://ylcxvfbmqzwinymcjlnx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
    )

    if (timeframe == '1D') {
      return baseAsset ? baseAsset.price_history.price
        .filter((entry) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
        .map((price) => [price[0], price[1] * 1000000000])
        : null
    } else if (timeframe == '7D') {
      return baseAsset
        ? baseAsset.price_history.price
          .filter((entry) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
          .map((price) => [price[0], price[1] * 1000000000])
        : null
    } else if (timeframe == '1M') {
      const { data: old } = await supabase
        .from('history')
        .select('price_history')
        .match({ asset: id })
      return old[0]
        ? old[0].price_history
          .filter((entry) => entry[0] + 30 * 24 * 60 * 60 * 1000 > Date.now())
          .map((price) => [price[0], price[1] * 1000000000])
        : null
    } else if (timeframe == '3M') {
      const { data: old } = await supabase
        .from('history')
        .select('price_history')
        .match({ asset: id })
      return old[0]
        ? old[0].price_history
          .filter((entry) => entry[0] + 90 * 24 * 60 * 60 * 1000 > Date.now())
          .map((price) => [price[0], price[1] * 1000000000])
        : null
    } else if (timeframe == '1Y') {
      const { data: old } = await supabase
        .from('history')
        .select('price_history')
        .match({ asset: id })
      return old[0]
        ? old[0].price_history
          .filter(
            (entry) => entry[0] + 356 * 24 * 60 * 60 * 1000 > Date.now()
          )
          .map((price) => [price[0], price[1] * 1000000000])
        : null
    } else if (timeframe == 'ALL') {
      const { data: old } = await supabase
        .from('history')
        .select('price_history')
        .match({ asset: id })
      return old[0]
        ? old[0].price_history
          .map((price) => [price[0], price[1] * 1000000000])
        : null
    }

    // if (timeframe == '1D') {
    //   if(state === 'Charts') {
    //     return baseAsset ? baseAsset.volume_history.price
    //     .filter((entry) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
    //     .map((price) => [price[0], price[1] * 1000000000])
    //     : null
    //   }
     
    // }
    // if (timeframe == '1D') {
    //   if(state === 'Charts') {
    //     return baseAsset ? baseAsset.liquidity_history.price
    //     .filter((entry) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
    //     .map((price) => [price[0], price[1] * 1000000000])
    //     : null
    //   }
    // }
    // if (timeframe == '1D') {
    //   if(state === 'Charts') {
    //     return baseAsset ? baseAsset.rank_history.price
    //     .filter((entry) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
    //     .map((price) => [price[0], price[1] * 1000000000])
    //     : null
    //   }
     
    // }
    
  }

  const fetchData = async () => {
    const supabase = createClient(
      'https://ylcxvfbmqzwinymcjlnx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
    )

    if (baseAsset) {

      if (baseAsset.rank && baseAsset.rank != 1) {
        supabase.from('assets').select('name,id,rank').or('rank.eq.' + (baseAsset.rank - 1) + ',rank.eq.' + (baseAsset.rank + 1)).then(r => {
          console.log('DONE')

          if (r.data) {

            r.data = r.data.sort((a, b) => a.rank - b.rank)

            setBeforeToken(r.data[0])
            setAfterToken(r.data[r.data.length - 1])

          }
        })
      } else if (baseAsset.rank) {
        setBeforeToken({ name: 'Back to Top 100', id: '/', rank: '0' })
        supabase.from('assets').select('name,id,rank').match({ rank: baseAsset.rank + 1 }).then(r => {
          if (r.data) {
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
    gradient.addColorStop(1, '#05062A')

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
              gridLines: { color: '#0c1230' },
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
              gridLines: { display: false },
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

          //We 
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
        setPrice(averagePrice.div(totalLiquidity).toNumber())
        setLiquidity(totalLiquidity.toNumber());
        console.log('Updated price : ' + price)
        console.log('Updated liquidity : ' + liquidity)
      } else {
        console.log('CLOCHARD')
      }

      const volume = total_volume - getClosest(baseAsset.total_volume_history.total_volume, Date.now() - 24 * 60 * 60 * 1000)

      if (!error) {
        setVolume(volume);
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

  // useEffect(() => {
  //   fetchChart()
  //   fetchLiveData()
  // }, [baseAsset])

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
        return day.price
      case '7D':
        return week.price
      case '30D':
        return month.price
      case '1Y':
        return year.price
      case 'ALL':
        return all.price
      default:
        return day.price
    }
  }

  function moreStats() {
    try {
      let hide = document.getElementById('hide')
      let change = document.getElementById('change')
      if (hide.style.display == 'none') {
        console.log('changin style to flex')
        change.innerHTML = 'Less Stats'
        document.getElementById('hidedao').style.display = ''

        return (hide.style.display = 'flex')
      } else {
        console.log(hide.style.display)

        change.innerHTML = 'More Stats'
        document
          .getElementById('hidedao')
          .style.setProperty('display', 'none', 'important')
        return (hide.style.display = 'none')
      }
    } catch (err) {
      console.log(err)
    }
  }

  function mobileDaoBtn() {
    var btnMobile = document.getElementById('daoBtn-mobile')
    if (btnMobile.style.display == 'none') {
      btnMobile.style.display = 'block'
    } else {
      btnMobile.style.display = 'none'
    }
  }

  function daoBtn() {
    var x = window.matchMedia('(max-width: 1650px')
    let daoBtn = window.document.getElementById('daoBtn')
    let btnNotes = window.document.getElementById('btnNotes')
    if (x.matches) {
      if (daoBtn.style.display == 'none') {
        daoBtn.style.display = 'block'
        window.document.getElementById('dropdown').style.margin =
          '0px 0px 150px 0px'
      } else {
        daoBtn.style.display = 'none'
        window.document.getElementById('dropdown').style.margin =
          '0px 0px 0px 0px'
      }
    } else {
      daoBtn.preventDefault()
    }
  }

  const renderData = () => {
    return (
      <>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <ColorModeProvider
            options={{
              initialColorMode: 'light',
              useSystemColorMode: true,
            }}
          ></ColorModeProvider>
          <Head>
            <title>{baseAsset.name} price today, {baseAsset.symbol} to USD live, marketcap and chart | Mobula</title>
          </Head>
          <div className='App'>
            <div className={styles['chart-main-container']}>
              <div className={styles['chart-top-token']}>
                <div className={styles['flex']}>
                  <div className={styles['chart-left-top']}>
                    <img src={baseAsset.logo} className={styles['chart-token-logo']} />
                    <div className={styles['chart-name-box']}>
                      <div className={styles['chart-token-name']}>
                        <span>{baseAsset.name}</span>
                      </div>
                      <div className={styles['chart-token-rank']}>
                        <span className={styles["rank-span"]}>Rank #{baseAsset.rank}</span>
                        {baseAsset.rank_change_24h < 0 ? (
                          <span
                            className={`${styles["token-percentage-box"]} ${styles["font-char"]} ${styles["red"]}`}
                            id='noColor'
                          >
                            <ArrowDown className={styles['arrowDown']} />
                            {Math.abs(baseAsset.rank_change_24h)}
                          </span>
                        ) : baseAsset.rank_change_24h == 0 ? (
                          <div></div>
                        ) : (
                          <span
                            className={`${styles["token-percentage-box"]} ${styles["font-char"]} ${styles["green"]}`}
                            id='noColor'
                          >
                            <ArrowUp className='arrowUp' />
                            {baseAsset.rank_change_24h}
                          </span>
                        )}{' '}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles['chart-right-top']}>
                  <div className={styles['chart-box-container']}>
                    <div className={styles['chart-right-info']}>
                      <p className={styles['test']}>
                        ${getTokenPrice(price || baseAsset.price)}
                      </p>
                      {baseAsset.price_change_24h < 0 ? (
                        <div className={styles['chart-lose']}>
                          <span>
                            <ArrowDown />
                          </span>
                          <span>{getTokenPercentage(baseAsset.price_change_24h)}%</span>
                        </div>
                      ) : (
                        <div className={styles['chart-gain']}>
                          <span>
                            <ArrowUp className={styles["arrow"]} />
                          </span>
                          <span>{getTokenPercentage(baseAsset.price_change_24h)}%</span>
                        </div>
                      )}
                    </div>
                    {/* <div className={styles["chart-info-box"]}>
                  <div className={styles["box-info"]}>
                    <p className={styles["grey"]} style={{ marginRight: "14px !important" }}>High:</p>
                    <p className={styles["numbers"]}>--</p>
                  </div>
                  <div className={styles["box-info"]}>
                    <p className={`${styles["margin-Rnc"]} ${styles["grey"]}`} >Low:</p>
                    <p className={styles["numbers"]} >--</p>
                  </div>
                </div> */}
                  </div>

                  <div className={styles['chart-buy']}>
                    {/* <button className="chart-btn-buy">Buy / Sell</button> */}
                  </div>
                </div>
              </div>
              <div className={styles['mobile-showInfo-container']}>
                <div
                  style={{ 'display': 'none' }}
                  className={styles['mobile-info-element']}
                  id='hide'
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
                    <div className={styles['mobbox']}>
                      <span className={styles['grey']}>CIRCULATING SUPPLY</span>
                      <p className={(!baseAsset.circulating_supply_addresses || baseAsset.circulating_supply_addresses.length == 0 ? `${styles['numbers']} ${styles['unsure']}` : styles['numbers'])}>
                        {baseAsset.circulating_supply
                          ? formatAmount(baseAsset.circulating_supply)
                          : '???'}{' '}
                        {baseAsset.symbol}
                      </p>
                    </div>
                    <div className={styles['mobbox']}>
                      <span className={styles['grey']}>TOTAL SUPPLY </span>
                      <p className={styles['numbers']}>
                        {baseAsset.total_supply
                          ? formatAmount(baseAsset.total_supply)
                          : '???'}{' '}
                        {baseAsset.symbol}
                      </p>
                    </div>
                    <div className={styles['mobbox']}>
                      <span className={styles['grey']}>LIQUIDITY </span>
                      <p className={styles['numbers']}>

                        {baseAsset.liquidity
                          ? '$' + formatAmount(liquidity || baseAsset.liquidity)
                          : '???'}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  id='hidedao'
                  className={`${baseAsset.utility_score +
                    baseAsset.social_score +
                    baseAsset.market_score +
                    baseAsset.trust_score ==
                    0
                    ? styles['absolute-mobile-dis']
                    : styles['absolute-mobile']
                    } ${styles["hidedao"]}`}
                  onClick={() => {
                    // mobileDaoBtn()
                  }}
                >
                  <span>DAO Score</span>
                  <span>
                    {baseAsset.utility_score +
                      baseAsset.social_score +
                      baseAsset.market_score +
                      baseAsset.trust_score}
                    /20
                  </span>
                  <div
                    style={{ display: 'none' }}
                    className={styles['mobile-grades']}
                    id='daoBtn-mobile'
                  >
                    <div className={styles['mobile-notes-boxs']}>
                      <span>Utility</span>
                      <span>{baseAsset.utility_score}/5</span>
                    </div>
                    <div className={styles['mobile-notes-boxs']}>
                      <span>Social</span>
                      <span>{baseAsset.social_score}/5</span>
                    </div>
                    <div className={styles['mobile-notes-boxs']}>
                      <span>Trust</span>
                      <span>{baseAsset.trust_score}/5</span>
                    </div>
                    <div className={styles['mobile-notes-boxs']}>
                      <span>Market</span>
                      <span>{baseAsset.market_score}/5</span>
                    </div>
                  </div>
                </button>
                <button
                  className={styles['btn-more-less']}
                  onClick={() => moreStats()}
                >
                  <span id='change'>More Stats</span>
                </button>
              </div>
              <div className={styles['chart-bottom-container']}>
                <div className={styles['chart-bottom-left']}>
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
                        ${formatAmount(volume || baseAsset.volume)}
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
                          ? '$' + formatAmount(liquidity || baseAsset.liquidity)
                          : '???'}
                      </p>
                    </span>
                  </div>
                  <div
                    className={
                      baseAsset.utility_score +
                        baseAsset.social_score +
                        baseAsset.market_score +
                        baseAsset.trust_score ==
                        0
                        ? styles['left-bottom-box-dis']
                        : styles['left-bottom-box']
                    }
                    id='dropdown'
                  >
                    <button
                      className={styles['notes-boxs']}
                      id='btnNotes'
                      onClick={() => daoBtn()}
                    >
                      <span className={styles['tagV']}>DAO SCORE</span>
                      <span>
                        {baseAsset.utility_score +
                          baseAsset.social_score +
                          baseAsset.market_score +
                          baseAsset.trust_score}
                        /20
                      </span>
                      <div className={styles['grades']} id='daoBtn'>
                        <div className={styles['notes-boxs']}>
                          <span>Utility</span>
                          <span>{baseAsset.utility_score}/5</span>
                        </div>
                        <div className={styles['notes-boxs']}>
                          <span>Social</span>
                          <span>{baseAsset.social_score}/5</span>
                        </div>
                        <div className={styles['notes-boxs']}>
                          <span>Trust</span>
                          <span>{baseAsset.trust_score}/5</span>
                        </div>
                        <div className={styles['notes-boxs']}>
                          <span>Market</span>
                          <span>{baseAsset.market_score}/5</span>
                        </div>
                      </div>
                    </button>
                    <button
                      className={`${styles['notes-boxs']} ${styles['disapear']}`}
                    >
                      <span>Utility</span>
                      <span>{baseAsset.utility_score}/5</span>
                    </button>
                    <button
                      className={`${styles['notes-boxs']} ${styles['disapear']}`}
                    >
                      <span>Social</span>
                      <span>{baseAsset.social_score}/5</span>
                    </button>
                    <button
                      className={`${styles['notes-boxs']} ${styles['disapear']}`}
                    >
                      <span>Trust</span>
                      <span>{baseAsset.trust_score}/5</span>
                    </button>
                    <button
                      className={`${styles['notes-boxs']} ${styles['disapear']}`}
                    >
                      <span>Market</span>
                      <span>{baseAsset.market_score}/5</span>
                    </button>
                  </div>
                </div>
                <div className={styles['chart-bottom-right']}>
                  <div className={styles['chart-box']} id='chart-box'>
                    <div className={styles['chart-header']}>
                      {state === 'Overview' ? (
                        <button
                          onClick={() => { setState('Overview'); }}
                          className={`${styles['chart-header-link']} ${styles['active-chart']}`}
                        >
                          Overview
                        </button>
                      ) : (
                        <button
                          onClick={() => { setState('Overview'); }}
                          className={`${styles['chart-header-link']} `}
                        >
                          Overview
                        </button>
                      )}
                      {state === 'Overview' && visible ? (

                        <p className={styles['warning']}>Loading...</p>
                      ) : (
                        <></>
                      )}
                      {state === 'Market' ? (
                        <button id="market" className={`${styles['chart-header-link']} ${styles['active-chart']}`}
                          onClick={(e) => {
                            setState('Market');
                            console.log(state);
                          }}>
                          <span>Market</span>
                        </button>
                      ) : (
                        <button className={styles['chart-header-link']}
                          onClick={(e) => {
                            setState('Market');
                            console.log(state);
                          }}
                        >Market</button>
                      )}

                      {state === 'Details' ? (
                        <button className={`${styles['chart-header-link']} ${styles['active-chart']}`} onClick={() => { setState('Details'); console.log(state) }}>
                          <span>Infos</span>
                        </button>
                      ) : (
                        <button className={styles['chart-header-link']} onClick={() => { setState('Details'); console.log(state) }}>
                          <span>Infos</span>
                        </button>
                      )}

                      {state === 'Buy' ? (
                        <button onClick={() => { setState('Buy'); console.log(state) }} className={`${styles['chart-header-link']} ${styles['active-chart']}`}>
                          <span>Buy</span>
                        </button>
                      ) : (
                        <button onClick={() => { setState('Buy'); console.log(state) }} className={styles['chart-header-link']}>
                          <span>Buy</span>
                        </button>
                      )}

                      {state === 'Charts' ? (
                        <button onClick={() => { setState('Charts'); console.log(state) }} className={`${styles['chart-header-link']} ${styles['active-chart']}`}>
                          <span>Charts</span>
                        </button>
                      ) : (
                        <button onClick={() => { setState('Charts'); console.log(state) }} className={styles['chart-header-link']}>
                          <span>Charts</span>
                        </button>
                      )}

                      <a
                        href='https://discord.gg/2a8hqNzkzN'
                        className={`${styles['chart-header-link']} ${styles['report-problem']}`}
                      >
                        <span id='inner'>Report</span>
                      </a>
                    </div>
                    {state === 'Charts' && (
                          <Charts  baseAsset={baseAsset}/>
                        )}
                    <div className={styles['chart-content']}>
                      <div className={styles['canvas-container']}>
                       
                        {state === 'Details' && (
                          <ProjectInfo token={baseAsset} />
                        )}
                        {state === 'Buy' && (
                          <Swap baseAsset={baseAsset} />
                        )}
                        {state === 'Overview' && (
                          <>
                            <canvas id='chart'></canvas>
                            <div
                              className={styles['change-chart-date']}
                              style={{
                                display: 'flex',
                                justifyContent: 'end',
                                margin: 'auto',
                              }}
                            >
                              <button
                                onClick={() => {
                                  setTimeFormat('1D')
                                }}
                                className={`${styles['button-chart']} ${styles['button-chart-active']} ${styles['d']}`}
                                id='1d'
                              >
                                1D
                              </button>
                              <button
                                onClick={() => {
                                  setTimeFormat('7D')
                                }}
                                className={styles['button-chart']}
                                id='7d'
                              >
                                7D
                              </button>
                              <button
                                onClick={() => {
                                  setTimeFormat('30D')
                                }}
                                className={styles['button-chart']}
                                id='30d'
                              >
                                1M
                              </button>
                              <button
                                onClick={() => {
                                  setTimeFormat('1Y')
                                }}
                                className={styles['button-chart']}
                                id='1y'
                              >
                                1Y
                              </button>
                              <button
                                onClick={() => {
                                  setTimeFormat('ALL')
                                }}
                                className={styles['button-chart']}
                                id='all'
                              >
                                ALL
                              </button>
                            </div>

                          </>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SkipBtn beforeToken={beforeToken} afterToken={afterToken} />
            <header className=''>
              <div
                className='tokenpage-details '
                style={{ display: 'flex', justifyContent: 'start' }}
              >
                {/* {coins[0]? (
            <>
              <img src={coins[0].image} height="180"  alt="logo" />
            <p className="size">
              {coins[0].name} <br />
              Current Price : {coins[0].current_price} $<br />
            {coins[0].price_change_percentage_24h < 0?(
              <span style={{color:"red"}}>
                  24h: {coins[0].price_change_percentage_24h} % 
            </span>
            ) : (
              <span style={{color:"green"}}>
                  Profit : {coins[0].price_change_percentage_24h} %
              </span>
            )}
            </p>
            </>
          ) : ( 
          <div>Loading....</div>
          )} */}
              </div>
            </header>
          </div>
        </ChakraProvider></>
    )

    // return <div>{test()}</div>
  }

  return <div>{renderData()}</div>
}

export default ChartCryptos
