import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { PROTOCOL_ADDRESS } from "../../../constants";
import { Heading, Text, Flex, Link } from "@chakra-ui/react";
import TokenDisplay from "../../Utils/newSort/ReviewToken";
import Blocks from "../../Utils/newSort/Main";
import { useAlert } from 'react-alert';
import Router from "next/router";
import { useWeb3React } from '@web3-react/core';

function FinalValidation() {
    const [tokenDivs, setTokenDivs]: [{
        name: string;
        symbol: string;
        contracts: string[];
        chains: string[];
        logo: string;
        description: string;
        audit: string;
        kyc: string;
        twitter: string;
        chat: string;
        website: string;
        id: number
        contractAddresses: string[]
        excludedFromCirculation: string[]
        totalSupply: string[]
        alreadyVoted: boolean
    }[], any] = useState([]);
    const [displayedToken, setDisplayedToken] = useState(0);
    const alert = useAlert();
    const web3React = useWeb3React()
    const { account } = useWeb3React()
    const [ votes, setVotes] = useState([])

    function getFinalValidation() {
        const provider = new ethers.providers.Web3Provider(web3React.library.provider);

        const protocolContract = new ethers.Contract(
            PROTOCOL_ADDRESS,
            [
                {
                    "inputs": [],
                    "name": "getFinalValidationTokens",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "ipfsHash",
                                    "type": "string"
                                },
                                {
                                    "internalType": "address[]",
                                    "name": "contractAddresses",
                                    "type": "address[]"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "id",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "address[]",
                                    "name": "totalSupply",
                                    "type": "address[]"
                                },
                                {
                                    "internalType": "address[]",
                                    "name": "excludedFromCirculation",
                                    "type": "address[]"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "lastUpdate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "utilityScore",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "socialScore",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "trustScore",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "marketScore",
                                    "type": "uint256"
                                }],
                            "internalType": "struct API.Token[]",
                            "name": "",
                            "type": "tuple[]"
                        }],
                    "stateMutability": "view",
                    "type": "function"
                },
                'function finalDecisionVotes(address voter, uint256 tokenId) external view returns (bool)']
            , provider
        );

        protocolContract
            .getFinalValidationTokens()
            .catch((err: any) => {
                return [];
            })
            .then(async (tokens: any) => {
                const newTokenDivs = [];
                let fails = 0;
                tokens.forEach(async (token: any) => {
                    var isAlreadyVoted = false;

                    if (account) {
                        isAlreadyVoted = await protocolContract.finalDecisionVotes(
                            account,
                            token.id
                        );
                    }
                    try {
                        const response = await fetch(
                            "https://gateway.ipfs.io/ipfs/" + token.ipfsHash
                        );

                        const JSONrep: {
                            name: string;
                            symbol: string;
                            contracts: string[];
                            chains: string[];
                            logo: string;
                            description: string;
                            audit: string;
                            kyc: string;
                            twitter: string;
                            chat: string;
                            website: string;
                            id: number
                            contractAddresses: string[]
                            excludedFromCirculation: string[]
                            totalSupply: string[]
                            lastUpdate: number
                            alreadyVoted: boolean
                        } = await response.json();

                        JSONrep.id = token.id;
                        JSONrep.contractAddresses = token.contractAddresses;
                        JSONrep.excludedFromCirculation = token.excludedFromCirculation;
                        JSONrep.totalSupply = token.totalSupply;
                        JSONrep.lastUpdate = token.lastUpdate;
                        JSONrep.alreadyVoted = isAlreadyVoted;

                        if (JSONrep.contracts) {
                            setTokenDivs((tokenDivs: any) => [...tokenDivs, JSONrep]);
                        } else {
                            fails++;
                        }

                        if (newTokenDivs.length + fails === tokens.length) {
                            //setTokenDivs(newTokenDivs)
                        } else {

                        }
                    } catch (e) {
                        fails++;
                    }
                });
            });
    }

    async function voteToken(validate: boolean,
        complete: any, token: any,
        utilityScore: number, socialScore: number,
        trustScore: number, marketScore: number) {
        if (!complete.current) {
            alert.error('You must wait the end of the countdown to vote.')
        } else {
            try {
                var provider = new ethers.providers.Web3Provider((window as any).ethereum)
                var signer = provider.getSigner();
            } catch (e) {
                alert.error('You must connect your wallet to submit the form.')
            }

            try {

                await new ethers.Contract(
                    PROTOCOL_ADDRESS,
                    [
                        'function finalDecisionVote(uint256 tokenId, bool validate, uint256 utilityScore, uint256 socialScore, uint256 trustScore, uint256 marketScore) external',
                    ], signer
                ).finalDecisionVote(token.id, validate, utilityScore, socialScore, trustScore, marketScore);
                localStorage.setItem("votesFinal", JSON.stringify([...votes,  Number(token.id)]))
                setVotes([...votes,  Number(token.id)])
                alert.success('Your vote has been successfully registered.')
                await new Promise((resolve, reject) => setTimeout(resolve, 3000))
                Router.reload()

            } catch (e) {
                if (e.data && e.data.message) {
                    alert.error(e.data.message);
                } else {
                    alert.error('Something went wrong.')
                }
            }
        }
    }
    useEffect(() => {
        if (web3React.account) {
          getFinalValidation()
        } else {
          const timeout = setTimeout(() => {
            alert.show('You must connect your wallet to earn MOBL.')
          }, 300)
          return () => {
            clearTimeout(timeout)
          }
        }
      }, [web3React])


    useEffect(() => {
        setVotes(JSON.parse(localStorage.getItem("votesFinal")) || [])
    }, [])

    

    return <>
        <Flex mx="auto" fontSize={['12px', '12px', '14px', '14px']} w="85%" align="end" justify="space-between" mt="28px" maxWidth="1400px">
            <Flex direction="column">
                <Heading mb={'15px'} fontSize={["18px", "18px", "18px", "24px"]} fontFamily="Inter" >DAO Final Validation</Heading>
                <Text display={["none", "none", "none", "flex"]} whiteSpace="normal" fontSize={['12px', '12px', '14px', '14px']}>
                    The First Sort is the first step of validation for tokens wanting to be listed on Mobula.
                </Text>
            </Flex>
            <Text display={["none", "none", "none", "flex"]}>
                Learn more <a href="https://docs.mobula.finance/app/sort"><span style={{ color: "var(--chakra-colors-blue)", marginLeft: "5px", whiteSpace: "nowrap" }}>here</span></a>.
            </Text>
        </Flex>
        {tokenDivs.length === 0  && (
            <Text h="60vh" align="center" mt="80px">Oops... No token waiting for final validation yet. Submit one <Link color="blue" href="/list">here</Link>.</Text>
        )}

        {(displayedToken ?
            <TokenDisplay voteToken={voteToken} changeDisplay={setDisplayedToken} token={tokenDivs[tokenDivs.map(token => token.id).indexOf(displayedToken)]} /> :
            // @ts-ignore
            <Blocks votes={votes} tokenDivs={tokenDivs} setDisplayedToken={setDisplayedToken}/>
        )}
    </>;
}

export default FinalValidation;
