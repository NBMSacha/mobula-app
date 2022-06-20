import React, { useEffect, useState } from "react";
import TokenDisplay from "../../../Utils/Sort/TokenDisplay";
import { ethers } from "ethers";
import { PROTOCOL_ADDRESS, RPC_URL } from "../../../../constants";
import { Heading, Text, Flex, Box, Image, Button, Link, useColorModeValue, Icon } from "@chakra-ui/react";
import DaoHeader from "../../../Utils/DaoHeader";
import Blocks from '../../../Utils/Sort/Blocks';
import { useAlert } from 'react-alert';
import Router from "next/router";
import { Globe, } from "react-feather"
import { TimeIcon, CopyIcon } from "@chakra-ui/icons"
import styles from "../FirstSort.module.scss"

function Main({ bg, btn, shadow, border, voteToken, tokenDivs, changeDisplay, setDisplayedToken, displayedToken }) {



    return (
        <Flex justify="space-evenly" direction={["column", "column", "row", "row"]} wrap='wrap' mb="50px">
            {tokenDivs.map((token) => {
                return <Box mt={["10px", "10px", "40px", "40px"]} w={["100%", '100%', '45%', '45%']} boxShadow={`1px 2px 12px 3px ${shadow}`} bg={bg} px="30px" py="20px" borderRadius="12px">
                    <Flex align="center" justify="space-between">
                        <Flex align="center">
                            <Image src={token.logo} w={["30px", "30px", "38px", "38px"]} h={["30px", "30px", "38px", "38px"]} />
                            <Text fontSize={["15px", "15px", "25px", "25px"]} ml="10px">{token.name}</Text>
                        </Flex>
                        <Text fontSize={["12px", "12px", "15px", "15px"]} color="blue">New</Text>
                    </Flex>
                    <Text py={["15px", "15px", "25px", "25px"]} fontSize={["10px", "10px", "14px", "14px"]}>{token.description}</Text>
                    <Button mb="10px" fontSize={["12px", "12px", "15px", "15px"]} onClick={() => setDisplayedToken(token.id)} borderRadius="8px" bg={btn} py="7px" px="20px">Review and vote</Button>
                </Box>
            })}
        </Flex>
    )
}

export default Main