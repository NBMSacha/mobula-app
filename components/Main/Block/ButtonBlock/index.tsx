import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from '@react-icons/all-files/ai/AiOutlineArrowRight'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { HiOutlineGlobeAlt } from '@react-icons/all-files/hi/HiOutlineGlobeAlt'
import { SiDiscord } from '@react-icons/all-files/si/SiDiscord'
import styles from './ButtonBlock.module.scss';
import { Sliders} from "react-feather"
import { FiSearch} from '@react-icons/all-files/fi/FiSearch'
import { X, Settings } from 'react-feather';
import { createClient } from '@supabase/supabase-js'
import { Button, useColorMode, IconButton,useColorModeValue, Flex, Box, Text, Heading, Input, Image } from "@chakra-ui/react";
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

    const { data: symbols } = await supabase
      .from('assets')
      .select()
      .match({ symbol: search.toUpperCase() })

    if (symbols && symbols.length > 0) {
      console.log('We found it', symbols)
      setResults(symbols)
    }

  }

}

function ButtonBlock({ setDisplay, display, setResults }) {
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

  function lockerButton() {
    const rectangle = document.getElementById('rectangle')
    const cercle = window.document.getElementById('cercle')
    if (cercle.style.transform === 'translateX(0%)') {
      cercle.style.transform = 'translateX(135%)'
      rectangle.style.background = '#24274A'
      cercle.style.transition =
        'transform 150ms ease-in, background 150ms ease-in'
    } else {
      cercle.style.transform = 'translateX(0%)'
      rectangle.style.background = '#58667E'
      cercle.style.transition =
        'transform 150ms ease-out, background 150ms ease-out'
    }
  }
  
  const input = useColorModeValue("white_input", "dark_input")
  const shadow = useColorModeValue("shadow_color", "is_none")
  console.log(`shadow: ${shadow}`)

  return (
    <Flex className={styles['main-blockchain-container']} w="100%">
      <div className={styles['blockchain-container']}>
        <Button mx={1} fontSize={["12px","12px","14px","14px"]} variant={display == 'Top 100' ? 'secondary' : 'primary'} h={["30px", "30px","50px", "50px"]} display="flex" alignItems="center" justifyContent="center" maxWidth="155px" width="13%" whiteSpace="nowrap" borderRadius="10px" padding="10px 20px" onClick={() => setDisplay('Top 100')}>Top 100</Button>
        <Button mx={1} fontSize={["12px","12px","14px","14px"]} variant={display == 'My Assets' ? 'secondary' : 'primary'} h={["30px", "30px","50px", "50px"]} display="flex" alignItems="center" justifyContent="center" padding="10px 20px" borderRadius="10px" className={styles[(display == 'My Assets' ? 'select-button-white' : 'select-button')]} onClick={() => setDisplay('My Assets')}>My Assets</Button>
        <Button mx={1} fontSize={["12px","12px","14px","14px"]} display={["none","flex", "flex", "flex"]} variant={display == 'Ethereum' ? 'secondary' : 'primary'}h={["30px", "30px","50px", "50px"]}  alignItems="center" justifyContent="center" padding="10px 20px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles['eth-btn-block']} ${display == 'Ethereum' ? styles['white'] : ''}`} onClick={() => setDisplay('Ethereum')}>
          <img src='ethereum.png' className={`${styles['blockchain-logo']} ${styles["eth-btn"]}`} />
          <span className={styles['blockchain-name']} style={{marginLeft: "10px"}}>ETH</span>
        </Button>
        <Button mx={1}  fontSize={["12px","12px","14px","14px"]} variant={display == 'BNB Smart Chain (BEP20)' ? 'secondary' : 'primary'} h={["30px", "30px","50px", "50px"]}  alignItems="center" justifyContent="center" padding="10px 20px" borderRadius="10px" className={`${styles['blockchain-btn']}  ${styles['bsc-btn']} ${display == 'BNB Smart Chain (BEP20)' ? styles['white'] : ''}`} onClick={() => setDisplay('BNB Smart Chain (BEP20)')}>
          <img src='bnb.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']} style={{marginLeft: "10px"}}>BNB</span>
        </Button>
        <Button mx={1} fontSize={["12px","12px","14px","14px"]} display={["none","none", "none", "flex"]} variant={display == 'Avalanche C-Chain' ? 'secondary' : 'primary' } h={["30px", "30px","50px", "50px"]}  alignItems="center" justifyContent="center" padding="10px 20px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles['avax-btn']} ${display == 'Avalanche C-Chain' ? styles['white'] : ''}`} onClick={() => setDisplay('Avalanche C-Chain')}>
          <img src='avalanche.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']} style={{marginLeft: "10px"}}>AVAX</span>
        </Button>
        <Button mx={1} fontSize={["12px","12px","14px","14px"]} display={["none","none", "flex", "flex"]} variant={display == 'Polygon' ? 'secondary' : 'primary'} h={["30px", "30px","50px", "50px"]}  alignItems="center" justifyContent="center" padding="10px 20px" borderRadius="10px" className={`${styles['blockchain-btn']} ${styles['matic-btn']} ${display == 'Polygon' ? styles['white'] : ''}`} onClick={() => setDisplay('Polygon')}>
          <img src='polygon.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']} style={{marginLeft: "10px"}}>MATIC</span>
        </Button>
        <Button mx={1} fontSize={["12px","12px","14px","14px"]}  variant={display == 'Other Chains' ? 'secondary' : 'primary'} h={["30px", "30px","50px", "50px"]}  alignItems="center" justifyContent="center" padding={["10px 10px","10px 10px", "10px 20px", "10px 20px"]} borderRadius="10px"
          className={`${styles['blockchain-btn']} ${styles['blockchain-btn-three']}`}
        >
          <img src='harmony.png' className={styles['three-blockchain-logo']} />
          <img src='optimism.png' className={styles['three-blockchain-logo']} />
          <img src='arbitrum.png' className={styles['three-blockchain-logo']} />
          <span>
            <AiOutlineArrowRight className={styles['marginFa']} />
          </span>
          <span className={`${styles['mienai']} ${styles['blockchain-name']}`}>Other Chains</span>

        </Button>

        <button className={styles["params"]}>
          <Settings className={styles["colors"]} />
        </button>
        <Flex mx={1} align="center" position="relative" bg={input} h={["30px", "30px","50px", "50px"]} display={["none","none", "flex", "flex"]} padding="10px 0px" borderRadius="10px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
          <Flex ml="10px" mr="5px" fontSize="25px" opacity=".6" bg={input} _placeholder={{overflow:"hidden", whiteSpace:"nowrap",marginRight:"10px", textOverflow:"ellipsis"}}>
            <FiSearch className={styles['loupe']}  />
          </Flex>
          <Input
            // value={token}
            type='text'
            bg={input}
            border="none" 
            name='search'
            fontSize="14px"
            _placeholder={{color: "none"}}
            placeholder='Search crypto-asset...'
            onChange={(e) => setSearch(e.target.value)}
            id='search'
            autoFocus
          ></Input>
          {/* <X className={styles['X']} onClick={() => props.setTrigger(false)} /> */}
        </Flex>
        <IconButton mx={1} variant={display == 'Settings' ? 'secondary' : 'primary'} display={["none","none", "flex", "flex"]}
          boxShadow={`1px 2px 12px 3px ${shadow}`}
          colorScheme='teal'
          aria-label='Call Segun'
          size='lg'
          bg={input}
          icon={<Sliders/>}
        />
      </div>
    </Flex >
  )
}

export default ButtonBlock
