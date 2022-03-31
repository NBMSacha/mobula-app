import React, { useEffect, useState } from 'react'


export default function Newlisting({tokens}) {
    const tokenList = tokens.slice(0, 10).map(token => {
      let date = new Date(token.created_at);
      let seconds = date.getTime();
      let postedDate = Math.round((Date.now() - seconds)/ 1000);
      let format = "";
      if(postedDate < 60) {
        format = "seconds";
      }
      else if(60 <= postedDate && postedDate < 120)
      {
        format = "minute"
      }
      else if(120 <= postedDate && postedDate < 3600) {
        format = "minutes"
      }
      else if(3600 <= postedDate && postedDate < 7200) {
        format = "hour"
      }
      else if(7200 <= postedDate && postedDate < 86400) {
        format ="hours"
      }
      else if(86400 <= postedDate && postedDate < 172800) {
        format = "day"
      }
      else if(172800 <= postedDate) {
        format = "days"
      }
       return  <>
      
      <tr className="token-container">
        <td  className="token-id">{tokens.indexOf(token) + 1}</td>
        <td className="token-name"><img src={token.logo} className="token-logo" alt="token logo" />{token.name}<span className="token-symbol">{token.symbol}</span></td>
        <td className="token-links">
          {token.chat ? <a href={token.chat} target="_blank"><img className="links-icons" src="telegram.png"></img></a> : ""}
          {token.discord ? <a href={token.discord} target="_blank"><img className="links-icons" src="discord.png"></img></a> : ""}
          {token.website ? <a href={token.website} target="_blank"><img className="links-icons" src="website.png"></img></a> : ""}
          {token.twitter ? <a href={token.twitter} target="_blank"><img className="links-icons" src="twitter.png"></img></a> : ""}</td>
        <td className="token-contract">
          {token.blockchain == "BNB" && <a className="tokenURL" href={"https://bscscan.com/token/" + token.contract} target="_blank">{token.contract.substring(0, 4) + '..' + token.contract.substring(token.contract.length - 4, token.contract.length)}</a>}
          {token.blockchain == "Ethereum" && <a className="tokenURL" href={"https://etherscan.com/token/" + token.contract} target="_blank">{token.contract.substring(0, 4) + '..' + token.contract.substring(token.contract.length - 4, token.contract.length)}</a>}
          {token.blockchain == "Avalanche" && <a className="tokenURL" href={"https://snowtrace.io/token/" + token.contract} target="_blank">{token.contract.substring(0, 4) + '..' + token.contract.substring(token.contract.length - 4, token.contract.length)}</a>}
          </td>
        <td className="token-blockchain"><div className="blockchain">
          <div className="token-blockchain-images">
          {token.blockchain == "BNB" && <img src="bnb.png"></img>}
          {token.blockchain == "Ethereum" && <img src="eth.png"></img>}
          {token.blockchain == "Avalanche" && <img src="avax.png"></img>}
          </div>
          <span className="token-blockchain-name">{token.blockchain}</span>
        </div>

          </td>
        <td className="token-timestamp">
          
          {format == "seconds" && <span>{postedDate} seconds ago</span> }
          {format == "minute" && <span>{Math.floor(postedDate/60)} minute ago</span>}
          {format == "minutes" && <span>{Math.floor(postedDate/60)} minutes ago</span>}
          {format == "hour" && <span>{Math.floor(postedDate/3600)} hour ago</span>}
          {format == "hours" && <span>{Math.floor(postedDate/3600)} hours ago</span>}
          {format == "day" && <span>{Math.floor(postedDate/86400)} day ago</span>}
          {format == "days" && <span>{Math.floor(postedDate/86400)} days ago</span>}
          </td>
        
      </tr>

      </>
    }
        )
      
    
  return (
    <div className="listing">
    <div className="container">
    
        <header>
            <h1>Recently Added</h1>
            <span>
            Find out what are the latest tokens listed on Mobula!
            </span>
        </header>
        <div className="line"></div>
    <table>
<thead>
<tr className="table-head">
  <th className="token-id">#</th>
  <th className="token-name">Name</th>
  <th className="token-links">Links</th>
  <th className="token-contract">Contract</th>
  <th className="token-blockchain">Blockchain</th>
  <th className="token-timestamp">Added</th>
</tr>

</thead>
<tbody>
{tokenList}
</tbody>
</table>
    </div>
    </div>
  )
}

