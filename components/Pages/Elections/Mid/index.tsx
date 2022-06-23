import React, { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown } from "react-feather"
import {
    Text,
    Flex,
    Input,
    Button,
    Textarea
} from "@chakra-ui/react";

function Mid({ promote, firstInput, secondInput, setFirstInput, firstValue }) {

    return (
        <Flex w="50%" direction="column" ml="10px">
            <Flex mb="10px" p={["10px", "10px", "15px", "20px"]} boxShadow={`1px 2px 13px 3px var(--shadow)`} direction="column"  bg="var(--bg-governance-box)" borderRadius="12px">
                <Flex color="red" align="center" mb="10px">
                    <Text mr="20px" fontSize={["18px", "18px", "18px", "23px"]}>Promotion</Text>
                    <ThumbsDown />
                </Flex>
                <Flex direction="column">
                    <Text fontSize={["12px", "12px", "15px", "15px"]} mb="15px" opacity=".7">Amount of Rank I seats members</Text>
                    <Text fontSize={["14px", "14px", "17px", "17px"]} mb="15px" color={firstInput > 0 ? "green" : "red"}>{firstInput} Members</Text>
                    <Text fontSize={["12px", "12px", "15px", "15px"]} mb="15px" opacity=".7">Amount of Rank II seats members</Text>
                    <Text fontSize={["14px", "14px", "17px", "17px"]} mb="15px" color={secondInput > 0 ? "green" : "red"}> {secondInput} Members</Text>
                </Flex>
            </Flex>
            <Flex p={["10px", "10px", "15px", "20px"]} boxShadow={["none", "none", "none", `1px 2px 13px 3px var(--shadow)`]} direction="column" bg="var(--bg-governance-box)" borderRadius="12px">
                <Text fontSize={["12px", "12px", "15px", "15px"]} mb="10px" opacity="0.7">Adress to demote</Text>
                <Input
                    h={["29px", "29px", "29px", "32px"]}
                    borderRadius="8px"
                    placeholder="0x"
                    value={firstValue}
                    onChange={(e) => setFirstInput(e.target.value)}
                    bg="var(--inputs)"
                    boxShadow={`1px 2px 13px 3px var(--shadow)`}
                    fontSize={["12px", "12px", "15px", "15px"]}
                    pl="10px"
                    pr="10px"
                    id="logo"
                    border="none"
                    name="logo"
                    _placeholder={{ color: "none", textOverflow: "ellipsis" }}
                    required
                    mb="30px"
                />
                <Text fontSize={["12px", "12px", "15px", "15px"]} mb="10px" opacity="0.7">Why ?</Text>
                <Textarea
                    placeholder="Explain here why demote this adress"
                    bg="var(--inputs)"
                    h={["29px", "29px", "29px", "32px"]}
                    borderRadius="8px"
                    fontSize={["12px", "12px", "15px", "15px"]}
                    pl="10px"
                    pr="10px"
                    id="logo"
                    border="none"
                    name="logo"
                    boxShadow={`1px 2px 13px 3px var(--shadow)`}
                    _placeholder={{ color: "none", textOverflow: "ellipsis" }}
                    required
                    mb="25px"
                />
                <Button _focus={{boxShadow:"none"}} mb="20px" color="white" boxShadow={`1px 2px 13px 3px var(--shadow)`}  bg="var(--inputs)" fontSize={["11px", "11px", "14px", "14px"]} w="100%" py={["12px", "12px", "15px", "15px"]} borderRadius={["8px", "8px", "8px", "12px"]}>
                    Submit
                </Button>
            </Flex>
        </Flex>

    )
}

export default Mid;
