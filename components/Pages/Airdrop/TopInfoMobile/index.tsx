import { Text, Link, Flex, Image } from "@chakra-ui/react"

export default function TopInfoMobile({token}) {
    return (
        <Flex display={["flex","flex","none","none"]} mt="20px" >
            <Link href={token.twitter} target="_blank" _hover={{ textDecoration: "none" }}>
                <Flex ml="10px" align="center">
                    <Image mr="10px" src="/twt.png" h="15px" opacity=".5" />
                    <Text mr="15px" fontSize={["11px", "11px","12px","12px"]} color="var(--text-grey)">Twitter</Text>
                </Flex>
            </Link>
            <Link href={token.telegram} target="_blank" _hover={{ textDecoration: "none" }}>
                <Flex align="center">
                    <Image ml="10px" mr="10px" src="/tlg.png" opacity=".5" h="15px"/>
                    <Text mr="15px" fontSize={["11px", "11px","12px","12px"]} color="var(--text-grey)">Telegram</Text>
                </Flex>
            </Link>
            <Link href={token.website} target="_blank" _hover={{ textDecoration: "none" }}>
                <Flex align="center">
                    <Image ml="10px" mr="10px" src="/webs.png" opacity=".5" h="15px"/>
                    <Text mr="15px" fontSize={["11px", "11px","12px","12px"]} color="var(--text-grey)">Website</Text>
                </Flex>
            </Link>
        </Flex>
    )
}