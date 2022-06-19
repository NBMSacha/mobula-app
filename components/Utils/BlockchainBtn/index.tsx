import React, { useEffect, useState, useRef } from 'react';
import styles from "./BlockchainBtn.module.scss";
import { Twitter, Globe, ArrowUp, ArrowDown } from "react-feather";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useRouter } from 'next/router';
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

export default function BlockchainBtn({ hideSearchBar = false, widgetVisibility, setWidgetVisibility, blockchain, setBlockchain }) {
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
  const [display, setDisplay] = useState("ntm FDP")

  return (

    <Flex className={styles['main-blockchain-container']} w={["100%", "100%", "95%", "95%"]} mx="auto" bg={bg} mb="10px">
      <Flex className={styles['blockchain-container']} w="100%" justify="space-between">
        <Button w={["80px", "80px", "95px", "110px"]} border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["flex", "flex", "flex", "flex"]} variant={blockchain == 'Ethereum' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles['eth-btn-block']} ${display == 'Ethereum' ? styles['white'] : ''}`}
          onClick={() => setBlockchain('Ethereum')}>
          <Image h={["20px", "20px", "28px", "28px"]} src='/ethereum.png' className={`${styles['blockchain-logo']}`} />
          <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>ETH</span>
        </Button>
        <Button w={["80px", "80px", "95px", "110px"]} border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]} variant={blockchain == 'BNB Smart Chain (BEP20)' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" borderRadius="10px" className={`${styles['blockchain-btn']}  ${styles['bsc-btn']} ${blockchain == 'BNB Smart Chain (BEP20)' ? styles['white'] : ''}`}
          onClick={() => setBlockchain('BNB Smart Chain (BEP20)')}>
          <Image h={["20px", "20px", "28px", "28px"]} src='/bnb.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>BNB</span>
        </Button>
        <Button w={["80px", "80px", "95px", "110px"]} border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["flex", "flex", "flex", "flex"]} variant={blockchain == 'Avalanche C-Chain' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles['avax-btn']} ${blockchain == 'Avalanche C-Chain' ? styles['white'] : ''}`}
          onClick={() => setBlockchain('Avalanche C-Chain')}>
          <Image h={["20px", "20px", "28px", "28px"]} src='/avalanche.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>AVAX</span>
        </Button>
        <Button w={["80px", "80px", "95px", "110px"]} border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["flex", "flex", "flex", "flex"]} variant={blockchain == 'Polygon' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px 10px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles['matic-btn']} ${blockchain == 'Polygon' ? styles['white'] : ''}`}
          onClick={() => setBlockchain('Polygon')}>
          <Image h={["20px", "20px", "28px", "28px"]} src='/polygon.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>MATIC</span>
        </Button>

        <Button w={["80px", "80px", "95px", "110px"]} border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["none", "flex", "flex", "flex"]} variant={blockchain == 'Cronos' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles['onion-btn']} ${blockchain == 'Cronos' ? styles['white'] : ''}`}
          onClick={() => setBlockchain('Cronos')}>
          <Image h={["20px", "20px", "28px", "28px"]} src='/cronos.png' className={`${styles['blockchain-logo']} ${styles["onion-btn"]}`} />
          <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>Cronos</span>
        </Button>

        <Button w={["120px", "120px", "120px", "120px"]} border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["none", "flex", "flex", "flex"]} variant={blockchain == 'Arbitrum' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles["digi-btn"]} ${display == 'Arbitrum' ? styles['white'] : ''}`} onClick={() =>
          setBlockchain('Arbitrum')}>
          <Image h={["20px", "20px", "28px", "28px"]} src='/arbitrum.png' className={`${styles['blockchain-logo']} ${styles["digi-btn"]}`} />
          <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>Arbitrum</span>
        </Button>

        <Button w={["120px", "120px", "120px", "120px"]} border={`1px solid ${border}`} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
          display={["none", "flex", "flex", "flex", "flex"]} variant={blockchain == 'Harmony' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]}
          alignItems="center" justifyContent="center" padding="10px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles["digi-btn"]} 
          ${display == 'Harmony' ? styles['white'] : ''}`}
          onClick={() => setBlockchain('Harmony')}>
          <Image h={["20px", "20px", "28px", "28px"]} src='/harmony.png' className={`${styles['blockchain-logo']} ${styles["digi-btn"]}`} />
          <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>Harmony</span>
        </Button>

        {/* <Button px="10px" borderRadius="8px" className={styles["btn-loosers"]} style={{ boxShadow: `1px 2px 13px 3px ${shadow}` }} _focus={{ boxShadow: "none" }} border="1px solid rgba(122, 122, 122, 0.1)">
          <ArrowBackIcon w="20px" h="20px" mx="6px" />
          <Image mr="5px" src="/avalanche.png" h={["20px", "20px", "28px", "28px"]} />
          <Image mr="5px" src="/bcw.png" h={["20px", "20px", "28px", "28px"]} />
          <Image mr="5px" src="/polygon.png" h={["20px", "20px", "28px", "28px"]} />
        </Button> */}
        {/* 
     <button className={styles["params"]}>
       <Settings className={styles["colors"]} />
     </button> */}


        <IconButton mx={1} variant={display == 'Settings' ? 'secondary' : 'primary'} display={["flex", "flex", "flex", "flex"]}
          onClick={() => {
            setWidgetVisibility(true)
            console.log("ok")
          }}


          boxShadow={`1px 2px 12px 3px ${shadow}`}
          border={`1px solid ${border}`}
          colorScheme='teal'
          aria-label='Call Segun'
          boxSize={['29px', '29px', '39px', '39px']}
          p="6px"
          icon={<Sliders />}
        />
      </Flex>
    </Flex >
  )
}