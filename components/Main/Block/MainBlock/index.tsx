import React, { useEffect, useState } from 'react'
import { X } from 'react-feather'
import { useAlert } from 'react-alert'
import styles from './MainBlock.module.scss'

function MainBlock(props: any) {
  const [isMobile, setIsMobile] = useState(false)
  const alert = useAlert()

  if (!isMobile) {
    return (
      <div className={styles['container-news']}>
        <div className={styles['text-news']}>
          <h2 className={styles['title-news']}>Today's Crypto-assets  by <span>Mobula</span></h2>
          <p className={styles['subtitle-news']}>
            Mobula is a decentralized data aggregator, all the data being <b>scraped on-chain</b> to avoid manipulation.

            {' '}


          </p>
        </div>
        <div className={styles['quadBox-container']}>
          <div className={styles['quad-box-2']}>
            <a href='/earn'>
              <div className={`${styles["texts-box-1"]} ${styles["texts-box"]}`}>
                <div className={styles['logo-box']}>
                  <img className={styles.inside} src='fullicon.png' />
                </div>
                <p className={styles.text}>
                  Use2Earn
                  <br />
                  <span className={styles['bold-text']}>Earn MOBL</span>
                </p>
              </div>
            </a>
          </div>

          <div className={styles['quad-box-2']}>
            <a onClick={() => {
              props.setDisplay('My Assets')
            }}>
              <div className={`${styles["texts-box-2"]} ${styles["texts-box"]}`}>
                <div className={styles['logo-box']}>
                  <img className={styles.inside} src='portfolio.png'></img>
                </div>
                <p className={styles.text}>
                  Portfolio
                  <br />
                  <span className={styles['bold-text']}>Track your assets.</span>
                </p>
              </div>
            </a>
          </div>
          <div className={styles['quad-box-2']}>
            <a href='https://discord.gg/2a8hqNzkzN'>
              <div className={`${styles["texts-box-2"]} ${styles["texts-box"]}`}>
                <div className={styles['logo-box']}>
                  <img className={styles.inside} src='Imagedao.png'></img>
                </div>
                <p className={styles.text}>
                  Join the DAO
                  <br />
                  <span className={styles['bold-text']}>Vote to earn MOBL</span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }
  // } else if (isDisplayed) {
  //   return (
  //     <div className={styles['container-news']}>
  //       <div className={styles['text-news']}>
  //         <h2 className={styles['title-news']}>Today's Crypto-assets  by <span>Mobula</span></h2>
  //         <p className={styles['subtitle-news']}>
  //         The global crypto total value locked is <b>$105M</b> a <a
  //             className={styles['subtitle-news-link']}
  //             href='https://discord.gg/2a8hqNzkzN'
  //           >1.05%</a> decrease over the last day.

  //         </p>
  //       </div>
  //       <div className={styles['quadBox-container']}>
  //         <div className={styles['quad-box-2']}>
  //           <a href='https://docs.mobula.finance' className={styles["disabled"]}>
  //             <div className={`${styles["texts-box-1"]} ${styles["texts-box"]}`}>
  //               <div className={styles['logo-box']}>
  //                 <img className={styles.inside} src='fullicon.png' />
  //               </div>
  //               <p className={styles.text}>
  //                 Discover Mobula
  //                 <br />
  //                 <span className={styles['bold-text']}>Learn and earn $MOBL</span>
  //               </p>
  //             </div>
  //           </a>
  //         </div>

  //         <div className={styles['quad-box-2']}>
  //           <a href='https://discord.gg/2a8hqNzkzN'>
  //             <div className={`${styles["texts-box-2"]} ${styles["texts-box"]}`}>
  //               <div className={styles['logo-box']}>
  //                 <img className={styles.inside} src='portfolio.png'></img>
  //               </div>
  //               <p className={styles.text}>
  //                 Portfolio
  //                 <img src="fire.png" height="15px" className={styles["marginR"]} />
  //                 <br />
  //                 <span className={styles['bold-text']}>Vote, earn, interact.</span>
  //               </p>
  //             </div>
  //           </a>
  //         </div>
  //         <div className={styles['quad-box-2']}>
  //           <a href='https://discord.gg/2a8hqNzkzN'>
  //             <div className={`${styles["texts-box-2"]} ${styles["texts-box"]}`}>
  //               <div className={styles['logo-box']}>
  //                 <img className={styles.inside} src='Imagedao.png'></img>
  //               </div>
  //               <p className={styles.text}>
  //                 Join the DAO
  //                 <br />
  //                 <span className={styles['bold-text']}>Vote, earn, interact.</span>
  //               </p>
  //             </div>
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
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
            <div className={`${styles["texts-box-1"]} ${styles["texts-box"]}`}>
              <div className={styles['logo-box']}>
                <img className={styles.inside} src='fullicon.png' />
              </div>
              <p className={styles.text}>
                Discover Mobula
                <br />
                <span className={styles['bold-text']}>Learn and earn $MOBL</span>
              </p>
            </div>
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
