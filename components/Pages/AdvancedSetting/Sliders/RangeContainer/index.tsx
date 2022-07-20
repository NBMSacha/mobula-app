import React, { useContext } from "react"
import { Flex, Text, Button } from "@chakra-ui/react"
import Boxs from "./Boxs"
import { UpDownIcon } from "@chakra-ui/icons"
import styles from "../Sliders.module.scss"
import { ContextObject } from "../index"

export default function RangeContainer({setShowMore, showMore}) {
    const themeContext = useContext(ContextObject);
    return (

                <>
                <Flex direction="column" mr="10px" className={styles["progress-box"]}>
                    <Flex p="5px"  border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px" w="100%" direction={["column", "column","row", "row"]}> 
                        <Boxs title={"Liquidity"} isActive={themeContext.isActiveLiquidity} setIsActive={themeContext.setIsActiveLiquidity} setSetting={themeContext.setLiquidity} setting={themeContext.liquidity}/>
                        <Boxs title={"Market cap"} isActive={themeContext.isActiveMarketCap} setIsActive={themeContext.setIsActiveMarketCap} setSetting={themeContext.setMarketCap} setting={themeContext.marketCap}/>
                        <Boxs title={"Volume"} isActive={themeContext.isActiveVolume} setIsActive={themeContext.setIsActiveVolume} setSetting={themeContext.setVolume} setting={themeContext.volume}/>
                        {showMore ? (
                            <>
                                <Boxs title={"Holders"}/>
                                <Boxs title={"Online Telegram users"}/>
                                <Boxs title={"Price change 24h"} />
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
                    <Flex mt="10px" display={["none", "none", "flex","flex"]}  p="5px" w="100%" border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px" direction={["column", "column","row", "row"]}> 
                        <Boxs title={"Holders"}/>
                        <Boxs title={"Online Telegram users"}/>
                        <Boxs title={"Price change"}/>
                    </Flex>
                </Flex>
            </>
 
    )
}
