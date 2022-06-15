import React, { useEffect, useState } from "react";
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
    useColorModeValue
} from "@chakra-ui/react";

function Left() {
   
    const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
    const bgBox = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_box)")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bgBtn = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_btn_election)")

    return (
            <Flex w="50%" direction="column" >
                <Flex mb="10px" p={["10px","10px","15px","20px"]} boxShadow={`1px 2px 13px 3px ${shadow}`} direction="column" bg={bgBox} borderRadius="12px">
                    <Flex color="green" mb="10px" align="center">
                        <Text mr={["8px","8px","8px","20px"]} fontSize={["18px","18px","18px","23px"]}>Promotion</Text>
                        <ThumbsUp  />
                    </Flex>
                    <Flex direction="column">
                        <Text fontSize={["12px","12px","15px","15px"]} mb="15px" opacity=".7">Amount of Rank I seats available</Text>
                        <Text fontSize={["14px","14px","17px","17px"]} mb="15px" color="green"> 5 Seats</Text>
                        <Text fontSize={["12px","12px","15px","15px"]} mb="15px" opacity=".7">Amount of Rank II seats available</Text>
                        <Text fontSize={["14px","14px","17px","17px"]} mb="15px" color="red"> 0 Seats</Text>
                    </Flex>
                </Flex>
                <Flex boxShadow={["none","none","none",`1px 2px 13px 3px ${shadow}`]} p={["10px","10px","15px","20px"]} direction="column" bg={bgBox} borderRadius="12px">
                    <Text fontSize={["12px","12px","15px","15px"]} mb="10px" opacity="0.7">Adress to promote</Text>
                    <Input 
                        placeholder="0x"
                        bg={bg}
                        fontSize={["12px","12px","15px","15px"]}
                        boxShadow={`1px 2px 13px 3px ${shadow}`}
                        pl="10px"
                        pr="10px"
                        id="logo"
                        variant="filled"
                        name="logo"
                        h={["29px","29px","29px","32px"]}
                        borderRadius="8px"
                        _placeholder={{ color: "none", textOverflow: "ellipsis" }}
                        required
                        mb="30px"
                    />
                    <Text fontSize={["12px","12px","15px","15px"]} mb="10px" opacity="0.7">Why ?</Text>
                    <Input 
                        placeholder="Explain here why promote this adress"
                        bg={bg}
                        fontSize={["12px","12px","15px","15px"]}
                        pl="10px"
                        boxShadow={`1px 2px 13px 3px ${shadow}`}
                        pr="10px"
                        id="logo"
                        variant="filled"
                        name="logo"
                        h={["29px","29px","29px","32px"]}
                        borderRadius="8px"
                        _placeholder={{ color: "none", textOverflow: "ellipsis" }}
                        required
                        mb="25px"
                    />
                    <Button bg={bgBtn} boxShadow={`1px 2px 13px 3px ${shadow}`} fontSize={["11px","11px","14px","14px"]} w="100%" py={["12px","12px","15px","15px"]} mb="20px" borderRadius={["8px","8px","8px","12px"]}>
                        Submit
                    </Button>
                </Flex>
            </Flex>
    )
}

export default Left;
