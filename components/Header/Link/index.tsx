import React from 'react'
import styles from './link.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Flex } from '@chakra-ui/react'

function Link() {
  const router = useRouter()

  if (router.pathname.includes('dao')) {
    return (
      <div className={styles['link-container']}>
        <span
          className={styles['link-common']}
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
        <Flex justify="space-around" align="center">
          <span
            className={styles['link-common']}
            onClick={() => (document.location.href = '/earn')}
            style={{ 'marginRight': '5px', color: '#32C784' }}
          >
            Earn
          </span>
          <Image width={20} height={20} src={'/reward1.png'} />

        </Flex>

        <span
          className={styles['link-common']}
          onClick={() => (document.location.href = '/soon')}
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
