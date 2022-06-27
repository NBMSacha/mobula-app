import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useAlert } from 'react-alert'
import { ethers } from 'ethers'
import { Text, Heading, Flex, Box, Spacer, Button, Image, Link, useMediaQuery, useColorModeValue } from '@chakra-ui/react'
import { MOBL_ADDRESS, PROTOCOL_ADDRESS, VAULT_ADDRESS } from '../../../constants'
import { CheckCircle } from 'react-feather';
import { LinkIcon } from "@chakra-ui/icons"
import DayBox from './DayBox'
import { getUrlFromName } from '../../../helpers/formaters'
import { useWeb3React } from '@web3-react/core'

function Earn() {
    const [copied, setCopied] = useState(false)
    const [user, setUser]: [any, Function] = useState({ tasks_done: [], referred: [] });
    const [tasks, setTasks] = useState([])
    const { account, active } = useWeb3React()
    const alert = useAlert();
    const web3React = useWeb3React()

    const claim = () => {

        if (account && user.balance > 0) {

            fetch('https://mobulaspark.com/claim?account=' + account)
                .then(r => r.json())
                .then(r => {

                    if (r.success) {

                        const ethereum = (window as any).ethereum
                        if (ethereum && !localStorage.getItem('added')) {
                            localStorage.setItem('added', 'true')

                            ethereum.request({
                                method: 'wallet_watchAsset',
                                params: {
                                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                                    options: {
                                        address: MOBL_ADDRESS, // The address that the token is at.
                                        symbol: 'MOBL', // A ticker symbol or shorthand, up to 5 chars.
                                        decimals: 18, // The number of decimals in the token
                                        image: 'https://mobula.fi/fullicon.png', // A string url of the token logo
                                    },
                                },
                            });
                        }

                        alert.success('Success! You just received your MOBL in your Polygon wallet.')
                        const bufferUser = { ...user };
                        bufferUser.balance = 0;
                        setUser(bufferUser)
                    } else {
                        alert.show(r.error)
                    }
                })
        } else if (account) {
            alert.show('You have nothing to claim.')
        } else {
            alert.show('You must connect your wallet.')
        }
    }

    const copy = () => {
        if (account) {
            setCopied(true)
            navigator.clipboard.writeText('https://mobula.fi?ref=' + account)
        }
    }

    var provider: any

    async function initValues() {
        const supabase = createClient(
            "https://ylcxvfbmqzwinymcjlnx.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
        )

        supabase.from('earn').select('*').order('created_at', { ascending: false }).then(r => {
            if (r?.data) {
                console.log(r.data)
                setTasks(r.data)
            }
        })

        supabase.from('users').select('*').match({ address: account }).then(r => {
            if (r?.data?.[0]) {
                setUser(r.data[0])
            }
        })
    }

    useEffect(() => {
        if (account) {
            initValues()
        } else if (active === false) {
            const timeout = setTimeout(() => {
                alert.show('You must connect your wallet to earn MOBL.')
            }, 300)
            return clearTimeout(timeout)
        }
    }, [account])

    const [isLessThan11300px] = useMediaQuery('(max-width: 1300px)')

    return (
        <Flex mb="10rem" justify="center" fontFamily="Poppins" direction={["column", "column", "column", 'row']} w="100%" mt="50px">
            <Flex
                justifyContent={['space-evenly']}
                flexDir={['column', 'column', 'column', 'column']}
                alignItems={['center', 'center', 'center', 'stretch']}
                paddingTop={['50px', '50px', '50px', '0px',]}
                marginTop={["-50px", "-50px", "-75px", "-75px"]}
                w={["100%", "100%", "100%", "100%"]}
            >
                {/* MOBILE TITLE */}
                <Flex w="90%" mb="16px" display={["flex", "flex", "flex", "none"]}>
                    <Text fontWeight="bold" textAlign="start" w="85%" m="0px" display={["flex", "flex", "flex", "none"]} mb="10px">Earn</Text>
                    <Flex justify="space-between">
                        <Button fontSize="12px" ml="20px" borderRadius="8px" color="none" h="25px" px="3">Balance : {user.balance || 0} MOBL</Button>

                    </Flex>
                </Flex>

                {/* TOP DAILY EARNING */}
                <Flex w="100%" justify="center" align={["center", "center", "center", ""]} mt={["0px", "0px", "0px", "60px"]} mb={["30px", "30px", "30px", ""]} direction={["column", "column", "column", "row"]} fontFamily="Inter">
                    {/* DAILY BOX */}
                    <Flex w={['95%', '95%', '90%', '45%']} flexDir={'column'} textAlign='center' p={["0px 0px", "0px 0px", "0px 30px", "0px 30px"]}>
                        <Flex w={'100%'} pb={"5px"} justify={'space-around'} mb={['0px']}  >
                            <DayBox day={1} streaks={user.streaks} account={account} user={user} setUser={setUser} />
                            <DayBox day={2} streaks={user.streaks} account={account} user={user} setUser={setUser} />
                            <DayBox day={3} streaks={user.streaks} account={account} user={user} setUser={setUser} />
                            <DayBox day={4} streaks={user.streaks} account={account} user={user} setUser={setUser} />
                        </Flex>
                        <Flex w={'100%'} pb={"5px"} justify={'space-around'} borderBottom="1px solid var(--border-chart)" >
                            <DayBox day={5} streaks={user.streaks} account={account} user={user} setUser={setUser} />
                            <DayBox day={6} streaks={user.streaks} account={account} user={user} setUser={setUser} />
                            <DayBox day={7} streaks={user.streaks} account={account} user={user} setUser={setUser} />
                            <DayBox day={8} streaks={user.streaks} account={account} user={user} setUser={setUser} />
                        </Flex>
                    </Flex>
                    {/* BORDER LINE */}
                    <Box w="2px" h="100%" bg="var(--daily-border)"></Box>
                    {/* BALANCE DESKTOP*/}
                    <Flex display={["none", "none", "none", "flex"]} minWidth="540px" w={['100%', '100%', '90%', isLessThan11300px ? "50%" : "45%"]} direction="column" p={["0px 10px", "0px 30px", "0px 30px", "0px 30px"]}>
                        <Flex direction="column" mb={["", "", "", "60px"]}>
                            <Text mb={["", "", "", "5px"]} fontSize={["18", "18", "21", "21px"]} fontWeight="bold">Balance</Text>
                            <Flex justify="space-between" align="center">
                                <Flex fontSize={["15px", "15px", "17", "20px"]} align="center" >
                                    <Text mr={["5px", "5px", "18px", "18px"]}>Mobula owes you : </Text>
                                    <Flex align="center">
                                        <Image src="icon.png" h="30px" />
                                        <Text w="100px" fontSize="15px" ml={["2px", "2px", "10px", "10px"]}>{user.balance || '0'}  MOBL</Text>
                                    </Flex>
                                </Flex>
                                <Button _focus={{ boxShadow: "none" }} onClick={claim} bg="blue" color="white" w={["80px", "80px", "140px", "140px"]} h={["25px", "25px", "38px", "38px"]} mb={["", "", "", ""]} borderRadius="12px">Claim</Button>
                            </Flex>
                        </Flex>
                        <Flex w="100%" justify="space-between">
                            <Flex direction="column" w='50%'>
                                <Text fontSize={["18", "18", "21", "21px"]} fontWeight="bold" mb={["", "", "", "0px"]} >Referral system</Text>
                                <Text fontSize={["14", "14", "16", "16px"]}>1 Referral : <span style={{ fontWeight: "600" }}>25 MOBL</span></Text>
                                <Text fontSize={["10", "10", "11", "12px"]} mt={["10px", "10px", "10px", "10px"]}>You have currently referred <span style={{ fontWeight: "600" }}>{user.referred ? user.referred.length : 0} people</span></Text>
                            </Flex>
                            <Flex direction="column">
                                <Text fontSize={["13", "13", "13", "14px"]} fontWeight="600" mb={["10px", "10px", "10px", "10px"]}>Affiliation link</Text>
                                <Link onClick={copy} fontSize={["10", "10", "14", "15"]} whiteSpace="nowrap">https://mobula.fi/?ref=0x...</Link>
                                <Button _focus={{ boxShadow: "none" }} onClick={copy} w="fit-content" mt={["10px", "10px", "10px", "10px"]}>
                                    {copied ? <CheckCircle width='17px' color='#32C784' style={{ marginRight: "5px" }} /> : <LinkIcon mr="5px" />}
                                    <Text fontSize={["10px", "10px", "13px", "15px"]} > Click to Copy</Text>
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                    {/* BALANCE MOBILE */}
                    <Flex display={["flex", "flex", "flex", "none"]} w="90%" align="start" py="16px" borderTop={`1px solid #E5E5E5`} borderBottom={`1px solid #E5E5E5`} mt={["20px", "20px", "20px", ""]}>
                        <Flex direction="column" w="50%" align="start">
                            <Text fontSize="16px" color="green">+ {25 * user.referred.length} MOBL</Text>
                            <Text fontSize="13px">You referred {user.referred.length} friends.</Text>
                            <Button _focus={{ boxShadow: "none" }} onClick={claim} color="white" w="120px" boxShadow={`1px 2px 12px 3px var(--shaodw)`} py="6px" borderRadius="8px" mt="10px" fontSize="11px" bg="var(--blue)">Claim MOBL</Button>
                        </Flex>
                        <Flex direction="column" w="50%" align="end" mt="3px">
                            <Text fontSize="13px" mb="15px">1 Referral : <span>25 MOBL</span></Text>
                            <Button _focus={{ boxShadow: "none" }} onClick={copy} fontSize="11px" mb="10px">Click to copy {copied ? <CheckCircle style={{ marginLeft: "3px" }} width='12px' color='#32C784' /> : <LinkIcon width='17px' />}</Button>
                            <Button _focus={{ boxShadow: "none" }} fontSize="11px">http://mobula.fi/?ref=0x....</Button>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w="100%" justify="center" fontFamily="Inter">
                    <Flex w={["95%", "95%", "95%", isLessThan11300px ? "95%" : "85%"]} direction="column" fontFamily="Inter">
                        <Text fontWeight="bold" fontSize={["15px", "15px", "20px", "20px"]} ml={["15px", "15px", "", ""]} mb="30px">Daily Missions</Text>
                        <Flex direction={["column", "column", "column", "row"]} >
                            {/* RIGHT */}
                            <Flex justify={["", "", "", "space-between"]} w={['90%', '90%', '90%', '50%']}>
                                <Flex direction="column" w="100%">
                                    {/* BOX */}
                                    {tasks.map((task) => {
                                        if (!user.tasks_done.includes(task.id)) {
                                            return <Flex align="center" mb="30px">
                                                <Box cursor="pointer" mr={["10px", "10px", "30px", "30px"]} alignItems="center" justifyContent="center" borderRadius="7px" ml={["10px", "10px", "10px", 5]} px="8px" py="5px" className="noneDis">
                                                    <CheckCircle width="22px" />
                                                </Box>
                                                <Text fontSize={["12px", "12px", "14px", "14px"]} >{task.task.split(task.data.name)[0]} <a href={'/asset/' + getUrlFromName(task.data.name)}>{task.data.name}</a> {task.task.split(task.data.name)[1]}<span style={{ color: "var(--chakra-colors-green)", marginLeft: "15px", whiteSpace: "nowrap" }}>+ 15 MOBL</span></Text>
                                            </Flex>
                                        }
                                    })}
                                </Flex>
                            </Flex>
                            <Flex justify={["", "", "", "space-between"]} w={['90%', '90%', '90%', '50%']}>
                                <Flex direction="column" w="100%">
                                    {tasks.map((task, index: number) => {
                                        if (user.tasks_done.includes(task.id)) {
                                            return <Flex align="center" mb="30px">
                                                <Box cursor="pointer" mr={["10px", "10px", "30px", "30px"]} alignItems="center" justifyContent="center" borderRadius="7px" ml={["10px", "10px", "10px", 5]} px="8px" py="5px" className="noneDis">
                                                    <CheckCircle color="var(--chakra-colors-green)" width="22px" />
                                                </Box>
                                                <Flex justify={["start", "start", "start", "space-between"]} w="100%">
                                                    <Text fontSize={["12px", "12px", "14px", "14px"]}>{task.task}</Text>
                                                    <Text ml="10px" fontSize={["12px", "12px", "14px", "14px"]} whiteSpace="nowrap" color="green"> + 15 MOBL</Text>
                                                </Flex>
                                            </Flex>
                                        } else if (!index && !user.tasks_done.length) {
                                            return <Flex align="center" mb="30px">
                                                <Box cursor="pointer" mr={["10px", "10px", "30px", "30px"]} alignItems="center" justifyContent="center" borderRadius="7px" ml={["10px", "10px", "10px", 5]} px="8px" py="5px" className="noneDis">
                                                    <CheckCircle color="var(--chakra-colors-green)" width="22px" />
                                                </Box>
                                                <Flex justify={["start", "start", "start", "space-between"]} w="100%">
                                                    <Text fontSize={["12px", "12px", "14px", "14px"]}>No task completed yet... visit one of those tokens pages to get a task done.</Text>
                                                    <Text ml="10px" fontSize={["12px", "12px", "14px", "14px"]} whiteSpace="nowrap" color="green"> + 0 MOBL</Text>
                                                </Flex>
                                            </Flex>
                                        }
                                    })}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Earn;