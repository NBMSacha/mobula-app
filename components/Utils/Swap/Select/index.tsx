
import { Flex, Box, Image, Text, useColorModeValue, Button, Link, Radio, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { CheckCircle, Copy } from 'react-feather';
import { providers } from "ethers";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import { CloseIcon } from '@chakra-ui/icons'
import { defaultTokens, getBlockchainFromId, getIdFromBlockchain, supportedRPCs } from '../../../../constants';
import { createClient } from '@supabase/supabase-js';

export default function Select({ visible, setVisible, selectToken, oldToken }) {
    const web3React = useWeb3React();
    const { active, account, chainId, library, connector, activate, deactivate } = useWeb3React();
    const [token, setToken] = useState('');
    const [results, setResults]: [any, any] = useState()

    const supabase = createClient(
        'https://ylcxvfbmqzwinymcjlnx.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
    )

    async function updateSearch(search: string, supabase: any, setResults: any) {

        if (ethers.utils.isAddress(search)) {
            const RPC = supportedRPCs.filter(entry => {
                return entry.name == getBlockchainFromId[web3React.chainId];
            })[0];
            const provider = new ethers.providers.JsonRpcProvider(RPC);

            try {
                const contract = new ethers.Contract(search, [
                    'function symbol() public view returns (string)',
                    'function decimals() public view returns (uint256)'], provider)

                const decimals = (await contract.decimals()).toNumber()
                const symbol = await contract.symbol()
                setResults([{ symbol, logo: '/unknown.png', address: search, decimals }])

            } catch (e) { }
        } else {
            let { data: names } = await supabase
                .from('assets')
                .select('name,rank,symbol,logo,market_cap,contracts,blockchains')
                .or('name.ilike.' + search + '%,symbol.ilike.' + search + '%,name.ilike.' + search,)
                .order('market_cap', { ascending: false })
                .limit(5)

            if (names && names.length > 0) {
                names = names.map(name => {
                    const address = name.contracts[name.blockchains.indexOf(name.blockchains.filter((blockchain: string) => getIdFromBlockchain[blockchain] == chainId)?.[0])]

                    if (address) {
                        console.log(address)
                        return {
                            ...name,
                            address
                        }
                    }

                })

                console.log(names)
                setResults(names)
            }
        }

    }

    useEffect(() => {
        updateSearch(token, supabase, setResults)
    }, [token])

    return (
        <Flex color='var(--text-primary)' boxShadow='1px 2px 13px 3px var(--widget-shadow)' display={visible ? "flex" : "none"} direction="column" align="center" w="90%" maxWidth="420px" position="fixed" zIndex="10" bg="var(--background)" top="50%" left="50%" transform='translateX(-50%) translateY(-50%)' m="auto" borderRadius="20px">
            <Flex align="center" mt="20px" mb="20px" justify="space-between" w="88%">
                <Text fontSize="large">Select a token</Text>
                <Button onClick={() => setVisible(false)}><CloseIcon /></Button>
            </Flex>
            <Input border="2px solid var(--box_border)" w="90%" p="20px" placeholder="Search a token name or address" fontSize='16px'
                _placeholder={{ color: "var(--text-primary)" }}
                onChange={(e) => setToken(e.target.value)}
            />
            <Flex flexWrap="wrap" p="20px" ml="auto" mr="auto">
                {defaultTokens[chainId]?.map((token: any) => {
                    return <Flex onClick={() => {
                        if (oldToken?.address != token.address) {
                            selectToken(token)
                            setVisible(false)
                        }
                    }} cursor={oldToken?.address == token.address ? "not-allowed" : "pointer"} _hover={{ opacity: "0.8" }} p="5px 10px" mr="10px" mb="10px" borderRadius="15px" border="2px solid var(--box_border)" align="center" justify="space-between">{token.symbol} <Image ml="5px" src={token.logo} h="20px"></Image></Flex>
                })}
            </Flex>
            <Box w='100%' h="1px" bg="var(--box_border)" mb="10px" />
            <Flex p="20px" direction="column" w="100%" overflowY="scroll" h="60%" maxHeight='500px'>
                {results?.map((token: any) => {

                    if (token) {
                        return <Flex onClick={async () => {
                            if (oldToken?.address != token.address) {

                                if (token.address) {
                                    const RPC = supportedRPCs.filter(entry => {
                                        return entry.name == getBlockchainFromId[web3React.chainId];
                                    })[0];
                                    const provider = new ethers.providers.JsonRpcProvider(RPC);
                                    const contract = new ethers.Contract(token.address, [
                                        'function symbol() public view returns (string)',
                                        'function decimals() public view returns (uint256)'], provider)

                                    const decimals = (await contract.decimals()).toNumber()
                                    token.decimals = decimals;
                                } else {
                                    token.decimals = 18
                                }

                                selectToken(token)
                                setVisible(false)
                            }
                        }} cursor={oldToken?.address == token.address ? "not-allowed" : "pointer"} _hover={{ opacity: "0.8" }}
                            w="100%" mr="10px" mb="30px" borderRadius="15px" align="center" justify="left">
                            <Image borderRadius="50%" mr="10px" src={token.logo} h="20px"></Image> {token.symbol} <Text ml="10px" color="grey">{token.address ? '(' + token.address.slice(0, 4) + '..' + token.address.slice(token.address.length - 4, token.address.length) + ')' : ''}</Text>
                        </Flex>
                    }
                })}
            </Flex>
        </Flex>
    )
}
