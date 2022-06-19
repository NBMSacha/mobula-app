import React, { useEffect, useState } from "react";
import TokenDisplay from "../../Utils/Sort/TokenDisplay";
import { ethers } from "ethers";
import { PROTOCOL_ADDRESS, RPC_URL } from "../../../constants";
import { Heading, Text, Flex, Box, Image, Button, Link, useColorModeValue, Icon} from "@chakra-ui/react";
import DaoHeader from "../../Utils/DaoHeader";
import Blocks from '../../Utils/Sort/Blocks';
import { useAlert } from 'react-alert';
import Router from "next/router";
import { Globe,  } from "react-feather"
import { TimeIcon, CopyIcon } from "@chakra-ui/icons"
import styles from "../FirstSort.module.scss"

function Contract({bg, btn, shadow, border}) {

    return (
        <Flex bg={bg} direction="column" mx="auto" w="100%" borderRadius="12px" mb="50px" display={["none","none","flex","flex"]}>
                    <Flex p={["20px","20px","20px 0px","20px"]} justify="center" align="center" w="100%" borderBottom={["none","none",`1px solid ${border}`,`1px solid ${border}`]}>
                        <Text w="30%" px="10px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">Token Contract (1)</Text>
                        <Text w="30%" px="10px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">Total supply contracts (1)</Text>
                        <Text w="30%" px="10px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">Excluded from circulation (1)</Text>
                    </Flex>
                    <Flex p={["20px","20px","20px 0px","20px"]} justify="center" align="center" w="100%">
                        {/* TOKEN CONTRACT */}
                        <Flex w="30%" direction="column">
                            <Flex my="10px" align="center" px="10px">
                                <Image mr="10px" src="/fullicon.png" h="22px"/>
                                <Text mr="10px" opacity=".8" fontSize="14px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">0x 8301934180740139239481</Text>
                                <Button _focus={{boxShadow:"none"}}><CopyIcon /></Button>
                            </Flex>
                        </Flex>
                        {/* TOKEN SUPPLY CONTRACT */}
                        <Flex w="30%" direction="column">
                            <Flex my="10px" align="center" px="10px">
                                <Image mr="10px" src="/fullicon.png" h="22px"/>
                                <Text mr="10px" opacity=".8" fontSize="14px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">0x 8301934180740139239481</Text>
                                <Button _focus={{boxShadow:"none"}}><CopyIcon /></Button>
                            </Flex>
                        </Flex>
                        {/* EXCLUDED FROM CIRCULATION */}
                        <Flex w="30%" direction="column">
                            <Flex my="10px" align="center" px="10px">
                                <Image mr="10px" src="/fullicon.png" h="22px"/>
                                <Text mr="10px" opacity=".8" fontSize="14px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">0x 8301934180740139239481</Text>
                                <Button _focus={{boxShadow:"none"}}><CopyIcon /></Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
    )
}

export default Contract