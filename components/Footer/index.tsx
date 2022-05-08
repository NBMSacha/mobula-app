import React, { useEffect, useState } from 'react';
import styles from "./footer.module.css"
function Footer() {
    const [displaySort, setDisplaySort] = useState('none');
    const [displayData, setDisplayData] = useState('none');
    const [displayDAO, setDisplayDAO] = useState('none');

    const useWindowDimensions = () => {
        const hasWindow = typeof window !== "undefined"

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
                window.addEventListener("resize", handleResize)
                return () => window.removeEventListener("resize", handleResize)
            }
        }, [hasWindow])

        return windowDimensions
    }
    const { width } = useWindowDimensions();
    const breakpoint = 768;

    const isGood = width <= breakpoint;

    return (
        <div className={styles["footer-main"]}>
            <div className={styles["footer-left"]}>
                <img src="newIcon.png" className={styles["logo-footer"]} />
                <div className={styles["social-container"]}>
                    <a href="https://t.me/MobulaFi" className={styles['social-link']}><img src='send.svg' className={styles["social-logo"]} /></a>
                    <a href="https://github.com/NBMSacha/mobula-app" className={styles['social-link']}><img src='github.svg' className={styles["social-logo"]} /></a>
                    <a href="https://twitter.com/MobulaFi" className={styles['social-link']}><img src='twitter.svg' className={styles["social-logo"]} /></a>
                </div>
            </div> 
            <div className={styles["footer-right"]}>
                <div className={styles["community"]}>
                    <span>Community</span>
                    <ul>
                        <a href="https://discord.gg/nrkVNNke8Q"><li>Discord</li></a>
                        <a href="https://t.me/MobulaFi"><li>Telegram</li></a>
                        <a href="https://twitter.com/MobulaFi"><li>Twitter</li></a>
                    </ul>
                </div>
                <div className={styles["community"]}>
                    <span>Press</span>
                    <ul>
                        <a href=""><li>Press kit</li></a>
                        <a href=""><li>Contact</li></a>
                        <a href=""><li>News</li></a>
                    </ul>
                </div>
                <div className={styles["community"]}>
                    <span>Ressources</span>
                    <ul>
                        <a href=""><li>Documentation</li></a>
                        <a href=""><li>Whitepaper</li></a>
                        <a href=""><li>Medium</li></a>
                    </ul>
                </div>
                <div className={styles["help"]}>
                    <span>Help</span>
                    <ul>
                    <a href=""><li>FAQs</li></a>
                    <a href=""><li>Support</li></a>
                    </ul>
                </div>
            </div>
        </div>

    )
    
}

export default Footer

