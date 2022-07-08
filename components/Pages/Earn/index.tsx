import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useAlert } from 'react-alert'
import { ethers } from 'ethers'
import { Text, Heading, Flex, Box, Spacer, Button, Image, Link, useMediaQuery, useColorModeValue, Icon } from '@chakra-ui/react'
import { MOBL_ADDRESS, PROTOCOL_ADDRESS, VAULT_ADDRESS } from '../../../constants'
import { CheckCircle } from 'react-feather';
import { LinkIcon } from "@chakra-ui/icons"
import DayBox from './DayBox'
import { getUrlFromName } from '../../../helpers/formaters'
import { useWeb3React } from '@web3-react/core'
import { Center, Square, Circle } from '@chakra-ui/react'
import styles from "./Earn.module.scss"

function Earn() {
    const [copied, setCopied] = useState(false)
    const [user, setUser]: [any, Function] = useState({ tasks_done: [], referred: [] });
    const [tasks, setTasks] = useState([])
    const { account, active } = useWeb3React()
    const alert = useAlert();
    const [ onGoing, setOnGoing] = useState(true)
    const [ page, setPage] = useState(1)
    const [ isValidated, setIsValidated ] = useState(false)

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
        console.log('TA MAX DAROONNNE')
        console.log(account, active)
        if (account) {
            initValues()
        } else {
            console.log('TA MAX HHIH')
            const timeout = setTimeout(() => {
                console.log('hi')
                alert.show('You must connect your wallet to earn MOBL.')
            }, 300)
            return () => {
                console.log('ok, somthing weird')
                clearTimeout(timeout)
            }
        }
    }, [account])

    console.log(user)

    return (
        <Flex mb={["50px","50px","10rem","10rem"]} justify="center" fontFamily="Poppins" direction={["column", "column", "column", 'row']} w="100%" mt={["30px","30px","50px","50px"]} maxWidth="1500px" mx="auto"> 
            <Flex
                justifyContent={['space-evenly']}
                flexDir={['column', 'column', 'column', 'column']}
                alignItems={['center', 'center', 'center', 'stretch']}
                paddingTop={['50px', '50px', '50px', '0px',]}
                marginTop={["-50px", "-50px", "-75px", "-75px"]}
                w={["100%", "100%", "100%", "100%"]}
                
            >
                <Flex className={styles["topContainer"]} justify="center" align={["center", "center", "center", ""]} mt={["0px", "0px", "0px", "60px"]} mb={["30px", "30px", "30px", ""]} direction={["column", "column", "column", "row"]} fontFamily="Inter">
                    {/* DAILY BOX */}

                    <Flex w={['95%', '95%', '90%', '50%']} flexDir={'column'} textAlign='center' p={["0px 0px", "0px 0px", "0px 15px", "0px 15px"]}  >
                        <Text fontWeight="bold" fontSize={["15px", "15px", "20px", "20px"]} ml={["15px", "15px", "", ""]} mb={["20px","20px","30px","30px"]} textAlign="start">Earn Daily MOBL</Text>
                        <Flex w="100%" flexDir={'column'} bg="var(--bg-governance-box)" p={["5px 10px","5px 10px","20px 30px","20px 30px"]} borderRadius="12px" boxShadow="1px 2px 13px 3px var(--shadow)">
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
                        
                    </Flex>
                    <Flex w={['95%', '95%', '90%', '50%']} flexDir={'column'} textAlign='center' p={["0px 0px", "0px 0px", "0px 15px", "0px 15px"]} mt={["30px","30px","40px","0px"]} >
                            <Text fontWeight="bold" fontSize={["15px", "15px", "20px", "20px"]} ml={["15px", "15px", "", ""]} mb={["20px","20px","30px","30px"]} textAlign="start">Earn MOBL by referral</Text>
                            <Flex w="100%" flexDir={'column'} bg="var(--bg-governance-box)"  borderRadius="12px" boxShadow="1px 2px 13px 3px var(--shadow)" className={styles["referal"]}>
                                <Flex align="center" justify="space-between" my="8px">
                                    <Text className={styles["referal-font-md"]}>You currently affiliated <Box as="span">{user.referred ? user.referred.length : 0} friends</Box></Text>
                                    <Flex align="center" mt="4px" color="var(--text-grey)"  className={styles["referal-font"]}>Your referral link : <Link ml="5px" onClick={copy}>https://mobula.fi/?ref=0x</Link><Box as="span">{copied ? <Icon as={CheckCircle}  color='#32C784' mt="5px" ml="5px" /> : <></>}</Box></Flex>
                                </Flex>
                                <Flex align="center" my={["10px","10px","20px","30px"]}>
                                    <Flex direction="column" align="center" p={["0px","20px 30px","20px 50px","20px"]} w="50%">
                                        <Box w="100%" >
                                            <Text fontSize={["13px","13px","16px","16px"]} textAlign="start" fontWeight="500" mb={["10px","10px","20px","20px"]}>Mobula owes you</Text>
                                            <Flex align="center"  mb={["15px","15px","25px","25px"]}>
                                                <Image boxSize="20px" src="/fullicon.png" />
                                                <Flex align="center" ml="5px">
                                                    <Text color="blue" mr="10px" fontSize={["13px","13px","16px","16px"]}>{user.balance || '0'}  MOBL</Text>
                                                    <Text opacity="0.4" fontSize={["9px","9px","12px","12px"]}>≈ $97.22</Text>
                                                </Flex>
                                            </Flex>
                                            <Flex align="center" fontSize={["10px","10px","13px","13px"]}>
                                                <Button border={"1px solid var(--box_border_active)"} py={["5px","5px","8px","8px"]} mr={["5px","10px","15px","15px"]} px="20px" w={["65px","65px","85px","85px"]} bg="var(--elections)" color="white" onClick={claim}>Claim</Button>
                                                <Button border={"1px solid var(--box_border)"} py={["5px","5px","8px","8px"]} px="20px" w={["65px","65px","85px","85px"]} bg="var(--box_primary)" >Stake</Button>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                    <Flex direction="column" p={["5px 10px","8px 10px","8px 20px","8px 20px"]} bg="var(--background)" borderRadius="8px" w="50%" h={["124px","150px","150px","150px"]}overflowY="scroll" className={styles["scroll"]} boxShadow="1px 2px 13px 3px var(--shadow)">
                                        {user.referred.length > 0 ? (
                                            <>
                                                {user.referred.map((user) => {
                                                    return <Box mt="5px" borderBottom="1px solid var(--box_border)">
                                                    <Text textAlign="start" mb="5px" fontSize="10px">07/04/2022</Text>
                                                    <Text textAlign="start" mb="10px" fontSize="8px" color="var(--text-grey)" textOverflow="ellipsis" whiteSpace={["normal","normal","normal","nowrap"]} overflow={["visible","visible","visible","hidden"]}>{user.address}</Text>
                                                </Box>
                                                }) }
                                            </>
                                        ) : (
                                            <Flex align="center" w="100%" h="100%" justify="center">
                                                <Text fontSize={["9px","9px","12px","12px"]} color="var(--text-grey)">
                                                    You currently didn’t referred anyone yet.<br/>
                                                    Share your referral<br/>
                                                    link to start to earn MOBL.
                                                </Text>
                                            </Flex>
                                        )}
                                        
                                    </Flex>
                                </Flex>
                            </Flex>
                    </Flex>
                </Flex>
                <Flex direction={["column", "column", "column", "row"]} align="center" justify="center" fontFamily="Inter" mx="auto" className={styles["mainContainer"]}>
                    <Flex w={["95%", "95%", "95%", "50%"]} direction="column" fontFamily="Inter" p={["0px 0px", "0px 0px", "0px 15px", "0px 15px"]} >
                        <Text fontWeight="bold" fontSize={["15px", "15px", "20px", "20px"]} ml={["15px", "15px", "", ""]} mb={["20px","20px","30px","30px"]}>Mobula missions</Text>
                        <Flex direction={["column", "column", "column", "column"]} bg="var(--bg-governance-box)" px="20px" borderRadius="12px"boxShadow="1px 2px 13px 3px var(--shadow)" >
                            {/* RIGHT */}
                            
                                
                                    <Flex p={["20px 0px 0px 0px","20px 0px 0px 0px","20px 30px 0px 30px","20px 30px 0px 30px"]} mb={["10px","10px","20px","20px"]}  fontSize={["11px", "11px", "13px", "13px"]}>
                                        <Button _focus={{ boxShadow: "none" }} py={["5px","5px","8px","8px"]} mr={["10px","10px","20px","20px"]} px="20px" w={["85px","85px","105px","105px"]} color={onGoing ? "white" : "none"} bg={!onGoing ? "var(--box_primary)" : "var(--elections)"} border={onGoing ? "1px solid var(--box_border_active)" : "1px solid var(--box_border)"} onClick={()=>setOnGoing(true)}>Ongoing</Button>
                                        <Button _focus={{ boxShadow: "none" }}  py={["5px","5px","8px","8px"]} px="20px" w={["85px","85px","105px","105px"]} color={!onGoing ? "white" : "none"} bg={onGoing ? "var(--box_primary)" : "var(--elections)"} border={!onGoing ? "1px solid var(--box_border_active)" : "1px solid var(--box_border)"} onClick={()=>setOnGoing(false)}>Participated</Button>
                                    </Flex>
                            {onGoing ? (
                                    <Flex justify={["", "", "", "space-between"]} w={['100%', '100%', '100%', '100%']}  height="323px" overflowY="scroll" className={styles["scroll1"]}  mb={["10px","10px","24px","24px"]} >
                                        <Flex direction="column" w="100%" >
                                            {/* BOX */}
                                            {tasks.map((task, index:number) => {
                                                console.log(user.tasks_done.includes(task.id))
                                                if (!user.tasks_done.includes(task.id)) {
                                                   
                                                    return <Flex align="center"  borderBottom="1px solid var(--box_border)" w={["90%","90%","80%","80%"]} pb="10px" mt="15px" ml={["0px","0px","20px","20px"]} >
                                                    <Box cursor="pointer" mr={["10px", "10px", "10px", "10px"]} alignItems="center" justifyContent="center" borderRadius="7px"  px="8px" py="5px" className="noneDis">
                                                        <Image  w="24px" src="/eye.png"/>
                                                    </Box>
                                                    <Flex justify={["start", "start", "start", "start"]} w="100%" align="center">
                                                        <Text fontSize={["12px", "12px", "13px", "13px"]} mr="15px">{task.task.split(task.data.name)[0]} <a href={'/asset/' + getUrlFromName(task.data.name)}>{task.data.name}</a> {task.task.split(task.data.name)[1]}<span style={{ color: "var(--chakra-colors-green)", marginLeft: "15px", whiteSpace: "nowrap" }}>+ 15 MOBL</span></Text>
                                                        
                                                    </Flex>
                                                </Flex>
                                                } 
                                            })}
                                            {tasks.length == user.tasks_done.length ? (
                                                <>
                                                <Flex align="center"  borderBottom="1px solid var(--box_border)" w={["90%","90%","80%","80%"]} pb="10px" mt="15px" ml={["0px","0px","20px","20px"]} >
                                                    <Box cursor="pointer" mr={["5px", "5px", "10px", "10px"]} alignItems="center" justifyContent="center" borderRadius="7px"  px="8px" py="5px" className="noneDis">
                                                        <Icon as={CheckCircle} color="var(--chakra-colors-green)" boxSize="20px" mt="5px" />
                                                    </Box>
                                                    <Flex justify={["start", "start", "start", "start"]} w="100%" align="center">
                                                        <Text fontSize={["12px", "12px", "13px", "13px"]}>Congratulations ! All missions are done, comeback tomorrow for new tasks</Text>
                                                        
                                                    </Flex>
                                                </Flex>
                                                </>
                                               
                                            ) : (
                                                <></>
                                            )}
                                        </Flex>
                                    </Flex>
                                
                            ) : (
                                <Flex justify={["", "", "", "space-between"]} w={['100%', '100%', '100%', '100%']} >
                                    <Flex direction="column" w="100%" height="323px" overflowY="scroll" className={styles["scroll1"]}  mb={["10px","10px","24px","24px"]}>
                                        {tasks.map((task, index: number) => {
                                            if (user.tasks_done.includes(task.id)) {
                                                return <Flex align="center"  borderBottom="1px solid var(--box_border)" w={["90%","90%","80%","80%"]} pb="10px" mt="15px" ml={["0px","0px","20px","20px"]} mr='10px'>
                                                    <Box cursor="pointer" mr={["10px", "10px", "10px", "10px"]} alignItems="center" justifyContent="center" borderRadius="7px"  px="8px" py="5px" className="noneDis">
                                                        <Image  w="24px" src="/eye.png"/>
                                                    </Box>
                                                    <Flex justify={["start", "start", "start", "start"]} w="100%" align="center">
                                                        <Text fontSize={["12px", "12px", "13px", "13px"]} mr="15px">{task.task}</Text>
                                                        <Icon as={CheckCircle} color="var(--chakra-colors-green)" width={["22px","22px","22px","22px"]} />
                                                    </Flex>
                                                </Flex>
                                            } else if (!index && !user.tasks_done.length) {
                                                return <Flex align="center" borderBottom="1px solid var(--box_border)" w="85%"  pb="10px" mt="15px" ml={["0px","0px","20px","20px"]}>
                                                    <Box cursor="pointer" mr={["10px", "10px", "10px", "10px"]} alignItems="center" justifyContent="center" borderRadius="7px"  px="8px" py="5px" className="noneDis">
                                                        <Image   w="24px" src="/eye.png"/>
                                                    </Box>
                                                    <Flex justify={["start", "start", "start", "start"]} w="100%" align="center">
                                                        <Text fontSize={["12px", "12px", "13px", "13px"]} mr="15px">No task completed yet... visit one of those tokens pages to get a task done.</Text>
                                                        
                                                    </Flex>
                                                </Flex>
                                            }
                                        })}
                                    </Flex>
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                    <Flex w={["95%", "95%", "95%", "50%"]} direction="column" fontFamily="Inter" p={["0px 0px", "0px 0px", "0px 15px", "0px 15px"]} mt={["30px","30px","40px","0px"]}>
                        <Text fontWeight="bold" fontSize={["15px", "15px", "20px", "20px"]} ml={["15px", "15px", "", ""]} mb={["20px","20px","30px","30px"]}>Mobula adventure</Text>
                        <Flex direction={["column", "column", "column", "column"]} bg="var(--bg-governance-box)" px="20px" pb={["10px","10px","30px","30px"]} borderRadius="12px" boxShadow="1px 2px 13px 3px var(--shadow)">
                            <Flex align="end" justify="space-between" className={styles["adventure-pad"]} mt="5px" mb="5px">
                                <Flex className={styles["font-adventure"]}>
                                    <Text color="blue" mr="10px">Introducing Mobula {">>"}</Text>
                                    <Text mr="10px">Beginner</Text>
                                    <Text>Expert</Text>
                                </Flex>
                                <Flex className={styles["font-adventure-sm"]} display={["none", "flex","flex","flex"]}>
                                    <Text fontWeight="400">How it works ?</Text>
                                    <Link>
                                        <Text ml="5px" fontWeight="600">Read here.</Text>
                                    </Link>
                                </Flex>
                            </Flex>
                            <Flex direction={["column", "column","column","row"]}>      
                                <Flex w={["100%","100%","100%","55%"]} p="30px" borderRadius="12px" border="1px solid var(--box_border)">
                                    <Image w={["100%","70%","70%","100%"]} mx="auto" src="/puzzle.png"/>
                                </Flex>
                                <Flex direction="column" mx="auto" w={["100%","100%","100%","45%"]} p={["0px","0px","0px"," 0px 0px 0px 20px"]} mt={["10px", "10px", "10px", "0px"]} borderRadius="12px" >
                                    <Box p="15px" border={["none", "none","none","1px solid var(--box_border)"]} borderRadius="12px">
                                        <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" fontSize="15px" mb="5px" mt="5px" mx={["auto","auto","auto","auto"]}  w={["80%","80%","80%","100%"]} textAlign={["center","center","center","start"]} mb={["15px", "15px", "15px", "0px"]}>{page}/7. <Box as="span" color={isValidated ? "green" : "blue"} fontWeight="600"> CONNECT A WALLET</Box></Text>
                                        <Text px="5px" mx={["auto","auto","auto","auto"]} fontSize="12px" color="var(--text-grey)" w={["85%","85%","80%","100%"]} textAlign={["center","center","center","start"]} maxHeight={["180px","180px","180px","130px"]} overflowY="scroll" className={`${styles["scroll"]} ${styles["description-adventure"]}`} wordBreak="break-all">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
                                        <Flex w='100%' justify="center" mt="8px">
                                            <Button fontSize="13px"  _focus={{ boxShadow: "none" }} py="5px" mt="10px" px="20px" w="100px" color={"white"} bg={isValidated ? "green" : "var(--elections)"} border={isValidated ? "1px solid var(--green)" : "1px solid var(--box_border_active)"} onClick={()=>setIsValidated(!isValidated)}>{isValidated ? "Validated" : "Submit"}</Button>
                                        </Flex>
                                        <Flex align="center" justify="center" mt="15px" mx="auto">
                                            <Circle onClick={()=>setPage(1)} bg={page === 1 ? "blue" : "#2F354D"} size="8px" mx="2px"></Circle>
                                            <Circle onClick={()=>setPage(2)} bg={page === 2 ? "blue" : "#2F354D"} size="8px" mx="2px"></Circle>
                                            <Circle onClick={()=>setPage(3)} bg={page === 3 ? "blue" : "#2F354D"} size="8px" mx="2px"></Circle>
                                            <Circle onClick={()=>setPage(4)} bg={page === 4 ? "blue" : "#2F354D"} size="8px" mx="2px"></Circle>
                                            <Circle onClick={()=>setPage(5)} bg={page === 5 ? "blue" : "#2F354D"} size="8px" mx="2px"></Circle>
                                            <Circle onClick={()=>setPage(6)} bg={page === 6 ? "blue" : "#2F354D"} size="8px" mx="2px"></Circle>
                                            <Circle onClick={()=>setPage(7)} bg={page === 7 ? "blue" : "#2F354D"} size="8px" mx="2px"></Circle>
                                        </Flex>
                                    </Box>  
                                    <Button display={["none","none", "flex", "flex"]} fontSize="14px" mt="10px" borderRadius="8px" _focus={{ boxShadow: "none" }} py="10px" px="20px" w="100%" color={"white"} bg={"var(--elections)"} border={"1px solid var(--box_border_active)"}>Generate your NFT</Button>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Button display={["flex", "flex", "none", "none"]} fontSize="14px" mt="20px" borderRadius="8px" _focus={{ boxShadow: "none" }} py="10px" px="20px" w="100%" color={"white"} bg={"var(--elections)"} border={"1px solid var(--box_border_active)"}>Generate your NFT</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Earn;