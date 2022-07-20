import { Text, Flex, Box } from "@chakra-ui/react"
export default function AirdropInfo({token}) {
    return (
        <Flex w="100%"  mx="auto" display={["none","none","flex","flex"]} >
            <Box ml="10px" borderRadius="7px" w="160px" fontSize={["14px","14px","12px","14px"]} mr="15px" border="1px solid var(--box_border)" bg="var(--gradient_airdrop)" p="10px 10px" mt="30px" mb="10px">
                <Text color="var(--text-grey)">Airdrop Ammount</Text>
                <Text >{token.amount}</Text>
            </Box>
            <Box borderRadius="7px" w="160px" mr="15px" fontSize={["14px","14px","12px","14px"]} border="1px solid var(--box_border)" bg="var(--gradient_airdrop)" p="10px 10px" mt="30px" mb="10px">
                <Text color="var(--text-grey)">Participants</Text>
                <Text >{token.participated}</Text>
            </Box>
            <Box borderRadius="7px" w="160px" mr="15px" fontSize={["14px","14px","12px","14px"]} border="1px solid var(--box_border)" bg="var(--gradient_airdrop)" p="10px 10px" mt="30px" mb="10px">
                <Text color="var(--text-grey)">Number of winners</Text>
                <Text color="green">{token.winners}</Text>
            </Box>
            <Box borderRadius="7px" w="160px" fontSize={["14px","14px","12px","14px"]} border="1px solid var(--box_border)" bg="var(--gradient_airdrop)" p="10px 10px" mt="30px" mb="10px">
                <Text color="var(--text-grey)">Token Change</Text>
                <Text ><Box as="span" color="blue">1 MOBL </Box>/ {token.taux + " " + token.symbol}</Text>
            </Box>
        </Flex>
    )
}