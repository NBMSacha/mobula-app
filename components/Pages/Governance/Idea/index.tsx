import React, { useState } from "react"
import { Flex, Button, Text, Textarea } from "@chakra-ui/react"

function Idea({proposal}) {
    const [value, setValue] = useState("")
    return (
            <Flex direction="column" mt={["20px", "20px","20px",""]} position="relative">
                <Text fontSize={["13px", "13px", "15px", "18px"]} mb="20px">Type your idea</Text>
                <Textarea
                    border="none"
                    boxShadow={`1px 2px 12px 3px var(--shadow)`}
                    borderRadius="12px"
                    color="none"
                    p="20px"
                    bg="var(--bg-governance-box)"
                    _placeholder={{color:"none"}}
                    minHeight="200px"
                    value={value}
                    onChange={(e) => { 
                        setValue(e.target.value)
                    }}
                    fontSize={["13px", "13px", "15px", "15px"]}
                    placeholder="What would you like to see on Mobula ?"
                    resize="none"
                />
                 <Button color="var(--blue)" display={["none", "none", "none", "flex"]} fontSize="12px" mt="12px" position={["initial","initial","absolute","absolute"]} borderRadius={["8x","8px","8px","12px"]} bottom="30px" right="30px" variant={"outline"} colorScheme="var(--blue)" p="10px 15px">Submit the DAO</Button>
                 <Button display={["flex", "flex", "flex", "none"]} color="white" fontSize="12px" mt="12px" position={["initial","initial","absolute","absolute"]} borderRadius={["8px","8px","8px","12px"]} bottom="30px" bg="var(--blue)" right="30px"  colorScheme="var(--blue)" p="10px 15px">Submit the DAO</Button>
            </Flex>
           
          
        )
}

export default Idea
