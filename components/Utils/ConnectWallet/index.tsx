
import { Flex, Image, Text, useColorModeValue, Button, Link, Radio } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { CheckCircle, Copy } from 'react-feather';
import { providers } from "ethers";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core"
import { supportedRPCs, RPC_URL } from "../../../constants"
import { InjectedConnector } from "@web3-react/injected-connector"
import { CloseIcon } from '@chakra-ui/icons'
import { walletlink, bsc, injected, walletconnect, resetWalletConnector, trezor, ledger, portis } from "./Connector"

export default function ConnectWallet({ close, setClose }) {
    const web3reactContext = useWeb3React();
    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const [accountAddress, setAccountAddress] = useState("")

    async function connectMetaMask() {
        try {
            await web3reactContext.activate(injected)
            setAccountAddress(web3reactContext.account)
            console.log(activate)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(accountAddress)

    async function disconnect() {
        try {
            web3reactContext.deactivate()
        } catch (err) {
            console.log(err)
        }
    }

    const connectWC = async () => {
        try {
            resetWalletConnector(walletconnect);
            await web3reactContext.activate(walletconnect)
            console.log(web3reactContext)
            setAccountAddress(web3reactContext.account)
        } catch (err) {
            console.log(err)
        }
    }

    const connectCoinbase = async () => {
        try {
            await web3reactContext.activate(walletlink)
            setAccountAddress(web3reactContext.account)
        } catch (err) {
            console.log(err)
        }
    }

    const connectBinanceWallet = async () => {
        try {
            await web3reactContext.activate(bsc)
            setAccountAddress(web3reactContext.account)
        } catch (err) {
            console.log(err)
        }
    }

    const connectPortis = async () => {
        try {
            await web3reactContext.activate(portis)
            setAccountAddress(web3reactContext.account)
        } catch (err) {
            console.log(err)
        }
    }

    const connectLedger = async () => {
        try {
            await web3reactContext.activate(ledger)
            setAccountAddress(web3reactContext.account)
        } catch (err) {
            console.log(err)
        }
    }

    const connectTrezor = async () => {
        try {
            await web3reactContext.activate(trezor)
            setAccountAddress(web3reactContext.account)
            console.log(web3reactContext)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Flex boxShadow='1px 2px 13px 3px var(--widget-shadow)' display={close ? "none" : "flex"} direction="column" align="center" w="420px" position="fixed" zIndex="10" bg="var(--background)" top="50%" left="50%" transform='translateX(-50%) translateY(-50%)' m="auto" borderRadius="20px">
            <Flex  align="center" mt="20px" mb="20px" justify="space-between"  w="88%">
                <Text>Connect Wallet</Text>
                <Button onClick={() => setClose(true)}><CloseIcon /></Button>
            </Flex>
            <Flex align="center" h="60px" bg="var(--connect-menu)" mb="10px" boxShadow='1px 2px 13px 3px var(--shadow)' py="10px" px="20px" borderRadius="10px" w="88%" >
                <Radio bg="var(--blue)" ></Radio>
                <Text fontSize="12px" ml="20px">I have read, understand, and agree to the <span style={{ color: "#5C7DF9" }}>Terms of Service.</span></Text>
            </Flex>
            <Button  outline="none" _focus={{ boxShadow: "none" }} w="100%" onClick={connectMetaMask}>
                <Flex align="center" _hover={{ background: "var(--box_active)" }} boxShadow='1px 2px 13px 3px var(--shadow)' h="60px" bg="var(--connect-menu)" mb="10px" py="10px" px="20px" borderRadius="10px" w="88%" >
                    <Image h="40px" src="/metamask.png" mr="15px" />
                    <Text>Metamask</Text>
                </Flex>
            </Button>
            {/* <Button w="100%" _focus={{boxShadow:"none"}} onClick={connectBinanceWallet}>
                <Flex align="center" h="60px" _hover={{background: "grey"}} bg={btn} mb="10px" py="10px" px="20px" borderRadius="10px" w="88%">
                    <Image h="40px" src="/bcw.png" mr="15px"/>
                    <Text>Binance Chain Wallet</Text>
                </Flex>
            </Button> */}
            <Button w="100%" _focus={{ boxShadow: "none" }} onClick={connectWC}>
                <Flex align="center" h="60px" _hover={{ background: "var(--box_active)" }} boxShadow='1px 2px 13px 3px var(--shadow)' bg="var(--connect-menu)" mb="10px" py="10px" px="20px" borderRadius="10px" w="88%" >
                    <Image h="40px" src="/cw.png" mr="15px" />
                    <Text>WalletConnect</Text>
                </Flex>
            </Button>
            <Button w="100%" _focus={{ boxShadow: "none" }} onClick={connectPortis}>
                <Flex align="center" _hover={{ background: "var(--box_active)" }} boxShadow='1px 2px 13px 3px var(--shadow)' h="60px" mb="10px" bg="var(--connect-menu)" py="10px" px="20px" borderRadius="10px" w="88%">
                    <Image h="40px" src="/portis.png" mr="15px" />
                    <Text>Portis</Text>
                </Flex>
            </Button>
            <Button w="100%" _focus={{ boxShadow: "none" }} onClick={connectCoinbase} >
                <Flex align="center" h="60px" mb="10px" boxShadow='1px 2px 13px 3px var(--shadow)' _hover={{ background: "var(--box_active)" }} bg="var(--connect-menu)" py="10px" px="20px" borderRadius="10px" w="88%">
                    <Image h="40px" src="/coinbase.png" mr="15px" />
                    <Text>Coinbase </Text>
                </Flex>
            </Button>
            <Button w="100%" _focus={{ boxShadow: "none" }} onClick={connectTrezor} >
                <Flex align="center" h="60px" mb="30px" boxShadow='1px 2px 13px 3px var(--shadow)' _hover={{ background: "var(--box_active)", cursor: "pointer"}} bg="var(--connect-menu)" py="10px" px="20px" borderRadius="10px" w="88%">
                    <Image h="40px" borderRadius="full" src="/trezor.png" mr="15px" />
                    <Text>Trezor</Text>
                </Flex>
            </Button>
            {/* <Button w="100%" onClick={connectLedger} >
                <Flex align="center" h="60px" mb="30px" _hover={{background: "grey"}} bg={bg} py="10px" px="20px" borderRadius="10px" w="88%">
                    <Image h="40px" src="/coinbase.png" mr="15px"/>
                    <Text>Coinbase </Text>
                </Flex>
            </Button> */}
        </Flex>
    )
}