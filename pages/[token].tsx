import React, { useState} from 'react'
const ethers = require('ethers');
const axios = require('axios');
const provider = ethers.getDefaultProvider("https://polygon-rpc.com")
const API_ADDRESS = "0x76edF9562F2Cca3bc36DB2ed58A4adC0b10F1048"
const apiContract = new ethers.Contract(API_ADDRESS, 
        ['function staticData(address token) external view returns(string)'], provider)




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
      if(r.data.chain.includes("BNB")) {
        setTokenChain("BNB")
      }
      else if(r.data.chain.includes("Ethereum")) {
        setTokenChain("Ethereum")
      }
      else if(r.data.chain.includes("Avalanche")) {
        setTokenChain("Avalanche")
      }
      else if(r.data.chain.includes("Fantom")) {
        setTokenChain("Fantom")
      }
      else if(r.data.chain.includes("Polygon")) {
        setTokenChain("Polygon")
      }
      else if(r.data.chain.includes("Cronos")) {
        setTokenChain("Cronos")
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
                        {tokenChain == "BNB" && <img className="blockchain-details-image" src="bnb.png"></img>}
                        {tokenChain == "Ethereum" && <img className="blockchain-details-image" src="eth.png"></img>}
                        {tokenChain == "Avalanche" && <img className="blockchain-details-image" src="avax.png"></img>}
                        {tokenChain == "Fantom" && <img className="blockchain-details-image" src="fantom.png"></img>}
                        {tokenChain == "Ethereum" && <img className="blockchain-details-image" src="eth.png"></img>}
                        {tokenChain == "Avalanche" && <img className="blockchain-details-image" src="avax.png"></img>}
                        </div>
                        
                          <span className="blockchain-details-text">{tokenChain}</span>
                        
                      </div>
                      <div className="contract-details"><span className="contract-details-text">
                      {tokenChain == "BNB" && <a className="tokenURL" href={"https://bscscan.com/token/" + tokenContract} target="_blank">{tokenContract.substring(0, 4) + '..' + tokenContract.substring(tokenContract.length - 4, tokenContract.length)}</a>}
                      {tokenChain == "Ethereum" && <a className="tokenURL" href={"https://etherscan.com/token/" + tokenContract} target="_blank">{tokenContract.substring(0, 4) + '..' + tokenContract.substring(tokenContract.length - 4, tokenContract.length)}</a>}
                       {tokenChain == "Avalanche" && <a className="tokenURL" href={"https://snowtrace.io/token/" + tokenContract} target="_blank">{tokenContract.substring(0, 4) + '..' + tokenContract.substring(tokenContract.length - 4, tokenContract.length)}</a>}
                       {tokenChain == "Fantom" && <a className="tokenURL" href={"https://ftmscan.com/token/" + tokenContract} target="_blank">{tokenContract.substring(0, 4) + '..' + tokenContract.substring(tokenContract.length - 4, tokenContract.length)}</a>}
                       {tokenChain == "Polygon" && <a className="tokenURL" href={"https://polygonscan.com/token/" + tokenContract} target="_blank">{tokenContract.substring(0, 4) + '..' + tokenContract.substring(tokenContract.length - 4, tokenContract.length)}</a>}
                       {tokenChain == "Cronos" && <a className="tokenURL" href={"https://cronoscan.com/token/" + tokenContract} target="_blank">{tokenContract.substring(0, 4) + '..' + tokenContract.substring(tokenContract.length - 4, tokenContract.length)}</a>}

                       </span></div>
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