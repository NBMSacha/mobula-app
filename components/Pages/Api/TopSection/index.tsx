import React, { useEffect, useState, useRef } from 'react'
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Static from "./Static"
import Dynamic from "./Dynamic"

const TopSection = () => {

    const border = useColorModeValue("#E5E5E5", "var(--chakra-colors-dark_border)")
    return (
       
        <Flex w="100%" direction="column" align="center">
            <Box mb="50px" w="100%" width="1100px" my="50px">
                <Text fontFamily='Inter' fontWeight="600" fontSize="22px">The most trusted authority on crypto-currency data has a professional API made for you.</Text>
                <Text fontFamily='Inter' fontWeight="600" fontSize="22px">More detailled, more faster by <span style={{color: "blue"}}>+36%</span> than CoinMarketCap API</Text>
            </Box>
            <Flex w="80%" justify="center">
                <Static />

                <Dynamic />
            </Flex>
        </Flex>
    )
}

export default TopSection;