import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import styles from './SearchDiv.module.css';
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";

async function updateSearch(search: string, supabase: any, setResults: any) {
    const { data: names } = await supabase
        .from('assets')
        .select()
        .textSearch('name', `'` + search + `'`)

    // const { data: symbols } = await supabase
    //     .from('assets')
    //     .select()
    //     .textSearch('symbol', `'` + search + `'`)

    if (names && names.length > 0) {
        setResults(names)//names.concat(symbols))
    }
}

function SearchDiv(props: any) {
    const [token, setToken] = useState('')
    const [results, setResults] = useState([{
        name: '????',
        symbol: '??',
        rank: '???',
        logo: ''

    }, {
        name: '????',
        symbol: '??',
        rank: '???',
        logo: ''

    }, {
        name: '????',
        symbol: '??',
        rank: '???',
        logo: ''

    }, {
        name: '????',
        symbol: '??',
        rank: '???',
        logo: ''
    }, {
        name: '????',
        symbol: '??',
        rank: '???',
        logo: ''
    }]);

    const supabase = createClient(
        "https://ylcxvfbmqzwinymcjlnx.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )

    useEffect(() => {
        updateSearch(token, supabase, setResults)
    }, [token]);

    if (props.trigger) {
        return <div ref={props.wrapperRef}>
           
            <div className={styles['search-div']}>
                <FiSearch className="loupe" />
                <input
                    value={token}
                    type="text" className={styles['search-input']}
                    name="search" placeholder="Search an asset"
                    onChange={(e) => setToken(e.target.value)}
                />
                <div className={styles['search-token']}>
                    <h3>Trending</h3>
                    {results.map(result => {
                        return <td className={styles["token-infos-search"]}>
                            <img src={result.logo} className={styles["token-logos"]} />
                            <span className={`${styles["token-names"]} ${styles["font-char"]}`}>{result.name}</span>
                            <span className={`${styles["token-symbols"]} ${styles["font-char"]}`}>{result.symbol}</span>
                            <span className={styles["token-rank"]}>#{result.rank}</span>
                        </td>
                    })}
                    
                </div>

            </div>
            
        </div >
    } else {
        return <></>;
    }
}

export default SearchDiv;