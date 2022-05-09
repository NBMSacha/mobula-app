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
} from '../../helpers/formaters'
import { setTimeout } from 'timers'

const ChartCryptos = ({ id }) => {
  const [coins, setCoins] = useState([])
  const [chart, setChart] = useState({})
  const [day, setDay] = useState({})
  const [week, setWeek] = useState({})
  const [month, setMonth] = useState({})
  const [year, setYear] = useState({})
  const [all, setAll] = useState({})
  const [timeFormat, setTimeFormat] = useState('')
  const [token, setToken] = useState({})
  const [visible, setVisible] = useState(false)

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
      const { data } = await supabase
        .from('assets')
        .select('price_history')
        .match({ id })
      return data[0]
        ? data[0].price_history.price
            .filter((entry) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
            .map((price) => [price[0], price[1] * 1000000000])
        : null
    } else if (timeframe == '7D') {
      const { data } = await supabase
        .from('assets')
        .select('price_history')
        .match({ id })
      return data[0]
        ? data[0].price_history.price
            .filter((entry) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
            .map((price) => [price[0], price[1] * 1000000000])
        : null
    } else if (timeframe == '1M') {
      const { data: recent } = await supabase
        .from('assets')
        .select('price_history')
        .match({ id })
      const { data: old } = await supabase
        .from('history')
        .select('price_history')
        .match({ asset: id })
      return old[0]
        ? old[0].price_history
            .filter((entry) => entry[0] + 30 * 24 * 60 * 60 * 1000 > Date.now())
            .concat(recent[0].price_history.price)
            .map((price) => [price[0], price[1] * 1000000000])
        : null
    } else if (timeframe == '3M') {
      const { data: recent } = await supabase
        .from('assets')
        .select('price_history')
        .match({ id })
      const { data: old } = await supabase
        .from('history')
        .select('price_history')
        .match({ asset: id })
      return old[0]
        ? old[0].price_history
            .filter((entry) => entry[0] + 90 * 24 * 60 * 60 * 1000 > Date.now())
            .concat(recent[0].price_history.price)
            .map((price) => [price[0], price[1] * 1000000000])
        : null
    } else if (timeframe == '1Y') {
      const { data: recent } = await supabase
        .from('assets')
        .select('price_history')
        .match({ id })
      const { data: old } = await supabase
        .from('history')
        .select('price_history')
        .match({ asset: id })
      return old[0]
        ? old[0].price_history
            .filter(
              (entry) => entry[0] + 356 * 24 * 60 * 60 * 1000 > Date.now()
            )
            .concat(recent[0].price_history.price)
            .map((price) => [price[0], price[1] * 1000000000])
        : null
    } else if (timeframe == 'ALL') {
      const { data: recent } = await supabase
        .from('assets')
        .select('price_history')
        .match({ id })
      const { data: old } = await supabase
        .from('history')
        .select('price_history')
        .match({ asset: id })
      return old[0]
        ? old[0].price_history
            .concat(recent[0].price_history.price)
            .map((price) => [price[0], price[1] * 1000000000])
        : null
    }
  }

  const fetchData = async () => {
    const supabase = createClient(
      'https://ylcxvfbmqzwinymcjlnx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
    )

    console.log('YOO', id)

    supabase
      .from('assets')
      .select('*')
      .match({ id: parseInt(id) })
      .then((r) => {
        console.log('YOOAAA')

        if (r.data && r.data[0]) {
          console.log(r.data[0])
          setToken(r.data[0])
        } else {
          console.log(r.error)
        }
      })

    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets/',
      {
        params: {
          vs_currency: 'usd',
          ids: 'ethereum',
        },
      }
    )

    console.log(response)
    setCoins(response.data)
  }

  const fetchChart = async () => {
    try {
      const days = await getChart(id, '1D')

      setChart({ price: formatData(days) })
      setDay({ price: formatData(days) })

      const weeks = await getChart(id, '7D')
      const months = await getChart(id, '1M')
      const years = await getChart(id, '1Y')
      const alls = await getChart(id, 'ALL')

      setWeek({ price: formatData(weeks) })
      setMonth({ price: formatData(months) })
      setYear({ price: formatData(years) })
      setAll({ price: formatData(alls) })
    } catch (err) {
      console.log(err)
    }

    console.log(chart)
  }

  // const { coin } = useParams()
  useEffect(() => {
    fetchData()
    fetchChart()
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
            tension: 0.6,
            // segment: {
            //   borderColor: ctx => up(ctx, "rgba(192, 192, 192, 1)") || down(ctx, "rgba(180, 0, 0, 1)"),
            // },
            backgroundColor: gradient,
            borderWidth: 2,
            pointRadius: 0,
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

    if (!data || data.length == 0) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [timeFormat, day])

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
    console.log('calling more stats')
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
      <div className='App'>
        <div className={styles['chart-main-container']}>
          <div className={styles['chart-top-token']}>
            <div className={styles['flex']}>
              <div className={styles['chart-left-top']}>
                <img src={token.logo} className={styles['chart-token-logo']} />
                <div className={styles['chart-name-box']}>
                  <div className={styles['chart-token-name']}>
                    <span>{token.name}</span>
                  </div>
                  <div className={styles['chart-token-rank']}>
                    <span>Rank #{token.rank}</span>
                    {token.rank_change_24h < 0 ? (
                      <span
                        className='token-percentage-box font-char red'
                        id='noColor'
                      >
                        <ArrowDown className='arrowDown' />
                        {Math.abs(token.rank_change_24h)}
                      </span>
                    ) : token.rank_change_24h == 0 ? (
                      <div>--</div>
                    ) : (
                      <span
                        className='token-percentage-box font-char green'
                        id='noColor'
                      >
                        <ArrowUp className='arrowUp' />
                        {token.rank_change_24h}
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
                    ${getTokenPrice(token.price)}
                  </p>
                  {token.price_change_24h < 0 ? (
                    <div className={styles['chart-lose']}>
                      <span>
                        <ArrowDown />
                      </span>
                      <span>{getTokenPercentage(token.price_change_24h)}%</span>
                    </div>
                  ) : (
                    <div className={styles['chart-gain']}>
                      <span>
                        <ArrowUp />
                      </span>
                      <span>{getTokenPercentage(token.price_change_24h)}%</span>
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
                  <p className={styles['numbers']}>
                    ${formatAmount(token.market_cap)}
                  </p>
                </div>
                <div className={styles['mobbox']}>
                  <span className={styles['grey']}>VOLUME (24H)</span>
                  <p className={styles['numbers']}>
                    ${formatAmount(token.volume)}
                  </p>
                </div>
                <div className={styles['mobbox']}>
                  <span className={styles['grey']}>
                    FULLY DILUTED MARKET CAP
                  </span>
                  <p className={styles['numbers']}>
                    $
                    {token.market_cap_diluted
                      ? formatAmount(token.market_cap_diluted)
                      : '???'}
                  </p>
                </div>
              </div>
              <div className={styles['mobile-info-right-column']}>
                <div className={styles['mobbox']}>
                  <span className={styles['grey']}>CIRCULATING SUPPLY</span>
                  <p className={styles['numbers']}>
                    {token.circulating_supply
                      ? formatAmount(token.circulating_supply)
                      : '???'}{' '}
                    {token.symbol}
                  </p>
                </div>
                <div className={styles['mobbox']}>
                  <span className={styles['grey']}>TOTAL SUPPLY </span>
                  <p className={styles['numbers']}>
                    {token.total_supply
                      ? formatAmount(token.total_supply)
                      : '???'}{' '}
                    {token.symbol}
                  </p>
                </div>
                <div className={styles['mobbox']}>
                  <span className={styles['grey']}>LIQUIDITY </span>
                  <p className={styles['numbers']}>
                    $
                    {token.liquidity
                      ? '$' + formatAmount(token.liquidity)
                      : '???'}
                  </p>
                </div>
              </div>
            </div>
            <button
              id='hidedao'
              style={{ 'display': 'none !important;' }}
              className={
                token.utility_score +
                  token.social_score +
                  token.market_score +
                  token.trust_score ==
                0
                  ? styles['absolute-mobile-dis']
                  : styles['absolute-mobile']
              }
              onClick={() => {
                // mobileDaoBtn()
              }}
            >
              <span>DAO Score</span>
              <span>
                {token.utility_score +
                  token.social_score +
                  token.market_score +
                  token.trust_score}
                /20
              </span>
              <div
                style={{ display: 'none' }}
                className={styles['mobile-grades']}
                id='daoBtn-mobile'
              >
                <div className={styles['mobile-notes-boxs']}>
                  <span>Utility</span>
                  <span>{token.utility_score}/5</span>
                </div>
                <div className={styles['mobile-notes-boxs']}>
                  <span>Social</span>
                  <span>{token.social_score}/5</span>
                </div>
                <div className={styles['mobile-notes-boxs']}>
                  <span>Trust</span>
                  <span>{token.trust_score}/5</span>
                </div>
                <div className={styles['mobile-notes-boxs']}>
                  <span>Market</span>
                  <span>{token.market_score}/5</span>
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
                  <p className={styles['text-bottom-chart']}>
                    ${formatAmount(token.market_cap)}
                  </p>
                </span>
                <span>
                  <p className={styles['text-top-chart']}>VOLUME (24H)</p>
                  <p className={styles['text-bottom-chart']}>
                    ${formatAmount(token.volume)}
                  </p>
                </span>
                <span>
                  <p className={styles['text-top-chart']}>
                    FULLY DILUTED MARKET CAP
                  </p>
                  <p className={styles['text-bottom-chart']}>
                    $
                    {token.market_cap_diluted
                      ? formatAmount(token.market_cap_diluted)
                      : '???'}
                  </p>
                </span>
                <span>
                  <p className={styles['text-top-chart']}>CIRCULATING SUPPLY</p>
                  <p className={styles['text-bottom-chart']}>
                    {token.circulating_supply
                      ? formatAmount(token.circulating_supply)
                      : '???'}{' '}
                    {token.symbol}
                  </p>
                </span>
                <span>
                  <p className={styles['text-top-chart']}>TOTAL SUPPLY </p>
                  <p className={styles['text-bottom-chart']}>
                    {token.total_supply
                      ? formatAmount(token.total_supply)
                      : '???'}{' '}
                    {token.symbol}
                  </p>
                </span>
                <span>
                  <p className={styles['text-top-chart']}>LIQUIDITY</p>
                  <p className={styles['text-bottom-chart']}>
                    $
                    {token.liquidity
                      ? '$' + formatAmount(token.liquidity)
                      : '???'}
                  </p>
                </span>
              </div>
              <div
                className={
                  token.utility_score +
                    token.social_score +
                    token.market_score +
                    token.trust_score ==
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
                    {token.utility_score +
                      token.social_score +
                      token.market_score +
                      token.trust_score}
                    /20
                  </span>
                  <div className={styles['grades']} id='daoBtn'>
                    <div className={styles['notes-boxs']}>
                      <span>Utility</span>
                      <span>{token.utility_score}/5</span>
                    </div>
                    <div className={styles['notes-boxs']}>
                      <span>Social</span>
                      <span>{token.social_score}/5</span>
                    </div>
                    <div className={styles['notes-boxs']}>
                      <span>Trust</span>
                      <span>{token.trust_score}/5</span>
                    </div>
                    <div className={styles['notes-boxs']}>
                      <span>Market</span>
                      <span>{token.market_score}/5</span>
                    </div>
                  </div>
                </button>
                <button
                  className={`${styles['notes-boxs']} ${styles['disapear']}`}
                >
                  <span>Utility</span>
                  <span>{token.utility_score}/5</span>
                </button>
                <button
                  className={`${styles['notes-boxs']} ${styles['disapear']}`}
                >
                  <span>Social</span>
                  <span>{token.social_score}/5</span>
                </button>
                <button
                  className={`${styles['notes-boxs']} ${styles['disapear']}`}
                >
                  <span>Trust</span>
                  <span>{token.trust_score}/5</span>
                </button>
                <button
                  className={`${styles['notes-boxs']} ${styles['disapear']}`}
                >
                  <span>Market</span>
                  <span>{token.market_score}/5</span>
                </button>
              </div>
            </div>
            <div className={styles['chart-bottom-right']}>
              <div className={styles['chart-box']} id='chart-box'>
                <div className={styles['chart-header']}>
                  <a
                    href=''
                    className={`${styles['chart-header-link']} ${styles['active-chart']}`}
                  >
                    Overview
                  </a>
                  <a href='' className={styles['chart-header-link']}>
                    <span>Market</span>
                  </a>
                  <a href='' className={styles['chart-header-link']}>
                    <span>Details</span>
                  </a>
                  <a href='' className={styles['chart-header-link']}>
                    <span>Socials</span>
                  </a>
                  <a
                    href='https://discord.gg/2a8hqNzkzN'
                    className={`${styles['chart-header-link']} ${styles['report-problem']}`}
                  >
                    <span id='inner'>Report</span>
                  </a>
                </div>
                <div className={styles['chart-content']}>
                  <div className={styles['canvas-container']}>
                    <canvas id='chart'></canvas>
                    {visible ? (
                      <p className={styles['warning']}>Coming soon...</p>
                    ) : (
                      <></>
                    )}

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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
    )

    // return <div>{test()}</div>
  }

  return <div>{renderData()}</div>
}

export default ChartCryptos
