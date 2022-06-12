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
                     
                    </Flex>
                </Flex>
                {/* DEPOSIT */}
                <Flex direction="column" w="85%">
                    <Flex justify="space-between" align="end" mb="15px">
                        <Text>Deposit New Token</Text>
                    </Flex>
                    <Flex justify="space-between" align="center" mb="30px">
                        <Input 
                            value={deposit}
                            w="75%"
                            color="none"
                            marginRight="10px"
                            border="none"
                            px="20px"
                            h='35px'
                            bg={input}
                            borderRadius="10px"
                            _placeholder={{color:"grey"}}
                            // boxShadow={`1px 2px 12px 3px ${shadow}`}
                            placeholder="2000"
                            onChange={(e) => {
                                setDeposit(e.target.value)
                            }}
                        />
                        <Button variant="outline" color="blue" _focus={{boxShadow:"none"}} colorScheme="blue" borderRadius="12px" px="10px" w="120px" h="35px" fontSize="13px">Withdraw</Button>
                    </Flex>
                </Flex>
                 {/* WITHDRAW */}
                 <Flex direction="column" w="85%" pb="100px">
                    <Flex justify="space-between" align="end" mb="15px" >
                        <Text>Withdraw New Token</Text>
                        
                    </Flex>
                    <Flex justify="space-between" align="center">
                        <Input 
                            w="75%"
                            marginRight="10px"
                            value={withdraw}
                            color="none"
                            border="none"
                            px="20px"
                            h='35px'
                            bg={input}
                            borderRadius="10px"
                            _placeholder={{color:"grey"}}
                            // boxShadow={`1px 2px 12px 3px ${shadow}`}
                            placeholder="2000"
                            onChange={(e) => {
                                setWithdraw(e.target.value)
                            }}
                        />
                        <Button variant="outline" color="blue" _focus={{boxShadow:"none"}} colorScheme="blue" borderRadius="12px" px="10px" w="120px" h="35px" fontSize="13px">Deposit</Button>
                    </Flex>
                    
                </Flex>
            </Flex>
        )
}

export default Power
