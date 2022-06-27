import React, { useState, useEffect } from 'react'
import { useColorModeValue, Flex, Box, Text, Stack,Image } from '@chakra-ui/react'
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Checkbox, Tooltip, RadioGroup, Button
} from '@chakra-ui/react';
import Blockchain from "./Blockchain";
import Sliders from "./Sliders"


export default function AdvancedSetting() {

    return (
        <Flex bg="var(--table)" direction="column" w="100%">
            <Blockchain />
            <Sliders />
        </Flex>
    )
}
