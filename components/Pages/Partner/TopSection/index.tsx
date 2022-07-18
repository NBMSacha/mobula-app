import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const TopSection = () => (
  <Flex w="100%" direction="column" align="center">
    <Box
      w={["80%", "80%", "80%", ""]}
      maxWidth="1000px"
      my={["14px", "14px", "30px", "50px"]}
      mx={["0px", "0px", "0px", "auto"]}
    >
      <Text fontFamily="Inter" fontWeight="500" fontSize={["14px", "14px", "15px", "22px"]}>
        A vibrant data aggregator surrounded by a vibrant ecosystem.
      </Text>
      <Text fontFamily="Inter" fontWeight="400" fontSize={["13px", "13px", "14px", "21px"]} color="grey">
        Being listed on Mobula is not only about
        {" "}
        <span
          style={{ color: "var(--chakra-colors-blue)", fontWeight: "600" }}
        >
          exposure
        </span>
        .
      </Text>
    </Box>
  </Flex>
);

export default TopSection;
