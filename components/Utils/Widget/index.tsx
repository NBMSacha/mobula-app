import React, {useState} from 'react'
import { useColorModeValue, Flex, Box, Text } from '@chakra-ui/react'
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Checkbox, Tooltip
  } from '@chakra-ui/react'

  import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react'
  
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

export default function Widget() {


    const [sliderVolume, setSliderVolume] = useState(0)
    const [sliderValue, setSliderValue] = useState(0)
    const [volume, setVolume] = useState(0)
    const [liquidity, setLiquidity] = useState(0)
    const [visible, setVisible] = useState(false)

    const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_input)")
    const borderBox = useColorModeValue("#E5E5E5", "#282C3A")
    console.log(sliderValue)
    return (
    <>
        <Flex direction="column" align="center" w="350px" position="fixed" zIndex="10" top="50%" left="50%" transform='translateX(-50%) translateY(-50%)' m="auto" borderRadius="20px" bg={bg}>
            <Text mt="30px" w="80%" mb="20px" fontSize="15px">Token filtering settings</Text>
            <Box h="1px" w="100%" bg={borderBox}></Box>
            <Flex direction="column" justify="center" w="80%">
                <Text mt="20px" fontSize="12px">Max. Liquidity</Text>
                <RangeSlider mt="10px" aria-label={['min', 'max']} onChange={(val) => setSliderValue(val)}  defaultValue={[0, 100]}>
                    <RangeSliderTrack >
                        <RangeSliderFilledTrack bg="blue"/>
                    </RangeSliderTrack>
                    <RangeSliderThumb {...labelStyles} index={0} />
                    
                    <RangeSliderThumb {...labelStyles} index={1} />
                    <Flex mb="30px">
                        {sliderValue[0]}
                        {` - `}
                        {sliderValue[1]}
                    </Flex>
                </RangeSlider>
                <Text mt="20px" fontSize="12px">Min. Volume (24h)</Text>
                <RangeSlider mt="10px" aria-label={['min', 'max']} onChange={(val) => setSliderVolume(val)}  defaultValue={[10, 30]}>
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack bg="blue"/>
                        
                    </RangeSliderTrack>
                    <RangeSliderThumb {...labelStyles} index={0} />
                    {/* <Flex position="absolute" bg="red" top="0px">fsefesfsef</Flex> */}
                    <RangeSliderThumb {...labelStyles} index={1} />
                    <Flex mb="30px">
                        {sliderVolume[0]}
                        {` - `}
                        {sliderVolume[1]}
                    </Flex>
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
