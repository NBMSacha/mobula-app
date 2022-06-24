import React, { useEffect, useState, useRef } from 'react'
import { ChakraProvider, Link, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import {
    formatAmount,
    getTokenFormattedPrice,
    getTokenPercentage,
    getClosest,
    getUrlFromName
} from '../../../../helpers/formaters'
import {
    Progress,
    ProgressLabel,
    CircularProgress,
    CircularProgressLabel,
} from "@chakra-ui/progress"
import { ProgressBar } from 'react-bootstrap';
import styles from './TokenInfo.module.scss'

const TokenInfo = ({ baseAsset, socialLink, setSelectorInfo, selectorInfo, totalScore }) => {
    console.log(baseAsset)
    return (
        <Flex pt="20px" borderRadius="15px" w="100%" boxShadow={["none", "none", "none", `1px 2px 12px 3px var(--shadow)`]} bg={["none", "none", "none", "var(--bg-governance-box)"]} direction="column" mt={["20px", "20px", "50px", "50px"]} px={["0px", "0px", "20px", "20px"]}>
            {/* Top lane */}
            <Flex px="20px" fontFamily="Inter" w="100%" justify="space-between" mb={["", "", "", "30px"]}>
                {/* Token Name / logo Box */}
                <Flex align="center">
                    <Image mr={["8px", "8px", "15px", "15px"]} src={baseAsset.logo} h={["32px", "32px", "38px", "48px"]} />
                    <Box>
                        <Flex align="center">
                            <Text mr={["8px", "8px", "15px", "15px"]} fontSize={["15px", "15px", "30px", "30px"]} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" className={styles["token-name"]}>{baseAsset.name}</Text>
                            <Box border="1px solid grey" borderRadius="6px" px={["3px", "3px", "5px", "5px"]} fontSize={["9px", "9px", "12px", "12px"]}>{baseAsset.symbol}</Box>
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
                    {baseAsset.audit ? 
                        <Link target="_blank" href={baseAsset.audit} borderRadius="6px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none" }} color={selectorInfo === "Audit" ? "white" : "none"} onClick={() => setSelectorInfo("Audit")} bg={selectorInfo === "Audit" ? "blue" : "var(--btnInfo)"} mr="6px" fontSize="12px" _hover={{ textDecoration: "none" }}>
                            <Flex borderRadius="6px" p={["", "", "", "4px 6px"]}>Audit</Flex>
                        </Link> : <></>
                    }
                    {baseAsset.kyc ? 
                        <Link target="_blank" href={baseAsset.kyc} borderRadius="6px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none" }} color={selectorInfo === "KYC" ? "white" : "none"} onClick={() => setSelectorInfo("KYC")} bg={selectorInfo === "KYC" ? "blue" : "var(--btnInfo)"} mr="6px" fontSize="12px" _hover={{ textDecoration: "none" }}>
                            <Flex borderRadius="6px" p={["", "", "", "4px 6px"]}>KYC</Flex>
                        </Link> : <></>
                    }
                    {baseAsset.description !== "" && (
                        <Link borderRadius="6px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none" }} onClick={() => { if(selectorInfo !== "Infos") {setSelectorInfo("Infos")} else {setSelectorInfo("")}}} color={selectorInfo === "Infos" ? "white" : "none"} bg={selectorInfo === "Infos" ? "blue" : "var(--btnInfo)"} mr="6px" fontSize="12px" _hover={{ textDecoration: "none" }}>
                            <Flex borderRadius="6px" p={["", "", "", "4px 6px"]}>Infos</Flex>
                        </Link>
                    )}
                </Flex>
                {/* Price info */}
                <Box >
                    {/* Price / Percentage */}
                    <Flex align="center">
                        <Text mr={["", "", "", "10px"]} fontSize={["16px", "16px", "30px", "30px"]}>{getTokenFormattedPrice(baseAsset.price, '$', { justify: 'right', marginTop: 'auto' })}</Text>
                        <Text color={getTokenPercentage(baseAsset.price_change_24h) > 0 ? "green" : "red"} ml={["10px", "", "", ""]} fontSize={"12px"}>{getTokenPercentage(baseAsset.price_change_24h) > 0 ? `+${getTokenPercentage(baseAsset.price_change_24h)}` : getTokenPercentage(baseAsset.price_change_24h)}%</Text>
                    </Flex>
                    {/* Progress bar */}
                    <ProgressBar animated variant="success" now={60} />
                </Box>
            </Flex>
            {baseAsset.description !== "" && (
                <Flex display={selectorInfo === "Infos" ? "flex" : "none"} ml="80px" maxWidth="950px" mb="40px">
                    <Text fontSize="13px">{baseAsset.description}</Text>
                </Flex>
            )}
            
            {/* Bot lane */}
            <Flex display={["none", "none", "none", "flex"]} px="20px" fontFamily="Inter" w="100%" justify="space-between" mb={["", "", "", "30px"]}>
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
        </Flex>
    )
}

export default TokenInfo;