import React, {useEffect, useState, useRef } from "react";
import axios from 'axios';
import {useParams} from "react-router-dom";
import { Chart, registerables } from 'chart.js'; 
import Tendance from '../Header/Tendance';
import { ImStarEmpty } from "@react-icons/all-files/Im/ImStarEmpty";
const ChartCrypto = () => {

//   Chart.register(...registerables);
  const [coins, setCoins] = useState([])
  const [ isLoading, setIsLoading] = useState(false);
  const [chart,setChart] = useState({})
  const [day, setDay] = useState({});
  const [week, setWeek] = useState({});
  const [month, setMonth] = useState({});
  const [year, setYear] = useState({});
  const [all, setAll] = useState({})
  const [timeFormat, setTimeFormat] = useState("");
//   const chartRef = useRef();

  

  const formatData = data => {
    return data.map(el => {
      return {
        t: el[0],
        y: el[1]
      }
    })
  }

  

  useEffect(() => {
    
    const fetchData = async () => {
      setIsLoading(true)
      const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets/", { 
        params: {
          vs_currency: "usd",
          ids: "ethereum",
        }
      });

      console.log(response)
      setCoins(response.data);
      setIsLoading(false);
    }
    fetchData()
    console.log(coins[0])
  },[]);


// const { coin } = useParams()
  useEffect(() => {
    
    const fetchChart = async () => {
      setIsLoading(true)
      try{
        
        const days = await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart/`, { 
          params: {
            vs_currency: "usd",
            days: 1,
            interval: "5M"
          }
        });
        const weeks = await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart/`, { 
          params: {
            vs_currency: "usd",
            days: 7,
            interval: "5M"
          }
        });
        const months = await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart/`, { 
          params: {
            vs_currency: "usd",
            days: 30,
            interval: "5M"
          }
        });
        const years = await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart/`, { 
          params: {
            vs_currency: "usd",
            days: 365,
            interval: "5M"
          }
        });
        const alls = await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart/`, { 
          params: {
            vs_currency: "usd",
            days: "max",
            interval: "daily"
          }
        });
      //   const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets/", { 
      //   params: {
      //     vs_currency: "usd",
      //     ids: "ethereum",
      //   }
      // });
      console.log(weeks.data.prices)
      console.log(years.data.prices)
        setChart({price: formatData(days.data.prices) })
        setDay({price: formatData(days.data.prices) })
        setWeek({price: formatData(weeks.data.prices) })
        setMonth({price: formatData(months.data.prices) })
        setYear({price: formatData(years.data.prices) })
        setAll({price: formatData(alls.data.prices)})
        
        setIsLoading(false);
      } catch(err) {
        console.log(err.message)
        console.log("catch err")
      }
      console.log(chart)

    }
   fetchChart()
    console.log("retry")
    
  },[]);
  
  // SI en dessous de coins.price_change alors color red sinon vert (coins[0].price_change_24h - coins[0].current_price < -coins[0].current_price )



  const determineTimeFormat = () => {
    console.log(timeFormat)
    switch(timeFormat) {
      case "1D":
        return day.price;
      case "7D":
        return week.price;
      case "30D":
        return month.price;
      case "1Y":
        return year.price;
      case "ALL":
        return all.price;
      default:
        return day.price; 
    } 

  }

  

  useEffect(()=> {
    setIsLoading(true)
    if(all.price) {
      var ctx = document.getElementById("chart").getContext("2d");
      // const up = (ctx, value) => ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined;
      // const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
      
      var dayIf;
      console.log('canvas')
      console.log(coins)


      if(timeFormat == '7D'){
        dayIf= 'day';
      } 
      if(timeFormat == '30D'){
          dayIf= 'week';
      }
      if(timeFormat == '1Y'){
          dayIf= 'quarter';
      }
      if(timeFormat == 'ALL'){
          dayIf= 'year';
      }
      if(window.chartInstance != undefined) {
        window.chartInstance.destroy();
      }

      window.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Price',
            data: determineTimeFormat(),
            fill: false,
            datasetFill: false,
            borderColor: "rgba(0,126,207,1)" ,
            tension: 0.3,
            // segment: {
            //   borderColor: ctx => up(ctx, "rgba(192, 192, 192, 1)") || down(ctx, "rgba(180, 0, 0, 1)"), 
            // },
            backgroundColor: "rgba(0,1,46,1)",
            borderWidth: 3,
            pointRadius:0,
            responsive: true,
            maintainAspectRatio:false,
          }],
        },
        options: {
          interaction: {
            mode: 'index',
        },
          legend: {
            display: false //This will do the task
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,    
              }
            }],
            xAxes: [{
              gridLines: { display: false},
              type:'time',
              distribution: "linear",
              time: { 
                unit: dayIf,
                displayFormats: {
                  hour: 'HH:mm'
                },
              }
            }]
          }
        },
      });
      
    } 
    setIsLoading(false);
  },[chart, timeFormat])

  const renderData = () => {
    if (isLoading) {
      return 
    }
    
    return (
      <div className="App" >
        <Tendance />
        <div className="chart-main-container">

            <div className="chart-top-token">
                <div className="chart-left-top">
                    <img src="eth.png" className="chart-token-logo" />
                    <div className="chart-name-box">
                      <div className="chart-token-name"><span>Ethereum</span> <ImStarEmpty className="star-chart"/></div>
                      <span className="chart-token-rank">Mobula Rank #2</span>
                    </div>  
                </div>
                <div className="chart-right-top">
                    <div className="chart-box-container">
                      <div className="chart-right-info">
                          <p className="dollard">$</p>
                          <p className="test">2814.22</p>
                      </div>
                      <div className="chart-info-box">
                          <div className="box-info">
                            <p className="grey">High:</p>
                            <p className="numbers">$2988.87</p>
                          </div>
                          <div className="box-info">
                            <p className="grey">Holders:</p>
                            <p className="numbers">3562487</p>
                          </div>
                      </div>
                      <div className="chart-info-box">
                        <div className="box-info">
                          <p className="grey">Low:</p>
                          <p className="numbers">$2768.98</p>
                        </div>
                        <div className="box-info-percentage">
                        <span className="token-percentage-box font-char"><div className="triangle-red"></div>0,65%</span>
                          <p className="red-loser">Top loser</p>
                        </div>
                      </div>
                      
                    </div>
                    <div className="chart-buy">
                        <button className="chart-btn-buy">Buy / Sell</button>
                    </div>
                </div>
            </div>
            <div className="chart-bottom-container">
                <div className="chart-bottom-left">
                    <div className="left-top-box">
                        <span>
                          <p className="text-top-chart topOne">MARKET CAP</p>
                          <p className="text-bottom-chart">$338,838,592,908</p>
                        </span>
                        <span>
                          <p className="text-top-chart">VOLUME (24H)</p>
                          <p className="text-bottom-chart">$14,842,203,587</p>
                        </span>
                        <span>
                          <p className="text-top-chart">FULLY DILUTED MARKET CAP</p>
                          <p className="text-bottom-chart">$339,838,592,908</p>
                        </span>
                        <span>
                          <p className="text-top-chart">CIRCULATING SUPPLY</p>
                          <p className="text-bottom-chart">120,585,919,06 ETH</p>
                        </span>
                        <span>
                          <p className="text-top-chart">TOTAL SUPPLY </p>
                          <p className="text-bottom-chart">120,590,052 ETH</p>
                        </span>
                        <span>
                          <p className="text-top-chart">MAX SUPPLY</p>
                          <p className="text-bottom-chart">--</p>
                        </span>
                    </div>
                    <div className="left-bottom-box">
                        <div className="notes-boxs">
                            <span>DAO SCORE</span>
                            <span>20/20</span>
                        </div>
                        <div className="notes-boxs">
                            <span>Utility</span>
                            <span>5/5</span>
                        </div>
                        <div className="notes-boxs">
                            <span>Activity</span>
                            <span>5/5</span>
                        </div>
                        <div className="notes-boxs">
                            <span>Reliability</span>
                            <span>5/5</span>
                        </div>
                        <div className="notes-boxs">
                            <span>Market</span>
                            <span>5/5</span>
                        </div>
                    </div>
                </div>
                <div className="chart-bottom-right">
                  <div className="chart-box">
                    <div className="chart-header">
                      <a href ="" className="chart-header-link active-chart"><span>Overview</span></a>
                      <a href ="" className="chart-header-link"><span>Market</span></a>
                      <a href ="" className="chart-header-link"><span>Holders Liquidity Volume</span></a>
                      <a href ="" className="chart-header-link"><span>Project Info</span></a>
                      <a href ="" className="chart-header-link"><span>Socials</span></a>
                      <a href ="" className="chart-header-link report-problem"><span>A problem ? Report to the DAO</span></a>
                    </div>
                    <div className="chart-content">
                      <div className="canvas-container">
                        <canvas   width="1200"height="450" id="chart"></canvas>
                        <div className="change-chart-date"style={{display: "flex",justifyContent: "end",margin: "auto"}}>
                        <button onClick={() => {setTimeFormat("1D"); console.log('1D')}} className="button-chart-active">1D</button>
                        <button onClick={() => {setTimeFormat("7D"); console.log('7D')}} className="button-chart" >7D</button>
                        <button onClick={() => {setTimeFormat("30D"); console.log('30D')}} className="button-chart" >30D</button>
                        <button onClick={() => {setTimeFormat("1Y"); console.log('1Y')}} className="button-chart" >1Y</button>
                        <button onClick={() => {setTimeFormat("ALL"); console.log('ALL')}} className="button-chart" >ALL</button>
                      </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
            </div>

        </div>

        



        <header className="">
          <div className="tokenpage-details " style={{display: "flex",justifyContent: "start"}}>

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
    );
  
  // return <div>{test()}</div>
 
  }
  
  return <div>{renderData()}</div>
}

export default ChartCrypto;