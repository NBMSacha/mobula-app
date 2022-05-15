
import React, { useState, useEffect } from 'react';
import { Box, Flex, Spacer,Heading,extendTheme, Text, Button, Input, Image} from '@chakra-ui/react';
import {
    Previous,
    Paginator,
    PageGroup,
    Page,
    Next,
    generatePages
  } from 'chakra-paginator';
import { ChevronRight, ChevronLeft} from "react-feather";
import { VStack } from '@chakra-ui/react';
import { ChevronDown } from "react-feather";
import styles from "./"

const Swap = ({ token }) => {

    const [ getInput, setGetInput ] = useState('');
    const [ tsxSpeed, setTsxSpeed ] = useState("standard");
    const [ slippage, setSlippage ] = useState("0.5");
    const [ slippageInput, setSlippageInput] = useState(null)

    console.log(getInput)

    var object = {
        quantityFrom: getInput,
        from: token.name,
        
        quantityTo: getInput * 2.63,
        to: token.name,
        tsx_speed: tsxSpeed,
        slippage: () => {
            if(slippage === "input") {
                return slippageInput;
            } else {
                return slippage;
            }
        }
    }

    

    return(
        <Flex direction={["column", "column", "column", "row", "row"]} justify="space-between" mt={40} >

            {/* COMPONENTS LEFT */}
            <VStack my={0} width="48%">
                <Flex justify="space-between" direction="column" borderRadius={20} bg="#2e3557" w="90%" p={15}>
                    <Text mt="0" mb="10" fontSize="18px" fontWeight="600" color='white'>From</Text>
                    <Flex justify="space-between" align="center">
                        <Input type="number" border="none" fontFamily="Poppins" bg="none"w="50%" h="40px" placeholder="13.33" fontSize="18px" fontWeight="600" color='white' p={0} 
                         value={getInput}
                         onChange={(e) => setGetInput(e.target.value)} required/>
                        <Flex align="center" h="40px">
                            <Image h={25} w={25} borderRadius={50} src={token.logo} mr={10}/>
                            <Text fontSize="18px" fontWeight="600" color='white'>{token.symbol}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Spacer />
                <ChevronDown color="white" />
                <Spacer />
                <Flex justify="space-between" direction="column" borderRadius={20} bg="#2e3557" w="90%" p={15} >
                    <Text mt="0" mb="10" fontSize="18px" fontWeight="600" color='white'>To</Text>
                    <Flex justify="space-between" align="center">
                        <Input type="number" border="none" bg="none"w="50%" h="40px" fontFamily="Poppins" placeholder="13.33" fontSize="18px" fontWeight="600" color='white' p={0} value={getInput * 2.63} />
                        <Flex align="center" h="40px">
                            <Image h={25} w={25} borderRadius={50} src={token.logo} mr={10}/>
                            <Text fontSize="18px" fontWeight="600" color='white' >{token.symbol}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </VStack>

            {/* COMPONENTS RIGHT */}
            <VStack my={0} color="white" width="43%" align="start">
                <Heading mt={0} mb={10}>Swap settings</Heading>
                <Flex direction="column" pb={20}>
                    <Text mb={10}>Transaction Speed (GWEI)</Text>
                    <Box w='50%' h={1} bg="#2E3557"></Box>
                    <Flex w="100%" mt={15} >
                        <Button color="white" fontFamily='Poppins' bg={tsxSpeed === "standard" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={10} py={10} px={20}
                            onClick={() => setTsxSpeed("standard")}
                        >
                            Standard 
                            <Text m={0} fontWeight="bold">(5)</Text>
                        </Button>
                        <Button fontFamily='Poppins' color="white" bg={tsxSpeed === "fast" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={10} p={10} px={20}
                            onClick={() => setTsxSpeed("fast")}
                        >
                            Fast 
                            <Text  m={0} fontWeight="bold">(5)</Text>
                        </Button>
                        <Button fontFamily='Poppins' color="white" bg={tsxSpeed === "instant" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={10} p={10} px={20}
                            onClick={() => setTsxSpeed("instant")}
                        >
                            Instant 
                            <Text  m={0} fontWeight="bold">(5)</Text>
                            </Button>
                    </Flex>
                </Flex>
                <Flex align="center">
                    <Text mr={30} pb={10} borderBottom="1px solid #2E3557" >Slippage</Text>
                    <Button h={30} fontFamily='Poppins' color="white" bg={slippage === "0.5" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={10} py={10} px={15}
                        onClick={() => setSlippage("0.5")}
                    >
                        0.5%
                    </Button>
                    <Button h={30} fontFamily='Poppins' color="white" bg={slippage === "1" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={10} py={10} px={15} 
                        onClick={() => setSlippage("1")}
                    >1%</Button>
                    <Input  border="none" fontFamily='Poppins' bg={slippage === "input" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} color="white" value={slippageInput} placeholder="%" borderRadius="10" w={80} h={30}  pr={10} 
                        onClick={(e) => {
                                setSlippageInput(e.target.value);
                                setSlippage("input");
                            }
                        }
                    />
                </Flex>
                <Button type="submit" h={40} w={150} fontFamily='Poppins' color="white" bg="rgba(3, 67, 226, 0.96)" border="none" borderRadius="10" py={10} px={15} onClick={(e) => {console.log(object)}}>Swap</Button>
            </VStack>
        </Flex>
        
    )

}

export default Swap