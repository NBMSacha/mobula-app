import React, { useEffect, useState, useRef } from 'react'
import styles from './Governance.module.scss';
import { ethers } from 'ethers'
import { ChakraProvider, Box, Flex, Button, Image, Input, Text, Heading, Textarea, useColorModeValue } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    ColorModeProvider,
    CSSReset
} from '@chakra-ui/react';

function Power({proposal}) {
    console.log(proposal)
    const [deposit, setDeposit] = useState("")
    const [withdraw, setWithdraw] = useState("")
    const input =  useColorModeValue("white_secondary_input", "dark_input")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bg = useColorModeValue("white_voting", "dark_box_list")
    return (
            <Flex direction="column" align='center' pt="40px" bg={bg} mt="20px" boxShadow={`1px 2px 12px 3px ${shadow}`} borderRadius="15px">
                {/* TITLE */}
                <Flex w="85%" mb="30px">
                    <Flex align="end" justify="space-between" w="100%">
                        <Heading fontFamily="Poppins" mb='8px' fontSize="26px">Voting Power</Heading>
                        <Text mb='8px'>You currently deposited <span style={{color:"blue", marginLeft:"20px"}}>0 $MOBL</span></Text>
                    </Flex>
                </Flex>
                {/* DEPOSIT */}
                <Flex direction="column" w="85%">
                    <Flex justify="space-between" align="end" mb="15px">
                        <Text>Deposit New Token</Text>
                        <Button bg="blue" borderRadius="12px" px="10px" w="140px" h="40px"color="white">Deposit</Button>
                    </Flex>
                    <Input 
                        value={deposit}
                        color="none"
                        mb="50px"
                        border="none"
                        px="20px"
                        h='40px'
                        bg={input}
                        borderRadius="10px"
                        _placeholder={{color:"grey"}}
                        // boxShadow={`1px 2px 12px 3px ${shadow}`}
                        placeholder="2000"
                        onChange={(e) => {
                            setDeposit(e.target.value)
                        }}
                    />
                </Flex>
                 {/* WITHDRAW */}
                 <Flex direction="column" w="85%" pb="150px">
                    <Flex justify="space-between" align="end" mb="15px" >
                        <Text>Withdraw New Token</Text>
                        <Button bg="blue" px="10px" w="140px" borderRadius="12px" h="40px"color="white">Withdraw</Button>
                    </Flex>
                    <Input 
                        value={withdraw}
                        color="none"
                        border="none"
                        px="20px"
                        h='40px'
                        bg={input}
                        borderRadius="10px"
                        _placeholder={{color:"grey"}}
                        // boxShadow={`1px 2px 12px 3px ${shadow}`}
                        placeholder="2000"
                        onChange={(e) => {
                            setWithdraw(e.target.value)
                        }}
                    />
                </Flex>
            </Flex>
        )
}

export default Power
