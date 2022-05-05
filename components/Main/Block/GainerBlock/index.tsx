
import React, { useEffect, useState } from 'react'
import { formatName } from '../../../../helpers/formaters';

function GainerBlock(tokens: {
  name1: string
  change1: number
  name2: string
  change2: number
  name3: string
  change3: number
  name4: string
  change4: number
  name5: string
  change5: number
  name6: string
  change6: number
}) {
  return (
    <div className="gainer-box nomargin-box">
      <h3 className="gainer-main-title">🔥 Gainer</h3>
      <div className="gainer-container">
        <div className="left-gainer">
          <div className="line-gainer">
            <span className="line-number">1</span>
            <span className="crypto-assests">{formatName(tokens.name1, 8)}</span>
            <span className="green"><div className="triangle-green"></div>{tokens.change1}%</span>
          </div>
          <div className="line-gainer">
            <span className="line-number">2</span>
            <span className="crypto-assests">{formatName(tokens.name2, 8)}</span>
            <span className="green"><div className="triangle-green"></div>{tokens.change2}%</span>
          </div>
          <div className="line-gainer">
            <span className="line-number">3</span>
            <span className="crypto-assests">{formatName(tokens.name3, 8)}</span>
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

export default GainerBlock