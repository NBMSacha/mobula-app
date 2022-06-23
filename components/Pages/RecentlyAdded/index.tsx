import React, { useEffect, useState, useRef } from 'react';
import styles from "./RecentlyAdded.module.scss";
import { Twitter, Globe, ArrowUp, ArrowDown } from "react-feather";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useRouter } from 'next/router';
import BlockchainBtn from "../../Utils/BlockchainBtn"
import { createClient } from '@supabase/supabase-js'
import { Button, useColorMode, IconButton, useColorModeValue, Flex, Box, Text, Heading, Input, Image, Link } from "@chakra-ui/react";
import Widget from "../../Utils/Widget"
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
import { formatName, getTokenPrice, getTokenPercentage, formatAmount, getUrlFromName, getTokenFormattedPrice } from '../../../helpers/formaters';

export default function RecentlyAdded({ tokensBuffer }) {
  console.log(tokensBuffer)
  const [tokens, setTokens] = useState(tokensBuffer || []);
  const [blockchain, setBlockchain] = useState('');
  const [settings, setSettings] = useState({ liquidity: 0, volume: 0, onChainOnly: false, default: true })
  const [widgetVisibility, setWidgetVisibility] = useState(false);
  const router = useRouter();
  const percentageRef = useRef()
  const [widget, setWidget] = useState(false)

  useEffect(() => {
    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )

    supabase
      .from('assets')
      .select('id,name,price_change_24h,volume,symbol,logo,market_cap,price,rank,contracts,blockchains,twitter,website,chat,created_at')
      .gte('liquidity', settings.liquidity)
      .gte('volume', settings.volume)
      .order('created_at', { ascending: false })
      .limit(100).then(r => {
        console.log(r.data)
        setTokens(r.data
          .filter(entry => (entry.contracts.length > 0 || !settings.onChainOnly) && (entry.blockchains?.[0] == blockchain || !blockchain))
          .slice(0, 50))
      });

  }, [settings, blockchain])

  return (
    <Flex justify="center">
      <div className={styles["dflex"]} >
        <Flex>
          <Text display={["flex", "flex", "none", "none"]} mb={'20px'} mt={'25px'}>Recently added</Text>
        </Flex>
        <Flex display={["none", "none", "flex", "flex"]} mb={'50px'} mt={'55px'} fontSize={['12px', '12px', '14px', '14px']} className={styles["stickyFix"]} w="100%" align="end" justify="space-between">
          <Flex direction="column">
            <Heading mb={'15px'} fontSize="24px" fontFamily="Inter">Recently added tokens</Heading>
            <Text whiteSpace="normal" fontSize={['12px', '12px', '14px', '14px']}>
              Latest tokens who got validated by the <span style={{ color: "var(--chakra-colors-blue)" }}>Mobula DAO</span>

            </Text>
          </Flex>
          <Text display={["none", "none", "none", "flex"]}>You can submit your own token (or a token you support) <Link color="blue" ml='5px'>here</Link></Text>
        </Flex>
        <Widget settings={settings} setSettings={setSettings} visible={widgetVisibility} setVisible={setWidgetVisibility} />
        <BlockchainBtn blockchain={blockchain} setBlockchain={setBlockchain} widgetVisibility={widgetVisibility} setWidgetVisibility={setWidgetVisibility} />
        <TableContainer mb="20px" mt="20px">
          <Table variant='simple'>
            <Thead borderTop={`2px solid var(--box_border)`} borderBottom="2px solid var(--box_border) !important" color="var(--text-grey)" fontSize={['12px', '12px', '16px', '16px']}>
              <Tr>
                <Th borderBottom="2px solid var(--box_border) !important" fontSize={['12px', "12px","14px","14px"]} fontFamily="Poppins" textTransform="capitalize" px="5px" position="sticky" left="0px" bg={["var(--background)","var(--background)","var(--background)", 'none']} textAlign="start">Asset</Th>
                <Th borderBottom="2px solid var(--box_border) !important" fontSize={['12px', "12px","14px","14px"]} fontFamily="Poppins" textTransform="capitalize" px="5px" isNumeric>Price</Th>
                <Th borderBottom="2px solid var(--box_border) !important" fontSize={['12px', "12px","14px","14px"]} fontFamily="Poppins" textTransform="capitalize" px="5px" isNumeric>Change (24h)</Th>
                <Th borderBottom="2px solid var(--box_border) !important" fontSize={['12px', "12px","14px","14px"]} fontFamily="Poppins" textTransform="capitalize" px="5px" isNumeric>Market Cap</Th>
                <Th borderBottom="2px solid var(--box_border) !important" fontSize={['12px', "12px","14px","14px"]} fontFamily="Poppins" textTransform="capitalize" px="5px" isNumeric>Volume (24h)</Th>
                <Th borderBottom="2px solid var(--box_border) !important" fontSize={['12px', "12px","14px","14px"]} fontFamily="Poppins" textTransform="capitalize" >Socials</Th>
                <Th borderBottom="2px solid var(--box_border) !important" fontSize={['12px', "12px","14px","14px"]} fontFamily="Poppins" textTransform="capitalize" >Added</Th>
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
              return (<Tbody fontSize={['12px', '12px', '16px', '16px']} py="5px" onClick={() => router.push('/asset/' + getUrlFromName(token.name))}  _hover={{ background: "var(--box_active)", cursor:"pointer" }}>
                <Tr>
                  <Td borderBottom="1px solid var(--box_border) !important" px="5px" position="sticky" py="5px" left="0px" bg={["var(--background)", "var(--background)", "none"]} >
                    <Flex align="center">
                      <Image borderRadius="50%" h={["25px", "25px", "30px", "30px"]} src={token.logo} mr="10px" />
                      <Text maxWidth="200px" overflow="hidden" textOverflow="ellipsis" mr="10px">{token.name}</Text>
                      <Text opacity="0.6">{token.symbol}</Text>
                    </Flex>
                  </Td>
                  <Td borderBottom="1px solid var(--box_border) !important" px="5px" py="5px" isNumeric><Text>{getTokenFormattedPrice(token.price, '$', { justify: 'right', marginTop: 'auto' })}</Text></Td>
                  <Td borderBottom="1px solid var(--box_border) !important" px="5px" py="5px" isNumeric>
                    <Text color={getTokenPercentage(token.price_change_24h) > 0.01 ? "green" : "red"}>
                      {getTokenPercentage(token.price_change_24h) > 0.01 ? <TriangleUpIcon mr="5px" /> : <TriangleDownIcon mr="5px" />}
                      {getTokenPercentage(token.price_change_24h)}%
                    </Text>
                  </Td>
                  <Td borderBottom="1px solid var(--box_border) !important" px={"5px"} py="5px" isNumeric><Text>${formatAmount(token.market_cap)}</Text></Td>
                  <Td borderBottom="1px solid var(--box_border) !important" px="5px" py="5px" isNumeric><Text>${formatAmount(token.volume)}</Text></Td>
                  <Td borderBottom="1px solid var(--box_border) !important" py={["5px", "5px", "20px", "20px"]}>
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
                  <Td borderBottom="1px solid var(--box_border) !important" px="5px">
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

