import React, { useEffect, useState } from 'react'
import { GitHub, Send, Twitter } from 'react-feather'
import styles from './footer.module.scss'
import { Moon, Sun } from "react-feather"
import {
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
} from '@chakra-ui/react'

function Footer({ darkTheme, setDarkTheme }) {
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

  return (
    <div className={styles['footer-main']}>
      <div className={styles['footer-left']}>
        {darkTheme ? (
          <img src='/newIcon.png' className={styles['logo-footer']} />
        ) : (
          <img src='/icon.png' className={styles['logo-footer-1']} />
        )}

        <div className={styles['social-container']}>
          <a href='https://t.me/MobulaFi' className={styles['social-link']}>
            <Send className={styles['social-logo']} />
          </a>
          <a
            href='https://github.com/NBMSacha/mobula-app'
            className={styles['social-link']}
          >
            <GitHub className={styles['social-logo']} />
          </a>
          <a
            href='https://twitter.com/MobulaFi'
            className={styles['social-link']}
          >
            <Twitter className={styles['social-logo']} />
          </a>
        </div>
      </div>
      <div className={styles['footer-right']}>
        <div className={styles['community']}>
          <span>Community</span>
          <ul>
            <a href='https://discord.gg/nrkVNNke8Q'>
              <li>Discord</li>
            </a>
            <a href='https://t.me/MobulaFi'>
              <li>Telegram</li>
            </a>
            <a href='https://twitter.com/MobulaFi'>
              <li>Twitter</li>
            </a>
          </ul>
        </div>
        <div className={styles['community']}>
          <span>Press</span>
          <ul>
            <a href='https://drive.google.com/drive/folders/1640M2CobvBH822RDE9Hx7YypXlaykPIV'>
              <li>Press kit</li>
            </a>
            <a href='mailto:contact@mobula.finance'>
              <li>Contact</li>
            </a>
            <a href='https://medium.com/@Mobula'>
              <li>News</li>
            </a>
          </ul>
        </div>
        <div className={styles['community']}>
          <span>Ressources</span>
          <ul>
            <a href='https://docs.mobula.finance'>
              <li>Documentation</li>
            </a>
            <a href='https://docs.mobula.finance/whitepaper'>
              <li>Whitepaper</li>
            </a>
            <a href='https://medium.com/@Mobula'>
              <li>Medium</li>
            </a>
          </ul>
        </div>
        <div className={styles['help']}>
          <span>Help</span>
          <ul>
            <a href='https://discord.gg/nrkVNNke8Q'>
              <li>FAQs</li>
            </a>
            <a href='https://discord.gg/nrkVNNke8Q'>
              <li>Support</li>
            </a>
          </ul>
        </div>
        <div className={styles['darkmode']}>
          {darkTheme ? (
            <button className={styles["darkmode-btn"]} onClick={() => {
              console.log(`CALL BTN : ${darkTheme} ${localStorage.getItem("isDark")}`)
              localStorage.setItem("isDark", String(!darkTheme));
              setDarkTheme(!darkTheme)
            }}>
              <Moon />
              <span>White mode</span>
            </button>
          ) : (
            <button className={styles["whitemode-btn"]} onClick={() => {
              console.log(`CALL BTN : ${darkTheme} ${localStorage.getItem("isDark")}`)
              localStorage.setItem("isDark", String(!darkTheme));
              setDarkTheme(!darkTheme)
            }}>
              <Sun />
              <span>Dark mode</span>
            </button>
          )}

        </div>
      </div>
    </div>
  )
}

export default Footer
