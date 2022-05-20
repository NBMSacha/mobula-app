import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useAlert } from 'react-alert'
import { ethers } from 'ethers'
import styles from './Earn.module.scss'
import { Text, Heading, Flex, Box, Spacer, Button, Image } from '@chakra-ui/react'
import { PROTOCOL_ADDRESS, VAULT_ADDRESS } from '../../constants'
import {
    ChakraProvider,
    ColorModeProvider,
    useColorMode,
} from '@chakra-ui/react'
import { CSSReset } from '@chakra-ui/react'
import theme from '../../theme/index'
import { Link, CheckCircle } from 'react-feather';
import DayBox from './DayBox'

function Earn() {
    const alert = useAlert()
    const [referred, setReferred] = useState(0)
    const [claimed, setClaimed] = useState(0)
    const [balance, setBalance] = useState(0);
    const [owed, setOwed] = useState(0)
    const [copied, setCopied] = useState(false)
    const [account, setAccount] = useState(null);
    const [streaks, setStreaks] = useState(1);
    const [firstStreak, setFirstStreak] = useState(0);

    var provider: any

    async function initValues() {
        const supabase = createClient(
            "https://ylcxvfbmqzwinymcjlnx.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
        )

        try {
            provider = new ethers.providers.Web3Provider((window as any).ethereum)
            const accounts = await provider.listAccounts()

            if (accounts[0]) {
                setAccount(accounts[0])

                await supabase.from('users').select('claimed,owed,referred,streaks,first_streak,balance').match({ address: accounts[0] }).then(r => {
                    if (r?.data?.[0]) {
                        console.log(r.data[0])
                        setOwed(r.data[0].owed)
                        setClaimed(r.data[0].claimed)
                        setReferred(r.data[0].referred.length)
                        setStreaks(r.data[0].streaks)
                        setFirstStreak(r.data[0].first_streak)
                        setBalance(r.data[0].balance)
                    }
                })
            }

        } catch (e) {
            alert.show('You must connect your wallet to access your Dashboard.')
            console.log(e)
        }
    }

    useEffect(() => {
        initValues()
    }, [])

    return (
        <>
            <div className='listing'>
                <div className='container'>
                    <ChakraProvider theme={theme}>
                        <CSSReset />
                        <ColorModeProvider
                            options={{
                                initialColorMode: 'light',
                                useSystemColorMode: true,
                            }}
                        >
                            <header>
                                <Heading mb={'20px'}>Earn MOBL by using Mobula</Heading>
                                <Text fontSize={['14px', '14px', '16px', '17px']}>
                                    Mobula, like any crypto aggregator, generates profit thanks to ads and retro-commission fees. Mobula redistributes a share of this profit to the users,
                                    and another one to MOBL holders.
                                    <a
                                        className={styles.link}
                                        href='https://docs.mobula.finance/app/dashboard'
                                    >
                                        Learn more here
                                    </a>
                                </Text>
                            </header>

                            <div className={styles.line}></div>
                            <Flex
                                justifyContent={['space-evenly']}
                                flexDir={['column', 'column', 'column', 'row']}
                                alignItems={['center', 'center', 'center', 'stretch']}
                                paddingTop='60px'
                            >

                                < Flex
                                    w={['90%', '90%', '90%', '65%']}
                                    flexDir={'column'}
                                    textAlign='center'
                                >
                                    <Flex mt='20px' w={'100%'} justify={'space-around'} mb={['0px']} flexWrap='wrap'>
                                        <DayBox day={1} streaks={streaks} account={account} />
                                        <DayBox day={2} streaks={streaks} account={account} />
                                        <DayBox day={3} streaks={streaks} account={account} />
                                        <DayBox day={4} streaks={streaks} account={account} />
                                    </Flex>
                                    <Flex mb={['auto']} w={'100%'} justify={'space-around'} flexWrap='wrap'>
                                        <DayBox day={5} streaks={streaks} account={account} />
                                        <DayBox day={6} streaks={streaks} account={account} />
                                        <DayBox day={7} streaks={streaks} account={account} />
                                        <DayBox day={8} streaks={streaks} account={account} />
                                    </Flex>

                                </Flex>

                                {/* DAO Faucet */}
                                <Flex
                                    p='10px'
                                    flexDir={'column'}
                                    bg={'#a3d4f440'}
                                    borderRadius='10px'
                                    w={['90%', '90%', '90%', '30%']}
                                    textAlign={['center', 'center', 'center', 'left']}
                                    mb='30px'
                                >
                                    <h2 className={styles.title}>Referral</h2>

                                    <Box>
                                        <Box fontSize='15px' mb={5}>
                                            <Text mt={-3} mb={2} color='gray.400'>You referred {referred} friends.</Text>
                                            <Flex ml={['auto', 'auto', 'auto', '0']} mr={['auto', 'auto', 'auto', '0']} justify='space-between' w={['80%', '80%', '70%', '90%']}>
                                                <Box bg={(referred >= 1 ? '#32C784' : '#05062A')} w='16%' h='20px' borderRadius='5px' />
                                                <Box bg={(referred >= 2 ? '#32C784' : '#05062A')} w='16%' h='20px' borderRadius='5px' />
                                                <Box bg={(referred >= 3 ? '#32C784' : '#05062A')} w='16%' h='20px' borderRadius='5px' />
                                                <Box bg={(referred >= 4 ? '#32C784' : '#05062A')} w='16%' h='20px' borderRadius='5px' />
                                                <Box bg={(referred >= 5 ? '#32C784' : '#05062A')} w='16%' h='20px' borderRadius='5px' />
                                            </Flex>
                                        </Box>
                                        <Box fontSize='15px' mb={5}>
                                            <Text mb={2} color='gray.400'>You already claimed</Text>
                                            <Text fontWeight='800'>{claimed} MOBL</Text>
                                        </Box>
                                        <Box fontSize='15px' mb={5}>
                                            <Text mb={2} color='gray.400'>Mobula owes you</Text>
                                            <Text fontWeight='800'>{owed} MOBL</Text>
                                        </Box>
                                    </Box>

                                    <Spacer />
                                    <Flex
                                        width='100%'
                                        justifyContent={['space-around', 'space-around', 'space-around', 'space-around']}
                                    >
                                        <button
                                            className='button'
                                            style={{ width: '40%', 'font-size': '0.9rem' } as any}
                                            onClick={async (e) => {
                                                e.preventDefault()

                                                if (account && owed > 0) {
                                                    fetch('https://mobulaspark.com/withdraw?account=' + account)
                                                        .then(r => r.json())
                                                        .then(r => {
                                                            if (r.success) {
                                                                alert.success('Success! You\'ll receive your MOBL in a few minutes.')
                                                            } else {
                                                                alert.show('Something went wrong...')
                                                            }
                                                        })
                                                } else if (account) {
                                                    alert.show('You have nothing to claim.')
                                                } else {
                                                    alert.show('You must connect your wallet.')
                                                }
                                            }}
                                        >
                                            Claim
                                        </button>

                                        <Button width="50% !important" className="button" onClick={() => {

                                            if (account) {
                                                setCopied(true)
                                                navigator.clipboard.writeText('https://app.mobula.finance?ref=' + account)
                                            } else {
                                                alert.show('You must connect your wallet.')
                                            }

                                        }}><Text mr="5px">Copy Link</Text> {copied ? <CheckCircle width='17px' color='#32C784' /> : <Link width='17px' />}</Button>
                                    </Flex>
                                </Flex>
                            </Flex>

                            <Flex
                                justifyContent={['left']}
                                flexDir={['column']}
                                alignItems={['left']}
                                paddingTop='40px'
                                padding='13px'
                                bg={'#a3d4f440'}
                                w={['94%']}
                                h='100px'
                                mr='auto'
                                ml='auto'
                                borderRadius='10px'
                            >
                                <Flex justifyContent={['space-between']} w={['100%']} h='50%'>
                                    <h2 className={styles.title}>Your balance</h2>
                                    <Flex justify="space-around" >
                                        <span>
                                            {balance}
                                        </span>
                                        <Image ml='5px' width='30px' height='30px' src={'/reward1.png'} />

                                    </Flex>
                                </Flex>

                                <Flex mt='20px' h='30%' justify='center' align='center' >
                                    <Flex w='100%' justify='space-around' mr='20px'>
                                        <Box bg={(balance >= 10 ? '#32C784' : '#05062A')} w='7.5%' h='20px' borderRadius='5px' />
                                        <Box bg={(balance >= 20 ? '#32C784' : '#05062A')} w='7.5%' h='20px' borderRadius='5px' />
                                        <Box bg={(balance >= 30 ? '#32C784' : '#05062A')} w='7.5%' h='20px' borderRadius='5px' />
                                        <Box bg={(balance >= 40 ? '#32C784' : '#05062A')} w='7.5%' h='20px' borderRadius='5px' />
                                        <Box bg={(balance >= 50 ? '#32C784' : '#05062A')} w='7.5%' h='20px' borderRadius='5px' />
                                        <Box bg={(balance >= 60 ? '#32C784' : '#05062A')} w='7.5%' h='20px' borderRadius='5px' />
                                        <Box bg={(balance >= 70 ? '#32C784' : '#05062A')} w='7.5%' h='20px' borderRadius='5px' />
                                        <Box bg={(balance >= 80 ? '#32C784' : '#05062A')} w='7.5%' h='20px' borderRadius='5px' />
                                        <Box bg={(balance >= 90 ? '#32C784' : '#05062A')} w='7.5%' h='20px' borderRadius='5px' />
                                        <Box bg={(balance >= 100 ? '#32C784' : '#05062A')} w='7.5%' h='20px' borderRadius='5px' />
                                        <Box bg={(balance >= 150 ? '#32C784' : '#05062A')} w='7.5%' h='20px' borderRadius='5px' />
                                    </Flex>

                                    <Button width="20% !important" h='25px !important' onClick={() => {
                                        alert.show('You do not have enough MOBL to withdraw yet.')
                                    }}><Text mr="5px">Withdraw</Text> </Button>
                                </Flex>

                            </Flex>
                        </ColorModeProvider>
                    </ChakraProvider>
                </div>
            </div >
        </>
    )
}

export default Earn;