import React, { useEffect, useState, useRef } from 'react'
import { extendTheme, Flex, Box, Text, Spacer, Image, Button, Grid, GridItem, useMediaQuery, useColorModeValue } from '@chakra-ui/react';
import styles from "./Api.module.scss"




const TopSection = () => {
    const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
    return (

        <Flex w="90%" direction="column" mt="0px" pb="50px" align="center">
            <Flex p={["0px", "0px", "0px 20px", "0px 20px"]} justify="center" direction={["column", "row", "row", "row"]}>
                <Flex direction="column" maxWidth="470px" m={["35px 10px 10px 10px", "35px 10px 10px 10px", "10px 10px 10px 10px", "10px 10px 10px 10px"]} bg={["none", "none", "none", "var(--bg-governance-box)"]} borderRadius="12px" p={["0px", "0px", "20px", "30px"]} boxShadow={["none", "none", "none", `1px 2px 12px 3px var(--shadow)`]}>
                    <Text fontSize="17px" mb={["15px", "15px", "30px", "30px"]} color="#5C7DF9" fontWeight="600" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                        Mobula, a quality label
                    </Text>
                    <Text fontSize="13px" color="grey">
                        Being listed on Mobula means being in line with most of the quality standards required by launchpads and other entities in the crypto ecosystem. That's why our partners accept to work with tokens if they are listed on Mobula.
                    </Text>
                </Flex>
                <Flex direction="column" maxWidth="545px" m={["35px 10px 10px 10px", "35px 10px 10px 10px", "10px 10px 10px 10px", "10px 0px 10px 0px"]} bg={["none", "none", "none", "var(--bg-governance-box)"]} borderRadius="12px" p={["0px", "0px", "20px", "30px"]} boxShadow={["none", "none", "none", `1px 2px 12px 3px var(--shadow)`]} >
                    <Text fontSize="17px" mb={["15px", "15px", "30px", "30px"]} color="#5C7DF9" fontWeight="600">
                        Mobula, a vibrant ecosystem
                    </Text>
                    <Text fontSize="13px" color="grey" maxHeight={["auto", "154px", "auto", "auto"]} overflow="auto">
                        Mobula's DAO has built strategic partnerships with many launchpads, decentralized VCs and crypto communities. A token listed on Mobula will benefit from facilities and discounts at the DAO's partners. Just click on 'Let's connect' to be put in touch with the DAO.
                    </Text>
                </Flex>
            </Flex>

            <Flex p="10px" align="center" justify="center" bg={["none", "none", "none", "var(--bg-governance-box)"]} maxWidth="1025px" mt={['30px', '30px', '0px', '0px']} ml={["10px", "10px", "25px", "25px"]} borderRadius="12px" mr={['16px', '16px', '', '']} boxShadow={["none", "none", "none", `1px 2px 12px 3px var(--shadow)`]}>
                <Flex bg={["none", "none", "none","var(--bg-governance-box)"]} wrap="wrap" borderRadius="12px" align="center" justify="space-around">
                    <Box h="80px" w="320px" display="flex" alignItems="center" justifyContent="center" borderRadius="12px" my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image w='60%' src="/degem.png" />
                    </Box>
                    <Box h="80px" w="320px" display="flex" alignItems="center" justifyContent="center" borderRadius="12px" my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image w='60%' src="/cryptarch.png" />
                    </Box>
                    <Box h="80px" w="320px" display="flex" alignItems="center" justifyContent="center" borderRadius="12px" my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image w='60%' src="/staysafu.png" />
                    </Box>
                    <Box h="80px" w="320px" display="flex" alignItems="center" justifyContent="center" borderRadius="12px" my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image w='60%' src="/gempad.png" />
                    </Box>
                    <Box h="80px" w="320px" display="flex" alignItems="center" justifyContent="center" borderRadius="12px" my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image w='60%' src="/safetin.png" />
                    </Box>
                    <Box h="80px" w="320px" display="flex" alignItems="center" justifyContent="center" borderRadius="12px" my={isLargerThan1280 ? "0px" : "10px"}>
                        <Image mb='20px' src="/sig.png" />
                    </Box>
                </Flex>


            </Flex>
        </Flex>

    )
}

export default TopSection;