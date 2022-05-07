import React from "react";
import { useState } from "react";
import Token from "../Token";
import { ethers } from "ethers";
import { PROTOCOL_ADDRESS, RPC_URL } from "../../constants";
import { Heading, Text, Flex, Box, Image } from "@chakra-ui/react";
import styles from "../FirstSort/firstsort.module.scss";

const FirstSortTest = ({}) => {
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
          <Box
            w={["90%", "90%", "70%", "40%"]}
            bg="#a3d4f433"
            mb={10}
            borderRadius="10px"
            p="20px"
          >
            <Flex alignItems="center" mb={10}>
              <Image src="/avax.png" h={50} w={50} mr={5} />
              <Text fontSize="30px">Title</Text>
            </Flex>
            <Text
              textAlign="justify"
              fontSize={["13px", "15px", "15px", "20px"]}
            >
              WEB3 Game is an unique play-to-earn game that strives to return
              ownership back to the gamers. Like many of the traditional games,
              all characters, items, rewards and any of the digital assets that
              gamers received within in-game are the culmination of the gamers’
              effort, time and money.
            </Text>
            <button className="button">Vote</button>
          </Box>
          <Box
            w={["90%", "90%", "70%", "40%"]}
            bg="#a3d4f433"
            mb={10}
            borderRadius="10px"
            p="20px"
          >
            <Flex alignItems="center" mb={10}>
              <Image src="/avax.png" h={50} w={50} mr={5} />
              <Text fontSize="30px">Title</Text>
            </Flex>
            <Text
              textAlign="justify"
              fontSize={["13px", "15px", "15px", "20px"]}
            >
              WEB3 Game is an unique play-to-earn game that strives to return
              ownership back to the gamers. Like many of the traditional games,
              all characters, items, rewards and any of the digital assets that
              gamers received within in-game are the culmination of the gamers’
              effort, time and money.
            </Text>
            <button className="button" onClick={() => {}}>
              Vote
            </button>
          </Box>
        </Flex>
      </div>
    </div>
  );
};

export default FirstSortTest;

export async function getServerSideProps(context) {
  //get data here
  return {
    props: {}, // will be passed to the page component as props
  };
}
