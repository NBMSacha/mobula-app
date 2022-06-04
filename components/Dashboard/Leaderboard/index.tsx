import { Flex, Box, Text, Image, Button, useColorModeValue } from "@chakra-ui/react";
import styles from '../dashboard.module.scss'

function Leaderboard({ top }) {
    const input =  useColorModeValue("white_sun_moon", "dark_decision")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bg = useColorModeValue("bg_white", "dark_box_list")

    return (<Box bg={["none", "none", bg, bg]} boxShadow={["none", "none",  `0px 1px 12px 3px ${shadow}`,  `0px 1px 12px 3px ${shadow}`]} w="100%" borderRadius="10px" h="auto" minHeight="458px" m="10px auto" className={`${styles["padding-resp"]} ${styles["noneDis"]}`}>
        <Text color="var(--beli)" fontSize="22px" fontWeight="500">Leaderboard</Text>
        <Box p="50px 0px 0px 0px">
            <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                <Flex align="center">
                    <Text color="var(--beli)" opacity={.5} mr="5px">1.</Text>
                    <Text color="var(--beli)" mx="5px">RohitGuru</Text>
                    <Text color="var(--score)" mr="10px">(0x3e2...24b4)</Text>
                </Flex>
                <Flex align="center">
                    <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                    <Text ml="0px" color="#16C784" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">207 Correct Decisions</Text>
                </Flex>
            </Flex>
            {/* TO REMOVE UNDER */}
            <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                <Flex align="center">
                    <Text color="var(--beli)" opacity={.5} mr="5px">2.</Text>
                    <Text color="var(--beli)" mx="5px">Arch</Text>
                    <Text color="var(--score)" mr="10px">(0x28...B9C)</Text>
                </Flex>
                <Flex align="center">
                    <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                    <Text ml="0px" color="#16C784" >184 Correct Decisions</Text>
                </Flex>
            </Flex>
            <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                <Flex align="center">
                    <Text color="var(--beli)" opacity={.5} mr="5px">3.</Text>
                    <Text color="var(--beli)" mx="5px">Prince</Text>
                    <Text color="var(--score)" mr="10px">(0x967a...a4820)</Text>
                </Flex>
                <Flex align="center">
                    <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                    <Text ml="0px" color="#16C784" >182 Correct Decisions</Text>
                </Flex>
            </Flex>
            <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                <Flex align="center">
                    <Text color="var(--beli)" opacity={.5} mr="5px">4.</Text>
                    <Text color="var(--beli)" mx="5px">TJR</Text>
                    <Text color="var(--score)" mr="10px">(0x654...C238C)</Text>
                </Flex>
                <Flex align="center">
                    <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                    <Text ml="0px" color="#16C784" >153 Correct Decisions</Text>
                </Flex>
            </Flex>
            <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                <Flex align="center">
                    <Text color="var(--beli)" opacity={.5} mr="5px">5.</Text>
                    <Text color="var(--beli)" mx="5px">Beli</Text>
                    <Text color="var(--score)" mr="10px">(0xb76...3Cab9)</Text>
                </Flex>
                <Flex align="center">
                    <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                    <Text ml="0px" color="#16C784" >130 Correct Decisions</Text>
                </Flex>
            </Flex>
            <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                <Flex align="center">
                    <Text color="var(--beli)" opacity={.5} mr="5px">6.</Text>
                    <Text color="var(--beli)" mx="5px">Hercute</Text>
                    <Text color="var(--score)" mr="10px">(0xfbf...B51e)</Text>
                </Flex>
                <Flex align="center">
                    <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                    <Text ml="0px" color="#16C784" >113 Correct Decisions</Text>
                </Flex>
            </Flex>
            <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                <Flex align="center">
                    <Text color="var(--beli)" opacity={.5} mr="5px">7.</Text>
                    <Text color="var(--beli)" mx="5px">Kanga</Text>
                    <Text color="var(--score)" mr="10px">(0x95...4C14)</Text>
                </Flex>
                <Flex align="center">
                    <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                    <Text ml="0px" color="#16C784" >110 Correct Decisions</Text>
                </Flex>
            </Flex>
            {/* TO REMOVE UP */}
        </Box>
        <Flex justify="center">
             <Button bg={input} borderRadius="12px" boxShadow={`0px 1px 12px 3px ${shadow}`} className={styles["buttons-claim"]} onClick={() => document.location.href = "https://discord.gg/2a8hqNzkzN "}>Join the DAO</Button>
        </Flex>
      
    </Box >)
}

export default Leaderboard;