import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { ThumbsDown, ThumbsUp } from "react-feather";

function Vote({ proposal }) {
  console.log(proposal);
  return (
    <Flex direction="column">
      <Text mb="20px" mt={["30px", "30px", "30px", ""]} fontSize={["13px", "13px", "15px", "18px"]}>
        Validate or
        refuse
      </Text>
      {/* BOX */}
      <Flex mb="15px">
        <Flex
          h={["50px", "50px", "80px", "80px"]}
          justify="space-between"
          align="center"
          w="100%"
          bg={["none", "none", "var(--bg-governance-box)", "var(--bg-governance-box)"]}
          borderRadius="15px"
          boxShadow={["none", "none", "none", "1px 2px 12px 3px var(--shadow)"]}
        >
          <Flex
            borderRadius="12px"
            w="72%"
            align="center"
            justify="start"
            bg={["var(--bg-governance-box)", "var(--bg-governance-box)", "none", "none"]}
            px={["20px"]}
            h="100%"
            boxShadow={["1px 2px 12px 3px var(--shadow)", "1px 2px 12px 3px var(--shadow)", "1px 2px 12px 3px var(--shadow)", "none"]}
          >
            <Text>The listing fee should be reduced to 10$</Text>
          </Flex>
          <Flex
            w={["25%", "25%", "20%", "20%"]}
            mx={["10px", "10px", "20px", "20px"]}
            justify="space-between"
          >
            <Button
              variant="outline"
              color="green"
              colorScheme="green"
              minWidth="40px"
              mr={["10px", "10px", "20px", "20px"]}
              w="60px"
              h="40px"
              borderRadius="10px"
              _focus={{ boxShadow: "none" }}
            >
              <ThumbsUp height="30px" />
            </Button>
            <Button
              color="red"
              colorScheme="red"
              borderRadius="10px"
              minWidth="40px"
              w="60px"
              h="40px"
              _focus={{ boxShadow: "none" }}
            >
              <ThumbsDown height="30px" />
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {/* TO REMOVE */}
      <Flex mb="15px">
        <Flex
          h={["50px", "50px", "80px", "80px"]}
          justify="space-between"
          align="center"
          w="100%"
          bg={["none", "none", "var(--bg-governance-box)", "var(--bg-governance-box)"]}
          borderRadius="15px"
          boxShadow={["none", "none", "none", "1px 2px 12px 3px var(--shadow)"]}
        >
          <Flex
            borderRadius="12px"
            w="72%"
            align="center"
            justify="start"
            bg={["var(--bg-governance-box)", "var(--bg-governance-box)", "none", "none"]}
            px={["20px"]}
            h="100%"
            boxShadow={["1px 2px 12px 3px var(--shadow)", "1px 2px 12px 3px var(--shadow)", "1px 2px 12px 3px var(--shadow)", "none"]}
          >
            <Text>The listing fee should be reduced to 10$</Text>
          </Flex>
          <Flex
            w={["25%", "25%", "20%", "20%"]}
            mx={["10px", "10px", "20px", "20px"]}
            justify="space-between"
          >
            <Button
              color="green"
              colorScheme="green"
              minWidth="40px"
              mr={["10px", "10px", "20px", "20px"]}
              w="60px"
              h="40px"
              borderRadius="10px"
              _focus={{ boxShadow: "none" }}
            >
              <ThumbsUp height="30px" />
            </Button>
            <Button
              variant="outline"
              color="red"
              colorScheme="red"
              borderRadius="10px"
              w="60px"
              minWidth="40px"
              h="40px"
              _focus={{ boxShadow: "none" }}
            >
              <ThumbsDown height="30px" />
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex mb="15px">
        <Flex
          h={["50px", "50px", "80px", "80px"]}
          justify="space-between"
          align="center"
          w="100%"
          bg={["none", "none", "var(--bg-governance-box)", "var(--bg-governance-box)"]}
          borderRadius="15px"
          boxShadow={["none", "none", "none", "1px 2px 12px 3px var(--shadow)"]}
        >
          <Flex
            borderRadius="12px"
            w="72%"
            align="center"
            justify="start"
            bg={["var(--bg-governance-box)", "var(--bg-governance-box)", "none", "none"]}
            px={["20px"]}
            h="100%"
            boxShadow={["1px 2px 12px 3px var(--shadow)", "1px 2px 12px 3px var(--shadow)", "1px 2px 12px 3px var(--shadow)", "none"]}
          >
            <Text>The listing fee should be reduced to 10$</Text>
          </Flex>
          <Flex
            w={["25%", "25%", "20%", "20%"]}
            mx={["10px", "10px", "20px", "20px"]}
            justify="space-between"
          >
            <Button
              minWidth="40px"
              color="green"
              colorScheme="green"
              mr={["10px", "10px", "20px", "20px"]}
              w="60px"
              h="40px"
              borderRadius="10px"
              _focus={{ boxShadow: "none" }}
            >
              <ThumbsUp height="30px" />
            </Button>
            <Button
              minWidth="40px"
              color="red"
              colorScheme="red"
              borderRadius="10px"
              w="60px"
              h="40px"
              _focus={{ boxShadow: "none" }}
            >
              <ThumbsDown height="30px" />
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex mb="15px">
        <Flex
          h={["50px", "50px", "80px", "80px"]}
          boxShadow={["none", "none", "none", "1px 2px 12px 3px var(--shadow)"]}
          justify="space-between"
          align="center"
          w="100%"
          bg={["none", "none", "var(--bg-governance-box)", "var(--bg-governance-box)"]}
          borderRadius="15px"
        >
          <Flex
            borderRadius="12px"
            w="72%"
            align="center"
            justify="start"
            bg={["var(--bg-governance-box)", "var(--bg-governance-box)", "none", "none"]}
            px={["20px"]}
            boxShadow={["1px 2px 12px 3px var(--shadow)", "1px 2px 12px 3px var(--shadow)", "1px 2px 12px 3px var(--shadow)", "none"]}
            h="100%"
          >
            <Text>The listing fee should be reduced to 10$</Text>
          </Flex>

          <Flex
            w={["25%", "25%", "20%", "20%"]}
            mx={["10px", "10px", "20px", "20px"]}
            justify="space-between"
          >
            <Button
              minWidth="40px"
              color="green"
              colorScheme="green"
              mr={["10px", "10px", "20px", "20px"]}
              w="60px"
              h="40px"
              borderRadius="10px"
              _focus={{ boxShadow: "none" }}
            >
              <ThumbsUp height="30px" />
            </Button>
            <Button
              minWidth="40px"
              color="red"
              colorScheme="red"
              borderRadius="10px"
              w="60px"
              h="40px"
              _focus={{ boxShadow: "none" }}
            >
              <ThumbsDown height="30px" />
            </Button>
          </Flex>
        </Flex>
      </Flex>

    </Flex>
  );
}

export default Vote;
