import React, { useEffect, useState, useRef } from 'react'
import { ChakraProvider, Box, Flex, Button, Image, Input, Text, Heading, Textarea, useColorModeValue, Link, Collapse } from '@chakra-ui/react'
import { ThumbsUp, ThumbsDown } from "react-feather"

function HistoryBox({text}) {

    const [show, setShow] = useState(false)
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bg = useColorModeValue("white_voting", "dark_box_list")
    const handleToggle = () => setShow(!show)
    
    return (
        <Flex w="100%" justify="space-between"> 
                <Link w="75%" _hover={{textDecoration: 'none'}} onClick={() => {handleToggle()}}>
                    <Flex w="100%" justify="space-between"  bg={bg} px="5%" py="20px" mr="10px"  h="auto" align="center" borderRadius="12px" mb="20px">
                        <Collapse startingHeight={20} in={show}  style={{maxWidth:"450px", marginRight:"20px"}}>{text}</Collapse>
                    </Flex>
                </Link>
                <Flex mr="20px" justify="space-between" bg={bg} mb="20px" borderRadius="12px" align="center" ml="10px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
                    <Button color="green" colorScheme="green" mr="15px" ml="15px" borderRadius="10px"  _focus={{boxShadow:"none"}}>
                        <Flex align="center" >
                            <Text mr="10px">Accepted</Text>
                            <ThumbsUp  height="30px"/>
                        </Flex>
                    </Button>
                </Flex>
        </Flex>
                
           
    )
}

export default HistoryBox
