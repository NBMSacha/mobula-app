import {
  Box, Flex, Heading, Link, Spacer, Text, useColorModeValue,
} from "@chakra-ui/react";
import styles from "./DaoHeader.module.scss";

const DaoHeader = ({ title, description, url }) => {
  const lineBackground = useColorModeValue("white_border_tendance", "dark_border_tendance");
  return (
    <Box p={15} ml={["1rem", "2rem"]} mt="1rem">
      <Flex align={["left", "center"]} justify="space-between">
        <Heading as="h2" fontWeight="600" mb="20px" mr="50px">
          {title}
        </Heading>
        <Text fontSize={["0", "14px", "16px", "17px"]} mr="5rem">
          {description}
          {" "}
          {" "}
          <Link target="_blank" color="blue" href={url}>Learn more here.</Link>
        </Text>
      </Flex>
      <Box display={["none", "block"]} bg="var(--box_border)" className={styles.line} />
      <Spacer h={["0px", "50px"]} />
    </Box>
  );
};

export default DaoHeader;
