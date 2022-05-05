import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from "@react-icons/all-files/ai/AiOutlineArrowRight";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { HiOutlineGlobeAlt } from "@react-icons/all-files/hi/HiOutlineGlobeAlt";
import { SiDiscord } from "@react-icons/all-files/si/SiDiscord";

function ButtonBlock(props: any) {

    
    function lockerButton() {
        const rectangle = document.getElementById("rectangle")
        const cercle = window.document.getElementById('cercle');
        if(cercle.style.transform === "translateX(0%)") {
            cercle.style.transform = "translateX(135%)";
            rectangle.style.background = "#24274A";
            cercle.style.transition = "transform 150ms ease-in, background 150ms ease-in";
        } else {
            cercle.style.transform = "translateX(0%)";
            rectangle.style.background = "#58667E";
            cercle.style.transition = "transform 150ms ease-out, background 150ms ease-out";
            
        }
    }

    return (
        <div className="main-blockchain-container"> 
                  <div className="blockchain-container">
                    <a className="select-button-white">ALL</a>
                    <a className="select-button">My Holdings</a>
                    <a className="blockchain-btn eth-btn-block">
                      <img src="eth.png" className="blockchain-logo eth-btn"/>
                      <span className="blockchain-name">ETH</span>
                    </a>
                    <a className="blockchain-btn bsc-btn">
                      <img src="bnb.png" className="blockchain-logo"/>
                      <span className="blockchain-name">BSC</span>
                    </a>
                    <a className="blockchain-btn avax-btn">
                      <img src="avax.png" className="blockchain-logo"/>
                      <span className="blockchain-name">AVAX</span>
                    </a>
                    <a className="blockchain-btn-matic matic-btn">
                      <img src="matic.png" className="blockchain-logo"/>
                      <span className="blockchain-name">MATIC</span>
                    </a>
                    <a className="blockchain-btn blockcahin-btn-three">
                      <img src="bnb.png" className="three-blockchain-logo"/>
                      <img src="eth.png" className="three-blockchain-logo"/>
                      <img src="avax.png" className="three-blockchain-logo"/>
                      <span><AiOutlineArrowRight className="marginFa"/></span>
                    </a>
                    <div className="onChain-btn-mobile">
                      <span className="fullOnChain">Full on chain</span>
                      <a className="rectangle" id="rectangle" onClick={() => lockerButton()}>
                        <div className="rond" id="cercle"></div>
                      </a>
                    </div>
                  </div>
              </div>
    )
};

export default ButtonBlock