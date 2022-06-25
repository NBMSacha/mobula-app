import React, { useEffect, useState, useRef, useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'
import SearchDiv from './SearchDiv/index'
import styles from './wallet.module.scss'
import { X, Menu, Circle } from 'react-feather'
import MenuMobile from './MenuMobile'
import { useRouter } from 'next/router'
import { isAddress } from 'ethers/lib/utils';
import Image from 'next/image'
import { Flex, Text, useColorModeValue, Button, Input, IconButton } from '@chakra-ui/react'
import { useMediaQuery } from '@chakra-ui/react'
import { Moon, Sun } from "react-feather"
import {
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
} from '@chakra-ui/react'
import ConnectWallet from "../../../Utils/ConnectWallet";
import { ThemeContext } from '../../../../pages/_app'


function useOutsideAlerter(ref: any, setTriggerHook: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setTriggerHook(false)
      } else {
        console.log(ref)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

function Wallet({ isMenuMobile, setIsMenuMobile}) {
  const [triggerSearch, setTriggerSearch] = useState(false)
  const wrapperRef = useRef(null)
  const [isMobile, setIsMobile] = useState(true);
  const { account, active, activate, deactivate } = useWeb3React()
  const router = useRouter()
  const [connect, setConnect] = useState(false)
  const [close, setClose] = useState(false)
  const themeContext = useContext(ThemeContext);
  


  const NO_ETHEREUM_OBJECT = /No Ethereum provider was found on window.ethereum/

  const isNoEthereumObject = (err) => {
    return NO_ETHEREUM_OBJECT.test(err)
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= 1060)
  }, [])

  useEffect(() => {
    if (account && isAddress(account)) {
      fetch('https://mobulaspark.com/connection?account=' + account + '&ref=' + router.query.ref)
    }
  }, [account])

  const [isLargerThan1180] = useMediaQuery('(min-width: 1180px)')
  const [isLargerThan1080] = useMediaQuery('(min-width: 1090px)')

  useOutsideAlerter(wrapperRef, setTriggerSearch)

  return (
    <>

      <Flex className={styles['relative']} >
        <Flex bg="var(--box-secondary)" transition="background 200ms ease-in-out" _hover={{background:'var(--box_active)', transition:"background 200ms ease-in-out"}} boxShadow="1px 2px 13px 3px var(--shadow)" onClick={() => router.push('/earn')} justify="center" align="center" className={styles['earn']} position='relative' >
          <img src='/fullicon.png' className={styles["image-earn"]} />
          <span
            style={{ 'marginRight': '5px' }}
          >
            Earn
          </span>

          <Flex display={triggerSearch ? "none" : "flex"} onClick={() => router.push('/earn')} justify="center" align="center" position="absolute" bg="#32C784" borderRadius='50%' top="-9px" right="-9px" className={styles["notif-earn"]}>
            <Text fontSize="12px" color="white" >+1</Text>
          </Flex>
        </Flex>
        <Flex height="100%" align="center" display={["flex","flex","none","none"]}>
          <IconButton
            _focus={{ boxShadow: "none" }}
            onClick={() => {
              themeContext.setColorMode(themeContext.colorMode == "light" ? "dark" : "light")
            }}
            aria-label='Call Segun'
            size='md'
            borderRadius="12px"
            opacity=".5"
            bg="none"
            ml={["0px", "0px", "0px", "20px"]}
            icon={themeContext.colorMode == "light" ? <Moon /> : <Sun />}
          />
        </Flex>
        <Flex align="center" ml={["20px", "20px", "20px", isLargerThan1080 ? "0px" : "20px"]} borderRadius="10px" bg={["none", "none", "none", "var(--box-secondary)"]} mr="20px" boxShadow={["none", "none", "none", `1px 2px 12px 3px var(--shadow)`]} w={["30px", "30px", "30px", isLargerThan1180 ? "190px" : "160px"]} >
          <FiSearch
            className={styles['loupe']}
            style={{ marginRight: "10px" }}
            onClick={() => {
              setTriggerSearch(true)
            }}
          />
          <Input
            display={["none", "none", "none", "block"]}
            border="none"
            _placeholder={{ color: "none" }}
            onClick={() => {
              setTriggerSearch(true)
            }}
            bg="none"
            w={["0px", "0px", "auto", "auto"]}
            type='text'
            name='search'
            placeholder={!isMobile ? 'Search ' : ''}
          />
        </Flex>
        <button
          className={styles['connect-wallet-btn']}
          onClick={() => {
            setConnect(true)
          }}
        >
          {active
            ? account.substring(0, 4) +
            '..' +
            account.substring(account.length - 4, account.length)
            : 'Connect'}
        </button>
        
        <SearchDiv wrapperRef={wrapperRef} trigger={triggerSearch} setTrigger={setTriggerSearch} />
        <Flex height="100%" align="center" display={["none", "none", "none", "flex"]}>
          <IconButton
            opacity=".5"
            _focus={{ boxShadow: "none" }}
            onClick={() => {
              themeContext.setColorMode(themeContext.colorMode == "light" ? "dark" : "light")
            }}
            aria-label='Call Segun'
            size='md'
            borderRadius="12px"
            bg="none"
            ml={["0px", "0px", "0px", "20px"]}
            mr={["20px", "20px", "20px", "0px"]}
            mt={["4px", "4px", "4px", "4px"]}

            icon={themeContext.colorMode == "light" ? <Moon /> : <Sun />}
          />
        </Flex>
        {connect && (
          <ConnectWallet close={close} setClose={setClose} />
        )}

        <button
          className={styles['hamburger-btn']}
          id='btnParent'
          onClick={() => {
            setIsMenuMobile(!isMenuMobile)
            console.log(`Is menu Mobile Appear ? => ${isMenuMobile}`)
          }}
        >
          {isMenuMobile ? (
            <X className={styles['hamburger']} />
          ) : (
            <><Menu className={styles['hamburger']} /> <Circle width="10px" fill={'#32C784'} className={styles['new']}></Circle></>
          )}
        </button>

      </Flex>

      <MenuMobile isMenuMobile={isMenuMobile} connect={connect} setConnect={setConnect} close={close} setClose={setClose} />
    </>
  )
}

export default Wallet
