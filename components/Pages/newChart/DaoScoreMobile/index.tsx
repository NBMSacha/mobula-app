import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
export default function DaoScoreMobile({baseAsset, Uvalue, Tvalue, Svalue, Mvalue, totalScore}) {
     return (
        <>
        <Text fontWeight="600" fontSize="11px" m={["5px 10px","10px 20px 0px 20px","15px 20px 5px 20px","8px"]}>DAO Score</Text>
                            <Text fontSize="11px" m={["0px 20px"]}>Total <Box as="span" color={totalScore > 10 ? "green" : totalScore > 0 ? "red" : "none"}>{totalScore > 0 ? totalScore : "--"}</Box>/20</Text>
                            <Flex direction={["column","column","row","row"]} wrap="wrap" justify="center" align="center" p={["10px " ,"25px " ,"10px " ,"10px " ]}w="100%" h={["auto","auto","120px","120px"]}> 
                                
                                <Flex align="center" mt="0px" w={["100%","100%","48%","48%"]} mx="auto">
                                    <CircularProgress mr={["5px","15px","15px","15px"]} size="20px" color={baseAsset.utility_score < 3 ? "red" : "green"} value={Uvalue} />
                                    <Text fontSize="10px"><Box as="span" color="var(--text-grey)">{baseAsset.utility_score > 0 ? baseAsset.utility_score : "-"}/5</Box> Utility</Text>
                                </Flex>
                                <Flex align="center" mt={["15px","15px","0px","15px"]} w={["100%","100%","48%","48%"]}>
                                    <CircularProgress mr={["5px","15px","15px","15px"]} size="20px" color={baseAsset.social_score < 3 ? "red" : "green"} value={Svalue} />
                                    <Text fontSize="10px"><Box as="span" color="var(--text-grey)">{baseAsset.social_score > 0 ? baseAsset.social_score : "-"}/5</Box> Social</Text>
                                </Flex>
                                <Flex align="center" mt="15px" w={["100%","100%","48%","48%"]}>
                                    <CircularProgress mr={["5px","15px","15px","15px"]} size="20px" color={baseAsset.trust_score < 3 ? "red" : "green"}  value={Tvalue} />
                                    <Text fontSize="10px"><Box as="span" color="var(--text-grey)">{baseAsset.trust_score > 0 ? baseAsset.trust_score : "-"}/5</Box> Security</Text>
                                </Flex>
                                <Flex align="center" mt="15px" w={["100%","100%","48%","48%"]}>
                                    <CircularProgress mr={["5px","15px","15px","15px"]} size="20px" color={baseAsset.market_score < 3 ? "red" : "green"} value={Mvalue} />
                                    <Text fontSize="10px"><Box as="span" color="var(--text-grey)">{baseAsset.market_score > 0 ? baseAsset.market_score : "-"}/5</Box> Market</Text>
                                </Flex>
                            </Flex>
                            </>
     )
}