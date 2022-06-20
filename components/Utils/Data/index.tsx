
import { getBlockchainFromContract } from '../../../helpers/blockchain';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { CloseButton } from '@chakra-ui/react'

export default function Data() {

    const bg = useColorModeValue("linear-gradient(180deg, rgba(92, 125, 249, 0.03) 0%, rgba(17, 21, 36, 0.09) 77.55%, rgba(18, 22, 38, 0) 100%)", "linear-gradient(180deg, rgba(92, 125, 249, 0.19) 0%, rgba(17, 21, 36, 0.09) 77.55%, rgba(18, 22, 38, 0) 100%);")
    const [close, setClose] = useState(false);

    return (
        <Flex bg={bg} w="84%" display={close ? "none" : "flex"} justify="space-between" p="10px 20px" borderRadius="14px">
            {/* @ts-ignore */}
            <Text>Mobula’s data is <span style={{ color: "#16C784" }}>100%</span> scraped on-chain  {'->'}</Text>
            <Flex align="center">
                <Text mr="10px">Which means <span style={{ color: "#16C784" }}>trustless</span> data, in opposite to CEX aggregation systems who can easily be falsified</Text>
                <Flex bg="#58667E" borderRadius="full" align="center" justify="center">
                    <CloseButton size="sm" w="20px" bg="#58667E" color="white" borderRadius="full" h="20px" onClick={() => setClose(true)} />
                </Flex>
            </Flex>
        </Flex>
    )
}