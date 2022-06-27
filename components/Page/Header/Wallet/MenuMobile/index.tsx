
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
import { Flex, Box, IconButton, Text } from '@chakra-ui/react';
import ConnectWallet from '../../../../Utils/ConnectWallet';
import { ThemeContext } from '../../../../../pages/_app'
import { Sun, Moon } from "react-feather"


function MenuMobile({ connect, setConnect, close, setClose, isMenuMobile }) {
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

  const [walletBalance, setWalletBalance] = useState(0)
  const [ranked, setRanked] = useState()

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

  return (
    <>
      <Flex
        bg="var(--background) !important"
        className={styles['mobile-toolbar-container']}
        id='mobileNav'
        display={isMenuMobile ? "flex" : "none"}
        zIndex={2000}
      >
        {router.pathname.includes('dao') ? <div className={styles['mobile-linkTo']}>
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
        </div> :
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
            <a href='/dex' className={styles['linkTo']}>
              <span className={styles['linkTo-tag']}>DEX</span>
            </a>
            <a href='/dao/dashboard' className={styles['linkTo']}>
              <span className={styles['linkTo-tag']}>DAO</span>
            </a>
            <a href='/list' className={styles['linkTo']}>
              <span className={styles['linkTo-tag']}>List an asset</span>
            </a>
          </div>}
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

export default MenuMobile
