import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { ethers } from 'ethers'
import styles from './dashboard.module.scss'
import { Text, Heading, Flex, Box, Spacer, Button, useColorModeValue } from '@chakra-ui/react'
import { PROTOCOL_ADDRESS, VAULT_ADDRESS } from '../../../constants'
import {
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
} from '@chakra-ui/react'
import { CSSReset } from '@chakra-ui/react'
import { createClient } from '@supabase/supabase-js'
import RankStats from './RankStats'
import History from './History'
import Leaderboard from './Leaderboard'

function Dashboard() {
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
  const [daoMembers, setDaoMembers] = useState([]);

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

    supabase
      .from('members')
      .select('*')
      .order('good_decisions', { ascending: false })
      .limit(6)
      .then(r => {
        setDaoMembers(r.data)
      })

  }

  useEffect(() => {
    initValues()
  }, [])

  const input = useColorModeValue("white_sun_moon", "dark_decision")
  const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
  const bg = useColorModeValue("bg_white", "dark_box_list")
  const border = useColorModeValue("grey_border", "dark_border_tendance")

  return (
    <>
      <Flex align="center" justify="center">
        <Box w="100%" maxWidth="1400px" className=''>


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
            mb="10vh"
          >

            {/* RANK DISPLAY MOBILE */}

            {mobile ? (

              <Flex w="95%" direction="column" boxShadow={[`0px 1px 12px 3px ${shadow}`, `0px 1px 12px 3px ${shadow}`, `0px 1px 12px 3px ${shadow}`, `0px 1px 12px 3px ${shadow}`]} borderRadius="10px" p="5px" align={['center', 'center', 'center', 'space-between']} mt={["10px", "10px", "0px", "0px",]}>

                {/* Rank I Stats */}
                <Flex w={['95%', '90%', '90%', '90%']} justify="space-evenly" direction={[, "column", "row", "row"]} >
                  <Flex
                    direction={["row", "row", "column", "column"]}
                    justify={["start", "start", "center", "center"]}
                    p={['0px', '14px 14px 14px 14px', '34px 34px 34px 34px', '34px 34px 34px 34px']}
                    bg={["none", "none", '#191D2C', '#191D2C']}
                    borderRadius='0px'

                    borderBottom={`1px solid ${border}`}
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
                      <Box h="1px" w="90%" bg={border} mt={2} mb={3}></Box>
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
                    <Box h="1px" w="1px"mt="10px" h="60%" bg={border} mt={2} mb={3}></Box>
                    <Flex
                      width={["50%", "50%", '100%', '100%']}
                      justify="center"
                      align="center"
                      direction="column"
                      className={styles["buttons-claim-box"]}
                      borderLeft={`1px solid ${border}`}
                    >
                      {' '}
                      <Button
                        className={styles["buttons-claim"]}
                        boxShadow={`0px 1px 12px 3px ${shadow}`}
                        borderRadius="10px"

                        style={{ width: "90%" } as any}
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
                      </Button>
                      <Box fontSize='15px' mb={5} mt={5} w="150px">
                        <Text mb={0} mt={0} textAlign="center" fontSize="13px" bottom="60px" > The Protocol currently owes you <b>{firstTokensOwed + '  $MOBL'}</b></Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>

              </Flex>
            ) : (
              // DESKTOP RANK 
              <Flex w={["95%", "95%", "95%", "95%"]} mr="5px" direction="column" align={['center', 'center', 'center', 'space-between']} justify="" mt={["50px", "50px", "0px", "0px",]}>
                <Flex w='100%' justify="space-around" direction={[, "column", "row", "row"]}>
                  <RankStats title={"Rank I"} goodChoices={firstGoodChoice} badChoices={firstBadChoice} tokensOwed={firstTokensOwed} />
                  <RankStats title={"Rank II"} goodChoices={finalGoodChoice} badChoices={finalBadChoice} tokensOwed={finalTokensOwed} />
                </Flex>
                <History recentlyAdded={recentlyAdded} />
              </Flex>
            )}

            <Box className={styles["size-box"]} ml="5px">
              {/* DAO Faucet */}
              <Flex >
                {mobile ? (
                  <Flex
                    p='5px'
                    borderRadius="10px"
                    boxShadow={`0px 1px 12px 3px ${shadow}`}
                    bg={["none", "none", '#191D2C', '#191D2C']}


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
                      <Box h="1px" w="98%"  bg={border}> </Box>
                      <Box fontSize='15px' mb={5}>
                        <Text textAlign="start" fontSize="14px" color="#909090" mt={2} mb={1}>You already claimed</Text>
                        <Text fontSize="18px" textAlign="start">{claimed} MATIC</Text>
                      </Box>
                    </Flex>
                    <Spacer />
                    <Flex
                      width='50%'
                      align="center" justify="center"
                    >
                      <Button
                        borderRadius="10px"
                        boxShadow={`0px 1px 12px 3px ${shadow}`}
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
                        <Text ml="15px" >Claim MATIC</Text>
                        <img src="/polygon.png" height="25px" width="25px" className={styles["matic-logo"]} />
                      </Button>
                    </Flex>
                  </Flex>
                ) : (

                  // DAO FAUCET DESKTOP
                  <Flex
                    className={styles["padding-resp"]}
                    direction={["column-reverse", "column-reverse", "column", "column"]}
                    bg={["none", "none", bg, bg]}
                    borderRadius='10px'
                    boxShadow={["none", "none", `0px 1px 12px 3px ${shadow}`, `0px 1px 12px 3px ${shadow}`]}
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
                      <Button
                        className={styles["claim-matic"]}
                        bg={input}
                        boxShadow={`0px 1px 12px 3px ${shadow}`}
                        borderRadius="12px"
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
                        <Flex justify="center" align="center" >
                          <Text ml="5px" mr="5px">Claim MATIC</Text>
                          <img src="/polygon.png" height="25px" width="25px" className={styles["matic-logo"]} />
                        </Flex>                          </Button>
                    </Flex>
                  </Flex>
                )}
              </Flex>
              {/* TITLE LEADERBOARD */}
              <Leaderboard top={daoMembers} />

            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default Dashboard
