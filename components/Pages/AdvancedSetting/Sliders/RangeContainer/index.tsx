import React, { useState, useEffect } from 'react'
import { useColorModeValue, Flex, Box, Text, Stack,Image, Button } from '@chakra-ui/react'
import Boxs from "./Boxs"
import { CalendarIcon, UpDownIcon } from "@chakra-ui/icons"
import styles from "../Sliders.module.scss"

export default function RangeContainer({showMore, setShowMore}) {

    
    const [volume, setVolume] = useState([50_000, 345_000])
    const [liquidity, setLiquidity] = useState([1000, 345_393])
    const [marketCap, setMarketCap] = useState([15_263,1_000_000])
    const [holders, setHolders] = useState([54_221,545_221])
    const [tlgUsers, setTlgUsers] = useState([4522,152_856])
    const [price, setPrice] = useState([4551, 54_666])
    const [setting, setSetting] = useState({ 
        liquidity,
        volume,
        market_cap: marketCap,
        holders,
        tlg_users: tlgUsers,
        price_change:price,
        onChainOnly: false,
        default: true
    })

    function reverseExpo(x: number): number {
        return x === 0 ? 0 : 50000 * Math.log(x);
    }

    console.log(setting.liquidity)
    return (
            <Flex direction="column" mr="10px" className={styles["progress-box"]}>
                <Flex p="5px"  border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px" w="100%" direction={["column", "column","row", "row"]}> 
                    <Boxs setGeneralSettings={setSetting} generalSettings={setting} title={"Liquidity"}  setSettings={setLiquidity} settings={liquidity}/>
                    <Boxs setSets={setSetting} sets={setting} title={"Market-cap"} setSettings={setMarketCap} settings={marketCap}/>
                    <Boxs setSets={setSetting} sets={setting} title={"Volume"} setSettings={setVolume} settings={volume}/>
                    {showMore ? (
                        <>
                            <Boxs title={"Holders"} setSets={setSetting} sets={setting} setSettings={setHolders} settings={holders}/>
                            <Boxs title={"Online Telegram users"} setSets={setSetting} sets={setting} setSettings={setTlgUsers} settings={tlgUsers}/>
                            <Boxs title={"Price change"} setSets={setSetting} sets={setting} setSettings={setPrice} settings={price}/>
                            <Button my="20px" onClick={() => setShowMore(!showMore)} mx="auto">
                                <UpDownIcon mr="20px"/>
                                <Text>Less settings</Text>
                            </Button>
                        </>
                    ) : ( 
                        <Button display={["flex", "flex","none","none"]} my="20px" onClick={() => setShowMore(!showMore)} mx="auto">
                            <UpDownIcon mr="20px"/>
                            <Text>More settings</Text>
                        </Button>
                     )}
                </Flex>
                <Flex mt='10px' display={["none", "none", "flex","flex"]}  p="5px" w="100%" border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px" direction={["column", "column","row", "row"]}> 
                    <Boxs title={"Holders"} setSets={setSetting} sets={setting} setSettings={setHolders} settings={holders}/>
                    <Boxs title={"Online Telegram users"} setSets={setSetting} sets={setting} setSettings={setTlgUsers} settings={tlgUsers}/>
                    <Boxs title={"Price change"} setSets={setSetting} sets={setting} setSettings={setPrice} settings={price}/>
                </Flex>
            </Flex>
    )
}
