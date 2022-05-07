import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';

function Tendance(props: any) {

    return (
        <div className="info-tendance">
            <div className="info-left">
                <p className="info-text">Crypto: <span className="blue-data">{props.assets}</span></p>
                <p className="info-text">DEX: <span className="blue-data">{props.dex}</span></p>
                <p className="info-text">MOBL: <span className="blue-data">0$</span></p>
            </div>
            <div className="info-left">
                <p className="info-text">DAO member: <span className="blue-data">{props.dao}</span></p>
                <p className="info-text">7d new listings: <span className="blue-data">{props.listings}</span></p>
            </div>

        </div>
    )
}

export default Tendance;