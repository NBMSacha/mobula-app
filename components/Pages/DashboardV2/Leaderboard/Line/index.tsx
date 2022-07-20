import { Text, Flex, Box } from "@chakra-ui/react"
export default function Line({user, index}) {
    
    return (
                <Flex align="center" w="90%" mx="auto" mt="10px">
                    <Box mr={(index + 1) === 1 ? "20px" : "30px"}>
                        <Text pb="15px" fontSize="13px">{(index + 1) === 1 ? "🥇" : (index + 1) + ""}</Text>
                    </Box>
                    <Flex align="center" borderBottom="1px solid var(--box_border)" w="100%" justify="space-between">
                        <Box pb="15px">
                            <Text fontSize="13px" mb="3px">{user.username.split("#")[0].slice(0,9)}</Text>
                            <Text fontSize="10px" color="var(--text-grey)">{user.address.slice(0, 4) + "..." + user.address.slice(user.address.length - 5, user.address.length - 1)}</Text>
                        </Box>
                        <Text fontSize="12px" color="green" pb="15px">{user.good_decisions} correct decisions</Text>
                    </Flex>
                </Flex>
    )
}