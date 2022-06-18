import React, { useEffect, useState, useRef } from 'react';
import styles from "./BlockchainBtn.module.scss";
import { Twitter, Globe, ArrowUp, ArrowDown } from "react-feather";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useRouter} from 'next/router';
import { AiOutlineArrowLeft } from '@react-icons/all-files/ai/AiOutlineArrowLeft'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { HiOutlineGlobeAlt } from '@react-icons/all-files/hi/HiOutlineGlobeAlt'
import { SiDiscord } from '@react-icons/all-files/si/SiDiscord'
import { Sliders } from "react-feather"
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'
import { X, Settings } from 'react-feather';
import { createClient } from '@supabase/supabase-js'
import { ArrowBackIcon } from "@chakra-ui/icons"
import { Button, useColorMode, IconButton, useColorModeValue, Flex, Box, Text, Heading, Input, Image, Link } from "@chakra-ui/react";
import ButtonBlock from "../../Pages/Main/Block/ButtonBlock"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useMediaQuery } from '@chakra-ui/react'
import { formatName, getTokenPrice, getTokenPercentage, formatAmount, getUrlFromName, getTokenFormattedPrice } from '../../../helpers/formaters';

export default function BlockchainBtn({ tokens,   widgetVisibility, setWidgetVisibility}) {
  const router = useRouter();
  const [textResponsive, setTextResponsive] = useState(false);
  const percentageRef = useRef()
const [settings, setSettings] = useState({ liquidity: 1000, volume: 50_000, onChainOnly: false, default: true })
  useEffect(() => {
    if (percentageRef && percentageRef.current) {
      if ((window.matchMedia("(max-width: 768px)").matches)) {
        setTextResponsive(true)
      } else {
        setTextResponsive(false)
      }
    }
  }, [])
  
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
  const shadow = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
  const btn_bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
  const hover = useColorModeValue("white", "var(--chakra-colors-dark_inactive_gainer)")
  const border = useColorModeValue("var(--chakra-colors-grey_border)", "var(--chakra-colors-border_dark_gainer)")
  const [display, setDisplay ] = useState("ntm FDP")

  return (

   <Flex className={styles['main-blockchain-container']} w={["100%","100%","95%","95%"]} mx="auto" bg={bg} mb="10px">
   <Flex className={styles['blockchain-container']} w="100%" justify="space-between">
     <Button w={["80px","80px","95px","110px"]} border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["none", "flex", "flex", "flex"]} variant={display == 'Onion' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles['onion-btn']} ${display == 'Onion' ? styles['white'] : ''}`} onClick={() => setDisplay('Onion')}>
         <Image h={["20px", "20px", "28px", "28px"]} src='/onion.png' className={`${styles['blockchain-logo']} ${styles["onion-btn"]}`} />
         <span  className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>ONION</span>
     </Button>
     <Button w={["80px","80px","95px","110px"]}border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["none", "flex", "flex", "flex"]} variant={display == 'Digi' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles["digi-btn"]} ${display == 'Digi' ? styles['white'] : ''}`} onClick={() => setDisplay('Digi')}>
       <Image h={["20px", "20px", "28px", "28px"]} src='/digi.png' className={`${styles['blockchain-logo']} ${styles["digi-btn"]}`} />
       <span  className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>DiGi</span>
     </Button>
     <Button w={["80px","80px","95px","110px"]} border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["none", "flex", "flex", "flex"]} variant={display == 'Ethereum' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles['eth-btn-block']} ${display == 'Ethereum' ? styles['white'] : ''}`} onClick={() => setDisplay('Ethereum')}>
       <Image h={["20px", "20px", "28px", "28px"]} src='/ethereum.png' className={`${styles['blockchain-logo']} ${styles["eth-btn"]}`} />
       <span  className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>ETH</span>
     </Button>
     <Button w={["80px","80px","95px","110px"]} border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]} variant={display == 'BNB Smart Chain (BEP20)' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" borderRadius="10px" className={`${styles['blockchain-btn']}  ${styles['bsc-btn']} ${display == 'BNB Smart Chain (BEP20)' ? styles['white'] : ''}`} onClick={() => setDisplay('BNB Smart Chain (BEP20)')}>
       <Image h={["20px", "20px", "28px", "28px"]} src='/bnb.png' className={styles['blockchain-logo']} />
       <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>BNB</span>
     </Button>
     <Button w={["80px","80px","95px","110px"]} border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["none", "none", "none", "flex"]} variant={display == 'Avalanche C-Chain' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles['avax-btn']} ${display == 'Avalanche C-Chain' ? styles['white'] : ''}`} onClick={() => setDisplay('Avalanche C-Chain')}>
       <Image h={["20px", "20px", "28px", "28px"]} src='/avalanche.png' className={styles['blockchain-logo']} />
       <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>AVAX</span>
     </Button>
     <Button w={["80px","80px","95px","110px"]} border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["none", "none", "flex", "flex"]} variant={display == 'Polygon' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px 10px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles['matic-btn']} ${display == 'Polygon' ? styles['white'] : ''}`} onClick={() => setDisplay('Polygon')}>
       <Image h={["20px", "20px", "28px", "28px"]} src='/polygon.png' className={styles['blockchain-logo']} />
       <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>MATIC</span>
     </Button>
     
     <Button px="10px" borderRadius="8px" className={styles["btn-loosers"]} style={{ boxShadow: `1px 2px 13px 3px ${shadow}` }} _focus={{boxShadow:"none"}} border="1px solid rgba(122, 122, 122, 0.1)">
                        <ArrowBackIcon w="20px" h="20px" mx="6px" />
                        <Text fontSize={["10px", "10px", "15px", "15px"]} mr="10px">See all</Text>
                        <Image mr="5px" src="/avalanche.png" h={["20px","20px","28px","28px"]} />
                        <Image mr="5px" src="/bcw.png" h={["20px","20px","28px","28px"]} />
                        <Image mr="5px" src="/polygon.png" h={["20px","20px","28px","28px"]} />
                    </Button>
{/* 
     <button className={styles["params"]}>
       <Settings className={styles["colors"]} />
     </button> */}
     <Flex  className={styles['inputDis']} bg={btn_bg} border={`1px solid ${border}`} mx={1} align="center" position="relative" h={["30px", "30px", "40px", "40px"]} display={["none", "none", "flex", "flex"]} padding="10px 0px" borderRadius="10px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
       <Flex bg={btn_bg} ml="10px" mr="5px" fontSize="25px" opacity=".6"_placeholder={{ overflow: "hidden", whiteSpace: "nowrap", marginRight: "10px", textOverflow: "ellipsis" }}>
         <FiSearch className={styles['loupe']} />
       </Flex>
       <Input
         // value={token}
        
         type='text'
         bg="none"
         border="none"
         name='search'
         fontSize="14px"
         _placeholder={{ color: "none" }}
         placeholder='Search'
         onChange={(e) => setSearch(e.target.value)}
         id='search'
         autoFocus
       ></Input>
       {/* <X className={styles['X']} onClick={() => props.setTrigger(false)} /> */}
     </Flex>
     <IconButton mx={1} variant={display == 'Settings' ? 'secondary' : 'primary'} display={["flex", "flex", "flex", "flex"]}
     onClick={() => {
       setWidgetVisibility(true)
     }}

   
       boxShadow={`1px 2px 12px 3px ${shadow}`}
       border={`1px solid ${border}`}
       colorScheme='teal'
       aria-label='Call Segun'
       boxSize={['29px','29px','39px','39px']}
       p="6px"
       icon={<Sliders />}
     />
   </Flex>
 </Flex >
  )
    }