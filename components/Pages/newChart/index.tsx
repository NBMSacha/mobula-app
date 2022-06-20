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
    getShortenedAmount,
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

const Token = ({ baseAssetBuffer }) => {
    const socialLink = useColorModeValue("none", "rgba(41, 44, 56, 0.29)")
    const [selector, setSelector] = useState("price")
    const router = useRouter()
    const [timeFormat, setTimeFormat] = useState('7D')
    const [volume, setVolume] = useState(0);
    const [liquidity, setLiquidity] = useState(0);
    const [price, setPrice] = useState(0);
    const [beforeToken, setBeforeToken] = useState({ name: 'Loading...', rank: '?', id: '' })
    const [afterToken, setAfterToken] = useState({ name: 'Loading...', rank: '?' })
    const [historyData, setHistoryData] = useState(null);
    const [mobile] = useMediaQuery('(max-width: 768px)');
    const fillStyle = useColorModeValue("#666", "#b8b8b8");
    const strokeStyle = useColorModeValue("black", 'white')
    const [isPriceWinner, setIsWinner]: [boolean, Function] = useState();
    const [selectorInfo, setSelectorInfo] = useState("")
    const [moreStat, setMoreStat] = useState(false);
    const types = ['price', 'volume', 'liquidity', 'rank'];
    const unformattedInitialBuffer = {}
    const [baseAsset, setBaseAsset]: [any, Function] = useState(baseAssetBuffer)

    types.forEach(type => {
        const multiplier = type == 'rank' ? -1000000000 : 1000000000;
        unformattedInitialBuffer[type] = {
            '1D': baseAsset?.[type + '_history'][type].filter((entry: [number, number]) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
                .map((entry: [number, number]) => [entry[0], entry[1] * multiplier]),
            '7D': baseAsset?.[type + '_history'][type].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                .map((entry: [number, number]) => [entry[0], entry[1] * multiplier])
        }
    })

    const [unformattedBuffer, setUnformattedBuffer]: [any, Function] = useState(unformattedInitialBuffer)
    const { asset } = router.query;

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

    const getExtremes = (data: [{ y: number, t: number }]) => {
        let bufferATH: { y: number | string, t: number } = { y: '0', t: 0 };
        //Infitiy cannot be used with big ints
        let bufferATL: { y: number | string, t: number } = { y: '1000000000000000000000000000000000000000000000', t: 0 };

        const bigAbs = (x: BigInt) => {
            return x < BigInt(0) ? -x : x
        };

        if (data) {

            for (let i = 0; i < data.length; i++) {
                if (data[i].y && bigAbs(BigInt(data[i].y)) > bigAbs(BigInt(bufferATH.y))) {
                    bufferATH = data[i]
                } else if (data[i].y && bigAbs(BigInt(data[i].y)) < bigAbs(BigInt(bufferATL.y))) {
                    bufferATL = data[i]
                }
            }
        }

        const ATH = { y: parseInt(bufferATH.y as string), t: bufferATH.t }
        const ATL = { y: parseInt(bufferATL.y as string), t: bufferATL.t }

        return { ATH, ATL }
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

        try {
            (window as any).chartInstance.destroy()
        } catch (e) { console.log('Not destroying chart.') }


        try {
            var ctx = (document.getElementById('chart') as any).getContext('2d')

            const data = getRightData()
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
                isMobile ? 100 : isGiant ? 300 : 200
            )
            gradient.addColorStop(0, isWinner ? '#00ba7c' : '#D8494A')
            gradient.addColorStop(1, bgChart)

            console.log(data);

            if (selector == 'rank') {
                var { ATH, ATL } = getExtremes(data);
                var allTimeDiff = Math.floor(ATH.y / -1000000000) - Math.floor(ATL.y / -1000000000)
            }

            const labels = selector == 'rank' ? data.map((entry: { y: number }) => entry.y) : null;
            const formattedData = selector == 'rank' ? data?.map((entry: { y: number }) => Math.round(entry.y)) : data;
            const maxTicksLimit = selector == 'rank' ? Math.min(allTimeDiff, 5) : isMobile ? 6 : 8;
            const xAxes = selector == 'rank' ? [{ display: false }] : [
                {
                    gridLines: { display: false },
                    type: 'time',
                    distribution: 'linear',
                    ticks: {
                        fontColor: "white",
                        fontFamily: "Poppins",
                        maxRotation: 0,
                        minRotation: 0,
                        maxTicksLimit: isMobile ? (dayIf == 'week' ? 2 : 4) : 8,
                    },
                    time: {
                        unit: dayIf,
                        tooltipFormat: 'MM/DD/YYYY        HH:MM:SS',
                        displayFormats: {
                            hour: 'HH:mm',
                            week: "MMM D"
                        },

                    },

                },
            ];

            console.log('DATA DUMPED');

            (window as any).chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            data: formattedData,
                            fill: selector != 'rank',
                            datasetFill: true,
                            borderColor: isWinner ? '#00ba7c' : '#EA3943',
                            tension: 0.6,
                            backgroundColor: gradient,
                            borderWidth: 2,
                            pointRadius: 0,
                            maintainAspectRatio: false,
                            steppedLine: selector == 'rank' ? 'middle' : false
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
                    hover: { mode: null },
                    scales: {
                        yAxes: [
                            {
                                gridLines: { display: false },
                                display: selector != 'rank' || !!allTimeDiff,
                                ticks: {
                                    type: 'category',
                                    beginAtZero: false,
                                    font: { size: 20 },
                                    fontFamily: "Poppins",
                                    maxTicksLimit,
                                    callback: function (tick: number) {
                                        if (selector != 'rank') {
                                            return getShortenedAmount(tick / 1000000000)
                                        } else {
                                            return (tick / -1000000000).toFixed(0)
                                        }
                                    },
                                },
                            },
                        ],
                        xAxes
                    },
                },
            });


            if (allTimeDiff == 0 && selector == 'rank') {
                ctx.font = '20px Inter';
                ctx.strokeStyle = strokeStyle
                ctx.fillStyle = strokeStyle
                ctx.fillText('Rank #' + baseAsset.rank, 5, 50)
            }

            console.log('Created chart instance')

            const crosshairLine = (chart: any, mousemove: any) => {
                const { canvas, ctx, chartArea: { left, right, top, bottom }, data, scales } = chart;
                chart.update(null);
                ctx.restore();

                ctx.lineWidth = 3;
                ctx.strokeStyle = isWinner ? '#00ba7c' : '#D8494A';
                const currentData = unformattedBuffer[selector][timeFormat];
                const x = scales["x-axis-0"];
                const y = scales["y-axis-0"];

                const tick = x.getValueForPixel(mousemove.offsetX);

                try {
                    const [[timestamp1, value1], [timestamp2, value2]] = getClosestUltimate(currentData, tick._i);
                    const pixel1 = y.getPixelForValue(value1);
                    const pixel2 = y.getPixelForValue(value2);

                    const finalPixel = pixel1 + ((pixel2 - pixel1) / Math.abs(timestamp2 - timestamp1)) * (tick._i - timestamp1);
                    const finalPrice = value1 + ((value2 - value1) / Math.abs(timestamp2 - timestamp1)) * (tick._i - timestamp1);
                    const h = Math.max(finalPixel - 100, top + 20)

                    ctx.beginPath();
                    if (mousemove.offsetX >= left && mousemove.offsetX <= right) {
                        ctx.moveTo(mousemove.offsetX, h);
                        ctx.lineTo(mousemove.offsetX, finalPixel);
                        ctx.stroke();
                    }
                    ctx.closePath();

                    const shouldBeRight = mousemove.offsetX < (right - 100);


                    ctx.beginPath();
                    ctx.strokeStyle = 'white'
                    ctx.fillStyle = isWinner ? '#00ba7c' : '#D8494A';
                    ctx.ellipse(mousemove.offsetX, finalPixel, 7, 7, 45 * Math.PI / 180, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.stroke()
                    ctx.closePath();

                    ctx.font = '15px Inter';
                    ctx.fillStyle = "white";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "left";

                    let price = '$' + getShortenedAmount(finalPrice / 1000000000, 1);

                    const rectWidth = ctx.measureText(price).width + 20
                    roundRect(ctx, mousemove.offsetX - (shouldBeRight ? 0 : rectWidth), h - 15, rectWidth, 30, 15, true);


                    ctx.beginPath();
                    ctx.strokeStyle = 'white'
                    ctx.fillStyle = isWinner ? '#00ba7c' : '#D8494A';
                    ctx.ellipse(mousemove.offsetX + 10 - (shouldBeRight ? 0 : rectWidth), h, 4, 4, 45 * Math.PI / 180, 0, 2 * Math.PI); ctx.fill();
                    ctx.closePath();

                    ctx.fillStyle = 'grey'
                    ctx.fillText(price, mousemove.offsetX + 15 - (shouldBeRight ? 0 : rectWidth), h)

                } catch (e) {
                    console.log(e)
                }

            }

            (window as any).chartInstance.canvas.addEventListener('mousemove', (e) => {
                if (selector != 'rank') {
                    crosshairLine((window as any).chartInstance, e)
                } else {
                    if (allTimeDiff == 0 && selector == 'rank') {
                        ctx.font = '20px Inter';
                        ctx.strokeStyle = 'white';
                        ctx.fillStyle = 'white';
                        ctx.fillText('Rank #' + baseAsset.rank, 5, 50)
                    }
                }
            });


        } catch (e) {
            console.log(e)
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

    const fetchHistory = async () => {
        const supabase = createClient(
            'https://ylcxvfbmqzwinymcjlnx.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
        )

        const { data } = await supabase
            .from('history')
            .select('price_history,liquidity_history,rank_history,volume_history')
            .match({ asset: baseAsset.id })

        console.log('SETTING HISTORY DATA')

        console.log(data)
        setHistoryData(data?.[0] || [])

        if (data?.[0]) {

            const newUnformattedBuffer = { ...unformattedBuffer };

            types.forEach(type => {
                const multiplier = type == 'rank' ? -1000000000 : 1000000000;

                newUnformattedBuffer[type] = {
                    '1D': baseAsset?.[type + '_history'][type].filter((entry: [number, number]) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
                        .map((entry: [number, number]) => [entry[0], entry[1] * multiplier]),
                    '7D': baseAsset?.[type + '_history'][type].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                        .map((entry: [number, number]) => [entry[0], entry[1] * multiplier]),
                    '30D': data[0][type + '_history'].filter((entry: [number, number]) => entry[0] + 30 * 24 * 60 * 60 * 1000 > Date.now() && Date.now() > entry[0] + 7 * 24 * 60 * 60 * 1000)
                        .map((entry: [number, number]) => [entry[0], entry[1] * multiplier]).concat(baseAsset?.[type + '_history'][type]
                            .filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                            .map((entry: [number, number]) => [entry[0], entry[1] * multiplier])),
                    '3M': data[0][type + '_history'].filter((entry: [number, number]) => entry[0] + 90 * 24 * 60 * 60 * 1000 > Date.now() && Date.now() > entry[0] + 7 * 24 * 60 * 60 * 1000)
                        .map((entry: [number, number]) => [entry[0], entry[1] * multiplier]).concat(baseAsset?.[type + '_history'][type].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                            .map((entry: [number, number]) => [entry[0], entry[1] * multiplier])),
                    '1Y': data[0][type + '_history'].filter((entry: [number, number]) => entry[0] + 365 * 24 * 60 * 60 * 1000 > Date.now() && Date.now() > entry[0] + 7 * 24 * 60 * 60 * 1000)
                        .map((entry: [number, number]) => [entry[0], entry[1] * multiplier]).concat(baseAsset?.[type + '_history'][type].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                            .map((entry: [number, number]) => [entry[0], entry[1] * multiplier])),
                    'ALL': data[0][type + '_history'].filter((entry: [number, number]) => Date.now() > entry[0] + 7 * 24 * 60 * 60 * 1000)
                        .map((entry: [number, number]) => [entry[0], entry[1] * multiplier]).concat(baseAsset?.[type + '_history'][type].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                            .map((entry: [number, number]) => [entry[0], entry[1] * multiplier]))
                }
            })

            console.log(newUnformattedBuffer)

            setUnformattedBuffer(newUnformattedBuffer)

        }
    }

    const fetchAssetData = async () => {
        const supabase = createClient(
            'https://ylcxvfbmqzwinymcjlnx.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
        )

        const { data } = await supabase
            .from('assets')
            .select('*')
            .match({ id: baseAsset.id })

        setBaseAsset(data[0])
    }

    useEffect(() => {
        fetchBeforeToken()
        fetchHistory()
        fetchAssetData()
        generateChart()

        try {
            (window as any).chartInstance.destroy()
        } catch (e) { }
    }, [asset])

    useEffect(() => {

    }, [baseAsset])

    useEffect(() => {
        generateChart()
    }, [timeFormat, selector])

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
    console.log(baseAsset.contracts[0])

    const getRightData = () => {
        console.log('========')
        console.log(historyData)
        const multiplier = selector == 'rank' ? -1000000000 : 1000000000;

        switch (timeFormat) {
            case '1D':
                return baseAsset?.[selector + '_history'][selector].filter((entry: [number, number]) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
                    .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * multiplier } });
            case '7D':
                return baseAsset?.[selector + '_history'][selector].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                    .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * multiplier } });
            case '30D':
                return historyData?.[selector + '_history'].filter((entry: [number, number]) => entry[0] + 30 * 24 * 60 * 60 * 1000 > Date.now() && Date.now() > entry[0] + 7 * 24 * 60 * 60 * 1000)
                    .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * multiplier } }).concat(baseAsset?.[selector + '_history'][selector].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                        .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * multiplier } }));
            case '3M':
                return historyData?.[selector + '_history'].filter((entry: [number, number]) => entry[0] + 90 * 24 * 60 * 60 * 1000 > Date.now() && Date.now() > entry[0] + 7 * 24 * 60 * 60 * 1000)
                    .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * multiplier } }).concat(baseAsset?.[selector + '_history'][selector].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                        .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * multiplier } }));
            case '1Y':
                return historyData?.[selector + '_history'].filter((entry: [number, number]) => entry[0] + 365 * 24 * 60 * 60 * 1000 > Date.now() && Date.now() > entry[0] + 7 * 24 * 60 * 60 * 1000)
                    .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * multiplier } }).concat(baseAsset?.[selector + '_history'][selector].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                        .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * multiplier } }));
            case 'ALL':
                return historyData?.[selector + '_history'].filter((entry: [number, number]) => Date.now() > entry[0] + 7 * 24 * 60 * 60 * 1000)
                    .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * multiplier } }).concat(baseAsset?.[selector + '_history'][selector].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                        .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * multiplier } }));
            default:
                return baseAsset?.[selector + '_history'][selector].filter((entry: [number, number]) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
                    .map((entry: [number, number]) => { return { t: entry[0], y: entry[1] * multiplier } });
        }
    }

    const bgChart = useColorModeValue("#F5F5F5", "#171B2B")
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
                {selector !== "swap" ? (
                    <ChartBox historyData={historyData} setTimeFormat={setTimeFormat} timeFormat={timeFormat} socialLink={socialLink} selector={selector} baseAsset={baseAsset} setSelector={setSelector} />
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
                <Box w="100%" h="100%" bg={bgChart} boxShadow={`1px 2px 12px 3px ${shadowbis}`} borderRadius="12px" m="0px 10px" p="30px 10px" mt="10px">
                    <Text fontSize="20px" ml="20px" mb="20px">{baseAsset.name} contract(s)</Text>
                    {baseAsset.contracts[0] !== undefined ? (
                        <Flex direction="column" w="95%" pt="0px" px="20px" maxHeight={["294px"]} overflowY="scroll" className={styles["scroll"]}>
                            {baseAsset.contracts.map((contract: string, idx: number) => {
                                return (
                                    <Contract contract={contract} blockchain={baseAsset.blockchains[idx]} />
                                )
                            })}
                        </Flex>
                    ) : (
                        <Flex w="100%" mt="-30px" h="100%" align="center" justify="center" p="30px">
                            <Text>This asset doesn't have any wrapped on EVM-compatible chains, meaning we can't provide trustless data.</Text>
                        </Flex>
                    )}


                </Box>

            </Flex>

        </Flex>
    )
}

export default Token;

