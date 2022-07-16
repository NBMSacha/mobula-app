import { Grid, GridItem } from '@chakra-ui/react'
import { Text, Heading, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image, Input} from '@chakra-ui/react'
import { useState } from "react"

export default function Line() {

    return (
                <Flex align="center" w="90%" mx="auto" mt="10px">
                    <Box mr="30px">
                        <Text pb="15px">1</Text>
                    </Box>
                    <Flex align="center" borderBottom="1px solid var(--box_border)" w="100%" justify="space-between">
                        <Box pb="15px">
                            <Text fontSize="13px" mb="3px">Kanga</Text>
                            <Text fontSize="10px" color="var(--text-grey)">#0xD4E36...3A65</Text>
                        </Box>
                        <Text fontSize="12px" color="green" pb="15px">33 correct decisions</Text>
                    </Flex>
                </Flex>
    )
}