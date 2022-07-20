import { Text, Flex, Box, GridItem, Button } from "@chakra-ui/react"
import TimeBox from "./../TimeBox"
import Title from "../../Title"
import { useWeb3React } from "@web3-react/core"
import { VAULT_ADDRESS } from "../../../../../constants"
import { ethers } from "ethers"
import { useAlert } from "react-alert"

export default function Faucet({claim, provider,days,hours,minutes,seconds}) {
    const web3React = useWeb3React()
    const alert = useAlert()
    return (
     
            <GridItem display={["initial", "initial", "initial","none"]} rowStart={1} colSpan={5} colStart={1} rowSpan={2}>
            <Title title={"MATIC for DAO"} />
            <Flex h="85%" bg="var(--bg-governance-box)" direction="column" borderRadius="0px 0px 12px 12px" align="center" justify="center">
                <Text fontSize="12px" color="var(--text-grey)" mb="15px">Your next claim is available in</Text>         
                <Flex>
                    <TimeBox time={"Days"} number={days} />
                    <TimeBox time={"Hours"} number={hours}/>
                    <TimeBox time={"Minutes"} number={minutes}/>
                    <TimeBox time={"Seconds"} number={seconds}/>
                </Flex>
                <Flex mt="20px" w="90%" justify="space-around" direction="column" align="center">
                    <Button _focus={{ boxShadow: "none" }} fontWeight="300" fontSize="12px" py="8px" borderRadius="6px" px="25px" bg="var(--elections)" border="2px solid var(--box_border_active)"  onClick={async (e) => {
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
                            VAULT_ADDRESS,
                            ["function claim() external"],
                            signer
                          ).claim()
                        } catch (e) {
                          if (e.data && e.data.message) {
                            alert.error(e.data.message.split(";"))
                          } else {
                            // alert.error("Something went wrong.")
                          }
                        }
                      }}>Claim MOBL</Button>
                    <Text fontSize="12px" mt="15px" color="var(--text-grey)">You already claimed <Box as="span" fontSize="14px" color="var(--text-primary)" > {claim} MATIC</Box></Text>
                </Flex>
            </Flex>
        </GridItem>
  
    )
}