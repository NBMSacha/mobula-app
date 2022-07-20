import { Text, Flex, Box, Button, GridItem } from "@chakra-ui/react"
import TimeBox from "./TimeBox"
import Title from "../Title"
import {useState} from "react"
import { useWeb3React } from "@web3-react/core"
import { VAULT_ADDRESS } from "../../../../constants"
import { ethers } from "ethers"
import { useAlert } from "react-alert"
import Mobile from "./Mobile"

export default function Faucet({countdown,claim, provider}) {

    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const web3React = useWeb3React()
    const alert = useAlert()

    var x = setInterval(() => {
        var now = new Date().getTime();
        var distance = countdown - now
        setDays(Math.floor(distance / (1000 * 60 *60 *24)));
        setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
        setMinutes(Math.floor((distance % (1000 * 60 *60)) / (1000 * 60)))
        setSeconds(Math.floor((distance % (1000 * 60)) / (1000)))
    })

    return (
        <>
            <GridItem display={["none", "none", "none","initial"]} rowStart={1} colSpan={2} colStart={4} rowSpan={2}>
                <Title title={"MATIC for DAO"} />
                <Flex h="85%" bg="var(--bg-governance-box)" direction="column" borderRadius="0px 0px 12px 12px" align="center" justify="center">
                    <Text fontSize="12px" color="var(--text-grey)" mb="25px">Your next claim is available in</Text>         
                    <Flex>
                        <TimeBox time={"Days"} number={days} />
                        <TimeBox time={"Hours"} number={hours}/>
                        <TimeBox time={"Minutes"} number={minutes}/>
                        <TimeBox time={"Seconds"} number={seconds}/>
                    </Flex>
                    <Flex mt="30px" w="80%" justify="space-around" align="end">
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
                        <Text fontSize="12px" color="var(--text-grey)" textAlign="end" ml="10px">You already claimed <Box as="span" fontSize="14px" color="var(--text-primary)" > {claim} MATIC</Box></Text>
                    </Flex>
                </Flex>
            </GridItem>
            <Mobile claim={claim} provider={provider} days={days} hours={hours} minutes={minutes} seconds={seconds}/>
        </>
    )
}