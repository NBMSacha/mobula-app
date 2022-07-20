import React, { useState } from "react"
import { Flex, Button, Input, Text, Heading } from "@chakra-ui/react"

function Power({proposal}) {
    const [deposit, setDeposit] = useState("")
    const [withdraw, setWithdraw] = useState("")
    return (
            <Flex direction="column" align="center" pt={["20px","20px","30px","40px"]} bg="var(--bg-governance-box)" mt={["0px","0px","20px","20px"]} boxShadow={`1px 2px 12px 3px var(--shadow)`} borderRadius="15px">
                {/* TITLE */}
                <Flex w={["90%","90%","85%","85%"]} mb={["10px","10px","30px","30px"]}>
                    <Flex align="end" justify="space-between" w="100%">
                        <Heading fontFamily="Poppins" mb="8px" fontSize={["13px", "13px", "15px", "18px"]}>Voting Power</Heading>
                    </Flex>
                </Flex>
                {/* DEPOSIT */}
                <Flex direction="column" w={["90%","90%","85%","85%"]}>
                    <Flex justify="space-between" align="end" mb="15px">
                        <Text >Deposit New Token</Text>
                    </Flex>
                    <Flex justify="space-between" align="center" mb="30px">
                        <Input 
                            value={deposit}
                            w="75%"
                            color="none"
                            marginRight="10px"
                            border="none"
                            px="20px"
                            h={["30px","30px","30px","35px"]}
                            bg="var(--inputs)"
                            borderRadius={["8px","8px","8px","10px"]}
                            _placeholder={{color:"grey"}}
                            // boxShadow={`1px 2px 12px 3px ${shadow}`}
                            placeholder="2000"
                            onChange={(e) => {
                                setDeposit(e.target.value)
                            }}
                        />
                        <Button variant="outline" color="var(--btn-outline)"  _focus={{boxShadow:"none"}} colorScheme="var(--blue)" borderRadius={["8px","8px","12px","12px"]} px={["5px","5px","10px","10px"]} w={["80px","100px","120px","120px"]} h={["30px","30px","30px","35px"]} fontSize={["10px","10px","10px","13px"]}>Withdraw</Button>
                    </Flex>
                </Flex>
                 {/* WITHDRAW */}
                 <Flex direction="column" w={["90%","90%","85%","85%"]} pb={["50px","50px","100px","100px"]}>
                    <Flex justify="space-between" align="end" mb="15px" >
                        <Text>Withdraw New Token</Text>
                    </Flex>
                    <Flex justify="space-between" align="center">
                        <Input 
                            w="75%"
                            marginRight="10px"
                            value={withdraw}
                            color="none"
                            border="none"
                            px="20px"
                            h={["30px","30px","30px","35px"]}
                            bg="var(--inputs)"
                            borderRadius={["8px","8px","8px","10px"]}
                            _placeholder={{color:"grey"}}
                            // boxShadow={`1px 2px 12px 3px ${shadow}`}
                            placeholder="2000"
                            onChange={(e) => {
                                setWithdraw(e.target.value)
                            }}
                        />
                        <Button variant="outline" color="var(--btn-outline)" _focus={{boxShadow:"none"}} colorScheme="var(--blue)" borderRadius={["8px","8px","12px","12px"]} px={["5px","5px","10px","10px"]} w={["80px","100px","120px","120px"]} h={["30px","30px","30px","35px"]} fontSize={["10px","10px","10px","13px"]}>Deposit</Button>
                    </Flex>
                </Flex>
            </Flex>
        )
}

export default Power
