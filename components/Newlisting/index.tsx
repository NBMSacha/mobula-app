import React, { useEffect, useState } from 'react'


export default function Newlisting({tokens}) {
    const tokenList = tokens.slice(0, 10).map(token =>
      <>
      
      <tr>
        <td className="token-id">{token.id}</td>
        <td className="token-name"><img src={token.logo} className="token-logo" alt="token logo" />{token.name}<span className="token-symbol">{token.symbol}</span></td>
        <td className="token-links">{token.chat ? <a href={token.chat}><img className="links-icons" src="telegram.png"></img></a> : ""}{token.discord ? <a href={token.discord}><img className="links-icons" src="discord.png"></img></a> : ""}{token.website ? <a href={token.website}><img className="links-icons" src="website.png"></img></a> : ""}{token.twitter ? <a href={token.twitter}><img className="links-icons" src="twitter.png"></img></a> : ""}</td>
        <td className="token-contract">{token.contract.substring(0, 4) + '..' + token.contract.substring(token.contract.length - 4, token.contract.length)}</td>
        <td className="token-blockchain"><div className="blockchain">
          <div className="token-blockchain-images">
          {token.blockchain == "BNB" && <img src="bnb.png"></img>}
          {token.blockchain == "Ethereum" && <img src="eth.png"></img>}
          {token.blockchain == "Avalanche" && <img src="avax.png"></img>}
          </div>
          <span className="token-blockchain-name">{token.blockchain}</span>
        </div>

          </td>
        <td className="token-timestamp">{token.created_at}</td>
      </tr>
      
      </>
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
    <div className="tokenslisting">
    <table>
<thead>
<tr>
  <th className="token-id">#</th>
  <th className="token-name">Name</th>
  <th className="token-links">Links</th>
  <th className="token-contract">Contract</th>
  <th className="token-blockchain">Blockchain</th>
  <th className="token-timestamp">Added</th>
</tr>
<div className="table-line"></div>

</thead>
<tbody>
{tokenList}
</tbody>
</table>
    </div>
    </div>
    </div>
  )
}

