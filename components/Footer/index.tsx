import React, { useEffect, useState } from 'react'

function Footer() {
    const [displaySort, setDisplaySort] = useState('none');
    const [displayData, setDisplayData] = useState('none');

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
                                <span className="footext" onClick={() => {
                                    setDisplaySort('none')
                                    setDisplayData((displayData == 'none' ? 'flex' : 'none'))
                                }}>Data</span>
                                <div className="footop-data" style={{ display: displayData }}>
                                    <span onClick={() => document.location.href = 'new'}>Recently Added</span>
                                    <span onClick={() => document.location.href = 'data'}>Query Data</span>
                                </div>
                                <span className="footext" onClick={() => document.location.href = 'governance'}>Govern</span>
                                <span className="footext" onClick={() => document.location.href = 'dashboard'}>Dashboard</span>
                                <span className="footext" onClick={() => {
                                    setDisplaySort((displaySort == 'none' ? 'flex' : 'none'))
                                    setDisplayData('none')
                                }}>Sort</span>
                                <div className="footop-sort" style={{ display: displaySort }}>
                                    <span onClick={() => document.location.href = 'sort'}>First Sort</span>
                                    <span onClick={() => document.location.href = 'validation'}>Final Validation</span>
                                </div>
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

