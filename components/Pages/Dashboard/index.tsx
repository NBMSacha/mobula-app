import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { ethers } from "ethers";
import {
  Box, Button, Flex, Icon, Spacer, Text,
} from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { ThumbsDown, ThumbsUp } from "react-feather";
import { useWeb3React } from "@web3-react/core";
import styles from "./dashboard.module.scss";
import { PROTOCOL_ADDRESS, VAULT_ADDRESS } from "../../../constants";
import RankStats from "./RankStats";
import History from "./History";
import Leaderboard from "./Leaderboard";

function Dashboard() {
  const web3React = useWeb3React();
  const alert = useAlert();
  const [firstTokensOwed, setFirstTokensOwed] = useState(0);
  const [validated, setValidated] = useState([]);
  const [finalTokensOwed, setFinalTokensOwed] = useState(0);
  const [firstGoodChoice, setFirstGoodChoice] = useState(0);
  const [firstBadChoice, setFirstBadChoice] = useState(0);
  const [finalGoodChoice, setFinalGoodChoice] = useState(0);
  const [finalBadChoice, setFinalBadChoice] = useState(0);
  const [countdownValue, setCountdown] = useState("You can claim now");
  const [claimed, setClaimed] = useState(0);
  const [mobile, setMobile] = useState({});
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [daoMembers, setDaoMembers] = useState([]);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
  }, [mobile]);

  let provider: any;

  function countdown(created: number) {
    const date = new Date(created);
    const seconds = date.getTime();
    const postedDate = Math.round(seconds + 7 * 24 * 60 * 60 - Date.now() / 1000);

    console.log(postedDate);

    if (postedDate < 60) {
      return `${Math.round(postedDate)} seconds`;
    } if (postedDate >= 60 && postedDate < 120) {
      return "1 minute";
    } if (postedDate >= 120 && postedDate < 3600) {
      return `${Math.round(postedDate / 60)} minutes`;
    } if (postedDate >= 3600 && postedDate < 7200) {
      return "1 hour";
    } if (postedDate >= 7200 && postedDate < 86400) {
      return `${Math.round(postedDate / 3600)} hours`;
    } if (postedDate >= 86400 && postedDate < 172800) {
      return "1 day";
    } if (postedDate >= 172800) {
      return `${Math.round(postedDate / 86400)} days`;
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
        provider,
      );
      const tokensPerVote = parseInt(
        ethers.utils.formatEther(await protocolContract.tokensPerVote()),
      );
      const firstPaidVotes = (
        await protocolContract.paidFirstVotes(web3React.account)
      ).toNumber();
      const firstGoodVotes = (
        await protocolContract.goodFirstVotes(web3React.account)
      ).toNumber();
      const firstBadVotes = (
        await protocolContract.badFirstVotes(web3React.account)
      ).toNumber();
      const finalPaidVotes = (
        await protocolContract.paidFinalVotes(web3React.account)
      ).toNumber();
      const finalGoodVotes = (
        await protocolContract.goodFinalVotes(web3React.account)
      ).toNumber();
      const finalBadVotes = (
        await protocolContract.badFinalVotes(web3React.account)
      ).toNumber();
      setFirstTokensOwed((firstGoodVotes - firstPaidVotes) * tokensPerVote);
      setFinalTokensOwed((finalGoodVotes - finalPaidVotes) * tokensPerVote);
      setFirstGoodChoice(firstGoodVotes);
      setFirstBadChoice(firstBadVotes);
      setFinalGoodChoice(finalGoodVotes);
      setFinalBadChoice(finalBadVotes);

      const vaultContract = new ethers.Contract(
        VAULT_ADDRESS,
        [
          "function lastClaim(address member) external view returns(uint256)",
          "function totalClaim(address member) external view returns(uint256)",
        ],
        provider,
      );

      const lastClaim = (await vaultContract.lastClaim(web3React.account)).toNumber();
      const totalClaim = (await vaultContract.totalClaim(web3React.account)).toNumber();

      setClaimed(totalClaim);
      // console.log(lastClaim);

      console.log("yo", lastClaim);

      console.log(Date.now());

      if (lastClaim == 0 || lastClaim + 7 * 24 * 60 * 60 <= Date.now() / 1000) {
        setCountdown("You can claim now");
      } else {
        setCountdown(countdown(lastClaim));
      }
    } catch (e) {
      alert.show("You must connect your wallet to access your Dashboard.");
      console.log(e);
    }
  }

  async function initNonCryptoValues() {
    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    );

    supabase
      .from("assets")
      .select("name,symbol,logo,created_at")
      .order("created_at", { ascending: false })
      .limit(10)
      .then((r) => {
        setRecentlyAdded(r.data);
      });

    supabase
      .from("members")
      .select("*")
      .order("good_decisions", { ascending: false })
      .limit(12)
      .then((r) => {
        setDaoMembers(r.data);
      });

    supabase
      .from("history_dao")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)
      .then((r) => {
        setValidated(r.data);
      });
  }

  useEffect(() => {
    initNonCryptoValues();
  }, []);

  useEffect(() => {
    console.log(web3React);
    if (web3React.account) {
      initValues();
    } else {
      console.log("YESSSS THATS IT MY BOY");
      const timeout = setTimeout(() => {
        console.log("ALERT TIRGGERED");
        alert.show("You must connect your wallet to earn MOBL.");
      }, 300);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [web3React]);

  return (
    <Flex align="center" justify="center">
      <Box w="100%" maxWidth="1400px" className="">
        <Flex w="100%" p="0px 5%" mt="30px" className={styles.shinda}>
          <Text>DAO Dashboard</Text>
        </Flex>
        {/* <div className={styles.line}></div> */}
        <Flex
          justifyContent={["space-evenly"]}
          flexDir={["column-reverse", "column-reverse", "row", "row"]}
          alignItems={["center", "center", "center", "stretch"]}

          paddingTop="60px"
          className={styles.blitz}
          m="auto"
          position="relative"
          mt="-40px"
          mb={["0px", "0px", "0px", "10vh"]}
        >

          {/* RANK DISPLAY MOBILE */}

          <>
            <Flex
              display={["flex", "flex", "none", "none"]}
              w="95%"
              direction="column"
              borderRadius="10px"
              p="5px"
              align={["center", "center", "center", "space-between"]}
              mt={["10px", "10px", "0px", "0px"]}
            >

              {/* Rank I Stats */}
              <Flex
                w={["95%", "95%", "90%", "90%"]}
                justify="space-evenly"
                direction={[, "column", "row", "row"]}
              >
                <Flex
                  boxShadow={["0px 1px 12px 3px var(--shadow)", "0px 1px 12px 3px var(--shadow)", "0px 1px 12px 3px var(--shadow)", "0px 1px 12px 3px var(--shadow)"]}
                  direction={["row", "row", "column", "column"]}
                  justify={["start", "start", "center", "center"]}
                  p={["4px 4px 4px 4px", "4px 4px 4px 4px", "34px 34px 34px 34px", "34px 34px 34px 34px"]}
                  bg={["var(--bg-governance-box)", "var(--bg-governance-box)", "#191D2C", "#191D2C"]}
                  borderRadius="8px"

                  borderBottom="1px solid var(--box_border)"
                  w={["100%", "100%", "90%", "48%"]}
                  textAlign={["center", "center", "center", "left"]}
                  mb={["10px", "10px", "7px", 0]}
                  position="relative"
                  align="center"
                >
                  <Flex
                    direction={["column", "column", "row", "row"]}
                    bg="none"
                    justify="center"
                    w="50%"
                    p="10px"
                  >
                    <Text textAlign="start" fontSize="12px" mb={2}>
                      Rank I
                      {" "}
                      <span className={styles.stats}>Stats</span>
                    </Text>
                    <Flex
                      color="green"
                      direction="row"
                      fontSize="15px"
                      align="center"
                      justify="space-between"
                      mb={[0, 0, 5, 5]}
                      w="90%"
                      position="relative"
                    >
                      <Text
                        mb={2}
                        whiteSpace="nowrap"
                        fontSize={["11px", "11px", "14px", "14px"]}
                        mr="10px"
                      >
                        Correct
                        Decisions :
                      </Text>
                      <Flex
                        align="center"
                        justify="center"
                        fontWeight="800"
                        mb={2}
                        bg={["none", "none", "#202433", "#202433"]}
                        borderRadius="15px"
                        w={["30px", "30px", "90px", "90px"]}
                      >
                        {" "}
                        {firstGoodChoice}
                        {" "}
                        <Icon
                          mb="4px"
                          ml="5px"
                          as={ThumbsUp}
                        />
                      </Flex>
                    </Flex>
                    <Flex
                      color="red"
                      direction="row"
                      fontSize="15px"
                      align="center"
                      w="90%"
                      justify={["space-between", "space-between", "start", "start"]}
                      mb={[0, 0, 5, 5]}
                      position="relative"
                    >
                      <Text
                        mb={2}
                        whiteSpace="nowrap"
                        fontSize={["11px", "11px", "14px", "14px"]}
                        mr="10px"
                      >
                        Wrong
                        Decisions :
                      </Text>

                      <Flex
                        align="center"
                        justify="center"
                        fontWeight="800"
                        mb={2}
                        bg={["none", "none", "#202433", "#202433"]}
                        mt={["0px", "0px", "15px", "15px"]}
                        borderRadius="15px"
                        w={["30px", "30px", "90px", "90px"]}
                      >
                        {" "}
                        {firstBadChoice}
                        {" "}
                        <Icon
                          mb="0px"
                          ml="5px"
                          as={ThumbsDown}
                        />
                      </Flex>
                    </Flex>
                    <Box h="1px" w="90%" bg="var(--box_border)" mt={2} mb={3} />
                    <Text textAlign="start" fontSize="12px" mb={2}>
                      Rank II
                      {" "}
                      <span className={styles.stats}>Stats</span>
                    </Text>
                    <Flex
                      color="green"
                      direction="row"
                      fontSize="15px"
                      align="center"
                      justify={["space-between", "space-between", "start", "start"]}
                      mb={[0, 0, 5, 5]}
                      w="90%"
                      position="relative"
                    >
                      <Text
                        mb={2}
                        whiteSpace="nowrap"
                        fontSize={["11px", "11px", "14px", "14px"]}
                        mr="10px"
                      >
                        Correct
                        Decisions :
                      </Text>
                      <Flex
                        align="center"
                        justify="center"
                        fontWeight="800"
                        mb={2}
                        bg={["none", "none", "#202433", "#202433"]}
                        mt={["0px", "0px", "15px", "15px"]}
                        borderRadius="15px"
                        w={["30px", "30px", "90px", "90px"]}
                      >
                        {" "}
                        {finalGoodChoice}
                        {" "}
                        <Icon
                          mb="4px"
                          ml="5px"
                          as={ThumbsUp}
                        />
                      </Flex>
                    </Flex>
                    <Flex
                      color="red"
                      direction="row"
                      fontSize="15px"
                      align="center"
                      justify={["space-between", "space-between", "start", "start"]}
                      mb={[0, 0, 5, 5]}
                      w="90%"
                      position="relative"
                    >
                      <Text
                        whiteSpace="nowrap"
                        mb={2}
                        fontSize={["11px", "11px", "14px", "14px"]}
                        mr="10px"
                      >
                        Wrong
                        Decisions :
                      </Text>
                      <Flex
                        align="center"
                        justify="center"
                        fontWeight="800"
                        mb={2}
                        bg={["none", "none", "#202433", "#202433"]}
                        mt={["0px", "0px", "15px", "15px"]}
                        borderRadius="15px"
                        w={["30px", "30px", "90px", "90px"]}
                      >
                        {" "}
                        {finalBadChoice}
                        {" "}
                        <Icon
                          mb="0px"
                          ml="5px"
                          as={ThumbsDown}
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                  <Box h="1px" w="1px" mt="10px" bg="var(--box_border)" mb={3} />
                  <Flex
                    width={["50%", "50%", "100%", "100%"]}
                    justify="center"
                    align="center"
                    direction="column"
                    className={styles["buttons-claim-box"]}
                    borderLeft="1px solid var(--box_border)"
                    mt="30px"
                  >
                    {" "}
                    <Button
                      variant="outline"

                      colorScheme="green"
                      color="green"
                      className={styles["buttons-claim"]}
                      boxShadow="0px 1px 12px 3px var(--shadow)"
                      borderRadius="10px"
                      _focus={{ boxShadow: "none" }}
                      style={{ width: "90%" } as any}
                      onClick={async (e) => {
                        e.preventDefault();
                        try {
                          provider = new ethers.providers.Web3Provider(web3React.library.provider);
                          var signer = provider.getSigner();
                        } catch (e) {
                          alert.error(
                            "You must connect your wallet to access the Dashboard.",
                          );
                        }
                        try {
                          console.log("This is final!!");
                          const value = await new ethers.Contract(
                            PROTOCOL_ADDRESS,
                            ["function claimFinalRewards() external"],
                            signer,
                          ).claimFinalRewards();
                        } catch (e) {
                          try {
                            const value = await new ethers.Contract(
                              PROTOCOL_ADDRESS,
                              ["function claimRewards() external"],
                              signer,
                            ).claimRewards();
                          } catch (e) {
                            alert.show("You don't have anything to claim.");
                            console.log(e);
                          }

                          console.log(e);
                        }
                      }}
                    >
                      {" "}
                      <Flex justify="center" align="center">
                        <Text>Claim MOBL</Text>
                      </Flex>
                    </Button>
                    <Box fontSize="15px" mb={5} mt={5} w="150px">
                      <Text
                        mb={0}
                        mt={0}
                        textAlign="center"
                        fontSize="11px"
                        bottom="60px"
                      >
                        {" "}
                        The Protocol currently owes
                        you
                        {" "}
                        <b>{`${firstTokensOwed + finalTokensOwed}  $MOBL`}</b>
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </Flex>

            </Flex>

          </>

          <Flex
            display={["none", "none", "flex", "flex"]}
            w={["95%", "95%", "95%", "95%"]}
            mr="5px"
            direction="column"
            align={["center", "center", "center", "space-between"]}
            justify=""
            mt={["50px", "50px", "0px", "0px"]}
          >
            <Flex w="100%" justify="space-around" direction={[, "column", "row", "row"]}>
              <RankStats
                web3React={web3React}
                title="Rank I"
                goodChoices={firstGoodChoice}
                badChoices={firstBadChoice}
                tokensOwed={firstTokensOwed}
              />
              <RankStats
                web3React={web3React}
                title="Rank II"
                goodChoices={finalGoodChoice}
                badChoices={finalBadChoice}
                tokensOwed={finalTokensOwed}
              />
            </Flex>
            <History validated={validated} recentlyAdded={recentlyAdded} />
          </Flex>

          <Box className={styles["size-box"]} ml="5px">
            {/* DAO Faucet */}
            <Flex>

              <Flex
                display={["flex", "flex", "none", "none"]}
                p="5px"
                borderRadius="10px"
                boxShadow="0px 1px 12px 3px var(--shadow)"
                bg={["var(--bg-governance-box)", "var(--bg-governance-box)", "#191D2C", "#191D2C"]}

                w={["92%", "92%", "90%", "95%"]}

                mx="auto"
              >
                <Flex direction="column" w="50%">
                  <Box fontSize="15px" pt="10px" pl="10px">
                    <Text color="none" fontSize="12px" mb={1}>MATIC for DAO members</Text>
                    <Text
                      fontWeight="800"
                      mb="10px"
                      fontSize={["13px", "13px", "15px", "17px"]}
                      color="#16C784"
                    >
                      {countdownValue}
                    </Text>
                  </Box>
                  <Box h="1px" w="98%" bg="var(--box_border)"> </Box>
                  <Box fontSize="15px" pl="10px" mb={5}>
                    <Text
                      textAlign="start"
                      fontSize={["13px", "13px", "15px", "15px"]}
                      color="#909090"
                      mt={2}
                      mb={1}
                    >
                      You already claimed
                    </Text>
                    <Text
                      fontSize={["14px", "14px", "16px", "18px"]}
                      textAlign="start"
                    >
                      {claimed}
                      {" "}
                      MATIC
                    </Text>
                  </Box>
                </Flex>
                <Spacer />
                <Flex
                  width="50%"
                  align="center"
                  justify="center"
                >
                  <Button
                    borderRadius="10px"
                    mb="12px"
                    h="50px"
                    _focus={{ boxShadow: "none" }}
                    variant="outline"
                    colorScheme="green"
                    color="green"
                    boxShadow="0px 1px 12px 3px var(--shadow)"
                    className={styles["claim-matic"]}
                    style={{ width: "135px" } as any}
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        provider = new ethers.providers.Web3Provider(web3React.library.provider);
                        var signer = provider.getSigner();
                      } catch (e) {
                        alert.error(
                          "You must connect your wallet to access the Dashboard.",
                        );
                      }
                      try {
                        const value = await new ethers.Contract(
                          VAULT_ADDRESS,
                          ["function claim() external"],
                          signer,
                        ).claim();
                      } catch (e) {
                        if (e.data && e.data.message) {
                          alert.error(e.data.message);
                        } else {
                          // alert.error('Something went wrong.')
                        }
                      }
                    }}
                  >
                    <Text>Claim MATIC</Text>
                  </Button>
                </Flex>
              </Flex>

              <Flex
                display={["none", "none", "flex", "flex"]}
                className={styles["padding-resp"]}
                direction={["column-reverse", "column-reverse", "column", "column"]}
                bg={["none", "none", "var(--bg-governance-box)", "var(--bg-governance-box)"]}
                borderRadius="10px"
                boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow)", "0px 1px 12px 3px var(--shadow)"]}
                w={["100%", "100%", "100%", "100%"]}
                textAlign={["center", "center", "center", "left"]}
                mx="auto"
              >
                <Flex justify="space-between">
                  <h2 className={styles["dao-title"]} style={{ alignItems: "start" }}>
                    DAO
                    <span
                      className={styles.faucet}
                    >
                      Faucet
                    </span>
                  </h2>
                  <Box fontSize="15px">
                    <Text textAlign="end" fontSize="14px" opacity=".6" color="#909090">
                      You
                      already claimed
                    </Text>
                    <Text
                      fontSize="16px"
                      color=" #909090"
                      fontWeight="600"
                      textAlign="end"
                    >
                      {claimed}
                      {" "}
                      MATIC
                    </Text>
                  </Box>
                </Flex>
                <Box w="95%" textAlign="start" mt="30px">
                  <Box fontSize="13px">
                    <Text fontWeight="800" mb="5px" fontSize="17px" color="#16C784">
                      {countdownValue}
                    </Text>
                    <Text color="#D3D3D3" mb={2}>MATIC for DAO members</Text>
                  </Box>
                </Box>
                <Spacer />
                <Flex
                  width="100%"

                  justifyContent={["center", "center", "center", "right"]}
                >
                  <Button
                    h="45px"
                    px="12px"
                    _focus={{ boxShadow: "none" }}
                    className={styles["claim-matic"]}
                    variant="blue"
                    py="1px"
                    borderRadius="12px"
                    style={{ marginTop: "-60px", "font-size": "1rem" } as any}
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        provider = new ethers.providers.Web3Provider(web3React.library.provider);
                        var signer = provider.getSigner();
                      } catch (e) {
                        alert.show(
                          "You must connect your wallet to access the Dashboard.",
                        );
                      }
                      try {
                        const value = await new ethers.Contract(
                          VAULT_ADDRESS,
                          ["function claim() external"],
                          signer,
                        ).claim();
                      } catch (e) {
                        if (e.data && e.data.message) {
                          alert.error(e.data.message);
                        } else {
                          // alert.error('Something went wrong.')
                        }
                      }
                    }}
                  >

                    Claim MATIC
                  </Button>
                </Flex>
              </Flex>

            </Flex>
            {/* TITLE LEADERBOARD */}
            <Box display={["none", "none", "block", "block"]}>

              <Leaderboard top={daoMembers} />
            </Box>

          </Box>
        </Flex>
        <Box display={["block", "block", "none", "none"]}>
          <Leaderboard top={daoMembers} />
        </Box>
        <Box display={["block", "block", "none", "none"]}>
          <History validated={validated} recentlyAdded={recentlyAdded} />
        </Box>
      </Box>
    </Flex>
  );
}

export default Dashboard;
