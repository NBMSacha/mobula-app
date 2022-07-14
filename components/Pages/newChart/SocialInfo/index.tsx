import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import Contract from "../../../Utils/Contract"
import { formatAmount } from '../../../../helpers/formaters'
export default function SocialInfo({baseAsset}) {
  
    return(
        <Flex direction={["column-reverse","column-reverse","column-reverse","column"]} justify={["center","center","auto","auto"]} p={["10px 20px","10px 20px","10px 30px","30px 40px"]} bg="var(--bg-governance-box)" boxShadow="1px 2px 13px 3px var(--shadow)" mt="0px" h="100%" borderRadius="12px" whiteSpace="nowrap">
            <Flex mb={["0px","0px","0px","40px"]} wrap="wrap" justify={["center","center","space-around","space-around"]} w="100%" maxHeight={["50px","50px","50px","100px" ]}overflowY="scroll" className="scroll">
                        {baseAsset.contracts.map((contract: string, idx: number) => {
                            return (
                                <Contract contract={contract} blockchain={baseAsset.blockchains[idx]} />
                            )
                        })}
                    </Flex>
            <Text fontSize={["10px","10px","12px","15px"]} mt={["0px","0px","0px","0px"]} mb={["0px","0px","0px","40px"]} color="var(--text-grey)" mr="30px" whiteSpace="pre-wrap" >{baseAsset.description}</Text>
            <Flex overflowX="scroll" whiteSpace="nowrap" mb={["0px","0px","0px","10px"]} mt="0px" className="scroll">
                <Box mr="25px" whiteSpace="nowrap" mb="10px">
                    <Text mb={["0px","0px","8px","8px"]} fontSize={["9px","9px","12px","14px"]} color="var(--text-grey)">Telegram members</Text>
                    <Text textAlign="start" fontSize={["11px","11px","13px","16px"]}>3088</Text>
                </Box>
                <Box mr="25px" whiteSpace="nowrap" mb="10px">
                    <Text mb={["0px","0px","8px","8px"]} fontSize={["9px","9px","12px","14px"]} color="var(--text-grey)">Telegram online users</Text>
                    <Text textAlign="start" fontSize={["11px","11px","13px","16px"]} color="green">1024</Text>
                </Box>
                <Box mr="25px" whiteSpace="nowrap" mb="10px">
                    <Text mb={["0px","0px","8px","8px"]} fontSize={["9px","9px","12px","14px"]} color="var(--text-grey)">Twitter followers</Text>
                    <Text textAlign="start" fontSize={["11px","11px","13px","16px"]}>2048</Text>
                </Box>
                <Box mr="25px" whiteSpace="nowrap" mb="10px">
                    <Text mb={["0px","0px","8px","8px"]} fontSize={["9px","9px","12px","14px"]} color="var(--text-grey)">Tweets</Text>
                    <Text textAlign="start" fontSize={["11px","11px","13px","16px"]}>112</Text>
                </Box>
            </Flex>
            <Flex align="center" mt={["0px","0px","0px","20px"]} overflowX="scroll" pb="10px" className="scroll">
                {baseAsset.twitter !== "" ? (
                    <Link href={baseAsset.chat} target="_blank" _hover={{ textDecoration: "none" }}>
                        <Flex minWidth="60px" whiteSpace="nowrap" align="center" mr="20px" color="var(--text-grey)">
                            <Image mr="5px" boxSize="20px" src="/tlg.png" />
                            <Text fontSize={["9px","9px","11px","14px"]}>Telegram</Text>
                        </Flex>
                    </Link>
                ) : (
                    <></>
                )}
                {baseAsset.twitter !== "" ? (
                    <Link href={baseAsset.twitter} target="_blank" _hover={{ textDecoration: "none" }}>
                        <Flex minWidth="60px" whiteSpace="nowrap" align="center" mr="20px" color="var(--text-grey)">
                            <Image mr="5px" boxSize="20px" src="/twt.png" />
                            <Text fontSize={["9px","9px","11px","14px"]}>Twitter</Text>
                        </Flex>
                    </Link>
                ) : (
                    <></>
                )}
                {baseAsset.website !== "" ? (
                    <Link href={baseAsset.website} target="_blank" _hover={{ textDecoration: "none" }}>
                        <Flex minWidth="60px" whiteSpace="nowrap" align="center" mr="20px" color="var(--text-grey)" >
                            <Image mr="5px" boxSize="20px" src="/webs.png" />
                            <Text fontSize={["9px","9px","11px","14px"]}>Website</Text>
                        </Flex>
                    </Link>
                ) : (
                    <></>
                )}
                <Link href='https://discord.gg/2a8hqNzkzN' target="_blank" _hover={{ textDecoration: "none" }}>
                    <Text fontSize={["9px","9px","11px","14px"]} color="red" whiteSpace="nowrap">A problem ? Report to the DAO</Text>
                </Link>
               
            </Flex>
        </Flex>
    )
}