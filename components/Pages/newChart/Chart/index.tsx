import React, { useEffect, useState, useRef } from 'react'
import { ChakraProvider,InputLeftElement, Link,InputGroup, Input, Progress,ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import { Search2Icon } from "@chakra-ui/icons"
import { createClient, SupabaseClient } from '@supabase/supabase-js'
const ChartBox = ({ baseAsset, socialLink, selector, setSelector, setTimeFormat, timeFormat, setTitle}) => { 
    const border = useColorModeValue("1px solid rgba(229, 229, 229, 0.6)", "none")
    const sticky = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
    const bg = useColorModeValue("none", "#121626")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
 return (
    <Flex direction="column" boxShadow={["none","none","none",`1px 2px 12px 3px ${shadow}`]} borderRadius="15px" w="100%" px={["10px","10px","40px","40px"]} mt="10px" pt={["5px","5px","30px","30px"]}>
    {/* TOP tools*/}
    <Flex justify="space-between">
        <Box display={["none", "none", "none","block"]}>
            <Text fontSize={["","","","17px"]} mb={["","","","30px"]}>{baseAsset.name} to USD Chart</Text>
            <Flex fontWeight="400px" fontSize={["","","","13px"]}>
                <Button border={border} _focus={{boxShadow:"none"}} mr="10px" w="95px" h="30px" bg={selector === "Price" ? "blue" : socialLink } color={selector === "Price" ? "white" : "none" } onClick={() => {setSelector("Price"); setTitle("price")}}>Price</Button>
                <Button border={border} _focus={{boxShadow:"none"}} mr="10px" w="95px" h="30px" bg={selector === "Market" ? "blue" : socialLink } color={selector === "Market" ? "white" : "none" }  onClick={() => {setSelector("Market"); setTitle("rank")}}>Market Cap</Button>
                <Button border={border} _focus={{boxShadow:"none"}} mr="10px" w="95px" h="30px" bg={selector === "Volume" ? "blue" : socialLink } color={selector === "Volume" ? "white" : "none" }  onClick={() => {setSelector("Volume"); setTitle("volume")}}>Volume</Button>
            </Flex>
        </Box>
        <Flex direction="column" align={"end"} ml={["0px","0px","0px","auto"]}>
            <InputGroup display={["none", "none", "none","flex"]} alignItems="end" ml="auto" mb="25px">
                <InputLeftElement
                    display="flex" alignItems="end"
                    pointerEvents='none'
                    children={<Search2Icon ml="72px" color='gray.300' mt="9px" />}
                />
                <Input
                    ml="auto"
                    border={border}
                    w="200px"
                    borderRadius="8px"
                    bg={socialLink}
                    h="34px"
                    color="none"
                    _placeholder={{color:"none"}}
                    placeholder="Search coin name"
                    pr="10px"
                    pl="35px"
                />
            </InputGroup>
            <Flex  p="4px 0px" borderRadius="6px" >
                <Button  mx={["8px","8px","12px","12px"]} 
                    fontSize={["13px","13px","15px","15px"]}
                    _focus={{boxShadow:"none"}} 
                    opacity={timeFormat === "1D" ? "1" : ".5" }
                    onClick={() => {
                        setTimeFormat('1D')
                    }}>1D
                </Button>
                <Button mx={["8px","8px","12px","12px"]} 
                    fontSize={["13px","13px","15px","15px"]}
                    _focus={{boxShadow:"none"}} 
                    opacity={timeFormat === "7D" ? "1" : ".5" } 
                    onClick={() => {
                        setTimeFormat('7D')
                    }}>7D
                </Button>
                <Button mx={["8px","8px","12px","12px"]} 
                    fontSize={["13px","13px","15px","15px"]}
                    _focus={{boxShadow:"none"}} 
                    opacity={timeFormat === "30D" ? "1" : ".5" }
                    onClick={() => {
                        setTimeFormat('30D')
                    }}>1M
                </Button>
                <Button mx={["8px","8px","12px","12px"]}  
                    fontSize={["13px","13px","15px","15px"]}
                    _focus={{boxShadow:"none"}} 
                    opacity={timeFormat === "3M" ? "1" : ".5" }
                    onClick={() => {
                        setTimeFormat('3M')
                    }}>3M
                </Button>
                <Button mx={["8px","8px","12px","12px"]}  
                    fontSize={["13px","13px","15px","15px"]}
                    _focus={{boxShadow:"none"}} 
                    opacity={timeFormat === "1Y" ? "1" : ".5" }
                    onClick={() => {
                        setTimeFormat('1Y')
                    }}>1Y
                </Button>
                <Button mx={["8px","8px","12px","12px"]}  
                    fontSize={["13px","13px","15px","15px"]}
                    _focus={{boxShadow:"none"}} 
                    opacity={timeFormat === "ALL" ? "1" : ".5" }
                    onClick={() => {
                        setTimeFormat('ALL')
                    }}>ALL
                </Button>
                {(!baseAsset.tracked) ? (
                    <Box mt={["0px", "0px", "50px"]} textAlign="center">
                        Not enough liquidity or vol. to get trustfull datas.
                    </Box>
                ) : <></>}
            </Flex>
        </Flex>
    </Flex>
        <Flex mt="10px" mb="10px">
            <canvas id='chart' style={{maxHeight:"450px"}}></canvas>
        </Flex>
        <Link href='https://discord.gg/2a8hqNzkzN' mb="50px" fontSize="11px" _hover={{textDecoration:"none"}}>
            <Text align="end" color="red" >A problem ? Report it to the DAO </Text>
        </Link>
</Flex>
    )
}

export default ChartBox;