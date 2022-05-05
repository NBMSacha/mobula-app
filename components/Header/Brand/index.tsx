import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';

function Brand(props: any) {
    return (
        <div className="left">
        <img src='newIcon.png' className="head-logo" alt="logo" onClick={() => document.location.href = "/"} />
        <div className="mobula-title">Mobula</div>
    </div>
    )
}

export default Brand;