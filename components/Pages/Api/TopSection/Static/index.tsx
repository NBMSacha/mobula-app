import React, { useEffect, useState, useRef } from 'react'
import { Flex, Text, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from "@chakra-ui/icons"

const Static = () => {

    return (
        <Flex direction="column" p="0px 40px">
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