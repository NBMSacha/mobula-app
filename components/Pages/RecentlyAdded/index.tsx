import React, { useEffect, useState, useRef } from 'react';
import styles from "./RecentlyAdded.module.scss";
import { Twitter, Globe, ArrowUp, ArrowDown } from "react-feather";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { Text, Heading, Link, Flex, useColorModeValue, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router';
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
import { formatName, getTokenPrice, getTokenPercentage, formatAmount, getUrlFromName } from '../../../helpers/formaters';

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
  const hover = useColorModeValue("white", "var(--chakra-colors-dark_inactive_gainer)")
  const border = useColorModeValue("var(--chakra-colors-grey_border)", "var(--chakra-colors-border_dark_gainer)")

  return (
    <Flex justify="center">
      <div className={styles["dflex"]}>
        <header className={styles["stickyFix"]}>
          <Heading mb={'45px'} mt={'55px'} >Recently Added assets</Heading>
          <Text mb={'40px'} whiteSpace="normal" fontSize={['14px', '14px', '16px', '17px']}>
            Here are the latest listings on Mobula. Do you want to see an asset here?
            <Link variant="primary"
              className={styles.link}
              href='https://app.mobula.finance/list'
            >
              Try to list it.
            </Link>
          </Text>
        </header>
        <TableContainer mb="20px" >
          <Table variant='simple'>
            <Thead borderBottom={`2px solid ${border}`}>
              <Tr>
              {isLargerThan768 && (
                <Th isNumeric>Rank</Th>
              )}
                <Th px="5px" position="sticky" left="0px" bg={isLargerThan768 ? "none" : bg } textAlign="start">Asset</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Change (24h)</Th>
                <Th isNumeric>Market Cap</Th>
                <Th isNumeric>Volume (24h)</Th>
                <Th>Socials</Th>
                <Th>Added</Th>
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
              return ( <Tbody  onClick={() => router.push('/asset/' + getUrlFromName(token.name))}  borderBottom={`2px solid ${border}`} _hover={{ background: hover}}>
                <Tr>
                  {isLargerThan768 && (
                    <Td isNumeric>
                      <Text>{token.rank}</Text>
                  </Td>
                  )}
                  <Td px="5px" position="sticky" left="0px" bg={isLargerThan768 ? "none" : bg } >
                      <Flex align="center">
                          <Image borderRadius="50%" h="30px" src={token.logo} mr="10px"/>
                          <Text maxWidth="200px" overflow="hidden" textOverflow="ellipsis" mr="10px">{token.name}</Text>
                          <Text opacity="0.6">{token.symbol}</Text>
                      </Flex>
                  </Td>
                  <Td px="5px" isNumeric><Text>${getTokenPrice(token.price)}</Text></Td>
                  <Td px="5px" isNumeric>
                    <Text color={getTokenPercentage(token.price_change_24h) > 0.01 ? "green" : "red"}> 
                        {getTokenPercentage(token.price_change_24h) > 0.01 ? <TriangleUpIcon mr="5px"/> : <TriangleDownIcon mr="5px"/>}
                        
                        {getTokenPercentage(token.price_change_24h)}%
                    </Text>
                  </Td>
                  <Td px="5px" isNumeric><Text>${token.market_cap}</Text></Td>
                  <Td px="5px" isNumeric><Text>${token.volume}</Text></Td>
                  <Td py={["0px", "0px", "0px", "30px"]}>
                    <Flex>
                      {token.website && (
                        <Link href={token.website}>
                          <Globe height="30px"  style={{color:"#58667E"}}/>
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
                  <Td px="5px">
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

