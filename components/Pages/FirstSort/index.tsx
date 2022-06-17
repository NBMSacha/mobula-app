import React, { useEffect, useState } from "react";
import TokenDisplay from "../../Utils/Sort/TokenDisplay";
import { ethers } from "ethers";
import { PROTOCOL_ADDRESS, RPC_URL } from "../../../constants";
import { Heading, Text, Flex, Box, Image, Button, Link, useColorModeValue } from "@chakra-ui/react";
import DaoHeader from "../../Utils/DaoHeader";
import Blocks from '../../Utils/Sort/Blocks';
import { useAlert } from 'react-alert';
import Router from "next/router";

function FirstSort() {
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
    const [tokenArray, setTokenArray] = useState([]);
    const [displayedToken, setDisplayedToken] = useState(0);
    const alert = useAlert();

    function getFirstSorts() {
        console.log("Starting the first sort");
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

        const protocolContract = new ethers.Contract(
            PROTOCOL_ADDRESS,
            [
                {
                    "inputs": [],
                    "name": "getFirstSortTokens",
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
                'function firstSortVotes(address voter, uint256 tokenId) external view returns (bool)']
            , provider
        );

        protocolContract
            .getFirstSortTokens()
            .catch((err: any) => {
                console.log(err);
                return [];
            })
            .then(async (tokens: any) => {
                const newTokenDivs = [];

                var account: any;

                try {
                    const providerWallet = new ethers.providers.Web3Provider(
                        (window as any).ethereum
                    );
                    const accounts = await providerWallet.listAccounts();
                    account = accounts[0];
                } catch (e) { }

                let fails = 0;

                console.log("Tokens loaded : " + tokens.length);

                tokens.forEach(async (token: any) => {
                    var isAlreadyVoted = false;

                    if (account) {
                        isAlreadyVoted = await protocolContract.firstSortVotes(
                            account,
                            token.id
                        );
                        console.log("Is already voted : " + isAlreadyVoted);
                    }
                    console.log("Sumbitted data : " + token.ipfsHash);

                    console.log(token)

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

                        // const index = await protocolContract.indexOfFirstSortTokens(token.id);
                        // const fullToken = await protocolContract.firstSortTokens(index);

                        JSONrep.id = token.id;
                        JSONrep.contractAddresses = token.contractAddresses;
                        JSONrep.excludedFromCirculation = token.excludedFromCirculation;
                        JSONrep.totalSupply = token.totalSupply;
                        JSONrep.lastUpdate = token.lastUpdate;
                        JSONrep.alreadyVoted = isAlreadyVoted;

                        if (JSONrep.contracts) {
                            setTokenDivs((tokenDivs: any) => [...tokenDivs, JSONrep]);
                        } else {
                            console.log("Fail");
                            fails++;
                        }

                    } catch (e) {
                        console.log("Error with " + token + " : " + e);
                        fails++;
                    }
                });
            });
    }

    async function voteToken(validate: boolean,
        complete: any, token: any,
        utilityScore: number, socialScore: number,
        trustScore: number, marketScore: number) {

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

            try {
                await new ethers.Contract(
                    PROTOCOL_ADDRESS,
                    [
                        'function firstSortVote(uint256 tokenId, bool validate, uint256 utilityScore, uint256 socialScore, uint256 trustScore, uint256 marketScore) external',
                    ], signer
                ).firstSortVote(token.id, validate, utilityScore, socialScore, trustScore, marketScore);

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
        getFirstSorts();
    }, []);

    const bg = useColorModeValue("none", "#191D2C")
    const btn = useColorModeValue("none", "dark_primary")

    return <>
            <Flex direction="column" mb="50px" width="85%" align="center" justify="center" mx="auto" mt="28px">
                <Flex fontSize={['12px', '12px', '14px', '14px']}  w="100%" align="end" justify="space-between" maxWidth="1400px">
                    <Flex  direction="column">
                        <Heading  mb={'15px'}  fontSize={["18px","18px","18px","24px"]} fontFamily="Inter" >DAO First Sort</Heading>
                        <Text display={["none", "none", "none", "flex"]} whiteSpace="normal" fontSize={['12px', '12px', '14px', '14px']}>
                        See here the tokenss who got validated by the <span style={{color:"var(--chakra-colors-blue)", marginLeft:"5px", whiteSpace:"nowrap"}}>Mobula DAO</span>
                        </Text>
                    </Flex>
                    <Text display={["none", "none", "none", "flex"]}>
                          See here the lists token who got validated by the Mobula DAO
                    </Text>
                    
                </Flex>
                <Flex justify="space-evenly" wrap='wrap'>
                    {/* BOX */}
                        <Box mt="40px" w='45%' bg={bg} px="30px" py="20px" borderRadius="12px">
                            <Flex align="center" justify="space-between">
                                <Flex align="center">
                                    <Image src="/fullicon.png" w="38px" h="38px"/>
                                    <Text fontSize="25px" ml="10px">Mobula</Text>
                                </Flex>
                                <Text fontSize="16px" color="blue">New</Text>
                            </Flex>
                            <Text py="25px" fontSize="14px">Loremdffsihoi fh s efhsiuoe hiuosehgiousehio guheioghiog hiosehgoi sh ig iohophàpdez zgufshqioj iqozj djoipqdjzod uzqodlqzjio jhfl  jfoipjioehfoihse  jçàodjqzo dzni dfqzoijdopizqfhiehfoz efjpiojo gj op</Text>
                            <Button mb="10px" fontSize="15px" borderRadius="8px" bg={btn} py="7px" px="20px">Review and vote</Button>
                        </Box>
                    {/* END BOX */}
                     {/* BOX */}
                     <Box  mt="40px" w='45%' bg={bg} px="30px" py="20px" borderRadius="12px">
                            <Flex align="center" justify="space-between">
                                <Flex align="center">
                                    <Image src="/fullicon.png" w="38px" h="38px"/>
                                    <Text fontSize="25px" ml="10px">Mobula</Text>
                                </Flex>
                                <Text fontSize="16px" color="blue">New</Text>
                            </Flex>
                            <Text py="25px" fontSize="14px">Loremdffsihoi fh s efhsiuoe hiuosehgiousehio guheioghiog hiosehgoi sh ig iohophàpdez zgufshqioj iqozj djoipqdjzod uzqodlqzjio jhfl  jfoipjioehfoihse  jçàodjqzo dzni dfqzoijdopizqfhiehfoz efjpiojo gj op</Text>
                            <Button mb="10px" fontSize="15px" borderRadius="8px" bg={btn} py="7px" px="20px">Review and vote</Button>
                        </Box>
                    {/* END BOX */}
                     {/* BOX */}
                     <Box  mt="40px" w='45%' bg={bg} px="30px" py="20px" borderRadius="12px">
                            <Flex align="center" justify="space-between">
                                <Flex align="center">
                                    <Image src="/fullicon.png" w="38px" h="38px"/>
                                    <Text fontSize="25px" ml="10px">Mobula</Text>
                                </Flex>
                                <Text fontSize="16px" color="blue">New</Text>
                            </Flex>
                            <Text py="25px" fontSize="14px">Loremdffsihoi fh s efhsiuoe hiuosehgiousehio guheioghiog hiosehgoi sh ig iohophàpdez zgufshqioj iqozj djoipqdjzod uzqodlqzjio jhfl  jfoipjioehfoihse  jçàodjqzo dzni dfqzoijdopizqfhiehfoz efjpiojo gj op</Text>
                            <Button mb="10px" fontSize="15px" borderRadius="8px" bg={btn} py="7px" px="20px">Review and vote</Button>
                        </Box>
                    {/* END BOX */}
                      {/* BOX */}
                      <Box  mt="40px" w='45%' bg={bg} px="30px" py="20px" borderRadius="12px">
                            <Flex align="center" justify="space-between">
                                <Flex align="center">
                                    <Image src="/fullicon.png" w="38px" h="38px"/>
                                    <Text fontSize="25px" ml="10px">Mobula</Text>
                                </Flex>
                                <Text fontSize="16px" color="blue">New</Text>
                            </Flex>
                            <Text py="25px" fontSize="14px">Loremdffsihoi fh s efhsiuoe hiuosehgiousehio guheioghiog hiosehgoi sh ig iohophàpdez zgufshqioj iqozj djoipqdjzod uzqodlqzjio jhfl  jfoipjioehfoihse  jçàodjqzo dzni dfqzoijdopizqfhiehfoz efjpiojo gj op</Text>
                            <Button mb="10px" fontSize="15px" borderRadius="8px" bg={btn} py="7px" px="20px">Review and vote</Button>
                        </Box>
                    {/* END BOX */}
                    </Flex>
            </Flex>   
        {/* <DaoHeader
            title="First Sort"
            description="New listing requests are displayed here. Vote wisely."
            url="https://docs.mobula.finance/app/sort"
        />

        {tokenDivs.length == 0 && (
            <Text h="60vh" align="center" mt="80px">Oops... No token waiting for first sort yet. Submit one <Link color="blue" href="/list">here</Link>.</Text>
        )}

        {(displayedToken ?
            <TokenDisplay voteToken={voteToken} changeDisplay={setDisplayedToken} token={tokenDivs[tokenDivs.map(token => token.id).indexOf(displayedToken)]} /> :

            <Blocks tokenDivs={tokenDivs} setDisplayedToken={setDisplayedToken} />
        )} */}
    </>
}

export default FirstSort;
