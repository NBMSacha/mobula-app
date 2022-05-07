import React, { useState, useEffect } from 'react'
const ethers = require('ethers');
const axios = require('axios');
const provider = ethers.getDefaultProvider("https://polygon-rpc.com")
const API_ADDRESS = "0x76edF9562F2Cca3bc36DB2ed58A4adC0b10F1048"
const apiContract = new ethers.Contract(API_ADDRESS,
    ['function staticData(address token) external view returns(string)'], provider)
import Chart from '../../components/Chart/index.jsx';

export const getServerSideProps = (context) => {
    return {
        props: {
            asset: context.query.asset
        }
    }
}

function Dataprovider({ asset }) {
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

    return (
        <Chart id={asset} />
    )
}

export default Dataprovider