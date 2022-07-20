import React, { useEffect, useState } from "react";
import styles from "./Trendings.module.scss";
import BlockchainBtn from "../../Utils/BlockchainBtn"
import HeaderTable from "../../Utils/HeaderTable"
import { createClient } from "@supabase/supabase-js"
import { Flex, Text, Heading, Link } from "@chakra-ui/react";
import Widget from "../../Utils/Widget"

export default function Trendings({ tokensBuffer }) {

    const [tokens, setTokens] = useState(tokensBuffer || []);
    const [blockchain, setBlockchain] = useState("");
    const [settings, setSettings] = useState({ liquidity: 0, volume: 0, onChainOnly: false, default: true })
    const [widgetVisibility, setWidgetVisibility] = useState(false);

    useEffect(() => {
        const supabase = createClient(
            "https://ylcxvfbmqzwinymcjlnx.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
        )
        supabase
            .from("assets")
            .select("id,name,price_change_24h,volume,symbol,logo,market_cap,price,rank,contracts,blockchains,twitter,website,chat,created_at")
            .gte("liquidity", settings.liquidity)
            .gte("volume", settings.volume)
            .order("views_change_24h", { ascending: false })
            .limit(100).then(r => {
                setTokens(r.data
                    .filter(entry => (entry.contracts.length > 0 || !settings.onChainOnly) && (entry.blockchains?.[0] === blockchain || !blockchain))
                    .slice(0, 50))
            });

    }, [settings, blockchain])

    function getTokensToDisplay() {
        return tokens
    }
    return (
        <Flex justify="center" maxWidth="1850px" mx="auto">
            <div className={styles["dflex"]} >
                <Flex>
                    <Text display={["flex", "flex", "none", "none"]} mb={"20px"} mt={"25px"}>Trending added</Text>
                </Flex>
                <Flex display={["none", "none", "flex", "flex"]} mb={"50px"} mt={"55px"} fontSize={["12px", "12px", "14px", "14px"]} className={styles["stickyFix"]} w="100%" align="end" justify="space-between">
                    <Flex direction="column">
                        <Heading mb={"15px"} fontSize="24px" fontFamily="Inter">Trending tokens</Heading>
                        <Text whiteSpace="normal" fontSize={["12px", "12px", "14px", "14px"]}>
                            Crypto-assets trending by Mobula (based on visits, trades and 10+ other factors).
                        </Text>
                    </Flex>
                    <Text display={["none", "none", "none", "flex"]}>You can submit your own token (or a token you support) <Link color="blue" ml="5px">here</Link></Text>
                </Flex>
                <Widget settings={settings} setSettings={setSettings} visible={widgetVisibility} setVisible={setWidgetVisibility} />
                <BlockchainBtn blockchain={blockchain} setBlockchain={setBlockchain} widgetVisibility={widgetVisibility} setWidgetVisibility={setWidgetVisibility} />
                {/* <Top title={"Trendings"} setOrderBy={tokens} /> */}
                {/* @ts-ignore */}
                <HeaderTable title={"Advanced Settings"} getTokensToDisplay={getTokensToDisplay}/>
            </div>
        </Flex>
    )
}

