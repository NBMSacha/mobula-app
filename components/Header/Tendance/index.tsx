import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';

function Tendance(props: any) {
    return (
        <div className="info-tendance">
            <div className="info-left">
                <p className="info-text">Cryptos: <span className="blue-data">24,598</span></p>
                <p className="info-text">DEX: <span className="blue-data">298</span></p>
                <p className="info-text">Tokens: <span className="blue-data">74,598</span></p>
            </div>
            <div className="info-left">
                <p className="info-text">DAO member: <span className="blue-data">24,598</span></p>
                <p className="info-text">Weekly DAO member: <span className="blue-data">+33 members</span></p>
            </div>

        </div>
    )
}

export default Tendance;