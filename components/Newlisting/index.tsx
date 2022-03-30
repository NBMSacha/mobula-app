import React, { useEffect, useState } from 'react'


export default function Newlisting({tokens}) {
    const tokenList = tokens.slice(0, 10).map(token =>
        <div className="token--container" key={token.id}>
      <div className="token--name">{token.name}</div>
      <div className="token--symbol">({token.symbol})</div>
        <div className="token--description">{token.description}</div>
        <div className="token--contract"><a href={`https://etherscan.io/token/${token.contract}`}>Check the contract</a></div>
        <div className="token--audit">Audits: {token.audit}</div>
        <div className="token--kyc">KYC: {token.kyc}</div>
        <div className="token--website">Website: {token.website}</div>
        <div className="token--twitter">Twitter: {token.twitter}</div>
        <div className="token--chat">Telegram: {token.chat}</div>
       </div>
        )
  return (
    <div className="listing">
    <div className="container">
        <header>
            <h1>New Listing</h1>
            <span>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda error quibusdam debitis nulla, magnam, asperiores dolore ullam a temporibus quas adipisci tempora doloribus accusamus, veritatis repudiandae quia! Cum, repudiandae corporis.
            </span>
        </header>
        <div className="line"></div>
    <div className="tokenslisting">
        {tokenList}
    </div>
    </div>
    </div>
  )
}

