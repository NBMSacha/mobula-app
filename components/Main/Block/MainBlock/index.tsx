import React, { useEffect, useState } from 'react'
import { X } from 'react-feather';
import { useAlert } from "react-alert";
import styles from './MainBlock.module.css';

function MainBlock(props: any) {
  const [isDisplayed, setIsDisplayed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const alert = useAlert();
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true)
    }
    setIsDisplayed(localStorage.getItem('displayed') == undefined)
  }, [])

  console.log('Re-render', isDisplayed, isMobile)

  if (isDisplayed && !isMobile) {
    return (
      <div className={styles["container-news"]} >
        <div className={styles["text-news"]}>
          <h2 className={styles["title-news"]}>Welcome to Mobula</h2>
          <p className={styles["subtitle-news"]}>Mobula dApp is currently in Alpha version. Bugs/incorrect informations are probably displayed. Please report any bug you find <a className={styles["subtitle-news-link"]} href="https://discord.gg/2a8hqNzkzN">in our Discord server</a>. </p>
        </div>
        <div className={styles["quadBox-container"]}>
          <div className="quad-box-1">

            <a href="https://docs.mobula.finance" className={styles.disabled}>
              <div className="texts-box texts-box-1">
                <div className={styles["logo-box"]}><img className={styles.inside} src="fullicon.png"></img></div>
                <p className={styles.text}>
                  Discover Mobula<br />
                  <span className="bold-text">Learn and earn $MOBL</span>
                </p>
              </div>
            </a>
          </div>
          <div className="quad-box-2">

            <a href="https://discord.gg/2a8hqNzkzN">
              <div className="texts-box texts-box-2">
                <div className={styles["logo-box"]}><img className={styles.inside} src="fullicon.png"></img></div>
                <p className={styles.text}>
                  Join the DAO<br />
                  <span className="bold-text">Vote, earn, interact.</span>
                </p>
              </div>
            </a>
          </div>
        </div>
        <X className={styles.x} onClick={() => {
          setIsDisplayed(false)
          localStorage.setItem('displayed', 'false')
        }} />
      </div >
    )
  } else if (isDisplayed) {
    return (
      <div className={styles["container-news"]} >
        <div className={styles["text-news"]}>
          <h2 className={styles["title-news"]}>Welcome to Mobula</h2>
          <p className={styles["subtitle-news"]}>Mobula dApp is currently in Alpha version. Bugs/incorrect informations are probably displayed. Please report any bug you find <a className={styles["subtitle-news-link"]} href="https://discord.gg/2a8hqNzkzN">in our Discord server</a>. </p>
        </div>
        <div className={styles["quadBox-container"]}>
          <div className="quad-box-1">

            <a href="https://docs.mobula.finance" className={styles.disabled}>
              <div className="texts-box texts-box-1">
                <div className="logo-box"><img className={styles.inside} src="fullicon.png"></img></div>
                <p className={styles.text}>
                  Discover Mobula<br />
                  <span className="bold-text">Learn and earn $MOBL</span>
                </p>
              </div>
            </a>
          </div>
          <div className="quad-box-2">

            <a href="https://discord.gg/2a8hqNzkzN">
              <div className="texts-box texts-box-2">
                <div className="logo-box"><img className={styles.inside} src="fullicon.png"></img></div>
                <p className={styles.text}>
                  Join the DAO<br />
                  <span className="bold-text">Vote, earn, interact.</span>
                </p>
              </div>
            </a>
          </div>
        </div>
        <X className={styles.x} onClick={() => {
          setIsDisplayed(false)
          localStorage.setItem('displayed', 'false')
        }} />
      </div >
    )
  } else if (isMobile) {
    return <div className={styles["container-news"]} style={{ "border": 'none' }}>
      <div className={styles["quadBox-container"]}>
        <div className="quad-box-1">

          <a href="https://docs.mobula.finance" className={styles.disabled}>
            <div className="texts-box texts-box-1">
              <div className="logo-box"><img className={styles.inside} src="fullicon.png"></img></div>
              <p className={styles.text}>
                Discover Mobula<br />
                <span className="bold-text">Learn and earn $MOBL</span>
              </p>
            </div>
          </a>
        </div>
        <div className="quad-box-2">

          <a href="https://discord.gg/2a8hqNzkzN">
            <div className="texts-box texts-box-2">
              <div className="logo-box"><img className={styles.inside} src="fullicon.png"></img></div>
              <p className={styles.text}>
                Join the DAO<br />
                <span className="bold-text">Vote, earn, interact.</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div >
  } else {
    return <></>
  }

};

export default MainBlock