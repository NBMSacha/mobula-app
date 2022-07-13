import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import Boxs from "./Boxs"
export default function AlsoWatch() {

    return(
        <Box w="100%" h="100%" bg={["none","none","var(--bg-governance-box)","var(--bg-governance-box)"]} boxShadow={`1px 2px 12px 3px var(--shadow)`} borderRadius="12px" m="0px 0px" p="30px 30px" mt="0px">
                    <Text fontSize={["12px","12px","20px","20px"]} fontWeight="600" ml="0px" mb="40px">People also watch</Text>
                    <Flex w="100%" mx="auto" overflow="hidden">
                        <Boxs />
                        <Boxs />
                        <Boxs />
                        <Boxs />
                    </Flex>
                </Box>
    )
}