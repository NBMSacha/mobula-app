import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';
import Wallet from "./Wallet"
import Link from "./Link";
import Brand from './Brand';
import Tendance from './Tendance';


function Header(props: any) {
    const { account, active, activate, deactivate } = useWeb3React();
    const [hasMetamask, setHasMetamask] = useState(true);
    const injected = new InjectedConnector({});

    const NO_ETHEREUM_OBJECT = /No Ethereum provider was found on window.ethereum/;

    const isNoEthereumObject = (err) => {
        return NO_ETHEREUM_OBJECT.test(err);
    };

    // useEffect(() => {
    //     alert('yes')
    // }, [])

    const handleConnect = async () => {
        const provider = (window as any).ethereum;

        if (!provider) {
            setHasMetamask(false)
        } else {
            const chainId = await provider.request({ method: 'eth_chainId' });
            if (chainId !== '0x89') {
                try {
                    await provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x89' }],
                    });
                } catch (switchError) {
                    try {
                        await provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x89',
                                    chainName: 'Polygon - MATIC',
                                    rpcUrls: ['https://polygon-rpc.com'], blockExplorerUrls: ['https://polygonscan.com/'],
                                    nativeCurrency: {
                                        symbol: 'MATIC',
                                        decimals: 18
                                    }
                                }]
                        });
                    } catch (addError) {
                        console.log(addError);
                    }
                    if (switchError.code === 4902) {
                        console.log("This network is not available in your metamask, please add it")
                    }
                    console.log("Failed to switch to the network", switchError)
                }
            }
        }

        console.log(account)
        if (active) {
            deactivate();
            return;
        }

        activate(injected, (error) => {
            if (isNoEthereumObject(error)) {
                setHasMetamask(false)
            }

        });
    };

    useEffect(() => {
        try {
            const provider = new ethers.providers.Web3Provider((window as any).ethereum)
            provider.listAccounts().then((accounts) => {
                if (accounts.length > 0) {
                    handleConnect()
                }
            });
        } catch (e) { }

    }, [])

    return (

        <div className="header">
            <div className="main">
                <Brand />
                <Link />
                <Wallet />
                
            </div>
        </div>

    )
}

export default Header;