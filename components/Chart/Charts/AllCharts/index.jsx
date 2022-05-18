import React, { useEffect, useState, useRef } from 'react'
import { Chart, ChartType, registerables } from 'chart.js'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'react-feather'
import styles from "./AllCharts.module.scss"
import { extendTheme, Flex, Box, Text, Spacer, Image, Button} from '@chakra-ui/react'
import {
    getTokenPrice,
    getTokenPercentage,
    formatName
} from '../../../../helpers/formaters';

const AllCharts = ({baseAsset, title}, idx,  ) => {

    const [visible, setVisible] = useState(false);
    const [chart, setChart] = useState({})
    const [day, setDay] = useState({})
    const [week, setWeek] = useState({})
    const [month, setMonth] = useState({})
    const [year, setYear] = useState({})
    const [all, setAll] = useState({})
    const [timeFormat, setTimeFormat] = useState('')

    const formatData = (data) => {
        return data.map((el) => {
          return {
            t: el[0],
            y: el[1].toFixed(2),
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
    
      const getChart  = async (id, timeframe) => {
        const supabase = createClient(
          'https://ylcxvfbmqzwinymcjlnx.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
        )
        if(title == "Rank") {
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
        if(title == "Liquidity") {
            if (timeframe == '1D') {
                return baseAsset ? baseAsset.liquidity_history.liquidity
                    .filter((entry) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
                    .map((price) => [price[0], price[1] * 1000000000])
                : null
            } else if (timeframe == '7D') {
                return baseAsset ? baseAsset.liquidity_history.liquidity
                    .filter((entry) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                    .map((price) => [price[0], price[1] * 1000000000])
                : null
            }
        }  
        if(title == "Volume") {
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
                : null
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
          if(baseAsset) {
              fetchChart()
          }
      },[baseAsset])
      
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
        console.log("chart", data)
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
    
        window.RankChart = new Chart(ctx, {
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
                responsive: true,
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
                external: false,
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
                  gridLines: { color: '#343c63' },
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
    
        window.RankChart.canvas.addEventListener('mousemove', (e) => {
          crosshairLine(window.RankChart, e)
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

    return (
            <Box w={["100%","88%","70%","45%"]} mb={["30px"]}>
                <Text color='white' mb={4}>{title}</Text>
                <Box p="20px 20px 0px 0px" bg={title === "Holders"? "#2e355729" : '#2E3557'} w="100%" borderRadius="18px" position="relative">
                    <> 
                        {title !== "Holders" ? (
                            <Box position="absolute" top="-12.5px" right="0px" bg="#2e3557" p="2.5px 3px" borderRadius="10px 10px 0px 10px;">
                                {title === "Volume" && (
                                    <>
                                        {timeFormat === "1D" ? (
                                            <Button size='xs' mr={1} onClick={() => {setTimeFormat("1D")}}>1D</Button>
                                        ) : (
                                            <Button size='xs' color="white" bg="none" mr={1} onClick={() => {setTimeFormat("1D")}}>1D</Button>
                                        )}
                                        {timeFormat === "7D" ? (
                                            <Button size='xs' mx={1} onClick={() => {setTimeFormat("7D")}}>7D</Button>
                                        ) : (
                                            <Button size='xs' color="white" bg="none" mx={1}onClick={() => {setTimeFormat("7D")}}>7D</Button>
                                        )}
                                        {timeFormat === "30D" ? (
                                            <Button size='xs' mx={1} onClick={() => {setTimeFormat("30D")}}>1M</Button>
                                        ) : (
                                            <Button size='xs' color="white" bg="none" mx={1} onClick={() => {setTimeFormat("30D")}}>1M</Button>
                                        )}
                                        {timeFormat === "1Y"? (
                                            <Button size='xs' bg="white" mx={1} onClick={() => {setTimeFormat("1Y")}}>1Y</Button>
                                        ) :( 
                                            <Button size='xs' color="white" bg="none" mx={1} onClick={() => {setTimeFormat("1Y")}}>1Y</Button>
                                        )}
                                        {timeFormat === "ALL" ? (
                                            <Button size='xs' bg="white" ml={1} onClick={() => {setTimeFormat("ALL")}}>ALL</Button>
                                        ) : ( 
                                            <Button size='xs' color="white" bg="none" ml={1} onClick={() => {setTimeFormat("ALL")}}>ALL</Button>
                                        )}
                                        
                                        
                                    </>
                                )}
                                {title === "Rank" && (
                                    <>
                                        <Button size='xs' onClick={() => {setTimeFormat("7D")}}>7D</Button>
                                    </>
                                )}
                                {title === "Liquidity" && (
                                    <>
                                        {timeFormat === "1D" ? (
                                            <Button size='xs' mr={1} onClick={() => {setTimeFormat("1D")}}>1D</Button>
                                        ) : (
                                            <Button size='xs' color="white" bg="none" mr={1} onClick={() => {setTimeFormat("1D")}}>1D</Button>
                                        )}
                                        {timeFormat === "7D" ? (
                                            <Button size='xs' mx={1} onClick={() => {setTimeFormat("7D")}}>7D</Button>
                                        ) : (
                                            <Button size='xs' color="white" bg="none" mx={1}onClick={() => {setTimeFormat("7D")}}>7D</Button>
                                        )}
                                    </>
                                )}   
                            </Box>
                        ) : (
                            <>
                            </>
                        )}
                        {title === "Holders" ? (
                            <div className={styles["mienai"]}>
                                <canvas id={`${title}-${idx}`}  width="270px" height="100px"></canvas>
                            </div>
                        ) : (
                            <div>
                                <canvas id={`${title}-${idx}`}  width="270px" height="100px"></canvas>
                            </div>
                        )}
                    </>
                </Box>
            </Box>
        )
}

export default AllCharts;