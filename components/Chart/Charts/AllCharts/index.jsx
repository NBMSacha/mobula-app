import React, { useEffect, useState} from 'react'
import { Chart} from 'chart.js'
import { createClient} from '@supabase/supabase-js'
import styles from "./AllCharts.module.scss"
import { Box, Text, Button } from '@chakra-ui/react'
import {formatAmount} from '../../../../helpers/formaters';

const AllCharts = ({ baseAsset, title }, idx,) => {

  const [visible, setVisible] = useState(false);
  const [chart, setChart] = useState({})
  const [day, setDay] = useState({})
  const [week, setWeek] = useState({})
  const [month, setMonth] = useState({})
  const [year, setYear] = useState({})
  const [all, setAll] = useState({})
  const [timeFormat, setTimeFormat] = useState('7D');
  const [IsTrueDay, setIsTrueDay] = useState("")

  const formatData = (data) => {
    return data.map((el) => {
      if (el[1] != 0) {
        return {
          t: el[0],
          y: el[1].toFixed(2),
        }
      } else {
        return {
        }
      }
    })
  }

  const fetchChart = async () => {
    try {
      console.log("loading chart")
      const days = await getChart(baseAsset.id, '1D', title)

      setChart({ price: formatData(days) })
      setDay({ price: formatData(days) })

      const weeks = await getChart(baseAsset.id, '7D', title)
      setWeek({ price: formatData(weeks) })

      const months = await getChart(baseAsset.id, '1M', title)
      setMonth({ price: formatData(months) })

      const years = await getChart(baseAsset.id, '1Y')
      setYear({ price: formatData(years) })

      const alls = await getChart(baseAsset.id, 'ALL')
      setAll({ price: formatData(alls) })

    } catch (err) {
      console.log(err)
    }
  }

  // GET CHART DATA DEPENDING OF TITLE 

  const getChart = async (id, timeframe) => {
    const supabase = createClient(
      'https://ylcxvfbmqzwinymcjlnx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
    )
    if (title == "Rank") {
      if (timeframe == '1D') {
        return baseAsset ? baseAsset.rank_history.rank
          .filter((entry) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
          .map((price) => [price[0], price[1] * 1000000000])
          
          : null
      } else if (timeframe == '7D') {
        return baseAsset ? baseAsset.rank_history.rank
          .filter((entry) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
          .map((price) => [price[0], price[1] * 1000000000])
          : null
      }
    }
    if (title == "Liquidity") {
      if (timeframe == '1D') {
        return baseAsset ? baseAsset.liquidity_history.liquidity
          .filter((entry) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
          .map((price) => [price[0], price[1] * 1000000000])
          : null
      } else if (timeframe == '7D') {
        return baseAsset ? baseAsset.liquidity_history.liquidity
          .filter((entry) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
          .map((price) => [price[0], price[1] * 1000000000])
          : setIsTrueDay(null)
          
      }
    }
    if (title == "Volume") {
      if (timeframe == '1D') {
        return baseAsset ? baseAsset.volume_history.volume
          .filter((entry) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
          .map((price) => [price[0], price[1] * 1000000000])
          : null
      } else if (timeframe == '7D') {
        return baseAsset ? baseAsset.volume_history.volume
          .filter((entry) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
          .map((price) => [price[0], price[1] * 1000000000])
          : null
      } else if (timeframe == '1M') {
        const { data: old } = await supabase
          .from('history')
          .select('volume_history')
          .match({ asset: id })
        return old[0] ? old[0].volume_history
          .filter((entry) => entry[0] + 30 * 24 * 60 * 60 * 1000 > Date.now())
          .map((price) => [price[0], price[1] * 1000000000])
          : null
      } else if (timeframe == '3M') {
        const { data: old } = await supabase
          .from('history')
          .select('volume_history')
          .match({ asset: id })
        return old[0] ? old[0].volume_history
          .filter((entry) => entry[0] + 90 * 24 * 60 * 60 * 1000 > Date.now())
          .map((price) => [price[0], price[1] * 1000000000])
          : null
      } else if (timeframe == '1Y') {
        const { data: old } = await supabase
          .from('history')
          .select('volume_history')
          .match({ asset: id })
        return old[0] ? old[0].volume_history
          .filter(
            (entry) => entry[0] + 356 * 24 * 60 * 60 * 1000 > Date.now()
          )
          .map((price) => [price[0], price[1] * 1000000000])
          : null
      } else if (timeframe == 'ALL') {
        const { data: old } = await supabase
          .from('history')
          .select('volume_history')
          .match({ asset: id })
        return old[0] ? old[0].volume_history
          .map((price) => [price[0], price[1] * 1000000000])
          : alert("teeeeeeeeeeeeeeeeeeee")
      }
      if(null) {
        alert("no chart avaible")
      }
      
    }
  }
  useEffect(() => {
    generateChart()
  }, [timeFormat, week])

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
    if (baseAsset) {
      fetchChart()
    }
  }, [baseAsset])

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
        return week.price
    }
  }

  const generateChart = () => {

    var dayIf
    var ctx = document.getElementById(`${title}-${idx}`).getContext('2d')
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
    gradient.addColorStop(0.15, isWinner ? '#00ba7c' : '#D8494A')
    gradient.addColorStop(0.33, '#2e355729')
    gradient.addColorStop(0.66, '#2e355729')
    gradient.addColorStop(1, '#2e355729')
    console.log(isWinner, data)

    window[title] = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Price  ',
            data: data,
            fill: true,
            datasetFill: true,
            borderColor: isWinner ? '#00ba7c' : '#EA3943',
            tension: 0.6,
            responsive: true,
            backgroundColor: gradient,
            borderWidth: 2,
            pointRadius: 0,
            pointHitRadius: 10,
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
        responsive: true,
        plugins: {
          tooltips: {
            enabled: false,
          },
        },
        tooltips: {
          enabled: false,
        },
        tooltips: false,
        legend: {
          display: false,
        },
        datalabels: {
          display: false,
        },
        hover: { mode: null },
        scales: {
          yAxes: [
            {
              display: false,

              gridLines: { color: '#2E3557' },
              ticks: {
                type: 'category',
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
                unit: false,
                tooltipFormat: 'MM/DD/YYYY        HH:MM:SS',
                displayFormats: {
                  hour: 'HH:mm',
                },
              },
              ticks: {
                maxTicksLimit: isMobile ? (dayIf == 'week' ? 2 : 4) : 8,
              },
              display: false,
            },
          ],
        },
      },
    })

    window[title].canvas.addEventListener('mousemove', (e) => {
      crosshairLine(window[title], e)
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
      ctx.roundRect(0, mousemove.offsetY - 10, left, 20, 30);
      ctx.closePath();

      ctx.font = '12px Inter';
      ctx.textBaseline = "top";
      ctx.textAlign = "left";

      const number = y.getValueForPixel(mousemove.offsetY) / 1_000_000_000;
      const text = (title == 'Holders' ? '' : title == 'Rank' ? '#' : '$') + formatAmount(parseInt(number))

      ctx.fillStyle = "#2E3557";
      ctx.fillRect(0, mousemove.offsetY, ctx.measureText(text).width + 10, 16);
      ctx.fillStyle = "white";
      ctx.fillText(text, 5, mousemove.offsetY + 2)
    }

    if (!data || data.length == 0) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  return (
    <Box w={["100%", "88%", "70%", "45%"]} mb={["30px"]} className={styles["box-charts"]}>
      <Text color="var(--text-color)" mb={4}>{title}</Text>
      <Box p="20px 20px 20px 20px" bg={ title==="No Volume" || title==="No Rank" || title==="No Liquidity" || title === "Holders"? "#2e35570d" : '#2e355729'} w="100%" borderRadius="18px" position="relative">
        <>
          {title !== "No Volume" || title !== "No Rank" || title !== "No Liquidity" || title !== "Holders" ? (
            <Box position="absolute" top="-12.5px" right="0px"  boxShadow="0px 1px 12px 3px var(--shadow-color)" bg="var(--charts)" p="2.5px 3px" borderRadius="10px 10px 10px 10px;">
              {title === "Volume" && (
                <>
                  {timeFormat === "1D" ? (
                    <Button size='xs' className={`${styles["commun-bt"]} ${styles["btn-chakra"]}`}  bg="rgba(222, 228, 255, 0.8156862745) !important" color="var(--text-color)" p="0px 5px"  mr={1} onClick={() => { setTimeFormat("1D") }}>1D</Button>
                  ) : (
                    <Button size='xs' className={`${styles["commun-bt"]} `} color="var(--text-color)" p="0px 5px" bg="none" _hover={{ bg: 'rgba(222, 228, 255,  0.8156862745)' }} mr={1} onClick={() => { setTimeFormat("1D") }}>1D</Button>
                  )}
                  {timeFormat === "7D" ? (
                    <Button size='xs' className={`${styles["commun-bt"]} ${styles["btn-chakra"]}`} p="0px 5px" bg="rgba(222, 228, 255, 0.8156862745) !important" color="var(--text-color)"  mx={1} onClick={() => { setTimeFormat("7D") }}>7D</Button>
                  ) : (
                    <Button size='xs' className={`${styles["commun-bt"]} `} p="0px 5px" color="var(--text-color)" bg="none" _hover={{ bg: 'rgba(222, 228, 255,  0.8156862745)' }}mx={1} onClick={() => { setTimeFormat("7D") }}>7D</Button>
                  )}
                  {timeFormat === "30D" ? (
                    <Button size='xs' className={`${styles["commun-bt"]} ${styles["btn-chakra"]}`} p="0px 5px" bg="rgba(222, 228, 255, 0.8156862745) !important" color="var(--text-color)" mx={1} onClick={() => { setTimeFormat("30D") }}>1M</Button>
                  ) : (
                    <Button size='xs' className={`${styles["commun-bt"]}`} p="0px 5px" color="var(--text-color)" bg="none" _hover={{ bg: 'rgba(222, 228, 255,  0.8156862745)' }} mx={1} onClick={() => { setTimeFormat("30D") }}>1M</Button>
                  )}
                  {timeFormat === "1Y" ? (
                    <Button size='xs' className={`${styles["commun-bt"]} ${styles["btn-chakra"]}`} p="0px 5px" bg="rgba(222, 228, 255, 0.8156862745) !important" color="var(--text-color)"   mx={1} onClick={() => { setTimeFormat("1Y") }}>1Y</Button>
                  ) : (
                    <Button size='xs' className={`${styles["commun-bt"]}`} p="0px 5px" color="var(--text-color)" bg="none"  _hover={{ bg: 'rgba(222, 228, 255,  0.8156862745)' }} mx={1} onClick={() => { setTimeFormat("1Y") }}>1Y</Button>
                  )}
                  {timeFormat === "ALL" ? (
                    <Button size='xs' className={`${styles["commun-bt"]} ${styles["btn-chakra"]}`} p="0px 5px" bg="rgba(222, 228, 255,  0.8156862745) !important" color="var(--text-color)"  ml={1} onClick={() => { setTimeFormat("ALL") }}>ALL</Button>
                  ) : (
                    <Button size='xs' className={`${styles["commun-bt"]}`} p="0px 5px" color="var(--text-color)" bg="none"  _hover={{ bg: 'rgba(222, 228, 255,  0.8156862745)' }} ml={1} onClick={() => { setTimeFormat("ALL") }}>ALL</Button>
                  )}


                </>
              )}
              {title === "Rank" ?(
                <>
                  <Button size='xs' className={`${styles["commun-bt"]} ${styles["btn-chakra"]}`} p="0px 5px" bg="rgba(222, 228, 255, 0.8156862745) !important" _hover={{ bg: 'rgba(222, 228, 255,  0.8156862745)' }}  color="var(--text-color)" onClick={() => { setTimeFormat("7D") }}>7D</Button>
                </>
              ) : (<></>)}
              {title === "Liquidity" && (
                <>
                  {timeFormat === "1D" ? (
                    <Button size='xs' className={`${styles["commun-bt"]} ${styles["btn-chakra"]}`}  mr={1} bg=" !important"  color="var(--text-color)" onClick={() => { setTimeFormat("1D") }}>1D</Button>
                  ) : (
                    <Button size='xs' className={`${styles["commun-bt"]}`} color="var(--text-color)" bg="none" _hover={{ bg: 'rgba(222, 228, 255,  0.8156862745)' }} mr={1} onClick={() => { setTimeFormat("1D") }}>1D</Button>
                  )}
                  {timeFormat === "7D" ? (
                    <Button size='xs' className={`${styles["commun-bt"]} ${styles["btn-chakra"]}`}mx={1} bg="rgba(222, 228, 255, 0.8156862745) !important"  color="var(--text-color)" onClick={() => { setTimeFormat("7D") }}>7D</Button>
                  ) : (
                    <Button size='xs' className={`${styles["commun-bt"]}`}color="var(--text-color)" bg="none" _hover={{ bg: 'rgba(222, 228, 255,  0.8156862745)' }} mx={1} onClick={() => { setTimeFormat("7D") }}>7D</Button>
                  )}
                </>
              )}
            </Box>
          ) : (
            <>
            </>
          )}
          {title !== "Holders" ?  (
            <div>
              <canvas id={`${title}-${idx}`} width="270px" height="100px"></canvas>
            </div>
          ) : (
            <div className={styles["mienai"]}>
              <canvas id={`${title}-${idx}`} width="270px" height="100px"></canvas>
            </div>
            
          )}
        </>
      </Box>
    </Box>
  )
}

export default AllCharts;