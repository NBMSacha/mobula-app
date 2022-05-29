import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { CheckCircle, Copy } from 'react-feather';
import { getBlockchainFromContract } from '../../../helpers/blockchain';
import styles from './Contract.module.scss'

export default function Contract({ contract, blockchain }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!blockchain) {
            getBlockchainFromContract(contract).then(r => {
                blockchain = r;
            })
        }
    }, [])

    return (
        <Flex
            align="center"
            justify="left"
            width="165px"
            bg="#22233d"
            mt='10px'
            borderRadius='5px'
        >
            {blockchain ? <Image width={'15px'} height={'15px'} src={"/" + blockchain.split(' ')[0].toLowerCase() + '.png'} ml="5px" /> : <></>
            }
            <Text ml="5px" fontSize={'0.8rem'} color="white">{contract.slice(0, 6) + '...' + contract.slice(contract.length - 5, contract.length - 1)}</Text>
            {
                copied ? <CheckCircle width='17px' color='#32C784' style={{ "position": "absolute", "right": "10px" }} /> : <Copy color="white" width={'15px'} cursor="pointer" style={{ "position": "absolute", "right": "10px" }} onClick={() => {
                    setCopied(true);
                    navigator.clipboard.writeText(contract)
                }} />
            }
        </Flex >
    )
}