import React from 'react'

function Token({ id, logo, name, symbol, chat, discord, website, twitter, contract, blockchain, created_at }) {

  let date = new Date(created_at);
  let seconds = date.getTime();
  let postedDate = Math.round((Date.now() - seconds) / 1000);
  let format = "";
  if (postedDate < 60) {
    format = "seconds";
  }
  else if (60 <= postedDate && postedDate < 120) {
    format = "minute"
  }
  else if (120 <= postedDate && postedDate < 3600) {
    format = "minutes"
  }
  else if (3600 <= postedDate && postedDate < 7200) {
    format = "hour"
  }
  else if (7200 <= postedDate && postedDate < 86400) {
    format = "hours"
  }
  else if (86400 <= postedDate && postedDate < 172800) {
    format = "day"
  }
  else if (172800 <= postedDate) {
    format = "days"
  }

  if (blockchain) {
    if (blockchain.includes("BNB")) {
      blockchain = "BNB"
    }
    else if (blockchain.includes("Ethereum")) {
      blockchain = "Ethereum"
    }
    else if (blockchain.includes("Avalanche")) {
      blockchain = "Avalanche"
    }
    else if (blockchain.includes("Polygon")) {
      blockchain = "Polygon"
    }
    else if (blockchain.includes("Cronos")) {
      blockchain = "Cronos"
    }
    else if (blockchain.includes("Fantom")) {
      blockchain = "Fantom"
    }
  }

  const scanlink = () => {
    if (blockchain == "BNB") {
      return "https://bscscan.com/token/" + contract
    }
    else if (blockchain == "Ethereum") {
      return "https://etherscan.com/token/" + contract
    }
    else if (blockchain == "Avalanche") {
      return "https://snowtrace.io/token/" + contract

    }

    else if (blockchain == "Polygon") {
      return "https://polygonscan.com/token/" + contract
    }
    else if (blockchain == "Cronos") {
      return "https://cronoscan.com/token/" + contract
    }
    else if (blockchain == "Fantom") {
      return "https://ftmscan.com/token/" + contract
    }

  }
  return (
    <>
      <tr className="token-container">
        <td className="token-id">{id}</td>
        <td className="token-name"><img src={logo} className="token-logo" alt="token logo" />
          <a href={scanlink()} className="mobile">{name.substr(0, 15) + (name.length > 15 ? '..' : '')}</a><span className="browser">{name.substr(0, 15) + (name.length > 15 ? '..' : '')}</span><span className="token-symbol">{symbol}</span></td>
        <td className="token-links">
          {chat ? <a href={chat} target="_blank"><img className="links-icons" src="telegram.png"></img></a> : ""}
          {discord ? <a href={discord} target="_blank"><img className="links-icons" src="discord.png"></img></a> : ""}
          {website ? <a href={website} target="_blank"><img className="links-icons" src="website.png"></img></a> : ""}
          {twitter ? <a href={twitter} target="_blank"><img className="links-icons" src="twitter.png"></img></a> : ""}
        </td>
        <td className="token-contract">
          {blockchain == "BNB" && <a className="tokenURL" href={"https://bscscan.com/token/" + contract} target="_blank">{contract.substring(0, 4) + '..' + contract.substring(contract.length - 4, contract.length)}</a>}
          {blockchain == "Ethereum" && <a className="tokenURL" href={"https://etherscan.com/token/" + contract} target="_blank">{contract.substring(0, 4) + '..' + contract.substring(contract.length - 4, contract.length)}</a>}
          {blockchain == "Avalanche" && <a className="tokenURL" href={"https://snowtrace.io/token/" + contract} target="_blank">{contract.substring(0, 4) + '..' + contract.substring(contract.length - 4, contract.length)}</a>}
          {blockchain == "Polygon" && <a className="tokenURL" href={"https://polygonscan.com/token/" + contract} target="_blank">{contract.substring(0, 4) + '..' + contract.substring(contract.length - 4, contract.length)}</a>}
          {blockchain == "Cronos" && <a className="tokenURL" href={"https://ftmscan.com/token/" + contract} target="_blank">{contract.substring(0, 4) + '..' + contract.substring(contract.length - 4, contract.length)}</a>}
          {blockchain == "Fantom" && <a className="tokenURL" href={"https://cronoscan.com/token/" + contract} target="_blank">{contract.substring(0, 4) + '..' + contract.substring(contract.length - 4, contract.length)}</a>}

        </td>
        <td className="token-blockchain">
          <div className="blockchain">
            {blockchain == "BNB" && <img src="bnb.png"></img>}
            {blockchain == "Ethereum" && <img src="eth.png"></img>}
            {blockchain == "Avalanche" && <img src="avax.png"></img>}
            {blockchain == "Polygon" && <img src="polygon.png"></img>}
            {blockchain == "Cronos" && <img src="cronos.png"></img>}
            {blockchain == "Fantom" && <img src="fantom.png"></img>}

            <span className="token-blockchain-name">{blockchain}</span>
          </div>
        </td>
        <td className="token-timestamp">

          {format == "seconds" && <span>{postedDate} seconds ago</span>}
          {format == "minute" && <span>{Math.floor(postedDate / 60)} minute ago</span>}
          {format == "minutes" && <span>{Math.floor(postedDate / 60)} minutes ago</span>}
          {format == "hour" && <span>{Math.floor(postedDate / 3600)} hour ago</span>}
          {format == "hours" && <span>{Math.floor(postedDate / 3600)} hours ago</span>}
          {format == "day" && <span>{Math.floor(postedDate / 86400)} day ago</span>}
          {format == "days" && <span>{Math.floor(postedDate / 86400)} days ago</span>}
        </td>
      </tr>
    </>
  )
}

export default Token
