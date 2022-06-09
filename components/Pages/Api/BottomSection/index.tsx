import React, { useEffect, useState, useRef } from 'react'
import { extendTheme, Flex, Box, Text, Spacer, Image, Button, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
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


    return (
       
        <Flex w="90%" direction="column" mt="40px" pb="50px">
            <Flex p="0px 40px" justify="center">
                <Flex direction="column" maxWidth="440px" m="30px 30px 30px 0px">
                    <Text fontSize="16px" mb="30px">Backtest your strategies</Text>
                    <Text fontSize="13px" color="grey">Use the best possible crypto data to run simulations and test your trading or investment strategies. With aggregated data from hundreds of trades and thousands of coins, you can be sure to get the right picture every time.</Text>
                </Flex>
                <Flex direction="column" maxWidth="440px" m="30px 30px 30px 0px" ml={isLargerThan1330 ? "160px" : "40px"}>
                    <Text fontSize="16px" mb="30px">Chart the right data</Text>
                    <Text fontSize="13px" color="grey">Show your users the most accurate data in the market with our API. Whether you're building a portfolio, a portfolio management tool, a new media offering, or more, we have the most advanced and up-to-date data on the market for your product.</Text>
                </Flex>
            </Flex>
            <Box h="auto" mx="60px" w="2px" bg="red"></Box>
            <Flex p="0px 40px" justify="center" >
                <Flex direction="column" maxWidth="440px" m="30px 30px 30px 0px">
                    <Text fontSize="16px" mb="30px">Beat the competition</Text>
                    <Text fontSize="13px" color="grey">Check the performance of other exchanges and currencies with our market data. With in-depth knowledge of current and past prices, volumes and trading information, you can make the right decisions to stay ahead of the game.</Text>
                </Flex>
                
                <Flex direction="column" maxWidth="440px" m="30px 30px 30px 0px" ml={isLargerThan1330 ? "160px" : "40px"}>
                    <Text fontSize="16px" mb="30px">Chart the right data</Text>
                    <Text fontSize="13px" color="grey">Check the performance of other exchanges and currencies with our market data. With in-depth knowledge of current and past prices, volumes and trading information, you can make the right decisions to stay ahead of the game.</Text>
                </Flex>
            </Flex>
            <Flex p="0px 40px" justify="center" >
                <Flex direction="column" maxWidth="440px" m="30px 30px 30px 0px">
                <Text fontSize="16px" mb="30px">They using Mobula API</Text>
                <Text fontSize="13px" color="grey">Trusted by these fine companies and many more ...</Text>
                </Flex>
                
                <Flex direction="column" maxWidth={[, isLargerThan1280 ? "715px" : '440px']} m="30px 30px 30px 0px"  visibility="hidden">
                    <Text fontSize="16px" mb="30px">Chart the right data</Text>
                    <Text fontSize="13px" color="grey">Check the performance of other exchanges and currencies with our market data. With in-depth knowledge of current and past prices, volumes and trading information, you can make the right decisions to stay ahead of the game.</Text>
                </Flex>
            </Flex>
          
            <Flex direction={isLargerThan1280 ? 'column' : 'row'} align="center" justify="center">
                <Flex direction={isLargerThan1280 ? 'row' : 'column'}>
                    <Box h="80px" w="348px" bg="#191D2C" borderRadius="12px" mx="20px" my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image src="" />
                    </Box>
                    <Box h="80px" w="348px" bg="#191D2C" borderRadius="12px" mx="20px" my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image src="" />
                    </Box>
                    <Box h="80px" w="348px" bg="#191D2C" borderRadius="12px" mx="20px" my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image src="" />
                    </Box>
                </Flex>
                <Flex mt={isLargerThan1280 ? "20px" : "0px"} direction={isLargerThan1280 ? 'row' : 'column'}>
                    <Box h="80px" w="348px"  bg="#191D2C" borderRadius="12px" mx="20px" my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image src="" />
                    </Box>
                    <Box h="80px" w="348px" bg="#191D2C" borderRadius="12px" mx="20px" my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image src="" />
                    </Box>
                    <Box h="80px" w="348px" bg="#191D2C" borderRadius="12px" mx="20px" my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image src="" />
                    </Box>
                </Flex>
               
            </Flex>
        </Flex>

    )
}

export default TopSection;