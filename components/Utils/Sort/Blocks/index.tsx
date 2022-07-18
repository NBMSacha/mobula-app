import {
  Box, Button, Flex, Heading, Image, Text, useColorModeValue,
} from "@chakra-ui/react";
import styles from "./Blocks.module.scss";

const Blocks = ({ tokenDivs, setDisplayedToken }) => (
  <Flex
    justifyContent={["center"]}
    flexDir={["column", "column", "column", "row"]}
    alignItems={["center", "center", "center", "stretch"]}
    flexWrap="wrap"
  >
    {tokenDivs.map((token) => (
      <Box
        w={["90%", "90%", "90%", "43%"]}
        bg={useColorModeValue("white_terciary", "dark_box_list")}
        boxShadow={useColorModeValue("1px 2px 12px 1px #d0d6e3", "")}
        mb={20}
        mr={[0, 10]}
        ml={[0, 10]}
        borderRadius="10px"
        p={["20px", "40px"]}
        opacity={token.alreadyVoted ? "0.2" : "1"}
        className={styles["token-box"]}
      >
        <Flex alignItems="center" mb={10}>
          <Image src={token.logo} h={50} w={50} mr={5} />
          <Heading fontSize={["x-large", "xx-large"]}>
            {token.name}
          </Heading>
          <Text fontSize={["md", "xl"]} fontWeight="600" color="blue" ml="auto">New</Text>
        </Flex>
        <Text
          fontSize={["md", "lg"]}
        >
          {token.description.slice(0, 175) + (token.description.length > 175 ? "..." : "")}
        </Text>

        <Button
          mt="20px"
          h="40px"
          w="40%"
          bg="dark_text_tendance"
          onClick={() => setDisplayedToken(token.id)}
        >
          Analyze
        </Button>
      </Box>

    ))}
  </Flex>
);

export default Blocks;
