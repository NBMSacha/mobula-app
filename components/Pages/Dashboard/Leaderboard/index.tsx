import { Flex, Box, Text, Image, Button, useColorModeValue } from "@chakra-ui/react";
import styles from '../dashboard.module.scss'

function Leaderboard({ top }) {
    const input = useColorModeValue("white_sun_moon", "dark_decision")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bg = useColorModeValue("bg_white", "dark_box_list")

    return (<Box bg={["none", "none", bg, bg]} boxShadow={["none", "none", `0px 1px 12px 3px ${shadow}`, `0px 1px 12px 3px ${shadow}`]} w="100%" borderRadius="10px" h="auto" minHeight="458px" m="10px auto" className={`${styles["padding-resp"]} ${styles["noneDis"]}`}>
        <Text color="var(--beli)" fontSize="22px" fontWeight="500">Leaderboard</Text>
        <Box p="50px 0px 0px 0px">
            {top.map((user: any, index: number) => {
                return <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                    <Flex align="center">
                        <Text color="grey" mr="5px">{(index + 1) == 1 ? '🥇' : (index + 1) + '.'}</Text>
                        <Text color="var(--beli)" mx="5px">{user.username.split('#')[0].slice(0, 9)}</Text>
                        <Text color="var(--score)" mr="10px">({user.address.slice(0, 4) + '...' + user.address.slice(user.address.length - 5, user.address.length - 1)})</Text>
                    </Flex>
                    <Flex align="center">
                        <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                        <Text ml="0px" color="#16C784" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">{user.good_decisions} Correct Decisions</Text>
                    </Flex>
                </Flex>
            })}

        </Box>
        <Flex justify="center">
            <Button bg={input} borderRadius="12px" boxShadow={`0px 1px 12px 3px ${shadow}`} className={styles["buttons-claim"]} onClick={() => document.location.href = "https://discord.gg/2a8hqNzkzN "}>Join the DAO</Button>
        </Flex>

    </Box >)
}

export default Leaderboard;