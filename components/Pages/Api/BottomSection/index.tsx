import React, { useEffect, useState, useRef } from 'react'
import { extendTheme, Flex, Box, Text, Spacer, Image, Button, Grid, GridItem, useMediaQuery, useColorModeValue } from '@chakra-ui/react';
import styles from "./Api.module.scss"
import { Pocket } from "react-feather";
import { CheckCircleIcon } from "@chakra-ui/icons"


const TopSection = () => {

    const volume = "Volume";
    const rank = "Rank";
    const liquidity = "Liquidity";
    const holders = "Holders";

    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
    const [isLargerThan1330] = useMediaQuery('(min-width: 1330px)')
    const bg = useColorModeValue('rgba(255, 255, 255, 0.3)', '#161A2A')
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")

    return (
       
        <Flex w="90%" direction="column" mt="0px" pb="50px" align="center">
            <Flex p={["0px", "0px", "0px 20px", "0px 40px"]} justify="center" direction={["column", "row", "row", "row"]}>
                <Flex direction="column"  maxWidth="470px" m={["35px 10px 10px 10px","35px 10px 10px 10px","10px 10px 10px 10px","10px 10px 10px 10px"]} bg={["none", "none", "none", bg]} borderRadius="12px" p={["0px", "0px", "20px", "30px"]} boxShadow={`1px 2px 12px 3px ${shadow}`} >
                    <Text fontSize="17px" mb={["15px","15px","30px","30px"]} color="#5C7DF9" fontWeight="600" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">Backtest your strategies</Text>
                    <Text fontSize="13px" color="grey">Use the best possible crypto data to run simulations and test your trading or investment strategies. With aggregated data from hundreds of trades and thousands of coins, you can be sure to get the right picture every time.</Text>
                </Flex>
                <Flex direction="column" maxWidth="545px" m={["35px 10px 10px 10px","35px 10px 10px 10px","10px 10px 10px 10px","10px 0px 10px 0px"]} bg={["none", "none", "none", bg]} borderRadius="12px" p={["0px", "0px", "20px", "30px"]} boxShadow={`1px 2px 12px 3px ${shadow}`}  >
                    <Text fontSize="17px" mb={["15px","15px","30px","30px"]} color="#5C7DF9" fontWeight="600">Chart the right data</Text>
                    <Text fontSize="13px" color="grey" maxHeight={["auto", "154px", "auto", "auto"]} overflow="auto">Show your users the most accurate data in the market with our API. Whether you're building a portfolio, a portfolio management tool, a new media offering, or more, we have the most advanced and up-to-date data on the market for your product.</Text>
                </Flex>
            </Flex>
        
            <Flex  align="center" justify="center" bg={["none", "none", "none", bg]} w={["100%","100%","100%","80%"]} maxWidth="1025px" mt={['30px','30px','0px','0px']} ml={["10px","10px","25px","25px"]} borderRadius="12px" mr={['16px','16px','','']}>
                <Flex  bg={["none", "none", "none", bg]} wrap="wrap" borderRadius="12px" align="center" justify="space-around">
                    <Box h="80px" w="320px" display="flex" alignItems="center" justifyContent="center" borderRadius="12px"  my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image src="/dex.png" />
                    </Box>
                    <Box h="80px" w="320px" display="flex" alignItems="center" justifyContent="center" borderRadius="12px"  my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image src="/dex.png" />
                    </Box>
                    <Box h="80px" w="320px" display="flex" alignItems="center" justifyContent="center" borderRadius="12px"  my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image src="/dex.png" />
                    </Box>
                    <Box h="80px" w="320px" display="flex" alignItems="center" justifyContent="center" borderRadius="12px"  my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image src="/dex.png" />
                    </Box>
                    <Box h="80px" w="320px" display="flex" alignItems="center" justifyContent="center" borderRadius="12px"  my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image src="/dex.png" />
                    </Box>
                    <Box h="80px" w="320px" display="flex" alignItems="center" justifyContent="center" borderRadius="12px"  my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image src="/dex.png" />
                    </Box>
                </Flex>
                
               
            </Flex>
        </Flex>

    )
}

export default TopSection;