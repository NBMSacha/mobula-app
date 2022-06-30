import React, { useState, useEffect } from 'react'
import { useColorModeValue, Flex, Box, Text, Stack,Image, Button } from '@chakra-ui/react'
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderMark
  } from '@chakra-ui/react'
  import { getShortenedAmount } from "../../../../../../helpers/formaters"
  import styles from "./Boxs.module.scss"

export default function Boxs({title, settings, setGeneralSettings, generalSettings, setSettings}) {
    
    function easeInExpo(x: number): number {
        return x === 0 ? 0 : Math.ceil(Math.pow(Math.E, x / 50000));
    }

    console.log(generalSettings)

    return (
        <>
            <Flex direction={["row", "row","column", "column"]}  align="center" justify="space-between" pt={[0,0,6,6]} pb={2}  w={["auto","auto","100%","100%"]}  mx={["20px","20px","40px","40px"]} >
                <Flex w={["auto","auto","100%","100%"]} >
                    <Text  mb={["0px","0px","-20px","-20px"]} fontSize={["13px", "13px", "13px", "14px"]} mx="auto" color="var(text-secondary)" overflow={["overflow","overflow","hidden","hidden"]} whiteSpace={["pre-wrap","pre-wrap","nowrap","nowrap"]} textOverflow="ellipsis" maxWidth={["100px","100px","auto","auto"]}>{title}</Text>
                </Flex>
                <RangeSlider onChange={(val) => {
                    switch(title) {
                        case "Liquidity": {
                            console.log(generalSettings.liquidity)
                            console.log(val)
                        }
                        case "Market-cap": {
                            console.log(val)
                            console.log(generalSettings.market_cap)
                        }
                        case "Volume": {
                            console.log(val)
                        }
                        case "Market-cap": {
                            console.log(val)
                        }
                    }
                    }} aria-label={['min', 'max']} h="100px" defaultValue={settings} min={0} max={1_000_000}  position="relative" className={styles["rangeSliders"]} w={["45vw","50vw","20vw", "8vw"]}>
                    <RangeSliderTrack bg="var(--box_border)">
                        <RangeSliderFilledTrack bg="blue"/>
                    </RangeSliderTrack>
                    <RangeSliderMark
                        value={settings[0]}
                        textAlign='center'
                        color='white'
                        borderRadius="6px"
                        mt='60px'
                        ml='-20px'
                        w='38px'
                        fontSize="10px"
                    >{getShortenedAmount(settings[0])} </RangeSliderMark>
                      <RangeSliderMark
                        value={settings[1]}
                        textAlign='center'
                        borderRadius="6px"
                        color='white'
                        fontSize="10px"
                        mt='60px'
                        zIndex="2"
                        w='42px'
                        bg="var(--bg-main-box)"
                    >
                        {getShortenedAmount(settings[1])}
                    </RangeSliderMark>
                    <RangeSliderThumb  index={0} />
                    <RangeSliderThumb index={1} />
                </RangeSlider>
                
            </Flex>
            
        </>    )
}
