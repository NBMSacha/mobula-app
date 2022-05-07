import React, { useEffect, useState } from 'react'
import { formatName } from '../../../../helpers/formaters';
import styles from '../Block.module.css';

function TrendingBlock(tokens: {
    logo1: string
    name1: string
    change1: number | string
    logo2: string
    name2: string
    change2: number | string
    logo3: string
    name3: string
    change3: number | string
}) {
    return (
        <div className={styles["gainer-box"]}>
            <h3 className="gainer-main-title">🔥 Trendings</h3>
            <div className="gainer-container">
                <div className="left-gainer">
                    <div className="line-gainer">
                        <div className="token-info-pack">
                            <span className="line-number">1</span>
                            <img src={tokens.logo1} className="logo-inBox" />
                            <span className="crypto-assests">{tokens.name1}</span>
                        </div>
                        <span className="green"><div className="triangle-green"></div>{tokens.change1}%</span>
                    </div>
                    <div className="line-gainer">
                        <div className="token-info-pack">
                            <span className="line-number">2</span>
                            <img src={tokens.logo2} className="logo-inBox" />
                            <span className="crypto-assests">{tokens.name2}</span>
                        </div>
                        <span className="green"><div className="triangle-green"></div>{tokens.change2}%</span>
                    </div>
                    <div className="line-gainer">
                        <div className="token-info-pack">
                            <span className="line-number">3</span>
                            <img src={tokens.logo3} className="logo-inBox" />
                            <span className="crypto-assests">{tokens.name3}</span>
                        </div>

                        <span className="green"><div className="triangle-green"></div>{tokens.change3}%</span>
                    </div>
                </div>
                {/* <div className="right-loser">
                <div className="line-gainer">
                    <span className="line-number">1</span>
                    <span className="crypto-assests">{formatName(tokens.name4, 8)}</span>
                    <span className="red"><div className="triangle-red"></div>{tokens.change4}%</span>
                </div>
                <div className="line-gainer">
                    <span className="line-number">2</span>
                    <span className="crypto-assests">{formatName(tokens.name5, 8)}</span>
                    <span className="red"><div className="triangle-red"></div>{tokens.change5}%</span>
                </div>
                <div className="line-gainer">
                    <span className="line-number">3</span>
                    <span className="crypto-assests">{formatName(tokens.name6, 8)}</span>
                    <span className="red"><div className="triangle-red"></div>{tokens.change6}%</span>
                </div>
                </div> */}
            </div>
        </div>
    )
};

export default TrendingBlock