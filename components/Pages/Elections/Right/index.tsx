import React, { useState } from "react";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";

function Right() {
  const [open, setOpen] = useState(false);
  const [changeUsername, setChangeUsername] = useState("");
  return (
    <Flex
      w="100%"
      direction="column"
      ml={["0px", "0px", "0px", "15px"]}
      p={["10px", "10px", "10px", "20px 20px 40px 20px"]}
      boxShadow="1px 2px 13px 3px var(--shadow)"
      bg="var(--bg-governance-box)"
      borderRadius="12px"
    >
      <Flex align="center" mb={["0px", "0px", "0px", "30px"]} justify="space-between">
        <Flex align="center">
          <Image src="/fullicon.png" h={["22px", "22px", "22px", "30px"]} />
          <Text ml={["10px", "10px", "10px", "15px"]} fontSize={["18px", "18px", "18px", "23px"]}>
            Profile
          </Text>
        </Flex>
        <Button
          display={["flex", "flex", "flex", "none"]}
          mr="20px"
          _focus={{ boxShadow: "none" }}
          onClick={() => setOpen(!open)}
        >
          {open ? "-" : "+"}
        </Button>
      </Flex>
      <Box display={[open ? "block" : "none", open ? "block" : "none", open ? "block" : "none", "block"]}>
        <Text fontSize={["12px", "12px", "15px", "15px"]} mt={["20px", "20px", "20px", "0px"]} mb="10px">
          Your address
        </Text>
        <Text
          fontSize={["12px", "12px", "14px", "14px"]}
          color="grey"
          mb="25px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          ??
        </Text>
        <Text fontSize={["12px", "12px", "15px", "15px"]} mb="10px">
          Your username
        </Text>
        <Text fontSize={["12px", "12px", "15px", "15px"]} color="grey" mb="25px">
          ??
        </Text>
        <Text fontSize={["12px", "12px", "15px", "15px"]} mb="10px">
          MOBL Balance
        </Text>
        <Text fontSize={["12px", "12px", "15px", "15px"]} color="grey" mb="25px">
          ?? MOBL
        </Text>
        <Text fontSize={["12px", "12px", "15px", "15px"]} mb="10px">
          DAO Rank
        </Text>
        <Text fontSize={["12px", "12px", "15px", "15px"]} color="grey" mb="25px">
          #??
        </Text>
        <Text fontSize={["12px", "12px", "15px", "15px"]} mb="10px">
          Change username
        </Text>
        <Input
          h={["29px", "29px", "29px", "32px"]}
          borderRadius="8px"
          placeholder="0x"
          value={changeUsername}
          onChange={(e) => setChangeUsername(e.target.value)}
          bg="var(--inputs)"
          boxShadow="1px 2px 13px 3px var(--shadow)"
          fontSize={["12px", "12px", "15px", "15px"]}
          pl="10px"
          pr="10px"
          id="logo"
          border="none"
          name="logo"
          _placeholder={{ color: "none", textOverflow: "ellipsis" }}
          required
        />
        <Button
          _focus={{ boxShadow: "none" }}
          mt="35px"
          color="white"
          bg="var(--elections)"
          boxShadow="1px 2px 13px 3px var(--shadow)"
          fontSize={["11px", "11px", "14px", "14px"]}
          w="100%"
          py={["12px", "12px", "12px", "15px"]}
          borderRadius={["8px", "8px", "8px", "12px"]}
        >
          Submit
        </Button>
      </Box>
    </Flex>
  );
}

export default Right;
