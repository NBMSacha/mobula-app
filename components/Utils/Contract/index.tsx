
import { getBlockchainFromContract } from '../../../helpers/blockchain';
import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { CheckCircle, Copy } from 'react-feather';
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
            position="relative"
            justify="left"
            width="165px"
            bg="var(--bg-list)"
            mt='12px'
            boxShadow=" 0px 1px 12px 3px var(--shadow-color)"
            borderRadius='8px'
            
        >
            {blockchain ? <Image width={'17px'} borderRadius="50%"  height={'17px'} src={"/" + blockchain.split(' ')[0].toLowerCase() + '.png'} ml="5px" /> : <></>
            }
            <Text ml="10px" py={5} fontSize={'0.8rem'} color="var(--text-color)" textAlign="center">{contract.slice(0, 6) + '...' + contract.slice(contract.length - 5, contract.length - 1)}</Text>
            {
                copied ? <CheckCircle width='17px' color='#32C784' style={{ "position": "absolute", "right": "10px" }} /> : <Copy color="var(--text-color)" width={'15px'} cursor="pointer" style={{ "position": "absolute", "right": "10px" }} onClick={() => {
                    setCopied(true);
                    navigator.clipboard.writeText(contract)
                }} />
            }
        </Flex >
    )
}