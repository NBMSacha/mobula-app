import React from 'react';
import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { Tbody, Tr, Td } from '@chakra-ui/react';
import { getTokenPrice, getTokenPercentage, getUrlFromName } from '../../../../../helpers/formaters';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { useRouter} from "next/router";

function Losers({losers}) {

    const router = useRouter();
    const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
    const hover = useColorModeValue("white", "var(--chakra-colors-dark_inactive_gainer)")
    const border = useColorModeValue("var(--chakra-colors-grey_border)", "var(--chakra-colors-border_dark_gainer)")

    return (
            <>
                {losers.map((gainer: any, idx: number) => {
                    return (
                        <Tbody borderBottom={`2px solid ${border}`} fontSize={["12px","12px","13px", "15px"]} onClick={() => router.push('/asset/' + getUrlFromName(gainer.name))} _hover={{background:hover, cursor:"pointer"}}>
                        <Tr position="relative">     
                            <Td py={["5px", "5px", "5px", "5px"]} px="5px" position="sticky" left="0px" bg={bg} _hover={{background:"none"}}>
                                <Flex align="center" left="0px">
                                    <Image mr="15px" h="30px" borderRadius="50%" src={gainer.logo}/>
                                    <Text mr="5px" textOverflow="ellipsis" overflow="hidden" maxWidth="168px">{gainer.name}</Text>
                                    <Text opacity="0.6">{gainer.symbol}</Text>
                                </Flex>
                            </Td>
                            <Td px="5px" isNumeric>${getTokenPrice(gainer.price)}</Td>
                            <Td px="5px" isNumeric color="red"><TriangleDownIcon boxSize="12px" mb="2px" mr="3px"/>{getTokenPercentage(gainer.price_change_24h)}%</Td>
                            <Td px="5px" isNumeric>${gainer.volume}</Td>
                        </Tr>
                    </Tbody>
                    )
                })}
            </>
        )
}

export default Losers;