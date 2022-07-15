import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import Line from "./Line"
export default function TradeBox({totalScore,baseAsset}) {

    return(
        <Box w="100%"  h="100%" bg="var(--bg-governance-box)" boxShadow={`1px 2px 12px 3px var(--shadow)`} borderRadius="12px" m="0px 0px" p={["10px 10px","10px 10px","10px 10px","20px 10px"]} mt="0px">
                    <Text fontSize={["12px","12px","18px","20px"]} fontWeight="600"  ml={["10px","10px","10px","20px"]} mb={["10px","10px","10px","20px"]}>All {baseAsset.symbol} Trades</Text>
                    <Box h={["180px","180px","160px",totalScore > 1 ? "280px" : "90%"]} overflowY="scroll" className="scroll" whiteSpace="nowrap" w={["90%","90%","85%","92%"]} mx="auto" >
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                    </Box>
                </Box>
    )
}