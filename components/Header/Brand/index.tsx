import React, { useEffect, useState } from 'react'
import styles from './brand.module.scss'

function Brand({darkTheme}) {
  
  return (
    <div className={styles['left']} style={{ "cursor": "pointer" }} onClick={() => document.location.href = "/"}>
      {darkTheme ? (
        <img
        src='https://app.mobula.finance/newIcon.png'
        className={styles['head-logo']}
        alt='logo'
        onClick={() => (document.location.href = '/')}
        />
      ) : (
        <img
          src='https://app.mobula.finance/icon.png'
          className={styles['head-logo-1']}
          alt='logo'
          onClick={() => (document.location.href = '/')}
        />
      )}
     
       
      <div className={styles['mobula-title']}>Mobula</div>
    </div>
  )
}

export default Brand
