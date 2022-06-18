
import React, { useState, useEffect } from 'react'
import { useColorModeValue, Flex, Box, Text, Stack } from '@chakra-ui/react'
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Checkbox, Tooltip, RadioGroup, Button
} from '@chakra-ui/react'

import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Radio
} from '@chakra-ui/react'
import { X } from 'react-feather'
import { formatAmount, formatBigAmount } from '../../../helpers/formaters'

const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
}

export default function Widget({ setSettings, visible, setVisible, settings }) {
    
    const shadow = useColorModeValue("var(--chakra-colors-shadow-hard)", "none")
    const [volume, setVolume] = useState(reverseExpo(settings.volume))
    const [liquidity, setLiquidity] = useState(reverseExpo(settings.liquidity))
    const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_input)")
    const borderBox = useColorModeValue("#E5E5E5", "#282C3A")
    const [value, setValue] = useState(visible.onChainOnly ? '1' : '0')
    const [onChainOnly, setOnChainOnly] = useState(settings.onChainOnly)

    function easeInExpo(x: number): number {
        return x === 0 ? 0 : Math.ceil(Math.pow(Math.E, x / 50000));
    }

    function reverseExpo(x: number): number {
        return x === 0 ? 0 : 50000 * Math.log(x);
    }

    useEffect(() => {
        console.log(liquidity, volume)
    }, [liquidity, volume])

    return (
        <>
            <Flex display={visible ? 'flex' : 'none'} boxShadow={`3px 5px 25px 10px ${shadow}`} direction="column" align="center" w="350px" position="fixed" zIndex="10" top="50%" left="50%" transform='translateX(-50%) translateY(-50%)' m="auto" borderRadius="20px" bg={bg}>
                <Flex w="90%" justify="space-between" align="center">
                    <Text mt="30px" w="80%" mb="20px" fontSize="15px">Token filtering settings</Text>
                    <X cursor='pointer' onClick={() => setVisible(false)} />
                </Flex>
                <Box h="1px" w="100%" bg={borderBox}></Box>
                <Flex direction="column" justify="center" w="80%">
                    <Text mt="20px" fontSize="12px">Min. Liquidity</Text>
                    <Box pt={6} pb={2}>
                        <Slider aria-label='slider-ex-6' defaultValue={reverseExpo(settings.liquidity)} max={1_000_000} mt="15px" onChange={(val) => setLiquidity(val)}>
                            <SliderMark
                                value={liquidity}
                                textAlign='center'
                                bg='blue.500'
                                color='none'
                                mt='-10'
                                ml='-10'
                                w='20'
                            >
                                {(easeInExpo(liquidity) > 1_000_000 ? '$' + formatBigAmount(easeInExpo(liquidity)) : '$' + formatAmount(easeInExpo(liquidity)))}
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack bg="blue" />
                            </SliderTrack>
                            <SliderThumb bg="blue" />
                        </Slider>
                    </Box>
                    <Text mt="20px" fontSize="12px">Min. Volume (24h)</Text>
                    <Box pt={6} pb={2}>
                        <Slider aria-label='slider-ex-6' defaultValue={reverseExpo(settings.volume)} max={1_000_000} mt="15px" onChange={(val) => setVolume(val)}>
                            <SliderMark
                                value={volume}
                                textAlign='center'
                                bg='blue.500'
                                color='none'
                                mt='-10'
                                ml='-10'
                                w='20'
                            >
                                {(easeInExpo(volume) > 1_000_000 ? '$' + formatBigAmount(easeInExpo(volume)) : '$' + formatAmount(easeInExpo(volume)))}
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack bg="blue" />
                            </SliderTrack>
                            <SliderThumb bg="blue" />
                        </Slider>
                    </Box>
                </Flex>
                <Flex direction="column" mt="20px" mb="30px" w="80%" >
                    <RadioGroup onChange={setValue} value={value}>
                        <Flex direction="column" fontSize="10px" >
                            <Flex align="center" direction="row">
                                <Text fontSize="12px" mb="10px" w="90%">Hide tokens without on-chains data</Text>
                                <Checkbox checked={onChainOnly} bg={onChainOnly ? "blue" : "none"} onChange={() => {
                                    console.log('yo'); setOnChainOnly(!onChainOnly)
                                }}></Checkbox>
                            </Flex>
                        </Flex>
                    </RadioGroup>
                </Flex>
                <Button bg={'blue'} color={'white'} w='50%' h='30px' mb='20px' onClick={() => {
                    setVisible(false)
                    setSettings({ liquidity: easeInExpo(liquidity), volume: easeInExpo(volume), onChainOnly, default: false })
                }}>Validate</Button>
            </Flex>
        </>
    )
}
