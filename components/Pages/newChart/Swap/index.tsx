import React, { useEffect, useState, useRef } from 'react'
import { ChakraProvider, Link, ColorModeProvider, useColorModeValue,Input, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import {
    formatAmount,
    getTokenPrice,
    getTokenPercentage,
    getClosest,
    getUrlFromName
  } from '../../../../helpers/formaters'
  import {
    Progress,
    ProgressLabel,
    CircularProgress,
    CircularProgressLabel,
  } from "@chakra-ui/progress"
  import { ProgressBar } from 'react-bootstrap';

const Swap = ({ baseAsset }) => { 
    const bg = useColorModeValue("none", "#191D2C")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    console.log(baseAsset)
 return (
        <Flex boxShadow={`1px 2px 12px 3px ${shadow}`} direction="column" m="0px 20px" borderRadius="12px" p="30px 30px" mt={["20px", "20px", "20px", "0px"]}>
            <Box mb={["20px", "20px", "30px", "30px"]}>
                <Text mb="10px" fontSize={["17px","17px","20px","20px"]}>Swap tool</Text>
                <Text fontSize={["11px","11px","14px","14px"]}>Easy way to trade your tokens</Text>
            </Box>
            {/* From Box */}
            <Box bg={bg} boxShadow={`1px 2px 12px 3px ${shadow}`} p={["10px 15px"]}  borderRadius="12px">
                <Text fontSize={["11px","11px","13px","13px"]} opacity=".7">From</Text>
                <Flex align="center" justify="space-between" mt="20px">
                    <Input type="number" color="none" _placeholder={{color:"none"}} w="60%" border="none" placeholder='0.0' fontSize={["15px","15px","18px","18px"]}/>
                    <Flex align="center">
                        <Image src="/fullicon.png" h="20px"/>
                        <Text ml="10px" fontSize={["14px","14px","16px","16px"]}>MOBL</Text>
                    </Flex>
                </Flex>
            </Box>
            {/* From Box */}
            <Box bg={bg} boxShadow={`1px 2px 12px 3px ${shadow}`} mt={["15px", "15px", "35px", "35px"]} p={["10px 15px"]}  borderRadius="12px">
                <Text fontSize={["11px","11px","13px","13px"]} opacity=".7">To</Text>
                <Flex align="center" justify="space-between" mt="20px">
                    <Input type="number" w="60%" color="none" _placeholder={{color:"none"}} border="none" placeholder='0.0' fontSize={["15px","15px","18px","18px"]}/>
                    <Flex align="center">
                        <Image src={baseAsset.logo} h="20px"/>
                        <Text ml="10px" fontSize={["14px","14px","16px","16px"]}>{baseAsset.symbol}</Text>
                    </Flex>
                </Flex>
            </Box>
            <Flex justify="center" mb={["50px","50px","50px","auto"]}>
                <Button bg="blue" color="white" mt={["15px","15px","30px","30px"]} w={["90%","90%","90%","100%"]} py={["8px","8px","12px","12px"]} borderRadius="10px">Connect a wallet</Button>
            </Flex>
            
        </Flex>
    )
}

export default Swap;