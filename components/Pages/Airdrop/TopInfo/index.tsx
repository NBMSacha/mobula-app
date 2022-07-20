import { Text, Link, Flex, Box, Image } from "@chakra-ui/react"

export default function TopInfo({token}) {
    return (
        <Flex justify="space-between" align="center" w="100%">
            <Flex >
                <Flex align="center" mr="40px">
                    <Image src={token.logo} borderRadius="full" h={["30px","30px","40px","47px"]}  mr="15px"/>
                    <Text fontSize={["14px", "14px","25px","30px"]}>{token.name}</Text>
                </Flex>
                <Flex display={["none","none","flex","flex"]} align="center">
                    <Link href={token.twitter} target="_blank" _hover={{ textDecoration: "none" }}>
                        <Flex align="center">
                            <Image mr="10px" src="/twt.png" h="20px" opacity=".5" />
                            <Text mr="15px" fontSize={["12px", "12px","12px","12px"]} color="var(--text-grey)">Twitter</Text>
                        </Flex>
                    </Link>
                    <Link href={token.telegram} target="_blank" _hover={{ textDecoration: "none" }}>
                        <Flex align="center">
                            <Image ml="10px" mr="10px" src="/tlg.png" opacity=".5" h="20px"/>
                            <Text mr="15px" fontSize={["12px", "12px","12px","12px"]} color="var(--text-grey)">Telegram</Text>
                        </Flex>
                    </Link>
                    <Link href={token.website} target="_blank" _hover={{ textDecoration: "none" }}>
                        <Flex align="center">
                            <Image ml="10px" mr="10px" src="/webs.png" opacity=".5" h="20px"/>
                            <Text mr="15px" fontSize={["12px", "12px","12px","12px"]} color="var(--text-grey)">Website</Text>
                        </Flex>
                    </Link>
                    </Flex>
                </Flex>
                <Flex direction="column" w="140px" ml="15px">
                    <Flex mb="5px" justify="space-between" fontWeight="300" >
                        <Text fontSize={["8px", "8px", "9px", "10px"]} whiteSpace="nowrap">{token.minted} {token.symbol} Claimed on {token.amount}</Text>
                    </Flex>
                    <Flex h={["3px", "3px", "5px", "5px"]} w="100%" bg="#87878720" borderRadius="8px">
                        <Box bg="green" h="100%" w={(token.minted / token.amount) * 100 + "%"} borderRadius="8px"></Box>
                    </Flex>
                </Flex>
            </Flex>
    )
}