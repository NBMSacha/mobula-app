import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { formatName } from '../../../../helpers/formaters'
import styles from './GainerBlock.module.scss'
import { getTokenPrice } from '../../../../helpers/formaters';
import { Button, useColorMode, IconButton,useColorModeValue, Flex, Box, Text, Heading, Input, Image, } from "@chakra-ui/react";
function GainerBlock(tokens: {
  title: string
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

  const containerColor = useColorModeValue("bg_white", "dark_secondary")
  const shadowColor = useColorModeValue("var(--chakra-colors-shadow)", "none")
  
 
  console.log(tokens.title)
  const router = useRouter()
  return (
    <Box bg={containerColor} boxShadow={`1px 1px 10px ${shadowColor}`} className={styles['gainer-box']}>
      {tokens.title === "Top Gainers" && (
        <div className={styles["container-title-flex"]}>
          <h3 className={styles['gainer-main-title']}><Image h="20px" w="20px" src="fire.png" className={styles["marginTitle"]} />{tokens.title}</h3>
          <a href="/movers">More {">"} </a>
        </div>
      )}
      {tokens.title === "Trendings" && (
        <div className={styles["container-title-flex"]}>
          <h3 className={styles['gainer-main-title']}><Image h="20px" w="20px" src="green.png" className={styles["marginTitle"]} />{tokens.title}</h3>
          <a href="/new">More {">"}</a>
        </div>
      )}
      {tokens.title === "Recently Added" && (
        <div className={styles["container-title-flex"]}>
          <h3 className={styles['gainer-main-title']}><Image h="20px" w="20px" src="stopwatch.png" className={styles["marginTitle"]} />{tokens.title}</h3>
          <a href="/new">More  {">"}</a>
        </div>
      )}

      <div className={styles['gainer-container']}>
        <div className={styles['left-gainer']}>
          <div className={styles['line-gainer']} onClick={() => router.push(String(tokens.id1))}>
            <div className={styles['token-info-pack']}>

              <Image h="20px" w="20px"  src={tokens.logo1} className={styles['logo-inBox']} />
              <span className={styles['crypto-assests']}>{tokens.name1}</span>
            </div>
            {(tokens.change1 >= 0 ? <span className={styles['green']}>
              <div className={styles['triangle-green']}></div>
              {tokens.change1}%
            </span> : <span className={styles['red']}>
              <div className={styles['triangle-red']}></div>
              {tokens.change1}%
            </span>)}
          </div>
          <div className={styles['line-gainer']} onClick={() => router.push(String(tokens.id2))}>
            <div className={styles['token-info-pack']}>

              <Image h="30px" src={tokens.logo2} className={styles['logo-inBox']} />
              <span className={styles['crypto-assests']}>{tokens.name2}</span>
            </div>
            {(tokens.change2 >= 0 ? <span className={styles['green']}>
              <div className={styles['triangle-green']}></div>
              {tokens.change2}%
            </span> : <span className={styles['red']}>
              <div className={styles['triangle-red']}></div>
              {tokens.change2}%
            </span>)}
          </div>
          <div className={styles['line-gainer']} onClick={() => router.push(String(tokens.id3))}>
            <div className={styles['token-info-pack']}>

              <Image h="30px" src={tokens.logo3} className={styles['logo-inBox']} />
              <span className={styles['crypto-assests']}>{tokens.name3}</span>
            </div>

            {(tokens.change3 >= 0 ? <span className={styles['green']}>
              <div className={styles['triangle-green']}></div>
              {tokens.change3}%
            </span> : <span className={styles['red']}>
              <div className={styles['triangle-red']}></div>
              {tokens.change3}%
            </span>)}
          </div>
        </div>
      </div >
    </Box >
  )
}

export default GainerBlock
