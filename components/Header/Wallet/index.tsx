import React, { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'
import SearchDiv from '../SearchDiv'
import styles from '../SearchDiv/SearchDiv.module.scss'
import { X, Menu } from 'react-feather'
import MenuMobile from './MenuMobile'

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

function Wallet(props: any) {
  const [triggerSearch, setTriggerSearch] = useState(false)
  const wrapperRef = useRef(null)

  const { account, active, activate, deactivate } = useWeb3React()
  const [hasMetamask, setHasMetamask] = useState(true)
  const injected = new InjectedConnector({})

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

  useEffect(() => {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      )
      provider.listAccounts().then((accounts) => {
        if (accounts.length > 0) {
          handleConnect()
        }
      })
    } catch (e) {}
  }, [])

  useOutsideAlerter(wrapperRef, setTriggerSearch)
  return (
    <>
      <div className='relative'>
        <FiSearch
          className='loupe'
          onClick={() => {
            setTriggerSearch(true)
          }}
        />
        <input
          onClick={() => {
            setTriggerSearch(true)
          }}
          type='text'
          className={styles['search-input']}
          name='search'
          placeholder='Search Crypto Assets'
        />
        <button className='connect-wallet-btn' onClick={handleConnect}>
          {active
            ? account.substring(0, 4) +
              '..' +
              account.substring(account.length - 4, account.length)
            : 'Connect'}
        </button>
        <SearchDiv wrapperRef={wrapperRef} trigger={triggerSearch} />
        <button
          className='hamburger-btn'
          id='btnParent'
          onClick={() => mobileNav()}
        >
          {nav ? <X className='hamburger' /> : <Menu className='hamburger' />}
        </button>
      </div>
      <MenuMobile />
    </>
  )
}

export default Wallet
