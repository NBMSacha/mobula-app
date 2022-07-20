import { Text, Flex, Box } from "@chakra-ui/react"
export default function RankTitle({title}) {
    return (
        <Flex h="100%" w="50%"  align="center">
            <Flex w="75%" mx="auto">
                <Text fontSize="16px" color="var(--text-grey)">{title} <Box fontSize="17px" color="var(--text-primary)" as="span">Stats</Box></Text>
            </Flex>
        </Flex>
    )
}