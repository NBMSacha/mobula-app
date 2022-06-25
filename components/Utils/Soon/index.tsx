import React from 'react'
import Swap from '../Swap'
import styles from './Soon.module.scss'

export default function Soon() {
  return (
    <>
      <div className={styles['soon']}>
        <Swap />
      </div>
      <div className={styles['spacer']}></div>
    </>
  )
}
