import { Text, Flex, Box, Button, GridItem} from "@chakra-ui/react"
import Rank from "./Rank"
import RankTitle from "./RankTitle"
import { useWeb3React } from "@web3-react/core"
import { PROTOCOL_ADDRESS } from "../../../../constants"
import { ethers } from "ethers"
import { useAlert } from "react-alert"

export default function RankStats({finalBadChoice, finalGoodChoice, firstGoodChoice, firstBadChoice,firstTokensOwed,finalTokensOwed}) {
    let provider;
    const web3React = useWeb3React()
    const alert = useAlert()
    return (
        <>
         <GridItem display={["none", "none", "none","initial"]} rowStart={1} colSpan={3} rowSpan={2} >
            <Flex h="40px" bg="rgba(41, 44, 56, 0.3)" borderRadius="12px 12px 0px 0px">
                <RankTitle title={"Rank 1"} />
                <RankTitle title={"Rank 2"} />
            </Flex>
            <Flex h="85%" bg="var(--bg-governance-box)" borderRadius="0px 0px 12px 12px">
                <Rank title={"Rank I"} goodChoices={firstGoodChoice} badChoices={firstBadChoice} tokensOwed={firstTokensOwed} />
                <Rank title={"Rank II"} goodChoices={finalGoodChoice} badChoices={finalBadChoice} tokensOwed={finalTokensOwed}/>
            </Flex>
        </GridItem>
        
        <GridItem bg="var(--bg-governance-box)" borderRadius="8px 8px 8px 8px" display={["initial", "initial", "initial","none"]} rowStart={3} colSpan={5} rowSpan={2} >
            <Flex h="40px" bg="rgba(41, 44, 56, 0.3)" borderRadius="12px 12px 0px 0px">
                <RankTitle title={"Rank "} />
            </Flex>
            <Flex w="100%"  justify="space-evenly" direction={[, "column", "column", "row"]} >
                  <Flex
                    boxShadow={[`0px 1px 12px 3px var(--shadow)`, `0px 1px 12px 3px var(--shadow)`, `0px 1px 12px 3px var(--shadow)`, `0px 1px 12px 3px var(--shadow)`]}
                    direction={["row", "row", "row", "column"]}
                    justify={["start", "start", "center", "center"]}
                    p={["4px 4px 4px 4px", "4px 4px 4px 4px", "4px 4px 4px 4px", "34px 34px 34px 34px"]}
                    borderRadius="0px 0px 8px 8px"
                    w={["100%", "100%", "100%", "50%"]}
                    textAlign={["center", "center", "center", "left"]}
                    mb={["10px", "10px", "7px", 0]}
                    position="relative"
                    align="center"
                    mt={["20px","20px","0px"]}
                  >
                    <Flex direction={["column", "column", "column", "row"]} justify="center" bg="none" w="50%" p={["10px","10px","5px 30px","10px"]} >
                      <Text textAlign="start" fontSize="12px" mb={2}>
                        Rank I <span >Stats</span>
                      </Text>
                      <Flex color="green" direction="row" fontSize="15px" align="center" justify="space-between" mb={[0, 0, 0, 5]} w="90%" position="relative">
                        <Text mb={2} whiteSpace="nowrap" fontSize={["11px", "11px", "11px", "14px"]} mr="10px">Correct Decisions : </Text>
                        <Flex align="center" justify="center" fontSize={["12px", "12px", "12px", "14px"]} fontWeight="800" mb={2} bg={["none", "none", "none", "#202433"]} borderRadius="15px" w={["30px", "30px", "90px", "90px"]}> {firstGoodChoice}</Flex>
                      </Flex>
                      <Flex color="red" direction="row" fontSize="15px" align="center" w="90%" justify={["space-between", "space-between", "space-between", "start"]} mb={[0, 0, 0, 5]} position="relative" >
                        <Text mb={2} whiteSpace="nowrap" fontSize={["11px", "11px", "11px", "14px"]} mr="10px">Wrong Decisions :</Text>

                        <Flex align="center" justify="center" fontSize={["12px", "12px", "12px", "14px"]} fontWeight="800" mb={2} bg={["none", "none", "none", "#202433"]} mt={["0px", "0px", "15px", "15px"]} borderRadius="15px" w={["30px", "30px", "90px", "90px"]}>{firstBadChoice}</Flex>
                      </Flex>
                      <Box h="1px" w="90%" bg="var(--box_border)" mt={2} mb={3}></Box>
                      <Text textAlign="start" fontSize="12px" mb={2}>
                        Rank II <span >Stats</span>
                      </Text>
                      <Flex color="green" direction="row" fontSize="15px" align="center" justify={["space-between", "space-between", "space-between", "start"]} mb={[0, 0, 0, 5]} w="90%" position="relative">
                        <Text mb={2} whiteSpace="nowrap" fontSize={["11px", "11px", "14px", "14px"]} mr="10px">Correct Decisions :</Text>
                        <Flex align="center" justify="center" fontSize={["12px", "12px", "12px", "14px"]} fontWeight="800" mb={2} bg={["none", "none", "none", "#202433"]} mt={["0px", "0px", "15px", "15px"]} borderRadius="15px" w={["30px", "30px", "90px", "90px"]}>{finalGoodChoice}</Flex>
                      </Flex>
                      <Flex color="red" direction="row" fontSize="15px" align="center" justify={["space-between", "space-between", "space-between", "start"]} mb={[0, 0, 0, 5]} w="90%" position="relative">
                        <Text whiteSpace="nowrap" mb={2} fontSize={["11px", "11px", "14px", "14px"]} mr="10px">Wrong Decisions :</Text>
                        <Flex align="center" justify="center" fontSize={["12px", "12px", "12px", "14px"]} fontWeight="800" mb={2} bg={["none", "none", "none", "#202433"]} mt={["0px", "0px", "15px", "15px"]} borderRadius="15px" w={["30px", "30px", "90px", "90px"]}>{finalBadChoice}</Flex>
                      </Flex>
                    </Flex>
                    <Box h="1px" w="1px" mt="10px" bg="var(--box_border)" mb={3}></Box>
                    <Flex
                      width={["50%", "50%", "50%", "100%"]}
                      justify="center"
                      align="center"
                      direction="column"
                      borderLeft={`1px solid var(--box_border)`}
                      mb="30px"
                    >
                      {" "}
                      <Box fontSize="15px" mb={5} mt={5} w="150px">
                        <Text mb={0} mt={0} textAlign="center" fontSize="11px" bottom="60px" > The Protocol currently owes you <b>{ "  $MOBL"}</b></Text>
                      </Box>
                      <Button
                        _focus={{ boxShadow: "none" }} fontSize="12px" py="8px" borderRadius="6px" px="25px" bg="var(--elections)" fontWeight="300" border="2px solid var(--box_border_active)"
                        boxShadow={`0px 1px 12px 3px var(--shadow)`}
                        onClick={async (e) => {
                            e.preventDefault()
                            try {
                              provider = new ethers.providers.Web3Provider(web3React.library.provider);
                              var signer = provider.getSigner()
                            } catch (e) {
                              alert.error(
                                "You must connect your wallet to access the Dashboard."
                              )
                            }
                            try {
                              const value = await new ethers.Contract(
                                PROTOCOL_ADDRESS,
                                ["function claimFinalRewards() external"],
                                signer
                              ).claimFinalRewards()
                            } catch (e) {
  
                              try {
                                const value = await new ethers.Contract(
                                  PROTOCOL_ADDRESS,
                                  ["function claimRewards() external"],
                                  signer
                                ).claimRewards()
                              } catch (e) {
                                alert.show("You don't have anything to claim.")
                              }
                            }
                          }}
                      >       <Flex justify="center" align="center">
                          <Text >Claim MOBL</Text>
                        </Flex>
                      </Button>
                      
                    </Flex>
                  </Flex>
                </Flex>
        </GridItem>
        </>
       
    )
}