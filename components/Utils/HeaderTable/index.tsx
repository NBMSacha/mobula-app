import React, { useEffect, useState, useRef } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import styles from './Top.module.scss';
import Token from "../Token";
import BigNumber from 'bignumber.js';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router';
import Widget from "../../Utils/Widget"
import { Button, useColorMode, IconButton, useColorModeValue, Flex, Box, Text, Heading, Input, Image, } from "@chakra-ui/react";
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
import ConnectWallet from "../../Utils/ConnectWallet"
import Data from "../../Utils/Data";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"

  export default function Top({title, setOrderBy, textResponsive, display, orderBy, getTokensToDisplay}) {

    return (
        <>
          <TableContainer bg={title === "Trendings" || title === "Advanced Settings" ? "var(--background)" : "var(--table)"} display="flex" flexDirection="column" alignItems="center">
          {/* <Data /> */}
          <Table style={{ minWidth: "1220px" }} className={styles["table-style"]}>

            <Thead textTransform="capitalize" fontFamily="Inter" borderTop={`2px solid var(--box_border)`} borderBottom={`2px solid var(--box_border)`} color="var(--text-grey)">
              <Tr className={styles[""]}>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" maxWidth="100px" isNumeric className={`${styles["ths"]} ${styles["removes"]}`} minWidth={["220px", "220px", "220px", ""]}>
                  Rank
                  <IconButton ml="3px" fontSize="10px" aria-label='Search database' color="green" _focus={{ boxShadow: "none" }} icon={<TriangleUpIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'rank', ascending: false })
                    }} />
                  <IconButton ml="1px" fontSize="10px" aria-label='Search database' color="red" _focus={{ boxShadow: "none" }} icon={<TriangleDownIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'rank', ascending: true })
                    }} />
                </Th>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" px={["15px", "15px", "20px", "20px"]} className={`${styles["ths"]} ${styles["asset-title-start"]}`} bg={title === "Trendings" || title === "Advanced Settings" ? "var(--background)" : "var(--table)"} zIndex="33" >
                  Asset
                </Th>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" isNumeric p={['15px 5px', '15px 5px', 6, 6]} px={["5px", "5px", "20px", "20px"]} className={`${styles["ths"]} ${styles["price-title-center"]}`}>
                  Price
                  <IconButton ml="3px" fontSize="10px" aria-label='Search database' color="green" _focus={{ boxShadow: "none" }} icon={<TriangleUpIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'price', ascending: false })
                    }} />
                  <IconButton ml="1px" fontSize="10px" aria-label='Search database' color="red" _focus={{ boxShadow: "none" }} icon={<TriangleDownIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'price', ascending: true })
                    }} />
                </Th>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" isNumeric className={`${styles["ths"]} ${styles["nowrap"]}`} px={["5px", "5px", "20px", "20px"]} >
                  {textResponsive ? "24h %" : "Change (24h)"}
                  <IconButton ml="3px" fontSize="10px" aria-label='Search database' color="green" _focus={{ boxShadow: "none" }} icon={<TriangleUpIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'price_change_24h', ascending: false })
                    }}
                  />
                  <IconButton ml="1px" fontSize="10px" aria-label='Search database' color="red" _focus={{ boxShadow: "none" }} icon={<TriangleDownIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'price_change_24h', ascending: true })
                    }} />
                </Th>
                <Th fontSize={['12px', "12px", "14x", "14px"]} fontFamily="Inter" textTransform="capitalize" isNumeric className={`${styles["ths"]}`}>
                  Market cap
                  <IconButton ml="3px" fontSize="10px" aria-label='Search database' color="green" _focus={{ boxShadow: "none" }} icon={<TriangleUpIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'market_cap', ascending: false })
                    }} />
                  <IconButton ml="1px" fontSize="10px" aria-label='Search database' color="red" _focus={{ boxShadow: "none" }} icon={<TriangleDownIcon />} onClick={() => {
                    setOrderBy({ type: 'market_cap', ascending: true })
                  }} />
                </Th>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" isNumeric className={`${styles["ths"]} ${styles["nowrap"]}`}>
                  {display == 'My Assets' ? 'Balance' : 'Volume (24h)'}
                  <IconButton ml="3px" fontSize="10px" aria-label='Search database' color="green" _focus={{ boxShadow: "none" }} icon={<TriangleUpIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'volume', ascending: false })
                    }} />
                  <IconButton ml="1px" fontSize="10px" aria-label='Search database' color="red" _focus={{ boxShadow: "none" }} icon={<TriangleDownIcon />}
                    onClick={() => {
                      setOrderBy({ type: 'volume', ascending: true })
                    }} />
                </Th>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" className={`${styles["ths"]} ${styles["center-social"]}`}>
                  Socials
                </Th>
                <Th fontSize={['12px', "12px", "14px", "14px"]} fontFamily="Inter" textTransform="capitalize" className={`${styles["ths"]} ${styles["chart-title-center"]}`}>
                  {title !== "Trendings" ? "Chart" : "Added"}
                </Th>
              </Tr>
            </Thead>
            
            <>
              {
                (orderBy ? getTokensToDisplay(orderBy) : getTokensToDisplay()).map((token: any, index: number) => token ? 
                <Token
                  key={token.id || token.balance + token.name}
                  title={title}
                  id={token.id}
                  created_at={token.created_at}
                  name={token.name}
                  symbol={token.symbol}
                  contracts={token.contracts}
                  blockchains={token.blockchains}
                  pairs={token.pairs}
                  logo={token.logo}
                  twitter={token.twitter}
                  chat={token.chat}
                  discord={token.discord}
                  website={token.website}
                  market_cap={token.market_cap}
                  volume={token.volume || ((new BigNumber(token.balance)).div(new BigNumber(10).pow(token.decimals))).toFixed(2)}
                  price_change_24h={token.price_change_24h}
                  price_change_7d={token.price_change_7d}
                  price={token.price}
                  rank_change_24h={token.rank_change_24h}
                  rank={token.rank}
                  isMyAsset={display == 'My Assets'}
                /> : <></>)
              }
            </>
          </Table>
        </TableContainer>
        </>
    )
}