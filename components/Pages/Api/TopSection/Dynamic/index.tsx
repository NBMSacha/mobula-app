import React, { useEffect, useState, useRef } from 'react'
import { Flex, Text, Button, useMediaQuery, useColorModeValue } from '@chakra-ui/react';
import { CheckCircleIcon } from "@chakra-ui/icons"

const Static = () => {
    const [isLargerThan1330] = useMediaQuery('(min-width: 1330px)')
    const bg = useColorModeValue('rgba(255, 255, 255, 0.3)', '#161A2A')
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    return (

        <Flex direction="column" bg={bg} borderRadius="12px" p="20px 40px"  ml="10px" boxShadow={`1px 2px 12px 3px ${shadow}`} >
            <Text fontSize="17px">Dynamic API</Text>
            <Text color="#8B8B8B" mb="30px" mt="10px" fontSize="16px">An API to retrieve data such as<br /> price, liquidity and volume (only on-chain) of assets.</Text>
            <Flex>
                <Flex direction="column" mr="100px">
                    <Flex mb="30px" align="center">
                        <CheckCircleIcon />
                        <Text ml="10px" fontSize="14px">Liquidity</Text>
                    </Flex>
                    <Flex mb="30px" align="center">
                        <CheckCircleIcon />
                        <Text ml="10px" fontSize="14px">Price</Text>
                    </Flex>
                    <Flex mb="30px" align="center">
                        <CheckCircleIcon />
                        <Text ml="10px" fontSize="14px">Volume</Text>
                    </Flex>
                    <Flex mb="30px" align="center">
                        <CheckCircleIcon />
                        <Text ml="10px" fontSize="14px">Market capitalization</Text>
                    </Flex>
                </Flex>
                <Flex direction="column">
                    <Flex mb="30px" align="center">
                        <CheckCircleIcon />
                        <Text ml="10px" fontSize="14px">Fully diluted market cap</Text>
                    </Flex>
                    <Flex mb="30px" align="center">
                        <CheckCircleIcon />
                        <Text ml="10px" fontSize="14px">Circulating supply</Text>
                    </Flex>
                    <Flex mb="30px" align="center">
                        <CheckCircleIcon />
                        <Text ml="10px" fontSize="14px">Total supply</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Button w="80%" bg="blue" py="10px">
                <Text ml="10px" fontSize="14px" color="white">Request dynamic API access</Text>
            </Button>
        </Flex>
    )
}

export default Static;