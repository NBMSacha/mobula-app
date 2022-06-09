import React from 'react'
import { Flex } from '@chakra-ui/react';
import AllCharts from "./AllCharts/index.tsx";

const Charts = ({ baseAsset }) => {

    var volume = "Volume";
    var rank = "Rank";
    var liquidity = "Liquidity";
    var holders = "Holders";

    if (baseAsset.volume_history.volume.length <= 25) {
        volume = "No Volume"
    }
    if (baseAsset.rank_history.rank.length <= 1000) {
        rank = "No Rank"
    }
    if (baseAsset.liquidity_history.liquidity.length <= 25) {
        liquidity = "No Liquidity"
    }

    console.log(baseAsset.rank_history.rank.length)
    console.log(baseAsset.volume_history.volume.length)
    console.log(baseAsset.liquidity_history.liquidity.length)

    return (
        <Flex w="100%" wrap="wrap" justify="space-around" align="space-around" h="100%" pb={8}>
            <Flex w="100%" wrap="wrap" justify='space-around' direction={["column", "column", "column", "row"]}>
                <AllCharts baseAsset={baseAsset} title={volume} idx={0} />
                <AllCharts baseAsset={baseAsset} title={rank} idx={1}/>
                <AllCharts baseAsset={baseAsset} title={liquidity} idx={3}/>
                <AllCharts baseAsset={baseAsset} title={holders} idx={4}/>
            </Flex>
        </Flex>
    )
}

export default Charts;