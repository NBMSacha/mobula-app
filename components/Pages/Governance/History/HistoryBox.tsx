import React, { useEffect, useState, useRef } from 'react'
import { ChakraProvider, Box, Flex, Button, Image, Input, Text, Heading, Textarea, useColorModeValue, Link, Collapse } from '@chakra-ui/react'


function HistoryBox({text}) {

    const [show, setShow] = useState(false)
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bg = useColorModeValue("white_voting", "dark_box_list")
    const handleToggle = () => setShow(!show)
    
    return (
            <Link _hover={{textDecoration: 'none'}} onClick={() => {handleToggle()}}>
                <Flex w="100%" justify="space-between"  bg={bg} px="5%" py="20px" boxShadow={`1px 2px 12px 3px ${shadow}`} h="auto" align="center" borderRadius="12px" mb="20px">
                    <Collapse startingHeight={20} in={show}  style={{maxWidth:"450px", marginRight:"20px"}}>{text}</Collapse>
                    <Flex w="150px" justify="space-between" align="center">
                        <Image src="/thumbsUp.png" h="30px"/>
                        <Text color="green">Accepted</Text>
                    </Flex>
                </Flex>
            </Link>
    )
}

export default HistoryBox
