import React, { useState, useEffect } from 'react'
import { useColorModeValue, Flex, Box, Text, Stack,Image, Button } from '@chakra-ui/react'
import Boxs from "./Boxs"
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import Checkboxs from './Checkboxs'
import { CalendarIcon } from "@chakra-ui/icons"

export default function Sliders() {

    return (
        <Flex mx="auto" mt="10px" w="100%" maxWidth="1400px">
            <Flex direction="column" mr="10px" w="100%">
                <Flex p="5px"  border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px" w="100%"> 
                    <Boxs title={"Liquidity"} />
                    <Boxs title={"Market-cap"} />
                    <Boxs title={"Volume"} />
                </Flex>
                <Flex mt='10px'  p="5px" w="100%" border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px" > 
                    <Boxs title={"Holders"} />
                    <Boxs title={"Online Telegram users"} />
                    <Boxs title={"Price change"} />
                </Flex>
            </Flex>
            <Flex direction="column" mr="10px" w="100%"> 
                <Flex  direction="column" p="20px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px" w="100%" maxWidth="250px"> 
                    <Checkboxs condition={"three"} />
                </Flex>
                <Flex mt="10px" pt="10px" direction="column" p="20px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px" w="100%" maxWidth="250px"> 
                    <Checkboxs condition={"two"}/>
                </Flex>
            </Flex>
            
            <Flex direction="column" align="center"  w="100%"> 
                <Flex direction="column" align="center" p="20px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px" w="100%" maxWidth="250px"> 
                    <Text fontSize="15px">First on-chain trade activity</Text>
                    <Button opacity=".1" py="10px" px="20px" borderRadius="10px" mt="20px" border="1px solid var(--box_border)" >
                        <CalendarIcon mr="10px" />
                        <Text fontSize="12px">From all (Defaut)</Text>
                    </Button>
                    <Button opacity=".1" py="10px" px="20px" borderRadius="10px" mt="20px" border="1px solid var(--box_border)" >
                        <CalendarIcon mr="10px"/>
                        <Text fontSize="12px">From all (Defaut)</Text>
                    </Button>
                </Flex>   
                <Flex direction="column" justify="center" align="center" p="18px" border="1px solid var(--box_border)" mt="10px" _focus={{ boxShadow: "none"}} borderRadius="12px" w="100%" maxWidth="250px"> 
                    <Button py="15px" px="20px" borderRadius="10px" mt="0px" w="100%" border="1px solid var(--box_border)" bg="var(--elections)">
                        Search
                    </Button>
                </Flex>
            </Flex>
        </Flex>   
    )
}
