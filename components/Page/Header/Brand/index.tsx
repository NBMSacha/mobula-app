import React, { useEffect, useState } from 'react'
import styles from './brand.module.scss'
import { Flex, Text,Image, useColorModeValue, Button, Input } from '@chakra-ui/react'

function Brand({darkTheme}) {
  const shadow = useColorModeValue("blue_title", "bg_white")
  return (
    <div className={styles['left']} style={{ "cursor": "pointer" }} onClick={() => document.location.href = "/"}>
      <Image
          src="https://app.mobula.finance/icon.png"
          h={["35px","35px","45px","45px"]}
          mr={["0px","0px","3px","5px"]}
          pl={["10px", "10px", "0px", "0px"]}
          py={["10px 0px 20px 20px ", "10px 0px 20px 20px ", "auto","auto"]}
          alt='logo'
          onClick={() => (document.location.href = '/')}
      />
  
     
       
      <Text color={shadow} className={styles['mobula-title']}>Mobula</Text>
    </div>
  )
}

export default Brand
