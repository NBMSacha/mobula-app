import React, { useEffect, useState, useRef } from 'react'
import { extendTheme, Flex, Box, Text, Spacer, Image, Button} from '@chakra-ui/react';
import AllCharts from "./AllCharts/index.jsx";

const Charts = ({baseAsset}) => {

     const volume = "Volume";
     const rank = "Rank";
     const liquidity = "Liquidity";
     const holders = "Holders";
    
    return (   
        <Flex w="100%" wrap="wrap" justify="space-around" align="space-around" h="100%" pb={8}>
            <Flex w="100%"  wrap="wrap" justify='space-around' >
                <AllCharts baseAsset={baseAsset} title={volume} idx={0}/>
                <AllCharts baseAsset={baseAsset} title={rank} idx={1}/>
                <AllCharts baseAsset={baseAsset} title={liquidity} idx={3}/>
                <AllCharts baseAsset={baseAsset} title={holders} idx={4}/>
            </Flex>
        </Flex>
    )
}

export default Charts;