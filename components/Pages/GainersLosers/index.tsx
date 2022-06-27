
import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import styles from "./GainersLosers.module.scss";
import { Button, Heading, useColorModeValue, Text, Box, Flex, Image } from '@chakra-ui/react'
import Tables from "./Tables"
import BlockchainBtn from "../../Utils/BlockchainBtn"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { TrendingUp, TrendingDown } from "react-feather"
import Widget from "../../Utils/Widget"

function GainersLosers({ gainersBuffer, losersBuffer }) {
    const [blockchain, setBlockchain] = useState('');
    const [settings, setSettings] = useState({ liquidity: 1000, volume: 1000, onChainOnly: false, default: true })
    const [widgetVisibility, setWidgetVisibility] = useState(false);
    const [gainers, setGainers] = useState(gainersBuffer || []);
    const [losers, setLosers] = useState(losersBuffer || []);
    const [state, setState] = useState("gainers");
    const gainersRef = useRef();
    const losersRef = useRef();
    const active = useColorModeValue("white", "rgba(122, 122, 122, 0.1)")
    const inactive = useColorModeValue("var(--chakra-colors-grey-loser)", "var(--chakra-colors-dark_inactive_gainer)")


    useEffect(() => {
        const supabase = createClient(
            "https://ylcxvfbmqzwinymcjlnx.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
        )
        supabase
            .from('assets')
            .select('id,name,price_change_24h,volume,symbol,logo,market_cap, price, rank,contracts,blockchains')
            .contains('blockchains[1]', '{ ' + blockchain + ' }')
            .gte('liquidity', settings.liquidity)
            .gte('volume', settings.volume)
            .gte('price_change_24h', 0)
            .order('price_change_24h', { ascending: false })
            .limit(100).then(r => {
                setGainers(r.data
                    .filter(entry => (entry.contracts.length > 0 || !settings.onChainOnly) && (entry.blockchains?.[0] == blockchain || !blockchain))
                    .slice(0, 25))
            });

        supabase.from('assets')
            .select('id,name,price_change_24h,volume,symbol,logo,market_cap, price, rank,contracts,blockchains')
            .contains('blockchains[1]', '{ ' + blockchain + ' }')
            .gte('liquidity', settings.liquidity)
            .gte('volume', settings.volume)
            .lte('price_change_24h', 0)
            .order('price_change_24h', { ascending: true })
            .limit(100).then(r => {
                setLosers(r.data
                    .filter(entry => (entry.contracts.length > 0 || !settings.onChainOnly) && (entry.blockchains?.[0] == blockchain || !blockchain))
                    .slice(0, 25))
            });

    }, [settings, blockchain])

    return (
        <div className={styles["main-container"]} style={{maxWidth:"1850px", margin:"auto",marginBottom: "30px" }}>
            <div className={`${styles["both-container"]} ${styles["widths"]}`} style={{ flexDirection: "column" }}>
                <Heading display={["flex", "flex", "none", "none"]} w="95%" className={styles["title-both"]} id="topGainer" mt="25px" mb="20px" fontSize="24px">{state === "gainers" ? "Top Gainers" : "Top Loosers"} </Heading>
                <Flex align="center" justify="space-between" display={["flex", "flex", "none", "none"]} w="90%">
                    <Box className={styles["mobile-btn"]} style={{ width: "95%" }}>
                        <Button _focus={{ boxShadow: "none" }} bg={state == "gainers" ? "var(--box_border_active)" : "none"} border={state == "gainers" ? "none" : "1px solid rgba(122, 122, 122, 0.1)"} boxShadow={`1px 2px 13px 3px var(--shadow)`} px="10px" borderRadius="8px" mr="10px" className={`${styles["btn-loosers"]} ${styles["gainerLooserActive"]}`} style={{ boxShadow: `1px 2px 13px 3px var(--shadow)` }} id="loosers"
                            onClick={() => {
                                setState("gainers");
                                (gainersRef as any).current.style.display = "block";
                                (losersRef as any).current.style.display = "none"
                            }
                            }>Gainers <TrendingUp style={{ width: "15px", marginLeft: "10px" }} /></Button>
                        <Button _focus={{ boxShadow: "none" }} bg={state == "losers" ? "var(--box_border_active)" : "none"} border={state == "losers" ? "none" : "1px solid rgba(122, 122, 122, 0.1)"} px="10px" borderRadius="8px" className={styles["btn-loosers"]} style={{ boxShadow: `1px 2px 13px 3px var(--shadow)` }} id="gainers"
                            onClick={() => {
                                setState("losers");
                                (gainersRef as any).current.style.display = "none";
                                (losersRef as any).current.style.display = "block"
                            }
                            }>Loosers <TrendingDown style={{ width: "15px", marginLeft: "10px" }} /></Button>
                    </Box>
                </Flex>

                <Heading ml="50px" display={["none", "none", "flex", "flex"]} w="95%" className={styles["title-both"]} id="topGainer" mt="25px" mb="20px" fontSize="24px">Top gainers / Top losers </Heading>
                <Text mb="30px" mx="auto" display={["none", "none", "flex", "flex"]} ml="50px">Top gainers & losers of Mobula database. Click on the settings to filter your research.</Text>
                <Flex w="100%" display={["flex"]} p={['20px', '20px', '0px', '0px']} pb={0}>
                    <Widget settings={settings} setSettings={setSettings} visible={widgetVisibility} setVisible={setWidgetVisibility} />
                    <BlockchainBtn blockchain={blockchain} setBlockchain={setBlockchain} hideSearchBar={true} widgetVisibility={widgetVisibility} setWidgetVisibility={setWidgetVisibility} />
                </Flex>

            </div>

            <div className={styles["both-container"]}>
                <div className={styles["column-left"]} id="left" ref={gainersRef}>
                    <Tables losers={losers} gainers={gainers} loser={null} gainer={"gainer"} />
                </div>
                <div className={styles["column-right"]} ref={losersRef}>
                    <Tables losers={losers} gainers={gainers} gainer={null} loser={"loser"} />
                </div>
            </div>
        </div>
    )

}

export default GainersLosers