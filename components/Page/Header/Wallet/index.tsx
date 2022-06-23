import React, { useEffect, useState, useRef } from 'react'
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

function Wallet({}) {
  const [triggerSearch, setTriggerSearch] = useState(false)
  const wrapperRef = useRef(null)
  const [isMobile, setIsMobile] = useState(true);
  const { account, active, activate, deactivate } = useWeb3React()
  const [hasMetamask, setHasMetamask] = useState(true)
  const injected = new InjectedConnector({})
  const router = useRouter()
  const [ connect, setConnect] = useState(false)
  const [ close, setClose ] = useState(false)

  const NO_ETHEREUM_OBJECT = /No Ethereum provider was found on window.ethereum/

  const isNoEthereumObject = (err) => {
    return NO_ETHEREUM_OBJECT.test(err)
  }

  const handleConnect = async () => {
    const provider = (window as any).ethereum

    if (!provider) {
      setHasMetamask(false)
    } else {
      const chainId = await provider.request({ method: 'eth_chainId' })
      if (router.pathname.includes('dao') || router.pathname.includes('list')) {
        if (chainId !== '0x89') {
          try {
            await provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x89' }],
            })
          } catch (switchError) {
            try {
              await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x89',
                    chainName: 'Polygon - MATIC',
                    rpcUrls: ['https://polygon-rpc.com'],
                    blockExplorerUrls: ['https://polygonscan.com/'],
                    nativeCurrency: {
                      symbol: 'MATIC',
                      decimals: 18,
                    },
                  },
                ],
              })
            } catch (addError) {
              console.log(addError)
            }
            if (switchError.code === 4902) {
              console.log(
                'This network is not available in your metamask, please add it'
              )
            }
            console.log('Failed to switch to the network', switchError)
          }
        }
      }

      if (active) {
        deactivate()
        return
      }

      activate(injected, (error) => {
        if (isNoEthereumObject(error)) {
          setHasMetamask(false)
        }
      })
    }
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= 1060)
  }, [])

  useEffect(() => {
    if (account && isAddress(account)) {
      fetch('https://mobulaspark.com/connection?account=' + account + '&ref=' + router.query.ref)
    }
  }, [account])

  const [nav, setNav] = useState(false)

  async function mobileNav() {
    const nav = document.getElementById('mobileNav') as any
    if (nav.style.display == 'none') {
      nav.style.display = 'block'
      setNav(true)
    } else {
      nav.style.display = 'none'
      setNav(false)
    }
    await nav
  }

  // useEffect(() => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(
  //       (window as any).ethereum
  //     )

  //     if (provider) {
  //       provider.listAccounts().catch().then((accounts) => {
  //         if (accounts.length > 0) {
  //           handleConnect()
  //         }
  //       })
  //     }

  //   } catch (e) { }
  // }, [])
  const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
  useOutsideAlerter(wrapperRef, setTriggerSearch)

  const [isLargerThan1180] = useMediaQuery('(min-width: 1180px)')
  const [isLargerThan1080] = useMediaQuery('(min-width: 1090px)')
  const { colorMode, toggleColorMode } = useColorMode();
  const colorSunMoon = useColorModeValue("sun_moon_color", "bg_white")


  return (
    <>

      <Flex className={styles['relative']} >
        <Flex bg="var(--box-secondary)" boxShadow="1px 2px 13px 3px var(--shadow)" onClick={() => router.push('/earn')}   justify="center" align="center" className={styles['earn']} position='relative' >
          <img src='/fullicon.png' className={styles["image-earn"]} />
          <span
            style={{ 'marginRight': '5px' }}
          >
            Earn
          </span>

          <Flex display={triggerSearch ? "none" : "flex" } onClick={() => router.push('/earn')} justify="center" align="center" position="absolute" bg="#32C784" borderRadius='50%' top="-9px" right="-9px" className={styles["notif-earn"]}>
            <Text fontSize="12px" color="white" >+1</Text>
          </Flex>
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
            boxShadow={`1px 2px 12px 3px ${shadow}`}
            _focus={{ boxShadow: "none" }}
            onClick={toggleColorMode}
            aria-label='Call Segun'
            size='md'
            borderRadius="12px"
            color={colorSunMoon}
            bg="none"
            ml={["0px", "0px", "0px", "20px"]}
            mr={["20px", "20px", "20px", "0px"]}
            mt={["4px", "4px", "4px", "4px"]}

            icon={colorMode == "light" ? <Moon /> : <Sun />}
          />
        </Flex>
        {connect && (
            <ConnectWallet close={close} setClose={setClose} />
        )}
        
        <button
          className={styles['hamburger-btn']}
          id='btnParent'
          onClick={() => mobileNav()}
        >
          {nav ? (
            <X className={styles['hamburger']} />
          ) : (
            <><Menu className={styles['hamburger']} /> <Circle width="10px" fill={'#32C784'} className={styles['new']}></Circle></>
          )}
        </button>

      </Flex>

      <MenuMobile connect={connect} setConnect={setConnect} close={close} setClose={setClose}/>
    </>
  )
}

export default Wallet
