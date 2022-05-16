
import React, { useState, useEffect } from 'react';
import { Box, Flex, Spacer, Heading, extendTheme, Text, Button, Input, Image } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { ChevronDown } from "react-feather";
import styles from "./"

const Swap = ({ baseAsset }) => {

    const [getInput, setGetInput] = useState('');
    const [tsxSpeed, setTsxSpeed] = useState("standard");
    const [slippage, setSlippage] = useState("0.5");
    const [slippageInput, setSlippageInput] = useState(null)

    console.log(baseAsset)

    var object = {
        quantityFrom: getInput,
        from: baseAsset.name,

        quantityTo: getInput * 2.63,
        to: baseAsset.name,
        tsx_speed: tsxSpeed,
        slippage: () => {
            if (slippage === "input") {
                return slippageInput;
            } else {
                return slippage;
            }
        }
    }
    return (
        <Flex opacity='0.2' cursor='not-allowed' direction={["column", "column", "column", "row"]} justify="space-between" my={8} >

            {/* COMPONENTS LEFT */}
            <VStack width={["100%", "100%", "100%", "48%"]} mb={["40px", "40px", "40px", "0px"]} mt={["-60px", "-20px", "-20px", "0px"]}>
                <Flex justify="space-between" direction="column" borderRadius={20} bg="#2e3557" w="90%" pb={["0px !important", "0px !important", "0px !important", "10px !important",]} p={["10px", "10px", "10px", "15px"]}>
                    <Text mt="0" mb="4" fontSize={["14px", "14px", "14px", "18px"]} fontWeight="600" color='white'>From</Text>
                    <Flex justify="space-between" align="center">
                        <Input type="number" border="none" fontFamily="Poppins" bg="none" w="50%" h="40px" placeholder="13.33" fontSize={["14px", "14px", "14px", "18px"]} fontWeight="600" color='white' p={0}
                            value={getInput}
                            onChange={(e) => setGetInput(e.target.value)} required />
                        <Flex align="center" h="40px">
                            <Image h={25} w={25} borderRadius={50} src={baseAsset.logo} mr={5} />
                            <Text fontSize={["14px", "14px", "14px", "18px"]} fontWeight="600" color='white'>{baseAsset.symbol}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Spacer />
                <ChevronDown color="white" />
                <Spacer />
                <Flex justify="space-between" direction="column" borderRadius={20} bg="#2e3557" w="90%" pb={["0px !important", "0px !important", "0px !important", "10px !important",]} p={["10px", "10px", "10px", "15px"]} >
                    <Text mt="0" mb="4" fontSize={["14px", "14px", "14px", "18px"]} fontWeight="600" color='white' >To</Text>
                    <Flex justify="space-between" align="center">
                        <Input type="number" border="none" bg="none" w="50%" h="40px" fontFamily="Poppins" placeholder="13.33" fontSize={["14px", "14px", "14px", "18px"]} fontWeight="600" color='white' p={0} value={getInput * 2.63} />
                        <Flex align="center" h="40px">
                            <Image h={25} w={25} borderRadius={50} src={baseAsset.logo} mr={5} />
                            <Text fontSize={["14px", "14px", "14px", "18px"]} fontWeight="600" color='white' >{baseAsset.symbol}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </VStack>

            {/* COMPONENTS RIGHT */}
            <VStack my={0} color="white" width={["100%", "auto", "88%", "48%"]} align="start" justify="space-between" m="auto">
                <Heading mt={0} mb={["5", "5", "5", "8"]} fontSize={["18px", "18px", "18px", "22px"]} w="100%">Swap settings</Heading>
                <Flex direction="column" fontSize={["13px", "13px", "13px", "15px"]} pb={["5", "5", "5", "8"]} w="100%" >
                    <Text mb={3}>Transaction Speed (GWEI)</Text>
                    <Box w='50%' h="1px" bg="#2E3557"></Box>
                    <Flex w="100%" mt={15} justify='start' align="start" >
                        <Button color="white" fontFamily='Poppins' fontSize={["12px", "12px", "12px", "13px"]} bg={tsxSpeed === "standard" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={5} py={5} px={7}
                            onClick={() => setTsxSpeed("standard")}
                        >
                            Standard
                            <Text m={0} fontWeight="bold">(5)</Text>
                        </Button>
                        <Button fontFamily='Poppins' color="white" fontSize={["12px", "12px", "12px", "13px"]} bg={tsxSpeed === "fast" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={5} py={5} px={7}
                            onClick={() => setTsxSpeed("fast")}
                        >
                            Fast
                            <Text m={0} fontWeight="bold">(5)</Text>
                        </Button>
                        <Button fontFamily='Poppins' color="white" fontSize={["12px", "12px", "12px", "13px"]} bg={tsxSpeed === "instant" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={5} py={5} px={7}
                            onClick={() => setTsxSpeed("instant")}
                        >
                            Instant
                            <Text m={0} fontWeight="bold">(5)</Text>
                        </Button>
                    </Flex>
                </Flex>
                <Flex align="center" pb="30px " w="100%" fontSize={["13px", "13px", "13px", "15px"]} pb={["5", "5", "5", "8"]} m={["auto"]}>
                    <Text mr={30} pb={3} borderBottom="1px solid #2E3557" >Slippage</Text>
                    <Button h={30} fontSize={["12px", "12px", "12px", "13px"]} fontFamily='Poppins' color="white" bg={slippage === "0.5" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={["4", "4", "4", "5"]} py={4} px={5}
                        onClick={() => setSlippage("0.5")}
                    >
                        0.5%
                    </Button>
                    <Button h={30} fontSize={["12px", "12px", "12px", "13px"]} fontFamily='Poppins' color="white" bg={slippage === "1" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} border="none" borderRadius="10" mr={["4", "4", "4", "5"]} py={4} px={5}
                        onClick={() => setSlippage("1")}
                    >1%</Button>
                    <Input border="none" fontFamily='Poppins' bg={slippage === "input" ? "rgba(3, 67, 226, 0.5)" : "#262A4D"} color="white" value={slippageInput} placeholder="%" borderRadius="10" w={40} h="35px" mr={["4", "4", "4", "5"]}
                        onClick={(e) => {
                            setSlippageInput(e.target.value);
                            setSlippage("input");
                        }
                        }
                    />
                </Flex>
                <Button type="submit" fontFamily='Poppins' fontWeight="400" color="white" bg="rgba(3, 67, 226, 0.96)" border="none" borderRadius="10" py={5} px={16} fontSize={["13px", "13px", "13px", "15px"]} onClick={(e) => { console.log(object) }}>Swap</Button>
            </VStack>
        </Flex>

    )

}

export default Swap