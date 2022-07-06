import { Text, Heading,Input,Link, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image, useMediaQuery } from '@chakra-ui/react'
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
  import styles from "../Airdrop.module.scss"

export default function Tables({token}) {

    return (
        <Flex color="var(--text-grey)" boxShadow="1px 2px 13px 3px var(--shadow)" className={styles["main"]} mx="auto" direction="column" bg="var(--bg-governance-box)" mt="10px" borderRadius="12px" p="30px" mb="100px">
                        <Text fontSize={["13px","13px","15px","15px"]}>Trades History</Text>
                        <TableContainer w="100%" mx="auto"  mt={["10px","10px","20px","20px"]}>
                            <Table fontSize={["10px","10px","15px","15px"]} variant='simple'>
                                <Thead >
                                    <Tr borderBottom="none !important">
                                        <Th p={["8px 8px","8px 8px","20px","20px"]} fontWeight={["400","400",'500', "600"]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]}  textTransform="capitalize">Time</Th>
                                        <Th  p={["8px 8px","8px 8px","",""]} fontWeight={["400","400",'500', "600"]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric  textTransform="capitalize">Address</Th>
                                        <Th p={["8px 8px","8px 8px","",""]} fontWeight={["400","400",'500', "600"]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric  textTransform="capitalize">Trade</Th>
                                        <Th p={["8px 8px","8px 8px","",""]} fontWeight={["400","400",'500', "600"]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric  textTransform="capitalize">% of total supply</Th>
                                        <Th p={["8px 8px","8px 8px","",""]} fontWeight={["400","400",'500', "600"]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} textAlign="end" textTransform="capitalize">Ammount Left</Th>
                                    </Tr>
                                </Thead>
                                <Tbody borderBottom="2px solid none !important">
                                    <Tr borderBottom="none !important">
                                        <Td  p={["8px 8px","8px 8px","20px","20px"]} fontWeight={["400","400",'400', "400"]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]}  textTransform="capitalize">22 sec.</Td>
                                        <Td  p={["8px 8px","8px 8px","",""]} fontWeight={["400","400",'400', "400"]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric  textTransform="capitalize">0xEF8f311F9Ab05c767fE92aba0E957D98eDD960C1</Td>
                                        <Td p={["8px 8px","8px 8px","",""]} fontWeight={["400","400",'400', "400"]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric  textTransform="capitalize"><Box color="blue" as="span">330 MOBL </Box>-{">"} 5000 UFusion</Td>
                                        <Td p={["8px 8px","8px 8px","",""]} fontWeight={["400","400",'400', "400"]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric  textTransform="capitalize">
                                            7.75%
                                        </Td>
                                        <Td p={["8px 8px","8px 8px","",""]} fontWeight={["400","400",'400', "400"]} borderBottom="1px solid var(--box_border)!important" fontSize={["10px","10px","15px","15px"]} textAlign="end" textTransform="capitalize">610.000</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                   </Flex>
    )

}