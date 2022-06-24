
import React from 'react';
import styles from './menumobile.module.scss';
import { ethers } from 'ethers';
import { useEffect, useState, useContext } from 'react';
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector';
import { MOBL_ADDRESS } from "../../../../../constants";
import { PROTOCOL_ADDRESS } from "../../../../../constants"
import { useRouter } from 'next/router';
import { isAddress } from 'ethers/lib/utils';
import Image from 'next/image'
import { Flex, Box,IconButton, Text } from '@chakra-ui/react';
import ConnectWallet from '../../../../Utils/ConnectWallet';
import Header from "../../index"
import { ThemeContext } from '../../../../../pages/_app'
import { Sun, Moon} from "react-feather"


function MenuMobile({ connect, setConnect, close, setClose }) {
  const [isConnected, setIsConnected] = useState(false);
  const [wallet, setWallet] = useState({})
  const themeContext = useContext(ThemeContext);
  const { account, active, activate, deactivate } = useWeb3React()
  const [hasMetamask, setHasMetamask] = useState(true)
  const injected = new InjectedConnector({})
  const router = useRouter()

  useEffect(() => {
    console.log('urningng', connect)
  }, [connect])


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
      if (chainId !== '0x89' && (router.pathname.includes('dao') || router.pathname.includes('list'))) {
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

    console.log(account)
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
  const [walletBalance, setWalletBalance] = useState(0)
  const [ranked, setRanked] = useState()

  // useEffect(() => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(
  //       (window as any).ethereum
  //     )

  //     if (provider) {
  //       provider.listAccounts().catch().then((accounts) => {
  //         if (accounts.length > 0) {
  //           handleConnect();
  //           setIsConnected(true)
  //         }
  //       })
  //     }

  //   } catch (e) { }
  // }, [])

  useEffect(() => {
    const getBalance = async () => {
      if ((window as any).ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider((window as any).ethereum)
          if (provider) {
            const accounts = await provider.listAccounts();
            var account = accounts[0]
            const contract = new ethers.Contract(MOBL_ADDRESS, ['function balanceOf(address account) public view returns (uint256)'], provider)
            var balance = await contract.balanceOf(account);
            var newBalance = balance / 10 ** 18;
            setWalletBalance(newBalance)
            console.log(`You own ${walletBalance} MOBL`)
          }
        } catch (err) { }
      }
    }
    getBalance()
  }, [walletBalance])

  useEffect(() => {
    const getRanked = async () => {
      if ((window as any).ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider((window as any).ethereum);
          if (provider) {
            const accounts = await provider.listAccounts();
            var account = accounts[0]
            const protocolContract = new ethers.Contract(PROTOCOL_ADDRESS, ["function rank(address account) public view returns (uint256)"], provider)
            const rank = await protocolContract.rank(account)
            setRanked(rank)
            console.log(Number(rank))
          }
        } catch (e) { }

      }
    }
    getRanked()
  }, [])

  useEffect(() => {
    if (account && isAddress(account)) {
      fetch('https://mobulaspark.com/connection?account=' + account + '&ref=' + router.query.ref)
    }
  }, [account])
  console.log(Number(ranked))
  if (router.pathname.includes('dao')) {
    return (
      <>


        <Flex

          display="none"
          className={styles['mobile-toolbar-container']}
          id='mobileNav'
          bg="var(--background) !important"
          style={{ display: 'none' }}
        >
          <div className={styles['mobile-linkTo']}>
            <a href='dashboard' className={styles['linkTo']}>
              <span className={styles['linkTo-tag']}>Dashboard</span>
            </a>
            <a href='elections' className={styles['linkTo']}>
              <span className={styles['linkTo-tag']}>Elections</span>
            </a>
            <a href='sort' className={styles['linkTo']}>
              <span className={styles['linkTo-tag']}>First Sort</span>
            </a>
            <a href='validation' className={styles['linkTo']}>
              <span className={styles['linkTo-tag']}>Final Validation</span>
            </a>
          </div>
          <div className={styles['connect-mobile-container']}>
            <button className={styles['connect-wallet-mobile']} onClick={() => {
              setConnect(true)
            }}>
              {active
                ? account.substring(0, 4) +
                '..' +
                account.substring(account.length - 4, account.length)
                : 'Connect...'}
            </button>
            <div className={styles['rank-mobile-box']}>
              {active
                ? <><span>Rank {ranked ? Number(ranked) : '0'}</span>
                  <span>{walletBalance} MOBL</span></>
                : ''}

            </div>
          </div>

          {connect && (
            <ConnectWallet close={close} setClose={setClose} />
          )}

          

          {active ?? <div className={styles['disconnect-wallet-mobile']}>
            <button className={styles['nobg']} onClick={deactivate}>Disconnect Wallet</button>
          </div>}

        </Flex>
      </>
    )
  } else {

    return (
      <>
        <Flex
          bg="var(--background) !important"
          className={styles['mobile-toolbar-container']}
          id='mobileNav'
          style={{ display: 'none' }}
        >
          <div className={styles['mobile-linkTo']}>
            <a href='/new' className={styles['linkTo']}>
              <span className={styles['linkTo-tag']}>New</span>
            </a>
            <a href='/movers' className={styles['linkTo']}>
              <span className={styles['linkTo-tag']}>Gainers & Losers</span>
            </a>
            <Flex justify="left" align="center" className={styles['linkTo']}>
              <span
                className={styles['linkTo-tag']}
                onClick={() => (document.location.href = '/earn')}
                style={{ 'marginRight': '5px', color: '#32C784' }}
              >
                Earn
              </span>
              <Image width={20} height={20} src={'/reward1.png'} />

            </Flex>
            <a href='/soon' className={styles['linkTo']}>
              <span className={styles['linkTo-tag']}>DEX</span>
            </a>
            <a href='/dao/dashboard' className={styles['linkTo']}>
              <span className={styles['linkTo-tag']}>DAO</span>
            </a>
            <a href='/list' className={styles['linkTo']}>
              <span className={styles['linkTo-tag']}>List an asset</span>
            </a>
          </div>
          <div className={styles['connect-mobile-container']}>
            <button className={styles['connect-wallet-mobile']} onClick={() => {
              setConnect(true)
            }}>
              {active
                ? account.substring(0, 4) +
                '..' +
                account.substring(account.length - 4, account.length)
                : 'Connect'}
            </button>
            <div className={styles['rank-mobile-box']}>
              {active
                ? <><span>Rank {Number(ranked)}</span>
                  <span>{walletBalance} MOBL</span></>
                : ''}
                
            </div>
            
          </div>
          {/* <Flex w="80%" ml="35px" mt="10px" align="center">
            <IconButton
                _focus={{ boxShadow: "none" }}
                color={themeContext.colorMode == "light" ? "blue" : "white"}
                onClick={() => {
                  themeContext.setColorMode(themeContext.colorMode == "light" ? "dark" : "light")
                }}
                aria-label='Call Segun'
                size='md'
                borderRadius="12px"
                bg="none"
                ml={["0px", "0px", "0px", "20px"]}
                mr={["10px", "10px", "10px", "0px"]}
                mt={["4px", "4px", "4px", "4px"]}

              icon={themeContext.colorMode == "light" ? <Moon /> : <Sun />}
            />
            <Text color={themeContext.colorMode == "light" ? "blue" : "white"}>{themeContext.colorMode == "light" ? "Dark Mode" : "Light Mode"}</Text>
          </Flex> */}
          
          {active ??
            <div className={styles['disconnect-wallet-mobile']}>
              <button className={styles['nobg']} onClick={deactivate}>Disconnect Wallet</button>
            </div>}
            
        </Flex>
      </>
    )
  }


}

export default MenuMobile
