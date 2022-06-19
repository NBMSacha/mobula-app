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
import Contract from "../../../../../Utils/Contract"

function Contract({bg, btn, shadow, border, token}) {
    console.log(token)
    return (

        <Flex bg={bg} direction="column" mx="auto" w="100%" borderRadius="12px" mb="50px" display={["none","none","flex","flex"]}>
                    <Flex p={["20px","20px","20px 0px","20px"]} justify="space-around" align="center" w="100%" borderBottom={["none","none",`1px solid ${border}`,`1px solid ${border}`]}>
                        {token.contracts.map((index: number) => {
                            <Text w="30%" px="10px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">Token Contract ({index})</Text> 
                        })}
                        {token.totalSupply && token.totalSupply.length > 0 ?
                            <Text w="30%" px="10px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">Total supply contracts (1)</Text> : <></>
                        }
                        {token.excludedFromCirculation && token.excludedFromCirculation.length > 0 ?
                            <Text w="30%" px="10px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">Excluded from circulation (1)</Text> : <></>
                        }
                    </Flex>
                    <Contract />
                    <Flex p={["20px","20px","20px 0px","20px"]} justify="space-around" align="center" w="100%">
                        {/* TOKEN CONTRACT */}
                        <Flex w="30%" direction="column">
                        {token.contracts.map((contract: string, index: number) => {
                            return <Flex my="10px" align="center" px="10px">
                                {console.log(contract)}
                                <Image mr="10px" src="/fullicon.png" h="22px"/>
                                <Text mr="10px" opacity=".8" fontSize="14px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">{contract}</Text>
                                <Button _focus={{boxShadow:"none"}}><CopyIcon /></Button>
                            </Flex>
                        })}
                        </Flex>
                        {/* TOKEN SUPPLY CONTRACT */}
                        {token.totalSupply && token.totalSupply.length > 0 ?
                            <Flex w="30%" direction="column">
                                <Flex my="10px" align="center" px="10px">
                                    <Image mr="10px" src="/fullicon.png" h="22px"/>
                                    <Text mr="10px" opacity=".8" fontSize="14px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">{token.totalSupply}</Text>
                                    <Button _focus={{boxShadow:"none"}}><CopyIcon /></Button>
                                </Flex>
                            </Flex> : <></>
                        }
                        {token.excludedFromCirculation && token.excludedFromCirculation.length > 0 ?
                            <Flex w="30%" direction="column">
                                <Flex my="10px" align="center" px="10px">
                                    <Image mr="10px" src="/fullicon.png" h="22px"/>
                                    <Text mr="10px" opacity=".8" fontSize="14px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden"></Text>
                                    <Button _focus={{boxShadow:"none"}}><CopyIcon /></Button>
                                </Flex>
                            </Flex> : <></>
                        }
                    </Flex>
                </Flex>
    )
}

export default Contract