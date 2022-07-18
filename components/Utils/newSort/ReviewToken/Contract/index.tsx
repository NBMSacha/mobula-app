import React from "react";

import { Box, Flex, Text } from "@chakra-ui/react";
import Contract from "../../../Contract";

function ContractDiv({ token }) {
  console.log(token);
  return (
    <Flex
      bg="var(--bg-governance-box)"
      boxShadow="1px 2px 13px 3px var(--shadow)"
      direction="column"
      mx="auto"
      w="100%"
      borderRadius="12px"
      mb="50px"
      display={["none", "none", "flex", "flex"]}
    >
      <Flex
        p={["20px", "20px", "20px 0px", "20px"]}
        justify="space-around"
        align="center"
        w="100%"
        borderBottom={["none", "none", "1px solid var(--box_border)", "1px solid var(--box_border)"]}
      >
        <Text w="30%" px="10px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          Token Contract ({token.contracts.length})
        </Text>

        {token.totalSupply && token.totalSupply.length > 0 ? (
          <Text w="30%" px="10px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
            Total supply contracts ({token.totalSupply.length})
          </Text>
        ) : (
          <></>
        )}
        {token.excludedFromCirculation && token.excludedFromCirculation.length > 0 ? (
          <Text w="30%" px="10px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
            Excluded from circulation ({token.excludedFromCirculation.length})
          </Text>
        ) : (
          <></>
        )}
      </Flex>
      <Flex p={["20px", "20px", "20px 0px", "20px"]} justify="space-around" align="center" w="100%">
        {/* TOKEN CONTRACT */}
        <Flex w="30%" direction="column">
          {token.contracts.map((contract: string, index: number) => (
            <Box mb="20px" mr="10px">
              <Contract contract={contract} blockchain={token.chains[0]} />
            </Box>
          ))}
        </Flex>
        {/* TOKEN SUPPLY CONTRACT */}
        {token.totalSupply && token.totalSupply.length > 0 ? (
          <Flex w="30%" direction="column">
            {token.totalSupply.map((contract: string, index: number) => (
              <Box mb="20px" mr="10px">
                <Contract contract={contract} blockchain={token.chains[0]} />
              </Box>
            ))}
          </Flex>
        ) : (
          <></>
        )}
        {token.excludedFromCirculation && token.excludedFromCirculation.length > 0 ? (
          <Flex w="30%" direction="column">
            {token.excludedFromCirculation.map((contract: string, index: number) => (
              <Box mb="20px" mr="10px">
                <Contract contract={contract} blockchain={token.chains[0]} />
              </Box>
            ))}
          </Flex>
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  );
}

export default ContractDiv;
