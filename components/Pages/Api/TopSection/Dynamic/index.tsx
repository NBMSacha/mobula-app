import React from "react"
import { Flex, Text, Button} from "@chakra-ui/react";
import { CheckCircle } from "react-feather";
const Static = () => {
    return (
        <Flex direction="column" bg={["none", "none", "none", "var(--bg-governance-box)"]} borderRadius="12px" p={["10px","10px","10px","20px 37px"]}  ml="10px" boxShadow={["none","none","none",`1px 2px 12px 3px var(--shadow)`]} >
            <Text fontSize="17px" mb={["20px","20px","20px",""]} color="blue" fontWeight="600">Dynamic API</Text>
            <Text color="#8B8B8B" mb="30px" mt="10px" fontSize="16px" display={["none","none","none","flex"]}>An API to retrieve data such as<br /> price, liquidity and volume (only on-chain) of assets.</Text>
            <Flex>
                <Flex direction="column" mr={["none","none","none","100px"]}>
                    <Flex mb="30px" align="center">
                        <CheckCircle height="20px"/>
                        <Text ml="5px" fontSize={["12px","12px","14px","14px"]} whiteSpace="nowrap">Liquidity</Text>
                    </Flex>
                    <Flex mb="30px" align="center">
                        <CheckCircle height="20px"/>
                        <Text ml="5px" fontSize={["12px","12px","14px","14px"]} whiteSpace="nowrap">Price</Text>
                    </Flex>
                    <Flex mb="30px" align="center">
                        <CheckCircle height="20px"/>
                        <Text ml="5px" fontSize={["12px","12px","14px","14px"]} whiteSpace="nowrap">Volume</Text>
                    </Flex>
                    <Flex mb="30px" align="center">
                        <CheckCircle height="20px"/>
                        <Text ml="5px" fontSize={["12px","12px","14px","14px"]} whiteSpace="nowrap">Market capitalization</Text>
                    </Flex>
                </Flex>
                <Flex direction="column" display={["none","none","none","flex"]}>
                    <Flex mb="30px" align="center">
                        <CheckCircle height="20px"/>
                        <Text ml="5px" fontSize="14px" whiteSpace="nowrap">Fully diluted market cap</Text>
                    </Flex>
                    <Flex mb="30px" align="center">
                        <CheckCircle height="20px"/>
                        <Text ml="5px" fontSize="14px" whiteSpace="nowrap">Circulating supply</Text>
                    </Flex>
                    <Flex mb="30px" align="center">
                        <CheckCircle height="20px"/>
                        <Text ml="5px" fontSize="14px" whiteSpace="nowrap">Total supply</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Static;