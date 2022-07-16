import React, { useEffect, useState, useRef, useContext } from 'react'
import Main from "./Main"
import MainMobile from "./MainMobile"
import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'

const Token = ({ baseAssetBuffer }) => {
    return (
            <Flex direction="column" >
                <Flex justify="center" w="100%" mx="auto" mb="50px" maxWidth="1480px" mt="10px">
                    <Main baseAssetBuffer={baseAssetBuffer}/>
                    <MainMobile baseAssetBuffer={baseAssetBuffer} />
                </Flex>
            </Flex>
    )
}
export default Token;

