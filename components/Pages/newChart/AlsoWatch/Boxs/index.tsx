import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'

export default function Boxs() {

    return(

            <Box w={["160px","160px","270px","270px"]} minWidth="270px" p={["10px 10px","10px 10px","10px 20px","10px 20px"]} mx="auto" border="1px solid var(--box_border)" borderRadius="12px" bg="var(--inputs)"  mr="40px">
                <Flex justify="space-between" align="start">
                    <Flex align="center">
                        <Image boxSize={["16px","16px","28px","28px"]} src="/nervos.png" mr="10px"/>
                        <Box>
                            <Text fontSize={["9px","9px","14px","14px"]}>Nervos</Text>
                            <Text fontSize={["8px","8px","12px","12px"]}  color="var(--text-grey)">$ 0.00348</Text>
                        </Box>
                    </Flex>
                    <Text fontSize={["8px","8px","12px","12px"]} color="green">+2.41%</Text>
                </Flex>    
                <Image mt={["10px","10px","20px","20px"]} src={"https://mobulaspark.com/spark?id=100001656.svg"} w={["90%","90%","100%","100%"]}/>      
            </Box>

    )
}