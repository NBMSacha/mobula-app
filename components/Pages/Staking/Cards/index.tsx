import React from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Line from "./Line";

function Cards({}) {
  return (
    <Flex
      direction="column"
      align="center"
      fontSize="Inter"
      w="28%"
      mx="auto"
      p={["", "", "", "20px 35px"]}
      bg="var(--bg-governance-box)"
      boxShadow="1px 2px 13px 3px var(--shadow)"
      borderRadius="12px"
    >
      <Flex align="center" w="100%">
        <Image mr="15px" src="/reward2.png" h="44px" />
        <Text fontSize={["18px", "18px", "18px", "24px"]}>USDT-MOBL</Text>
      </Flex>
      <Flex mt="20px" align="center" direction="column">
        <Box fontSize={["18px", "18px", "18px", "24px"]} color="green">
          25.70 % / 35.07%
        </Box>
        <Flex justify="space-between" w="100%">
          <Text fontSize="12px">USDT APR</Text>
          <Text fontSize="12px">MOBL APR</Text>
        </Flex>
      </Flex>
      <Flex direction="column" w="100%" fontSize={["11px", "11px", "11px", "17px"]} mb="0px">
        <Flex mt="30px" align="center" justify="space-between">
          <Text fontSize="16px" mr="15px" opacity=".9">
            Reward Token
          </Text>
          <Image src="/fullicon.png" h="23px" />
        </Flex>
        <Line title="Value locked" number="$635.577.11" />
        <Line title="My share" number="$1516.57" />
        <Line title="Available Balance" number="$6151" />
        <Line title="My Reward" number="$605.11" />
        <Flex justify="space-between" align="center" mt="30px" mb="30px">
          <Button
            color="white"
            transition="background color 200ms ease-in-out"
            bg="var(--elections)"
            border="2px solid var(--box_border_active)"
            fontSize="14px"
            py="10px"
            px="20px"
          >
            Stake USDT
          </Button>
          <Button color="none" fontSize="14px" py="10px" px="20px">
            Stake USDT
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Cards;
