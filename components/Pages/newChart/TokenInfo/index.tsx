import React, { useEffect, useState, useRef } from 'react'
import { ChakraProvider, Link, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import {
    formatAmount,
    getTokenFormattedPrice,
    getTokenPercentage,
    getClosest,
    getUrlFromName,
    getFormatedAmount
} from '../../../../helpers/formaters'
import {
    Progress,
    ProgressLabel,
    CircularProgress,
    CircularProgressLabel,
} from "@chakra-ui/react"
import { ProgressBar } from 'react-bootstrap';
import styles from './TokenInfo.module.scss'

const TokenInfo = ({ price24hLow, price24hHigh, baseAsset, setSelectorInfo, selectorInfo, totalScore }) => {
    console.log(baseAsset)
    return (
        <Flex pt="0px" justify="center" align="center" borderRadius="15px" w="100%" boxShadow={["none", "none", "none", `1px 2px 12px 3px var(--shadow)`]} bg={["none", "none", "none", "var(--bg-governance-box)"]} direction="column" h="100%" px={["0px", "0px", "20px", "20px"]}>
            {/* Top lane */}
            <Flex px="20px" fontFamily="Inter" w="100%" mb="30px" justify="space-between" mt={["10px","10px","-12px","-12px"]}>
                {/* Token Name / logo Box */}
                <Flex align="center">
                    <Image mr={["8px", "8px", "15px", "15px"]} src={baseAsset.logo} h={["32px", "32px", "38px", "48px"]} />
                    <Box>
                        <Flex align="center">
                            <Text mr={["8px", "8px", "15px", "15px"]} fontSize={["15px", "15px", "30px", "30px"]} whiteSpace="pre-wrap" >{baseAsset.name}</Text>
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
                <Flex align="center" display={["none", "none", "none", "flex"]}>
                    <Link target="_blank" href={baseAsset.website} borderRadius="6px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none" }} color={selectorInfo === "Website" ? "white" : "none"} onClick={() => setSelectorInfo("Website")} mr="6px" bg={selectorInfo === "Website" ? "blue" : "var(--btnInfo)"} fontSize="12px" _hover={{ textDecoration: "none" }}>
                        <Flex borderRadius="6px" p={["", "", "", "4px 6px"]}>Website</Flex>
                    </Link>
                    {baseAsset.audit ?
                        <Link target="_blank" href={baseAsset.audit} borderRadius="6px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none" }} color={selectorInfo === "Audit" ? "white" : "none"} onClick={() => setSelectorInfo("Audit")} bg={selectorInfo === "Audit" ? "blue" : "var(--btnInfo)"} mr="6px" fontSize="12px" _hover={{ textDecoration: "none" }}>
                            <Flex borderRadius="6px" p={["", "", "", "4px 6px"]}>Audit</Flex>
                        </Link> : <></>
                    }
                    {baseAsset.chat.length > 0 ?
                        <Link target="_blank" href={baseAsset.chat} borderRadius="6px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none" }} color={selectorInfo === "Audit" ? "white" : "none"} onClick={() => setSelectorInfo("Audit")} bg={selectorInfo === "Audit" ? "blue" : "var(--btnInfo)"} mr="6px" fontSize="12px" _hover={{ textDecoration: "none" }}>
                            <Flex borderRadius="6px" p={["", "", "", "4px 6px"]}>Chat</Flex>
                        </Link> : <></>
                    }
                    {baseAsset.kyc ?
                        <Link target="_blank" href={baseAsset.kyc} borderRadius="6px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none" }} color={selectorInfo === "KYC" ? "white" : "none"} onClick={() => setSelectorInfo("KYC")} bg={selectorInfo === "KYC" ? "blue" : "var(--btnInfo)"} mr="6px" fontSize="12px" _hover={{ textDecoration: "none" }}>
                            <Flex borderRadius="6px" p={["", "", "", "4px 6px"]}>KYC</Flex>
                        </Link> : <></>
                    }
                    {baseAsset.description !== "" && (
                        <Link borderRadius="6px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none" }} onClick={() => { if (selectorInfo !== "Infos") { setSelectorInfo("Infos") } else { setSelectorInfo("") } }} color={selectorInfo === "Infos" ? "white" : "none"} bg={selectorInfo === "Infos" ? "blue" : "var(--btnInfo)"} mr="6px" fontSize="12px" _hover={{ textDecoration: "none" }}>
                            <Flex borderRadius="6px" p={["", "", "", "4px 6px"]}>Infos</Flex>
                        </Link>
                    )}
                </Flex>
                {/* Price info */}
                <Flex direction="column" align="center" justify="center" ml="20px">
                    {/* Price / Percentage */}
                    <Flex align="center">
                        <Text mr={["", "", "", "10px"]} fontSize={["16px", "16px", "30px", "30px"]}>{getTokenFormattedPrice(baseAsset.price, '$', { justify: 'right', marginTop: 'auto' })}</Text>
                        <Text color={getTokenPercentage(baseAsset.price_change_24h) > 0 ? "green" : "red"} ml={["10px", "", "", ""]} fontSize={"12px"}>{getTokenPercentage(baseAsset.price_change_24h) > 0 ? `+${getTokenPercentage(baseAsset.price_change_24h)}` : getTokenPercentage(baseAsset.price_change_24h)}%</Text>
                    </Flex>
                    {/* Progress bar */}
                    <Flex direction="column" w="100%">
                        <Flex h={["3px", "3px", "5px", "5px"]} w="100%" bg="#87878720" borderRadius="8px">
                            <Box bg={getTokenPercentage(baseAsset.price_change_24h) > 0 ? "green" : "red"} h="100%" w={((baseAsset.price - price24hLow) / (price24hHigh - price24hLow)) * 100 + "%"} borderRadius="8px"></Box>
                        </Flex>
                        <Flex mt="3px" justify="space-between" fontWeight="300">
                            <Text fontSize={["8px", "8px", "9px", "9px"]}>Low: ${getFormatedAmount(price24hLow)}</Text>
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
            <Flex display={["flex","flex","flex","none"]} justify="space-between" w="100%" p="20px" mt="-10px" bg="var(--bg-governance-box)" borderRadius="8px">
                <Box>
                    <Text fontSize="9px" color="var(--text-grey)">Marketcap</Text>
                    <Text fontSize="11px">${baseAsset.market_cap}<Box as="span" color="green" ml="10px">+2%</Box></Text>
                    <Text fontSize="9px" mt="10px" color="var(--text-grey)">Volume (24H)</Text>
                    <Text fontSize="11px">${baseAsset.volume} <Box as="span" color="green" ml="10px">+2%</Box></Text>
                </Box>
                <Box>
                    <Text fontSize="9px" color="var(--text-grey)">Circulating supply</Text>
                    <Text fontSize="11px">${baseAsset.circulating_supply}</Text>
                    <Text fontSize="9px" mt="10px" color="var(--text-grey)">Fully dilluted Marketcap</Text>
                    <Text fontSize="11px">${baseAsset.market_cap_diluted}</Text>
                </Box>
            </Flex>
            
            {/* Bot lane */}
            <Flex display={["none", "none", "none", "flex"]} px="20px" fontFamily="Inter" w="100%" justify="space-between" >
                <Box>
                    <Flex align="center" mb={["", "", "", "15px"]}>
                        <Text fontSize="10px" mr="10px">Market cap</Text>
                        {/* <Text fontSize="12px" color="green">????%</Text> */}
                    </Flex>
                    <Text>${formatAmount(baseAsset.market_cap)}</Text>
                </Box>
                <Box>
                    <Flex align="center" mb={["", "", "", "15px"]}>
                        <Text fontSize="10px" mr="10px">Fully Dilluted</Text>
                        {/* <Text fontSize="12px" color="red">?????%</Text> */}
                    </Flex>
                    <Text>${formatAmount(baseAsset.market_cap_diluted)}</Text>
                </Box>
                <Box>
                    <Flex align="center" mb={["", "", "", "15px"]}>
                        <Text fontSize="10px" mr="10px">24h Volume</Text>
                        {/* <Text fontSize="12px" color="green">????%</Text> */}
                    </Flex>
                    <Text>${formatAmount(baseAsset.volume)}</Text>
                </Box>
                <Box>
                    <Flex align="center" mb={["", "", "", "15px"]}>
                        <Text fontSize="10px" mr="10px">Circulating supply</Text>
                    </Flex>
                    <Text>{formatAmount(baseAsset.circulating_supply)}</Text>
                </Box>
            </Flex>
        </Flex >
    )
}

export default TokenInfo;