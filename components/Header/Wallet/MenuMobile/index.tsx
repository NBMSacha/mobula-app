import React from 'react'
import styles from './menumobile.module.scss'

function MenuMobile(props: any) {
  return (
    <>
      <div
        className={styles['mobile-toolbar-container']}
        id='mobileNav'
        style={{ display: 'none' }}
      >
        <div className={styles['mobile-linkTo']}>
          <a href='soon' className={styles['linkTo']}>
            <span className={styles['linkTo-tag']}>New</span>
          </a>
          <a href='soon' className={styles['linkTo']}>
            <span className={styles['linkTo-tag']}>Gainers & Losers</span>
          </a>
          <a href='soon' className={styles['linkTo']}>
            <span className={styles['linkTo-tag']}>Earn</span>
          </a>
          <a href='soon' className={styles['linkTo']}>
            <span className={styles['linkTo-tag']}>DEX</span>
          </a>
          <a href='soon' className={styles['linkTo']}>
            <span className={styles['linkTo-tag']}>DAO</span>
          </a>
          <a href='list' className={styles['linkTo']}>
            <span className={styles['linkTo-tag']}>List and asset</span>
          </a>
        </div>
        <div className={styles['connect-mobile-container']}>
          <button className={styles['connect-wallet-mobile']}>
            0x13..21EB
          </button>
          <div className={styles['rank-mobile-box']}>
            <span>Rank II</span>
            <span>2569 MOBL</span>
          </div>
        </div>
        <div className={styles['disconnect-wallet-mobile']}>
          <button className={styles['nobg']}>Disconnect Wallet</button>
        </div>
      </div>
    </>
  )
}

export default MenuMobile
