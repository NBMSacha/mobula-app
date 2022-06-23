import React from 'react';
import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from "next/router";
import { Tbody, Tr, Td, useMediaQuery } from '@chakra-ui/react';
import { getTokenPrice, getTokenPercentage, getUrlFromName, getTokenFormattedPrice, formatAmount } from '../../../../../helpers/formaters';
import { TriangleUpIcon } from '@chakra-ui/icons';

function Gainers({ gainers }) {

    const router = useRouter();
    const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
    const border = useColorModeValue("var(--chakra-colors-grey_border)", "var(--chakra-colors-border_dark_gainer)")
    const hover = useColorModeValue("white", "var(--chakra-colors-dark_inactive_gainer)")
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)')

    return (
        <>
            {gainers.map((gainer: any, idx: number) => {
                return (
                    <Tbody borderBottom={`1px solid var(--box_border)`} fontSize={["12px", "12px", "13px", "15px"]} onClick={() => router.push('/asset/' + getUrlFromName(gainer.name))} _hover={{ background: "var(--box_active)", cursor: "pointer" }}>
                        <Tr position="relative">
                            <Td borderBottom="1px solid var(--box_border) !important" py={["5px", "5px", "5px", "5px"]} px="5px" position="sticky" left="0px"  bg={['var(--background)','var(--background)',"none","none"]} _hover={{ background: "none" }}>
                                <Flex align="center" >
                                    <Image mr="15px" h="30px" borderRadius="50%" src={gainer.logo} />
                                    <Text mr="5px" textOverflow="ellipsis" overflow="hidden" maxWidth="168px">{gainer.name}</Text>
                                    <Text opacity="0.6" color="var(--text-secondary)">{gainer.symbol}</Text>
                                </Flex>
                            </Td>
                            <Td borderBottom="1px solid var(--box_border) !important" px="5px" isNumeric  >{getTokenFormattedPrice(gainer.price, '$', { justify: 'right', marginTop: 'auto' })}</Td>
                            <Td borderBottom="1px solid var(--box_border) !important" px="5px" isNumeric color="green">
                                <TriangleUpIcon boxSize="12px" mb="4px" mr="3px" />
                                {getTokenPercentage(gainer.price_change_24h)}%
                            </Td>
                            <Td borderBottom="1px solid var(--box_border) !important" px="5px" isNumeric>${formatAmount(gainer.volume)}</Td>
                        </Tr>
                    </Tbody>
                )
            })}
        </>
    )
}

export default Gainers;