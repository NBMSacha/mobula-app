import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'
import { X } from 'react-feather';
import styles from './searchdiv.module.scss'
import { Button, useColorMode, IconButton, useColorModeValue, Flex, Box, Text, Heading, Input, Image, Link } from "@chakra-ui/react";
import { getUrlFromName, getTokenPrice, getTokenPercentage } from '../../../../../helpers/formaters'
import { useRouter } from 'next/router'
import { Twitter, Globe, ArrowUp, ArrowDown } from "react-feather";

function SearchDiv(props: any) {
  const router = useRouter();
  const [token, setToken] = useState('')
  const [search, setSearch] = useState('')
  const [results, setResults]: [any, any] = useState([
    {
      name: '????',
      symbol: '??',
      rank: '???',
      logo: '',
      id: '',
    },
    {
      name: '????',
      symbol: '??',
      rank: '???',
      logo: '',
      id: '',
    },
    {
      name: '????',
      symbol: '??',
      rank: '???',
      logo: '',
    },
    {
      name: '????',
      symbol: '??',
      rank: '???',
      logo: '',
      id: '',
    },
    {
      name: '????',
      symbol: '??',
      rank: '???',
      logo: '',
      id: '',
    },
  ])

  console.log(getTokenPercentage(results.price_change_24h))

  async function updateSearch(search: string, supabase: any, setResults: any) {
    const { data: names } = await supabase
      .from('assets')
      .select()
      .or('name.ilike.' + search + '%,symbol.ilike.' + search + '%,name.ilike.' + search,)
      .order('market_cap', { ascending: false })
      .limit(10)

    if (names && names.length > 0) {
      setResults(names)
    }

  }

  const supabase = createClient(
    'https://ylcxvfbmqzwinymcjlnx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
  )

  useEffect(() => {
    updateSearch(token, supabase, setResults)
  }, [token])

  useEffect(() => {
    console.log(results)
  }, [results])

  if (props.trigger) {


    const bg = useColorModeValue("bg_white", "dark_primary")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const border = useColorModeValue("#E5E5E5", "var(--chakra-colors-dark_border)")
    const hover = useColorModeValue("white", "var(--chakra-colors-dark_inactive_gainer)")
    return (
      <div ref={props.wrapperRef} >
        <Box className={styles['search-div']} h={["100vh", "100vh", "400px", "400px"]} w="305px" boxShadow={`1px 2px 10px ${shadow}`} bg={bg} borderRadius="12px">
          <div className={styles["search-flex"]}>
            <FiSearch className={styles['loupe']} style={{ width: "40px", marginLeft: "10px", marginRight: "10px" }} />
            <Input
              color="none"
              value={token}
              _placeholder={{ color: "none" }}
              type='text'
              className={styles['search-input']}
              name='search'
              placeholder='Search an asset'
              onChange={(e) => setToken(e.target.value)}
              id='search'
              autoFocus
            />
            <X className={styles['X']} onClick={() => props.setTrigger(false)} style={{ width: "40px", marginRight: "10px" }} />
          </div>

          <Flex direction="column" className={styles['search-token']}>


            {token ? (
              <>
                {results.map((result) => {
                  return (

                    <Flex _hover={{ background: hover }}>

                      {result.name != search ? (
                        <div
                          className={styles['token-infos-search']}
                          key={Math.random()}
                          onClick={() => {
                            props.setTrigger(false)
                            router.push('/asset/' + getUrlFromName(result.name))
                          }}
                        >
                          <Image h="30px" src={result.logo} className={styles['token-logos']} />
                          <span
                            className={`${styles['token-names']} ${styles['font-char']}`} style={{ fontSize: "13px" }}
                          >
                            {result.name}
                          </span>
                          <span
                            className={`${styles['token-names']} ${styles['font-char']}`} style={{ fontSize: "13px", opacity: ".6" }}
                          >
                            {result.symbol}
                          </span>
                          {/* <span
                                                                        className={`${styles['token-symbols']} ${styles['font-char']}`}
                                                                      >
                                                                        {result.symbol}
                                                                      </span> */}



                        </div>
                      ) : (
                        <div>Text</div>
                      )}

                    </Flex>
                  )
                })}
                <Flex direction="column" ml="20px" mt="20px" mb="30px">
                  <Text fontSize="13px" mb="10px">You don't find your asset ?</Text>
                  <Link href="/list" target="_blank" _hover={{ textDecoration: "none" }}>
                    <Flex bg="blue" align="center" justify="center" borderRadius="10px" padding="5px 10px" w="120px">
                      <Text fontSize="12px">List an asset</Text>
                    </Flex>
                  </Link>
                </Flex>
              </>

            ) : (
              <Flex direction="column" ml="20px" mt="20px">
                <Text fontSize="13px" mb="10px">You don't find your asset ?</Text>
                <Link href="/list" target="_blank" _hover={{ textDecoration: "none" }}>
                  <Flex bg="blue" align="center" justify="center" borderRadius="10px" padding="5px 10px" w="120px">
                    <Text fontSize="12px">List an asset</Text>
                  </Flex>
                </Link>
              </Flex>
            )}




          </Flex>
        </Box>
      </div>
    )
  } else {
    return <></>
  }
}

export default SearchDiv
