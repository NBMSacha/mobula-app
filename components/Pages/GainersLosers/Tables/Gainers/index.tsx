import React from "react";
import {
  Flex, Image, Tbody, Td, Text, Tr, useColorModeValue, useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { TriangleUpIcon } from "@chakra-ui/icons";
import {
  formatAmount,
  formatName,
  getTokenFormattedPrice,
  getTokenPercentage,
  getUrlFromName,
} from "../../../../../helpers/formaters";

function Gainers({ gainers }) {
  const router = useRouter();
  const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)");
  const border = useColorModeValue("var(--chakra-colors-grey_border)", "var(--chakra-colors-border_dark_gainer)");
  const hover = useColorModeValue("white", "var(--chakra-colors-dark_inactive_gainer)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {gainers.map((gainer: any, idx: number) => (
        <Tbody
          borderBottom="1px solid var(--box_border)"
          fontSize={["12px", "12px", "13px", "15px"]}
          onClick={() => router.push(`/asset/${getUrlFromName(gainer.name)}`)}
          _hover={{ background: "var(--box_active)", cursor: "pointer" }}
        >
          <Tr position="relative">
            <Td
              borderBottom="1px solid var(--box_border) !important"
              py={["5px", "5px", "5px", "5px"]}
              px="5px"
              position="sticky"
              left="0px"
              bg={["var(--background)", "var(--background)", "none", "none"]}
              _hover={{ background: "none" }}
            >
              <Flex align="center" w="100%">
                <Text
                  opacity="1"
                  mr="10px"
                  display={["none", "none", "flex", "flex"]}
                >
                  {gainer.rank}
                </Text>
                <Image mr="15px" h="30px" borderRadius="50%" src={gainer.logo} />
                <Flex direction={["column", "column", "row", "row"]}>
                  <Text
                    minWidth="120px"
                    whiteSpace="pre-wrap"
                    mr="10px"
                  >
                    {gainer.name.length > 15 ? formatName(gainer.name, 15) : gainer.name}
                  </Text>
                  <Flex>
                    <Text
                      opacity="1"
                      mr="10px"
                      display={["flex", "flex", "none", "none"]}
                    >
                      {gainer.rank}
                    </Text>
                    <Text
                      color="var(--text-grey)"
                    >
                      {gainer.symbol.length > 5 ? formatName(gainer.symbol, 5) : gainer.symbol}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Td>
            <Td
              borderBottom="1px solid var(--box_border) !important"
              px="5px"
              isNumeric
            >
              {getTokenFormattedPrice(gainer.price, "$", {
                justify: "right",
                marginTop: "auto",
              })}
            </Td>
            <Td borderBottom="1px solid var(--box_border) !important" px="5px" isNumeric color="green">
              <TriangleUpIcon boxSize="12px" mb="4px" mr="3px" />
              {getTokenPercentage(gainer.price_change_24h)}
              %
            </Td>
            <Td
              borderBottom="1px solid var(--box_border) !important"
              px="5px"
              isNumeric
            >
              $
              {formatAmount(gainer.volume)}
            </Td>
          </Tr>
        </Tbody>
      ))}
    </>
  );
}

export default Gainers;
