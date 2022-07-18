import React from "react";
import { Table, TableContainer, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import Gainers from "./Gainers";
import Losers from "./Losers";

function Tables({ gainers, losers, gainer, loser }) {
  const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)");
  const border = useColorModeValue("var(--chakra-colors-grey_border)", "var(--chakra-colors-border_dark_gainer)");

  return (
    <TableContainer mt="20px">
      <Table variant="simple">
        <Thead borderTop="2px solid var(--box_border)" fontSize="15px">
          <Tr px="5px">
            <Th
              borderBottom="2px solid var(--box_border) !important"
              fontSize={["12px", "12px", "14px", "14px"]}
              fontFamily="Poppins"
              textTransform="capitalize"
              px="5px"
              position="sticky"
              left="0px"
              bg="var(--background)"
            >
              Name
            </Th>
            <Th
              borderBottom="2px solid var(--box_border) !important"
              fontSize={["12px", "12px", "14px", "14px"]}
              fontFamily="Poppins"
              textTransform="capitalize"
              px="5px"
              isNumeric
            >
              Price
            </Th>
            <Th
              borderBottom="2px solid var(--box_border) !important"
              fontSize={["12px", "12px", "14px", "14px"]}
              fontFamily="Poppins"
              textTransform="capitalize"
              px="5px"
              isNumeric
            >
              24h
            </Th>
            <Th
              borderBottom="2px solid var(--box_border) !important"
              fontSize={["12px", "12px", "14px", "14px"]}
              fontFamily="Poppins"
              textTransform="capitalize"
              px="5px"
              isNumeric
            >
              Volume (24h)
            </Th>
          </Tr>
        </Thead>
        {gainer === "gainer" && <Gainers gainers={gainers} />}
        {loser === "loser" && <Losers losers={losers} />}
      </Table>
    </TableContainer>
  );
}

export default Tables;
