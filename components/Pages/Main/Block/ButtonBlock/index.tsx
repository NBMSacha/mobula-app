import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from '@react-icons/all-files/ai/AiOutlineArrowLeft'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { HiOutlineGlobeAlt } from '@react-icons/all-files/hi/HiOutlineGlobeAlt'
import { SiDiscord } from '@react-icons/all-files/si/SiDiscord'
import styles from './ButtonBlock.module.scss';
import { Sliders } from "react-feather"
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'
import { X, Settings } from 'react-feather';
import { createClient } from '@supabase/supabase-js'
import { Button, useColorMode, IconButton, useColorModeValue, Flex, Box, Text, Heading, Input, Image } from "@chakra-ui/react";
import Widget from "../../../../Utils/Widget"

async function updateSearch(search: string, supabase: any, setResults: any) {

  if (search) {
    const { data: names } = await supabase
      .from('assets')
      .select('*')
      .or('name.ilike.' + search + '%,symbol.ilike.' + search + '%,name.ilike.' + search)
      .order('market_cap', { ascending: false })
      .limit(10)

    if (names && names.length > 0) {
      setResults(names)
    }
  }
}

function ButtonBlock({ setDisplay, display, setResults, widgetVisibility, setWidgetVisibility }) {
  const [search, setSearch]: [string | null, Function] = useState();
  const supabase = createClient(
    'https://ylcxvfbmqzwinymcjlnx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
  )

  useEffect(() => {
    if (search && search != '') {
      setDisplay('search')
      updateSearch(search, supabase, setResults)
    } else {
      setResults([])
      setDisplay('Top 100')
    }
  }, [search])

  console.log(display)

  return (
    <Flex className={styles['main-blockchain-container']} w="100%" bg="var(--table)">
      <Flex className={styles['blockchain-container']} >
        <Flex align="center" >
          <Button _focus={{ boxShadow: "none" }} minWidth="fit-content" mx={1} fontSize={["12px", "12px", "14px", "14px"]} variant={display == 'Top 100' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} display="flex" alignItems="center" justifyContent="center" maxWidth="155px" width="13%" whiteSpace="nowrap" borderRadius="8px" padding="10px" onClick={() => setDisplay('Top 100')}>Top 100</Button>
          <Button _focus={{ boxShadow: "none" }} fontSize={["12px", "12px", "14px", "14px"]} variant={display == 'My Assets' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} display="flex" alignItems="center" justifyContent="center" padding={["5px", "5px", "8px", "8px"]} borderRadius="10px" className={styles[(display == 'My Assets' ? 'select-button-white' : 'select-button')]} onClick={() => setDisplay('My Assets')}>My Assets</Button>
        </Flex>
        <Flex justify="left" overflowX="scroll" css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          }
        }}>
          <Button _focus={{ boxShadow: "none" }} minWidth="fit-content" mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={"flex"} variant={display == 'Ethereum' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding={["5px", "5px", "8px", "8px"]} borderRadius="8px" className={`${styles['blockchain-btn']} ${styles['eth-btn-block']} ${display == 'Ethereum' ? styles['white'] : ''}`} onClick={() => setDisplay('Ethereum')}>
            <img src='ethereum.png' className={`${styles['blockchain-logo']} ${styles["eth-btn"]}`} />
            <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>ETH</span>
          </Button>
          <Button _focus={{ boxShadow: "none" }} minWidth="fit-content" mx={1} fontSize={["12px", "12px", "14px", "14px"]} variant={display == 'BNB Smart Chain (BEP20)' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding={["5px", "5px", "8px", "8px"]} borderRadius="8px" className={`${styles['blockchain-btn']}  ${styles['bsc-btn']} ${display == 'BNB Smart Chain (BEP20)' ? styles['white'] : ''}`} onClick={() => setDisplay('BNB Smart Chain (BEP20)')}>
            <img src='bnb.png' className={styles['blockchain-logo']} />
            <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>BNB</span>
          </Button>
          <Button _focus={{ boxShadow: "none" }} minWidth="fit-content" mx={1} fontSize={["12px", "12px", "14px", "14px"]} variant={display == 'Avalanche C-Chain' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding={["5px", "5px", "8px", "8px"]} borderRadius="8px" className={`${styles['blockchain-btn']} ${display == 'Avalanche C-Chain' ? styles['white'] : ''}`} onClick={() => setDisplay('Avalanche C-Chain')}>
            <img src='avalanche.png' className={styles['blockchain-logo']} />
            <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>AVAX</span>
          </Button>
          <Button _focus={{ boxShadow: "none" }} minWidth="fit-content" mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={"flex"} variant={display == 'Polygon' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding={["5px", "5px", "8px", "8px"]} borderRadius="8px" className={`${styles['blockchain-btn']}  ${display == 'Polygon' ? styles['white'] : ''}`} onClick={() => setDisplay('Polygon')}>
            <img src='polygon.png' className={styles['blockchain-logo']} />
            <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>MATIC</span>
          </Button>

          <Button _focus={{ boxShadow: "none" }} minWidth="fit-content" mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={"flex"} variant={display == 'Cronos' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding={["5px", "5px", "8px", "8px"]} borderRadius="8px" className={`${styles['blockchain-btn']} ${styles['matic-btn']} 
          ${display == 'Cronos' ? styles['white'] : ''}`}
            onClick={() => setDisplay('Cronos')}>
            <img src='cronos.png' className={styles['blockchain-logo']} />
            <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>Cronos</span>
          </Button>
          <Button _focus={{ boxShadow: "none" }} minWidth="fit-content" mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={"flex"} variant={display == 'Arbitrum' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding={["5px", "5px", "8px", "8px"]} borderRadius="8px" className={`${styles['blockchain-btn']} ${styles['matic-btn']} 
          ${display == 'Arbitrum' ? styles['white'] : ''}`}
            onClick={() => setDisplay('Arbitrum')}>
            <img src='arbitrum.png' className={styles['blockchain-logo']} />
            <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>Arbitrum</span>
          </Button>

          <Button _focus={{ boxShadow: "none" }} w={["120px", "120px", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
            display={["flex", "flex", "flex", "flex", "flex"]} variant={display == 'Harmony' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]}
            alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles["digi-btn"]} 
          ${display == 'Harmony' ? styles['white'] : ''}`}
            onClick={() => setDisplay('Harmony')}>
            <Image h={["20px", "20px", "28px", "28px"]} src='/harmony.png' className={`${styles['blockchain-logo']} ${styles["digi-btn"]}`} />
            <span className={styles['blockchain-name']} style={{ marginLeft: "10px" }}>Harmony</span>
          </Button>

        </Flex>
        {/* <Button minWidth={["fit-content", "fit-content", "fit-content", "fit-content"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]} variant={display == 'Other Chains' ? 'secondary' : 'primary'} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding={["10px 10px", "10px 10px", "10px 10px", "10px 10px"]} borderRadius="10px"
          className={`${styles['blockchain-btn']} ${styles['blockchain-btn-three']}`}
        >
          <span>
            <AiOutlineArrowLeft style={{ width: '19px', fontSize: "21px" }} className={styles["spanMargin"]} />
          </span>
          <span style={{ margin: "0px 10px" }} className={`${styles['mienai']} ${styles['blockchain-name']}`}>Other chains</span>
          <Image src='harmony.png' h={["28px", "28px", "28px", "36px"]} />
          <Image src='optimism.png' h={["28px", "28px", "28px", "36px"]} />
          <Image src='arbitrum.png' h={["28px", "28px", "28px", "36px"]} />


        </Button> */}

        <Flex align="center">


          <Flex bg="var(--box_primary)" border={`1px solid var(--box_border)`} mx={1} align="center" position="relative" h={["30px", "30px", "40px", "40px"]} display={["none", "none", "flex", "flex"]} padding="10px 0px" borderRadius="10px" boxShadow={`1px 2px 12px 3px var(--shadow)`}>
            <Flex ml="10px" mr="5px" fontSize="25px" opacity=".6" _placeholder={{ overflow: "hidden", whiteSpace: "nowrap", marginRight: "10px", textOverflow: "ellipsis" }}>
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

          <IconButton mx={1} variant={display == 'Settings' ? 'secondary' : 'primary'} border="1px solid var(--box_border)" display={["flex"]}
            onClick={() => {
              setWidgetVisibility(!widgetVisibility)
            }}
            _focus={{ boxShadow: "none" }}
            boxShadow={`1px 2px 12px 3px var(--shadow)`}
            colorScheme='teal'
            aria-label='Call Segun'
            boxSize={["30px", "30px", "40px", "40px"]}
            icon={<Sliders size={20} />}
          />
        </Flex>
      </Flex>
    </Flex >
  )
}

export default ButtonBlock
