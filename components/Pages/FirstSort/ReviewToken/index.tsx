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
import { TimeIcon, CopyIcon } from "@chakra-ui/icons"
import styles from "../FirstSort.module.scss"
import Vote from "./Vote"
import Contract from "./Contract"
import MobileContract from "./MobileContract"
import Countdown from 'react-countdown';

function ReviewToken({bg, btn, border, token, changeDisplay, voteToken}) {

    const CountdownAny = Countdown as any;
    const alert = useAlert();
    const [active, setActive] = useState(false);
    const [utilityScore, setUtilityScore] = useState(0);
    const [socialScore, setSocialScore] = useState(0);
    const [trustScore, setTrustScore] = useState(0);
    const [marketScore, setMarketScore] = useState(0);

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
            <Flex className={styles["container"]} direction="column" m="auto" justify="center" mt="28px">
                <Flex justify="center" direction={["column","column","column","row"]} mb="10px">
                    {/* COIN INFO */}
                    <Flex w={["100%","100%","100%","60%"]} direction="column" bg={bg} boxShadow={`1px 2px 12px 3px ${shadow}`} borderRadius="12px"> 
                        <Flex w="100%"  justify="space-between" borderBottom={["none","none",`1px solid ${border}`,`1px solid ${border}`]} py={["15px","15px","30px","30px"]} px={["25px","25px","40px","40px"]}>
                            <Flex align="center">
                                <Flex align="center" >
                                    <Image mr="15px" src={token.logo} h={["30px","30px","39px","39px"]} w={["30px","30px","39px","39px"]} />
                                    <Text fontSize={["15px","15px","30px","30px"]}>{token.name}</Text>
                                </Flex>
                            </Flex>
                            <Flex align="center">
                                <Flex align="center" px="10px">
                                {token.website && (
                                    <Link href={token.website} target="_blank">
                                        <Icon mr={["0px","0px","0px","0px"]} fontSize={["15px","15px","25px","25px"]} mt="5px" as={Globe} />
                                    </Link>
                                )}
                                {token.twitter && (
                                    <Link href={token.twitter} target="_blank">
                                        <Image ml="10px" mr="10px" h={["20px","20px","32px","32px"]} src="/new-twitter.png"/>
                                    </Link>
                                )}
                                {token.discord && (
                                    <Link href={token.discord} target="_blank">
                                        <Image mr="10px" h={["18px","18px","30px","30px"]} w={["18px","18px","30px","30px"]} src="/new-discord.png"/>
                                    </Link>
                                )}
                                {token.chat && (
                                    <Link href={token.chat} target="_blank">
                                        <Image h={["16px","16px","23px","23px"]} w={["16px","16px","23px","23px"]} src="/new-tlg.png"/>
                                    </Link>
                                )}
                                </Flex>
                            </Flex>
                            <Flex align="center" display={["none","none","flex","flex"]}>
                                <Flex align="center" px="10px">
                                    {token.kyc && (
                                        <Link href={token.kyc} target="_blank" _hover={{textDecoration:"none"}}>
                                            <Button variant="primary" mr="15px" borderRadius="8px" py="5px" w="90px" bg={btn}>KYC</Button>
                                        </Link>
                                    )}
                                    {token.audit && (
                                        <Link href={token.audit} target="_blank" _hover={{textDecoration:"none"}}>
                                            <Button variant="primary" borderRadius="8px" py="5px" w="90px" bg={btn}>Audit</Button>
                                        </Link>
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex align="center" display={["flex","flex","none","none"]}>
                                <Flex fontSize="11px" align="center" justify="space-between" px="10px" w="90%" mx="auto" mt="5px">
                                    <Button variant="primary" mr="15px" borderRadius="8px" py="5px" w="80px" bg={btn}>KYC</Button>
                                    <Button variant="primary" mr="15px" borderRadius="8px" py="5px" w="80px" bg={btn}>Audit</Button>
                                    <Button variant="primary" borderRadius="8px" py="5px" w="80px" bg={btn}>Telegram</Button>
                                </Flex>
                            </Flex>
                        <Flex w="100%" p={["15px 25px","15px 25px","40px","40px"]}>
                            <Text width="fit-content" fontSize={["10px","10px","15px","15px"]} whiteSpace="prewrap">{token.description}</Text>
                        </Flex>
                        {/* MOBILE CONTRACTS */}
                        <MobileContract token={token} bg={bg} btn={btn} border={border} shadow={shadow}/>
                    </Flex>
                    {/* Vote*/}
                    <Vote voteToken={voteToken} token={token} updateScoreUtility={setUtilityScore} updateScoreMarket={setMarketScore} updateScoreTrust={setTrustScore} updateScoreSocial={setSocialScore} marketScore={marketScore} utilityScore={utilityScore} trustScore={trustScore} socialScore={socialScore}  token={token} bg={bg} btn={btn} border={border} shadow={shadow}/>
                </Flex>
                {/* Contract */}
                <Contract token={token} bg={bg} btn={btn} border={border} shadow={shadow}/>
            </Flex>
        )
}

export default ReviewToken; 