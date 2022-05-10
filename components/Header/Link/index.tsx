import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'
import styles from './link.module.scss'

function Link(props: any) {
  return (
    <div className={styles['link-container']}>
      <span
        className={styles['link-common']}
        onClick={() => (document.location.href = 'soon')}
      >
        New
      </span>
      <span
        className={styles['link-common']}
        onClick={() => (document.location.href = 'soon')}
      >
        Gainers & Losers
      </span>
      <span
        className={styles['link-common']}
        onClick={() => (document.location.href = 'soon')}
      >
        Earn
      </span>
      <span
        className={styles['link-common']}
        onClick={() => (document.location.href = 'soon')}
      >
        DEX
      </span>
      <span
        className={styles['link-common']}
        onClick={() => (document.location.href = 'soon')}
      >
        DAO
      </span>
      <span
        className={styles['link-common']}
        onClick={() => (document.location.href = 'list')}
      >
        List an asset
      </span>
    </div>
  )
}

export default Link
