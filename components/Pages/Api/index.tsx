import React, { useEffect, useState, useRef } from 'react'
import { extendTheme, Flex, Box, Text, Spacer, Image, Button, Grid, GridItem } from '@chakra-ui/react';
import styles from "./Api.module.scss"
import { Pocket } from "react-feather";
import { CheckCircleIcon } from "@chakra-ui/icons"
import TopSection from "./TopSection";
import BottomSection from "./BottomSection"

const Api = () => {

    const volume = "Volume";
    const rank = "Rank";
    const liquidity = "Liquidity";
    const holders = "Holders";

    return (
        <>
        <Flex w="100%" direction="column" align="center"pb="50px">
            <TopSection />
            <BottomSection />
        </Flex>
        </>
    )
}

export default Api;