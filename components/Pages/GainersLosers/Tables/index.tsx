
import React from 'react';
import { Table, Thead, Tr, Th, TableContainer, useColorModeValue } from '@chakra-ui/react';
import Gainers from "./Gainers";
import Losers from "./Losers";

function Tables({gainers, losers, gainer, loser}) {

    const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)");
    const border = useColorModeValue("var(--chakra-colors-grey_border)", "var(--chakra-colors-border_dark_gainer)");

    return (
        <TableContainer>
            <Table variant='simple' >
                <Thead borderBottom={`2px solid ${border}`}  fontSize="15px" >
                    <Tr px="5px">
                        <Th fontFamily="Poppins"  px='5px' position="sticky" left="0px" bg={bg}>Name</Th>
                        <Th fontFamily="Poppins" px='5px' isNumeric>Price</Th>
                        <Th fontFamily="Poppins" px='5px' isNumeric>24h</Th>
                        <Th fontFamily="Poppins" px='5px' isNumeric>Volume (24h)</Th>
                    </Tr>
                </Thead>
                    {gainer === "gainer" && (
                        <Gainers gainers={gainers} />
                    )} 
                    {loser === "loser" && (
                        <Losers losers={losers} />
                    )} 
            </Table>
        </TableContainer>
    )
}

export default Tables;