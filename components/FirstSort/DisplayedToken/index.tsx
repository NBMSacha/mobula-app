import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Chart, ChartType, registerables } from 'chart.js';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ArrowUp, ArrowDown } from 'react-feather';
import styles from './DisplayedToken.module.scss';
import { Heading, Text, Flex, Box, Image, Spacer, ButtonGroup, Button } from "@chakra-ui/react";
import { PROTOCOL_ADDRESS, supportedRPCs } from '../../../constants';
import {
    formatAmount,
    getTokenPrice,
    getTokenPercentage,
    formatName
} from '../../../helpers/formaters';
import Countdown from 'react-countdown';
import { setTimeout } from 'timers'
import { Send, Twitter, Globe } from "react-feather";
import Vote from './Vote';
import { useAlert } from 'react-alert';
import { ethers } from 'ethers';

const DisplayedToken = ({ token, changeDisplay }) => {

    console.log(token)
    const alert = useAlert();
    const [active, setActive] = useState(false);
    const refDescription = useRef(null);
    const refContract = useRef(null)
    const [utilityScore, setUtilityScore] = useState(0);
    const [socialScore, setSocialScore] = useState(0);
    const [trustScore, setTrustScore] = useState(0);
    const [marketScore, setMarketScore] = useState(0);
    const complete = useRef(false);

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

    async function voteToken(validate: boolean) {

        console.log(validate)
        if (!complete.current) {
            alert.error('You must wait the end of the countdown to vote.')
        } else {
            try {
                var provider = new ethers.providers.Web3Provider((window as any).ethereum)
                var signer = provider.getSigner();
            } catch (e) {
                console.log(e)
                alert.error('You must connect your wallet to submit the form.')
            }

            console.log('here')
            try {

                console.log('here1')

                await new ethers.Contract(
                    PROTOCOL_ADDRESS,
                    [
                        'function firstSortVote(uint256 tokenId, bool validate, uint256 utilityScore, uint256 socialScore, uint256 trustScore, uint256 marketScore) external',
                    ], signer
                ).firstSortVote(token.id, true, utilityScore, socialScore, trustScore, marketScore);

                console.log('here2')

                changeDisplay(0);

            } catch (e) {
                if (e.data && e.data.message) {
                    alert.error(e.data.message);
                } else {
                    alert.error('Something went wrong.')
                }
            }

            // if (token.isFirstSort) {

            // } else {
            //     try {
            //         await new ethers.Contract(
            //             PROTOCOL_ADDRESS,
            //             [
            //                 'function finalDecisionVote(address token, bool validate) external',
            //             ], signer
            //         ).finalDecisionVote(token.contract, true);
            //         setVoted(true)

            //     } catch (e) {
            //         if (e.data && e.data.message) {
            //             alert.error(e.data.message);
            //         } else {
            //             alert.error('Something went wrong.')
            //         }
            //     }
            // }
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
        <div className={styles["main-container"]}>
            <div className={styles["left"]}>
                <div className={styles["left"]}>
                    <div className={token.kyc == null && token.audit == null ? styles["left-top-box-center"] : styles["left-top-box"]}>
                        <Flex mr={20}>
                            <Image width='50px' src={token.logo} mr={20}></Image>
                            <div className={styles["name"]}>{token.name}</div>
                        </Flex>
                        <div className={styles["social-links"]}>
                            <a href={token.website}><Globe className={styles["icons"]} /></a>
                            <a href={token.twitter}><Twitter className={styles["icons"]} /></a>
                            <a href={token.chat}><Send className={styles["icons"]} /></a>
                        </div>

                        <div className={styles["audit-links"]}>
                            {token.kyc ? (
                                <button className={styles["kyc"]} onClick={() => document.location.href = token.kyc}>KYC</button>
                            ) : <></>}
                            {token.audit ? (
                                <button className={styles["audit"]} onClick={() => document.location.href = token.audit}>Audit</button>
                            ) : <></>}
                        </div>
                    </div>
                    <div className={styles["left-top-box"]}>
                        <p className={styles["description"]} id="description" ref={refDescription}>{formatName(token.description, 700)}
                        </p>

                    </div>
                    {token.description && token.description.length > 700 ? <button className={styles["more"]}
                        onClick={() => {
                            seeMore()
                            if (active) {
                                setActive(false);
                                refDescription.current.innerText = formatName(token.description, 700);
                            }
                        }
                        }>
                        {active ? (<span>Less</span>) : (<span>More</span>)}
                    </button>
                        : <></>}
                </div>

                <Spacer />
                <div className={styles["left"]} ref={refContract} id="contract">
                    <h2 className={styles["contract-title"]} >Contract(s)</h2>
                    {token.contracts.map((contract: string, index: number) => {
                        return <a className={styles["contract-address"]} href={getExplorer(token.chains[index]) + '/token/' + token.contracts[index]}>
                            {contract}
                        </a>
                    })}
                </div>

                {token.totalSupply && token.totalSupply.length > 0 ?
                    <div className={styles["left"]} ref={refContract} id="contract">
                        <h2 className={styles["contract-title"]} >Total Supply</h2>
                        {token.totalSupply.map((contract: string, index: number) => {
                            return <a className={styles["contract-address"]} href={getExplorer(token.chains[index] + '/token/' + token.totalSupply[index])}>
                                {contract}
                            </a>
                        })}
                    </div> : <></>
                }

                {token.excludedFromCirculation && token.excludedFromCirculation.length > 0 ?
                    <div className={styles["left"]} ref={refContract} id="contract">
                        <h2 className={styles["contract-title"]} >Excluded from circulation(s)</h2>
                        {token.excludedFromCirculation.map((contract: string, index: number) => {
                            return <a className={styles["contract-address"]} href={getExplorer(token.chains[0]) + '/address/' + token.excludedFromCirculation[index]}>
                                {contract}
                            </a>
                        })}
                    </div> : <></>
                }
            </div>
            <div className={styles["right"]}>
                <div className={styles["vote-box"]}>
                    <Flex
                        marginTop="0px"
                        justifyContent={["space-between"]}
                        flexDir={["column", "column", "column", "row"]}
                        alignItems={["center", "center", "center", "stretch"]}
                        flexWrap="wrap"
                    >
                        <Text mt="10px" ml="15px" fontWeight="600" fontSize="1.8rem">Vote</Text>
                        <Countdown
                            date={getEndDate()} onComplete={() => complete.current = true}
                            renderer={(props) => <Text mt="15px" mr="15px" fontWeight="600" fontSize="1.5rem">{props.minutes}:{String(props.seconds).length > 1 ? props.seconds : '0' + props.seconds}</Text>}></Countdown>
                    </Flex>

                    <Vote name={'Utility'} score={utilityScore} updateScore={setUtilityScore} />
                    <Vote name={'Social'} score={socialScore} updateScore={setSocialScore} />
                    <Vote name={'Trust'} score={trustScore} updateScore={setTrustScore} />
                    <Vote name={'Market'} score={marketScore} updateScore={setMarketScore} />

                    <Flex mr="10px" ml="10px" mt="20px" justifyContent={["space-around"]} >
                        <Button width="40% !important" className="button" onClick={() => voteToken(false)}>Reject</Button>
                        <Button width="40% !important" className="button" onClick={() => voteToken(true)}>Validate</Button>
                    </Flex>

                </div>
            </div >
        </div >
    )
}

export default DisplayedToken