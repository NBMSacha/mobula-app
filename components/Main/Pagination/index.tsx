
import { AiOutlineArrowRight } from '@react-icons/all-files/ai/AiOutlineArrowRight'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { HiOutlineGlobeAlt } from '@react-icons/all-files/hi/HiOutlineGlobeAlt'
import { SiDiscord } from '@react-icons/all-files/si/SiDiscord'
import styles from './ButtonBlock.module.scss';
import React, { useState, useEffect } from 'react';
import { Box, Flex, Spacer, Heading, extendTheme, Text, Button } from '@chakra-ui/react';
import {
    Previous,
    Paginator,
    PageGroup,
    Page,
    Next,
    generatePages
} from 'chakra-paginator';
import { ChevronRight, ChevronLeft } from "react-feather";
import { VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router';

function Pagination({ maxPage }) {
    const router = useRouter();
    const page = router.query.page ? parseInt(router.query.page as string) : 1;

    return (
        <VStack my={40}>
            <Box>
                <Flex p={2}>
                    <Spacer />
                    <Previous bg="none" border="none" cursor="pointer">
                        <ChevronLeft color="#FFF" />
                    </Previous>

                    <Button mx={5} bg={page == 1 ? "blue" : "none"} d="flex" border="none" justifyContent="center" alignItems="center" p={3} h={25} w={25} borderRadius={8} cursor="pointer" onClick={() => {
                        router.push('/?page=1')
                    }}>
                        <Text color="#fff">1</Text>
                    </Button>

                    {page >= 5 && <Button mx={5} color="#fff" bg="none" border="none" type="button" disabled>...</Button>}

                    {Math.max(Math.min(page - 2, maxPage - 5), 2) < maxPage && <Button mx={5} bg={Math.max(Math.min(page - 2, maxPage - 5), 2) == page ? "blue" : "none"} d="flex" border="none" justifyContent="center" alignItems="center" p={3} h={25} w={25} borderRadius={8} cursor="pointer" onClick={() => {
                        router.push('/?page=' + Math.max(Math.min(page - 2, maxPage - 5), 2))
                    }}>
                        <Text color="#fff">{Math.max(Math.min(page - 2, maxPage - 5), 2)}</Text>

                    </Button>}

                    {Math.max(Math.min(page - 1, maxPage - 4), 3) < maxPage && <Button mx={5} d="flex" bg={Math.max(Math.min(page - 1, maxPage - 4), 3) == page ? "blue" : "none"} border="none" justifyContent="center" alignItems="center" p={3} h={25} w={25} borderRadius={8} cursor="pointer" onClick={() => {
                        router.push('/?page=' + Math.max(Math.min(page - 1, maxPage - 4), 3))
                    }}>
                        <Text color="#fff">{Math.max(Math.min(page - 1, maxPage - 4), 3)}</Text>
                    </Button>}

                    {Math.max(Math.min(page, maxPage - 3), 4) < maxPage && <Button mx={5} d="flex" bg={Math.max(Math.min(page, maxPage - 3), 4) == page ? "blue" : "none"} border="none" justifyContent="center" alignItems="center" p={3} h={25} w={25} borderRadius={8} cursor="pointer" onClick={() => {
                        router.push('/?page=' + Math.max(Math.min(page, maxPage - 3), 4))
                    }}>
                        <Text color="#fff">{Math.max(Math.min(page, maxPage - 3), 4)}</Text>
                    </Button>}

                    {Math.max(Math.min(page + 1, maxPage - 2), 5) < maxPage && <Button mx={5} d="flex" bg={Math.max(Math.min(page + 1, maxPage - 2), 5) == page ? "blue" : "none"} border="none" justifyContent="center" alignItems="center" p={3} h={25} w={25} borderRadius={8} cursor="pointer" onClick={() => {
                        router.push('/?page=' + Math.max(Math.min(page + 1, maxPage - 2), 5))
                    }}>
                        <Text color="#fff">{Math.max(Math.min(page + 1, maxPage - 2), 5)}</Text>
                    </Button>}

                    {Math.max(Math.min(page + 2, maxPage - 1), 6) < maxPage && <Button mx={5} d="flex" bg={Math.max(Math.min(page + 2, maxPage - 1), 6) == page ? "blue" : "none"} border="none" justifyContent="center" alignItems="center" p={3} h={25} w={25} borderRadius={8} cursor="pointer" onClick={() => {
                        router.push('/?page=' + Math.max(Math.min(page + 2, maxPage - 1), 6))
                    }}>
                        <Text color="#fff">{Math.max(Math.min(page + 2, maxPage - 1), 6)}</Text>
                    </Button>}

                    {page < maxPage - 5 && <Button mx={5} color="#fff" bg="none" border="none" type="button" disabled>...</Button>}

                    {maxPage > 1 && <Button mx={5} d="flex" bg={maxPage == page ? "blue" : "none"} border="none" justifyContent="center" alignItems="center" p={3} h={25} w={25} borderRadius={8} cursor="pointer" onClick={() => {
                        router.push('/?page=' + maxPage)
                    }}>
                        <Text color="#fff">{maxPage}</Text>
                    </Button>}
                    <Next bg="none" border="none">
                        <ChevronRight color="#FFF" cursor="pointer" onClick={() => {
                            router.push('/?page=' + (page + 1))
                        }} />
                    </Next>
                </Flex>
            </Box>
        </VStack >
    )
}

export default Pagination