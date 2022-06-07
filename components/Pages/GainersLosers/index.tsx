
import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import styles from "./GainersLosers.module.scss";

import { Button, Heading, useColorModeValue } from '@chakra-ui/react'
import Tables from "./Tables"

function GainersLosers() {

    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);
    const [state, setState] = useState("gainers");
    const gainersRef = useRef();
    const losersRef = useRef();
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const active = useColorModeValue("white", "var(--chakra-colors-dark_active_gainer)")
    const inactive = useColorModeValue("var(--chakra-colors-grey-loser)", "var(--chakra-colors-dark_inactive_gainer)")
    const text = useColorModeValue('black', 'white');
    var gainer = "gainer"
    var loser = "loser"

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

    return (
        <div className={styles["main-container"]} style={{marginBottom:"30px"}}>
            <div className={styles["both-container"]}>
                <Heading color={text} display={["flex","flex","none","none"]} w="95%" className={styles["title-both"]} id="topGainer" mt="25px" mb="20px" fontSize="24px">{state === "gainers" ? "Top Gainers 📈" : "Top Loosers 📉"} </Heading>
                <div className={styles["mobile-btn"]} style={{width:"95%"}}>
                    <Button bg={ state === "gainers" ? active : inactive } boxShadow={`1px 2px 13px 3px ${shadow}`} px="10px" borderRadius="8px" mr="10px" className={`${styles["btn-loosers"]} ${styles["gainerLooserActive"]}`}  style={{boxShadow:`1px 2px 13px 3px ${shadow}`}}id="loosers"
                        onClick={() => {
                            setState("gainers");
                            (gainersRef as any).current.style.display = "block";
                            (losersRef as any).current.style.display = "none"
                        }
                    }>Gainers 📈</Button>
                    <Button bg={ state == "losers" ? active : inactive } px="10px" borderRadius="8px" className={styles["btn-loosers"]} style={{boxShadow:`1px 2px 13px 3px ${shadow}`}} id="gainers"
                        onClick={() => {
                            setState("losers");
                            (gainersRef as any).current.style.display = "none";
                            (losersRef as any).current.style.display = "block"
                        }
                    }>Loosers 📉</Button>
                </div>
                <div className={styles["column-left"]} id="left" ref={gainersRef}>
                    <Heading display={["none","none","flex","flex"]} color={text} className={styles["title-both"]} id="topLoser" fontSize="24px">Top Gainers 📈</Heading>
                    <Tables losers={losers} gainers={gainers} gainer={gainer} />
                </div>
                <div className={styles["column-right"]} ref={losersRef}>
                    <Heading display={["none","none","flex","flex"]} color={text} className={styles["title-both"]} id="topLoser" fontSize="24px">Top Loosers 📉</Heading>
                    <Tables losers={losers} gainers={gainers} loser={loser}/>
                </div>
            </div>
        </div>
    )

}

export default GainersLosers