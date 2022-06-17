import React, {useState, useEffect} from 'react'
import { useColorModeValue, Flex, Box, Text,Stack } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Checkbox, Tooltip,RadioGroup, Button
  } from '@chakra-ui/react'

  import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Radio
  } from '@chakra-ui/react'
  
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

export default function Widget({setWidget, widget}) {


    const [sliderVolume, setSliderVolume] = useState(0)
    const [sliderValue, setSliderValue] = useState(0)
    const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_input)")
    const borderBox = useColorModeValue("#E5E5E5", "#282C3A")
    console.log(sliderValue)
    console.log(sliderVolume)
  
    const [value, setValue] = React.useState('1')
    useEffect(() => {
       console.log(value) 
    })

    const filter = {
        liquidity: sliderValue,
        volume: sliderVolume,
        radio: value
    }
    console.log(filter)
    return (
    <>
        <Flex direction="column" align="center" w="350px" position="fixed" zIndex="10" top="50%" left="50%" transform='translateX(-50%) translateY(-50%)' m="auto" borderRadius="20px" bg={bg}>
            <Flex align="center" mt="30px" mb="20px" w="80%" justify="space-between">
                <Text w="100%" fontSize="15px">Token filtering settings</Text>
                <Button onClick={() => setWidget(false)} _focus={{boxShadow:"none"}}>
                    <CloseIcon w="12px" h="12px" />
                </Button>
                
            </Flex>
            <Box h="1px" w="100%" bg={borderBox}></Box>
            <Flex direction="column" justify="center" w="80%">
                <Text mt="20px" fontSize="12px">Max. Liquidity</Text>
            <Box pt={6} pb={2}>
            <Slider aria-label='slider-ex-6' defaultValue={0} mt="15px" onChange={(val) => setSliderValue(val)}>
                    <SliderMark
                        value={sliderValue}
                        textAlign='center'
                        bg='blue.500'
                        color='none'
                        mt='-10'
                        ml='-5'
                        w='12'
                    >
                        {sliderValue}%
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack bg="blue"/>
                    </SliderTrack>
                    <SliderThumb bg="blue"/>
                </Slider>
            </Box>
                <Text mt="20px" fontSize="12px">Min. Volume (24h)</Text>
                <Box pt={6} pb={2}>
                <Slider aria-label='slider-ex-6' defaultValue={0} mt="15px" onChange={(val) => setSliderVolume(val)}>
                    <SliderMark
                        value={sliderVolume}
                        textAlign='center'
                        bg='blue.500'
                        color='none'
                        mt='-10'
                        ml='-5'
                        w='12'
                    >
                        {sliderVolume}%
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack bg="blue"/>
                    </SliderTrack>
                    <SliderThumb bg="blue"/>
                </Slider>
                </Box>
            </Flex>
            <Flex direction="column" mt="20px" mb="30px" w="80%" >
                <RadioGroup onChange={setValue} value={value}>
                <Flex direction="column" fontSize="10px" >
                    <Flex align="center" direction="row">
                        <Text fontSize="12px" mb="10px" w="90%">Hide tokens without on-chains data</Text>
                        <Radio value='1'  bg={value == "1" ? "blue" : "none"}></Radio>
                    </Flex>
                    <Flex align="center" direction="row">
                        <Text fontSize="12px" w="90%">Hide tokens without on-chains data</Text>
                        <Radio value='2' mt="10px" bg={value == "2" ? "blue" : "none"}></Radio>
                    </Flex>
                  
                </Flex>
                </RadioGroup>
            </Flex>
        </Flex>
        {/* <Flex position="fixed" top="50%" left="50%" transform='translateX(-50%) translateY(-50%)' bg={bg} w="100%" h="100vw"></Flex> */}
        
    </>
  )
}
