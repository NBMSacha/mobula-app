import { CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export default function Data() {
  const [close, setClose] = useState(false);

  return (
    <Flex
      bg="var(--data-gradient)"
      w="84%"
      display={close ? "none" : "flex"}
      justify="space-between"
      p="10px 20px"
      borderRadius="14px"
    >
      {/* @ts-ignore */}
      <Text>
        Mobula’s data is
        <span style={{ color: "#16C784" }}>100%</span>
        {" "}
        scraped on-chain -
        {">"}
      </Text>
      <Flex align="center">
        <Text mr="10px">
          Which means
          <span style={{ color: "#16C784" }}>trustless</span>
          {" "}
          data, in opposite to CEX
          aggregation systems who can easily be falsified
        </Text>
        <Flex bg="#58667E" borderRadius="full" align="center" justify="center">
          <CloseButton
            size="sm"
            w="20px"
            bg="#58667E"
            color="white"
            borderRadius="full"
            h="20px"
            onClick={() => setClose(true)}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
