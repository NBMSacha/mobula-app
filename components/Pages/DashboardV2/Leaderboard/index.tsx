import { GridItem } from "@chakra-ui/react"
import { Text, Flex, Box, Button} from "@chakra-ui/react"
import Title from "../Title"
import { useState } from "react"
import Line from "./Line"
import { useWeb3React } from "@web3-react/core"
import Mobile from "./Mobile"

export default function Leaderboard({top,goodChoices, badChoices, userRank,finalBadChoice,finalGoodChoice}) {

    const { account } = useWeb3React()
    const [isUser, setIsUser] = useState(false)

    const sumGoodDecision = top.reduce((accumulator,currentValue) => {
        return accumulator + currentValue.good_decisions
    }, 0)

    const sumBadDecision = top.reduce((accumulator,currentValue) => {
        return accumulator + currentValue.bad_decisions
    }, 0)

    return (
        <>
            <GridItem display={["none", "none", "none","initial"]} rowStart={3} colStart={4} colSpan={2} rowSpan={4}>
                <Title title={"Leaderboard"} />
                <Flex h="542px" w="100%" direction="column" p="30px 30px" bg="var(--bg-governance-box)" borderRadius="0px 0px 12px 12px">
                    <Flex align="center" mb="20px">
                        <Button fontSize="12px" py="6px" mr="35px" _focus={{ boxShadow: "none" }}
                                borderRadius="8px" w="105px" bg={"var(--elections)"} fontWeight="300"
                        >
                            Your Rank #{userRank}
                        </Button>
                        <Text fontSize="10px" mr="35px" color="green">{sumGoodDecision} Good decisions</Text>
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


            <Mobile top={top} badChoices={badChoices} sumBadDecision={sumBadDecision} sumGoodDecision={sumGoodDecision} userRank={userRank} account={account} setIsUser={setIsUser}/>
        </>
        
    )
}