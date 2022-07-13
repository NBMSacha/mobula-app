import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import Cercle from "./Cercle"

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
                        <Cercle />
                        <Cercle />
                        <Cercle />
                    </Flex>
                </Flex>
    )
}