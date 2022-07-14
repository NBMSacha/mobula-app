import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import Boxs from "./Boxs"
export default function AlsoWatch() {

    return(
        <Box w="100%" h="100%" bg={["none","none","none","var(--bg-governance-box)"]} boxShadow={`1px 2px 12px 3px var(--shadow)`} borderRadius="12px" m="0px 0px" p={["0px 0px","0px 0px","10px 00px","30px 30px"]} mt="0px" >
                    <Text fontSize={["12px","12px","20px","20px"]} fontWeight="600" ml={["20px","20px","20px","0px"]} mb={["20px","20px","20px","40px"]}>People also watch</Text>
                    <Flex w="100%" display={["none","none","none","flex"]} mx="auto" overflow="hidden" overflowX="scroll" className="scroll">
                        <Boxs />
                        <Boxs />
                        <Boxs />
                        <Boxs />
                    </Flex>
                    <Flex display={["flex","flex","flex","none"]} overflowX="scroll" className="scroll" pb="10px" >  
                                <Box w={["160px","160px","160px","270px"]} minWidth="160px" mr={["10px !important","10px !important","20px !important","10px !important"]} p={["10px 10px","10px 10px","10px 10px","10px 20px"]} mx="auto" border="1px solid var(--box_border)" borderRadius="12px" bg="var(--inputs)">
                                    <Flex justify="space-between" align="start">
                                        <Flex align="center">
                                            <Image boxSize={["16px","16px","18px","28px"]} src="/nervos.png" mr="10px"/>
                                            <Box>
                                                <Text fontSize={["9px","9px","10px","14px"]}>Nervos</Text>
                                                <Text fontSize={["8px","8px","9px","12px"]}  color="var(--text-grey)">$ 0.00348</Text>
                                            </Box>
                                        </Flex>
                                        <Text fontSize={["8px","8px","10px","12px"]} color="green">+2.41%</Text>
                                    </Flex>    
                                    <Image mt={["10px","10px","10px","20px"]} src="/sparkline.png" w={["90%","90%","90%","100%"]}/>      
                                </Box>
                                <Box w={["160px","160px","160px","270px"]} minWidth="160px" mr={["10px !important","10px !important","20px !important","10px !important"]} p={["10px 10px","10px 10px","10px 10px","10px 20px"]} mx="auto" border="1px solid var(--box_border)" borderRadius="12px" bg="var(--inputs)">
                                    <Flex justify="space-between" align="start">
                                        <Flex align="center">
                                            <Image boxSize={["16px","16px","18px","28px"]} src="/nervos.png" mr="10px"/>
                                            <Box>
                                                <Text fontSize={["9px","9px","10px","14px"]}>Nervos</Text>
                                                <Text fontSize={["8px","8px","9px","12px"]}  color="var(--text-grey)">$ 0.00348</Text>
                                            </Box>
                                        </Flex>
                                        <Text fontSize={["8px","8px","10px","12px"]} color="green">+2.41%</Text>
                                    </Flex>    
                                    <Image mt={["10px","10px","10px","20px"]} src="/sparkline.png" w={["90%","90%","90%","100%"]}/>      
                                </Box>
                                <Box w={["160px","160px","160px","270px"]} minWidth="160px" mr={["10px !important","10px !important","20px !important","10px !important"]} p={["10px 10px","10px 10px","10px 10px","10px 20px"]} mx="auto" border="1px solid var(--box_border)" borderRadius="12px" bg="var(--inputs)">
                                    <Flex justify="space-between" align="start">
                                        <Flex align="center">
                                            <Image boxSize={["16px","16px","18px","28px"]} src="/nervos.png" mr="10px"/>
                                            <Box>
                                                <Text fontSize={["9px","9px","10px","14px"]}>Nervos</Text>
                                                <Text fontSize={["8px","8px","9px","12px"]}  color="var(--text-grey)">$ 0.00348</Text>
                                            </Box>
                                        </Flex>
                                        <Text fontSize={["8px","8px","10px","12px"]} color="green">+2.41%</Text>
                                    </Flex>    
                                    <Image mt={["10px","10px","10px","20px"]} src="/sparkline.png" w={["90%","90%","90%","100%"]}/>      
                                </Box>
                                <Box w={["160px","160px","160px","270px"]} minWidth="160px" mr={["10px !important","10px !important","20px !important","10px !important"]} p={["10px 10px","10px 10px","10px 10px","10px 20px"]} mx="auto" border="1px solid var(--box_border)" borderRadius="12px" bg="var(--inputs)">
                                    <Flex justify="space-between" align="start">
                                        <Flex align="center">
                                            <Image boxSize={["16px","16px","18px","28px"]} src="/nervos.png" mr="10px"/>
                                            <Box>
                                                <Text fontSize={["9px","9px","10px","14px"]}>Nervos</Text>
                                                <Text fontSize={["8px","8px","9px","12px"]}  color="var(--text-grey)">$ 0.00348</Text>
                                            </Box>
                                        </Flex>
                                        <Text fontSize={["8px","8px","10px","12px"]} color="green">+2.41%</Text>
                                    </Flex>    
                                    <Image mt={["10px","10px","10px","20px"]} src="/sparkline.png" w={["90%","90%","90%","100%"]}/>      
                                </Box>
                                <Box w={["160px","160px","160px","270px"]} minWidth="160px" mr={["10px !important","10px !important","20px !important","10px !important"]} p={["10px 10px","10px 10px","10px 10px","10px 20px"]} mx="auto" border="1px solid var(--box_border)" borderRadius="12px" bg="var(--inputs)">
                                    <Flex justify="space-between" align="start">
                                        <Flex align="center">
                                            <Image boxSize={["16px","16px","18px","28px"]} src="/nervos.png" mr="10px"/>
                                            <Box>
                                                <Text fontSize={["9px","9px","10px","14px"]}>Nervos</Text>
                                                <Text fontSize={["8px","8px","9px","12px"]}  color="var(--text-grey)">$ 0.00348</Text>
                                            </Box>
                                        </Flex>
                                        <Text fontSize={["8px","8px","10px","12px"]} color="green">+2.41%</Text>
                                    </Flex>    
                                    <Image mt={["10px","10px","10px","20px"]} src="/sparkline.png" w={["90%","90%","90%","100%"]}/>      
                                </Box>
                            </Flex>
                </Box>
    )
}