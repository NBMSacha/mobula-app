import React, { useEffect, useState, useRef } from 'react';
import styles from "./RecentlyAdded.module.scss";
import { Twitter, Globe, ArrowUp, ArrowDown } from "react-feather";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useRouter} from 'next/router';
import { AiOutlineArrowLeft } from '@react-icons/all-files/ai/AiOutlineArrowLeft'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { HiOutlineGlobeAlt } from '@react-icons/all-files/hi/HiOutlineGlobeAlt'
import { SiDiscord } from '@react-icons/all-files/si/SiDiscord'
import BlockchainBtn from "../../Utils/BlockchainBtn"
import { Sliders } from "react-feather"
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'
import { X, Settings } from 'react-feather';
import { createClient } from '@supabase/supabase-js'
import { Button, useColorMode, IconButton, useColorModeValue, Flex, Box, Text, Heading, Input, Image, Link } from "@chakra-ui/react";
import ButtonBlock from "../Main/Block/ButtonBlock"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useMediaQuery } from '@chakra-ui/react'
import { formatName, getTokenPrice, getTokenPercentage, formatAmount, getUrlFromName, getTokenFormattedPrice } from '../../../helpers/formaters';

export default function RecentlyAdded({ tokens }) {
  const router = useRouter();
  const [textResponsive, setTextResponsive] = useState(false);
  const percentageRef = useRef()

  useEffect(() => {
    if (percentageRef && percentageRef.current) {
      if ((window.matchMedia("(max-width: 768px)").matches)) {
        setTextResponsive(true)
      } else {
        setTextResponsive(false)
      }
    }
  }, [])

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
  const shadow = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
  const btn_bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
  const hover = useColorModeValue("white", "var(--chakra-colors-dark_inactive_gainer)")
  const border = useColorModeValue("var(--chakra-colors-grey_border)", "var(--chakra-colors-border_dark_gainer)")
  const [display, setDisplay ] = useState("ntm FDP")

  return (
    <Flex justify="center">
      <div className={styles["dflex"]} >
        <Flex>
          <Text display={["flex", "flex", "none", "none"]} mb={'20px'} mt={'25px'}>Recently added</Text>
        </Flex>
        <Flex display={["none", "none", "flex", "flex"]} mb={'50px'} mt={'55px'} fontSize={['12px', '12px', '14px', '14px']} className={styles["stickyFix"]} w="100%" align="end" justify="space-between">
          <Flex direction="column">
            <Heading  mb={'15px'}  fontSize="24px" fontFamily="Inter">Recently added tokens</Heading>
            <Text  whiteSpace="normal" fontSize={['12px', '12px', '14px', '14px']}>
            See here the tokenq who got validated by the <span style={{color:"var(--chakra-colors-blue)"}}>Mobula DAO</span>
        
            </Text>
          </Flex>
          See here the lists token who got validated by the Mobula DAO
        </Flex>
        <BlockchainBtn />
        <TableContainer mb="20px" >
          <Table variant='simple'>
            <Thead fontSize={['12px', '12px', '16px', '16px']} borderBottom={`2px solid ${border}`}>
              <Tr>
                {isLargerThan768 && (
                  <Th py="5px" isNumeric>Rank</Th>
                )}
                <Th px="5px" position="sticky" left="0px" bg={isLargerThan768 ? "none" : bg} textAlign="start">Asset</Th>
                <Th px="5px" isNumeric>Price</Th>
                <Th px="5px" isNumeric>Change (24h)</Th>
                <Th px="5px" isNumeric>Market Cap</Th>
                <Th px="5px" isNumeric>Volume (24h)</Th>
                <Th >Socials</Th>
                <Th >Added</Th>
              </Tr>
            </Thead>
            {tokens.map((token: any) => {

              let date = new Date(token.created_at);
              let seconds = date.getTime();
              let postedDate = Math.round((Date.now() - seconds) / 1000);
              let format = "";
              if (postedDate < 60) {
                format = "seconds";
              }
              else if (60 <= postedDate && postedDate < 120) {
                format = "minute"
              }
              else if (120 <= postedDate && postedDate < 3600) {
                format = "minutes"
              }
              else if (3600 <= postedDate && postedDate < 7200) {
                format = "hour"
              }
              else if (7200 <= postedDate && postedDate < 86400) {
                format = "hours"
              }
              else if (86400 <= postedDate && postedDate < 172800) {
                format = "day"
              }
              else if (172800 <= postedDate) {
                format = "days"
              }
              return (<Tbody fontSize={['12px', '12px', '16px', '16px']} py="5px"  onClick={() => router.push('/asset/' + getUrlFromName(token.name))} borderBottom={`2px solid ${border}`} _hover={{ background: hover }}>
                <Tr>
                  {isLargerThan768 && (
                    <Td isNumeric>
                      <Text>{token.rank}</Text>
                    </Td>
                  )}
                  <Td px="5px" position="sticky" py="5px" left="0px" bg={isLargerThan768 ? "none" : bg} >
                    <Flex align="center">
                      <Image borderRadius="50%" h={["25px", "25px", "30px", "30px"]} src={token.logo} mr="10px" />
                      <Text maxWidth="200px" overflow="hidden" textOverflow="ellipsis" mr="10px">{token.name}</Text>
                      <Text opacity="0.6">{token.symbol}</Text>
                    </Flex>
                  </Td>
                  <Td px="5px" py="5px" isNumeric><Text>{getTokenFormattedPrice(token.price, '$', { justify: 'right', marginTop: 'auto' })}</Text></Td>
                  <Td px="5px" py="5px" isNumeric>
                    <Text color={getTokenPercentage(token.price_change_24h) > 0.01 ? "green" : "red"}>
                      {getTokenPercentage(token.price_change_24h) > 0.01 ? <TriangleUpIcon mr="5px" /> : <TriangleDownIcon mr="5px" />}

                      {getTokenPercentage(token.price_change_24h)}%
                    </Text>
                  </Td>
                  <Td px={"5px"} py="5px" isNumeric><Text>${token.market_cap}</Text></Td>
                  <Td px="5px" py="5px" isNumeric><Text>${token.volume}</Text></Td>
                  <Td py={["5px", "5px", "20px", "20px"]}>
                    <Flex>
                      {token.website && (
                        <Link href={token.website}>
                          <Globe height="30px" style={{ color: "#58667E" }} />
                        </Link>
                      )}
                      {token.twitter && (
                        <Link href={token.twitter}>
                          <Image h="30px" minWidth="30px" w="30px" ml="3px" src="/new-twitter.png" />
                        </Link>
                      )}
                      {token.discord && (
                        <Link href={token.discord}>
                          <Image h="30px" minWidth="30px" ml="3px" src="/new-discord.png" />
                        </Link>
                      )}
                    </Flex>
                  </Td>
                  <Td  px="5px">
                    {format == "seconds" && <span>{postedDate} seconds ago</span>}
                    {format == "minute" && <span>{Math.floor(postedDate / 60)} minute ago</span>}
                    {format == "minutes" && <span>{Math.floor(postedDate / 60)} minutes ago</span>}
                    {format == "hour" && <span>{Math.floor(postedDate / 3600)} hour ago</span>}
                    {format == "hours" && <span>{Math.floor(postedDate / 3600)} hours ago</span>}
                    {format == "day" && <span>{Math.floor(postedDate / 86400)} day ago</span>}
                    {format == "days" && <span>{Math.floor(postedDate / 86400)} days ago</span>}
                  </Td>
                </Tr>
              </Tbody>
              )
            })}
          </Table>
        </TableContainer>
      </div>
    </Flex>
  )
}

