import React, { useState } from 'react'
import { ethers } from 'ethers';
import { useAlert } from "react-alert";
import { PROTOCOL_ADDRESS, supportedRPCs } from '../../constants';

function Token(token: {
    name: string
    symbol: string
    contract: string
    logo: string
    description: string
    audit: string
    kyc: string
    twitter: string
    chat: string
    website: string
    isFirstSort: boolean
    alreadyVoted: boolean
    chain: string
}) {
    const alert = useAlert();
    const [voted, setVoted] = useState(token.alreadyVoted);

    function getExplorer(chain: string) {
        console.log('chain : ' + chain)
        for (const rpc of supportedRPCs) {
            if (rpc.name === chain) {
                return rpc.explorer;
            }
        }
    }

    return (
        <div className={(voted ? "voted token" : "token")}>
            <div className="head">
                <h2>
                    {token.name} (
                    <span>{token.symbol}</span>)
                </h2>
                <img src={token.logo} width="50" height="50" className="logo"></img>
            </div>

            <div className="body">
                <span>{token.description}</span>
                <div className="list">
                    <span><b>Audit</b> : {token.audit.split('https://').join('').split('http://').join('')}</span>
                    <span><b>KYC</b> : {token.kyc.split('https://').join('').split('http://').join('')}</span>
                    <span><b>Twitter</b> : {token.twitter.split('https://').join('').split('http://').join('')}</span>
                    <span><b>Chat</b> : {token.chat.split('https://').join('').split('http://').join('')}</span>
                    <span><b>Website</b> : {token.website.split('https://').join('').split('http://').join('')}</span>
                    <span><b>Contract</b> : <a style={{ 'color': 'white' }} target="_blank" href={getExplorer(token.chain) + '/token/' + token.contract}>Explorer</a> </span>
                </div>
                <div className="buttons">
                    <button className="button reject" onClick={async () => {
                        try {
                            var provider = new ethers.providers.Web3Provider((window as any).ethereum)
                            var signer = provider.getSigner();
                        } catch (e) {
                            alert.error('You must connect your wallet to submit the form.')
                        }

                        if (token.isFirstSort) {
                            try {
                                await new ethers.Contract(
                                    PROTOCOL_ADDRESS,
                                    [
                                        'function firstSortVote(address token, bool validate) external',
                                    ], signer
                                ).firstSortVote(token.contract, false);

                                setVoted(true)
                            } catch (e) {
                                if (e.data && e.data.message) {
                                    alert.error(e.data.message.split('\'')[1]);
                                } else {
                                    alert.error('Something went wrong.')
                                }
                            }
                        } else {
                            try {
                                await new ethers.Contract(
                                    PROTOCOL_ADDRESS,
                                    [
                                        'function finalDecisionVote(address token, bool validate) external',
                                    ], signer
                                ).finalDecisionVote(token.contract, false);

                                setVoted(true)

                            } catch (e) {
                                if (e.data && e.data.message) {
                                    alert.error(e.data.message.split('\'')[1]);
                                } else {
                                    alert.error('Something went wrong.')
                                }
                            }
                        }

                    }}>Reject</button>
                    <button className="button validate" onClick={async () => {
                        try {
                            var provider = new ethers.providers.Web3Provider((window as any).ethereum)
                            var signer = provider.getSigner();
                        } catch (e) {
                            alert.error('You must connect your wallet to submit the form.')
                        }

                        if (token.isFirstSort) {
                            try {
                                await new ethers.Contract(
                                    PROTOCOL_ADDRESS,
                                    [
                                        'function firstSortVote(address token, bool validate) external',
                                    ], signer
                                ).firstSortVote(token.contract, true);
                                setVoted(true)

                            } catch (e) {
                                if (e.data && e.data.message) {
                                    alert.error(e.data.message.split('\'')[1]);
                                } else {
                                    alert.error('Something went wrong.')
                                }
                            }
                        } else {
                            try {
                                await new ethers.Contract(
                                    PROTOCOL_ADDRESS,
                                    [
                                        'function finalDecisionVote(address token, bool validate) external',
                                    ], signer
                                ).finalDecisionVote(token.contract, true);
                                setVoted(true)

                            } catch (e) {
                                if (e.data && e.data.message) {
                                    alert.error(e.data.message.split('\'')[1]);
                                } else {
                                    alert.error('Something went wrong.')
                                }
                            }
                        }
                    }}>Validate</button>
                </div>
            </div>

        </div >
    )
}

export default Token