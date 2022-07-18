import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Contract from "../../../Contract";

function MobileContract({ token }) {
  console.log(token);
  return (
    <Flex direction="column" px="25px" display={["flex", "flex", "none", "none"]}>
      <Box>
        <Text ml="10px" mb="0px" fontSize="11px">Contract(s)</Text>
        <Flex w="100%" direction="column">
          {token.contracts.map((contract: string, index: number) => (
            <Box mb="20px" mr="10px">
              <Contract
                contract={contract}
                blockchain={token.chains[0]}
              />
            </Box>
          ))}
        </Flex>
        {token.excludedFromCirculation && token.excludedFromCirculation.length > 0
          ? (
            <>
              <Text ml="10px" mb="0px" fontSize="11px">Excluded from circulation</Text>
              <Flex w="100%" direction="column">
                {token.excludedFromCirculation.map((contract: string, index: number) => (
                  <Box mb="0px" mr="10px">
                    <Contract
                      contract={contract}
                      blockchain={token.chains[0]}
                    />
                  </Box>
                ))}
              </Flex>
            </>
          )
          : <></>}
        {token.totalSupply && token.totalSupply.length > 0
          ? (
            <>
              <Text ml="10px" mb="0px" fontSize="11px">Total supply contract(s)</Text>
              <Flex mb="10px" w="100%" direction="column">
                {token.totalSupply.map((contract: string, index: number) => (
                  <Box mb="20px" mr="10px">
                    <Contract
                      contract={contract}
                      blockchain={token.chains[0]}
                    />
                  </Box>
                ))}
              </Flex>
            </>
          )
          : <></>}
      </Box>
    </Flex>
  );
}

export default MobileContract;
