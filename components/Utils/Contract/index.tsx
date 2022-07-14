
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
    return (
        <Flex
            align="center"
            position="relative"
            justify="left"
            border="1px solid var(--box_border)"
            minWidth={["135px", "135px", "181px", "181px"]}
            bg="var(--contract)"
            mt='18px'
            mx={["auto", "auto", "auto", "0px"]}
            h={["20px", "20px", "30px", "40px"]}
            p={["15px 2px","15px 2px","0px 2px","0px 10px"]}
            boxShadow="1px 2px 13px 3px var(--shadow)"
            borderRadius={["6px", "6px", '10px', '10px']}
        >
            {blockchain ? <Image width={'17px'} borderRadius="50%" height={'17px'} src={"/" + blockchain.split(' ')[0].toLowerCase() + '.png'} ml="5px" /> : <></>
            }
            <Text onClick={() => {
                window.open(supportedRPCs[supportedRPCs.map(r => r.name).indexOf(blockchain)].explorer + '/token/' + contract)
            }} ml="10px" py={5} fontSize={["10px", "10px", "15px", "15px"]} textAlign="center">{contract.slice(0, 6) + '...' + contract.slice(contract.length - 5, contract.length - 1)}</Text>
            {
                copied ? <CheckCircle width='17px' color='#32C784' style={{ "position": "absolute", "right": "10px" }} /> : <Copy width={'15px'} cursor="pointer" style={{ "position": "absolute", "right": "10px" }} onClick={() => {
                    setCopied(true);
                    navigator.clipboard.writeText(contract)
                }} />
            }
        </Flex >
    )
}