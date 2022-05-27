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

function Earn({darkTheme}) {
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
                            {/* <header>
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
                            </header> */}

                            
                        <Flex justify="center" direction={["column","column","column",'row']}>
                            <Flex
                                justifyContent={['space-evenly']}
                                flexDir={['column', 'column', 'column', 'column']}
                                alignItems={['center', 'center', 'center', 'stretch']}
                                paddingTop={['50px','50px','50px','0px',]}
                                maxWidth="1020px"

                                
                            >

                                < Flex
                                    w={['90%', '90%', '90%', 'auto']}
                                    flexDir={'column'}
                                    textAlign='center'
                                >
                                    <Flex mt='20px' w={'100%'} justify={'space-around'} mb={['0px']}  flexWrap='wrap'>
                                        <DayBox darkTheme={darkTheme} day={1} streaks={streaks} account={account} />
                                        <DayBox darkTheme={darkTheme} day={2} streaks={streaks} account={account} />
                                        <DayBox darkTheme={darkTheme} day={3} streaks={streaks} account={account} />
                                        <DayBox darkTheme={darkTheme} day={4} streaks={streaks} account={account} />
                                    </Flex>
                                    <Flex mb={['-30px']} w={'100%'} justify={'space-around'} flexWrap={['wrap', 'wrap', 'wrap', 'nowrap']} borderBottom="1px solid var(--border-color)" >
                                        <DayBox darkTheme={darkTheme} day={5} streaks={streaks} account={account} />
                                        <DayBox darkTheme={darkTheme} day={6} streaks={streaks} account={account} />
                                        <DayBox darkTheme={darkTheme} day={7} streaks={streaks} account={account} />
                                        <DayBox darkTheme={darkTheme} day={8} streaks={streaks} account={account} />
                                    </Flex>

                                </Flex>

                                {/* DAO Faucet */}
                                        <Flex
                                            p='10px'
                                            flexDir={'column'}
                                            bg={darkTheme ? '#a3d4f440' : "none"}
                                            borderRadius='10px'
                                            w={['100%', '90%', '85%', 'auto']}
                                            textAlign={['center', 'center', 'center', 'left']}
                                            mb='30px'
                                            mt={["50px","50px","50px","20px"]}
                                        >
                                            <Flex justify="space-between" align="center">
                                                <Text  className={styles["title-referral"]}>Your reffered <span>3 friends</span></Text>
                                                <Text className={styles["title-referral-mobl"]}>1 Referral : <span>25 MOBL</span></Text>
                                            </Flex>
                                            <Text color="#16C784" fontSize={["16px","16px","20px","20px"]}  fontWeight="500" mt={3} textAlign="start">+ 50 MOBL</Text>
                                            <Flex justify="space-between" align="center" mt={8}>
                                                <Box minWidth={["125px","125px","180px","180px"]} py={2} bg="rgba(252, 252, 252, 0.03)" boxShadow="0px 4px 12px var(--border-color)" borderRadius="10px">
                                                    <Text fontSize="13px" px={3}>Claim MOBL</Text>
                                                </Box>
                                                <Box fontSize="15px">
                                            
                                                        <Text align="right" fontWeight="600" fontSize="15px"><span className={styles["clickCopy"]}>Click to copy <Link className={styles["chain-logo"]}display="inline-block"/></span></Text>
                                                        <Text fontSize="13px" textAlign="end" >https://app.mobula.finance/?ref=0..</Text>
                                 
                                                </Box>
                                            </Flex>

                                            {/* <Box className={styles["floatLeft"]}>
                                                <Box fontSize='15px' mb={5} mr="8px">
                                                    <Text mt={[0,0,-0,-3]} mb={2} color='gray.400' >You referred {referred} friends.</Text>
                                                    <Flex ml={['auto', 'auto', 'auto', '0']} mr={['auto', 'auto', 'auto', '0']} justify='space-between' w={['80%', '80%', '70%', '90%']}>
                                                        <Box bg={(referred >= 1 ? '#32C784' : '#05062A')} w='16%' h='20px' borderRadius='5px' />
                                                        <Box bg={(referred >= 2 ? '#32C784' : '#05062A')} w='16%' h='20px' borderRadius='5px' />
                                                        <Box bg={(referred >= 3 ? '#32C784' : '#05062A')} w='16%' h='20px' borderRadius='5px' />
                                                        <Box bg={(referred >= 4 ? '#32C784' : '#05062A')} w='16%' h='20px' borderRadius='5px' />
                                                        <Box bg={(referred >= 5 ? '#32C784' : '#05062A')} w='16%' h='20px' borderRadius='5px' />
                                                    </Flex>
                                                </Box>
                                                <Box fontSize='15px' mb={5} className={styles["alignCenter"]}>
                                                    <Text mb={2} color='gray.400' >You already claimed</Text>
                                                    <Text fontWeight='800'>{claimed} MOBL</Text>
                                                </Box>
                                                <Box fontSize='15px' mb={5} ml="8px" className={styles["alignCenter"]}>
                                                    <Text mb={2} color='gray.400' >Mobula owes you</Text>
                                                    <Text fontWeight='800'>{owed} MOBL</Text>
                                                </Box>
                                            </Box> */}

                                            <Spacer />
                                <Flex>
                                            <Flex
                                                width='100%'
                                                justifyContent={['space-around', 'space-around', 'space-around', 'space-around']}
                                            >
                                                {/* <button
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

                                                }}><Text mr="5px">Copy Link</Text> {copied ? <CheckCircle width='17px' color='#32C784' /> : <Link width='17px' />}</Button> */}
                                            </Flex>
                                        </Flex>
                                        </Flex></Flex>

                                    <Flex
                                        justifyContent={['left']}
                                        flexDir={['column']}
                                        alignItems={['left']}
                                        paddingTop='40px'
                                        padding='13px'
                                        bg={darkTheme ? '#a3d4f440' : "none"}
                                        w={['100%','100%','90%','48%']}
                                        mr={['auto','auto','auto','0px']}
                                        ml={['auto','auto','auto','25px']}
                                        mt={["10px","20px","40px","65"]}
                                        mb={["60px","60px","60px","auto"]}
                                        borderRadius='10px'
                                        maxWidth="1250px"
                                    >
                                        <Flex justifyContent={['space-between']} w={['100%']} mt="15px" direction={["column", "row", "row", "row"]}>
                                            <h2 className={styles.title} >Daily tasks</h2>
                                            <Flex justify="end">
                                                <Flex justify="space-between" align="center" w={['180px']} height="42px">
                                                    <Box borderRadius="10px" py="5px" boxShadow="0px 4px 12px var(--border-color)">
                                                        <Text fontSize="15px" px={4}>Balance : {balance} MOBL</Text> 
                                                    </Box>
                                                </Flex>
                                                <Button mb={["20px","20px","0px","auto"]} bg="none">
                                                    <Box borderRadius="10px" boxShadow="0px 4px 12px var(--border-color)"  bg="#5C7DF9" py="8px">
                                                        <Text fontSize="15px" color="white" px={12}>CLAIM</Text> 
                                                    </Box>
                                                </Button>
                                            </Flex>
                                        </Flex>
                                        <Flex align='center' py="25px" px="15px" borderTop="1px solid var(--border-color)" borderBottom="1px solid var(--border-color)">
                                            <Flex justify="center" direction="column" align="center" mr="30px">
                                                <Box h="40px" w="40px" bg="grey"   borderRadius="50%"></Box>
                                                <Text fontSize="12px" mt="10px" textAlign="center">Any type</Text>
                                            </Flex>
                                            <Flex>
                                                <Flex fontSize="15px" display="flex" align="center">Join the ____ Airdrop. Claim your token.</Flex>
                                                <Flex align="center" justify="center" bg="#5C7DF9" borderRadius="7px" ml={5} px="8px" py="5px">
                                                    <CheckCircle color="white" />
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        {/* TO REMOVE */}

                                        <Flex align='center' py="25px" px="15px" borderBottom="1px solid var(--border-color)">
                                            <Flex justify="center" direction="column" align="center" mr="30px">
                                                <Box h="40px" w="40px" bg="#16C784"  borderRadius="50%"></Box>
                                                <Text fontSize="12px" mt="10px" color="#16C784" textAlign="center">Any type</Text>
                                            </Flex>
                                            <Flex>
                                                <Flex fontSize="15px" display="flex" align="center">Join the ____ Airdrop. Claim your token.</Flex>
                                                <Flex align="center" justify="center" bg="#5C7DF9" borderRadius="7px" ml={5} px="8px" py="5px">
                                                    <CheckCircle color="white" />
                                                </Flex>
                                            </Flex>
                                        </Flex>

                                        <Flex align='center' py="25px" px="15px"  borderBottom="1px solid var(--border-color)">
                                            <Flex justify="center" direction="column" align="center" mr="30px">
                                                <Box h="40px" w="40px" bg="grey"  borderRadius="50%"></Box>
                                                <Text fontSize="12px" mt="10px" textAlign="center">Any type</Text>
                                            </Flex>
                                            <Flex>
                                                <Flex fontSize="15px" display="flex" align="center">Join the ____ Airdrop. Claim your token.</Flex>
                                                <Flex align="center" justify="center" bg="#5C7DF9" borderRadius="7px" ml={5} px="8px" py="5px">
                                                    <CheckCircle color="white" />
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <Flex align='center' py="25px" px="15px" borderBottom="1px solid var(--border-color)">
                                            <Flex justify="center" direction="column" align="center" mr="30px">
                                                <Box h="40px" w="40px" bg="grey"  borderRadius="50%"></Box>
                                                <Text fontSize="12px" mt="10px" textAlign="center">Any type</Text>
                                            </Flex>
                                            <Flex>
                                                <Flex fontSize="15px" display="flex" align="center" >Join the ____ Airdrop. Claim your token.</Flex>
                                                <Flex align="center" justify="center" bg="#5C7DF9" borderRadius="7px" ml={5} px="8px" py="5px">
                                                    <CheckCircle color="white" />
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <Flex align='center' py="25px" px="15px" borderBottom="1px solid var(--border-color)">
                                            <Flex justify="center" direction="column" align="center" mr="30px">
                                                <Box h="40px" w="40px" bg="grey"  borderRadius="50%"></Box>
                                                <Text fontSize="12px" mt="10px" textAlign="center">Any type</Text>
                                            </Flex>
                                            <Flex>
                                                <Flex fontSize="15px" display="flex" align="center" >Join the ____ Airdrop. Claim your token.</Flex>
                                                <Flex align="center" justify="center" bg="#5C7DF9" borderRadius="7px" ml={5} px="8px" py="5px">
                                                    <CheckCircle color="white" />
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        {/*  */}

                                        {/* <Flex mt='20px' h='30%' justify='center' align='center' >
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
                                        </Flex> */}

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