import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'
import styles from './brand.module.scss'

function Brand(props: any) {
return (
    <div className={styles['left']} style={{ "cursor": "pointer" }} onClick={() => document.location.href = "/"}>
      <img
        src='newIcon.png'
        className={styles['head-logo']}
        alt='logo'
        onClick={() => (document.location.href = '/')}
      />
      <div className={styles['mobula-title']}>Mobula</div>
    </div>
  )
}

export default Brand
