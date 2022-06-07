import React from 'react'
import { useColorModeValue, Flex, Box, Text } from '@chakra-ui/react'
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Checkbox, Tooltip
  } from '@chakra-ui/react'

export default function Widget() {

    const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_input)")
    const borderBox = useColorModeValue("#E5E5E5", "#282C3A")

    return (
    <>
        <Flex direction="column" align="center" w="350px" position="fixed" zIndex="10" top="50%" left="50%" transform='translateX(-50%) translateY(-50%)' m="auto" borderRadius="20px" bg={bg}>
            <Text mt="30px" w="80%" mb="20px" fontSize="15px">Token filtering settings</Text>
            <Box h="1px" w="100%" bg={borderBox}></Box>
            <Flex direction="column" justify="center" w="80%">
                <Text mt="20px" fontSize="12px">Max. Liquidity</Text>
                <RangeSlider mt="20px" aria-label={['min', 'max']}  defaultValue={[10, 30]}>
                    <RangeSliderTrack >
                        <RangeSliderFilledTrack bg="blue"/>
                        
                    </RangeSliderTrack>
                    {/* <Tooltip
                        label="31"
                        bg="white"
                        border="1px solid gray"
                        color="black"
                        placement="bottom"
                        pl={3}
                        pr={3}
                        hasArrow
                            shouldWrapChildren
                        isOpen
                    > */}
                        <RangeSliderThumb index={0} />
                    {/* </Tooltip> */}
                    <RangeSliderThumb index={1} />
                </RangeSlider>
                <Text mt="20px" fontSize="12px">Min. Volume (24h)</Text>
                <RangeSlider mt="20px" aria-label={['min', 'max']}  defaultValue={[10, 30]}>
                    <RangeSliderTrack >
                        <RangeSliderFilledTrack bg="blue"/>
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0}/>
                    {/* <Flex position="absolute" bg="red" top="0px">fsefesfsef</Flex> */}
                    <RangeSliderThumb index={1} />
                </RangeSlider>
            </Flex>
            <Flex direction="column" mt="20px" mb="30px" w="80%" >
                <Flex align="center" mt="010px">
                    <Text fontSize="12px" mr="10px">Hide tokens without on-chains data</Text>
                    <Checkbox mt="8px"></Checkbox>
                </Flex>
                <Flex align="center" mt="10px">
                    <Text fontSize="12px" mr="10px">Hide tokens without on-chains data</Text>
                    <Checkbox mt="8px"></Checkbox>
                </Flex>
                <Flex align="center" mt="10px">
                    <Text fontSize="12px" mr="10px">Hide tokens without on-chains data</Text>
                    <Checkbox mt="8px"></Checkbox>
                </Flex>
            </Flex>
        </Flex>
        {/* <Flex position="fixed" top="50%" left="50%" transform='translateX(-50%) translateY(-50%)' bg={bg} w="100%" h="100vw"></Flex> */}
        
    </>
  )
}
