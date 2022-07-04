import React, { useState, useEffect } from 'react'
import { Flex, Box, Text, Stack, Image, Button } from '@chakra-ui/react'
import styles from "./Blockchain.module.scss"
import Buttons from "./Buttons"
import { createClient } from '@supabase/supabase-js'

export default function Blockchain({blockchains, setBlockchains, setTokens, tokens}) {
    const [settings, setSettings] = useState({ liquidity: 0, volume: 0, onChainOnly: false, default: true })

    useEffect(() => {
       
        console.log(blockchains)
  
        const supabase = createClient(
          "https://ylcxvfbmqzwinymcjlnx.supabase.co",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
        )
    
        supabase
          .from('assets')
          .select('id,name,price_change_24h,volume,symbol,logo,market_cap,price,rank,contracts,blockchains,twitter,website,chat,created_at, kyc, audit')
          .gte('liquidity', settings.liquidity)
          .gte('volume', settings.volume)
          .order('created_at', { ascending: false })
          .limit(100).then(r => {
            
            setTokens(r.data
              .filter(entry => (entry.blockchains?.[0] == blockchains), 'gte')
              .slice(0, 50))
          });
          console.log(blockchains)
      }, [blockchains])
      console.log(tokens)

  
    
    return (
            <Flex w="90%" direction={["column", "column","row","row"]} className={styles["scroll"]} maxWidth={["540px", "540px","1400px","1400px"]} mx="auto" h={["85px","85px","55px","55px"]}
            p={["10px 15px","10px 15px","10px","5px"]} align="center" border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}}
            borderRadius="12px" overflowX={["scroll", "scroll"]} whiteSpace={["nowrap"]} position="relative"> 
                <Flex position={["absolute","absolute","static","static"]} left="4px" w="auto" h="100%" align="center" top={["-20px"]} mr="15px">
                    <Button variant={blockchains.includes("all") ? "secondary" : "primary"} my={["5px", "5px", "0px", "0px"]} transition="background 200ms ease-in-out"
                        _hover={{background:'var(--box_active)', transition:"background 200ms ease-in-out", cursor: "pointer", color:"none"}} _focus={{ boxShadow: "none" }}
                        w={["auto", "auto", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
                        display={["flex", "flex", "flex", "flex", "flex"]}  h={["30px", "30px", "40px", "40px"]} minWidth='fit-content'
                        alignItems="center" justifyContent="center" p={["10px","10px","10px 20px","10px 20px"]}  borderRadius="10px"
                        onClick={() => {
                            if (blockchains.includes("all")) {
                                const newBlockchains = [...blockchains];
                                newBlockchains.splice(newBlockchains.indexOf("all"), 1);
                                setBlockchains(newBlockchains)
                                console.log(blockchains)
                            } else {
                                const newBlockchains = [...blockchains];
                                newBlockchains.push("all");
                                setBlockchains(newBlockchains)
                                console.log(blockchains)
                            }
                        }}>
                        <Box as="span" display={["none", "none", "block", "block"]} style={{ marginLeft: "10px" }}>All chains</Box>
                        <Flex display={["flex", "flex", "none", "none"]} style={{ marginLeft: "10px" }}>
                            <Flex align="center" mr="10px">Check all chains</Flex>
                            <Image h={["20px", "20px", "28px", "28px"]} mx="5px" src='/ethereum.png' />
                            <Image h={["20px", "20px", "28px", "28px"]} mx="5px" src='/bcw.png' />
                            <Image h={["20px", "20px", "28px", "28px"]} mx="5px" src='/avalanche.png' />
                            <Image h={["20px", "20px", "28px", "28px"]} mx="5px" src='/polygon.png' />
                            <Image display={["none", "none", "flex", "flex"]} h={["20px", "20px", "28px", "28px"]} mx="5px" src='/cronos.png' />
                            <Image display={["none", "none", "flex", "flex"]} h={["20px", "20px", "28px", "28px"]} mx="5px" src='/harmony.png' />
                            <Image display={["none", "none", "flex", "flex"]} h={["20px", "20px", "28px", "28px"]} mx="5px" src='/fantom.png' borderRadius="full" />
                        </Flex>
                    </Button>
                    <Buttons blockchains={blockchains} setBlockchains={setBlockchains} blockchainName={"Ethereum"} name={"Ethereum"} symbol={"ETH"} logo={"./ethereum.png"}/>
                    <Buttons blockchains={blockchains} setBlockchains={setBlockchains} blockchainName={"BNB Smart Chain (BEP20)"} name={"BNB Chain"} symbol={"BNB"} logo={"./bcw.png"}/>
                    <Buttons blockchains={blockchains} setBlockchains={setBlockchains} blockchainName={"Avalanche C-Chain"} name={"Avalanche"} symbol={"AVAX"} logo={"./avalanche.png"}/>
                </Flex>
                <Flex position={["absolute","absolute","static","static"]} left="4px" top="18px" w="auto" h="100%" align="center">
                    
                    <Buttons blockchains={blockchains} setBlockchains={setBlockchains} blockchainName={"Polygon"} name={"Polygon"} symbol={"MATIC"} logo={"./polygon.png"}/>
                    <Buttons blockchains={blockchains} setBlockchains={setBlockchains} blockchainName={"Cronos"} name={"Cronos"} symbol={"CRO"} logo={"./cronos.png"}/>
                    <Buttons blockchains={blockchains} setBlockchains={setBlockchains} blockchainName={"Arbitrum"} name={"Arbitrum"} symbol={"ARBT"} logo={"./arbitrum.png"}/>
                    <Buttons blockchains={blockchains} setBlockchains={setBlockchains} blockchainName={"Fantom"} name={"Fantom"} symbol={"FTM"} logo={"./fantom.png"}/>
                    <Buttons blockchains={blockchains} setBlockchains={setBlockchains} blockchainName={"Harmony"} name={"Harmony"} symbol={"ONE"} logo={"./harmony.png"}/>
                    <Buttons blockchains={blockchains} setBlockchains={setBlockchains} blockchainName={"Cardano"} name={"Cardano"} symbol={"ADA"} logo={"./cardano.png"}/>
                </Flex>
            </Flex>
    )
}




