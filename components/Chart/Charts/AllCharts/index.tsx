import React, { useEffect, useState } from 'react'
import { Chart } from 'chart.js'
import { createClient } from '@supabase/supabase-js'
import styles from "./AllCharts.module.scss"
import { Box, Text, Button, Flex } from '@chakra-ui/react'
import { formatAmount } from '../../../../helpers/formaters';

const AllCharts = ({ baseAsset, title, darkTheme }, idx: any,) => {
  const [visible, setVisible] = useState(false);
  const [chart, setChart] = useState({})
  const [day, setDay]: [{ price: { y: string }[] }, any] = useState()
  const [week, setWeek]: [{ price: { y: string }[] }, any] = useState()
  const [month, setMonth]: [{ price: { y: string }[] }, any] = useState()
  const [year, setYear]: [{ price: { y: string }[] }, any] = useState()
  const [all, setAll]: [{ price: { y: string }[] }, any] = useState()
  const [timeFormat, setTimeFormat] = useState('7D');
  const [historyData, setHistoryData]: [any, Function] = useState();
  const hiddenTitles = ["No Volume", "No Liquidity", "Holders", "No Rank"];

  const formatData = (data: any) => {
    if (!data) return {}
    return data.map((el: any) => {
      if (el[1] != 0) {
        return {
          t: el[0],
          y: el[1].toFixed(2),
        }
      } else {
        return {
          t: el[0],
          y: 0,
        }
      }
    })
  }

  const fetchChart = async () => {
    try {
      const days = await getChart(baseAsset.id, '1D')

      setChart({ price: formatData(days) })
      setDay({ price: formatData(days) })

      const weeks = await getChart(baseAsset.id, '7D')
      setWeek({ price: formatData(weeks) })

      const months = await getChart(baseAsset.id, '1M')
      setMonth({ price: formatData(months) })

    } catch (err) { }
  }

  const getChart = async (id: number, timeframe: string) => {
    const supabase = createClient(
      'https://ylcxvfbmqzwinymcjlnx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
    )
    let multiplier;

    const recentLoad = () => {
      return baseAsset ? baseAsset[title.toLowerCase() + '_history'][title.toLowerCase()]
        .filter((entry) => entry[0] + multiplier * 24 * 60 * 60 * 1000 > Date.now())
        .map((price) => [price[0], price[1] * 1000000000])
        : null
    }

    const historyLoad = async () => {
      let old;

      if (!historyData) {
        const { data } = await supabase
          .from('history')
          .select(title.toLowerCase() + '_history')
          .match({ asset: id })

        old = data
        setHistoryData(data)
      } else {
        old = historyData
      }

      if (old && old[0]) {
        try {
          const oldData = old[0][title.toLowerCase() + '_history']
            .filter(
              (entry) => entry[0] + multiplier * 24 * 60 * 60 * 1000 > Date.now()
            )
            .map((price) => [price[0], price[1] * 1000000000])

          return oldData.concat(baseAsset[title.toLowerCase() + '_history'][title.toLowerCase()].filter((entry) => entry[0] > oldData[oldData.length - 1][0])
            .map((price) => [price[0], price[1] * 1000000000]))
        } catch (e) {
        }

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

  useEffect(() => {

    if ((title == "Volume" || title == "Liquidity") && historyData) {
      getChart(baseAsset.id, '1Y').then(years => {
        setYear({ price: formatData(years) })
      })

      getChart(baseAsset.id, 'ALL').then(alls => {
        setAll({ price: formatData(alls) })
      })
    }

  }, [historyData])

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
    if (baseAsset && (title == "Volume" || title == "Liquidity")) {
      fetchChart()
    }
  }, [baseAsset])

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
        return week.price
    }
  }

  const generateChart = () => {
    var dayIf: any;
    var ctx = (document.getElementById(`${title}-${idx}`) as any).getContext('2d')
    const data = determineTimeFormat()
    const isMobile = window.innerWidth < 768
    const isGiant = window.innerWidth > 1500
    const isWinner =
      data && data[0]
        ? parseFloat(data[0].y) <= parseFloat(data[data.length - 1].y)
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

    const { ATH, ATL } = getExtremes(data as any);
    const allTimeDiff = Math.floor(parseInt(ATH.y) / -1000000000) - Math.floor(parseInt(ATL.y) / -1000000000)

    if (title == 'Rank') {

      window[title] = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data?.map(entry => parseInt(entry.y)),
          datasets: [
            {
              label: 'Rank',
              data: data?.map(entry => parseInt(entry.y)),
              borderColor: isWinner ? '#00ba7c' : '#EA3943',
              fill: false,
              steppedLine: true,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          interaction: {
            intersect: false,
            axis: 'x'
          },
          animation: {
            duration: 0,
          },
          tooltips: false,
          legend: {
            display: false,
          },
          datalabels: {
            display: false,
          },
          plugins: {
            tooltips: {
              enabled: false,
            }
          },
          hover: { mode: null },
          scales: {
            yAxes: [
              {
                display: !!allTimeDiff,
                ticks: {
                  type: 'category',
                  maxTicksLimit: Math.min(allTimeDiff, 5),
                  beginAtZero: false,
                  callback: function (tick: number) {
                    return (tick / -1000000000).toFixed(0)
                  },
                },
              },
            ],
            xAxes: [
              {
                display: false,
              },
            ],
          }
        }
      })

    } else {
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
          animation: {
            duration: 0,
          },
          tooltips: false,
          legend: {
            display: false,
          },
          datalabels: {
            display: false,
          },
          interaction: {
            intersect: false,
            axis: 'x'
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
                    return (tick / 1000000000).toFixed(
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

    }
    const pixelYATH = (window[title] as any).scales["y-axis-0"].getPixelForValue(ATH.y);
    const pixelXATH = (window[title] as any).scales["x-axis-0"].getPixelForValue(ATH.t);
    const pixelYATL = (window[title] as any).scales["y-axis-0"].getPixelForValue(ATL.y);
    const pixelXATL = (window[title] as any).scales["x-axis-0"].getPixelForValue(ATL.t);

    function displayExtremes(AT: { y: string, t: number }, pixelX: number, pixelY: number) {
      const { canvas, ctx, chartArea: { left, right, top, bottom }
      } = window[title] as unknown as { canvas: any, ctx: CanvasRenderingContext2D, chartArea: { left: number, right: number, top: number, bottom: number } };

      const amount = title == 'Rank' ? (BigInt(AT.y.split('.')[0]) / BigInt(-1000000000)).toString() : (BigInt(AT.y.split('.')[0]) / BigInt(1000000000)).toString()
      const text = (title == 'Holders' ? '' : title == 'Rank' ? '#' : '$') + formatAmount(amount)
      const rectWidth = ctx.measureText(text).width + 20
      const isRightSide = pixelX > right / 2;
      const isTopSide = pixelY < bottom / 2
      const rectX = isRightSide ? Math.max(0, pixelX - 170) : Math.min(pixelX + 170, right) - rectWidth;

      ctx.lineWidth = 1;
      ctx.strokeStyle = "#666";
      ctx.setLineDash([3, 3]);

      if (!isTopSide) {
        ctx.beginPath();
        ctx.moveTo(pixelX - 1, pixelY - 20);
        ctx.lineTo(pixelX - 1, pixelY);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(rectX - 1, pixelY - 20);
        ctx.lineTo(pixelX - 1, pixelY - 20);
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        ctx.moveTo(rectX, pixelY);
        ctx.lineTo(pixelX, pixelY);
        ctx.stroke();
        ctx.closePath();
      }

      ctx.font = '12px Inter';
      ctx.textBaseline = "top";
      ctx.textAlign = "left";

      ctx.fillStyle = darkTheme ? "#2E3557" : "#b8b8b8";

      ctx.fillRect(rectX - 1, pixelY - (isTopSide ? 1 : 35), rectWidth, 16);
      ctx.fillStyle = "white";
      ctx.fillText(text, rectX + 5, pixelY + (isTopSide ? 2.5 : -32.5))

      if (allTimeDiff == 0 && title == 'Rank') {
        ctx.font = '16px Inter';
        ctx.fillText('Rank #' + baseAsset.rank, 5, 5)
      }

    }

    if (title != 'Rank') {

      (window[title] as any).canvas.addEventListener('mousemove', (e: any) => {
        crosshairLine(window[title], e)
      });

    }

    if (data) {
      displayExtremes(ATL, pixelXATL, pixelYATL)

      if (ATH.y != ATL.y) {
        displayExtremes(ATH, pixelXATH, pixelYATH)
      }
    }

    function crosshairLine(chart: any, mousemove: any) {
      const { canvas, ctx, chartArea: { left, right, top, bottom } } = chart;
      chart.update(null);
      ctx.restore();

      if (mousemove.offsetX >= left && mousemove.offsetX <= right && mousemove.offsetY >= top && mousemove.offsetY <= bottom) {
        canvas.style.cursor = "crosshair";

        if (mousemove.offsetY >= top + 20 && mousemove.offsetY <= bottom - 20
          && mousemove.offsetX >= left + 20 && mousemove.offsetX <= right - 20) {

          ctx.lineWidth = 1;
          ctx.strokeStyle = "#666";
          ctx.setLineDash([3, 3]);

          ctx.beginPath();
          ctx.moveTo(left, mousemove.offsetY);
          ctx.lineTo(right, mousemove.offsetY);
          ctx.stroke();
          ctx.closePath();

          ctx.beginPath();
          ctx.moveTo(mousemove.offsetX, top);
          ctx.lineTo(mousemove.offsetX, bottom);
          ctx.stroke();
          ctx.closePath();

          crosshairLabel(chart, mousemove);

        }

        displayExtremes(ATH, pixelXATH, pixelYATH)
        displayExtremes(ATL, pixelXATL, pixelYATL)

      } else {
        canvas.style.cursor = "default";
      }

    }

    function crosshairLabel(chart: any, mousemove: any) {
      const { ctx, chartArea: { left }, scales } = chart;
      const y = scales["y-axis-0"];
      const x = scales["x-axis-0"];

      ctx.textBaseline = "top";
      ctx.textAlign = "left";

      const number = y.getValueForPixel(mousemove.offsetY) / 1_000_000_000;
      const text = (title == 'Holders' ? '' : title == 'Rank' ? '#' : '$') + formatAmount(Math.floor(number))
      let date = new Date(x.getValueForPixel(mousemove.offsetX)).toISOString().split('T')[(timeFormat == '1D' ? 1 : 0)].split('.')[0]

      if (timeFormat == "7D" || timeFormat == "30D") {
        date = date.split('-')[1] + '/' + date.split('-')[2]
      }

      ctx.fillStyle = darkTheme ? "#2E3557" : "b8b8b8";
      ctx.fillRect(0, mousemove.offsetY, ctx.measureText(text).width + 10, 16);
      ctx.fillStyle = darkTheme ? "white" : "black";
      ctx.font = '16px Inter';
      ctx.fillText(date, 5, 5)
      ctx.fillStyle = "white";
      ctx.font = '12px Inter';
      ctx.fillText(text, 5, mousemove.offsetY + 2)

    }

    function getExtremes(data: [{ y: string, t: number }]) {
      let ATH = { y: '0', t: 0 };
      //Infitiy cannot be used with big ints
      let ATL = { y: '1000000000000000000000000000000000000000000000', t: 0 };

      const bigAbs = (x: BigInt) => {
        return x < BigInt(0) ? -x : x
      };

      if (data) {

        for (let i = 0; i < data.length; i++) {
          if (data[i].y && bigAbs(BigInt(data[i].y.split('.')[0])) > bigAbs(BigInt(ATH.y.split('.')[0]))) {
            ATH = data[i]
          } else if (data[i].y && bigAbs(BigInt(data[i].y.split('.')[0])) < bigAbs(BigInt(ATL.y.split('.')[0]))) {
            ATL = data[i]
          }
        }
      }

      return { ATH, ATL }
    }

    if (!data || data.length == 0) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  return (
    <Box w={window.innerWidth > 768 ? "45%" : "95%"} mb={["30px"]}>
      <Text mb={4}>{title == 'No Rank' ? 'Rank (Coming Soon)' : title == 'Holders' ? 'Holders (Coming Soon)' : title}</Text>
      <Box p="20px 20px 20px 20px" bg={hiddenTitles.includes(title) ? "#2e35570d" : '#2e355729'} w="100%" borderRadius="18px" position="relative">
        <>
          {!hiddenTitles.includes(title) ? (
            <Box position="absolute" top="-12.5px" right="0px" bg={darkTheme ? "#2e3557" : "#F9F9F9"} p="2.5px 3px" borderRadius="10px 10px 10px 10px;">
              <Flex justify="space-around">
                {(!day || (day.price && day.price.length)) ? timeFormat === "1D" ? (
                  <Button m={5} size='xs' bg="#b8b8b8 !important" color="white" className={styles["btn-chakra"]} mr={3} onClick={() => { setTimeFormat("1D") }}>1D</Button>
                ) : (
                  <Button m={5} size='xs' color={darkTheme ? "white" : "black"} bg="none" mr={3} onClick={() => { setTimeFormat("1D") }}>1D</Button>
                ) : <></>}
                {(!week || (week.price && week.price.length)) ? timeFormat === "7D" ? (
                  <Button m={5} size='xs' bg="#b8b8b8 !important" color="white" className={styles["btn-chakra"]} mr={3} onClick={() => { setTimeFormat("7D") }}>7D</Button>
                ) : (
                  <Button m={5} size='xs' color={darkTheme ? "white" : "black"} bg="none" mr={3} onClick={() => { setTimeFormat("7D") }}>7D</Button>
                ) : <></>}
                {(!month || (month.price && month.price.length)) ? timeFormat === "30D" ? (
                  <Button m={5} size='xs' bg="#b8b8b8 !important" color="white" className={styles["btn-chakra"]} mr={3} onClick={() => { setTimeFormat("30D") }}>1M</Button>
                ) : (
                  <Button m={5} size='xs' color={darkTheme ? "white" : "black"} bg="none" mr={3} onClick={() => { setTimeFormat("30D") }}>1M</Button>
                ) : <></>}
                {(!year || (year.price && year.price.length)) ?
                  <Button m={5} size='xs'
                    bg={timeFormat === "1Y" ? "#b8b8b8 !important" : "none"}
                    color={timeFormat === "1Y" ? "white" : darkTheme ? "white" : "black"}
                    className={timeFormat === "1Y" ? styles["btn-chakra"] : ''}
                    mr={3} onClick={() => { setTimeFormat("1Y") }}>1Y</Button>
                  : <></>}
                {(!all || (all.price && all.price.length)) ? timeFormat === "ALL" ? (
                  <Button m={5} size='xs' bg="#b8b8b8 !important" color="white" className={styles["btn-chakra"]} ml={3} onClick={() => { setTimeFormat("ALL") }}>ALL</Button>
                ) : (
                  <Button m={5} size='xs' color={darkTheme ? "white" : "black"} bg="none" ml={3} onClick={() => { setTimeFormat("ALL") }}>ALL</Button>
                ) : <></>}
              </Flex>
            </Box>
          ) : (
            <>
            </>
          )}
          {title !== "Holders" ? (
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