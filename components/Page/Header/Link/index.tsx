import React, { useState} from 'react'
import styles from './link.module.scss'
import { useRouter } from 'next/router'
import { Flex, Text, Button, Input, Box } from '@chakra-ui/react'

function Link() {
  const router = useRouter()
  const [selected, setSelected] = useState("")

  if (router.pathname.includes('dao')) {
    return (
      <div className={styles['link-container']}>
        <Box as="span"
          onClick={() => (document.location.href = 'dashboard')}
        >
          Dashboard
        </Box>
        <Box as="span" color={selected == "Dashboard" ? "blue" : "none"}
          className={styles['link-common']}
          onClick={() => (document.location.href = 'elections')}
        >
          Elections
        </Box>
        <Box as="span" color={selected === "First Sort" ? "blue" : "none"}
          className={styles['link-common']}
          onClick={() => {setSelected('First Sort');(document.location.href = 'sort');console.log}}
        >
          First Sort
        </Box>
        <Box as="span" color={selected === "Final Validation" ? "var(--blue)" : "none"}
          className={styles['link-common']}
          onClick={() => (document.location.href = 'validation')}
        >
          Final Validation
        </Box>
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
