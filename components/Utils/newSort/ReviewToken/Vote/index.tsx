import React, { useEffect, useState, useRef } from "react";
import { Heading, Text, Flex, Box, Image, Button, Link, useColorModeValue, Icon } from "@chakra-ui/react";
import { TimeIcon, CopyIcon, CheckIcon } from "@chakra-ui/icons";
import Countdown from 'react-countdown';
import Circles from "./Circles";

function Vote({ marketScore, trustScore, utilityScore, socialScore, updateScoreUtility, updateScoreMarket, updateScoreTrust, updateScoreSocial, token, voteToken }) {

    const CountdownAny = Countdown as any;

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
        <Flex w={["100%", "100%", "100%", "40%"]} mb={["50px", "50px", "0px", "0px"]} mt={["10px", "10px", "10px", "0px"]} ml={["0px", "0px", "0px", "10px"]} px="35px" py={["20px", "20px", "30px", "30px"]} direction="column" bg="var(--bg-governance-box)" boxShadow={`1px 2px 12px 3px var(--shadow)`} borderRadius="12px">
            <Flex justify="space-between" mb="10px" position="relative">
                <Text fontSize={["14px", "14px", "16px", "16px"]}>Vote</Text>
                <Flex align="center">
                    <TimeIcon />
                    <CountdownAny
                        date={getEndDate()} onComplete={() => complete.current = true}
                        renderer={(props) => <Text fontWeight="600" ml="10px" fontSize={["14px", "14px", "16px", "16px"]}>{props.minutes}:{String(props.seconds).length > 1 ? props.seconds : '0' + props.seconds}</Text>}
                    />
                </Flex>
                {/* MESSAGE ON VOTE */}
                <Flex direction="column" mt=" 30px" top="80px" align="center" justify="center" h="100%" w="100%" zIndex="2" position="absolute" opacity="1" >
                    {/* <Flex align="center" direction="column" mb="10px"><Text>Click to vote</Text> <br /><MousePointer /></Flex> */}
                    {voteToken.validate !== undefined ?
                        <Flex align="center" direction="column" mb="10px"><Text>Thanks for your vote !</Text> <br /><CheckIcon boxSize="45px" color="green" /></Flex> : <></>
                    }
                </Flex>
            </Flex>
            {/* BLUR TO CONDITION UNDER  filter='blur(10px)'*/}
            <Flex direction="column" position="relative" filter={voteToken.validate !== undefined ? 'blur(10px)' : "none"}>
                <Circles name={'Utility'} score={utilityScore} updateScore={updateScoreUtility}/>
                <Circles name={'Social'} score={socialScore} updateScore={updateScoreSocial}/>
                <Circles name={'Trust'} score={trustScore} updateScore={updateScoreTrust}/>
                <Circles name={'Market'} score={marketScore} updateScore={updateScoreMarket}/>
                <Flex fontSize={["12px", "12px", "14px", "14px"]} align="center" justify="space-between" mt="30px">
                    <Button _focus={{ boxShadow: "none" }} color="white" w="45%" borderRadius="10px" py={["5px", "5px", "10px", "10px"]} bg="green" onClick={() => voteToken(true, complete, token, utilityScore, socialScore, trustScore, marketScore)}>Validate</Button>
                    <Button boxShadow="1px 2px 13px 3px var(--shadow)" _focus={{ boxShadow: "none" }} w="45%" borderRadius="10px" py={["5px", "5px", "10px", "10px"]} bg="var(--background)" onClick={() => voteToken(false, complete, token, utilityScore, socialScore, trustScore, marketScore)}>Reject</Button>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default Vote