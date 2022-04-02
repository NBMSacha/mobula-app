import React, { useState, useEffect } from 'react'
import { NextResponse, NextRequest } from 'next/server'
const ethers = require('ethers');
const axios = require('axios');
const provider = ethers.getDefaultProvider("https://polygon-rpc.com")
const API_ADDRESS = "0x76edF9562F2Cca3bc36DB2ed58A4adC0b10F1048"
const apiContract = new ethers.Contract(API_ADDRESS, 
        ['function staticData(address token) external view returns(string)'], provider)
const supportedRPCs = require('../constants')




export const getServerSideProps = (context) => {
  console.log(context.query.token)     
  return {props: {
    token: context.query.token
  }}
}

function Dataprovider({token}) {
const [tokenName, setTokenName] = useState("")
const [tokenSymbol, setTokenSymbol] = useState("")
const [tokenLogo, setTokenLogo] = useState("")
const [tokenChain, setTokenChain] = useState("")
const [tokenContract, setTokenContract] = useState("")
const [tokenTwitter, setTokenTwitter] = useState("")
const [tokenDescription, setTokenDescription] = useState("")
const [tokenWebsite, setTokenWebsite] = useState("")
const [tokenDiscord, setTokenDiscord] = useState("")
const [tokenChat, setTokenChat] = useState("")
async function getDataHash(tokenAddress) {
  try{
  return await apiContract.staticData(tokenAddress)
  }
  catch(e) {
    window.location.href = "dataprovider";
    alert("This token isn't listed")
}
}


getDataHash(token).then(dataHash => {
  axios.get('https://gateway.ipfs.io/ipfs/' + dataHash)
  .then(r => {
      setTokenName(r.data.name)
      setTokenSymbol(r.data.symbol)  
      setTokenLogo(r.data.logo)
      setTokenContract(r.data.contract)
      setTokenTwitter(r.data.twitter)
      setTokenDescription(r.data.description)
      setTokenWebsite(r.data.website)
      if(r.data.chat.includes("https://discord.gg/")) {
        setTokenDiscord(r.data.chat)
      }
      else if(r.data.chat.includes("https://t.me/")) {
        setTokenChat(r.data.chat)
      }
      let name = "";
        let symbol = "";
        let i = -1;
        while (!name && i < supportedRPCs.length - 1) {
        i++;
        const provider = new ethers.providers.JsonRpcProvider(supportedRPCs[i].url);
        const tokenContract = new ethers.Contract(r.data.contract, [
        'function name() external view returns(string)',
        'function symbol() external view returns(string)'
        ], provider)

    try {
        name = tokenContract.name()
        symbol = tokenContract.symbol()
        setTokenChain(supportedRPCs[i])
        console.log("le bon")
    } catch (e) {
        console.log('Token is not on the ' + supportedRPCs[i].name)
    }
}
   })
})

  return (
    <>
    
    <div className="listing">
            <div className="container">
                <header>
                  <div className="tokenpage-head">
                    <img className="tokenpage-logo" src={tokenLogo}/>
                    <h1 className="tokenpage-name">{tokenName}</h1>
                    <span className="tokenpage-symbol">{tokenSymbol}</span>
                    </div>
                    <div className="tokenpage-details">
                      <div className="blockchain-details">
                        <div className='blockchain-details-image'>
                        {tokenChain == "BNB" && <img src="bnb.png"></img>}
                        {tokenChain == "Ethereum" && <img src="eth.png"></img>}
                        {tokenChain == "Avalanche" && <img src="avax.png"></img>}
                        </div>
                        <div className="blockchain-details-text">
                          {tokenChain}
                        </div>
                      </div>
                      <div className="contract-details"><span className="contract-details-text">{tokenContract.substring(0, 4) + '..' + tokenContract.substring(tokenContract.length - 4, tokenContract.length)}</span></div>
                      <div className="links-details">
                        <span className="link-chat">
                        {tokenChat ? <a href={tokenChat} target="_blank"><img className="links-icons" src="telegram.png"></img></a> : ""}
                        </span>
                        <span className="link-discord">
                        {tokenDiscord ? <a href={tokenDiscord} target="_blank"><img className="links-icons" src="discord.png"></img></a> : ""}
                        </span>
                        <span className="link-website">
                        {tokenWebsite ? <a href={tokenWebsite} target="_blank"><img className="links-icons" src="website.png"></img></a> : ""}
                        </span>
                        <span className="link-twitter">
                        {tokenTwitter ? <a href={tokenTwitter} target="_blank"><img className="links-icons" src="twitter.png"></img></a> : ""}
                        </span>                        
                        </div>
                    </div>
                    <span>
                      {tokenDescription}
                    </span>
                </header>
                <div className="line"></div>
                </div>
                </div>
                </>
  )
  }

export default Dataprovider