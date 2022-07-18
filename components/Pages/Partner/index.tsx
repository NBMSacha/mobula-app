import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import TopSection from "./TopSection";
import BottomSection from "./BottomSection";

const Api = () => {
  const volume = "Volume";
  const rank = "Rank";
  const liquidity = "Liquidity";
  const holders = "Holders";

  return (
    <Flex w="100%" direction="column" align="center" pb="50px">
      <TopSection />
      <BottomSection />
      <Text fontFamily="Inter" fontWeight="400" fontSize={["13px", "13px", "14px", "21px"]} color="grey">
        Join
        {" "}
        <span style={{ color: "var(--chakra-colors-blue)", fontWeight: "600" }}>Mobula</span>
        . Enter the
        ecosystem now.
      </Text>
      <Button
        mt="30px"
        w="200px"
        h="40px"
        bg="blue"
        color="white"
        onClick={() => {
          window.open("https://t.me/MobulaFi");
        }}
      >
        Let's connect
      </Button>

    </Flex>
  );
};

export default Api;
