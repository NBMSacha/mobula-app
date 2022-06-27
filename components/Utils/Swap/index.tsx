import React, { useEffect, useState, useRef } from 'react'
import { ChakraProvider, Link, ColorModeProvider, useColorModeValue, Input, Image, Button, Flex, Box, Text, Heading, Spinner } from '@chakra-ui/react'
import axios from 'axios';
import { useAlert } from 'react-alert';
import { ArrowDown, ArrowUp, ChevronDown, RotateCcw } from 'react-feather';
import { useWeb3React } from '@web3-react/core'
import ConnectWallet from '../ConnectWallet';
import Select from './Select';
import { ethers } from 'ethers';
import { getBlockchainFromId, mobulaRouter, supportedRPCs, tokensPerBlockchain } from '../../../constants';

const Swap = ({ tokenInBuffer, tokenOutBuffer }: { tokenInBuffer?: any, tokenOutBuffer?: any }) => {
    const alert = useAlert()
    const [tokenIn, setTokenIn] = useState(tokenInBuffer);
    const [tokenInBalance, setTokenInBalance]: [any, Function] = useState(null);
    const [tokenOut, setTokenOut] = useState(tokenOutBuffer)
    const [tokenOutBalance, setTokenOutBalance]: [any, Function] = useState(null);
    const inputInRef = useRef(null);
    const inputOutRef = useRef(null);
    const web3React = useWeb3React()
    const [selectVisible, setSelectVisible]: [string | boolean, any] = useState();
    const [connect, setConnect] = useState(false)
    const [swapIn, setSwapIn]: [any, Function] = useState({ amount: '', decided: false })
    const [swapOut, setSwapOut]: [any, Function] = useState({ amount: '', decided: false })
    const [swapInfo, setSwapInfo]: [any, Function] = useState()
    const [buttonStatus, setButtonStatus] = useState('Loading...')
    const [buttonLoading, setButtonLoading] = useState(false)
    const [arrow, setArrow] = useState(false)
    const [needApprove, setNeedApprove] = useState(false)
    const [pathSymbols, setPathSymbols]: [any, Function] = useState()
    const activeStatus = ['Connect wallet', 'Approve', 'Swap']
    const precision = 3000

    useEffect(() => {

        try {
            const chain = web3React.chainId;
            console.log('hey')
            if (tokenOut && !tokenOut.address && tokenOut.contracts) {
                const address = tokenOut.contracts[tokenOut.blockchains.indexOf(getBlockchainFromId[web3React.chainId])];
                //setTokenOut({ symbol: tokenOut.symbol, address, logo: tokenOut.logo })
                const RPC = supportedRPCs.filter(entry => entry.name == getBlockchainFromId[web3React.chainId])[0];
                const provider = new ethers.providers.JsonRpcProvider(RPC);
                const contract = new ethers.Contract(address, [
                    'function decimals() public view returns (uint256)'], provider)
                contract.decimals().then((r: ethers.BigNumber) => {
                    setTokenOut({ symbol: tokenOut.symbol, address, logo: tokenOut.logo, decimals: r.toNumber() })
                })
            }

            if (chain == 137) {
                setTokenIn({ symbol: 'MATIC', logo: '/polygon.png', decimals: 18 })
                if (tokenOut) {
                    setButtonStatus('Swap')
                } else {
                    setButtonStatus('Select token out.')
                }
            } else if (chain == 56) {
                setTokenIn({ symbol: 'BNB', logo: '/bnb.png', decimals: 18 })
                if (tokenOut) {
                    setButtonStatus('Swap')
                } else {
                    setButtonStatus('Select token out.')
                }
            } else if (chain) {
                setTokenIn(null)
                setButtonStatus('Unsupported chain.')
            } else {
                setButtonStatus('Connect wallet')

            }
        } catch (e) {
            if (web3React?.chainId) {
                setButtonStatus('Asset not on ' + getBlockchainFromId[web3React.chainId].split(' ')[0])
            } else {
                setButtonStatus('Connect wallet')
            }
        }

    }, [web3React.chainId])

    useEffect(() => {
        const RPC = supportedRPCs.filter(entry => entry.name == getBlockchainFromId[web3React.chainId])[0];
        const provider = new ethers.providers.JsonRpcProvider(RPC);
        if (tokenIn?.address) {
            const contract = new ethers.Contract(tokenIn.address, [
                'function balanceOf(address account) public view returns (uint256)',
                'function allowance(address account, address spender) public view returns (uint256)',
                'function decimals() public view returns (uint256)'], provider)

            contract.balanceOf(web3React.account).then((r: ethers.BigNumber) => {
                setTokenInBalance((r.mul(10000).div(ethers.BigNumber.from('1' + '0'.repeat(tokenIn.decimals))).toNumber() / 10000).toFixed(4))
            })

            contract.allowance(web3React.account, mobulaRouter[web3React.chainId]).then((r: any) => {
                try {
                    if (!r.toNumber()) {
                        console.log('Allowance', r)
                        setNeedApprove(true)
                        setButtonStatus('Approve')
                    }
                } catch (e) {
                    console.log(e)
                    setNeedApprove(false)
                }
            })


        } else if (tokenIn) {
            provider.getBalance(web3React.account).then((r: any) => {
                setTokenInBalance((r.div(1e9).toNumber() / 1e9).toFixed(4))
            })

            if (tokenOut) {
                setButtonStatus('Swap')
                setNeedApprove(false)
            }

        } else {
            setTokenInBalance(null)
        }
    }, [tokenIn])

    useEffect(() => {
        const RPC = supportedRPCs.filter(entry => entry.name == getBlockchainFromId[web3React.chainId])[0];
        const provider = new ethers.providers.JsonRpcProvider(RPC);
        if (tokenOut?.address) {
            console.log(tokenOut.address, web3React.account)
            const contract = new ethers.Contract(tokenOut.address, [
                'function balanceOf(address account) public view returns (uint256)',
                'function allowance(address spender, address account) public view returns (uint256)',
                'function decimals() public view returns (uint256)'], provider)

            contract.balanceOf(web3React.account).then((r: ethers.BigNumber) => {
                console.log('Balance', r)
                try {
                    setTokenOutBalance((r.mul(10000).div(ethers.BigNumber.from('1' + '0'.repeat(tokenOut.decimals))).toNumber() / 10000).toFixed(4))
                } catch (e) { }
            })

            if (tokenIn && !tokenIn.address) {
                setButtonStatus('Swap')
                setNeedApprove(false)
            }

        } else if (tokenOut) {
            provider.getBalance(web3React.account).then((r: any) => {
                setTokenOutBalance((r.div(1e9).toNumber() / 1e9).toFixed(4))
            })
        } else {
            setTokenOutBalance(null)
        }
    }, [tokenOut])

    useEffect(() => {

        if (tokenIn && tokenOut) {
            if (swapIn.decided) {
                setButtonLoading(true)
                const oldButtonStatus = buttonStatus
                setButtonStatus('Loading best price...')

                const delayDebounceFn = setTimeout(() => {
                    console.log(tokenIn, tokenOut)
                    fetch('http://64.225.102.30:3000/quote?' +
                        'tokenADecimals=' + tokenIn.decimals +
                        '&tokenBDecimals=' + tokenOut.decimals +
                        '&tokenIn=' +
                        (tokenIn.address || tokensPerBlockchain[getBlockchainFromId[web3React.chainId]][0])
                        + '&tokenOut=' + (tokenOut.address || tokensPerBlockchain[getBlockchainFromId[web3React.chainId]][0])
                        + '&amountIn=' + swapIn.amount + '&chain=' +
                        getBlockchainFromId[web3React.chainId])
                        .then(r => r.json())
                        .then(async (r) => {
                            setButtonLoading(false)

                            if (!r.error) {
                                setButtonStatus(needApprove ? 'Approve' : 'Swap')
                                setSwapInfo(r)
                                console.log('out : ' + r.amountOut)
                                setSwapOut({ amount: r.amountOut, decided: false })
                                const middleTokens = r.path.slice(1, r.path.length - 1);
                                const symbols = [tokenIn.symbol];
                                for (let i = 0; i < middleTokens.length; i++) {
                                    const RPC = supportedRPCs.filter(entry => {
                                        return entry.name == getBlockchainFromId[web3React.chainId];
                                    })[0];
                                    const provider = new ethers.providers.JsonRpcProvider(RPC);
                                    const contract = new ethers.Contract(middleTokens[i],
                                        ['function symbol() public view returns (string)'], provider)

                                    symbols.push(await contract.symbol());
                                }

                                symbols.push(tokenOut.symbol)

                                setPathSymbols(symbols)
                            } else {
                                setButtonStatus('No route found.')
                            }

                        })
                }, 300)

                return () => {
                    clearTimeout(delayDebounceFn)
                }
            }
        }

    }, [swapIn, tokenIn, tokenOut])

    useEffect(() => {

        if (tokenIn && tokenOut) {
            if (swapOut.decided) {
                setButtonLoading(true)
                setButtonStatus('Loading best price...')

                const delayDebounceFn = setTimeout(() => {
                    console.log(tokenIn, tokenOut)
                    fetch('http://64.225.102.30:3000/quote?' +
                        'tokenADecimals=' + tokenIn.decimals +
                        '&tokenBDecimals=' + tokenOut.decimals +
                        '&tokenIn=' +
                        (tokenIn.address || tokensPerBlockchain[getBlockchainFromId[web3React.chainId]][0])
                        + '&tokenOut=' + (tokenOut.address || tokensPerBlockchain[getBlockchainFromId[web3React.chainId]][0])
                        + '&amountOut=' + swapOut.amount + '&chain=' +
                        getBlockchainFromId[web3React.chainId])
                        .then(r => r.json())
                        .then(r => {
                            setButtonLoading(false)
                            setButtonStatus(needApprove ? 'Approve' : 'Swap')
                            setSwapInfo(r)
                            setSwapIn({ amount: r.amountIn, decided: false })
                        })
                }, 300)

                return () => {
                    clearTimeout(delayDebounceFn)
                }
            }
        }

    }, [swapOut, tokenIn, tokenOut])

    return (
        <Flex w="100%" maxWidth="500px" boxShadow={`1px 2px 12px 3px var(--shadow)`} bg={["var(--bg-governance-box)"]} direction="column" borderRadius="12px" p="30px 30px" >
            <Box mb={["20px", "20px", "30px", "30px"]}>
                <Heading color='var(--text-primary)' mb="10px" fontSize="x-large">Swap aggregator</Heading>
                <Text color='var(--text-primary)'>Buy {tokenOut ? tokenOut.symbol : 'any asset'} at best price from +50 DEX (Supported : BNB Chain & Polygon)</Text>
            </Box>
            {/* @ts-ignore */}
            <Box display="flex" flexDirection="column" align="right" cursor="pointer" bg="var(--swap)" boxShadow={`1px 2px 12px 3px var(--shadow)`} p={["10px 15px"]} borderRadius="12px" onClick={() => {
                inputInRef.current.focus()
            }}>
                <Flex align="center" justify="space-between" mt="20px">
                    <Input ref={inputInRef} onChange={(e) => {
                        setSwapIn({ amount: parseFloat(e.target.value), decided: true })
                    }} value={swapIn.amount} type="number" color='var(--text-primary)' _placeholder={{ color: "none" }} w="60%" border="none" placeholder='0.0' fontSize={["16px", "16px", "18px", "18px"]} />
                    {tokenIn ?
                        <Flex align="center" bg="var(--swap)" borderRadius="10px" p={["5px 5px", "5px 7px", "5px 10px"]}
                            onClick={() => setSelectVisible('tokenIn')}
                        >
                            <Image src={tokenIn.logo} h="20px" />
                            <Text color='var(--text-primary)' ml="10px" fontSize={["14px", "14px", "16px", "16px"]}>{tokenIn.symbol}</Text>
                            <ChevronDown color='var(--text-primary)' />
                        </Flex> :
                        <Flex color='var(--text-primary)' justify="space-between" bg={!activeStatus.includes(buttonStatus) ? "blue" : "grey"} opacity={!activeStatus.includes(buttonStatus) ? "1" : "0.2"} borderRadius="10px" p={["5px 5px", "5px 5px", "5px 15px"]} fontSize="sm" w="200px"
                            onClick={() => setSelectVisible('tokenIn')}>
                            Select a token <ChevronDown />
                        </Flex>
                    }

                </Flex>

                {tokenInBalance !== null ? <Flex color='var(--text-primary)' align="center" ml="auto"><Text mt="5px" fontSize="xs">Balance: {tokenInBalance}</Text> {tokenInBalance > 0 ? <Button m="5px" p="5px 10px" bg="rgba(36, 44, 98, 0.7)" fontSize="small" onClick={() => {
                    setSwapIn({ amount: tokenInBalance, decided: true });
                }} color="white">Max</Button> : <></>}</Flex> : <></>}

            </Box >
            <Box ml="auto" mr="auto" mt="20px" mb="20px"
                cursor='pointer'
                onMouseEnter={() => setArrow(true)}
                onMouseLeave={() => setArrow(false)}
                color='var(--text-primary)'
                onClick={() => {
                    setTokenOut(tokenIn)
                    setTokenIn(tokenOut)
                }}
            >{arrow ? <ArrowUp /> : <ArrowDown />}</Box>
            {/* @ts-ignore */}
            <Box display="flex" flexDirection="column" align="right" cursor="pointer" bg="var(--swap)" boxShadow={`1px 2px 12px 3px var(--shadow)`} p={["10px 15px"]} borderRadius="12px" onClick={() => {
                inputOutRef.current.focus()
            }}>
                <Flex color='var(--text-primary)' align="center" justify="space-between" mt="20px">
                    <Input ref={inputOutRef} onChange={(e) => setSwapOut({ amount: parseFloat(e.target.value), decided: true })} value={swapOut.amount} type="number" w="60%" color="none" _placeholder={{ color: "none" }} border="none" placeholder='0.0' fontSize={["16px", "16px", "18px", "18px"]} />
                    {tokenOut ?
                        <Flex align="center" bg="var(--swap)" borderRadius="10px" p="5px 10px"
                            onClick={() => setSelectVisible('tokenOut')}
                        >
                            <Image src={tokenOut.logo} h="20px" />
                            <Text ml="10px" fontSize={["14px", "14px", "16px", "16px"]}>{tokenOut.symbol}</Text>
                            <ChevronDown />
                        </Flex> :
                        <Flex color='var(--text-primary)' justify="space-between" bg={!activeStatus.includes(buttonStatus) ? "blue" : "grey"} opacity={!activeStatus.includes(buttonStatus) ? "1" : "0.2"} borderRadius="10px" p={["5px 5px", "5px 5px", "5px 15px"]} fontSize="sm" w="200px"
                            onClick={() => setSelectVisible('tokenOut')}
                        >
                            Select a token <ChevronDown />
                        </Flex>}
                </Flex>

                {tokenOutBalance !== null ? <Flex color='var(--text-primary)' align="center" ml="auto"><Text mt="5px" fontSize="xs">Balance: {tokenOutBalance}</Text> {tokenOutBalance > 0 ? <Button m="5px" p="5px 10px" bg="rgba(36, 44, 98, 0.7)" fontSize="small" onClick={() => {
                    setSwapOut({ amount: tokenOutBalance, decided: true });
                }} color="white">Max</Button> : <></>}</Flex> : <></>}
            </Box>

            {pathSymbols ? <Text mt='10px' mr='auto' ml='auto'>{pathSymbols.join(' > ')}</Text> : <></>}

            {swapInfo ? <Text mt='10px' mr='auto' ml='auto'>Best DEX: {swapInfo.routerName}</Text> : <></>}

            <Flex justify="center" mb={["50px", "50px", "50px", "auto"]}>
                <Button
                    color={activeStatus.includes(buttonStatus) ? "white" : "var(--text-primary)"}
                    bg={activeStatus.includes(buttonStatus) ? "blue" : "rgb(169,169,169, 0.3)"} mt={["15px", "15px", "30px", "30px"]} w={["90%", "90%", "90%", "100%"]} py={["8px", "8px", "12px", "12px"]} borderRadius="10px"
                    onClick={async () => {

                        let provider;

                        if (buttonStatus != 'Connect wallet') {
                            provider = new ethers.providers.Web3Provider(web3React.library.provider);
                        }

                        switch (buttonStatus) {
                            case 'Connect wallet':
                                setConnect(true);
                                break;
                            case 'Approve':
                                const contract = new ethers.Contract(tokenIn.address, [
                                    'function approve(address spender, uint256 amount) public'], provider?.getSigner?.())

                                contract.approve(mobulaRouter[web3React.chainId], BigInt('1000000000000000000000000000000000000000000')).then(async (r: any) => {
                                    alert.info('Transaction to approve ' + tokenIn.symbol + ' is pending...')
                                    setButtonLoading(true)
                                    await r.wait()
                                    setButtonLoading(false)
                                    setButtonStatus('Swap')
                                    alert.success('Successfully approved ' + tokenIn.symbol + ' : ready to swap.')
                                }).catch(() => {
                                    alert.error('Something went wrong while trying to allow ' + tokenIn.symbol + '.')
                                })

                                setNeedApprove(false)
                                break;
                            case 'Swap':
                                const router = new ethers.Contract(mobulaRouter[web3React.chainId], [
                                    'function swapExactTokensForTokens(address router, uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external',
                                    'function swapTokensForExactTokens(address router, uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external',
                                    'function swapExactETHForTokens(address router, uint amountOutMin, address[] calldata path, address to, uint deadline) external payable',
                                    'function swapTokensForExactETH(address router, uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external',
                                    'function swapExactTokensForETH(address router, uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external',
                                    'function swapETHForExactTokens(address router, uint amountOut, address[] calldata path, address to, uint deadline) external payable',
                                ], provider?.getSigner?.())

                                if (!swapInfo) {
                                    alert.error('Please input an amount in or out.')
                                } else {
                                    if (swapIn.decided) {
                                        if (tokenIn.address && tokenOut.address) {
                                            router.swapExactTokensForTokens(swapInfo.routerAddress,
                                                (BigInt(Math.round(swapIn.amount * 1000000)) * BigInt('1' + '0'.repeat(swapInfo.decimalTokenA))) / BigInt(1000000),
                                                (BigInt(Math.floor(swapOut.amount * (1000000 - precision))) * BigInt('1' + '0'.repeat(swapInfo.decimalTokenB))) / BigInt(1000000),
                                                swapInfo.path,
                                                web3React.account,
                                                Math.ceil(Date.now() / 1000) + 500
                                            ).then(async (r: any) => {
                                                alert.info('Transaction to buy ' + swapOut.amount + ' ' + tokenOut.symbol + ' is pending...')
                                                setButtonLoading(true)
                                                await r.wait()
                                                setButtonLoading(false)
                                                alert.success('Successfully bought ' + tokenOut.symbol + ' at best price.')
                                            }).catch(() => {
                                                setButtonLoading(false)
                                                alert.error('Transaction failed. Please retry to buy a lower amount of ' + tokenOut.symbol + '.')
                                            })
                                        } else if (tokenOut.address) {
                                            router.swapExactETHForTokens(swapInfo.routerAddress,
                                                (BigInt(Math.floor(swapOut.amount * (1000000 - precision))) * BigInt('1' + '0'.repeat(swapInfo.decimalTokenB))) / BigInt(1000000),
                                                swapInfo.path,
                                                web3React.account,
                                                Math.ceil(Math.ceil(Date.now() / 1000)) + 500, {
                                                value: (BigInt(Math.round(swapIn.amount * 1000000)) * BigInt('1' + '0'.repeat(18))) / BigInt(1000000)
                                            }
                                            ).then(async (r: any) => {
                                                alert.info('Transaction to buy ' + swapOut.amount + ' ' + tokenOut.symbol + ' is pending...')
                                                setButtonLoading(true)
                                                await r.wait()
                                                setButtonLoading(false)
                                                alert.success('Successfully bought ' + tokenOut.symbol + ' at best price.')

                                            }).catch(() => {
                                                setButtonLoading(false)
                                                alert.error('Transaction failed. Please retry to buy a lower amount of ' + tokenOut.symbol + '.')
                                            })
                                        } else {
                                            router.swapExactTokensForETH(swapInfo.routerAddress,
                                                (BigInt(Math.round(swapIn.amount * 1000000)) * BigInt('1' + '0'.repeat(swapInfo.decimalTokenA))) / BigInt(1000000),
                                                (BigInt(Math.floor(swapOut.amount * (1000000 - precision))) * BigInt('1' + '0'.repeat(swapInfo.decimalTokenB))) / BigInt(1000000),
                                                swapInfo.path,
                                                web3React.account,
                                                Math.ceil(Date.now() / 1000) + 500
                                            ).then(async (r: any) => {
                                                alert.info('Transaction to buy ' + swapOut.amount + ' ' + tokenOut.symbol + ' is pending...')
                                                setButtonLoading(true)
                                                await r.wait()
                                                setButtonLoading(false)
                                                alert.success('Successfully bought ' + tokenOut.symbol + ' at best price.')

                                            }).catch(() => {
                                                setButtonLoading(false)
                                                alert.error('Transaction failed. Please retry to buy a lower amount of ' + tokenOut.symbol + '.')
                                            })
                                        }
                                    } else {
                                        if (tokenIn.address && tokenOut.address) {
                                            router.swapTokensForExactTokens(swapInfo.routerAddress,
                                                (BigInt(Math.round(swapOut.amount * 1000000)) * BigInt('1' + '0'.repeat(swapInfo.decimalTokenB))) / BigInt(1000000),
                                                (BigInt(Math.ceil(swapIn.amount * (1000000 + precision))) * BigInt('1' + '0'.repeat(swapInfo.decimalTokenA))) / BigInt(1000000),
                                                swapInfo.path,
                                                web3React.account,
                                                Math.ceil(Date.now() / 1000) + 500
                                            ).then(async (r: any) => {
                                                alert.info('Transaction to buy ' + swapOut.amount + ' ' + tokenOut.symbol + ' is pending...')
                                                setButtonLoading(true)
                                                await r.wait()
                                                setButtonLoading(false)
                                                alert.success('Successfully bought ' + tokenOut.symbol + ' at best price.')

                                            }).catch(() => {
                                                setButtonLoading(false)
                                                alert.error('Transaction failed. Please retry to buy a lower amount of ' + tokenOut.symbol + '.')
                                            })
                                        } else if (tokenOut.address) {
                                            router.swapETHForExactTokens(swapInfo.routerAddress,
                                                (BigInt(Math.round(swapOut.amount * 1000000)) * BigInt('1' + '0'.repeat(swapInfo.decimalTokenB))) / BigInt(1000000),
                                                swapInfo.path,
                                                web3React.account,
                                                Math.ceil(Date.now() / 1000) + 500, {
                                                value: (BigInt(Math.ceil(swapIn.amount * (1000000 + precision))) * BigInt('1' + '0'.repeat(18))) / BigInt(1000000)
                                            }
                                            ).then(async (r: any) => {
                                                alert.info('Transaction to buy ' + swapOut.amount + ' ' + tokenOut.symbol + ' is pending...')
                                                setButtonLoading(true)
                                                await r.wait()
                                                setButtonLoading(false)
                                                alert.success('Successfully bought ' + tokenOut.symbol + ' at best price.')

                                            }).catch(() => {
                                                setButtonLoading(false)
                                                alert.error('Transaction failed. Please retry to buy a lower amount of ' + tokenOut.symbol + '.')
                                            })
                                        } else {
                                            router.swapTokensForExactETH(swapInfo.routerAddress,
                                                (BigInt(Math.round(swapOut.amount * 1000000)) * BigInt('1' + '0'.repeat(swapInfo.decimalTokenB))) / BigInt(1000000),
                                                (BigInt(Math.ceil(swapIn.amount * (1000000 + precision))) * BigInt('1' + '0'.repeat(swapInfo.decimalTokenA))) / BigInt(1000000),
                                                swapInfo.path,
                                                web3React.account,
                                                Math.ceil(Date.now() / 1000) + 500
                                            ).then(async (r: any) => {
                                                alert.info('Transaction to buy ' + swapOut.amount + ' ' + tokenOut.symbol + ' is pending...')
                                                setButtonLoading(true)
                                                await r.wait()
                                                setButtonLoading(false)
                                                alert.success('Successfully bought ' + tokenOut.symbol + ' at best price.')
                                            }).catch(() => {
                                                setButtonLoading(false)
                                                alert.error('Transaction failed. Please retry to buy a lower amount of ' + tokenOut.symbol + '.')
                                            })
                                        }
                                    }
                                }

                                break;
                        }
                    }}
                >
                    {buttonLoading ? <Spinner width='15px' height="15px" mr={15} /> : <></>}   {buttonStatus}
                </Button>
            </Flex>

            {
                connect ?
                    <ConnectWallet visible={connect} setVisible={setConnect} />
                    : <></>

            }

            {
                selectVisible && (
                    <Select visible={selectVisible} setVisible={setSelectVisible}
                        selectToken={selectVisible == 'tokenIn' ? setTokenIn : setTokenOut}
                        oldToken={selectVisible == 'tokenIn' ? tokenOut : tokenIn} />
                )
            }

        </Flex >

    )
}

export default Swap;