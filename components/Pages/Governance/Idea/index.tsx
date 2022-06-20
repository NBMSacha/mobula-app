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
    const btn = useColorModeValue("blue", "none")
    const text = useColorModeValue("white", "blue")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "bg_white")
    const bg = useColorModeValue("white_voting", "dark_box_list")
    return (

            <Flex direction="column" mt={["20px", "20px","20px",""]} position="relative">
                <Text fontSize={["13px", "13px", "15px", "18px"]} mb='20px'>Type your idea</Text>
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
                    fontSize={["13px", "13px", "15px", "15px"]}
                    placeholder='What would you like to see on Mobula ?'
                    resize="none"
                />
                 <Button color={text} bg={btn} display={["none", "none", "none", "flex"]} fontSize="12px" mt="12px" position={["initial","initial","absolute","absolute"]} borderRadius={["8x","8px","8px","12px"]} bottom="30px" right="30px" variant={"outline"} colorScheme="blue" p="10px 15px">Submit the DAO</Button>
                 <Button display={["flex", "flex", "flex", "none"]} fontSize="12px" mt="12px" position={["initial","initial","absolute","absolute"]} borderRadius={["8px","8px","8px","12px"]} bottom="30px" bg={bg} right="30px"  colorScheme="blue" p="10px 15px">Submit the DAO</Button>
            </Flex>
           
          
        )
}

export default Idea
