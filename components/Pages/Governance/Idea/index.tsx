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



function Idea({proposal}) {
    console.log(proposal)
    const [value, setValue] = useState("")
    
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "bg_white")
    const bg = useColorModeValue("white_voting", "dark_box_list")
    return (
            <Flex direction="column" mt={["20px", "20px","20px",""]}>
                <Text fontSize="15px" mb='20px'>Your Idea ?</Text>
                <Textarea
                    border="none"
                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                    borderRadius="12px"
                    color="none"
                    p="20px"
                    bg={bg}
                    _placeholder={{color:"none"}}
                    minHeight="200px"
                    value={value}
                    onChange={(e) => { 
                        setValue(e.target.value)
                    }}
                    placeholder='What would you like to see on Mobula ?'
                    resize="none"
                    
                />
            </Flex>
        )
}

export default Idea
