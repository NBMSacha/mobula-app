
import { AiOutlineArrowRight } from '@react-icons/all-files/ai/AiOutlineArrowRight'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { HiOutlineGlobeAlt } from '@react-icons/all-files/hi/HiOutlineGlobeAlt'
import { SiDiscord } from '@react-icons/all-files/si/SiDiscord'
import styles from './ButtonBlock.module.scss';
import React, { useState, useEffect } from 'react';
import { Box, Flex, Spacer,Heading,extendTheme, Text, Button} from '@chakra-ui/react';
import {
    Previous,
    Paginator,
    PageGroup,
    Page,
    Next,
    generatePages
  } from 'chakra-paginator';
import { ChevronRight, ChevronLeft} from "react-feather";
import { VStack } from '@chakra-ui/react'

function Pagination(props: any) {


    return (
    <VStack my={40}>
        <Box>
            <Flex p={2}>
                <Spacer />
                <Paginator
                // onPageChange={handlePageChange}
                // pagesQuantity={pagesQuantity - 1}
                >
                <Previous bg="none" border="none">
                    <ChevronLeft color="#FFF"/>
                </Previous>

                    <Button mx={5} bg="blue" d="flex" border="none" justifyContent="center" alignItems="center" p={3}  h={25} w={25} borderRadius={8}>
                        <Text >1</Text>
                    </Button>
                    <Button mx={5} bg="none" d="flex"  border="none" justifyContent="center" alignItems="center" p={3}  h={25} w={25} borderRadius={8}>
                        <Text color="#fff">2</Text>
                    </Button>
                    <Button mx={5} d="flex" bg="none" border="none" justifyContent="center" alignItems="center" p={3}  h={25} w={25} borderRadius={8}>
                        <Text color="#fff">3</Text>
                    </Button>
                    <Button  mx={5} d="flex" bg="none" border="none" justifyContent="center" alignItems="center" p={3}  h={25} w={25} borderRadius={8}>
                        <Text color="#fff">4</Text>
                    </Button>
                    <Button  mx={5} d="flex" bg="none" border="none" justifyContent="center" alignItems="center" p={3}  h={25} w={25} borderRadius={8}>
                        <Text color="#fff">5</Text>
                    </Button>
                    <Button  mx={5} d="flex" bg="none" border="none" justifyContent="center" alignItems="center" p={3}  h={25} w={25} borderRadius={8}>
                        <Text color="#fff">6</Text>
                    </Button>
                    <Button mx={5} color="#fff" bg="none" border="none" type="button" disabled>...</Button>
                    <Button  mx={5} d="flex" bg="none" border="none" justifyContent="center" alignItems="center" p={3}  h={25} w={25} borderRadius={8}>
                        <Text color="#fff">102</Text>
                    </Button>



                {/* <PageGroup>
                   
                    {/* {generatePages(pagesQuantity)?.map((page) => (
                    // <Page
                    //     key={`paginator_page_${page}`}
                    //     page={page}
                    //     normalStyles={normalStyles}
                    //     activeStyles={activeStyles}
                    // />
                    ))} */}
                {/* </PageGroup> */} 
                <Next bg="none" border="none">
                    <ChevronRight color="#FFF"/>
                </Next>
                </Paginator>
            </Flex>
        </Box>
    </VStack>
    )
}

export default Pagination