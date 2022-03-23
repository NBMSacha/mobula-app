import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";

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
            if (chainId !== '0xA869') {
                try {
                    await provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0xA869' }],
                    });
                } catch (switchError) {
                    try {
                        await provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0xA869',
                                    chainName: 'Avax C-Chain - Testnet',
                                    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'], blockExplorerUrls: ['https://testnet.snowtrace.io/'],
                                    nativeCurrency: {
                                        symbol: 'AVAX',
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
        handleConnect()
    }, [])

    return (
        <div className="header">
            <div className="main">
                <div className="left">
                    <img src='icon.png' className="head-logo" alt="logo" onClick={() => document.location.href = "/"} />
                </div>

                <div className="right">
                    <span onClick={() => document.location.href = "governance"}>Governance</span>
                    <span onClick={() => document.location.href = "dashboard"}>Dashboard</span>
                    <span onClick={() => document.location.href = "sort"}>First Sort</span>
                    <span onClick={() => document.location.href = "validation"}>Final Validation</span>
                    <span onClick={() => document.location.href = "list"}>Listing Form</span>
                    <button
                        className="btn btn-primary button"
                        onClick={handleConnect}
                    >{(active ? account.substring(0, 4) + '..' + account.substring(account.length - 4, account.length) : "Connect Now")}</button>
                </div>
            </div>
        </div>
    )
}

export default Header
