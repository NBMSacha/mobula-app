import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';

function Link(props: any) {
    return (
        <div className="link-container">
            <span className="link-common" onClick={() => document.location.href = "soon"}>New</span>
            <span className="link-common" onClick={() => document.location.href = "soon"}>Gainers & Losers</span>
            <span className="link-common" onClick={() => document.location.href = "soon"}>Earn</span>
            <span className="link-common" onClick={() => document.location.href = "soon"}>DEX</span>
            <span className="link-common" onClick={() => document.location.href = "soon"}>DAO</span>
            <span className="link-common" onClick={() => document.location.href = "list"}>List an asset</span>
        </div>
    )
}

export default Link;