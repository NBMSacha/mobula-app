import { Flex, Box, Text } from "@chakra-ui/react"
import { CircularProgress } from "@chakra-ui/react"
export default function DaoScoreMobile({baseAsset, Uvalue, Tvalue, Svalue, Mvalue, totalScore}) {
     return (
                <>
                            <Text fontWeight="600" fontSize={["11px","11px","14px"]} m={["5px 10px","10px 20px 0px 20px","15px 20px -15px 20px","8px"]}>DAO Score</Text>
                            <Text fontSize={["11px","11px","14px"]} m={["0px 20px"]}>Total <Box as="span" color={totalScore > 10 ? "green" : totalScore > 0 ? "red" : "none"}>{totalScore > 0 ? totalScore : "--"}</Box>/20</Text>
                            <Flex direction={["column","column","row","row"]} wrap="wrap" justify="center" align="center" p={["10px " ,"25px " ,"10px " ,"10px " ]} w="100%" h={["auto","auto","120px","120px"]}> 
                                <Flex align="center"  mt="0px" w={["100%","100%","50%","50%"]} mx="auto">
                                    {/* @ts-ignore */}
                                    <CircularProgress mr={["5px","8px","8px","15px"]} size={["20px","20px","24px"]} color={baseAsset.utility_score < 3 ? "red" : "green"} value={Uvalue} />
                                    <Flex display={["flex","none","none"]} direction="column" align="center" justify="center" w="100%">
                                         <Box as="span" fontSize="10px" color="var(--text-grey)">{baseAsset.utility_score > 0 ? baseAsset.utility_score : "-"}/5</Box><Text fontSize="10px"> Utility</Text>
                                    </Flex>
                                    <Flex display={["none","flex","flex","flex"]}>
                                        <Text fontSize="10px"><Box as="span" fontSize="10px" color="var(--text-grey)">{baseAsset.utility_score > 0 ? baseAsset.utility_score : "-"}/5</Box> Utility</Text>
                                    </Flex>
                                </Flex>
                                <Flex align="center" mt={["15px","15px","0px","15px"]} w={["100%","100%","48%","48%"]}>
                                    {/* @ts-ignore */}
                                    <CircularProgress mr={["5px","8px","8px","15px"]} size={["20px","20px","24px"]} color={baseAsset.social_score < 3 ? "red" : "green"} value={Svalue} />
                                    <Flex display={["flex","none","none"]} direction="column" align="center" justify="center" w="100%">
                                        <Box fontSize="10px" as="span" color="var(--text-grey)">{baseAsset.social_score > 0 ? baseAsset.social_score : "-"}/5</Box> <Text fontSize="10px"> Social</Text>
                                    </Flex>
                                    <Flex display={["none","flex","flex","flex"]}>
                                        <Text fontSize="10px"><Box as="span" color="var(--text-grey)">{baseAsset.social_score > 0 ? baseAsset.social_score : "-"}/5</Box> Social</Text>
                                    </Flex>
                                </Flex>
                                <Flex align="center" mt="15px" w={["100%","100%","50%","50%"]}>
                                    {/* @ts-ignore */}
                                    <CircularProgress mr={["5px","8px","8px","15px"]} size={["20px","20px","24px"]} color={baseAsset.trust_score < 3 ? "red" : "green"}  value={Tvalue} />
                                    <Flex display={["flex","none","none"]} direction="column" align="center" justify="center" w="100%">
                                    <Box as="span" fontSize="10px" color="var(--text-grey)">{baseAsset.trust_score > 0 ? baseAsset.trust_score : "-"}/5</Box><Text fontSize="10px"> Security</Text>
                                    </Flex>
                                    <Flex display={["none","flex","flex","flex"]}>
                                        <Text fontSize="10px"><Box as="span" color="var(--text-grey)">{baseAsset.trust_score > 0 ? baseAsset.trust_score : "-"}/5</Box> Security</Text>
                                    </Flex>
                                </Flex>
                                <Flex align="center" mt="15px" w={["100%","100%","50%","50%"]}>
                                    {/* @ts-ignore */}
                                    <CircularProgress mr={["5px","8px","8px","15px"]} size={["20px","20px","24px"]} color={baseAsset.market_score < 3 ? "red" : "green"} value={Mvalue} />
                                    <Flex display={["flex","none","none"]} direction="column" align="center" justify="center" w="100%">
                                    <Box as="span" fontSize="10px" color="var(--text-grey)">{baseAsset.market_score > 0 ? baseAsset.market_score : "-"}/5</Box> <Text fontSize="10px"> Market</Text>
                                    </Flex>
                                    <Flex display={["none","flex","flex","flex"]}>
                                        <Text fontSize="10px"><Box as="span" color="var(--text-grey)">{baseAsset.market_score > 0 ? baseAsset.market_score : "-"}/5</Box> Market</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </>
     )
}