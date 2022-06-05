import React, { useEffect, useState, useRef } from 'react'
import styles from './Governance.module.scss';
import { ethers } from 'ethers'
import { ChakraProvider, Box, Flex, Button, Image, Input, Text, Heading, Textarea, useColorModeValue, Link, Collapse } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    ColorModeProvider,
    CSSReset
} from '@chakra-ui/react';
import HistoryBox from "./HistoryBox"

function Historys({ proposal }) {
    console.log(proposal)
    const [show, setShow] = useState(false)
    const [value, setValue] = useState("")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bg = useColorModeValue("white_voting", "dark_box_list")
    const gradient = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
    const overflowRef = useRef()

<<<<<<< Updated upstream:components/Pages/Governance/History/index.tsx
=======
    const handleToggle = () => setShow(!show)

    const [bshow, setBShow] = useState(false)
    
>>>>>>> Stashed changes:components/Governance/History/index.tsx
    return (
        <Flex direction="column" mt="30px" h="700px" overflowY="scroll" position="relative">
            <Text mb='20px'>History of community ideas</Text>
            {/* BOX */}
<<<<<<< Updated upstream:components/Pages/Governance/History/index.tsx
            <Link onClick={() => {
                (overflowRef as any).current.style.overflow = "auto"
            }}>
                <Flex w="100%" justify="space-between" bg={bg} px="5%" boxShadow={`1px 2px 12px 3px ${shadow}`} h="auto" minHeight="60px" align="center" borderRadius="12px" mb="20px">
                    <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxWidth="60%" ref={overflowRef}>I should be faster than thatffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</Text>
                    <Flex w="150px" justify="space-between" align="center">
                        <Image src="/thumbsUp.png" h="30px" />
                        <Text color="green">Accepted</Text>
                    </Flex>
                </Flex>
            </Link>
            {/* TO REMOVE */}
            <Flex w="100%" justify="space-between" bg={bg} px="5%" boxShadow={`1px 2px 12px 3px ${shadow}`} h="auto" minHeight="60px" align="center" borderRadius="12px" mb="20px">
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxWidth="60%" ref={overflowRef}>I should be faster than thatffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</Text>
                <Flex w="150px" justify="space-between" align="center">
                    <Image src="/thumbsUp.png" h="30px" />
                    <Text color="green">Accepted</Text>
                </Flex>
            </Flex>
            <Flex w="100%" justify="space-between" bg={bg} px="5%" boxShadow={`1px 2px 12px 3px ${shadow}`} h="auto" minHeight="60px" align="center" borderRadius="12px" mb="20px">
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxWidth="60%" ref={overflowRef}>I should be faster than thatffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</Text>
                <Flex w="150px" justify="space-between" align="center">
                    <Image src="/thumbsUp.png" h="30px" />
                    <Text color="green">Accepted</Text>
                </Flex>
            </Flex>
            <Flex w="100%" justify="space-between" bg={bg} px="5%" boxShadow={`1px 2px 12px 3px ${shadow}`} h="auto" minHeight="60px" align="center" borderRadius="12px" mb="20px">
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxWidth="60%" ref={overflowRef}>I should be faster than thatffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</Text>
                <Flex w="150px" justify="space-between" align="center">
                    <Image src="/thumbsUp.png" h="30px" />
                    <Text color="green">Accepted</Text>
                </Flex>
            </Flex>
            <Flex w="100%" justify="space-between" bg={bg} px="5%" boxShadow={`1px 2px 12px 3px ${shadow}`} h="auto" minHeight="60px" align="center" borderRadius="12px" mb="20px">
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxWidth="60%" ref={overflowRef}>I should be faster than thatffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</Text>
                <Flex w="150px" justify="space-between" align="center">
                    <Image src="/thumbsUp.png" h="30px" />
                    <Text color="green">Accepted</Text>
                </Flex>
            </Flex>
            <Flex w="100%" justify="space-between" bg={bg} px="5%" boxShadow={`1px 2px 12px 3px ${shadow}`} h="auto" minHeight="60px" align="center" borderRadius="12px" mb="20px">
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxWidth="60%" ref={overflowRef}>I should be faster than thatffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</Text>
                <Flex w="150px" justify="space-between" align="center">
                    <Image src="/thumbsUp.png" h="30px" />
                    <Text color="green">Accepted</Text>
                </Flex>
            </Flex>
            <Flex w="100%" justify="space-between" bg={bg} px="5%" boxShadow={`1px 2px 12px 3px ${shadow}`} h="auto" minHeight="60px" align="center" borderRadius="12px" mb="20px">
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxWidth="60%" ref={overflowRef}>I should be faster than thatffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</Text>
                <Flex w="150px" justify="space-between" align="center">
                    <Image src="/thumbsUp.png" h="30px" />
                    <Text color="green">Accepted</Text>
                </Flex>
            </Flex>
            <Flex w="100%" justify="space-between" bg={bg} px="5%" boxShadow={`1px 2px 12px 3px ${shadow}`} h="auto" minHeight="60px" align="center" borderRadius="12px" mb="20px">
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxWidth="60%" ref={overflowRef}>I should be faster than thatffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</Text>
                <Flex w="150px" justify="space-between" align="center">
                    <Image src="/thumbsUp.png" h="30px" />
                    <Text color="green">Accepted</Text>
                </Flex>
            </Flex>
            <Flex w="100%" justify="space-between" bg={bg} px="5%" boxShadow={`1px 2px 12px 3px ${shadow}`} h="auto" minHeight="60px" align="center" borderRadius="12px" mb="20px">
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxWidth="60%" ref={overflowRef}>I should be faster than thatffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</Text>
                <Flex w="150px" justify="space-between" align="center">
                    <Image src="/thumbsUp.png" h="30px" />
                    <Text color="green">Accepted</Text>
                </Flex>
            </Flex>
            <Flex w="100%" justify="space-between" bg={bg} px="5%" boxShadow={`1px 2px 12px 3px ${shadow}`} h="auto" minHeight="60px" align="center" borderRadius="12px" mb="20px">
                <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" maxWidth="60%" ref={overflowRef}>I should be faster than thatffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</Text>
                <Flex w="150px" justify="space-between" align="center">
                    <Image src="/thumbsUp.png" h="30px" />
                    <Text color="green">Accepted</Text>
                </Flex>
            </Flex>
            <Box w="100%" h="200px" bg={`linear-gradient(180deg,hsla(0,0%,100%,0) 0,${gradient} 100%,#f5f5f5 100%,#f5f5f5)`} position="absolute" bottom="0px"></Box>
=======
               
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
                <Box w="100%" h="200px" bg={`linear-gradient(180deg,hsla(0,0%,100%,0) 0,${gradient} 100%,#f5f5f5 100%,#f5f5f5)`} position="absolute" bottom="0px"></Box>
>>>>>>> Stashed changes:components/Governance/History/index.tsx
        </Flex>
    )
}

export default Historys
