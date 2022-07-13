import {Flex, Box, Text } from '@chakra-ui/react'
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
import Line from "./Line"

export default function TopHolders() {

    return(
        <Box w="100%" h="100%" bg="var(--bg-governance-box)" boxShadow={`1px 2px 12px 3px var(--shadow)`} borderRadius="12px" m="0px 0px" p={["20px 0px 20px 0px","10px 0px 20px 0px","30px 10px","30px 10px"]} mt="0px">
            <Text fontWeight="600" fontSize={["12px","12px","20px","20px"]} ml="20px" mb={["5px","5px","20px","20px"]}>Top holders</Text>
                <TableContainer w="90%" mx="auto" h={["290px","290px","250px","auto"]} overflowY="scroll" whiteSpace="nowrap" className="scroll">
                    <Table variant='simple'>
                        <Thead >
                            <Tr>
                                <Th fontSize={["8px", "8px", "11px", "15px"]} p={["10px 5px","10px 5px","10px 20px","20px 30px"]} borderBottom="1px solid var(--box_border) !important" textTransform="capitalize" isNumeric>Rank</Th>
                                <Th fontSize={["8px", "8px", "11px", "15px"]} p={["10px 5px","10px 5px","10px 20px","20px 30px"]} borderBottom="1px solid var(--box_border) !important" textTransform="capitalize" isNumeric>Address</Th>
                                <Th fontSize={["8px", "8px", "11px", "15px"]} p={["10px 5px","10px 5px","10px 20px","20px 30px"]} borderBottom="1px solid var(--box_border) !important" textTransform="capitalize" isNumeric>Ethereum Ammount</Th>
                                <Th fontSize={["8px", "8px", "11px", "15px"]} p={["10px 5px","10px 5px","10px 20px","20px 30px"]} borderBottom="1px solid var(--box_border) !important" textTransform="capitalize" isNumeric>% of Total Supply</Th>
                            </Tr>
                        </Thead>
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                    </Table>
                </TableContainer> 
        </Box>
    )
}