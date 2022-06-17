import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { ethers } from "ethers";
import { ThumbsUp, ThumbsDown } from "react-feather"
import {
    Heading,
    Text,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Spacer,
    useColorModeValue,
    Textarea
} from "@chakra-ui/react";
import styles from "./Elections.module.scss";


function Mid({promote, firstInput, secondInput, setFirstInput, firstValue}) {
   
    const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
    const bgBox = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_box)")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bgBtn = useColorModeValue("var(--chakra-colors-blue)", "var(--chakra-colors-dark_btn_election)")

    return (
                    <Flex w="50%" direction="column" ml="10px">
                        <Flex mb="10px" p={["10px","10px","15px","20px"]} boxShadow={`1px 2px 13px 3px ${shadow}`} direction="column" bg={bgBox} borderRadius="12px">
                            <Flex color="red" align="center" mb="10px">
                                <Text mr="20px" fontSize={["18px","18px","18px","23px"]}>Promotion</Text>
                                <ThumbsDown  />
                            </Flex>
                            <Flex direction="column">
                                <Text fontSize={["12px","12px","15px","15px"]} mb="15px" opacity=".7">Amount of Rank I seats members</Text>
                                <Text fontSize={["14px","14px","17px","17px"]} mb="15px" color={firstInput > 0 ? "green" : "red"}>{firstInput} Members</Text>
                                <Text fontSize={["12px","12px","15px","15px"]} mb="15px" opacity=".7">Amount of Rank II seats members</Text>
                                <Text fontSize={["14px","14px","17px","17px"]} mb="15px" color={secondInput > 0 ? "green" : "red"}> {secondInput} Members</Text>
                            </Flex>
                        </Flex>
                        <Flex p={["10px","10px","15px","20px"]} boxShadow={["none","none","none",`1px 2px 13px 3px ${shadow}`]} direction="column" bg={[bgBox]} borderRadius="12px">
                            <Text fontSize={["12px","12px","15px","15px"]} mb="10px" opacity="0.7">Adress to demote</Text>
                            <Input 
                                h={["29px","29px","29px","32px"]}
                                borderRadius="8px"
                                placeholder="0x"
                                value={firstValue}
                                onChange={(e) => setFirstInput(e.target.value)}
                                bg={bg}
                                boxShadow={`1px 2px 13px 3px ${shadow}`}
                                fontSize={["12px","12px","15px","15px"]}
                                pl="10px"
                                pr="10px"
                                id="logo"
                                variant="filled"
                                name="logo"
                                _placeholder={{ color: "none", textOverflow: "ellipsis" }}
                                required
                                mb="30px"
                            />
                            <Text fontSize={["12px","12px","15px","15px"]} mb="10px" opacity="0.7">Why ?</Text>
                            <Textarea 
                                placeholder="Explain here why demote this adress"
                                bg={bg}
                                h={["29px","29px","29px","32px"]}
                                borderRadius="8px"
                                fontSize={["12px","12px","15px","15px"]}
                                pl="10px"
                                pr="10px"
                                id="logo"
                                variant="filled"
                                name="logo"
                                boxShadow={`1px 2px 13px 3px ${shadow}`}
                                _placeholder={{ color: "none", textOverflow: "ellipsis" }}
                                required
                                mb="25px"
                            />
                            <Button mb="20px" color="white" boxShadow={`1px 2px 13px 3px ${shadow}`} bg={bgBtn} fontSize={["11px","11px","14px","14px"]} w="100%" py={["12px","12px","15px","15px"]} borderRadius={["8px","8px","8px","12px"]}>
                                Submit
                            </Button>
                        </Flex>
                    </Flex>

    )
}

export default Mid;
