import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Contract from "../../../Utils/Contract";
import { formatAmount } from "../../../../helpers/formaters";

const MobileInfo = ({ baseAsset, moreStat, totalScore }) => {
  console.log(baseAsset);
  return (
    <Box w="90%" display={moreStat ? "block" : "none"}>
      <Text p="0px 25px" fontSize="10px" lineHeight="18px">{baseAsset.description}</Text>
      <Flex justify="space-between" w="100%" p="0px 25px" mt="20px">
        <Box mb="20px">
          <Text fontSize="9px" opacity=".6">Marketcap</Text>
          <Text mb="10px" fontSize="12px">
            $
            {formatAmount(baseAsset.market_cap)}
          </Text>
          <Text fontSize="9px" opacity=".6">Volume (24h)</Text>
          <Text mb="10px" fontSize="12px">
            $
            {formatAmount(baseAsset.volume)}
          </Text>
          <Text fontSize="9px" opacity=".6">Fully diluted Marketcap</Text>
          <Text fontSize="12px">
            $
            {formatAmount(baseAsset.market_cap_diluted)}
          </Text>
        </Box>
        <Box mb="20px">
          <Text fontSize="9px" opacity=".6">Circulating supply</Text>
          <Text mb="10px" fontSize="12px">{formatAmount(baseAsset.circulating_supply)}</Text>
          <Text fontSize="9px" opacity=".6">Total supply</Text>
          <Text mb="10px" fontSize="12px">{formatAmount(baseAsset.total_supply)}</Text>
          <Text fontSize="9px" opacity=".6">Liquidity</Text>
          <Text fontSize="12px">
            $
            {formatAmount(baseAsset.liquidity)}
          </Text>
        </Box>
      </Flex>
      <Box px="25px" mr="auto">
        {totalScore !== 0 && (
        <>
          <Flex fontSize="10px" align="center">
            <Text opacity=".6" mr="10px">DAO Score</Text>
            <Text
              color={totalScore > 10 ? "green" : "red"}
            >
              {totalScore !== 0 ? totalScore : "--"}
              /20
            </Text>
          </Flex>
          <Flex opacity=".6" align="center" mt="10px" mb="15px">
            <Flex fontSize="9px" align="center">
              <Text mr="8px">Reliability</Text>
              <Text mr="15px">
                {baseAsset.trust_score}
                /5
              </Text>
            </Flex>
            <Flex fontSize="9px" align="center">
              <Text mr="8px">Market</Text>
              <Text mr="15px">
                {baseAsset.market_score}
                /5
              </Text>
            </Flex>
            <Flex fontSize="9px" align="center">
              <Text mr="8px">Utility</Text>
              <Text mr="15px">
                {baseAsset.utility_score}
                /5
              </Text>
            </Flex>
            <Flex fontSize="9px" align="center">
              <Text mr="8px">Social</Text>
              <Text mr="0px">
                {baseAsset.social_score}
                /5
              </Text>
            </Flex>
          </Flex>
        </>
        )}

        <Flex mb="20px" wrap="wrap" justify="center" w="100%" maxHeight="80px" overflowY="scroll">
          {baseAsset.contracts.map((contract: string, idx: number) => (
            <Contract contract={contract} blockchain={baseAsset.blockchains[idx]} />
          ))}
        </Flex>

      </Box>
    </Box>
  );
};

export default MobileInfo;
