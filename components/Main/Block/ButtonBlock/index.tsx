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
    <div className='main-blockchain-container'>
      <div className='blockchain-container'>
        <a className={styles['select-button-white']}>Top 100</a>
        <a className={styles['select-button']}>My Assets</a>
        <a className={`${styles['blockchain-btn']} ${styles['eth-btn-block']}`}>
          <img src='eth.png' className='blockchain-logo eth-btn' />
          <span className='blockchain-name'>ETH</span>
        </a>
        <a className={`${styles['blockchain-btn']}  ${styles['bsc-btn']}`}>
          <img src='bnb.png' className='blockchain-logo' />
          <span className='blockchain-name'>BNB</span>
        </a>
        <a className={`${styles['blockchain-btn']} ${styles['avax-btn']}`}>
          <img src='avax.png' className='blockchain-logo' />
          <span className='blockchain-name'>AVAX</span>
        </a>
        <a className={`${styles['blockchain-btn']} ${styles['matic-btn']}`}>
          <img src='matic.png' className='blockchain-logo' />
          <span className='blockchain-name'>MATIC</span>
        </a>
        <a
          className={`${styles['blockchain-btn']} ${styles['blockchain-btn-three']}`}
        >
          <img src='bnb.png' className={styles['three-blockchain-logo']} />
          <img src='eth.png' className={styles['three-blockchain-logo']} />
          <img src='avax.png' className={styles['three-blockchain-logo']} />
          <span>
            <AiOutlineArrowRight className='marginFa' />
          </span>
        </a>
        <div className={styles['onChain-btn-mobile']}>
          <span className='fullOnChain'>On-chain only</span>
          <a
            className='rectangle'
            id='rectangle'
            onClick={() => lockerButton()}
          >
            <div className='rond' id='cercle'></div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ButtonBlock
