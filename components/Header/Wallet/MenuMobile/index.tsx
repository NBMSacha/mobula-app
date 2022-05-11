
import React from 'react';
import styles from './menumobile.module.scss';
import {ethers} from 'ethers';
import {  useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector';
import { MOBL_ADDRESS } from "../../../../constants";
import { PROTOCOL_ADDRESS } from "../../../../constants"


function MenuMobile(props: any) {

  const [ isConnected, setIsConnected] = useState(false);
  const [ wallet, setWallet ] = useState({})

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
    const [ walletBalance, setWalletBalance] = useState(0)
    const [ranked, setRanked] = useState()
    useEffect(() => {
      try {
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        )
      
        
        provider.listAccounts().then((accounts) => {
          if (accounts.length > 0) {
            handleConnect();
            setIsConnected(true)
          }
        })

        
      } catch (e) {}
    }, [])

    useEffect(() => {
      const getBalance = async () => {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        const accounts = await provider.listAccounts();
        var account = accounts[0]
        const contract = new ethers.Contract(MOBL_ADDRESS,['function balanceOf(address account) public view returns (uint256)'],provider)
        var balance = await contract.balanceOf(account);
        var newBalance = balance / 10**18;
        setWalletBalance(newBalance)
        console.log(`You own ${walletBalance} MOBL`)
      }
      getBalance()
    },[walletBalance])

    
    useEffect(() => {
      const getRanked = async () => {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const accounts = await provider.listAccounts();
        var account = accounts[0]
        const protocolContract = new ethers.Contract(PROTOCOL_ADDRESS, ["function rank(address account) public view returns (uint256)"], provider)    
        const rank = await protocolContract.rank(account)
        setRanked(rank)
        console.log(Number(rank))
      }
      getRanked()
    },[])
    console.log(Number(ranked))

  return (
    <>
      <div
        className={styles['mobile-toolbar-container']}
        id='mobileNav'
        style={{ display: 'none' }}
      >
        <div className={styles['mobile-linkTo']}>
          <a href='soon' className={styles['linkTo']}>
            <span className={styles['linkTo-tag']}>New</span>
          </a>
          <a href='soon' className={styles['linkTo']}>
            <span className={styles['linkTo-tag']}>Gainers & Losers</span>
          </a>
          <a href='soon' className={styles['linkTo']}>
            <span className={styles['linkTo-tag']}>Earn</span>
          </a>
          <a href='soon' className={styles['linkTo']}>
            <span className={styles['linkTo-tag']}>DEX</span>
          </a>
          <a href='soon' className={styles['linkTo']}>
            <span className={styles['linkTo-tag']}>DAO</span>
          </a>
          <a href='list' className={styles['linkTo']}>
            <span className={styles['linkTo-tag']}>List and asset</span>
          </a>
        </div>
        <div className={styles['connect-mobile-container']}>
          <button className={styles['connect-wallet-mobile']} onClick={handleConnect}>
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
        <div className={styles['disconnect-wallet-mobile']}>
          <button className={styles['nobg']} onClick={deactivate}>Disconnect Wallet</button>
        </div>
      </div>
    </>
  )
}

export default MenuMobile