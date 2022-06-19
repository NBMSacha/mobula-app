import React, { useEffect, useState,useRef } from "react";
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
import { Center, Square, Circle } from '@chakra-ui/react';
import Countdown from 'react-countdown';

function Vote({bg, btn, shadow, border, marketScore, trustScore,utilityScore, socialScore, updateScoreUtility, updateScoreMarket, updateScoreTrust, updateScoreSocial, token, voteToken}) {

    const CountdownAny = Countdown as any;
    function getColorTrust(index: number) {
        return trustScore >= index ? 'var(--chakra-colors-green)' : useColorModeValue("#E9E9E9", 'white')
    }
    function getColorUtility(index: number) {
        return utilityScore >= index ? 'var(--chakra-colors-green)' : useColorModeValue("#E9E9E9", 'white')
    }
    function getColorMarket(index: number) {
        return marketScore >= index ? 'var(--chakra-colors-green)' : useColorModeValue("#E9E9E9", 'white')
    }
    function getColorSocial(index: number) {
        return socialScore >= index ? 'var(--chakra-colors-green)' : useColorModeValue("#E9E9E9", 'white')
    }

    
    function seeMore() {
        refDescription.current.innerText = token.description;
        setActive(true)
    }

    function getExplorer(chain: string) {
        console.log('chain : ' + chain)
        for (const rpc of supportedRPCs) {
            if (rpc.name === chain) {
                return rpc.explorer;
            }
        }
    }

    function getEndDate() {
        if (localStorage.getItem('date' + token.id)) {
            if (parseInt(localStorage.getItem('date' + token.id)) > Date.now()) {
                return parseInt(localStorage.getItem('date' + token.id))
            } else {
                complete.current = true;
                return Date.now()
            }
        } else {
            localStorage.setItem('date' + token.id, String(Math.max(30 * 60 * 1000 - (Date.now() - token.lastUpdate * 1000), 0) + Date.now() + 3 * 60 * 1000))
            return Math.max(30 * 60 * 1000 - (Date.now() - token.lastUpdate * 1000), 0) + Date.now() + 3 * 60 * 1000
        }
    }
    const complete = useRef(false);
    return (
        <Flex w={["100%","100%","100%","40%"]} mb={["50px","50px","0px","0px"]} mt={["10px","10px","10px","0px"]} ml={["0px","0px","0px","10px"]}  px="35px" py={["20px","20px","30px","30px"]} direction="column" bg={bg} boxShadow={`1px 2px 12px 3px ${shadow}`} borderRadius="12px"> 
            <Flex justify="space-between" mb="10px" position="relative">
                <Text fontSize={["14px","14px","16px","16px"]}>Vote</Text>
                <Flex align="center">
                    <TimeIcon />
                    <CountdownAny
                        date={getEndDate()} onComplete={() => complete.current = true}
                        renderer={(props) => <Text fontWeight="600" ml="10px" fontSize={["14px","14px","16px","16px"]}>{props.minutes}:{String(props.seconds).length > 1 ? props.seconds : '0' + props.seconds}</Text>}
                    />
                </Flex>
                {/* MESSAGE ON VOTE */}
                <Flex direction="column" mt=" 30px" top="80px" align="center" justify="center" h="100%" w="100%"  zIndex="2" position="absolute"  opacity="1" > 
                    {/* <Flex align="center" direction="column" mb="10px"><Text>Click to vote</Text> <br /><MousePointer /></Flex> */}
                    {voteToken.validate !== undefined ? 
                        <Flex align="center" direction="column" mb="10px"><Text>Thanks for your vote !</Text> <br /><CheckIcon boxSize="45px" color="green"/></Flex> : <></>
                    }
                </Flex>
            </Flex>
        {/* BLUR TO CONDITION UNDER  filter='blur(10px)'*/}
        <Flex direction="column" position="relative" filter={voteToken.validate !== undefined ? 'blur(10px)': "none"}>
            {/* UTILITY */}
            <Flex justify="space-between" mt="15px" h="16x">
                <Text fontSize={["12px","12px","14px", "14px"]}>Utility</Text>
                <Flex>
                    <Circle size='18px' mx="3px" bg={getColorUtility(1)} fill={getColorUtility(1)} onClick={() => {updateScoreUtility(1);console.log(utilityScore)}} />
                    <Circle size='18px' mx="3px" bg={getColorUtility(2)} fill={getColorUtility(2)} onClick={() => {updateScoreUtility(2);console.log(utilityScore)}} />
                    <Circle size='18px' mx="3px" bg={getColorUtility(3)} fill={getColorUtility(3)} onClick={() => {updateScoreUtility(3);console.log(utilityScore)}} />
                    <Circle size='18px' mx="3px" bg={getColorUtility(4)} fill={getColorUtility(4)} onClick={() => {updateScoreUtility(4);console.log(utilityScore)}} />
                    <Circle size='18px' mx="3px" bg={getColorUtility(5)} fill={getColorUtility(5)} onClick={() => {updateScoreUtility(5);console.log(utilityScore)}} />
                </Flex>
            </Flex>
            {/* ACTIVITY */}
            <Flex justify="space-between" mt="15px" h="16x">
                <Text fontSize={["12px","12px","14px", "14px"]}>Activity</Text>
                <Flex>
                    <Circle size='18px' mx="3px" bg={getColorSocial(1)} fill={getColorSocial(1)} onClick={() => {updateScoreSocial(1)}} />
                    <Circle size='18px' mx="3px" bg={getColorSocial(2)} fill={getColorSocial(2)} onClick={() => {updateScoreSocial(2)}} />
                    <Circle size='18px' mx="3px" bg={getColorSocial(3)} fill={getColorSocial(3)} onClick={() => {updateScoreSocial(3)}} />
                    <Circle size='18px' mx="3px" bg={getColorSocial(4)} fill={getColorSocial(4)} onClick={() => {updateScoreSocial(4)}} />
                    <Circle size='18px' mx="3px" bg={getColorSocial(5)} fill={getColorSocial(5)} onClick={() => {updateScoreSocial(5)}} />
                </Flex>
            </Flex>
            {/* RELIABILITY */}
            <Flex justify="space-between" mt="15px" h="16x">
                <Text fontSize={["12px","12px","14px", "14px"]}>Reliability</Text>
                <Flex>
                    <Circle size='18px' mx="3px" bg={getColorTrust(1)} fill={getColorTrust(1)} onClick={() => {updateScoreTrust(1)}} />
                    <Circle size='18px' mx="3px" bg={getColorTrust(2)} fill={getColorTrust(2)} onClick={() => {updateScoreTrust(2)}} />
                    <Circle size='18px' mx="3px" bg={getColorTrust(3)} fill={getColorTrust(3)} onClick={() => {updateScoreTrust(3)}} />
                    <Circle size='18px' mx="3px" bg={getColorTrust(4)} fill={getColorTrust(4)} onClick={() => {updateScoreTrust(4)}} />
                    <Circle size='18px' mx="3px" bg={getColorTrust(5)} fill={getColorTrust(5)} onClick={() => {updateScoreTrust(5)}} />
                </Flex>
            </Flex>
            {/* MARKET */}
            <Flex justify="space-between" mt="15px" h="16x">
                <Text fontSize={["12px","12px","14px", "14px"]}>Market</Text>
                <Flex>
                <Circle size='18px' mx="3px" bg={getColorMarket(1)} fill={getColorMarket(1)} onClick={() => {updateScoreMarket(1)}} />
                    <Circle size='18px' mx="3px" bg={getColorMarket(2)} fill={getColorMarket(2)} onClick={() => {updateScoreMarket(2)}} />
                    <Circle size='18px' mx="3px" bg={getColorMarket(3)} fill={getColorMarket(3)} onClick={() => {updateScoreMarket(3)}} />
                    <Circle size='18px' mx="3px" bg={getColorMarket(4)} fill={getColorMarket(4)} onClick={() => {updateScoreMarket(4)}} />
                    <Circle size='18px' mx="3px" bg={getColorMarket(5)} fill={getColorMarket(5)} onClick={() => {updateScoreMarket(5)}} />
                </Flex>
            </Flex>
            <Flex fontSize={["12px","12px","14px", "14px"]} align="center" justify="space-between" mt="30px">
                <Button _focus={{boxShadow:"none"}} w="45%" borderRadius="10px" py={["5px","5px", "10px","10px"]} bg="green" onClick={() => voteToken(true, complete, token, utilityScore, socialScore, trustScore, marketScore)}>Validate</Button>
                <Button _focus={{boxShadow:"none"}} w="45%" borderRadius="10px" py={["5px","5px", "10px","10px"]} bg={btn} onClick={() => voteToken(false, complete, token, utilityScore, socialScore, trustScore, marketScore)}>Reject</Button>
            </Flex>
        </Flex>
        
    </Flex>
    )
}

export default Vote