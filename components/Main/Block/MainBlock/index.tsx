import React, { useEffect, useState } from 'react'

function MainBlock(props: any) {
  return (
    <div className="container-news">
      <div className="text-news">
        <h2 className="title-news">Crypto-assets by Modula</h2>
      </div>
      <div className="quadBox-container">
        <div className="quad-box-1">

          <a>
            <div className="texts-box texts-box-1">
              <div className="logo-box"></div>
              <p>
                Join the DAO<br />
                <span className="bold-text">Learn and earn $MOBL</span>
              </p>
            </div>
          </a>
        </div>
        <div className="quad-box-2">

          <a>
            <div className="texts-box texts-box-2">
              <div className="logo-box"></div>
              <p>
                Portfolio 🔥<br />
                <span className="bold-text">Track your trades</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
};

export default MainBlock