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

function Vote({proposal}) {
    console.log(proposal)
    const [value, setValue] = useState("")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bg = useColorModeValue("white_voting", "dark_box_list")
    return (
            <Flex direction="column" >
                <Text mb='20px' mt={["30px", "30px","30px",""]}>Vote for current proposals</Text>
                {/* BOX */}
                <Flex mb="15px">
                    <Flex h={["70px","70px","80px","80px"]} justify="start" align="center" w="65%" bg={bg} mr={["2%","2%","3%","5.5%"]} borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Text mx="25px" >The listing fee should be reduced to 10$</Text>
                    </Flex>
                   <Button mr={["2%","2%","3%","5.5%"]} bg="green" w={["14%","14%","12%","12%"]} borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Image src="/thumbsUp.png"  h="30px"/>
                   </Button>
                   <Button bg="red" w={["14%","14%","12%","12%"]} borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Image src="/thumbsDown.png"  h="30px"/>
                   </Button>
                </Flex>
                {/* TO REMOVE */}
                <Flex mb="15px">
                    <Flex h={["70px","70px","80px","80px"]} justify="start" align="center" w="65%" bg={bg} mr={["2%","2%","3%","5.5%"]} borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Text mx="25px" >The listing fee should be reduced to 10$</Text>
                    </Flex>
                   <Button mr={["2%","2%","3%","5.5%"]} bg="green" w={["14%","14%","12%","12%"]} borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Image src="/thumbsUp.png"  h="30px"/>
                   </Button>
                   <Button bg="red" w={["14%","14%","12%","12%"]} borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Image src="/thumbsDown.png"  h="30px"/>
                   </Button>
                </Flex>
                <Flex mb="15px">
                    <Flex h={["70px","70px","80px","80px"]} justify="start" align="center" w="65%" bg={bg} mr={["2%","2%","3%","5.5%"]} borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Text mx="25px" >The listing fee should be reduced to 10$</Text>
                    </Flex>
                   <Button mr={["2%","2%","3%","5.5%"]} bg="green" w={["14%","14%","12%","12%"]} borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Image src="/thumbsUp.png"  h="30px"/>
                   </Button>
                   <Button bg="red" w={["14%","14%","12%","12%"]} borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Image src="/thumbsDown.png"  h="30px"/>
                   </Button>
                </Flex>
                <Flex mb="15px">
                    <Flex h={["70px","70px","80px","80px"]} justify="start" align="center" w="65%" bg={bg} mr={["2%","2%","3%","5.5%"]} borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Text mx="25px" >The listing fee should be reduced to 10$</Text>
                    </Flex>
                   <Button mr={["2%","2%","3%","5.5%"]} bg="green" w={["14%","14%","12%","12%"]} borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Image src="/thumbsUp.png"  h="30px"/>
                   </Button>
                   <Button bg="red" w={["14%","14%","12%","12%"]} borderRadius="15px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                        <Image src="/thumbsDown.png"  h="30px"/>
                   </Button>
                </Flex>
                
            </Flex>
        )
}

export default Vote
