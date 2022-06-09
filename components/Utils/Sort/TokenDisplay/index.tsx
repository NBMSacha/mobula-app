import React, { useEffect, useState, useRef } from 'react';
import styles from './TokenDisplay.module.scss';
import { Heading, Text, Flex, Box, Image, Spacer, ButtonGroup, Button, useColorModeValue } from "@chakra-ui/react";
import { PROTOCOL_ADDRESS, supportedRPCs } from '../../../../constants';
import {
    formatName
} from '../../../../helpers/formaters';
import Countdown from 'react-countdown';
import { setTimeout } from 'timers'
import { Send, Twitter, Globe } from "react-feather";
import Vote from './Vote';
import { useAlert } from 'react-alert';
import { ethers } from 'ethers';
import Router from "next/router";
import Contract from '../../Contract';

const DisplayedToken = ({ token, changeDisplay, voteToken }) => {
    const CountdownAny = Countdown as any;
    const alert = useAlert();
    const [active, setActive] = useState(false);
    const refDescription = useRef(null);
    const refContract = useRef(null)
    const [utilityScore, setUtilityScore] = useState(0);
    const [socialScore, setSocialScore] = useState(0);
    const [trustScore, setTrustScore] = useState(0);
    const [marketScore, setMarketScore] = useState(0);
    const complete = useRef(false);

    const shadow = useColorModeValue('0px 1px 6px 1px #d0d6e3', '0px 1px 12px 3px rgba(0,0,0,0.2)')

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


    return (
        <Flex flexWrap={["wrap", "wrap", "wrap", "nowrap"]} ml={["2rem", "2rem", "5rem"]} mr={["2rem", "2rem", "5rem"]}>
            <Flex direction="column" w={["100%", "100%", "80%"]}>
                <Flex width="100%" align="center" flexWrap={["wrap", "wrap", "nowrap"]}>
                    <Flex justify="space-between" width="100%" align="center">
                        <Flex align="center">
                            <Image width='50px' src={token.logo} mr="20px"></Image>
                            <Heading fontSize={["xl", "xl", "xx-large"]}>{token.name}</Heading>
                        </Flex>
                        <Flex width={["30%", "30%", "20%"]} justify="space-around" >
                            {token.website && <a href={token.website}><Globe className={styles["icons"]} /></a>}
                            {token.twitter && <a href={token.twitter}><Twitter className={styles["icons"]} /></a>}
                            {token.chat && <a href={token.chat}><Send className={styles["icons"]} /></a>}
                        </Flex>
                    </Flex>

                    <Flex mt={[token.kyc || token.audit ? "30px" : "0px",
                    token.kyc || token.audit ? "30px" : "0px", "0px"]}
                        ml={['0px', '0px', token.kyc || token.audit ? '40px' : "0px"]}>
                        {token.kyc ? (
                            <Button w="110px" h="40px" bg={useColorModeValue("#E9E9E9", "dark_box_list")} onClick={() => document.location.href = token.kyc}>KYC</Button>
                        ) : <></>}
                        {token.audit ? (
                            <Button w="110px" h="40px" bg={useColorModeValue("#E9E9E9", "dark_box_list")} onClick={() => document.location.href = token.audit}>Audit</Button>
                        ) : <></>}
                    </Flex>
                </Flex>
                <Box p={["0px", "0px", "20px"]}>
                    <Text color={useColorModeValue("gray.600", "gray.400")} ref={refDescription}>{active ? token.description.split('\n').map((str: string) => <><br /><p>{str}</p></>) : formatName(token.description, 700).split('\n').map((str: string) => <><br /><p>{str}</p></>)}
                        {token.description && token.description.length > 700 ? <Button width="20px" mb="20px"
                            bg="blue"
                            color="white"
                            onClick={() => {
                                setActive(!active);
                                console.log(token.description)
                            }
                            }>
                            {active ? (<span>-</span>) : (<span>+</span>)}
                        </Button>
                            : <></>}
                    </Text>

                </Box>

                <Spacer />

                <Flex rounded="xl" p="20px" direction="column" boxShadow={useColorModeValue('0px 1px 6px 1px #d0d6e3', '0px 1px 12px 3px rgba(0,0,0,0.2)')}>
                    <div className={styles["left"]} ref={refContract} id="contract">
                        <Heading fontSize="xl" fontWeight="600">Contract(s)</Heading>
                        <Flex>
                            {token.contracts.map((contract: string, index: number) => {
                                return <Box mb="20px" mr="10px"><Contract contract={contract} blockchain={token.chains[index]} /></Box>
                            })}
                        </Flex>

                    </div>

                    {token.totalSupply && token.totalSupply.length > 0 ?
                        <div className={styles["left"]} ref={refContract} id="contract">
                            <Heading fontSize="xl" fontWeight="600">Total Supply</Heading>
                            <Flex>
                                {token.totalSupply.map((contract: string, index: number) => {
                                    return <Box mb="20px" mr="10px"><Contract contract={contract} blockchain={token.chains[0]} /></Box>
                                })}
                            </Flex>
                        </div> : <></>
                    }

                    {token.excludedFromCirculation && token.excludedFromCirculation.length > 0 ?
                        <div className={styles["left"]} ref={refContract} id="contract">
                            <Heading fontSize="xl" fontWeight="600">Excluded from circulation</Heading>
                            <Flex>
                                {token.excludedFromCirculation.map((contract: string, index: number) => {
                                    return <Box mb="20px" mr="10px"><Contract contract={contract} blockchain={token.chains[0]} /></Box>
                                })}
                            </Flex>

                        </div> : <></>
                    }
                </Flex>

            </Flex>

            <Flex mt={["30px", "30px", "30px", "0px"]} p="20px"
                pr={["10px", "10px", "10px", "40px"]} pl={["10px", "10px", "10px", "40px"]} direction="column"
                h="350px" width={["100%", "100%", "100%", "500px"]}
                bg={["none", "none", "none", useColorModeValue("none", "dark_box_list")]}
                boxShadow={[shadow, shadow, shadow, useColorModeValue(shadow, "none")]}
                ml={["0px", "0px", "0px", "30px", "100px"]} rounded="xl">
                <Flex
                    marginTop="0px"
                    justifyContent={["space-between"]}
                    mr={["30px", "30px", "30px", "0px"]} ml={["30px", "30px", "30px", "0px"]} mb="20px"
                >
                    <Text fontWeight="600" fontSize="xl">Vote</Text>
                    <CountdownAny
                        date={getEndDate()} onComplete={() => complete.current = true}
                        renderer={(props) => <Text fontWeight="600" fontSize="1.5rem">{props.minutes}:{String(props.seconds).length > 1 ? props.seconds : '0' + props.seconds}</Text>}
                    />
                </Flex>

                <Vote name={'Utility'} score={utilityScore} updateScore={setUtilityScore} />
                <Vote name={'Social'} score={socialScore} updateScore={setSocialScore} />
                <Vote name={'Trust'} score={trustScore} updateScore={setTrustScore} />
                <Vote name={'Market'} score={marketScore} updateScore={setMarketScore} />

                <Flex mt="30px" justifyContent={["space-between"]} >
                    <Button bg="green" h="40px" width="49% !important" rounded="xl" onClick={() => voteToken(true, complete, token, utilityScore, socialScore, trustScore, marketScore)}>Validate</Button>
                    <Button bg={useColorModeValue("#E9E9E9", "white")} color="black" h="40px" width="49% !important" rounded="xl" onClick={() => voteToken(false, complete, token, utilityScore, socialScore, trustScore, marketScore)}>Reject</Button>
                </Flex>

            </Flex>
        </ Flex >
    )
}

export default DisplayedToken