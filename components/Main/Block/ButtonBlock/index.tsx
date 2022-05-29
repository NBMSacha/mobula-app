import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from '@react-icons/all-files/ai/AiOutlineArrowRight'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { HiOutlineGlobeAlt } from '@react-icons/all-files/hi/HiOutlineGlobeAlt'
import { SiDiscord } from '@react-icons/all-files/si/SiDiscord'
import styles from './ButtonBlock.module.scss';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'
import { X, Settings } from 'react-feather';
import { createClient } from '@supabase/supabase-js'

async function updateSearch(search: string, supabase: any, setResults: any) {

  if (search) {
    const { data: names } = await supabase
      .from('assets')
      .select('*')
      .or('name.ilike.' + search + '%,symbol.ilike.' + search + '%,name.ilike.' + search)
      .order('market_cap', { ascending: false })
      .limit(10)

    if (names && names.length > 0) {
      setResults(names)
    }

    const { data: symbols } = await supabase
      .from('assets')
      .select()
      .match({ symbol: search.toUpperCase() })

    if (symbols && symbols.length > 0) {
      console.log('We found it', symbols)
      setResults(symbols)
    }

  }

}

function ButtonBlock({ setDisplay, display, setResults }) {
  const [search, setSearch]: [string | null, Function] = useState();
  const supabase = createClient(
    'https://ylcxvfbmqzwinymcjlnx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
  )

  useEffect(() => {
    if (search && search != '') {
      setDisplay('search')
      updateSearch(search, supabase, setResults)
    } else {
      setResults([])
      setDisplay('Top 100')
    }
  }, [search])

  function lockerButton() {
    const rectangle = document.getElementById('rectangle')
    const cercle = window.document.getElementById('cercle')
    if (cercle.style.transform === 'translateX(0%)') {
      cercle.style.transform = 'translateX(135%)'
      rectangle.style.background = '#24274A'
      cercle.style.transition =
        'transform 150ms ease-in, background 150ms ease-in'
    } else {
      cercle.style.transform = 'translateX(0%)'
      rectangle.style.background = '#58667E'
      cercle.style.transition =
        'transform 150ms ease-out, background 150ms ease-out'
    }
  }

  return (
    <div className={styles['main-blockchain-container']}>
      <div className={styles['blockchain-container']}>
        <a className={styles[(display == 'Top 100' ? 'select-button-white' : 'select-button')]} onClick={() => setDisplay('Top 100')}>Top 100</a>
        <a className={styles[(display == 'My Assets' ? 'select-button-white' : 'select-button')]} onClick={() => setDisplay('My Assets')}>My Assets</a>
        <a className={`${styles['blockchain-btn']} ${styles['eth-btn-block']} ${display == 'Ethereum' ? styles['white'] : ''}`} onClick={() => setDisplay('Ethereum')}>
          <img src='ethereum.png' className={`${styles['blockchain-logo']} ${styles["eth-btn"]}`} />
          <span className={styles['blockchain-name']}>ETH</span>
        </a>
        <a className={`${styles['blockchain-btn']}  ${styles['bsc-btn']} ${display == 'BNB Smart Chain (BEP20)' ? styles['white'] : ''}`} onClick={() => setDisplay('BNB Smart Chain (BEP20)')}>
          <img src='bnb.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']}>BNB</span>
        </a>
        <a className={`${styles['blockchain-btn']} ${styles['avax-btn']} ${display == 'Avalanche C-Chain' ? styles['white'] : ''}`} onClick={() => setDisplay('Avalanche C-Chain')}>
          <img src='avalanche.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']}>AVAX</span>
        </a>
        <a className={`${styles['blockchain-btn']} ${styles['matic-btn']} ${display == 'Polygon' ? styles['white'] : ''}`} onClick={() => setDisplay('Polygon')}>
          <img src='polygon.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']}>MATIC</span>
        </a>
        <a
          className={`${styles['blockchain-btn']} ${styles['blockchain-btn-three']}`}
        >
          <img src='harmony.png' className={styles['three-blockchain-logo']} />
          <img src='optimism.png' className={styles['three-blockchain-logo']} />
          <img src='arbitrum.png' className={styles['three-blockchain-logo']} />
          <span>
            <AiOutlineArrowRight className={styles['marginFa']} />
          </span>
          <span className={`${styles['mienai']} ${styles['blockchain-name']}`}>Other Chains</span>

        </a>

        <button className={styles["params"]}>
          <Settings className={styles["colors"]} />
        </button>
        <div className={styles["input-btn"]}>
          <FiSearch className={styles['loupe']} />
          <input
            // value={token}
            type='text'
            className={styles['input-search']}
            name='search'
            placeholder='Search crypto-asset...'
            onChange={(e) => setSearch(e.target.value)}
            id='search'
            autoFocus
          ></input>
          {/* <X className={styles['X']} onClick={() => props.setTrigger(false)} /> */}
        </div>

      </div>
    </div >
  )
}

export default ButtonBlock
