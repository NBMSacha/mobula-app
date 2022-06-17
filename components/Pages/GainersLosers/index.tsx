
import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import styles from "./GainersLosers.module.scss";
import { Button, Heading, useColorModeValue, Text, Box, Flex, Image} from '@chakra-ui/react'
import Tables from "./Tables"
import BlockchainBtn from "../../Utils/BlockchainBtn"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { TrendingUp, TrendingDown } from "react-feather"
import Widget from "../../Utils/Widget"

function GainersLosers() {

    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);
    const [state, setState] = useState("gainers");
    const gainersRef = useRef();
    const losersRef = useRef();
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const active = useColorModeValue("white", "rgba(122, 122, 122, 0.1)")
    const inactive = useColorModeValue("var(--chakra-colors-grey-loser)", "var(--chakra-colors-dark_inactive_gainer)")
    const text = useColorModeValue('black', 'white');
    var gainer = "gainer"
    var loser = "loser"
    const [ widget, setWidget] = useState(false)

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
        <div className={styles["main-container"]} style={{ marginBottom: "30px" }}>
            <div className={`${styles["both-container"]} ${styles["widths"]}`} style={{flexDirection:"column"}}>
                 <Heading color={text} display={["flex", "flex", "none", "none"]} w="95%" className={styles["title-both"]} id="topGainer" mt="25px" mb="20px" fontSize="24px">{state === "gainers" ? "Top Gainers" : "Top Loosers"} </Heading>
                 <Flex align="center" justify="space-between" display={["flex", "flex", "none", "none"]} w="90%">
                     <Box className={styles["mobile-btn"]}  style={{ width: "95%" }}>
                        <Button _focus={{boxShadow:"none"}} bg={state == "gainers" ? active : "none"} border={state == "gainers" ? "none" : "1px solid rgba(122, 122, 122, 0.1)"} boxShadow={`1px 2px 13px 3px ${shadow}`} px="10px" borderRadius="8px" mr="10px" className={`${styles["btn-loosers"]} ${styles["gainerLooserActive"]}`} style={{ boxShadow: `1px 2px 13px 3px ${shadow}` }} id="loosers"
                            onClick={() => {
                                setState("gainers");
                                (gainersRef as any).current.style.display = "block";
                                (losersRef as any).current.style.display = "none"
                            }
                            }>Gainers <TrendingUp style={{width:"15px", marginLeft:"10px"}} /></Button>
                        <Button _focus={{boxShadow:"none"}} bg={state == "losers" ? active : "none"} border={state == "losers" ? "none" : "1px solid rgba(122, 122, 122, 0.1)"} px="10px" borderRadius="8px" className={styles["btn-loosers"]} style={{ boxShadow: `1px 2px 13px 3px ${shadow}` }} id="gainers"
                            onClick={() => {
                                setState("losers");
                                (gainersRef as any).current.style.display = "none";
                                (losersRef as any).current.style.display = "block"
                            }
                            }>Loosers <TrendingDown style={{width:"15px", marginLeft:"10px"}} /></Button>
                    </Box>
                    <Button px="10px" borderRadius="8px" className={styles["btn-loosers"]} style={{ boxShadow: `1px 2px 13px 3px ${shadow}` }} _focus={{boxShadow:"none"}} border="1px solid rgba(122, 122, 122, 0.1)">
                        <ArrowBackIcon w="20px" h="20px" mx="6px" />
                        <Image mr="5px" src="/avalanche.png" h="20px" />
                        <Image mr="5px" src="/bcw.png" h="20px" />
                        <Image mr="5px" src="/polygon.png" h="20px" />
                    </Button>
                 </Flex>
                
                 <Heading color={text} ml="50px" display={["none", "none", "flex", "flex"]} w="95%" className={styles["title-both"]} id="topGainer" mt="25px" mb="20px" fontSize="24px">Top gainers / Top losers </Heading>
                 <Text mb="30px" mx="auto" display={["none", "none", "flex", "flex"]} ml="50px">See here the top gainers and the top losers</Text>
                 <Flex w="100%" display={["none", "none", "flex", "flex"]}>
                    <Flex display={widget ? "flex" : "none" }>
                        <Widget setWidget={setWidget} />
                    </Flex>
                    <BlockchainBtn setWidget={setWidget} widget={widget} />
                 </Flex>
                 
            </div>
           
            <div className={styles["both-container"]}>
                
                
                
                <div className={styles["column-left"]} id="left" ref={gainersRef}>
                   
                    {/* @ts-ignore */}
                    <Tables losers={losers} gainers={gainers} gainer={gainer} />
                </div>
                <div className={styles["column-right"]} ref={losersRef}>
                   
                    {/* @ts-ignore */}
                    <Tables losers={losers} gainers={gainers} loser={loser}/>
                </div>
            </div>
        </div>
    )

}

export default GainersLosers