import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import styles from "./GainersLosers.module.scss";
import { AiOutlineArrowDown } from "@react-icons/all-files/ai/AiOutlineArrowDown"
import { AiOutlineArrowUp } from "@react-icons/all-files/ai/AiOutlineArrowUp"
import { formatName, getTokenPrice, getTokenPercentage } from '../../../helpers/formaters';
import { useRouter } from 'next/router';
<<<<<<< Updated upstream:components/Pages/GainersLosers/index.tsx
import { Text, Heading, Link, useColorModeValue, Button } from '@chakra-ui/react'
=======
import { ChakraProvider, Box, Flex, Button, Image, Input, Text, Heading, Textarea, IconButton, useColorModeValue } from '@chakra-ui/react'
>>>>>>> Stashed changes:components/GainersLosers/index.tsx

function GainersLosers() {
    const router = useRouter()
    const [tokens, setTokens] = useState([]);
    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);
    const [mobSize, setMobSize] = useState(false);
    const [state, setState] = useState("gainers");
    const gainersRef = useRef();
    const losersRef = useRef();

    const text = useColorModeValue('black', 'white');

    useEffect(() => {
        const supabase = createClient(
            "https://ylcxvfbmqzwinymcjlnx.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
        )

        supabase.from('assets').select('id,name,price_change_24h,volume,symbol,logo,market_cap, price, rank').order('price_change_24h', { ascending: false }).limit(25).then(r => {
            setGainers(r.data)
        });

        supabase.from('assets').select('id,name,price_change_24h,volume,symbol,logo,market_cap, price, rank').order('price_change_24h', { ascending: true }).limit(25).then(r => {
            setLosers(r.data)
            console.log(r.data)
        });

    }, [])


    useEffect(() => {
        var x = window.matchMedia("(max-width: 768px)")
        function mobileTitle() {
            try {
                let topLooser = document.getElementById('topLooser') as any;
                let topGainer = document.getElementById('topGainer') as any;
                if (x.matches) { // If media query matches
                    topLooser.innerHTML = "Top Gainers  & Top Loosers ";
                    topGainer.innerHTML = "Top Gainers  & Top Loosers "
                    setMobSize(true)
                } else {
                    setMobSize(false)
                }
            } catch (err) {

            }

        }
        mobileTitle();
    }, [mobSize])

    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const active = useColorModeValue("white", "var(--chakra-colors-dark_active_gainer)")
    const inactive = useColorModeValue("var(--chakra-colors-grey-loser)", "var(--chakra-colors-dark_inactive_gainer)")
    const border = useColorModeValue("var(--chakra-colors-grey_border)", "var(--chakra-colors-border_dark_gainer)")
    return (
        <div className={styles["main-container"]}>
            <div className={styles["both-container"]}>
                <div className={styles["column-left"]} id="left" ref={gainersRef}>
                    <Heading color={text} className={styles["title-both"]} id="topGainer">Top Gainers 📈 </Heading>
                    <div className={styles["mobile-btn"]}>
                        <button className={`${styles["btn-loosers"]} ${styles["gainerLooserActive"]}`}  style={{background:active,boxShadow:`1px 2px 13px 3px ${shadow}`}}id="loosers"
                            onClick={() => {
                                setState("gainers")
                            }
                            }>Gainers 📈</button>
                        <button className={styles["btn-loosers"]} style={{background:inactive,boxShadow:`1px 2px 13px 3px ${shadow}`}} id="gainers"
                            onClick={() => {
                                setState("losers");
                                (gainersRef as any).current.style.display = "none";
                                (losersRef as any).current.style.display = "block"
                            }
                            }>Loosers 📉</button>
                    </div>
                    <div className={styles["left"]} >
                        <table className={styles["table"]}>
                            <thead className={styles["border-bot"]} style={{borderBottom:`2px solid ${border}`}}>
                                <tr className={styles["table-head"]}>
                                    <th className={`${styles["data-title"]} ${styles["token-title-data"]}}`}>#</th>
                                    <th className={`${styles["data-title"]} ${styles["token-title-asset"]}}`}>Name</th>
                                    <th className={`${styles["data-title"]} ${styles["token-title-prices"]}`}>Price</th>
                                    <th className={`${styles["data-title"]} ${styles["token-title-percentages"]}`}>24h</th>
                                    <th className={`${styles["data-title"]} ${styles["token-title-volume"]}`}>Volume (24h)</th>
                                </tr>
                            </thead>
                            {gainers.map((gainer: any, idx: number) => {
                                return (
                                    <tbody className={styles["border-bot"]} style={{borderBottom:`1px solid ${border}`}} onClick={() => router.push(String(gainer.id))}>
                                        <tr className={styles["token-containers"]}>
                                            <td className={`${styles["font-char"]} ${styles["token-ids"]}`}>
                                                {/* <span>{gainer.rank}</span> */}
                                            </td>
                                            <td className={styles["token-infos"]}>
                                                <img src={gainer.logo} className={styles["token-logos"]} />
                                                <div className={styles["ellipsis"]}>
                                                    <span style={{ color: useColorModeValue('black', 'white') }} className={`${styles["font-char"]} ${styles["token-names"]}`}>{gainer.name}</span>
                                                    <span className={`${styles["font-char"]} ${styles["token-symbols"]}`}>{gainer.symbol}</span>
                                                </div>
                                            </td>
                                            <td className={styles["tokens-price"]}>
                                                <span className={`${styles["font-char"]} ${styles["token-price-box"]}`}>${getTokenPrice(gainer.price)}</span>
                                            </td>
                                            <td className={styles["token-percentage"]}>
                                                <span className={`${styles["font-char"]} ${styles["token-percentage-box"]} ${styles["green"]}`} id="noColor">
                                                    <AiOutlineArrowUp className={styles["arrowUp"]} />
                                                    {getTokenPercentage(gainer.price_change_24h)}%
                                                </span>
                                            </td>
                                            <td className={styles["token-marketCap"]}>
                                                <span className={`${styles["font-char"]} ${styles["token-marketCap-box"]}`}>${gainer.volume}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>
                </div>
                <div className={styles["column-right"]} ref={losersRef}>
                    <Heading color={text} className={styles["title-both"]} id="topLoser">Top Loosers 📉</Heading>
                    <div className={styles["mobile-btn"]}>

<<<<<<< Updated upstream:components/Pages/GainersLosers/index.tsx
                        <Button color={text} className={styles["btn-loosers"]} id="loosers"
=======
                        <button className={styles["btn-loosers"]} style={{background:inactive, boxShadow:`1px 2px 13px 3px ${shadow}`}} id="loosers"
>>>>>>> Stashed changes:components/GainersLosers/index.tsx
                            onClick={() => {
                                setState("gainers");
                                (gainersRef as any).current.style.display = "block";
                                (losersRef as any).current.style.display = "none";
                            }
<<<<<<< Updated upstream:components/Pages/GainersLosers/index.tsx
                            }>Gainers 📈</Button>
                        <Button color={text} className={`${styles["btn-loosers"]} ${styles["gainerLooserActive"]}`} id="gainers"
=======
                            }>Gainers 📈</button>
                        <button className={`${styles["btn-loosers"]} ${styles["gainerLooserActive"]}`} style={{background:active, boxShadow:`1px 2px 13px 3px ${shadow}`}} id="gainers"
>>>>>>> Stashed changes:components/GainersLosers/index.tsx
                            onClick={() => {
                                setState("losers")

                            }
                            }>Loosers 📉</Button>



                    </div>
                    <div className={styles["right"]} id="right" >
                        <table className={styles["table"]}>
                            <thead className={styles["border-bot"]} style={{borderBottom:`2px solid ${border}`}}>
                                <tr className={styles["table-head"]} >
                                    <th className={`${styles["data-title"]} ${styles["token-title-data"]}}`}>#</th>
                                    <th className={`${styles["data-title"]} ${styles["token-title-asset"]}}`}>Name</th>
                                    <th className={`${styles["data-title"]} ${styles["token-title-prices"]}`}>Price</th>
                                    <th className={`${styles["data-title"]} ${styles["token-title-percentages"]}`}>24h</th>
                                    <th className={`${styles["data-title"]} ${styles["token-title-volume"]}`}>Volume (24h)</th>
                                </tr>
                            </thead>
                            {losers.map((loser: any, idx: number) => {
                                return (
                                    <tbody className={styles["border-bot"]} style={{borderBottom:`1px solid ${border}`}} onClick={() => router.push(String(loser.id))}>
                                        <tr className={styles["token-containers"]}>
                                            <td className={`${styles["font-char"]} ${styles["token-ids"]}`}>
                                                {/* <span>{loser.rank}</span> */}
                                            </td>
                                            <td className={styles["token-infos"]}>
                                                <img src={loser.logo} className={styles["token-logos"]} />
                                                <div className={styles["ellipsis"]}>
                                                    <span style={{ color: useColorModeValue('black', 'white') }} className={`${styles["font-char"]} ${styles["token-names"]}`}>{loser.name}</span>
                                                    <span className={`${styles["font-char"]} ${styles["token-symbols"]}`}>{loser.symbol}</span>
                                                </div>
                                            </td>
                                            <td className={styles["tokens-price"]}>
                                                <span className={`${styles["font-char"]} ${styles["token-price-box"]}`}>${getTokenPrice(loser.price)}</span>
                                            </td>
                                            <td className={styles["token-percentage"]}>
                                                <span className={`${styles["font-char"]} ${styles["token-percentage-box"]}`} id="noColor">
                                                    <AiOutlineArrowDown className="arrowDown" />
                                                    {getTokenPercentage(loser.price_change_24h)}%
                                                </span>
                                            </td>
                                            <td className={styles["token-marketCap"]}>
                                                <span className={`${styles["font-char"]} ${styles["token-marketCap-box"]}`}>${loser.volume}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default GainersLosers