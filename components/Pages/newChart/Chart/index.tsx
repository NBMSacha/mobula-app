import React from 'react'
import { useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'

const ChartBox = ({ unformattedBuffer, historyData, baseAsset, socialLink, selector, setSelector, setTimeFormat, timeFormat }) => {
    const border = useColorModeValue("1px solid rgba(229, 229, 229, 0.6)", "none")
    const sticky = useColorModeValue("var(--chakra-colors-bg_white)", "#171B2B")
    const bg = useColorModeValue("none", "#121626")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bgChart = useColorModeValue("#F5F5F5", "#171B2B")
    return (
        <Flex direction="column" h="100%" bg={["none", "none", "none", bgChart]} boxShadow={["none", "none", "none", `1px 2px 12px 3px ${shadow}`]} borderRadius="15px" w="100%" px={["10px", "10px", "40px", "40px"]} mt="10px" pt={["5px", "5px", "30px", "30px"]}>
            {/* TOP tools*/}
            <Flex justify="space-between">
                <Box display={["none", "none", "none", "block"]}>
                    <Text fontSize={["", "", "", "17px"]} mb={["", "", "", "30px"]}>{baseAsset.name} to USD Chart</Text>
                    <Flex fontWeight="400px" fontSize={["", "", "", "13px"]}>
                        <Button border={border} _focus={{ boxShadow: "none" }} mr="15px" w="85px" h="24px" color={selector === "price" ? "white" : "none"} bg={selector === "price" ? "blue" : socialLink} onClick={() => { setSelector("price"); }}>Price</Button>
                        <Button border={border} _focus={{ boxShadow: "none" }} mr="15px" w="85px" h="24px" color={selector === "liquidity" ? "white" : "none"} bg={selector === "liquidity" ? "blue" : socialLink} onClick={() => { setSelector("liquidity"); }}>Liquidity</Button>
                        <Button border={border} _focus={{ boxShadow: "none" }} mr="15px" w="85px" h="24px" color={selector === "volume" ? "white" : "none"} bg={selector === "volume" ? "blue" : socialLink} onClick={() => { setSelector("volume"); }}>Volume</Button>
                        <Button border={border} _focus={{ boxShadow: "none" }} mr="15px" w="85px" h="24px" color={selector === "rank" ? "white" : "none"} bg={selector === "rank" ? "blue" : socialLink} onClick={() => { setSelector("rank"); }}>Rank</Button>
                    </Flex>
                </Box>
                <Flex direction="column" align={"end"} ml={["0px", "0px", "0px", "auto"]}>

                    {(baseAsset.tracked) ? (
                        <Flex p="4px 0px" borderRadius="6px" >
                            <Button mx={["8px", "8px", "12px", "12px"]}
                                fontSize={["13px", "13px", "15px", "15px"]}
                                _focus={{ boxShadow: "none" }}
                                opacity={timeFormat === "1D" ? "1" : ".5"}
                                onClick={() => {
                                    setTimeFormat('1D')
                                }}>1D
                            </Button>
                            <Button mx={["8px", "8px", "12px", "12px"]}
                                fontSize={["13px", "13px", "15px", "15px"]}
                                _focus={{ boxShadow: "none" }}
                                opacity={timeFormat === "7D" ? "1" : ".5"}
                                onClick={() => {
                                    setTimeFormat('7D')
                                }}>7D
                            </Button>

                            {(!unformattedBuffer['price']['30D'] || unformattedBuffer['price']['30D']?.length > 0) ? (
                                <>
                                    <Button mx={["8px", "8px", "12px", "12px"]}
                                        fontSize={["13px", "13px", "15px", "15px"]}
                                        _focus={{ boxShadow: "none" }}
                                        opacity={timeFormat === "30D" ? "1" : ".5"}
                                        onClick={() => {
                                            setTimeFormat('30D')
                                        }}>1M
                                    </Button>
                                    <Button mx={["8px", "8px", "12px", "12px"]}
                                        fontSize={["13px", "13px", "15px", "15px"]}
                                        _focus={{ boxShadow: "none" }}
                                        opacity={timeFormat === "3M" ? "1" : ".5"}
                                        onClick={() => {
                                            setTimeFormat('3M')
                                        }}>3M
                                    </Button>
                                    <Button mx={["8px", "8px", "12px", "12px"]}
                                        fontSize={["13px", "13px", "15px", "15px"]}
                                        _focus={{ boxShadow: "none" }}
                                        opacity={timeFormat === "1Y" ? "1" : ".5"}
                                        onClick={() => {
                                            setTimeFormat('1Y')
                                        }}>1Y
                                    </Button>
                                    <Button mx={["8px", "8px", "12px", "12px"]}
                                        fontSize={["13px", "13px", "15px", "15px"]}
                                        _focus={{ boxShadow: "none" }}
                                        opacity={timeFormat === "ALL" ? "1" : ".5"}
                                        onClick={() => {
                                            setTimeFormat('ALL')
                                        }}>ALL
                                    </Button>
                                </>
                            ) : <></>
                            }

                        </Flex>
                    ) : <></>
                    }

                </Flex>
            </Flex>
            <Flex mt="10px" mb="10px">
                {(!baseAsset.tracked) ? (
                    <Box p="20px" mt={["0px", "0px", "50px"]} textAlign="center">
                        Market data untracked. Not enough liquidity or vol. to get trustfull data.
                    </Box>
                ) : <canvas id='chart' ></canvas>
                }
            </Flex>
            {/* <Link href='https://discord.gg/2a8hqNzkzN' mb="50px" fontSize="11px" _hover={{ textDecoration: "none" }}>
                <Text align="end" color="red" >A problem ? Report it to the DAO </Text>
            </Link> */}
        </Flex>
    )
}

export default ChartBox;