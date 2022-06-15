import React, { useEffect, useState } from 'react'
import { GitHub, Send, Twitter } from 'react-feather'
import styles from './footer.module.scss'
import { Moon, Sun } from "react-feather"
import {
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
} from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'

import { Flex, Text, Image, useColorModeValue, Button, Input, IconButton } from '@chakra-ui/react'
function Footer() {
  const [displaySort, setDisplaySort] = useState('none')
  const [displayData, setDisplayData] = useState('none')
  const [displayDAO, setDisplayDAO] = useState('none')
  const { colorMode, toggleColorMode } = useColorMode();

  const useWindowDimensions = () => {
    const hasWindow = typeof window !== 'undefined'

    function getWindowDimensions() {
      const width = hasWindow ? window.innerWidth : null
      const height = hasWindow ? window.innerHeight : null
      return {
        width,
        height,
      }
    }

    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    )

    useEffect(() => {
      if (hasWindow) {
        const handleResize = () => setWindowDimensions(getWindowDimensions())
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      }
    }, [hasWindow])

    return windowDimensions
  }
  const { width } = useWindowDimensions()
  const breakpoint = 768

  const isGood = width <= breakpoint
  const border = useColorModeValue("#E5E5E5", "var(--chakra-colors-dark_border)")
  const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
  const sunMoon = useColorModeValue("white_sun_moon", "dark_sun_moon")
  const colorSunMoon = useColorModeValue("sun_moon_color", "bg_white")
  const hover = useColorModeValue("blue", "blue")
  const title = useColorModeValue("var(--chakra-colors-blue)", "var(--chakra-colors-bg_white)")
  return (
    <Flex className={styles['footer-main']} borderTop={`2px solid ${border}`}>
      <div className={styles['footer-left']}>
        <Image
          src="https://app.mobula.finance/icon.png"
          h="45px"
          mr={["0px", "0px", "5px", "5px"]}
          alt='logo'
          onClick={() => (document.location.href = '/')}
        />

        <div className={styles['social-container']}>
          <Link href='https://t.me/MobulaFi' _hover={{ color: hover, textDecoration: "none" }} className={styles['social-link']}>
            <Send className={styles['social-logo']} />
          </Link>
          <Link
            href='https://github.com/NBMSacha/mobula-app'
            className={styles['social-link']}
            _hover={{ color: hover, textDecoration: "none" }}
          >
            <GitHub className={styles['social-logo']} />
          </Link>
          <Link
            href='https://twitter.com/MobulaFi'
            className={styles['social-link']}
            _hover={{ color: hover, textDecoration: "none" }}
          >
            <Twitter className={styles['social-logo']} />
          </Link>
        </div>
      </div>
      <div className={styles['footer-right']}>
        <div className={styles['community']}>
          <span style={{color: title}}>Community</span>
          <ul >
            <Link _hover={{ color: hover, textDecoration: "none" }} href='https://discord.gg/nrkVNNke8Q' isExternal>
              <li>Discord</li>
            </Link>
            <Link _hover={{ color: hover, textDecoration: "none" }} href='https://t.me/MobulaFi' isExternal>
              <li>Telegram</li>
            </Link>
            <Link _hover={{ color: hover, textDecoration: "none" }} href='https://twitter.com/MobulaFi' isExternal>
              <li>Twitter</li>
            </Link>
          </ul>
        </div>
        <div className={styles['community']}>
          <span style={{color: title}}>Press</span>
          <ul>
            <Link _hover={{ color: hover, textDecoration: "none" }} href='' >
              <li>Press kit</li>
            </Link>
            <Link _hover={{ color: hover, textDecoration: "none" }} href=''>
              <li>Contact</li>
            </Link>
            <Link _hover={{ color: hover, textDecoration: "none" }} href=''>
              <li>News</li>
            </Link>
          </ul>
        </div>
        <div className={styles['community']}>
          <span style={{color: title}}>Ressources</span>
          <ul>
            <Link _hover={{ color: hover, textDecoration: "none" }} href='https://docs.mobula.finance' isExternal>
              <li>Documentation</li>
            </Link>
            <Link _hover={{ color: hover, textDecoration: "none" }} href='https://docs.mobula.finance/whitepaper' isExternal>
              <li>Whitepaper</li>
            </Link>
            <Link _hover={{ color: hover, textDecoration: "none" }} href='https://medium.com/@mobula' isExternal>
              <li>Medium</li>
            </Link>
          </ul>
        </div>
        <div className={styles['help']}>
          <span style={{color: title}}>Help</span>
          <ul>
            <Link _hover={{ color: hover, textDecoration: "none" }} href='https://discord.gg/2a8hqNzkzN' >
              <li>FAQs</li>
            </Link>
            <Link _hover={{ color: hover, textDecoration: "none" }} href='https://discord.gg/2a8hqNzkzN'>
              <li>Support</li>
            </Link>
          </ul>
        </div>
        <Flex align="center" h="50px">
          <IconButton
            boxShadow={`1px 2px 12px 3px ${shadow}`}

            onClick={toggleColorMode}
            aria-label='Call Segun'
            size='md'
            borderRadius="12px"
            color={colorSunMoon}
            bg={sunMoon}
            icon={colorMode == "light" ? <Moon /> : <Sun />}
          />
          <Text ml="10px">{colorMode == "light" ? "Dark Mode" : "White Mode"}</Text>

        </Flex>
      </div>
    </Flex>
  )
}

export default Footer
