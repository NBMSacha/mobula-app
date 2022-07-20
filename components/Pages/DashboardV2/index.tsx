import React, { useEffect, useState } from "react"
import { useAlert } from "react-alert"
import { ethers } from "ethers"
import RankStats from "./RankStats"
import Faucet from "./Faucet"
import History from "./History"
import { PROTOCOL_ADDRESS, VAULT_ADDRESS } from "../../../constants"
import { createClient } from "@supabase/supabase-js"
import { useWeb3React } from "@web3-react/core"
import { Grid } from "@chakra-ui/react"
import Leaderboard from "./Leaderboard"
import {  Flex } from "@chakra-ui/react"

function Dashboard() {
  const web3React = useWeb3React()
  const alert = useAlert()
  const accountUser = web3React.account
  const [firstTokensOwed, setFirstTokensOwed] = useState(0)
  const [validated, setValidated] = useState([])
  const [rejected, setRejected] = useState([])
  const [userRank, setUserRank] = useState(0)
  const [finalTokensOwed, setFinalTokensOwed] = useState(0)
  const [firstGoodChoice, setFirstGoodChoice] = useState(0)
  const [firstBadChoice, setFirstBadChoice] = useState(0)
  const [finalGoodChoice, setFinalGoodChoice] = useState(0)
  const [finalBadChoice, setFinalBadChoice] = useState(0)
  const [countdownValue, setCountdown] = useState("You can claim now")
  const [claimed, setClaimed] = useState(0)
  const [mobile, setMobile] = useState({})
  const [recentlyAdded, setRecentlyAdded] = useState([])
  const [daoMembers, setDaoMembers] = useState([]);

  useEffect(() => {

    setMobile(window.matchMedia("(max-width: 768px)").matches);
  }, [mobile])


  var provider: any

  function countdown(created: number) {
    let date = new Date(created)
    let seconds = date.getTime()
    let postedDate = Math.round(seconds + 7 * 24 * 60 * 60 - Date.now() / 1000)

    if (postedDate < 60) {
      return Math.round(postedDate) + " seconds"
    } else if (60 <= postedDate && postedDate < 120) {
      return "1 minute"
    } else if (120 <= postedDate && postedDate < 3600) {
      return Math.round(postedDate / 60) + " minutes"
    } else if (3600 <= postedDate && postedDate < 7200) {
      return "1 hour"
    } else if (7200 <= postedDate && postedDate < 86400) {
      return Math.round(postedDate / 3600) + " hours"
    } else if (86400 <= postedDate && postedDate < 172800) {
      return "1 day"
    } else if (172800 <= postedDate) {
      return Math.round(postedDate / 86400) + " days"
    }
  }

  async function initValues() {
    try {
      provider = new ethers.providers.Web3Provider(web3React.library.provider);

      const protocolContract = new ethers.Contract(
        PROTOCOL_ADDRESS,
        [
          "function paidFirstVotes(address voter) external view returns(uint256)",
          "function goodFirstVotes(address voter) external view returns(uint256)",
          "function badFirstVotes(address voter) external view returns(uint256)",
          "function paidFinalVotes(address voter) external view returns(uint256)",
          "function goodFinalVotes(address voter) external view returns(uint256)",
          "function badFinalVotes(address voter) external view returns(uint256)",
          "function tokensPerVote() external view returns(uint256)",
        ],
        provider
      )
      const tokensPerVote = parseInt(
        ethers.utils.formatEther(await protocolContract.tokensPerVote())
      )
      const firstPaidVotes = (
        await protocolContract.paidFirstVotes(web3React.account)
      ).toNumber()
      const firstGoodVotes = (
        await protocolContract.goodFirstVotes(web3React.account)
      ).toNumber()
      const firstBadVotes = (
        await protocolContract.badFirstVotes(web3React.account)
      ).toNumber()
      const finalPaidVotes = (
        await protocolContract.paidFinalVotes(web3React.account)
      ).toNumber()
      const finalGoodVotes = (
        await protocolContract.goodFinalVotes(web3React.account)
      ).toNumber()
      const finalBadVotes = (
        await protocolContract.badFinalVotes(web3React.account)
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
          "function lastClaim(address member) external view returns(uint256)",
          "function totalClaim(address member) external view returns(uint256)",
        ],
        provider
      )

      const lastClaim = (await vaultContract.lastClaim(web3React.account)).toNumber()
      const totalClaim = (await vaultContract.totalClaim(web3React.account)).toNumber()

      setClaimed(totalClaim)

      if (lastClaim === 0 || lastClaim + 7 * 24 * 60 * 60 <= Date.now() / 1000) {
        setCountdown("You can claim now")
      } else {
        setCountdown(countdown(lastClaim))
      }
    } catch (e) {
      alert.show("You must connect your wallet to access your Dashboard.")
    }
  }

  async function initNonCryptoValues() {
    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )

    supabase
      .from("history_dao")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(30)
      .then(r => {
        setRecentlyAdded(r.data)
      })
    
    supabase
        .from("members")
        .select("address")
        .order("good_decisions", {ascending: false})
        .then(r => {
            if(r.data) {
                setUserRank(r.data.map(entry => entry.address).indexOf(accountUser) + 1)
            }      
          })
    
    supabase
      .from("members")
      .select("*")
      .order("good_decisions", { ascending: false })
      .limit(12)
      .then(r => {
        setDaoMembers(r.data)
      })

    supabase
      .from("history_dao")
      .select("*")
      .order("created_at", { ascending: false })
      .filter("validated", "eq", "true")
      .limit(10)
      .then(r => {
        setValidated(r.data)
      })

    supabase
      .from("history_dao")
      .select("*")
      .order("created_at", { ascending: false })
      .filter("validated", "eq", "false")
      .limit(10)
      .then(r => {
        setRejected(r.data)
      })
  }

  useEffect(() => {
    initNonCryptoValues()
  }, [])

  useEffect(() => {
    if (web3React.account) {
      initValues()
    } else {
      const timeout = setTimeout(() => {
        alert.show("You must connect your wallet to earn MOBL.")
      }, 300)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [web3React])
  
  return (
    <Flex maxWidth="1500px" mx="auto" mt="28px">
        <Grid h="2200"  mx="auto" w="90%" templateRows="repeat(15, 1fr)" templateColumns={["repeat(5, 1fr)"]} gap={2}>
            <RankStats 
                finalBadChoice={finalBadChoice}
                finalGoodChoice={finalGoodChoice}
                firstGoodChoice={firstGoodChoice}
                firstBadChoice={firstBadChoice}
                firstTokensOwed={firstTokensOwed}
                finalTokensOwed={finalTokensOwed}
            />
            <Faucet 
                provider={provider} 
                claim={claimed} 
                countdown={countdownValue} 
            />
            <History 
                rejected={rejected} 
                validated={validated} 
                recentlyAdded={recentlyAdded}
            />
            <Leaderboard 
                goodChoices={firstGoodChoice} 
                badChoices={firstBadChoice} 
                finalBadChoice={finalBadChoice}
                finalGoodChoice={finalGoodChoice}
                top={daoMembers} 
                userRank={userRank}
            />
        </Grid>
    </Flex>
  )
}

export default Dashboard
