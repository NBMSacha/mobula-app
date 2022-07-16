import { Grid, GridItem } from '@chakra-ui/react'
import { Text, Heading, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import {CheckIcon} from "@chakra-ui/icons"

export default function Tbodys({}) {
    
    return (
                <Tbody>
                    <Tr>
                        <Td borderBottom="1px solid var(--box_border) !important" isNumeric>
                            <Flex align="center">
                                <Image boxSize="23px" src="/fullicon.png" mr="10px"/>
                                <Text fontSize="12px" mr="10px">Mobula Finance</Text>
                                <Text fontSize="12px" color="var(--text-grey)">MOBL</Text>
                            </Flex>
                        </Td>
                        <Td borderBottom="1px solid var(--box_border) !important" fontSize="12px" color="var(--text-grey)">
                            <Flex justify="end">
                                1 hour ago
                            </Flex>
                        </Td>
                        <Td borderBottom="1px solid var(--box_border) !important" isNumeric>
                            <Flex align="center" justify="end">
                                <Text fontSize="12px" color="green">32 Validations</Text>
                                <CheckIcon color="green" ml="10px" boxSize="15px" />
                            </Flex>
                        </Td>
                    </Tr>
                </Tbody>
    )
}