import React, { useState, useEffect } from 'react'
import { useColorModeValue, Flex, Box, Text, Stack,Image } from '@chakra-ui/react'
import Blockchain from "./Blockchain";
import Sliders from "./Sliders"

export default function AdvancedSetting() {

   const [ blockchains, setBlockchains ] = useState([])
   const [ evmCheckbox, setEvmCheckbox ] = useState(0)
   const [showMore, setShowMore ] = useState(false)
   

    return (
        <Flex bg="var(--background)" mt="28px">
            <Flex direction="column" w="100%" maxWidth="1500px" mx="auto" mb="20px">
                <Blockchain blockchains={blockchains} setBlockchains={setBlockchains} />
                <Sliders evmCheckbox={evmCheckbox} setEvmCheckbox={setEvmCheckbox} setShowMore={setShowMore} showMore={showMore}/>
            </Flex>
        </Flex>
    )
}
