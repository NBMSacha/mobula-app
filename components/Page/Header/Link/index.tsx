import React from 'react'
import styles from './link.module.scss'
import { useRouter } from 'next/router'
import { Flex, Text, Button, Input } from '@chakra-ui/react'

function Link() {
  const router = useRouter()

  if (router.pathname.includes('dao')) {
    return (
      <div className={styles['link-container']}>
        <span
          onClick={() => (document.location.href = 'dashboard')}
        >
          Dashboard
        </span>
        <span
          className={styles['link-common']}
          onClick={() => (document.location.href = 'elections')}
        >
          Elections
        </span>
        <span
          className={styles['link-common']}
          onClick={() => (document.location.href = 'sort')}
        >
          First Sort
        </span>
        <span
          className={styles['link-common']}
          onClick={() => (document.location.href = 'validation')}
        >
          Final Validation
        </span>
      </div>
    )
  } else {
    return (
      <div className={styles['link-container']}>
        <span
          className={styles['link-common']}
          onClick={() => (document.location.href = '/new')}
        >
          New
        </span>
        <span
          className={styles['link-common']}
          onClick={() => (document.location.href = '/movers')}
        >
          Gainers & Losers
        </span>


        <span
          className={styles['link-common']}
          onClick={() => (document.location.href = '/dex')}
        >
          DEX
        </span>
        <span
          className={styles['link-common']}
          onClick={() => (document.location.href = '/dao/dashboard')}
        >
          DAO
        </span>
        <span
          className={styles['link-common']}
          onClick={() => (document.location.href = '/list')}
        >
          List an asset
        </span>

      </div>
    )
  }
}

export default Link
