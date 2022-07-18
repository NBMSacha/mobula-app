import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Static from "./Static";
import Dynamic from "./Dynamic";

const TopSection = () => (
  <Flex w="100%" direction="column" align="center">
    <Box
      w={["80%", "80%", "80%", ""]}
      maxWidth="1000px"
      my={["14px", "14px", "30px", "50px"]}
      mx={["0px", "0px", "0px", "auto"]}
    >
      <Text fontFamily="Inter" fontWeight="500" fontSize={["14px", "14px", "15px", "22px"]}>
        The most trusted authority on crypto-currency data has a professional API made for you.
      </Text>
      <Text fontFamily="Inter" fontWeight="400" fontSize={["13px", "13px", "14px", "21px"]} color="grey">
        More detailled, more faster by
        <span style={{ color: "var(--chakra-colors-blue)", fontWeight: "600" }}>+36%</span> than CoinMarketCap API
      </Text>
    </Box>
    <Flex w={["90%", "90%", "90%", "86%"]} justify={["space-between", "space-around", "space-around", "center"]}>
      <Static />

      <Dynamic />
    </Flex>
  </Flex>
);

export default TopSection;
