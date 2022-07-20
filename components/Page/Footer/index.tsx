import React, { useContext, useEffect, useState } from 'react'
import { GitHub, Send, Twitter } from 'react-feather'
import styles from './footer.module.scss'
import { Moon, Sun } from "react-feather"
import { Link, Icon } from '@chakra-ui/react'
import { Flex, Text, Image, IconButton, Box } from '@chakra-ui/react'
import { ThemeContext } from '../../../pages/_app';

function Footer() {
  const themeContext = useContext(ThemeContext);
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
  return (
    <Flex className={styles['footer-main']} borderTop={`2px solid var(--box_border)`}>
      <div className={styles['footer-left']}>
        <Image
          src="https://app.mobula.finance/icon.png"
          h="45px"
          mr={["0px", "0px", "5px", "5px"]}
          alt='logo'
          onClick={() => (document.location.href = '/')}
          display={["none", "none", "flex", "flex"]}
        />
      </div>
      <div className={styles['footer-right']}>
        <div className={styles['community']}>
          <span style={{ color: "var(--text-footer-title)" }}>Community</span>
          <ul >
            <Link _hover={{ color: "var(--box_active)", textDecoration: "none",boxShadow:"none" }} href='https://discord.gg/nrkVNNke8Q' isExternal>
              <li>Discord</li>
            </Link>
            <Link _hover={{ color: "var(--box_active)", textDecoration: "none",boxShadow:"none" }} href='https://t.me/MobulaFi' isExternal>
              <li>Telegram</li>
            </Link>
            <Link _hover={{ color: "var(--box_active)", textDecoration: "none",boxShadow:"none" }} href='https://twitter.com/MobulaFi' isExternal>
              <li>Twitter</li>
            </Link>
          </ul>
        </div>
        <div className={styles['community']}>
          <span style={{ color: "var(--text-footer-title)" }}>Press</span>
          <ul>
            <Link _hover={{ color: "var(--box_active)", textDecoration: "none",boxShadow:"none" }} href='https://drive.google.com/drive/folders/1640M2CobvBH822RDE9Hx7YypXlaykPIV'  target='_blank'>
              <li>Press kit</li>
            </Link>
            <Link _hover={{ color: "var(--box_active)", textDecoration: "none",boxShadow:"none" }} href='https://discord.gg/2a8hqNzkzN' target='_blank'>
              <li>Contact</li>
            </Link>
            <Link _hover={{ color: "var(--box_active)", textDecoration: "none",boxShadow:"none" }} href='https://medium.com/@mobula' target='_blank'>
              <li>News</li>
            </Link>
          </ul>
        </div>
        <div className={styles['community']}>
          <span style={{ color: "var(--text-footer-title)" }}>Ressources</span>
          <ul>
            <Link _hover={{ color: "var(--box_active)", textDecoration: "none",boxShadow:"none" }} href='https://docs.mobula.finance' isExternal>
              <li>Documentation</li>
            </Link>
            <Link _hover={{ color: "var(--box_active)", textDecoration: "none",boxShadow:"none" }} href='https://docs.mobula.finance/whitepaper' isExternal>
              <li>Whitepaper</li>
            </Link>
            <Link _hover={{ color: "var(--box_active)", textDecoration: "none",boxShadow:"none" }} href='https://medium.com/@mobula' isExternal>
              <li>Medium</li>
            </Link>
          </ul>
        </div>
        <div className={styles['help']}>
          <span style={{ color: "var(--text-footer-title)" }}>Help</span>
          <ul>
            <Link _hover={{ color: "var(--box_active)", textDecoration: "none" }} href='https://discord.gg/2a8hqNzkzN' target='_blank'>
              <li>FAQs</li>
            </Link>
            <Link _hover={{ color: "var(--box_active)", textDecoration: "none" }} href='https://discord.gg/2a8hqNzkzN' target='_blank'>
              <li>Support</li>
            </Link>
          </ul>
        </div>
        <div className={styles['help']}>
        <Flex justify="center" display={["none", "none", "flex", "flex"]}>
          <IconButton
            _focus={{ boxShadow: "none" }}
            onClick={() => {
              themeContext.setColorMode(themeContext.colorMode === "light" ? "dark" : "light")
            }}
            aria-label='Call Segun'
            borderRadius="12px"
            color="var(--text-footer-title)"
            icon={themeContext.colorMode === "light" ? <Moon /> : <Sun />}
          />
            <Text display={["none", "none", "flex", "flex"]} whiteSpace="nowrap" color="var(--text-footer-title)" ml="10px">{themeContext.colorMode === "light" ? "Dark Mode" : "White Mode"}</Text>
        </Flex>
        <Box display={["block", "block", "none", "none",]}>
           <Flex w="100%" justify="space-between" align="center">
              <IconButton
                _focus={{ boxShadow: "none" }}
                onClick={() => {
                  themeContext.setColorMode(themeContext.colorMode === "light" ? "dark" : "light")
                }}
                aria-label='Call Segun'
                borderRadius="12px"
                color="var(--text-footer-title)"
                icon={themeContext.colorMode === "light" ? <Moon /> : <Sun />}
              />
              <Image
                src="https://app.mobula.finance/icon.png"
                h="45px"
                mr={["0px", "0px", "5px", "5px"]}
                alt='logo'
                onClick={() => (document.location.href = '/')}
              />
               <Link
                  href='https://github.com/NBMSacha/mobula-app'
                  className={styles['social-link']}
                  target='_blank'
                  _hover={{ color: "var(--box_active)", textDecoration: "none" }}
                >
                  <Icon as={GitHub} boxSize="24px" mt="10px" />
                </Link>
          </Flex>
          <Flex w="100%" justify="space-between" align="center">
            <Link href='https://t.me/MobulaFi' _hover={{ color: "var(--box_active)", textDecoration: "none" }} target='_blank' className={styles['social-link']}>
              <Icon as={Send} boxSize="24px" mt="20px" />
            </Link>
            <Link
              href='https://twitter.com/MobulaFi'
              className={styles['social-link']}
              target='_blank'
              _hover={{ color: "var(--box_active)", textDecoration: "none" }}
            >
              <Icon as={Twitter} boxSize="24px" mt="20px" />
            </Link>
          </Flex>
        </Box>
        </div>
      </div>
    </Flex>
  )
}

export default Footer
