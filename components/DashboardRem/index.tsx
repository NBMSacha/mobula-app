import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { ethers } from 'ethers'
import styles from './dashboardRem.module.scss'
import { Text, Heading, Flex, Box, Spacer } from '@chakra-ui/react'
import { PROTOCOL_ADDRESS, VAULT_ADDRESS } from '../../constants'
import {
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
} from '@chakra-ui/react'
import { CSSReset } from '@chakra-ui/react'
import theme from '../../theme/index'
import { createClient } from '@supabase/supabase-js'

function DashboardRem() {
  const alert = useAlert()
  const [firstTokensOwed, setFirstTokensOwed] = useState(0)
  const [finalTokensOwed, setFinalTokensOwed] = useState(0)
  const [firstGoodChoice, setFirstGoodChoice] = useState(0)
  const [firstBadChoice, setFirstBadChoice] = useState(0)
  const [finalGoodChoice, setFinalGoodChoice] = useState(0)
  const [finalBadChoice, setFinalBadChoice] = useState(0)
  const [countdownValue, setCountdown] = useState('You can claim now')
  const [claimed, setClaimed] = useState(0)
  const [mobile, setMobile] = useState({})
  const [recentlyAdded, setRecentlyAdded] = useState([])

  useEffect(() => {

    setMobile(window.matchMedia("(max-width: 768px)").matches);
  }, [mobile])


  var provider: any
  var account: string

  function countdown(created: number) {
    let date = new Date(created)
    let seconds = date.getTime()
    let postedDate = Math.round(seconds + 7 * 24 * 60 * 60 - Date.now() / 1000)

    console.log(postedDate)

    if (postedDate < 60) {
      return Math.round(postedDate) + ' seconds'
    } else if (60 <= postedDate && postedDate < 120) {
      return '1 minute'
    } else if (120 <= postedDate && postedDate < 3600) {
      return Math.round(postedDate / 60) + ' minutes'
    } else if (3600 <= postedDate && postedDate < 7200) {
      return '1 hour'
    } else if (7200 <= postedDate && postedDate < 86400) {
      return Math.round(postedDate / 3600) + ' hours'
    } else if (86400 <= postedDate && postedDate < 172800) {
      return '1 day'
    } else if (172800 <= postedDate) {
      return Math.round(postedDate / 86400) + ' days'
    }
  }

  async function initValues() {
    try {
      provider = new ethers.providers.Web3Provider((window as any).ethereum)
      const accounts = await provider.listAccounts()
      account = accounts[0]

      const protocolContract = new ethers.Contract(
        PROTOCOL_ADDRESS,
        [
          'function paidFirstVotes(address voter) external view returns(uint256)',
          'function goodFirstVotes(address voter) external view returns(uint256)',
          'function badFirstVotes(address voter) external view returns(uint256)',
          'function paidFinalVotes(address voter) external view returns(uint256)',
          'function goodFinalVotes(address voter) external view returns(uint256)',
          'function badFinalVotes(address voter) external view returns(uint256)',
          'function tokensPerVote() external view returns(uint256)',
        ],
        provider
      )
      const tokensPerVote = parseInt(
        ethers.utils.formatEther(await protocolContract.tokensPerVote())
      )
      const firstPaidVotes = (
        await protocolContract.paidFirstVotes(account)
      ).toNumber()
      const firstGoodVotes = (
        await protocolContract.goodFirstVotes(account)
      ).toNumber()
      const firstBadVotes = (
        await protocolContract.badFirstVotes(account)
      ).toNumber()
      const finalPaidVotes = (
        await protocolContract.paidFinalVotes(account)
      ).toNumber()
      const finalGoodVotes = (
        await protocolContract.goodFinalVotes(account)
      ).toNumber()
      const finalBadVotes = (
        await protocolContract.badFinalVotes(account)
      ).toNumber()
      setFirstTokensOwed((firstGoodVotes - firstPaidVotes) * tokensPerVote)
      setFinalTokensOwed((finalGoodVotes - finalPaidVotes) * tokensPerVote)
      setFirstGoodChoice(firstGoodVotes)
      setFirstBadChoice(firstBadVotes)
      setFinalGoodChoice(finalGoodVotes)
      setFinalBadChoice(finalBadVotes)

      const vaultContract = new ethers.Contract(
        VAULT_ADDRESS,
        [
          'function lastClaim(address member) external view returns(uint256)',
          'function totalClaim(address member) external view returns(uint256)',
        ],
        provider
      )

      const lastClaim = (await vaultContract.lastClaim(account)).toNumber()
      const totalClaim = (await vaultContract.totalClaim(account)).toNumber()

      setClaimed(totalClaim)
      //console.log(lastClaim);

      console.log(lastClaim)

      console.log(Date.now())

      if (lastClaim == 0 || lastClaim + 7 * 24 * 60 * 60 <= Date.now() / 1000) {
        setCountdown('You can claim now')
      } else {
        setCountdown(countdown(lastClaim))
      }
    } catch (e) {
      alert.show('You must connect your wallet to access your Dashboard.')
      console.log(e)
    }

    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )

    supabase
      .from('assets')
      .select('name,symbol,logo,created_at')
      .order('created_at', { ascending: false })
      .limit(5)
      .then(r => {
        setRecentlyAdded(r.data)
      })
  }

  useEffect(() => {
    initValues()
  }, [])

  return (
    <>
      <div className='listing'>
        <Box w="100%" className=''>
          <ChakraProvider theme={theme}>
            <CSSReset />
            <ColorModeProvider
              options={{
                initialColorMode: 'light',
                useSystemColorMode: true,
              }}
            >

              <Flex w="100%" p="0px 5%" mt="30px" className={styles["shinda"]}>
                <Text>DAO Dashboard</Text>
              </Flex>
              {/* <div className={styles.line}></div> */}
              <Flex
                justifyContent={['space-evenly']}
                flexDir={['column-reverse', 'column-reverse', 'row', 'row']}
                alignItems={['center', 'center', 'center', 'stretch']}
                paddingTop='60px'
                className={styles["blitz"]}
                m="auto"
                position="relative"
                mt="-40px"

              >

                {/* RANK DISPLAY MOBILE */}

                {mobile ? (

                  <Flex w="95%" direction="column" boxShadow="0px 1px 12px 3px var(--shadow-color)" borderRadius="10px" p="5px" align={['center', 'center', 'center', 'space-between']} mt={["10px", "10px", "0px", "0px",]}>

                    {/* Rank I Stats */}
                    <Flex w={['95%', '90%', '90%', '90%']} justify="space-evenly" direction={[, "column", "row", "row"]} >
                      <Flex
                        direction={["row", "row", "column", "column"]}
                        justify={["start", "start", "center", "center"]}
                        p={['0px', '14px 14px 14px 14px', '34px 34px 34px 34px', '34px 34px 34px 34px']}
                        bg={["none", "none", '#191D2C', '#191D2C']}
                        borderRadius='0px'
                        borderBottom="1px solid var(--border-top-body)"
                        w={['100%', '100%', '90%', '48%']}
                        textAlign={['center', 'center', 'center', 'left']}
                        mb={[7, 7, 7, 0]}
                        position="relative"
                        align="center"
                      >
                        <Flex direction={["column", "column", "row", "row"]} w="50%" >
                          <Text textAlign="start" fontSize="14px" mb={2}>
                            Rank I <span className={styles['stats']}>Stats</span>
                          </Text>
                          <Flex direction="row" fontSize='15px' align="center" justify="start" mb={[0, 0, 5, 5]} w="100%" position="relative">
                            <Text color={["#16C784", "#16C784", "#16C784", "#16C784"]} mb={2} whiteSpace="nowrap" fontSize="16px">Correct Decisions</Text>
                            <Flex align="center" justify="center" fontWeight='800' mb={2} bg={["none", "none", "#202433", "#202433"]} borderRadius="15px" w={["30px", "30px", "90px", "90px"]}> {firstGoodChoice}</Flex>
                          </Flex>
                          <Flex direction="row" fontSize='15px' align="center" justify={["start", "start", "start", "start"]} mb={[0, 0, 5, 5]} w="100%" position="relative" >
                            <Text color={["#4C4C4C", "#4C4C4C", "#FF0000", "#FF0000"]} mb={2} whiteSpace="nowrap" fontSize="16px">Wrong Decisions</Text>
                            <Flex align="center" justify="center" fontWeight='800' mb={2} bg={["none", "none", "#202433", "#202433"]} mt={["0px", "0px", "15px", "15px"]} borderRadius="15px" w={["30px", "30px", "90px", "90px"]}> {firstBadChoice}</Flex>
                          </Flex>
                          <Box h="1px" w="90%" bg="rgba(229, 229, 229, 0.1)" mt={2} mb={3}></Box>
                          <Text textAlign="start" fontSize="14px" mb={2}>
                            Rank II <span className={styles['stats']}>Stats</span>
                          </Text>
                          <Flex direction="row" fontSize='15px' align="center" justify={["start", "start", "start", "start"]} mb={[0, 0, 5, 5]} w="100%" position="relative">
                            <Text color={["#16C784", "#16C784", "#16C784", "#16C784"]} mb={2} whiteSpace="nowrap" fontSize="16px">Correct Decisions</Text>
                            <Flex align="center" justify="center" fontWeight='800' mb={2} bg={["none", "none", "#202433", "#202433"]} mt={["0px", "0px", "15px", "15px"]} borderRadius="15px" w={["30px", "30px", "90px", "90px"]}> {finalGoodChoice}</Flex>
                          </Flex>
                          <Flex direction="row" fontSize='15px' align="center" justify={["start", "start", "start", "start"]} mb={[0, 0, 5, 5]} w="100%" position="relative">
                            <Text color={["#4C4C4C", "#4C4C4C", "#FF0000", "#FF0000"]} whiteSpace="nowrap" mb={2}>Wrong Decisions</Text>
                            <Flex align="center" justify="center" fontWeight='800' mb={2} bg={["none", "none", "#202433", "#202433"]} mt={["0px", "0px", "15px", "15px"]} borderRadius="15px" w={["30px", "30px", "90px", "90px"]}> {finalBadChoice}</Flex>
                          </Flex>
                        </Flex>
                        <Flex
                          width={["50%", "50%", '100%', '100%']}
                          justify="center"
                          align="center"
                          direction="column"
                          className={styles["buttons-claim-box"]}
                        >
                          {' '}
                          <button
                            className={styles["buttons-claim"]}
                            style={{ width: "90%", 'font-size': '1rem' } as any}
                            onClick={async (e) => {
                              e.preventDefault()
                              try {
                                var provider = new ethers.providers.Web3Provider(
                                  (window as any).ethereum
                                )
                                var signer = provider.getSigner()
                              } catch (e) {
                                alert.show(
                                  'You must connect your wallet to access the Dashboard.'
                                )
                              }
                              try {
                                const value = await new ethers.Contract(
                                  PROTOCOL_ADDRESS,
                                  ['function claimRewards() external'],
                                  signer
                                ).claimRewards()
                              } catch (e) {
                                alert.show("You don't have anything to claim.")
                                console.log(e)
                              }
                            }}
                          >       <Flex justify="center" align="center">
                              <Text ml="15px">Claim MOBL</Text>
                              <img src="/fullicon.png" height="25px" width="25px" className={styles["matic-logo"]} />
                            </Flex>
                          </button>
                          <Box fontSize='15px' mb={5} mt={5} w="150px">
                            <Text mb={0} mt={0} textAlign="center" fontSize="13px" bottom="60px" > The Protocol currently owes you <b>{firstTokensOwed + '  $MOBL'}</b></Text>
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>

                    {/* HISTORY RANK MOBILE*/}
                    <Box bg="#191D2C" w="9%" borderRadius="10px" mt="10px" p={"40px 40px 40px 40px"} className={styles["noneDis"]}>
                      <Text color="var(--text-color)" fontSize="22px" opacity="0.6">History</Text>
                      <Box p="30px">
                        <Flex fontSize="14px" align="center" mb="20px">
                          <img src="/fullicon.png" height="25px" width="25px" />
                          <Text color="var(--text-color)" opacity={.3} mx="10px">Mobula</Text>
                          <Text color="var(--text-color)" opacity={.8} mr="15px">MOBL</Text>
                          <Text color="var(--text-color)" opacity={.3} mr="20px">05/26/2022</Text>
                          <Box h="13px" w="13px" mr="10px" borderRadius="50%" bg="#16C784"></Box>
                          <Text>Validated by DAO</Text>
                        </Flex>
                        {/* TO REMOVE */}
                        <Flex fontSize="14px" align="center" mb="20px">
                          <img src="/fullicon.png" height="25px" width="25px" />
                          <Text color="var(--text-color)" opacity={.3} mx="10px">Mobula</Text>
                          <Text color="var(--text-color)" opacity={.8} mr="15px">MOBL</Text>
                          <Text color="var(--text-color)" opacity={.3} mr="20px">05/26/2022</Text>
                          <Box h="13px" w="13px" mr="10px" borderRadius="50%" bg="#16C784"></Box>
                          <Text>Validated by DAO</Text>
                        </Flex>
                        <Flex fontSize="14px" align="center" mb="20px">
                          <img src="/fullicon.png" height="25px" width="25px" />
                          <Text color="var(--text-color)" opacity={.3} mx="10px">Mobula</Text>
                          <Text color="var(--text-color)" opacity={.8} mr="15px">MOBL</Text>
                          <Text color="var(--text-color)" opacity={.3} mr="20px">05/26/2022</Text>
                          <Box h="13px" w="13px" mr="10px" borderRadius="50%" bg="#16C784"></Box>
                          <Text>Validated by DAO</Text>
                        </Flex>
                        <Flex fontSize="14px" align="center" mb="20px">
                          <img src="/fullicon.png" height="25px" width="25px" />
                          <Text color="var(--text-color)" opacity={.3} mx="10px">Mobula</Text>
                          <Text color="var(--text-color)" opacity={.8} mr="15px">MOBL</Text>
                          <Text color="var(--text-color)" opacity={.3} mr="20px">05/26/2022</Text>
                          <Box h="13px" w="13px" mr="10px" borderRadius="50%" bg="#16C784"></Box>
                          <Text>Validated by DAO</Text>
                        </Flex>
                      </Box>
                    </Box>
                  </Flex>
                ) : (
                  // DESKTOP RANK 
                  <Flex w={["95%", "95%", "95%", "95%"]} mr="5px" direction="column" align={['center', 'center', 'center', 'space-between']} justify="" mt={["50px", "50px", "0px", "0px",]}>
                    {/* Rank I Stats */}
                    <Flex w='100%' justify="space-around" direction={[, "column", "row", "row"]}>
                      <Flex
                        direction={["row", "row", "column", "column"]}
                        justify={["start", "start", "center", "center"]}
                        boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow-color)", "0px 1px 12px 3px var(--shadow-color)"]}
                        className={styles["padding-resps"]}
                        bg={["none", "none", 'var(--bg-list)', 'var(--bg-list)']}
                        borderRadius='10px'
                        w={['100%', '100%', '47%', '47%']}
                        textAlign={['center', 'center', 'center', 'left']}
                        mb={[7, 7, 7, 0]}
                        position="relative"
                      >
                        <Box position="absolute" display={["block", "block", "none", "none"]} bottom='-20px' h="1px" w="38%" bg="var(--border-top-body)"></Box>
                        <h2 className={styles["title-rank"]}>
                          Rank I <span className={styles["subtitle-rank"]}>Stats</span>
                        </h2>
                        <Flex direction={["column", "column", "row", "row"]} w={["50%", "50%", "auto", "auto"]} >
                          <Flex direction={["row", "row", "column", "column"]} fontSize='15px' align="center" justify="start" mb={[0, 0, 5, 5]} w="100%" position="relative">
                            <Text color={["#16C784", "#16C784", "#16C784", "#16C784"]} mb={2} whiteSpace="nowrap" mr="5px" >Correct Decisions</Text>
                            <Flex align="center" justify="center" fontWeight='800' h="45px" bg={["none", "none", "var(--decision-box)", "var(--decision-box)"]} boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow-color)", "0px 1px 12px 3px var(--shadow-color)"]} mt={["0px", "0px", "15px", "15px"]} borderRadius="15px" w={["30px", "30px", "90px", "90px"]}> {firstGoodChoice}</Flex>
                          </Flex>
                          <Flex direction={["row", "row", "column", "column"]} fontSize='15px' align="center" justify={["start", "start", "start", "start"]} mb={[0, 0, 5, 5]} w="100%" position="relative" >
                            <Text color={["#4C4C4C", "#4C4C4C", "#FF0000", "#FF0000"]} mb={2} whiteSpace="nowrap" ml="5px">Wrong Decisions</Text>
                            <Flex align="center" justify="center" h="45px" fontWeight='800' bg={["none", "none", "var(--decision-box)", "var(--decision-box)"]} boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow-color)", "0px 1px 12px 3px var(--shadow-color)"]} mt={["0px", "0px", "15px", "15px"]} borderRadius="15px" w={["30px", "30px", "90px", "90px"]}> {firstBadChoice}</Flex>
                          </Flex>
                        </Flex>
                        <Box fontSize='15px' mb={5}>
                          <Text mb={2} textAlign="center" fontSize="13px" bottom="60px" color="var(--protocol)" position={["absolute", "absolute", "initial", "initial"]}> The Protocol currently owes you <span className={styles["color-mobl"]}>{firstTokensOwed + '  $MOBL'}</span></Text>
                        </Box>
                        <Flex
                          width={["45%", "45%", '100%', '100%']}
                          justifyContent={['center', 'center', 'center', 'center']}
                          className={styles["buttons-claim-box"]}
                        >
                          {' '}
                          <button
                            className={styles["buttons-claim"]}
                            style={{ width: "90%", 'font-size': '1rem' } as any}
                            onClick={async (e) => {
                              e.preventDefault()

                              try {
                                var provider = new ethers.providers.Web3Provider(
                                  (window as any).ethereum
                                )
                                var signer = provider.getSigner()
                              } catch (e) {
                                alert.show(
                                  'You must connect your wallet to access the Dashboard.'
                                )
                              }

                              try {
                                const value = await new ethers.Contract(
                                  PROTOCOL_ADDRESS,
                                  ['function claimRewards() external'],
                                  signer
                                ).claimRewards()
                              } catch (e) {
                                alert.show("You don't have anything to claim.")
                                console.log(e)
                              }
                            }}
                          >
                            Claim
                          </button>
                        </Flex>
                      </Flex>
                      {/* Rank II Stats */}
                      <Flex
                        direction={["row", "row", "column", "column"]}
                        justify={["start", "start", "center", "center"]}
                        className={styles["padding-resps"]}
                        bg={["none", "none", 'var(--bg-list)', 'var(--bg-list)']}
                        borderRadius='10px'
                        w={['90%', '90%', '47%', '47%']}
                        textAlign={['center', 'center', 'center', 'left']}
                        boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow-color)", "0px 1px 12px 3px var(--shadow-color)"]}
                        mb={[7, 7, 7, 0]}
                        position="relative"
                      >
                        <h2 className={styles["title-rank"]}>
                          Rank II <span className={styles["subtitle-rank"]}>Stats</span>
                        </h2>
                        <Flex direction={["column", "column", "row", "row"]} mt="0px">
                          <Flex direction={["row", "row", "column", "column"]} fontSize='15px' align="center" justify={["center", "center", "start", "start"]} mb={[0, 0, 5, 5]} w="100%" position="relative">
                            <Text color="#16C784" whiteSpace="nowrap" mb={2} mr="5px">Correct Decisions</Text>
                            <Flex align="center" justify="center" fontWeight='800' h="45px" bg={["none", "none", "var(--decision-box)", "var(--decision-box)"]} boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow-color)", "0px 1px 12px 3px var(--shadow-color)"]} mt={["0px", "0px", "15px", "15px"]} borderRadius="15px" w={["30px", "30px", "90px", "90px"]}> {finalGoodChoice}</Flex>
                          </Flex>
                          <Flex direction={["row", "row", "column", "column"]} fontSize='15px' align="center" justify={["center", "center", "start", "start"]} mb={[0, 0, 5, 5]} w="100%" position="relative">
                            <Text color="#FF0000" whiteSpace="nowrap" mb={2} ml="5px">Wrong Decisions</Text>
                            <Flex align="center" justify="center" fontWeight='800' h="45px" bg={["none", "none", "var(--decision-box)", "var(--decision-box)"]} boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow-color)", "0px 1px 12px 3px var(--shadow-color)"]} mt={["0px", "0px", "15px", "15px"]} borderRadius="15px" w={["30px", "30px", "90px", "90px"]}> {finalBadChoice}</Flex>
                          </Flex>
                        </Flex>
                        <Box fontSize='15px' mb={5} className={styles["noneDis"]}>
                          <Text mb={2} textAlign="center" fontSize="13px" color="var(--protocol)"> The Protocol currently owes you <span className={styles["color-mobl"]}>{finalTokensOwed + '  $MOBL'}</span></Text>
                        </Box>


                        <Flex width='100%' justifyContent={['center', 'center', 'center', 'center']}>
                          {' '}
                          <button
                            className={`${styles["noneDis"]} ${styles["buttons-claim"]}`}

                            style={{ width: "90%", 'font-size': '1rem' } as any}
                            onClick={async (e) => {
                              e.preventDefault()

                              try {
                                var provider = new ethers.providers.Web3Provider(
                                  (window as any).ethereum
                                )
                                var signer = provider.getSigner()
                              } catch (e) {
                                alert.show(
                                  'You must connect your wallet to access the Dashboard.'
                                )
                              }
                              try {
                                const value = await new ethers.Contract(
                                  PROTOCOL_ADDRESS,
                                  ['function claimFinalRewards() external'],
                                  signer
                                ).claimFinalRewards()
                              } catch (e) {
                                alert.show("You don't have anything to claim.")
                                console.log(e)
                              }
                            }}
                          >
                            Claim
                          </button>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Box bg={["none", "none", 'var(--bg-list)', 'var(--bg-list)']} boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow-color)", "0px 1px 12px 3px var(--shadow-color)"]} w="97%" borderRadius="10px" mt="10px" p={"40px 40px 40px 40px"} className={styles["noneDis"]}>
                      <Text color="var(--beli)" fontSize="22px" fontWeight="500">History</Text>
                      <Box p="30px">

                        {recentlyAdded.map((token: any) => {
                          return <Flex fontSize="14px" align="center" mb="20px">
                            <img src={token.logo} height="25px" width="25px" />
                            <Text color="#4C4C4C" mx="10px">{token.name}</Text>
                            <Text color="#D3D3D3" mr="15px">{token.symbol}</Text>
                            <Text color="#4C4C4C" mr="20px">{token.creation_date}</Text>
                            <Box h="13px" w="13px" mr="10px" borderRadius="50%" bg="#16C784"></Box>
                            <Text color="#4C4C4C">Validated by DAO</Text>
                          </Flex>
                        })}

                      </Box>
                    </Box>
                  </Flex>
                )}

                {/* DAO FAUCET MOBILE */}
                <Box className={styles["size-box"]} ml="5px">
                  {/* DAO Faucet */}
                  <Flex >
                    {mobile ? (
                      <Flex
                        p='5px'
                        boxShadow="0px 1px 12px 3px var(--shadow-color)"
                        bg={["none", "none", '#191D2C', '#191D2C']}
                        borderRadius='10px'

                        w={['96%', '86%', '90%', '95%']}

                        mx="auto"
                      >
                        <Flex direction="column" w="50%">
                          <Box fontSize='15px' >
                            <Text color="#D3D3D3;" mb={2}>MATIC for DAO members</Text>
                            <Text fontWeight='800' mb="15px" fontSize="17px" color='#16C784'>
                              {countdownValue}
                            </Text>
                          </Box>
                          <Box h="1px" w="98%" bg="var(--border-top-body);"> </Box>
                          <Box fontSize='15px' mb={5}>
                            <Text textAlign="start" fontSize="14px" color="#909090" mt={2} mb={1}>You already claimed</Text>
                            <Text fontSize="18px" color="var(--text-color)" textAlign="start">{claimed} MATIC</Text>
                          </Box>
                        </Flex>
                        <Spacer />
                        <Flex
                          width='50%'
                          align="center" justify="center"
                        >
                          <button
                            className={styles["claim-matic"]}
                            style={{ width: "135px" } as any}
                            onClick={async (e) => {
                              e.preventDefault()
                              try {
                                var provider = new ethers.providers.Web3Provider(
                                  (window as any).ethereum
                                )
                                var signer = provider.getSigner()
                              } catch (e) {
                                alert.show(
                                  'You must connect your wallet to access the Dashboard.'
                                )
                              }
                              try {
                                const value = await new ethers.Contract(
                                  VAULT_ADDRESS,
                                  ['function claim() external'],
                                  signer
                                ).claim()
                              } catch (e) {
                                if (e.data && e.data.message) {
                                  alert.error(e.data.message)
                                } else {
                                  alert.error('Something went wrong.')
                                }
                              }
                            }}
                          >
                            <Text ml="15px">Claim MATIC</Text>
                            <img src="/polygon.png" height="25px" width="25px" className={styles["matic-logo"]} />
                          </button>
                        </Flex>
                      </Flex>
                    ) : (

                      // DAO FAUCET DESKTOP
                      <Flex
                        className={styles["padding-resp"]}
                        direction={["column-reverse", "column-reverse", "column", "column"]}
                        bg={["none", "none", 'var(--bg-list)', 'var(--bg-list)']}
                        borderRadius='10px'
                        boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow-color)", "0px 1px 12px 3px var(--shadow-color)"]}
                        w={['100%', '100%', '100%', '100%']}
                        textAlign={['center', 'center', 'center', 'left']}
                        mx="auto"

                      >
                        <Flex justify="space-between" >
                          <h2 className={styles["dao-title"]} >DAO <span className={styles["faucet"]}>Faucet</span></h2>
                          <Box fontSize='15px' >
                            <Text textAlign="end" fontSize="14px" opacity=".6" color="#909090">You already claimed</Text>
                            <Text fontSize="16px" color=" #909090" fontWeight="600" textAlign="end">{claimed} MATIC</Text>
                          </Box>
                        </Flex>
                        <Box w="95%" textAlign="start">
                          <Box fontSize='15px' mb={5}>
                            <Text fontWeight='800' mb="15px" fontSize="17px" color='#16C784'>
                              {countdownValue}
                            </Text>
                            <Text color="#D3D3D3" mb={2}>MATIC for DAO members</Text>
                          </Box>
                        </Box>
                        <Spacer />
                        <Flex
                          width='100%'
                          justifyContent={['center', 'center', 'center', 'right']}
                        >
                          <button
                            className={styles["claim-matic"]}
                            style={{ width: "135px", marginTop: "-60px", 'font-size': '1rem' } as any}
                            onClick={async (e) => {
                              e.preventDefault()
                              try {
                                var provider = new ethers.providers.Web3Provider(
                                  (window as any).ethereum
                                )
                                var signer = provider.getSigner()
                              } catch (e) {
                                alert.show(
                                  'You must connect your wallet to access the Dashboard.'
                                )
                              }
                              try {
                                const value = await new ethers.Contract(
                                  VAULT_ADDRESS,
                                  ['function claim() external'],
                                  signer
                                ).claim()
                              } catch (e) {
                                if (e.data && e.data.message) {
                                  alert.error(e.data.message)
                                } else {
                                  alert.error('Something went wrong.')
                                }
                              }
                            }}
                          >
                            Claim MATIC
                          </button>
                        </Flex>
                      </Flex>
                    )}
                  </Flex>
                  {/* TITLE LEADERBOARD */}
                  <Box bg={["none", "none", 'var(--bg-list)', 'var(--bg-list)']} boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow-color)", "0px 1px 12px 3px var(--shadow-color)"]} w="100%" borderRadius="10px" h="auto" minHeight="458px" m="10px auto" className={`${styles["padding-resp"]} ${styles["noneDis"]}`}>
                    <Text color="var(--beli)" fontSize="22px" fontWeight="500">Leaderboard</Text>
                    <Box p="50px 0px 0px 0px">
                      <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                        <Flex align="center">
                          <Text color="var(--beli)" opacity={.5} mr="5px">1.</Text>
                          <Text color="var(--beli)" mx="5px">RohitGuru</Text>
                          <Text color="var(--score)" mr="10px">(0x3e2...24b4)</Text>
                        </Flex>
                        <Flex align="center">
                          <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                          <Text ml="0px" color="#16C784" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">207 Correct Decisions</Text>
                        </Flex>
                      </Flex>
                      {/* TO REMOVE UNDER */}
                      <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                        <Flex align="center">
                          <Text color="var(--beli)" opacity={.5} mr="5px">2.</Text>
                          <Text color="var(--beli)" mx="5px">Arch</Text>
                          <Text color="var(--score)" mr="10px">(0x28...B9C)</Text>
                        </Flex>
                        <Flex align="center">
                          <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                          <Text ml="0px" color="#16C784" >184 Correct Decisions</Text>
                        </Flex>
                      </Flex>
                      <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                        <Flex align="center">
                          <Text color="var(--beli)" opacity={.5} mr="5px">3.</Text>
                          <Text color="var(--beli)" mx="5px">Prince</Text>
                          <Text color="var(--score)" mr="10px">(0x967a...a4820)</Text>
                        </Flex>
                        <Flex align="center">
                          <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                          <Text ml="0px" color="#16C784" >182 Correct Decisions</Text>
                        </Flex>
                      </Flex>
                      <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                        <Flex align="center">
                          <Text color="var(--beli)" opacity={.5} mr="5px">4.</Text>
                          <Text color="var(--beli)" mx="5px">TJR</Text>
                          <Text color="var(--score)" mr="10px">(0x654...C238C)</Text>
                        </Flex>
                        <Flex align="center">
                          <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                          <Text ml="0px" color="#16C784" >153 Correct Decisions</Text>
                        </Flex>
                      </Flex>
                      <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                        <Flex align="center">
                          <Text color="var(--beli)" opacity={.5} mr="5px">5.</Text>
                          <Text color="var(--beli)" mx="5px">Beli</Text>
                          <Text color="var(--score)" mr="10px">(0xb76...3Cab9)</Text>
                        </Flex>
                        <Flex align="center">
                          <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                          <Text ml="0px" color="#16C784" >130 Correct Decisions</Text>
                        </Flex>
                      </Flex>
                      <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                        <Flex align="center">
                          <Text color="var(--beli)" opacity={.5} mr="5px">6.</Text>
                          <Text color="var(--beli)" mx="5px">Hercute</Text>
                          <Text color="var(--score)" mr="10px">(0xfbf...B51e)</Text>
                        </Flex>
                        <Flex align="center">
                          <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                          <Text ml="0px" color="#16C784" >113 Correct Decisions</Text>
                        </Flex>
                      </Flex>
                      <Flex fontSize="14px" align="center" justify="space-between" mb="20px">
                        <Flex align="center">
                          <Text color="var(--beli)" opacity={.5} mr="5px">7.</Text>
                          <Text color="var(--beli)" mx="5px">Kanga</Text>
                          <Text color="var(--score)" mr="10px">(0x95...4C14)</Text>
                        </Flex>
                        <Flex align="center">
                          <Text color="var(--score)" whiteSpace="nowrap" mr="15px">Score :</Text>
                          <Text ml="0px" color="#16C784" >110 Correct Decisions</Text>
                        </Flex>
                      </Flex>
                      {/* TO REMOVE UP */}
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </ColorModeProvider>
          </ChakraProvider>
        </Box>
      </div >
    </>
  )
}

export default DashboardRem
