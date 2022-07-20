import { Text, Flex } from "@chakra-ui/react"

export default function TimeBox({time,number}) {
    return (
        <Flex direction="column" align="center" justify="center" mr={["10px","10px","15px","15px"]}>
            <Flex align="center" justify="center" h="40px" borderRadius="8px" w={["40px","40px","50px","60px"]} border="1px solid var(--box_border)" bg="rgba(41, 44, 56, 0.3)">
                {!isNaN(number) ?? (
                    <Text fontSize={["11px","11px","12px","12px"]}>{number}</Text>
                )}
            </Flex>
            <Text fontSize={["11px","11px","12px","12px"]} color="var(--text-grey)" mt="10px">{time}</Text>
        </Flex>
    )
}