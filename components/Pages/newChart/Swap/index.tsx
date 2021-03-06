import React, { useEffect, useState, useRef } from 'react'
import { ChakraProvider, Link, ColorModeProvider, useColorModeValue, Input, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import axios from 'axios';
import { useAlert } from 'react-alert';

const Swap = ({ baseAsset }) => {
    const alert = useAlert()
    const [swapQuantity, setSwapQuantity] = useState(0)
    return (
        <Flex w="100%" boxShadow={`1px 2px 12px 3px var(--shadow)`} bg={["none", "none", "none", "var(--bg-governance-box)"]} direction="column" m="0px 10px" borderRadius="12px" p="30px 30px" mt={["20px", "20px", "20px", "0px"]}>
            <Box mb={["20px", "20px", "30px", "30px"]}>
                <Text mb="10px" fontSize={["17px", "17px", "20px", "20px"]}>Swap aggregator</Text>
                <Text fontSize={["11px", "11px", "14px", "14px"]}>Buy {baseAsset.name} at best price from +50 DEX</Text>
            </Box>
            {/* From Box */}
            <Box bg="var(--swap)" boxShadow={`1px 2px 12px 3px var(--shadow)`} p={["10px 15px"]} borderRadius="12px">
                <Text fontSize={["11px", "11px", "13px", "13px"]} opacity=".7">From</Text>
                <Flex align="center" justify="space-between" mt="20px">
                    <Input onChange={(e) => setSwapQuantity(parseFloat(e.target.value))} value={swapQuantity} type="number" color="none" _placeholder={{ color: "none" }} w="60%" border="none" placeholder='0.0' fontSize={["15px", "15px", "18px", "18px"]} />
                    <Flex align="center">
                        <Image src="/fullicon.png" h="20px" />
                        <Text ml="10px" fontSize={["14px", "14px", "16px", "16px"]}>MOBL</Text>
                    </Flex>
                </Flex>
            </Box>
            {/* From Box */}
            <Box bg="var(--swap)" boxShadow={`1px 2px 12px 3px var(--shadow)`} mt={["15px", "15px", "35px", "35px"]} p={["10px 15px"]} borderRadius="12px">
                <Text fontSize={["11px", "11px", "13px", "13px"]} opacity=".7">To</Text>
                <Flex align="center" justify="space-between" mt="20px">
                    <Input onChange={(e) => setSwapQuantity(parseFloat(e.target.value))} value={swapQuantity / 2252} type="number" w="60%" color="none" _placeholder={{ color: "none" }} border="none" placeholder='0.0' fontSize={["15px", "15px", "18px", "18px"]} />
                    <Flex align="center">
                        <Image src={baseAsset.logo} h="20px" />
                        <Text ml="10px" fontSize={["14px", "14px", "16px", "16px"]}>{baseAsset.symbol}</Text>
                    </Flex>
                </Flex>
            </Box>
            <Flex justify="center" mb={["50px", "50px", "50px", "auto"]}>
                <Button _focus={{ boxShadow: "none" }} bg="blue" color="white" mt={["15px", "15px", "30px", "30px"]} w={["90%", "90%", "90%", "100%"]} py={["8px", "8px", "12px", "12px"]} borderRadius="10px"
                    onClick={() => {
                        alert.show('The swap aggregator will be released 06/25.')
                        axios.get('https://mobulaspark.com/swap')
                    }}
                >
                    Connect a wallet
                </Button>
            </Flex>

        </Flex>
    )
}

export default Swap;