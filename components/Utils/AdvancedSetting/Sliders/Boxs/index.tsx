import React, { useState, useEffect } from 'react'
import { useColorModeValue, Flex, Box, Text, Stack,Image } from '@chakra-ui/react'
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Radio
} from '@chakra-ui/react'

export default function Boxs({title}) {

    return (
        <>
            <Box pt={6} pb={2}  w="210px" mx="40px">
                <Flex w="100%">
                    <Text mb="-20px" mx="auto" color="var(text-secondary)">{title}</Text>
                </Flex>
                <Slider opacity={title !== "Market-cap" ? ".3" : "1"} aria-label='slider-ex-6' defaultValue={10_152} max={1_000_000}  position="relative">
                    <Text mt='50px'ml="-5px" fontSize="15px">0</Text>
                    <SliderMark
                        textAlign='center'
                        bg='blue.500'
                        color='none'
                        mt='-10'
                        ml='-10'
                        w='20'
                        value={10_152}
                    >   
                    </SliderMark>
                    <SliderTrack>
                            <SliderFilledTrack bg="blue"  />
                    </SliderTrack>
                    <SliderThumb bg="white" />
                    {/* <Text position="absolute" bottom="8px" right="-5px">1 000 000</Text> */}
                </Slider>
            </Box>
        </>    )
}
