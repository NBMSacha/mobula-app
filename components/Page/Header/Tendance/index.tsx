import React from 'react'
import styles from './tendance.module.scss'
import { Button, useColorMode, IconButton,useColorModeValue, Flex, Box, Text, Heading, Input, Image, } from "@chakra-ui/react";
import { useMediaQuery } from '@chakra-ui/react'
function Tendance(props: any) {
  
  
  const border = useColorModeValue("#E5E5E5", "var(--chakra-colors-dark_border)")
  const [isLargerThan768] = useMediaQuery('(max-width: 768px)')
  return (
    <Flex className={styles['info-tendance']} borderTop={`1px solid ${border}`} borderBottom={ isLargerThan768 ? `1px solid ${border}` : "none" } >
      <div className={styles['info-left']}>
        <p className={styles['info-text']}>
          Crypto: <span className={styles['blue-data']}>{props.assets}</span>
        </p>
        <p className={styles['info-text']}>
          DEX: <span className={styles['blue-data']}>Coming soon</span>
        </p>
        <p className={styles['info-text']}>
          MOBL: <span className={styles['blue-data']}>Coming soon</span>
        </p>
      </div>
      <div className={styles['info-left']}>
        <p className={styles['info-text']}>
          DAO member: <span className={styles['blue-data']}>{props.dao}</span>
        </p>
        <p className={styles['info-text']}>
          New listings in the last 7 days:{' '}
          <span className={styles['blue-data']}>{props.listings}</span>
        </p>
      </div>
    </Flex>
  )
}

export default Tendance
