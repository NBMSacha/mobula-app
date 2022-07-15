import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import Contract from "../../../Utils/Contract"
import {useState,useEffect} from "react"
import { formatAmount, formatName } from '../../../../helpers/formaters'
import { supportedRPCs } from '../../../../constants';
import { getBlockchainFromContract } from '../../../../helpers/blockchain';
import { CheckCircle, Copy } from 'react-feather';

export default function SocialInfo({baseAsset}) {
    const [copied, setCopied] = useState(false);
    
    return(
        <Flex direction={["column-reverse","column-reverse","column-reverse","column"]} justify={["center","center","auto","auto"]} p={["10px 20px","10px 20px","10px 30px","30px 40px"]} bg="var(--bg-governance-box)" boxShadow="1px 2px 13px 3px var(--shadow)" mt="0px" h="100%" borderRadius="12px" whiteSpace="nowrap">


          
            <Flex mt={["15px","15px","10px",""]} mb={["0px","0px","0px","30px"]} justify={["center","center","space-around","space-around"]} w="100%" ml="auto !important" overflowX="scroll" whiteSpace="nowrap" className="scroll">
                        {baseAsset.contracts.map((contract: string, idx: number) => {
                            useEffect(() => {
                                if (!baseAsset.blockchains[idx]) {
                                    getBlockchainFromContract(contract).then((r: any) => {
                                        baseAsset.blockchains[idx] = r;
                                    })
                                }
                            }, [])
                            return (
                                
                                <Flex
                                mr="20px !important"
                                    align="center"
                                    position="relative"
                                    justify="left"
                                    border="1px solid var(--box_border)"
                                    minWidth={["135px", "135px", "181px", "181px"]}
                                    bg="var(--contract)"
                                  
                                    mx={["auto", "auto", "auto", "0px"]}
                                    p={["3px 2px","3px 2px","0px 2px","0px 10px"]}
                                    boxShadow="1px 2px 13px 3px var(--shadow)"
                                    borderRadius={["6px", "6px", '10px', '10px']}
                                >
                                    {baseAsset.blockchains[idx] ? <Image width={'17px'} borderRadius="50%" height={'17px'} src={"/" + baseAsset.blockchains[idx].split(' ')[0].toLowerCase() + '.png'} ml="5px" /> : <></>
                                    }
                                    <Text onClick={() => {
                                        window.open(supportedRPCs[supportedRPCs.map(r => r.name).indexOf(baseAsset.blockchains[idx])].explorer + '/token/' + contract)
                                    }} ml="10px" py={1} fontSize={["10px", "10px", "15px", "15px"]} textAlign="center">{contract.slice(0, 6) + '...' + contract.slice(contract.length - 5, contract.length - 1)}</Text>
                                    {
                                        copied ? <CheckCircle width='17px' color='#32C784' style={{ "position": "absolute", "right": "10px" }} /> : <Copy width={'15px'} cursor="pointer" style={{ "position": "absolute", "right": "10px" }} onClick={() => {
                                            setCopied(true);
                                            navigator.clipboard.writeText(contract)
                                        }} />
                                    }
                                </Flex >
                               
                            )
                        })}
                    </Flex>
  
            <Text fontSize={["10px","10px","12px","15px"]} mt={["0px","0px","0px","0px"]} mb={["0px","0px","0px","30px"]} color="var(--text-grey)" mr="30px" whiteSpace="pre-wrap" overflowY="scroll" h={["75px","75px","75px","92px"]} className="scroll">{baseAsset.description}</Text>
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