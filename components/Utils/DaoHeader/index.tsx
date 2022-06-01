import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import styles from "./DaoHeader.module.scss";

const DaoHeader = ({ title, description, url }) => {
    return (<Box p={15} ml='2rem' mt='1rem'>
        <Flex align="center" justify="space-between">
            <Heading as="h2" mb={"20px"}>
                {title}
            </Heading>
            <Text fontSize={["14px", "14px", "16px", "17px"]} mr="5rem">
                {description} {' '}
                <Link target="_blank" color="blue" href={url}>Learn more here.</Link>
            </Text>
        </Flex>
        <div className={styles.line}></div>
    </Box>);
}

export default DaoHeader;