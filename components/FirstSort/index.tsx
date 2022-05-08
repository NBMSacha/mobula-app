import React, { useEffect, useState } from "react";
import Token from "../Token";
import { ethers } from "ethers";
import { PROTOCOL_ADDRESS, RPC_URL } from "../../constants";
import { Heading, Text, Flex, Box, Image } from "@chakra-ui/react";
import styles from "./firstsort.module.scss";

function FirstSort() {
  const [tokenDivs, setTokenDivs]: [JSX.Element[], any] = useState([]);
  const [tokenArray, setTokenArray] = useState([]);

  function getFirstSorts() {
    console.log("Starting the first sort");
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const protocolContract = new ethers.Contract(
      PROTOCOL_ADDRESS,
      [
        "function submittedData(address token) public view returns (string)",
        "function getSubmittedTokens() external view returns (address[])",
        "function firstSortVotes(address voter, address token) external view returns (bool)",
      ],
      provider
    );

    protocolContract
      .getSubmittedTokens()
      .catch((err: any) => {
        console.log(err);
        return [];
      })
      .then(async (tokens: any) => {
        const newTokenDivs = [];

        var account: any;

        try {
          const providerWallet = new ethers.providers.Web3Provider(
            (window as any).ethereum
          );
          const accounts = await providerWallet.listAccounts();
          account = accounts[0];
        } catch (e) {}

        let fails = 0;

        console.log("Tokens loaded : " + tokens.length);

        tokens.forEach(async (token: any) => {
          var isAlreadyVoted = false;

          if (account) {
            isAlreadyVoted = await protocolContract.firstSortVotes(
              account,
              token
            );
            console.log("Is already voted : " + isAlreadyVoted);
          }

          const fileAddress = await protocolContract.submittedData(token);

          console.log("Sumbitted data : " + fileAddress);

          try {
            const response = await fetch(
              "https://gateway.ipfs.io/ipfs/" + fileAddress
            );

            const JSONrep: {
              name: string;
              symbol: string;
              contract: string;
              chain: string;
              logo: string;
              description: string;
              audit: string;
              kyc: string;
              twitter: string;
              chat: string;
              website: string;
            } = await response.json();

            if (JSONrep.contract) {
              console.log("Pushing");
              const newDiv = (
                <Token
                  name={JSONrep.name}
                  symbol={JSONrep.symbol}
                  contract={token}
                  logo={JSONrep.logo}
                  description={JSONrep.description}
                  audit={JSONrep.audit}
                  kyc={JSONrep.kyc}
                  twitter={JSONrep.twitter}
                  chat={JSONrep.chat}
                  website={JSONrep.website}
                  isFirstSort={true}
                  alreadyVoted={isAlreadyVoted}
                  key={token + Math.random()}
                  chain={JSONrep.chain}
                />
              );

              setTokenDivs((tokenDivs) => [...tokenDivs, newDiv]);
            } else {
              console.log("Fail");
              fails++;
            }

            if (newTokenDivs.length + fails == tokens.length) {
              //setTokenDivs(newTokenDivs)
            } else {
              console.log("Not done yet.");
            }
          } catch (e) {
            console.log("Error with " + token + " : " + e);
            fails++;
          }
        });
      });
  }

  useEffect(() => {
    getFirstSorts();
  }, []);

  useEffect(() => {
    console.log("Effect : " + tokenDivs.length);
  });

  return (
    <div className="listing">
      <div className="container">
        <header>
          <Heading as="h1" mb={"20px"}>
            First Sort
          </Heading>
          <Text fontSize={["14px", "14px", "16px", "17px"]}>
            The First Sort is a key step of the Protocol. Vote wisely.
            <a
              className={styles.link}
              href="https://docs.mobula.finance/app/sort"
            >
              Learn more here
            </a>
          </Text>
        </header>

        <div className={styles.line}></div>

        <Flex
          paddingTop="60px"
          justifyContent={["space-evenly"]}
          flexDir={["column", "column", "column", "row"]}
          alignItems={["center", "center", "center", "stretch"]}
          flexWrap="wrap"
        >
          {tokenDivs.map((element) => {
            let token = element.props;
            console.log(token);

            return (
              <Box
                w={["90%", "90%", "70%", "40%"]}
                bg="#a3d4f433"
                mb={10}
                borderRadius="10px"
                p="20px"
              >
                <Flex alignItems="center" mb={10}>
                  <Image src={token.logo} h={50} w={50} mr={5} />
                  <Text fontSize={["17px", "18px", "25px", "30px"]}>
                    {token.name}
                  </Text>
                </Flex>
                <Text
                  textAlign="justify"
                  fontSize={["13px", "15px", "15px", "20px"]}
                >
                  WEB3 Game is an unique play-to-earn game that strives to
                  return ownership back to the gamers. Like many of the
                  traditional games, all characters, items, rewards and any of
                  the digital assets that gamers received within in-game are the
                  culmination of the gamers’ effort, time and money.
                </Text>
                <button className="button">Vote</button>
              </Box>
            );
          })}
        </Flex>
        {/* 
        <div className="tokens-div">{tokenDivs}</div> */}
      </div>
    </div>
  );
}

export default FirstSort;
