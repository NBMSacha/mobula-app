import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { CheckCircle } from "react-feather";

const Static = () => (
  <Flex
    direction="column"
    bg={["none", "none", "none", "var(--bg-governance-box)"]}
    borderRadius="12px"
    p={["10px", "10px", "10px", "20px 40px"]}
    ml="8px"
    boxShadow={["none", "none", "none", "1px 2px 12px 3px var(--shadow)"]}
  >
    <Text fontSize="18px" mb={["20px", "20px", "20px", ""]} color="blue" fontWeight="600">
      Static API
    </Text>
    <Text color="#8B8B8B" mb="30px" mt="10px" fontSize="16px" display={["none", "none", "none", "flex"]}>
      An on-chain API to retrieve relational information
      <br /> from the address of a crypto-token.
    </Text>
    <Flex mb="30px" align="center" fontSize={["12px", "12px", "14px", "14px"]}>
      <CheckCircle height="20px" />
      <Text ml="5px" whiteSpace="nowrap">
        Website
      </Text>
    </Flex>
    <Flex mb="30px" align="center">
      <CheckCircle height="20px" />
      <Text ml="5px" fontSize={["12px", "12px", "14px", "14px"]} whiteSpace="nowrap">
        Social networks
      </Text>
    </Flex>
    <Flex mb="30px" align="center">
      <CheckCircle height="20px" />
      <Text ml="5px" fontSize={["12px", "12px", "14px", "14px"]}>
        Logo
      </Text>
    </Flex>
    <Flex mb="30px" align="center">
      <CheckCircle height="20px" />
      <Text ml="5px" fontSize={["12px", "12px", "14px", "14px"]} whiteSpace="nowrap">
        Audits & KYCs
      </Text>
    </Flex>
    <Button
      _focus={{ boxShadow: "none" }}
      variant="outline"
      colorScheme="blue"
      color="blue"
      w="100px"
      py="5px"
      borderRadius="8px"
      border="1px solid blue"
    >
      <Text fontSize={["12px", "12px", "14px", "14px"]} color="blue">
        Request
      </Text>
    </Button>
  </Flex>
);

export default Static;
