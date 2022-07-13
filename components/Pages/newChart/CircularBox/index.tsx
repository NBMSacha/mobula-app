import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

export default function CircularBox() {

    return(
        <Flex direction={["column", "column","column","row"]} w="100%" align="center" h="100%" bg="var(--bg-governance-box)" boxShadow={`1px 2px 12px 3px var(--shadow)`} borderRadius="12px" mx="0px" p={["13px 6px","13px 6px","30px 40px","30px 40px"]} mt="0px">
                    <Flex direction={["row","row","row","column"]} w="10%" display={["none","none","none","block"]}>
                        <Box mb="30px" >
                            <Text fontSize="16px">22.062</Text>
                            <Text fontSize="12px" color="var(--text-grey)">ATH Holders</Text>
                        </Box>
                        <Box>
                            <Text fontSize="16px">22.062</Text>
                            <Text fontSize="12px" color="var(--text-grey)">ATH Holders</Text>
                        </Box>
                    </Flex>
                    <Flex justify="space-around" w={["100%","100%","90%","90%"]}>
                        <Flex align="center" direction={["column","column","column","row"]}>
                        <Text display={["flex","flex","flex","none"]} fontSize="10px" mb={["0px","0px","0px","0px"]}>$12.516.4548</Text>
                            <Text display={["flex","flex","flex","none"]} fontSize="10px" mb={["10px","10px","10px","0px"]}>ATH Holders</Text>
                            <CircularProgress size={["60px","60px","100px","100px"]} value={40} color='grey'>
                                <CircularProgressLabel ><Text fontSize={["10px","10px","14px","14px"]}>40%</Text><Box  fontSize={["6px","6px","10px","10px"]} color="var(--text-grey)">From ATH</Box></CircularProgressLabel>
                            </CircularProgress>
                            <Box ml={["0px","0px","0px","25px"]}>
                                <Text fontSize={["12px","12px","14px","16px"]} mt={["10px","10px","10px","0px"]}>$12.516.4548</Text>
                                <Text display={["none", "none", "none", "flex"]} fontSize={["8px","8px","12px","12px"]} color="var(--text-grey)">Lorem lorem lorem</Text>
                            </Box>
                        </Flex>
                        <Flex align="center" direction={["column","column","column","row"]}>
                            <Text display={["flex","flex","flex","none"]} fontSize="10px" mb={["0px","0px","0px","0px"]}>$12.516.4548</Text>
                            <Text display={["flex","flex","flex","none"]} fontSize="10px" mb={["10px","10px","10px","0px"]}>ATH Holders</Text>
                            <CircularProgress size={["60px","60px","100px","100px"]} value={40} color='grey'>
                                <CircularProgressLabel ><Text fontSize={["10px","10px","14px","14px"]}>40%</Text><Box fontSize={["6px","6px","10px","10px"]} color="var(--text-grey)">From ATH</Box></CircularProgressLabel>
                            </CircularProgress>
                            <Box ml={["0px","0px","0px","25px"]}>
                                <Text fontSize={["12px","12px","14px","16px"]} mt={["10px","10px","10px","0px"]}>$12.516.4548</Text>
                                <Text display={["none", "none", "none", "flex"]} fontSize="12px" color="var(--text-grey)">Lorem lorem lorem</Text>
                            </Box>
                        </Flex>
                        <Flex align="center" direction={["column","column","column","row"]}>
                        <Text display={["flex","flex","flex","none"]} fontSize="10px" mb={["0px","0px","0px","0px"]}>$12.516.4548</Text>
                            <Text display={["flex","flex","flex","none"]} fontSize="10px" mb={["10px","10px","10px","0px"]}>ATH Holders</Text>
                            <CircularProgress size={["60px","60px","100px","100px"]} value={40} color='grey'>
                                <CircularProgressLabel ><Text fontSize={["10px","10px","14px","14px"]}>40%</Text><Box  fontSize={["6px","6px","10px","10px"]} color="var(--text-grey)">From ATH</Box></CircularProgressLabel>
                            </CircularProgress>
                            <Box ml={["0px","0px","0px","25px"]}>
                                <Text fontSize={["12px","12px","14px","16px"]} mt={["10px","10px","10px","0px"]}>$12.516.4548</Text>
                                <Text display={["none", "none", "none", "flex"]} fontSize="12px" color="var(--text-grey)">Lorem lorem lorem</Text>
                            </Box>
                        </Flex>
                    </Flex>
                    {/* Circular */}
                </Flex>
    )
}