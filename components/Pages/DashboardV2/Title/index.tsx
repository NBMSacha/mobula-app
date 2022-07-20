import { Text, Flex } from "@chakra-ui/react"

export default function Title({title}) {
    return (
            <Flex h="40px" bg="rgba(41, 44, 56, 0.3)" borderRadius="12px 12px 0px 0px">
                <Flex align="center" w="90%" mx="auto">
                    <Text fontSize="16px" >{title}</Text>
                </Flex>
            </Flex>
    )
}