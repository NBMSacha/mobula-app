import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'
import { X } from 'react-feather';
import styles from './searchdiv.module.scss'
import { Heading, Text, Flex, Box, Image } from "@chakra-ui/react";
import { getUrlFromName } from '../../../../helpers/formaters'
import { useRouter } from 'next/router'

function SearchDiv(props: any) {
  const router = useRouter();
  const [token, setToken] = useState('')
  const [results, setResults] = useState([
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

  async function updateSearch(search: string, supabase: any, setResults: any) {
    const { data: names } = await supabase
      .from('assets')
      .select()
      .or('name.ilike.' + search + '%,symbol.ilike.' + search + '%,name.ilike.' + search,)
      .order('market_cap', { ascending: false })
      .limit(10)

    if (names && names.length > 0) {
      if (search == token) {
        setResults(names)
      }
      //names.concat(symbols))
    }

    const { data: symbols } = await supabase
      .from('assets')
      .select()
      .match({ symbol: search.toUpperCase() })

    if (symbols && symbols.length > 0) {
      console.log('We found it', symbols)
      if (search == token) {
        setResults(symbols.concat(names))
      }
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
    return (
      <div  ref={props.wrapperRef}>
        <div className={styles['search-div']}>
          <div className={styles["search-flex"]}>
            <FiSearch className={styles['loupe']} />
            <input
              value={token}
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
                <div
                  className={styles['token-infos-search']}
                  key={Math.random()}
                  onClick={() => router.push('/asset/' + getUrlFromName(result.name))}
                >
                  <img src={result.logo} className={styles['token-logos']} />
                  <span
                    className={`${styles['token-names']} ${styles['font-char']}`}
                  >
                    {result.name}
                  </span>
                  <span
                    className={`${styles['token-symbols']} ${styles['font-char']}`}
                  >
                    {result.symbol}
                  </span>
                  <span className={styles['token-rank']}>#{result.rank}</span>
                </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}

export default SearchDiv
