import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { formatName } from '../../../../helpers/formaters'
import styles from './GainerBlock.module.scss'
import { getTokenPrice } from '../../../../helpers/formaters';

function GainerBlock(tokens: {
  logo1: string
  name1: string
  id1: number
  change1: number
  logo2: string
  name2: string
  id2: number
  change2: number
  logo3: string
  name3: string
  id3: number
  change3: number
}) {
  const router = useRouter()
  return (
    <div className={styles['gainer-box']}>
      <h3 className={styles['gainer-main-title']}>🟢 Top Gainers</h3>
      <div className={styles['gainer-container']}>
        <div className={styles['left-gainer']}>
          <div className={styles['line-gainer']} onClick={() => router.push(String(tokens.id1))}>
            <div className={styles['token-info-pack']}>
              <span className={styles['line-number']}>1</span>
              <img src={tokens.logo1} className={styles['logo-inBox']} />
              <span className={styles['crypto-assests']}>{tokens.name1}</span>
            </div>
            <span className={styles['green']}>
              <div className={styles['triangle-green']}></div>
              {tokens.change1}%
            </span>
          </div>
          <div className={styles['line-gainer']} onClick={() => router.push(String(tokens.id2))}>
            <div className={styles['token-info-pack']}>
              <span className={styles['line-number']}>2</span>
              <img src={tokens.logo2} className={styles['logo-inBox']} />
              <span className={styles['crypto-assests']}>{tokens.name2}</span>
            </div>
            <span className={styles['green']}>
              <div className={styles['triangle-green']}></div>
              {tokens.change2}%
            </span>
          </div>
          <div className={styles['line-gainer']} onClick={() => router.push(String(tokens.id3))}>
            <div className={styles['token-info-pack']}>
              <span className={styles['line-number']}>3</span>
              <img src={tokens.logo3} className={styles['logo-inBox']} />
              <span className={styles['crypto-assests']}>{tokens.name3}</span>
            </div>

            <span className={styles['green']}>
              <div className={styles['triangle-green']}></div>
              {tokens.change3}%
            </span>
          </div>
        </div>
      </div >
    </div >
  )
}

export default GainerBlock
