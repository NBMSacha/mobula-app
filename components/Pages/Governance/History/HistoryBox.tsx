import React, { useState } from "react";
import { Button, Collapse, Flex, Link, Text } from "@chakra-ui/react";
import { ThumbsUp } from "react-feather";

function HistoryBox({ text }) {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex w="100%" justify="space-between" fontSize={["12px", "12px", "15px", "15px"]}>
      <Link
        w="75%"
        _hover={{ textDecoration: "none" }}
        onClick={() => {
          handleToggle();
        }}
      >
        <Flex
          w="100%"
          justify="space-between"
          bg="var(--bg-governance-box)"
          px="5%"
          py={["12px", "12px", "20px", "20px"]}
          mr="10px"
          h="auto"
          align="center"
          borderRadius="12px"
          mb="20px"
        >
          <Collapse startingHeight={20} in={show} style={{ maxWidth: "450px", marginRight: "20px" }}>
            {text}
          </Collapse>
        </Flex>
      </Link>
      <Flex
        mr="20px"
        justify="space-between"
        bg="var(--bg-governance-box)"
        mb="20px"
        borderRadius="12px"
        align="center"
        ml="10px"
        boxShadow="1px 2px 12px 3px var(--shadow)"
      >
        <Button
          color="green"
          colorScheme="green"
          px="10px"
          mx="auto"
          borderRadius="10px"
          _focus={{ boxShadow: "none" }}
        >
          <Flex align="center">
            <ThumbsUp height="30px" />
            <Text ml="10px">Accepted</Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}

export default HistoryBox;
