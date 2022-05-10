import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from '@react-icons/all-files/ai/AiOutlineArrowRight'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { HiOutlineGlobeAlt } from '@react-icons/all-files/hi/HiOutlineGlobeAlt'
import { SiDiscord } from '@react-icons/all-files/si/SiDiscord'
import styles from './ButtonBlock.module.scss'

function ButtonBlock(props: any) {
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
        <a className={styles['select-button-white']}>Top 100</a>
        <a className={styles['select-button']}>My Assets</a>
        <a className={`${styles['blockchain-btn']} ${styles['eth-btn-block']}`}>
          <img src='eth.png' className={ `${styles['blockchain-logo']} ${styles["eth-btn"]}` }/>
          <span className={styles['blockchain-name']}>ETH</span>
        </a>
        <a className={`${styles['blockchain-btn']}  ${styles['bsc-btn']}`}>
          <img src='bnb.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']}>BNB</span>
        </a>
        <a className={`${styles['blockchain-btn']} ${styles['avax-btn']}`}>
          <img src='avax.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']}>AVAX</span>
        </a>
        <a className={`${styles['blockchain-btn']} ${styles['matic-btn']}`}>
          <img src='matic.png' className={styles['blockchain-logo']} />
          <span className={styles['blockchain-name']}>MATIC</span>
        </a>
        <a
          className={`${styles['blockchain-btn']} ${styles['blockchain-btn-three']}`}
        >
          <img src='bnb.png' className={styles['three-blockchain-logo']} />
          <img src='eth.png' className={styles['three-blockchain-logo']} />
          <img src='avax.png' className={styles['three-blockchain-logo']} />
          <span>
            <AiOutlineArrowRight className={styles['marginFa']} />
          </span>
        </a>
        <div className={styles['onChain-btn-mobile']}>
          <span className={styles['fullOnChain']}>On-chain only</span>
          <a
            className={styles['rectangle']}
            id='rectangle'
            onClick={() => lockerButton()}
          >
            <div className={styles['rond']} id='cercle'></div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ButtonBlock
