import React, { useEffect, useState } from "react";
import TokenDisplay from "../../Utils/Sort/TokenDisplay";
import { ethers } from "ethers";
import { PROTOCOL_ADDRESS, RPC_URL } from "../../../constants";
import { Heading, Text, Flex, Box, Image, Button, Link, useColorModeValue, Icon} from "@chakra-ui/react";
import DaoHeader from "../../Utils/DaoHeader";
import Blocks from '../../Utils/Sort/Blocks';
import { useAlert } from 'react-alert';
import Router from "next/router";
import { Globe,  } from "react-feather"
import { TimeIcon, CopyIcon, CheckIcon } from "@chakra-ui/icons"
import styles from "../FirstSort.module.scss"
import { MousePointer } from "react-feather"

function Vote({bg, btn, shadow, border}) {

    return (
        <Flex w={["100%","100%","100%","40%"]} mb={["50px","50px","0px","0px"]} mt={["10px","10px","10px","0px"]} ml={["0px","0px","0px","10px"]}  px="35px" py={["20px","20px","30px","30px"]} direction="column" bg={bg} boxShadow={`1px 2px 12px 3px ${shadow}`} borderRadius="12px"> 
            <Flex justify="space-between" mb="10px" position="relative">
                <Text fontSize={["","","","15px"]}>Vote</Text>
                <Flex align="center">
                    <TimeIcon />
                    <Text ml="10px" fontSize={["","","","15px"]}>2:00</Text>
                </Flex>
                {/* MESSAGE ON VOTE */}
                <Flex direction="column" mt=" 30px" top="80px" align="center" justify="center" h="100%" w="100%"  zIndex="2" position="absolute"  opacity="1" > 
                    {/* <Flex align="center" direction="column" mb="10px"><Text>Click to vote</Text> <br /><MousePointer /></Flex> */}
                    <Flex align="center" direction="column" mb="10px"><Text>Thanks for your vote !</Text> <br /><CheckIcon boxSize="45px" color="green"/></Flex>
                </Flex>
                {/*  */}
            </Flex>
        {/* BLUR TO CONDITION UNDER */}
        <Flex direction="column" position="relative" filter='blur(10px)'>
            {/* UTILITY */}
            <Flex justify="space-between" mt="15px" h="16x">
                <Text fontSize="12px">Utility</Text>
                <Flex>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg="green"></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg={btn}></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg={btn}></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg={btn}></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg={btn}></Box>
                </Flex>
            </Flex>
            {/* ACTIVITY */}
            <Flex justify="space-between" mt="15px" h="16x">
                <Text fontSize="12px">Activity</Text>
                <Flex>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg="green"></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg="green"></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg="green"></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg="green"></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg={btn}></Box>
                </Flex>
            </Flex>
            {/* RELIABILITY */}
            <Flex justify="space-between" mt="15px" h="16x">
                <Text fontSize="12px">Reliability</Text>
                <Flex>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg="green"></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg="green"></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg="green"></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg="green"></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg={btn}></Box>
                </Flex>
            </Flex>
            {/* MARKET */}
            <Flex justify="space-between" mt="15px" h="16x">
                <Text fontSize="12px">Market</Text>
                <Flex>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg="green"></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg="green"></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg="green"></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg={btn}></Box>
                    <Box mx="5px" h="16x" max-height="16px" w="16px" borderRadius="full" bg={btn}></Box>
                </Flex>
            </Flex>
            <Flex fontSize="12px" align="center" justify="space-between" mt="30px">
                <Button w="45%" borderRadius="10px" py={["5px","5px", "10px","10px"]} bg="green">Validate</Button>
                <Button w="45%" borderRadius="10px" py={["5px","5px", "10px","10px"]} bg={btn}>Reject</Button>
            </Flex>
        </Flex>
        
    </Flex>
    )
}

export default Vote