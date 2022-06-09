import React, { useEffect, useState, useRef } from 'react'
import { Flex, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { CheckCircleIcon } from "@chakra-ui/icons"

const Static = () => {

    const bg = useColorModeValue('rgba(255, 255, 255, 0.3)', '#161A2A')
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    return (
        <Flex direction="column" bg={bg} borderRadius="12px" p="20px 40px" ml="10px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
            <Text fontSize="18px">Static API</Text>
            <Text color="#8B8B8B" mb="30px" mt="10px" fontSize="16px">An on-chain API to retrieve relational information<br /> from the address of a crypto-token.</Text>
            <Flex mb="30px" align="center" fontSize="14px">
                <CheckCircleIcon />
                <Text ml="10px" >Website</Text>
            </Flex>
            <Flex mb="30px" align="center">
                <CheckCircleIcon />
                <Text ml="10px" fontSize="14px">Social networks</Text>
            </Flex>
            <Flex mb="30px" align="center">
                <CheckCircleIcon />
                <Text  ml="10px" fontSize="14px">Logo</Text>
            </Flex>
            <Flex mb="30px" align="center">
                <CheckCircleIcon />
                <Text  ml="10px" fontSize="14px">Audits & KYCs</Text>
            </Flex>
            <Button w="80%" bg="blue" py="10px">
                <Text  ml="10px" fontSize="14px" color="white">Request static API access</Text>
            </Button>
        </Flex>
    )
}

export default Static;