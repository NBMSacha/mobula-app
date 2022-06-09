import React, { useEffect, useState, useRef } from 'react'
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Static from "./Static"
import Dynamic from "./Dynamic"

const TopSection = () => {

    const border = useColorModeValue("#E5E5E5", "var(--chakra-colors-dark_border)")
    return (
       
        <Flex w="100%" direction="column" align="center" borderBottom={`1px solid ${border}`} pb="50px">
            <Box mb="50px" w="100%" maxWidth="1100px" my="50px">
                <Text fontFamily='Inter' fontWeight="600" fontSize="22px">The most trusted authority on crypto-currency data has a professional API made for you.</Text>
                <Text fontFamily='Inter' fontWeight="600" fontSize="22px">More detailled, more faster by <span style={{color: "blue"}}>+36%</span> than CoinMarketCap API</Text>
            </Box>
            <Flex w="90%" justify="center">
                <Static />
                <Box h="auto" mx="60px" w="2px" bg={border}></Box>
                <Dynamic />
            </Flex>
        </Flex>
    )
}

export default TopSection;