import React from "react";
import { Flex } from "@chakra-ui/react";
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
    </Flex>
  );
};

export default Api;
