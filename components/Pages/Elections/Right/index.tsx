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
    Image,
    Input,
    Button,
    Spacer,
    IconButton,
    useColorModeValue
} from "@chakra-ui/react";

function Mid() {
    
    const [ open, setOpen ] = useState(false)
    const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
    const bgBox = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_box)")
    const bgBtn = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_btn_election)")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")

    return (
                    <Flex w="100%" direction="column" ml={["0px","0px","0px","15px"]} p={["10px","10px","10px","20px 20px 40px 20px"]} boxShadow={`1px 2px 13px 3px ${shadow}`} bg={bgBox} borderRadius="12px">
                        <Flex align="center" mb={["0px", "0px","0px","30px"]} justify="space-between">
                            <Flex align="center">
                                <Image src="/fullicon.png" h={["22px","22px","22px","30px"]} />
                                <Text ml={["10px","10px","10px","15px"]} fontSize={["18px","18px","18px","23px"]}>Profil</Text>
                            </Flex>
                            <Button display={["flex", "flex", "flex", "none"]} mr="20px" _focus={{boxShadow:"none"}} onClick={() => setOpen(!open)}>+</Button>
                            
                        </Flex>
                        <Box display={[open ? "block" : "none", open ? "block" : "none", open ? "block" : "none", "block"]} >
                        
                            <Text fontSize={["12px","12px","15px","15px"]} mt={["20px", "20px","20px","0px"]}mb="10px">Your address</Text>
                            <Text fontSize={["12px","12px","14px","14px"]} color="grey" mb="25px" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">0xEF8f311F9Ab05c767fE92aba0E957D98eDD960C1</Text>
                            <Text fontSize={["12px","12px","15px","15px"]} mb="10px">Your username</Text>
                            <Text fontSize={["12px","12px","15px","15px"]} color="grey" mb="25px">Rohit Guru</Text>
                            <Text fontSize={["12px","12px","15px","15px"]} mb="10px">MOBL Balance</Text>
                            <Text fontSize={["12px","12px","15px","15px"]} color="grey" mb="25px">20309 MOBL</Text>
                            <Text fontSize={["12px","12px","15px","15px"]} mb="10px">DAO Rank</Text>
                            <Text fontSize={["12px","12px","15px","15px"]} color="grey" mb="25px">#23</Text>
                            <Text fontSize={["12px","12px","15px","15px"]} mb="10px">Change username</Text>
                            <Input 
                                    placeholder="0x"
                                    fontSize={["12px","12px","15px","15px"]}
                                    h={["29px","29px","29px","32px"]}
                                    borderRadius="8px"
                                    boxShadow={`1px 2px 13px 3px ${shadow}`}
                                    bg={bg}
                                    pl="10px"
                                    pr="10px"
                                    id="logo"
                                    variant="filled"
                                    name="logo"
                                    _placeholder={{ color: "none", textOverflow: "ellipsis" }}
                                    required
                                    mb="35px"
                                />
                            
                            
                            <Button bg={bgBtn} boxShadow={`1px 2px 13px 3px ${shadow}`} fontSize={["11px","11px","14px","14px"]} w="100%" py={["12px","12px","12px","15px"]} borderRadius={["8px","8px","8px","12px"]}>
                                Submit
                            </Button>
                        </Box>
                    </Flex>

    )
}

export default Mid;
