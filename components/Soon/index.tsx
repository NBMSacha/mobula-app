import React from 'react'
import styles from './Soon.module.scss'

export default function Soon() {
  return (
    <>
      <div className={styles['soon']}>
        <h1>Coming soon.</h1>
        <p>
          Mobula's team is currently working hard to deliver the next parts of
          the Alpha of the dApp...
        </p>
      </div>
      <div className={styles['spacer']}></div>
    </>
  )
}
