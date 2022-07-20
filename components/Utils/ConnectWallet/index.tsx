
import { Flex, Image, Text, Button } from "@chakra-ui/react";
import React from "react"
import { useWeb3React } from "@web3-react/core"
import { CloseIcon } from "@chakra-ui/icons"
import { walletlink, bsc, injected, walletconnect, resetWalletConnector, trezor, ledger, portis } from "./Connector"

export default function ConnectWallet({ visible, setVisible }) {
    const web3reactContext = useWeb3React();
    async function connectMetaMask() {
        try {
            await web3reactContext.activate(injected)
            setVisible(false)
        } catch (err) {
        }
    }
    async function disconnect() {
        try {
            web3reactContext.deactivate()
        } catch (err) {
        }
    }
    const connectWC = async () => {
        try {
            resetWalletConnector(walletconnect);
            setVisible(false)
        } catch (err) {
        }
    }
    const connectCoinbase = async () => {
        try {
            await web3reactContext.activate(walletlink)
            setVisible(false)
        } catch (err) {
        }
    }
    const connectBinanceWallet = async () => {
        try {
            await web3reactContext.activate(bsc)
            setVisible(false)
        } catch (err) {
        }
    }
    const connectPortis = async () => {
        try {
            await web3reactContext.activate(portis)
            setVisible(false)
        } catch (err) {
        }
    }
    const connectLedger = async () => {
        try {
            await web3reactContext.activate(ledger)
            setVisible(false)
        } catch (err) {
        }
    }
    const connectTrezor = async () => {
        try {
            await web3reactContext.activate(trezor)
            setVisible(false)
        } catch (err) {
        }
    }

    return (
        <Flex boxShadow="1px 2px 13px 3px var(--widget-shadow)" display={visible ? "flex" : "none"} direction="column" align="center" w="420px" position="fixed" zIndex="10" bg="var(--background)" top="50%" left="50%" transform="translateX(-50%) translateY(-50%)" m="auto" borderRadius="20px">
            <Flex align="center" mt="20px" mb="20px" justify="space-between" w="88%">

                <Text>Connect Wallet</Text>
                <Button onClick={() => setVisible(false)}><CloseIcon /></Button>
            </Flex>
            <Button outline="none" _focus={{ boxShadow: "none" }} w="100%" onClick={connectMetaMask}>
                <Flex align="center" _hover={{ background: "var(--box_active)" }} boxShadow="1px 2px 13px 3px var(--shadow)" h="60px" bg="var(--connect-menu)" mb="10px" py="10px" px="20px" borderRadius="10px" w="88%" >
                    <Image h="40px" src="/metamask.png" mr="15px" />
                    <Text>Metamask</Text>
                </Flex>
            </Button>
            <Button w="100%" _focus={{ boxShadow: "none" }} onClick={connectWC}>
                <Flex align="center" h="60px" _hover={{ background: "var(--box_active)" }} boxShadow="1px 2px 13px 3px var(--shadow)" bg="var(--connect-menu)" mb="10px" py="10px" px="20px" borderRadius="10px" w="88%" >
                    <Image h="40px" src="/cw.png" mr="15px" />
                    <Text>WalletConnect</Text>
                </Flex>
            </Button>
            <Button w="100%" _focus={{ boxShadow: "none" }} onClick={connectPortis}>
                <Flex align="center" _hover={{ background: "var(--box_active)" }} boxShadow="1px 2px 13px 3px var(--shadow)" h="60px" mb="10px" bg="var(--connect-menu)" py="10px" px="20px" borderRadius="10px" w="88%">
                    <Image h="40px" src="/portis.png" mr="15px" />
                    <Text>Portis</Text>
                </Flex>
            </Button>
            <Button w="100%" _focus={{ boxShadow: "none" }} onClick={connectCoinbase} >
                <Flex align="center" h="60px" mb="10px" boxShadow="1px 2px 13px 3px var(--shadow)" _hover={{ background: "var(--box_active)" }} bg="var(--connect-menu)" py="10px" px="20px" borderRadius="10px" w="88%">
                    <Image h="40px" src="/coinbase.png" mr="15px" />
                    <Text>Coinbase </Text>
                </Flex>
            </Button>
            <Button w="100%" _focus={{ boxShadow: "none" }} onClick={connectTrezor} >
                <Flex align="center" h="60px" mb="30px" boxShadow="1px 2px 13px 3px var(--shadow)" _hover={{ background: "var(--box_active)", cursor: "pointer" }} bg="var(--connect-menu)" py="10px" px="20px" borderRadius="10px" w="88%">
                    <Image h="40px" borderRadius="full" src="/trezor.png" mr="15px" />
                    <Text>Trezor</Text>
                </Flex>
            </Button>
        </Flex>
    )
}