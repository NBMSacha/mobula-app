import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'
import { X } from 'react-feather';
import styles from './searchdiv.module.scss'
import { Button, useColorMode, IconButton, useColorModeValue, Flex, Box, Text, Heading, Input, Image, } from "@chakra-ui/react";
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
    return (
      <div ref={props.wrapperRef} >
        <Box className={styles['search-div']} bg={bg}>
          <div className={styles["search-flex"]}>
            <FiSearch className={styles['loupe']} />
            <Input
              color="none"
              value={token}
              _placeholder={{color:"none"}}
              type='text'
              className={styles['search-input']}
              name='search'
              placeholder='Search an asset'
              onChange={(e) => setToken(e.target.value)}
              id='search'
              autoFocus
            />
            <X className={styles['X']} onClick={() => props.setTrigger(false)} />
          </div>

          <div className={styles['search-token']}>
            <h3>Trending</h3>
            {results.map((result) => {
              return (
                <div >
                  {result.name != search ? (
                    <div
                      className={styles['token-infos-search']}
                      key={Math.random()}
                      onClick={() => {
                        props.setTrigger(false)
                        router.push('/asset/' + getUrlFromName(result.name))
                      }}
                    >
                      <img src={result.logo} className={styles['token-logos']} />
                      <span
                        className={`${styles['token-names']} ${styles['font-char']}`}
                      >
                        {result.name}
                      </span>
                      {/* <span
                      className={`${styles['token-symbols']} ${styles['font-char']}`}
                    >
                      {result.symbol}
                    </span> */}
                      {getTokenPercentage(result.price_change_24h) >= 0.1 ? (
                        <>

                          <span className={`${styles['token-rank']} ${styles['green']}`}><ArrowUp className={styles["arrowUp"]} />{getTokenPercentage(result.price_change_24h)}%</span>
                        </>
                      ) : (
                        <>
                          <span className={`${styles['token-rank']} ${styles['red']}`}>
                            {getTokenPercentage(result.price_change_24h) == 0 || isNaN(parseInt(result.price_change_24h)) ? (
                              <span className={styles["result-nul"]}>
                                {getTokenPercentage(result.price_change_24h)}
                              </span>
                            ) : (
                              <>
                                <ArrowDown className={styles["arrowUp"]} />
                                {getTokenPercentage(result.price_change_24h)}%
                              </>

                            )}
                          </span>
                        </>
                      )}

                    </div>
                  ) : (
                    <div>Text</div>
                  )}

                </div>
              )
            })}
          </div>
        </Box>
      </div>
    )
  } else {
    return <></>
  }
}

export default SearchDiv