import React, { useEffect, useState } from 'react'

function Footer() {
    const [display, setDisplay] = useState('none');

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
        <>
            {
                (isGood ?
                    (<>
                        <div className="footer">
                            <div className="line-footer"></div>
                            <span className="footext">Mobula © All right reserved</span>
                        </div>
                        <div className="footer-mobile">
                            <div className="links">
                                <span className="footext" onClick={() => document.location.href = "dataprovider"}>Data provider</span>
                                <span className="footext" onClick={() => document.location.href = 'governance'}>Govern</span>
                                <span className="footext" onClick={() => document.location.href = 'dashboard'}>Dashboard</span>
                                <span className="footext" onClick={() => setDisplay((display == 'none' ? 'flex' : 'none'))}>Sort</span>
                                <div className="footop" style={{ display }}>
                                    <span onClick={() => document.location.href = 'sort'}>First Sort</span>
                                    <span onClick={() => document.location.href = 'validation'}>Final Validation</span>
                                </div>
                                <span className="footext" onClick={() => document.location.href = 'new'}>New</span>
                                <span className="footext" onClick={() => document.location.href = 'list'}>Listing</span>
                            </div>
                        </div>

                    </>)
                    :
                    <div className="footer">
                        <div className="line-footer"></div>
                        <span className="footext">Mobula © All right reserved</span>
                    </div>)
            }
        </>
    )
}

export default Footer
