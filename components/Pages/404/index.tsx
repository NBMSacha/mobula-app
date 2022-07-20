import { Flex, Box, Text, Image,Link } from "@chakra-ui/react"
import styles from "./Error.module.scss"
export default function Error() {
    return (
        <Flex direction="column" maxWidth="1450px" w="90%" mx="auto" mb="100px">
            <Box borderRadius="8px" mt="28px" p={["5px","10px","15px","15px"]} border="1px solid var(--box_border)" boxShadow="1px 2px 13px 3px var(--shadow)" mx="auto" position="relative">
                <Image borderRadius="5px" src="./contribute.png"/>
                <Text position="absolute" top="45%" left="50%" className={styles["fontSize"]} fontWeight="600" color="white" transform="translate(-50%)">Oops... Something went wrong.</Text>
            </Box>
            <Box h="1px" mx="auto" w="188px" bg="var(--box_border)" my={["15px","15px","20px","20px"]}></Box>
            <Text w={["220px","300px","350px","350px"]} color="var(--text-grey)" textAlign="center" mx="auto" fontSize={["9px","10px","12px","12px"]}>Mobula is currently under Alpha version. Expect few bugs. If you think you found one, please report it to us.</Text>
            <Flex mx="auto" align="center" mt={["15px","20px","25px","25px"]} mb={["20px","25px","30px","30px"]}>
                <Link _focus={{ boxShadow: "none" }} href="https://t.me/MobulaFi" mx="auto">
                    <Image mr="10px" h={["20px","20px","auto","auto"]} src="telegram-404.png" />
                </Link>
                <Link _focus={{ boxShadow: "none" }} href="https://twitter.com/MobulaFi" mx="auto">
                    <Image mr="10px" h={["20px","20px","auto","auto"]} src="twitter-404.png" />
                </Link>
                <Link _focus={{ boxShadow: "none" }} href="https://discord.gg/2a8hqNzkzN" mx="auto">
                    <Image h={["20px","20px","auto","auto"]} src="discord-404.png" />
                </Link>
            </Flex>
            <Link href="/" mx="auto" _hover={{ boxShadow:"none",textDecoration: "none" }}>
                <Flex w={["100px","100px","130px","130px"]} borderRadius="6px" h={["30px","35px","40px","40px"]} align="center" justify="center" bg="var(--box_active)" border="1px solid var(--box_border_active)">
                    <Text fontSize={["10px","10px","13px","13px"]}>Back to home</Text>
                </Flex> 
            </Link>
        </Flex>
    )
}