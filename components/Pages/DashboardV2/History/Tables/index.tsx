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
import Tbodys from "./Tbodys"

export default function Tables({}) {
    
    return (
        <TableContainer mt="20px" h="440px" overflowY='scroll' className="scroll">
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th borderBottom="1px solid var(--box_border) !important" textTransform='capitalize'>Token</Th>
                        <Th borderBottom="1px solid var(--box_border) !important" textTransform='capitalize' isNumeric>Times</Th>
                        <Th borderBottom="1px solid var(--box_border) !important" textTransform='capitalize' isNumeric>Status</Th>
                    </Tr>
                </Thead>
                <Tbodys />
                <Tbodys />
                <Tbodys />
                <Tbodys />
                <Tbodys />
                <Tbodys />
                <Tbodys />
                <Tbodys />
                <Tbodys />
            </Table>
        </TableContainer>
    )
}