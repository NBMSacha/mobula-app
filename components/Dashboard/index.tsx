import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { ethers } from 'ethers'
import styles from './dashboard.module.scss'
import { Text, Heading, Flex, Box } from '@chakra-ui/react'
import { PROTOCOL_ADDRESS, VAULT_ADDRESS } from '../../constants'
import {
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
} from '@chakra-ui/react'
import { CSSReset } from '@chakra-ui/react'
import theme from '../../theme/index'

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
                <Heading mb={'20px'}>Dashboard</Heading>
                <Text fontSize={['14px', '14px', '16px', '17px']}>
                  If you helped the Protocol, you deserve a reward. You're free
                  to claim your tokens.
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
                {/* Rank I Stats */}
                <Box
                  p='10px'
                  bg={'#a3d4f440'}
                  borderRadius='10px'
                  w={['90%', '90%', '90%', '30%']}
                  textAlign={['center', 'center', 'center', 'left']}
                  mb={[7, 7, 7, 0]}
                >
                  <h2 className={styles.title}>
                    Rank I <span className={styles.titleColor}>Stats</span>
                  </h2>
                  <Box fontSize='15px' mb={5}>
                    <Text mb={2}> The Protocol currently owes you</Text>
                    <Text fontWeight='800'> {firstTokensOwed + '  $MOBL'}</Text>
                  </Box>
                  <Box fontSize='15px' mb={5}>
                    <Text mb={2}>Correct Decisions</Text>
                    <Text fontWeight='800'> {firstGoodChoice + ' times'}</Text>
                  </Box>
                  <Box fontSize='15px' mb={5}>
                    <Text mb={2}>Wrong Decisions</Text>
                    <Text fontWeight='800'> {firstBadChoice + ' times'}</Text>
                  </Box>

                  <Flex
                    width='100%'
                    justifyContent={['center', 'center', 'center', 'left']}
                  >
                    {' '}
                    <button
                      className='button'
                      style={{ width: 158 }}
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
                </Box>

                {/* Rank II Stats */}
                <Box
                  p='10px'
                  bg={'#a3d4f440'}
                  borderRadius='10px'
                  w={['90%', '90%', '90%', '30%']}
                  textAlign={['center', 'center', 'center', 'left']}
                  mb={[7, 7, 7, 0]}
                >
                  <h2 className={styles.title}>
                    Rank II <span className={styles.titleColor}>Stats</span>
                  </h2>

                  <Box fontSize='15px' mb={5}>
                    <Text mb={2}> The Protocol currently owes you</Text>
                    <Text fontWeight='800'> {finalTokensOwed + '  $MOBL'}</Text>
                  </Box>
                  <Box fontSize='15px' mb={5}>
                    <Text mb={2}>Correct Decisions</Text>
                    <Text fontWeight='800'> {finalGoodChoice + ' times'}</Text>
                  </Box>
                  <Box fontSize='15px' mb={5}>
                    <Text mb={2}>Wrong Decisions</Text>
                    <Text fontWeight='800'> {finalBadChoice + ' times'}</Text>
                  </Box>

                  <Flex
                    width='100%'
                    justifyContent={['center', 'center', 'center', 'left']}
                  >
                    {' '}
                    <button
                      className='button'
                      style={{ width: 158 }}
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
                </Box>

                {/* DAO Faucet */}
                <Flex
                  p='10px'
                  flexDir={'column'}
                  justifyContent='space-between'
                  bg={'#a3d4f440'}
                  borderRadius='10px'
                  w={['90%', '90%', '90%', '30%']}
                  textAlign={['center', 'center', 'center', 'left']}
                >
                  <h2 className={styles.title}>DAO Faucet</h2>

                  <Box>
                    <Box fontSize='15px' mb={5}>
                      <Text mb={2}>Next MATIC claim</Text>
                      <Text fontWeight='800' color='#16C784'>
                        {countdownValue}
                      </Text>
                    </Box>
                    <Box fontSize='15px' mb={5}>
                      <Text mb={2}>You already claimed</Text>
                      <Text fontWeight='800'>{claimed}</Text>
                    </Box>
                  </Box>
                  <Flex
                    width='100%'
                    justifyContent={['center', 'center', 'center', 'left']}
                  >
                    <button
                      className='button'
                      style={{ width: 158 }}
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
              </Flex>
            </ColorModeProvider>
          </ChakraProvider>
        </div>
      </div>
    </>
  )
}

export default Dashboard
