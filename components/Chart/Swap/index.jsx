
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

const Swap  = ({baseAsset}) => {

    const [ getInput, setGetInput ] = useState('');
    const [ tsxSpeed, setTsxSpeed ] = useState("standard");
    const [ slippage, setSlippage ] = useState("0.5");
    const [ slippageInput, setSlippageInput] = useState(null)

    console.log(baseAsset)

    var object = {
        quantityFrom: getInput,
        from: baseAsset.name,
        
        quantityTo: getInput * 2.63,
        to: baseAsset.name,
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
        <Flex direction={["column", "column", "column", "row"]}  justify="space-between" my={8} >

            {/* COMPONENTS LEFT */}
            <VStack my={0} width={["100%","100%","100%","48%"]}>
                <Flex justify="space-between" direction="column" borderRadius={20} bg="#2e3557" w="90%" p={15}>
                    <Text mt="0" mb="10" fontSize="18px" fontWeight="600" color='white'>From</Text>
                    <Flex justify="space-between" align="center">
                        <Input type="number" border="none" fontFamily="Poppins" bg="none"w="50%" h="40px" placeholder="13.33" fontSize="18px" fontWeight="600" color='white' p={0} 
                         value={getInput}
                         onChange={(e) => setGetInput(e.target.value)} required/>
                        <Flex align="center" h="40px">
                            <Image h={25} w={25} borderRadius={50} src={baseAsset.logo} mr={5}/>
                            <Text fontSize="18px" fontWeight="600" color='white'>{baseAsset.symbol}</Text>
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
                            <Image h={25} w={25} borderRadius={50} src={baseAsset.logo} mr={5}/>
                            <Text fontSize="18px" fontWeight="600" color='white' >{baseAsset.symbol}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </VStack>

            {/* COMPONENTS RIGHT */}
            <VStack my={0} color="white" width={["100%","100%","100%","43%"]} align="start">
                <Heading mt={0} mb={10}>Swap settings</Heading>
                <Flex direction="column" pb={10}>
                    <Text mb={3}>Transaction Speed (GWEI)</Text>
                    <Box w='50%' h={1} bg="#2E3557"></Box>
                    <Flex w="100%" mt={15} justify='space-around'>
                        <Button color="white" fontFamily='Poppins' bg={tsxSpeed === "standard" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={5} py={6} px={10}
                            onClick={() => setTsxSpeed("standard")}
                        >
                            Standard 
                            <Text m={0} fontWeight="bold">(5)</Text>
                        </Button>
                        <Button fontFamily='Poppins' color="white" bg={tsxSpeed === "fast" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={5} py={6} px={10}
                            onClick={() => setTsxSpeed("fast")}
                        >
                            Fast 
                            <Text  m={0} fontWeight="bold">(5)</Text>
                        </Button>
                        <Button fontFamily='Poppins' color="white" bg={tsxSpeed === "instant" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={5} py={6} px={10}
                            onClick={() => setTsxSpeed("instant")}
                        >
                            Instant 
                            <Text  m={0} fontWeight="bold">(5)</Text>
                            </Button>
                    </Flex>
                </Flex>
                <Flex align="center" pb="40px">
                    <Text mr={30} pb={3} borderBottom="1px solid #2E3557" >Slippage</Text>
                    <Button h={30} fontFamily='Poppins' color="white" bg={slippage === "0.5" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={10} py={5} px={5}
                        onClick={() => setSlippage("0.5")}
                    >
                        0.5%
                    </Button>
                    <Button h={30} fontFamily='Poppins' color="white" bg={slippage === "1" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={10} py={5} px={5}
                        onClick={() => setSlippage("1")}
                    >1%</Button>
                    <Input  border="none" fontFamily='Poppins' bg={slippage === "input" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} color="white" value={slippageInput} placeholder="%" borderRadius="10" w={40} h="41px"  pr={10} 
                        onClick={(e) => {
                                setSlippageInput(e.target.value);
                                setSlippage("input");
                            }
                        }
                    />
                </Flex>
                <Button type="submit"  fontFamily='Poppins' color="white" bg="rgba(3, 67, 226, 0.96)" border="none" borderRadius="10" py={6} px={16} onClick={(e) => {console.log(object)}}>Swap</Button>
            </VStack>
        </Flex>
        
    )

}

export default Swap