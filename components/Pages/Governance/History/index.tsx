import React, { useEffect, useState, useRef } from 'react'
import styles from './History.module.scss';
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
   
    const overflowRef = useRef()

    const handleToggle = () => setShow(!show)

    const [bshow, setBShow] = useState(false)
    
    return (
        <Flex direction="column" mt="30px" h="545px" overflowY="scroll" className={styles['scroll']}>
            <Text mb='20px' fontSize={["13px", "13px", "15px", "18px"]}>History</Text>
            {/* BOX */}
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
        </Flex>
        // bg={`linear-gradient(180deg,hsla(0,0%,100%,0) 0,${gradient} 100%,#f5f5f5 100%,#f5f5f5)`}
    )
}

export default Historys
