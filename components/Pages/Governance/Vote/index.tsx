import React, { useEffect, useState, useRef } from 'react'
import styles from './Governance.module.scss';
import { ethers } from 'ethers'
import { ChakraProvider, Box, Flex, Button, Image, Input, Text, Heading, Textarea, IconButton, useColorModeValue } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    ColorModeProvider,
    CSSReset
} from '@chakra-ui/react';
import { ThumbsUp, ThumbsDown } from "react-feather"

function Vote({proposal}) {
    console.log(proposal)
    const [value, setValue] = useState("")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bg = useColorModeValue("white_voting", "dark_box_list")
    return (
            <Flex direction="column" >
                <Text mb='20px' mt={["30px", "30px","30px",""]}>Vote for current proposals</Text>
                {/* BOX */}
                <Flex mb="15px" >
                    <Flex h={["70px","70px","80px","80px"]} justify="space-between" align="center" w="100%" bg={bg}  borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Text mx="25px" >The listing fee should be reduced to 10$</Text>
                        <Flex w="20%" mr="20px" justify="space-between">
                            <Button variant="outline" color="green" colorScheme="green" mr="20px" w="60px" h="40px" borderRadius="10px" _focus={{boxShadow:"none"}}>
                                <ThumbsUp  height="30px"/>
                            </Button>
                            <Button  color="red" colorScheme="red" borderRadius="10px" w="60px" h="40px"_focus={{boxShadow:"none"}} >
                                <ThumbsDown  height="30px"/>
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
                
                {/* TO REMOVE */}
                <Flex mb="15px" >
                    <Flex h={["70px","70px","80px","80px"]} justify="space-between" align="center" w="100%" bg={bg}  borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Text mx="25px" >The listing fee should be reduced to 10$</Text>
                        <Flex w="20%" mr="20px" justify="space-between">
                            <Button  color="green" colorScheme="green" mr="20px" w="60px" h="40px" borderRadius="10px" _focus={{boxShadow:"none"}}>
                                <ThumbsUp  height="30px"/>
                            </Button>
                            <Button variant="outline" color="red" colorScheme="red" borderRadius="10px" w="60px" h="40px" _focus={{boxShadow:"none"}}>
                                <ThumbsDown  height="30px"/>
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex mb="15px" >
                    <Flex h={["70px","70px","80px","80px"]} justify="space-between" align="center" w="100%" bg={bg}  borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Text mx="25px" >The listing fee should be reduced to 10$</Text>
                        <Flex w="20%" mr="20px" justify="space-between">
                            <Button  color="green" colorScheme="green" mr="20px" w="60px" h="40px" borderRadius="10px" _focus={{boxShadow:"none"}}>
                                <ThumbsUp  height="30px"/>
                            </Button>
                            <Button  color="red" colorScheme="red" borderRadius="10px" w="60px" h="40px" _focus={{boxShadow:"none"}}>
                                <ThumbsDown  height="30px"/>
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex mb="15px" >
                    <Flex h={["70px","70px","80px","80px"]} justify="space-between" align="center" w="100%" bg={bg}  borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Text mx="25px" >The listing fee should be reduced to 10$</Text>
                        <Flex w="20%" mr="20px" justify="space-between">
                            <Button  color="green" colorScheme="green" mr="20px" w="60px" h="40px" borderRadius="10px" _focus={{boxShadow:"none"}}>
                                <ThumbsUp  height="30px"/>
                            </Button>
                            <Button  color="red" colorScheme="red" borderRadius="10px" w="60px" h="40px" _focus={{boxShadow:"none"}}>
                                <ThumbsDown  height="30px"/>
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
                
            </Flex>
        )
}

export default Vote
