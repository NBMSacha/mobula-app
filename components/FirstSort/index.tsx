import React, { useEffect, useState } from "react";
import DisplayedToken from "./DisplayedToken";
import { ethers } from "ethers";
import { PROTOCOL_ADDRESS, RPC_URL } from "../../constants";
import { Heading, Text, Flex, Box, Image } from "@chakra-ui/react";
import styles from "./FirstSort.module.scss";

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
    }[], any] = useState([]);
    const [tokenArray, setTokenArray] = useState([]);
    const [displayedToken, setDisplayedToken] = useState(0);

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
                        } = await response.json();

                        // const index = await protocolContract.indexOfFirstSortTokens(token.id);
                        // const fullToken = await protocolContract.firstSortTokens(index);

                        JSONrep.id = token.id;
                        JSONrep.contractAddresses = token.contractAddresses;
                        JSONrep.excludedFromCirculation = token.excludedFromCirculation;
                        JSONrep.totalSupply = token.totalSupply;
                        JSONrep.lastUpdate = token.lastUpdate;

                        if (JSONrep.contracts) {
                            setTokenDivs((tokenDivs: any) => [...tokenDivs, JSONrep]);
                        } else {
                            console.log("Fail");
                            fails++;
                        }

                        if (newTokenDivs.length + fails == tokens.length) {
                            //setTokenDivs(newTokenDivs)
                        } else {
                            console.log("Not done yet.");
                        }
                    } catch (e) {
                        console.log("Error with " + token + " : " + e);
                        fails++;
                    }
                });
            });
    }

    useEffect(() => {
        getFirstSorts();
    }, []);

    useEffect(() => {
        console.log("Effect : " + tokenDivs.length);
    });

    return <div className="listing">
        <div className="container">
            <header>
                <Heading as="h1" mb={"20px"}>
                    First Sort
                </Heading>
                <Text fontSize={["14px", "14px", "16px", "17px"]}>
                    The First Sort is a key step of the Protocol. Vote wisely.
                    <a
                        className={styles.link}
                        href="https://docs.mobula.finance/app/sort"
                    >
                        Learn more here
                    </a>
                </Text>
            </header>

            <div className={styles.line}></div>

            {(displayedToken ?
                <DisplayedToken changeDisplay={setDisplayedToken} token={tokenDivs[tokenDivs.map(token => token.id).indexOf(displayedToken)]} /> :

                <Flex
                    paddingTop="60px"
                    justifyContent={["center"]}
                    flexDir={["column", "column", "column", "row"]}
                    alignItems={["center", "center", "center", "stretch"]}
                    flexWrap="wrap"
                >
                    {tokenDivs.map((token) => {

                        return (
                            <Box
                                w={["90%", "90%", "70%", "80%"]}
                                bg="#a3d4f433"
                                mb={20}
                                mr={10}
                                ml={10}
                                borderRadius="10px"
                                p="20px"
                                className={styles['token-box']}
                            >
                                <Flex alignItems="center" mb={10}>
                                    <Image src={token.logo} h={50} w={50} mr={5} />
                                    <Text fontSize={["17px", "18px", "25px", "30px"]}>
                                        {token.name}
                                    </Text>
                                </Flex>
                                <Text
                                    textAlign="justify"
                                    fontSize={["13px", "15px", "15px", "20px"]}
                                >
                                    {token.description}
                                </Text>

                                <button className={styles["button"]} onClick={() => setDisplayedToken(token.id)}>Vote</button>
                            </Box>
                        );
                    })}
                </Flex>)}
            {/* 
        <div className="tokens-div">{tokenDivs}</div> */}
        </div>
    </div>;
}

export default FirstSort;
