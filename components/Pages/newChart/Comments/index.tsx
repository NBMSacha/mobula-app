import { Button, Flex, Box, Text } from "@chakra-ui/react"
import Line from "./Line"
import { Textarea } from "@chakra-ui/react"
import {useState} from "react"

export default function Comments() {
    const [ comment, setComment] = useState("This is use State")
    return(
        <Box w="100%" h="100%" bg="var(--bg-governance-box)" boxShadow={`1px 2px 12px 3px var(--shadow)`} borderRadius="12px" m="0px 0px" p={["15px 10px","15px 10px","10px 10px","30px 10px"]} mt="0px">
                    <Text fontSize={["12px","12px","20px","20px"]} fontWeight="600" ml="20px" mb={["8px","8px","5px","20px"]}>Comments</Text>
                    <Box display={["none","none","none","block"]} overflowY="scroll" className="scroll" maxHeight={["460px"]}>
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                        <Line />
                    </Box>
                    <Flex>

                   
                        <Box display={["block","block","block","none"]} w="50%"  maxHeight={["160px","170px","160px","160px"]} overflowY="scroll" className="scroll">
                            <Line />
                            <Line />
                            <Line />
                            <Line />
                        </Box>
                        <Box mx="auto" w={["50%","50%","45%","90%"]} mt="0px" px={["10px","10px","0px","0px"]}>
                            <Textarea
                            mt={["0px","0px","0px","20px"]}
                                value={comment}
                                fontSize={["9px","9px","14px","14px"]}
                                borderRadius="12px"
                                border="2px solid var(--box_border) !important"
                                p="15px"
                                onChange={(e) => {
                                    setComment(e.target.value)
                                }}
                                placeholder="Here is a sample placeholder"
                                size="sm"
                                bg="var(--contract)"
                                minHeight={["130px","130px","110px","110px"]}
                            />
                            <Button fontSize={["11px","11px","12px","14px"]} bg="var(--btn_token)" w="100%" py={["7px","7px","9px","13px"]} borderRadius="8px"
                            border="1px solid var(--box_border_active)" mt="10px" _focus={{ boxShadow: "none" }}
                            onClick={() => {
                            }}
                            >
                                Submit (10 MOBL)
                            </Button>
                        </Box>

                    </Flex>
                    
                </Box>
    )
}