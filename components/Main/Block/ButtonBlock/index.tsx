import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from '@react-icons/all-files/ai/AiOutlineArrowRight'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { HiOutlineGlobeAlt } from '@react-icons/all-files/hi/HiOutlineGlobeAlt'
import { SiDiscord } from '@react-icons/all-files/si/SiDiscord'
import styles from './ButtonBlock.module.scss';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'
import { X, Settings} from 'react-feather';

function ButtonBlock({ setDisplay, display }) {
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
          <img src='eth.png' className={`${styles['blockchain-logo']} ${styles["eth-btn"]}`} />
          <span className={styles['blockchain-name']}>ETH</span>
        </a>
        <a className={`${styles['blockchain-btn']}  ${styles['bsc-btn']} ${display == 'BNB Smart Chain (BEP20)' ? styles['white'] : ''}`} onClick={() => setDisplay('BNB Smart Chain (BEP20)')}>
          <img src='bnb.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']}>BNB</span>
        </a>
        <a className={`${styles['blockchain-btn']} ${styles['avax-btn']} ${display == 'Avalanche C-Chain' ? styles['white'] : ''}`} onClick={() => setDisplay('Avalanche C-Chain')}>
          <img src='avax.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']}>AVAX</span>
        </a>
        <a className={`${styles['blockchain-btn']} ${styles['matic-btn']} ${display == 'Polygon' ? styles['white'] : ''}`} onClick={() => setDisplay('Polygon')}>
          <img src='matic.png' className={styles['blockchain-logo']} />
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
            <Settings className={styles["colors"]}/>
        </button>
        <div className={styles["input-btn"]}>
            <FiSearch className={styles['loupe']} />
            <input
              // value={token}
              type='text'
              className={styles['input-search']}
              name='search'
              placeholder='Search crypto-asset...'
              // onChange={(e) => setToken(e.target.value)}
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
