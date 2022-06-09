import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useAlert } from 'react-alert'
import { ethers } from 'ethers'
import styles from './Earn.module.scss'
import { Text, Heading, Flex, Box, Spacer, Button, Image, Link, useMediaQuery, useColorModeValue } from '@chakra-ui/react'
import { PROTOCOL_ADDRESS, VAULT_ADDRESS } from '../../../constants'
import {
    ChakraProvider,
    ColorModeProvider,
    useColorMode,
} from '@chakra-ui/react'
import { CSSReset } from '@chakra-ui/react'
import { CheckCircle } from 'react-feather';
import { LinkIcon } from "@chakra-ui/icons"
import DayBox from './DayBox'
import { getUrlFromName } from '../../../helpers/formaters'

function Earn() {
    const [copied, setCopied] = useState(false)
    const [user, setUser]: [any, Function] = useState({ tasks_done: [], referred: [] });
    const [tasks, setTasks] = useState([])
    const [account, setAccount] = useState('');
    const alert = useAlert();


    const claim = () => {
        if (account && user.balance > 0) {
            fetch('https://mobulaspark.com/claim?account=' + account)
                .then(r => r.json())
                .then(r => {
                    if (r.success) {
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
        } else {
            alert.show('You must connect your wallet.')
        }
    }

    var provider: any

    async function initValues() {
        const supabase = createClient(
            "https://ylcxvfbmqzwinymcjlnx.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
        )

        supabase.from('earn').select('*').order('created_at', { ascending: false }).then(r => {
            console.log('YOOOO')
            console.log(r)
            if (r?.data) {
                console.log(r.data)
                setTasks(r.data)
            }
        })

        try {
            provider = new ethers.providers.Web3Provider((window as any).ethereum)
            const accounts = await provider.listAccounts()

            if (accounts[0]) {
                setAccount(accounts[0])

                supabase.from('users').select('*').match({ address: accounts[0] }).then(r => {
                    if (r?.data?.[0]) {
                        console.log(r.data[0])
                        setUser(r.data[0])
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

    const [isLessThan11300px] = useMediaQuery('(max-width: 1300px)')
    const input = useColorModeValue("white_secondary_input", "dark_input")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bg = useColorModeValue("white_voting", "dark_box_list")
    const bgSecondary = useColorModeValue("white_voting", "none")

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
                        <Button fontSize="12px" ml="20px" borderRadius="8px" bg={bg} boxShadow={`1px 2px 12px 3px ${shadow}`} color="none" h="25px" px="3">Balance : {user.balance || 0} MOBL</Button>
                        <Button onClick={claim} fontSize="12px" ml="20px" borderRadius="8px" bg="blue" color="white" h="25px" px="5">Claim</Button>
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
                    <Box w="2px" h="100%" bg="rgba(40, 44, 58, 0.5)"></Box>
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
                                <Button onClick={claim} bg="blue" color="white" w={["80px", "80px", "140px", "140px"]} h={["25px", "25px", "38px", "38px"]} mb={["", "", "", ""]} borderRadius="12px">Claim</Button>
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
                                <Button onClick={copy} w="fit-content" mt={["10px", "10px", "10px", "10px"]}>
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
                            <Button onClick={claim} w="120px" boxShadow={`1px 2px 12px 3px ${shadow}`} py="6px" borderRadius="8px" mt="10px" fontSize="11px" bg={bg}>Claim MOBL</Button>
                        </Flex>
                        <Flex direction="column" w="50%" align="end" mt="3px">
                            <Text fontSize="13px" mb="15px">1 Referral : <span>25 MOBL</span></Text>
                            <Button onClick={copy} fontSize="11px" mb="10px">Click to copy {copied ? <CheckCircle style={{ marginLeft: "3px" }} width='12px' color='#32C784' /> : <LinkIcon width='17px' />}</Button>
                            <Button fontSize="11px">http://mobula.fi/?ref=0x....</Button>
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
                                                <Box cursor="pointer" mr={["10px", "10px", "30px", "30px"]} alignItems="center" justifyContent="center" bg={bgSecondary} boxShadow={`1px 2px 12px 3px ${shadow}`} borderRadius="7px" ml={["10px", "10px", "10px", 5]} px="8px" py="5px" className="noneDis">
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
                                                <Box cursor="pointer" mr={["10px", "10px", "30px", "30px"]} alignItems="center" justifyContent="center" bg={bgSecondary} boxShadow={`1px 2px 12px 3px ${shadow}`} borderRadius="7px" ml={["10px", "10px", "10px", 5]} px="8px" py="5px" className="noneDis">
                                                    <CheckCircle color="var(--chakra-colors-green)" width="22px" />
                                                </Box>
                                                <Flex justify={["start", "start", "start", "space-between"]} w="100%">
                                                    <Text fontSize={["12px", "12px", "14px", "14px"]}>{task.task}</Text>
                                                    <Text ml="10px" fontSize={["12px", "12px", "14px", "14px"]} whiteSpace="nowrap" color="green"> + 15 MOBL</Text>
                                                </Flex>
                                            </Flex>
                                        } else if (!index && !user.tasks_done.length) {
                                            return <Flex align="center" mb="30px">
                                                <Box cursor="pointer" mr={["10px", "10px", "30px", "30px"]} alignItems="center" justifyContent="center" bg={bgSecondary} boxShadow={`1px 2px 12px 3px ${shadow}`} borderRadius="7px" ml={["10px", "10px", "10px", 5]} px="8px" py="5px" className="noneDis">
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
                {/* DAO Faucet */}
                {/* <Flex
                                    position="relative"
                                    p='10px'
                                    flexDir={'column'}
                                    bg={darkTheme ? 'none' : "none"}
                                    borderRadius={['0px', '0px', '10px', "10px"]}
                                    w={['95%', '90%', '85%', 'auto']}
                                    textAlign={['center', 'center', 'center', 'left']}
                                    mb={['0px', '0px', '30px', '30px']}
                                    pb={['18px', '18px', '0px', '0px']}
                                    px={[3, 3, 0, 0]}
                                    mt={["68px", "68px", "50px", "-25px"]}
                                    borderBottom={["1px solid var(--border-color)", "1px solid var(--border-color)", "none", "none"]}
                                >
                                    <Flex justify="space-between" align="center">
                                        <Text className={styles["title-referral"]}>You reffered <span>0 friends</span></Text>
                                        <Text className={styles["title-referral-mobl"]}>1 Referral : <span>25 MOBL</span></Text>
                                    </Flex>
                                    <Text color="#16C784" fontSize={["16px", "16px", "18px", "18px"]} className={styles["plus"]} fontWeight="500" mt={[1, 1, 3, 3]} textAlign="start">+ 0 MOBL</Text>
                                    <Flex justify="space-between" align="center" mt={[0, 0, 8, 8]}>
                                        <Box minWidth={["100px", "100px", "120px", "120px"]} py={4} px={2} className={styles["claim-mobl"]} boxShadow="0px 4px 12px var(--border-color)" borderRadius="10px">
                                            <Text fontSize={["13px", "13px", "15px", "15px"]} px={3} color={["var(--text-color)", "var(--text-color)", "white", "white"]} cursor="pointer" onClick={showSoon}>Claim MOBL</Text>
                                        </Box>
                                        <Box fontSize="15px">
                                            <Text cursor="pointer" align="right" fontWeight="600" fontSize={[, "13px", "13px", "15px", "15px"]} mb="12px"><a className={styles["clickCopy"]} onClick={showSoon}>Click to copy <Link className={styles["chain-logo"]} display="inline-block" /></a></Text>
                                            <Text fontSize={["10px", "10px", "13px", "13px"]} textAlign="end" color="var(--text-referal)">http://app.mobula.finance/ref?0x..</Text>
                                        </Box>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex
                                justifyContent={['left']}
                                flexDir={['column']}
                                alignItems={['left']}
                                paddingTop='40px'
                                padding='13px'
                                bg={darkTheme ? 'none' : "none"}
                                w={['100%', '90%', '90%', '48%']}
                                mr={['auto', 'auto', 'auto', '0px']}
                                ml={['auto', 'auto', 'auto', '25px']}
                                mt={["0px", "00px", "-10px", "15px"]}
                                mb={["60px", "60px", "60px", "auto"]}
                                borderRadius='10px'
                            >
                                <Flex justifyContent={['space-between']} w={['100%']} mt="15px" direction={["column", "row", "row", "row"]}>
                                    <Text fontSize={["14px", "14px", "20px", "20px"]} fontFamily="Poppins" className={styles.title} mb={[0, 0, 10, 10]} >Daily tasks</Text>
                                    <Flex justify="end" className={styles["balance-abslt"]}>
                                        <Flex justify="end" align="center" w={['140px', '160px', '180px', '180px']} height="42px">
                                            <Box borderRadius="12px" py={["8px", "8px", "6px", "6px"]} bg="var(--bg-list-balance)" boxShadow={darkTheme ? "none" : "0px 4px 12px var(--border-chart)"}>
                                                <Text fontSize={["12px", "12px", "15px", "15px"]} px={4}>Balance : {balance} MOBL</Text>
                                            </Box>
                                        </Flex>
                                        <Flex justify="end" align="center" w={['140px', '160px', '131px', '131px']} height="42px">
                                            <Button onClick={showSoon} borderRadius="12px" boxShadow="0px 4px 12px var(--border-chart)" px={12} bg="#5C7DF9" className={styles["claim-btn"]}>
                                                <Text fontSize={["12px", "12px", "15px", "15px"]} color="white">Claim</Text>
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex align='center' py="25px" px="15px" borderTop={["none", "none", "1px solid var(--border-chart)", "1px solid var(--border-chart)"]} borderBottom="1px solid var(--border-chart)">
                                    <Flex justify="center" direction="column" align="center" mr="30px">
                                        <Box h={["25px", "25px", "40px", "40px"]} w={["25px", "25px", "40px", "40px"]} bg="grey" borderRadius="50%"></Box>
                                        <Text fontSize={["10px", "10px", "13px", "13px"]} mt="10px" textAlign="center">Visit</Text>
                                    </Flex>
                                    <Flex>
                                        <Flex fontSize={["13px", "13px", "15px", "15px"]} display="flex" align="center">Visit StaySAFU token page</Flex>
                                        <Box onClick={showSoon} cursor="pointer" display={["none", "none", "flex", "flex"]} alignItems="center" justifyContent="center" bg="#5C7DF9" borderRadius="7px" ml={5} px="8px" py="5px" className="noneDis">
                                            <CheckCircle color="white" />
                                        </Box>
                                    </Flex>
                                </Flex>
                                {/* TO REMOVE */}

                {/* <Flex align='center' py="25px" px="15px" borderBottom="1px solid var(--border-chart)">
                                    <Flex justify="center" direction="column" align="center" mr="30px">
                                        <Box onClick={showSoon} cursor="pointer" h={["25px", "25px", "40px", "40px"]} w={["25px", "25px", "40px", "40px"]} bg={false ? "#16C784" : "grey"} borderRadius="50%"></Box>
                                        <Text fontSize={["10px", "10px", "13px", "13px"]} mt="10px" color={false ? "#16C784" : ""} textAlign="center">Vote</Text>
                                    </Flex>
                                    <Flex>
                                        <Flex fontSize={["13px", "13px", "15px", "15px"]} display="flex" align="center">Vote for a token in the DAO</Flex>
                                        <Box onClick={showSoon} cursor="pointer" display={["none", "none", "flex", "flex"]} alignItems="center" justifyContent="center" bg="#5C7DF9" borderRadius="7px" ml={5} px="8px" py="5px" className="noneDis">
                                            <CheckCircle color="white" />
                                        </Box>
                                    </Flex>
                                </Flex>

                                <Flex align='center' py="25px" px="15px" borderBottom="1px solid var(--border-chart)">
                                    <Flex justify="center" direction="column" align="center" mr="30px">
                                        <Box h={["25px", "25px", "40px", "40px"]} w={["25px", "25px", "40px", "40px"]} bg="grey" borderRadius="50%"></Box>
                                        <Text fontSize={["10px", "10px", "13px", "13px"]} mt="10px" textAlign="center">Visit</Text>
                                    </Flex>
                                    <Flex>
                                        <Flex fontSize={["13px", "13px", "15px", "15px"]} display="flex" align="center">Visit Polygen token page</Flex>
                                        <Box onClick={showSoon} cursor="pointer" display={["none", "none", "flex", "flex"]} alignItems="center" justifyContent="center" bg="#5C7DF9" borderRadius="7px" ml={5} px="8px" py="5px" className="noneDis">
                                            <CheckCircle color="white" />
                                        </Box>
                                    </Flex>
                                </Flex>
                                <Flex align='center' py="25px" px="15px" borderBottom="1px solid var(--border-chart)">
                                    <Flex justify="center" direction="column" align="center" mr="30px">
                                        <Box h={["25px", "25px", "40px", "40px"]} w={["25px", "25px", "40px", "40px"]} bg="grey" borderRadius="50%"></Box>
                                        <Text fontSize={["10px", "10px", "13px", "13px"]} mt="10px" textAlign="center">Airdrop</Text>
                                    </Flex>
                                    <Flex>
                                        <Flex fontSize={["13px", "13px", "15px", "15px"]} display="flex" align="center" >Join the Mobula Airdrop. Claim your token (coming soon)</Flex>
                                        <Box onClick={showSoon} cursor="pointer" display={["none", "none", "flex", "flex"]} alignItems="center" justifyContent="center" bg="#5C7DF9" borderRadius="7px" ml={5} px="8px" py="5px" className="noneDis">
                                            <CheckCircle color="white" />
                                        </Box>
                                    </Flex>
                                </Flex> */}
            </Flex>
        </Flex>
    )
}

export default Earn;