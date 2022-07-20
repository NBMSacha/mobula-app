import { GridItem } from "@chakra-ui/react"
import { Text, Flex, Box, Button} from "@chakra-ui/react"
import Title from "../../Title"
import Line from "./../Line"

export default function Leaderboard({top, badChoices, userRank, account, setIsUser,sumGoodDecision,sumBadDecision}) {

    return (
    
            <GridItem display={["initial", "initial", "initial","none"]} rowStart={5} colStart={1} colSpan={5} rowSpan={4}>
                <Title title={"Leaderboard"} />
                <Flex h="542px" w="100%" direction="column" p="30px 20px" bg="var(--bg-governance-box)" borderRadius="0px 0px 12px 12px">
                    <Flex align="center" mb="20px">
                        <Button fontSize="10px" py="6px" mr="15px" _focus={{ boxShadow: "none" }}
                                borderRadius="8px" w="105px" bg={"var(--elections)"} fontWeight="300"
                        >
                            Your Rank #{userRank}
                        </Button>
                        <Text fontSize="10px" mr="15px" color="green">{sumGoodDecision} Good decisions</Text>
                        <Text fontSize="10px" color="red">{sumBadDecision} Bad decisions</Text>
                    </Flex>
                    <Box h="450px" overflowY="scroll" className="scroll">
                        {top.map((user:any, index:number) => {
                            if(account === user.address) {
                                setIsUser(true)
                            }
                            return <Line user={user} index={index} />
                        })}
                    </Box>
                </Flex>
            </GridItem>
    )
}