import React, { useState, useEffect } from 'react'
import { useColorModeValue, Flex, Box, Text, Stack,Image } from '@chakra-ui/react'
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Checkbox, Tooltip, RadioGroup, Button
} from '@chakra-ui/react'

export default function Blockchain() {

    return (
            <Flex w="100%" maxWidth="1400px" mx="auto" p="20px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px"> 
                <Button bg="blue" transition="background 200ms ease-in-out" _hover={{background:'var(--box_active)', transition:"background 200ms ease-in-out", cursor: "pointer", color:"none"}} _focus={{ boxShadow: "none" }} w={["120px", "120px", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
                    display={["flex", "flex", "flex", "flex", "flex"]}  h={["30px", "30px", "40px", "40px"]}
                    alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px">
                    <Image h={["20px", "20px", "28px", "28px"]} src='/harmony.png' />
                    <Box as="span" style={{ marginLeft: "10px" }}>Harmony</Box>
                </Button>
                <Button bg="blue" transition="background 200ms ease-in-out" _hover={{background:'var(--box_active)', transition:"background 200ms ease-in-out", cursor: "pointer", color:"none"}} _focus={{ boxShadow: "none" }} w={["120px", "120px", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
                    display={["flex", "flex", "flex", "flex", "flex"]}  h={["30px", "30px", "40px", "40px"]}
                    alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px">
                    <Image h={["20px", "20px", "28px", "28px"]} src='/harmony.png' />
                    <Box as="span" style={{ marginLeft: "10px" }}>Harmony</Box>
                </Button>
                <Button bg="blue" transition="background 200ms ease-in-out" _hover={{background:'var(--box_active)', transition:"background 200ms ease-in-out", cursor: "pointer", color:"none"}} _focus={{ boxShadow: "none" }} w={["120px", "120px", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
                    display={["flex", "flex", "flex", "flex", "flex"]}  h={["30px", "30px", "40px", "40px"]}
                    alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px">
                    <Image h={["20px", "20px", "28px", "28px"]} src='/harmony.png' />
                    <Box as="span" style={{ marginLeft: "10px" }}>Harmony</Box>
                </Button>
                <Button bg="blue" transition="background 200ms ease-in-out" _hover={{background:'var(--box_active)', transition:"background 200ms ease-in-out", cursor: "pointer", color:"none"}} _focus={{ boxShadow: "none" }} w={["120px", "120px", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
                    display={["flex", "flex", "flex", "flex", "flex"]}  h={["30px", "30px", "40px", "40px"]}
                    alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px">
                    <Image h={["20px", "20px", "28px", "28px"]} src='/harmony.png' />
                    <Box as="span" style={{ marginLeft: "10px" }}>Harmony</Box>
                </Button>
                <Button bg="blue" transition="background 200ms ease-in-out" _hover={{background:'var(--box_active)', transition:"background 200ms ease-in-out", cursor: "pointer", color:"none"}} _focus={{ boxShadow: "none" }} w={["120px", "120px", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
                    display={["flex", "flex", "flex", "flex", "flex"]}  h={["30px", "30px", "40px", "40px"]}
                    alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px">
                    <Image h={["20px", "20px", "28px", "28px"]} src='/harmony.png' />
                    <Box as="span" style={{ marginLeft: "10px" }}>Harmony</Box>
                </Button>
                <Button bg="blue" transition="background 200ms ease-in-out" _hover={{background:'var(--box_active)', transition:"background 200ms ease-in-out", cursor: "pointer", color:"none"}} _focus={{ boxShadow: "none" }} w={["120px", "120px", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
                    display={["flex", "flex", "flex", "flex", "flex"]}  h={["30px", "30px", "40px", "40px"]}
                    alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px">
                    <Image h={["20px", "20px", "28px", "28px"]} src='/harmony.png' />
                    <Box as="span" style={{ marginLeft: "10px" }}>Harmony</Box>
                </Button>
                <Button bg="blue" transition="background 200ms ease-in-out" _hover={{background:'var(--box_active)', transition:"background 200ms ease-in-out", cursor: "pointer", color:"none"}} _focus={{ boxShadow: "none" }} w={["120px", "120px", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
                    display={["flex", "flex", "flex", "flex", "flex"]}  h={["30px", "30px", "40px", "40px"]}
                    alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px">
                    <Image h={["20px", "20px", "28px", "28px"]} src='/harmony.png' />
                    <Box as="span" style={{ marginLeft: "10px" }}>Harmony</Box>
                </Button>
                <Button bg="blue" transition="background 200ms ease-in-out" _hover={{background:'var(--box_active)', transition:"background 200ms ease-in-out", cursor: "pointer", color:"none"}} _focus={{ boxShadow: "none" }} w={["120px", "120px", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
                    display={["flex", "flex", "flex", "flex", "flex"]}  h={["30px", "30px", "40px", "40px"]}
                    alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px">
                    <Image h={["20px", "20px", "28px", "28px"]} src='/harmony.png' />
                    <Box as="span" style={{ marginLeft: "10px" }}>Harmony</Box>
                </Button>
                <Button bg="blue" transition="background 200ms ease-in-out" _hover={{background:'var(--box_active)', transition:"background 200ms ease-in-out", cursor: "pointer", color:"none"}} _focus={{ boxShadow: "none" }} w={["120px", "120px", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
                    display={["flex", "flex", "flex", "flex", "flex"]}  h={["30px", "30px", "40px", "40px"]}
                    alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px">
                    <Image h={["20px", "20px", "28px", "28px"]} src='/harmony.png' />
                    <Box as="span" style={{ marginLeft: "10px" }}>Harmony</Box>
                </Button>
            </Flex>
    )
}




