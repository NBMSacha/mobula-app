import { Flex, Box, Text, Image, Button, useColorModeValue } from "@chakra-ui/react";
import styles from '../dashboard.module.scss'

function Leaderboard({ top }) {
    
    const input = useColorModeValue("white_sun_moon", "dark_decision")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bg = useColorModeValue("light_primary_box", "dark_primary_box")
    

    return (<Box  bg={[bg, bg, bg, bg]} boxShadow={[`0px 1px 12px 3px ${shadow}`, `0px 1px 12px 3px ${shadow}`, `0px 1px 12px 3px ${shadow}`, `0px 1px 12px 3px ${shadow}`]} w="100%" borderRadius="10px" h="auto" minHeight={["400px","400px","458px","458px"]} mx="auto" mt={["0px","0px","10px","10px"]} className={`${styles["padding-resp"]}`}>
        <Text color="var(--beli)" pb={["22px","22px","30px","30px"]} fontSize={["16px","16px","22px","22px"]} fontWeight="500">Leaderboard</Text>
        <Box maxHeight="320px" pr="20px" overflowY="scroll" className={styles["scroll"]} >
            {top.map((user: any, index: number) => {
                return <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                    <Flex align="center">
                        <Text w="20px" color="grey" mr="5px">{(index + 1) == 1 ? '🥇' : (index + 1) + '.'}</Text>
                        <Flex direction="column">
                            <Text fontSize="13px" color="var(--beli)" >{user.username.split('#')[0].slice(0, 9)}</Text>
                            <Text fontSize="9px" opacity=".6" color="var(--score)" mr="10px">{user.address.slice(0, 4) + '...' + user.address.slice(user.address.length - 5, user.address.length - 1)}</Text>
                        </Flex>
                    </Flex>
                    <Flex align="center">
                        <Text ml="0px" fontSize={["12px","12px","15px","15px"]} color="#16C784" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">{user.good_decisions} Correct Decisions</Text>
                    </Flex>
                </Flex>
            })}
        </Box>
    </Box >)
}

export default Leaderboard;