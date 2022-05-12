import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Chart, ChartType, registerables } from 'chart.js';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ArrowUp, ArrowDown } from 'react-feather';
import styles from './DisplayedToken.module.scss';
import { Heading, Text, Flex, Box, Image, Spacer } from "@chakra-ui/react";
import { PROTOCOL_ADDRESS, supportedRPCs } from '../../../constants';
import {
    formatAmount,
    getTokenPrice,
    getTokenPercentage,
    formatName
} from '../../../helpers/formaters';
import { setTimeout } from 'timers'
import { Send, Twitter, Globe, Circle } from "react-feather";

const Score = ({ name, score, updateScore }) => {

    function getColor(index: number) {
        return score >= index ? 'white' : '#26294D'
    }
    return <Flex
        marginTop="0px"
        justifyContent={["space-between"]}
        flexDir={["column", "column", "column", "row"]}
        alignItems={["center"]}
        flexWrap="wrap"
        height='50px'
    >
        <Text ml="15px" fontWeight="500" fontSize="1.2rem">{name}</Text>
        <Flex mr="10px" width="60%"
            justifyContent={["space-between"]}
            alignItems={["center"]}>
            <Circle color={getColor(1)} fill={getColor(1)} size='20px' onClick={() => updateScore(1)} />
            <Circle color={getColor(2)} fill={getColor(2)} size='20px' onClick={() => updateScore(2)} />
            <Circle color={getColor(3)} fill={getColor(3)} size='20px' onClick={() => updateScore(3)} />
            <Circle color={getColor(4)} fill={getColor(4)} size='20px' onClick={() => updateScore(4)} />
            <Circle color={getColor(5)} fill={getColor(5)} size='20px' onClick={() => updateScore(5)} />
        </Flex>

    </Flex>

}

export default Score