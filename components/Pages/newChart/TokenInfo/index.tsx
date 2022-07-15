import React, { useEffect, useState, useRef } from 'react'
import { ChakraProvider, Link, ColorModeProvider, useColorModeValue,Icon, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import {
    formatAmount,
    getTokenFormattedPrice,
    getTokenPercentage,
    getFormatedAmount,
    formatName
} from '../../../../helpers/formaters'
import styles from './TokenInfo.module.scss'
import {Shield, Globe, Eye } from "react-feather"
import {CheckIcon} from "@chakra-ui/icons"
import { InfoOutlineIcon} from "@chakra-ui/icons"

const TokenInfo = ({ price24hLow, price24hHigh, baseAsset, setSelectorInfo, selectorInfo, totalScore }) => {
    console.log(baseAsset)
    const [ infoMarket, setInfoMarket] = useState(false)
    const [ infoVolume, setInfoVolume] = useState(false)
    const [ infoFully, setInfoFully] = useState(false)
    const [ infoCirculating, setInfoCirculating] = useState(false)
    
    return (
        <Flex pt="0px" justify="center" align="center" borderRadius="12px" w="100%" boxShadow={["none", "none", "none", `1px 2px 12px 3px var(--shadow)`]} bg={["none", "none", "none", "var(--bg-governance-box)"]} direction="column" h="100%"  className={styles["chart-box"]}>
            {/* Top lane */}
            <Flex px={["0px","0px","0px","15px"]} fontFamily="Inter" w="100%" mb="10px" justify="space-between" mt={["10px","10px","-12px","-0px"]}>
                {/* Token Name / logo Box */}
                <Flex align="center">
                    <Image mr={["8px", "8px", "15px", "15px"]} src={baseAsset.logo} h={["32px", "32px", "38px", "48px"]} />
                    <Box>
                        <Flex align="center">
                            <Box mr={["8px", "8px", "15px", "15px"]} fontSize={["15px", "15px", "24px", "24px"]} whiteSpace="pre-wrap" >{baseAsset.name}</Box>
                            <Box border="1px solid grey" borderRadius="6px" px={["3px", "3px", "5px", "5px"]} fontSize={["9px", "9px", "12px", "12px"]} mr="10px">{baseAsset.symbol}</Box>
                        </Flex>
                        {totalScore !== 0 && (
                            <Text display={["none", "none", "none", "flex"]} opacity=".6" fontSize={["9px", "9px", "12px", "12px"]}>
                                DAO Score : {totalScore} /20
                            </Text>
                        )}
                        <Link href="/">
                            <Text display={["flex", "flex", "flex", "none"]} opacity=".6" fontSize={["9px", "9px", "12px", "12px"]}>Top 100 {">"} {baseAsset.name}</Text>
                        </Link>
                    </Box>
                </Flex>
                {/* Website / Chat / Kyc / Audit / Infos  */}
                <Flex align="center" display={["none", "none", "none", "flex"]} className={styles["auditContainer"]} ml="15px">
                    <Link target="_blank" mt="8px" href={baseAsset.website} _focus={{ boxShadow: "none" }} color={selectorInfo === "Website" ? "white" : "none"} onClick={() => setSelectorInfo("Website")} mr="6px"  fontSize="12px" _hover={{ textDecoration: "none" }}>
                        <Flex direction="column" borderRadius="6px" py={["5px"]} w="60px" align="center" justify="center" _hover={{background:"blue"}}>
                            <Flex align="center" ><Text mb="3px" mr="6px">Website </Text></Flex>
                          
                        </Flex>
                    </Link>
                    {baseAsset.audit ?
                        <Link target="_blank" mt="8px" href={baseAsset.audit} borderRadius="6px" _focus={{ boxShadow: "none" }} color={selectorInfo === "Audit" ? "white" : "none"} onClick={() => setSelectorInfo("Audit")} mr="6px" fontSize="12px" _hover={{ textDecoration: "none" }}>
                            <Flex direction="column"  borderRadius="6px" py={["5px"]} w="60px" align="center" justify="center" _hover={{background:"blue"}}>
                            <Flex align="center" ><Text mb="3px" mr="6px">Audit </Text><CheckIcon boxSize="9px" color="green" mb="3px"/></Flex>
                               
                            </Flex>
                        </Link> : <></>
                    }
                    {baseAsset.kyc ?
                        <Link  target="_blank" mt="8px" href={baseAsset.kyc} borderRadius="6px"  _focus={{ boxShadow: "none" }} color={selectorInfo === "KYC" ? "white" : "none"} onClick={() => setSelectorInfo("KYC")} mr="6px" fontSize="12px" _hover={{ textDecoration: "none" }}>
                            <Flex direction="column" borderRadius="6px" w="60px" py={["5px"]} align="center" justify="center" _hover={{background:"blue"}}>
                                <Flex align="center" ><Text mb="3px" mr="6px">KYC </Text><CheckIcon boxSize="9px" color="green" mb="3px"/></Flex>
                              
                            </Flex>
                        </Link> : <></>
                    }
                </Flex>
                {/* Price info */}
                <Flex direction="column" align="center" justify="center" ml="20px">
                    {/* Price / Percentage */}
                    <Flex align="center" mb={["2px","2px","2px","0px"]}>
                        <Text mr={["", "", "", "10px"]} fontSize={["16px", "16px", "24px", "24px"]}>{getTokenFormattedPrice(baseAsset.price, '$', { justify: 'right', marginTop: 'auto' })}</Text>
                        <Text color={getTokenPercentage(baseAsset.price_change_24h) > 0 ? "green" : "red"} ml={["10px", "", "", ""]} fontSize={"12px"}>{getTokenPercentage(baseAsset.price_change_24h) > 0 ? `+${getTokenPercentage(baseAsset.price_change_24h)}` : getTokenPercentage(baseAsset.price_change_24h)}%</Text>
                    </Flex>
                    {/* Progress bar */}
                    <Flex direction="column" w="100%">
                        <Flex h={["3px", "3px", "5px", "5px"]} w="100%" bg="#87878720" borderRadius="8px">
                            <Box bg={getTokenPercentage(baseAsset.price_change_24h) > 0 ? "green" : "red"} h="100%" w={((baseAsset.price - price24hLow) / (price24hHigh - price24hLow)) * 100 + "%"} borderRadius="8px"></Box>
                        </Flex>
                        <Flex mt={["3px"]} justify="space-between" fontWeight="300">
                            <Text fontSize={["8px", "8px", "9px", "9px"]}>Low ${getFormatedAmount(price24hLow)}</Text>
                            <Text fontSize={["8px", "8px", "9px", "9px"]}>High ${getFormatedAmount(price24hHigh)}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            {
                baseAsset.description !== "" && (
                    <Flex display={selectorInfo === "Infos" ? "flex" : "none"} ml="80px" maxWidth="950px" mb="40px">
                        <Text fontSize="13px">{baseAsset.description}</Text>
                    </Flex>
                )
            }
            <Flex display={["flex","flex","flex","none"]} boxShadow="1px 2px 12px 3px var(--shadow)" justify={["space-between","space-around","space-around","space-between"]} w="100%" p="20px" mt="10px" bg="var(--bg-governance-box)" borderRadius="8px">
                <Box >
                    <Text fontSize={["9px","9px","12px","12px"]} color="var(--text-grey)">Marketcap</Text>
                    <Text fontSize={["11px","11px","14px","14px"]}>${baseAsset.market_cap}<Box as="span" color="green" ml="10px">+2%</Box></Text>
                    <Text fontSize={["9px","9px","12px","12px"]} mt="10px" color="var(--text-grey)">Volume (24H)</Text>
                    <Text fontSize={["11px","11px","14px","14px"]}>${baseAsset.volume} <Box as="span" color="green" ml="10px">+2%</Box></Text>
                </Box>
                <Box>
                    <Text fontSize={["9px","9px","12px","12px"]} color="var(--text-grey)">Circulating supply</Text>
                    <Text fontSize={["11px","11px","14px","14px"]}>${baseAsset.circulating_supply}</Text>
                    <Text fontSize={["9px","9px","12px","12px"]} mt="10px" color="var(--text-grey)">Fully dilluted Marketcap</Text>
                    <Text fontSize={["11px","11px","14px","14px"]}>${baseAsset.market_cap_diluted}</Text>
                </Box>
            </Flex>
            
            {/* Bot lane */}
            <Flex display={["none", "none", "none", "flex"]} mt="10px" px="20px" fontFamily="Inter" w="100%" justify="space-between" >
                <Box p="10px" w="22%" borderRadius="8px" bg="var(--gradient_airdrop)" position="relative">
                    <Icon as={InfoOutlineIcon} cursor="pointer" boxSize="12px" top="10px" right="10px" color="var(--text-grey)" position="absolute"  
                    onMouseEnter={() => setInfoMarket(true)}
                    onMouseLeave={() => setInfoMarket(false)} />
                    {!infoMarket ? (
                        <>
                            <Flex align="center" mb={["", "", "", "10px"]} >
                                <Text fontSize="10px" mr="10px">Market cap</Text>
                                {/* <Text fontSize="12px" color="green">????%</Text> */}
                            </Flex>
                            <Text whiteSpace="nowrap" fontSize="14px">${formatAmount(baseAsset.market_cap)}</Text>
                        </>
                    ) : ( 
                        <Text fontSize="10px" mr="20px">Hey salut à tous les amis c'est David Lafarge Pokemon</Text>
                    )} 
                   
                </Box>
                <Box p="10px" w="22%" borderRadius="8px" bg="var(--gradient_airdrop)" position="relative">
                    <Icon as={InfoOutlineIcon} cursor="pointer" boxSize="12px" top="10px" right="10px" color="var(--text-grey)" position="absolute"
                    onMouseEnter={() => setInfoFully(true)}
                    onMouseLeave={() => setInfoFully(false)} />
                    {!infoFully ? (
                        <>
                            <Flex align="center" mb={["", "", "", "10px"]}>
                                <Text fontSize="10px" mr="10px">Fully Dilluted</Text>
                            {/* <Text fontSize="12px" color="red">?????%</Text> */}
                            </Flex>
                            <Text whiteSpace="nowrap" fontSize="14px">${formatAmount(baseAsset.market_cap_diluted)}</Text>
                        </>
                    ) : (
                        
                        <Text fontSize="10px" mr="20px">Hey salut à tous les amis c'est David Lafarge Pokemon</Text>
                    )}
                    
                </Box>
                <Box p="10px" w="22%" borderRadius="8px" bg="var(--gradient_airdrop)" position="relative"> 
                    <Icon as={InfoOutlineIcon} cursor="pointer" boxSize="12px" top="10px" right="10px" color="var(--text-grey)" position="absolute" 
                    onMouseEnter={() => setInfoVolume(true)}
                    onMouseLeave={() => setInfoVolume(false)} />
                     {!infoVolume ? (
                        <>
                            <Flex align="center" mb={["", "", "", "10px"]}>
                                <Text fontSize="10px" mr="10px">24h Volume</Text>
                                {/* <Text fontSize="12px" color="green">????%</Text> */}
                            </Flex>
                            <Text whiteSpace="nowrap" fontSize="14px">${formatAmount(baseAsset.volume)}</Text>
                        </>
                    ) : (
                        <Text fontSize="10px" mr="20px">Hey salut à tous les amis c'est David Lafarge Pokemon</Text>
                    )}
                </Box>
                <Box p="10px" w="22%" borderRadius="8px" bg="var(--gradient_airdrop)" position="relative">
                    <Icon as={InfoOutlineIcon} boxSize="12px" cursor="pointer" top="10px" right="10px" color="var(--text-grey)" position="absolute" 
                    onMouseEnter={() => setInfoCirculating(true)}
                    onMouseLeave={() => setInfoCirculating(false)} />
                    {!infoCirculating ? (
                        <>
                          <Flex align="center" mb={["", "", "", "10px"]}>
                            <Text fontSize="10px" mr="10px">Circulating supply</Text>
                          </Flex>
                          <Text whiteSpace="nowrap" fontSize="14px">{formatAmount(baseAsset.circulating_supply)}</Text>
                        </>
                    ) : (
                        <Text fontSize="10px" mr="20px">Hey salut à tous les amis c'est David Lafarge Pokemon</Text>
                    )}
                  
                </Box>
            </Flex>
        </Flex >
    )
}

export default TokenInfo;