import React, { useEffect, useState } from 'react'
import styles from './tendance.module.scss'

function Tendance(props: any) {
  return (
    <div className={styles['info-tendance']}>
      <div className={styles['info-left']}>
        <p className={styles['info-text']}>
          Crypto: <span className={styles['blue-data']}>{props.assets}</span>
        </p>
        <p className={styles['info-text']}>
          DEX: <span className={styles['blue-data']}>{props.dex}</span>
        </p>
        <p className={styles['info-text']}>
          MOBL: <span className={styles['blue-data']}>0$</span>
        </p>
      </div>
      <div className={styles['info-left']}>
        <p className={styles['info-text']}>
          DAO member: <span className={styles['blue-data']}>{props.dao}</span>
        </p>
        <p className={styles['info-text']}>
          7d new listings:{' '}
          <span className={styles['blue-data']}>{props.listings}</span>
        </p>
      </div>
    </div>
  )
}

export default Tendance
