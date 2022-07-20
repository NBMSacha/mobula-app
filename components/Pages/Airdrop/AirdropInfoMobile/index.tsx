import { Text, Flex, Box } from "@chakra-ui/react"

export default function AirdropInfoMobile({token}) {
    return (
        <Flex  boxShadow="1px 2px 13px 3px var(--shadow)" display={["flex","flex","none","none"]}  mt="10px" justify={["space-between","space-around","space-between","space-between"]} bg="var(--bg-governance-box)" p="20px 30px" borderRadius="12px">
        <Box>
            <Text mb="5px" fontSize="9px">Airdrop Ammount</Text>
            <Text mb="10px" color="var(--text-grey)" fontSize="12px">{token.amount}</Text>
            <Text mb="5px" fontSize="9px">Airdrop Ammount</Text>
            <Text fontSize="12px"><Box as="span"  color="blue" fontSize="12px">1 MOBL </Box>/ {token.taux + " " + token.symbol}</Text>
        </Box>
        <Box>
            <Text mb="5px" fontSize="9px" >Number of winners</Text>
            <Text mb="10px" color="green" fontSize="12px">{token.winners}</Text>
            <Text mb="5px" fontSize="9px" >Participants</Text>
            <Text fontSize="12px" color="var(--text-grey)">{token.participated}</Text>
        </Box>
    </Flex>
    )
}