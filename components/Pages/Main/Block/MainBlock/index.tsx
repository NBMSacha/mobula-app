import React, { useEffect, useState } from 'react'
import { X } from 'react-feather'
import { useAlert } from 'react-alert'
import styles from './MainBlock.module.scss'
import { Button, useColorMode, IconButton, useColorModeValue, useMediaQuery, Flex, Box, Text, Heading, Input, Image, } from "@chakra-ui/react";


function MainBlock(props: any) {
  const [isMobile, setIsMobile] = useState(false)
  const alert = useAlert()

  // MEDIA QUERY
  const [isSmalerThan1250] = useMediaQuery('(max-width: 1250px)')
  const [isSmalerThan1560] = useMediaQuery('(max-width: 1660px)')
  // COLOR MODE

  if (!isMobile) {

    return (
      <Flex align="center" w={["100%", "100%", "90%", "90%"]} justify="space-between" pt={[3, 3, 50, 50]} pb={[50, 50, 50, 5]} direction={["column", "column", "row", "row"]} overflow="hidden" maxWidth="1700px">
        <Flex boxShadow={[`0px 1px 12px 3px var(--shadow)`, `0px 1px 12px 3px var(--shadow)`, "none", "none"]} w={["95%", "95%", "auto", "auto"]} direction="column" justify="center" mr={["auto", "auto", "auto", "50px"]} ml={["auto", "auto", "10px", "10px"]} borderRadius="10px" p={["10px 15px", "10px 15px", "auto", "auto"]} mb={["15px", "15px", "auto", "auto"]} bg={["none", "none", "none", "none"]} >
          <Text fontFamily="Poppins" fontSize={["18px", "18px", "30px", "30px"]} className={styles['title-news']}>Crypto assets by Mobula</Text>
          <Text fontFamily="Poppins" fontSize={["12px", "12px", "16px", "16px"]} maxWidth="500px" color="subtitle" mt={["10px","10px","20px","20px"]} className={styles['subtitle-news']}>
            Mobula is a decentralized and seamless <span style={{ color: "#5C7DF9", fontWeight: "700" }}>data aggregator</span> redistributing profit to users and processing data on-chain.

            {' '}


          </Text>
        </Flex>
        <Box w={["100%", "100%", "58%", "58%"]} boxShadow={[`0px 1px 12px 3px var(--shadow)`, `0px 1px 12px 3px var(--shadow)`, "none", "none"]} ml="10px" mb={["15px", "15px", "30px", "30px"]} borderRadius="15px">
          <Flex overflow="auto" >
            <Flex justify="center">
              <div style={{ marginRight: "10px" }}>
                <a href='/earn'>
                  <Flex _hover={{ background: "var(--box_active)", cursor: "pointer" }} py={2} boxShadow={[`0px 1px 12px 3px var(--shadow)`]} border={["1px solid rgba(122, 122, 122, 0.1)"]}
                    mr="10px" bg={["var(--bg-main-box)"]} m={["auto", "auto", "auto", "20px 10px"]} borderRadius="12px"
                    position="relative" align="center" p={isSmalerThan1560 ? 1 : 2} fontSize="14px" minWidth={["180px", "180px", "210px", "232px"]} >
                    <div className={styles['logo-box']}>
                      <img className={styles.inside} src='fullicon.png' />
                    </div>
                    <Text className={styles.text}>
                      Use2Earn
                      <br />
                      <span className={styles['bold-text']}>Earn MOBL</span>
                    </Text>
                  </Flex>
                </a>
              </div>
              <div style={{ marginRight: "10px" }}>
                <a onClick={() => {
                  props.setDisplay('My Assets')
                }}>
                  <Flex _hover={{ background: "var(--box_active)", cursor: "pointer" }} py={2} boxShadow={[`0px 1px 12px 3px var(--shadow)`]} border={["1px solid rgba(122, 122, 122, 0.1)"]}
                    bg={["var(--bg-main-box)"]} m={["auto", "auto", "auto", "20px 10px"]} borderRadius="12px"
                    position="relative" align="center" p={isSmalerThan1560 ? 1 : 2} fontSize="14px" minWidth={["180px", "180px", "210px", "232px"]}>
                    <div className={styles['logo-box']}>
                      <img className={styles.inside} src='portfolio.png'></img>
                    </div>
                    <p className={styles.text}>
                      Portfolio
                      <br />
                      <span className={styles['bold-text']}>Track your assets.</span>
                    </p>
                  </Flex>
                </a>
              </div>
              <div >
                <a href='https://discord.gg/2a8hqNzkzN'>
                  <Flex _hover={{ background: "var(--box_active)", cursor: "pointer" }} py={2} boxShadow={[`0px 1px 12px 3px var(--shadow)`]} border={["1px solid rgba(122, 122, 122, 0.1)"]}
                    bg={["var(--bg-main-box)"]} m={["auto", "auto", "auto", "20px 10px"]} borderRadius="12px"
                    position="relative" align="center" p={isSmalerThan1560 ? 1 : 2} fontSize="14px" minWidth={["180px", "180px", "210px", "232px"]}>
                    <div className={styles['logo-box']}>
                      <img className={styles.inside} src='Imagedao.png'></img>
                    </div>
                    <Text className={styles.text}>
                      Join the DAO
                      <br />
                      <span className={styles['bold-text']}>Vote to earn MOBL</span>
                    </Text>
                  </Flex>
                </a>
              </div>
            </Flex>
          </Flex>

        </Box>
      </Flex>
    )
  }

  else {
    return (
      <div className={styles['container-news']}>
        <div className={styles['text-news']}>
          <h2 className={styles['title-news']}>Today's Crypto-assets  by <span>Mobula</span></h2>
          <p className={styles['subtitle-news']}>
            The global crypto total value locked is <b>$105M</b> a <a
              className={styles['subtitle-news-link']}
              href='https://discord.gg/2a8hqNzkzN'
            >1.05%</a> decrease over the last day.

            {' '}


          </p>
        </div>
        <div className={styles['quadBox-container']}>

          <a href='https://docs.mobula.finance' className={styles["disabled"]}>
            <Box borderRadius="10px" w="27%" bg="">
              <div className={styles['logo-box']}>
                <img className={styles.inside} src='fullicon.png' />
              </div>
              <p className={styles.text}>
                Discover Mobula
                <br />
                <span className={styles['bold-text']}>Learn and earn $MOBL</span>
              </p>
            </Box>
          </a>



          <a href='https://discord.gg/2a8hqNzkzN'>
            <div className={`${styles["texts-box-2"]} ${styles["texts-box"]}`}>
              <div className={styles['logo-box']}>
                <img className={styles.inside} src='portfolio.png'></img>
              </div>
              <p className={styles.text}>
                Portfolio
                <img src="fire.png" height="15px" className={styles["marginR"]} />
                <br />
                <span className={styles['bold-text']}>Vote, earn, interact.</span>
              </p>
            </div>
          </a>

          <a href='https://discord.gg/2a8hqNzkzN'>
            <div className={`${styles["texts-box-2"]} ${styles["texts-box"]}`}>
              <div className={styles['logo-box']}>
                <img className={styles.inside} src='Imagedao.png'></img>
              </div>
              <p className={styles.text}>
                Join the DAO
                <br />
                <span className={styles['bold-text']}>Vote, earn, interact.</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    )
  }

}

export default MainBlock
