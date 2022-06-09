
import { getBlockchainFromContract } from '../../../helpers/blockchain';
import { Flex, Image, Text, useColorModeValue, Button, Link, Radio } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { CheckCircle, Copy } from 'react-feather';
export default function ConnectWallet({ contract, blockchain }) {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (!blockchain) {
            getBlockchainFromContract(contract).then(r => {
                blockchain = r;
            })
        }
    }, [])
    const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_input)")
    const borderBox = useColorModeValue("#E5E5E5", "#282C3A")
    return (
        <Flex direction="column" align="center" w="420px"  position="fixed" zIndex="10" top="50%" left="50%" transform='translateX(-50%) translateY(-50%)' m="auto" borderRadius="20px" bg={borderBox}>
            <Flex align="center"  mt="20px" mb="20px" justify="space-between" w="88%">
                <Text>Connect Wallet</Text>
                <Button>X</Button>
            </Flex>
            <Flex align="center" h="60px" bg={bg} mb="10px" py="10px" px="20px" borderRadius="10px" w="88%" >
                <Radio></Radio>
                <Text fontSize="12px" ml="20px">I have read, understand, and agree to the <span style={{color:"blue"}}>Terms of Service.</span></Text>
            </Flex>
            <Button w="100%">
                <Flex align="center" h="60px" bg={bg} mb="10px" py="10px" px="20px" borderRadius="10px" w="88%">
                    <Image h="40px" src="/metamask.png" mr="15px"/>
                    <Text>Metamask</Text>
                </Flex>
            </Button>
            <Button w="100%">
                <Flex align="center" h="60px" bg={bg} mb="10px" py="10px" px="20px" borderRadius="10px" w="88%">
                    <Image h="40px" src="/bcw.png" mr="15px"/>
                    <Text>Binance Chain Wallet</Text>
                </Flex>
            </Button>
            <Button w="100%">
                <Flex align="center" h="60px" bg={bg} mb="10px" py="10px" px="20px" borderRadius="10px" w="88%">
                    <Image h="40px" src="/cw.png" mr="15px"/>
                    <Text>WalletConnect</Text>
                </Flex>
            </Button>
            <Button w="100%">
                <Flex align="center" h="60px" mb="30px" bg={bg} py="10px" px="20px" borderRadius="10px" w="88%">
                    <Image h="40px" src="/portis.png" mr="15px"/>
                    <Text>Portis</Text>
                </Flex>
            </Button>
        </Flex>
    )
}