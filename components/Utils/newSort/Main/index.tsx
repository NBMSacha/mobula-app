import React from "react";
import {
  Box, Button, Flex, Image, Text,
} from "@chakra-ui/react";

function Main({
  voteToken, tokenDivs, changeDisplay, setDisplayedToken, displayedToken,
}) {
  return (
    <Flex
      justify="center"
      mx="auto"
      direction={["column", "column", "row", "row"]}
      wrap="wrap"
      mb="50px"
      maxWidth="1400px"
    >
      {tokenDivs.map((token) => (
        <Box
          mt={["10px", "10px", "20px", "20px"]}
          w={["90%", "90%", "45%", "45%"]}
          mx={["auto", "auto", "10px", "10px"]}
          boxShadow="1px 2px 12px 3px var(--shadow)"
          bg="var(--bg-governance-box)"
          px="30px"
          py="20px"
          borderRadius="12px"
        >
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Image
                src={token.logo}
                w={["30px", "30px", "38px", "38px"]}
                h={["30px", "30px", "38px", "38px"]}
              />
              <Text fontSize={["15px", "15px", "25px", "25px"]} ml="10px">{token.name}</Text>
            </Flex>
            <Text fontSize={["12px", "12px", "15px", "15px"]} color="blue">New</Text>
          </Flex>
          <Text
            py={["15px", "15px", "25px", "25px"]}
            fontSize={["10px", "10px", "14px", "14px"]}
          >
            {token.description}
          </Text>
          <Button
            boxShadow="1px 2px 13px 3px var(--shadow)"
            mb="10px"
            fontSize={["12px", "12px", "15px", "15px"]}
            onClick={() => setDisplayedToken(token.id)}
            borderRadius="8px"
            bg="var(--background)"
            py="7px"
            px="20px"
          >
            Review and vote
          </Button>
        </Box>
      ))}
    </Flex>
  );
}

export default Main;
