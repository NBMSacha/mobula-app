import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';

function Link(props: any) {
    return (
        <div className="link-container">
            <span className="link-common" onClick={() => document.location.href = "dataprovider"}>New</span>
            <span className="link-common" onClick={() => document.location.href = "new"}>Gainers & Losers</span>
            <span className="link-common" onClick={() => document.location.href = "governance"}>Trending</span>
            <span className="link-common" onClick={() => document.location.href = "elections"}>DEX</span>
            <span className="link-common" onClick={() => document.location.href = "dashboard"}>DAO</span>
            <span className="link-common" onClick={() => document.location.href = "sort"}>List an asset</span>
        </div>
    )
}

export default Link;