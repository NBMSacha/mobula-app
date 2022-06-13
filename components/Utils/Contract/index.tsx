
import { getBlockchainFromContract } from '../../../helpers/blockchain';
import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { CheckCircle, Copy } from 'react-feather';
import { supportedRPCs } from '../../../constants';
export default function Contract({ contract, blockchain }: { contract: string, blockchain: string }) {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (!blockchain) {
            getBlockchainFromContract(contract).then((r: any) => {
                blockchain = r;
            })
        }
    }, [])
    const bg = useColorModeValue("rgba(208, 214, 227, 0.3)", "none")
    const contracts = useColorModeValue("bg_white", "none")
    return (
        <Flex
            align="center"
            position="relative"
            justify="left"
            minWidth="165px"
            bg={contracts}
            mt='12px'
            h="30px"
            p="0px 10px"
            boxShadow={useColorModeValue('0px 1px 6px 1px #d0d6e3', '0px 1px 12px 3px rgba(0,0,0,0.2)')}
            borderRadius='10px'
            onClick={() => {
                window.open(supportedRPCs[supportedRPCs.map(r => r.name).indexOf(blockchain)].explorer + '/token/' + contract)
            }}
        >
            {blockchain ? <Image width={'17px'} borderRadius="50%" height={'17px'} src={"/" + blockchain.split(' ')[0].toLowerCase() + '.png'} ml="5px" /> : <></>
            }
            <Text ml="10px" py={5} fontSize={'0.8rem'} textAlign="center">{contract.slice(0, 6) + '...' + contract.slice(contract.length - 4, contract.length)}</Text>
            {
                copied ? <CheckCircle width='17px' color='#32C784' style={{ "position": "absolute", "right": "10px" }} /> : <Copy width={'15px'} cursor="pointer" style={{ "position": "absolute", "right": "10px" }} onClick={() => {
                    setCopied(true);
                    navigator.clipboard.writeText(contract)
                }} />
            }
        </Flex >
    )
}