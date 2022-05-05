import React, { useEffect, useState } from 'react'

function MobulaBlock(props: any) {
    return (
      <div className="gainer-box">
      <h3 className="gainer-main-title">🔥 Gainer</h3>
      <div className="gainer-container">
          <div className="left-gainer">
          <div className="line-gainer">
              <div className="token-info-pack">
                  <span className="line-number">1</span>
                  <img src="fullicon.png" className="logo-inBox"/>
                  <span className="crypto-assests">Mobula Finance</span>
              </div>
              <span className="green"><div className="triangle-green"></div>1956.69%</span>
          </div>
          <div className="line-gainer">
              <div className="token-info-pack">
                  <span className="line-number">2</span>
                  <img src="eth.png" className="logo-inBox"/>
                  <span className="crypto-assests">Ethereum</span>
              </div>
              <span className="green"><div className="triangle-green"></div>8.69%</span>
          </div>
          <div className="line-gainer">
              <div className="token-info-pack">
                  <span className="line-number">3</span>
                  <img src="nervos.png" className="logo-inBox"/>
                  <span className="crypto-assests">Nervos</span>
              </div>
              
              <span className="green"><div className="triangle-green"></div>8.69%</span>
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

export default MobulaBlock