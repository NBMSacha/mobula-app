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
    const [description, setDescription] = useState(token.description.substr(0, 150));
    const [readMore, setReadMore] = useState('Read more');

    function getExplorer(chain: string) {
        console.log('chain : ' + chain)
        for (const rpc of supportedRPCs) {
            if (rpc.name === chain) {
                return rpc.explorer;
            }
        }
    }

    function changeDescription() {
        if (readMore == 'Read more') {
            setReadMore('Less')
            setDescription(token.description)
        } else {
            setReadMore('Read more')
            setDescription(token.description.substr(0, 150))
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
                <span>{description}{token.description.length > 250 ? <button className="readmore" onClick={changeDescription}>{readMore}</button> : <></>}</span>
                <div className="list">
                    {(token.audit ? <span onClick={() => window.open(token.audit)}><b>Audit</b> : <span>{token.audit.split('https://').join('').split('http://').join('')}</span></span> : '')}
                    {(token.kyc ? <span onClick={() => window.open(token.kyc)}><b>KYC</b> : <span>{token.kyc.split('https://').join('').split('http://').join('')}</span></span> : '')}
                    {(token.twitter ? <span onClick={() => window.open('https://twitter.com/' + token.twitter.split('https://').join('').split('http://').join('').split('twitter.com/').join(''))}><b>Twitter</b> : <span>{'twitter.com/' + token.twitter.split('https://').join('').split('http://').join('').split('twitter.com/').join('')}</span></span> : '')}
                    {(token.chat ? <span onClick={() => window.open(token.chat)}><b>Chat</b> : <span>{token.chat.split('https://').join('').split('http://').join('')}</span></span> : '')}
                    {(token.website ? <span onClick={() => window.open(token.website)}><b>Website</b> : <span>{token.website.split('https://').join('').split('http://').join('')}</span></span> : '')}
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
                                    alert.error(e.data.message);
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
                                    alert.error(e.data.message);
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
                                    alert.error(e.data.message);
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
                                    alert.error(e.data.message);
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
