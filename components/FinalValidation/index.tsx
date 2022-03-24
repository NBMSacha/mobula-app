import React, { useEffect, useState } from 'react';
import Token from '../Token';
import { ethers } from 'ethers';
import { PROTOCOL_ADDRESS, RPC_URL } from '../../constants';

function FinaleValidation() {
    const [tokenDivs, setTokenDivs]: [JSX.Element[], any] = useState([])

    function getFinalValidations() {
        console.log('Starting the final sort')
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

        const protocolContract = new ethers.Contract(
            PROTOCOL_ADDRESS,
            [
                'function firstSortValidated(address token) public view returns (string)',
                'function getValidatedTokens() external view returns (address[])',
                'function finalDecisionVotes(address voter, address token) external view returns (bool)'
            ],
            provider,
        )

        protocolContract
            .getValidatedTokens()
            .catch((err: any) => {
                console.log(err)
                return [];
            })
            .then(async (tokens: any) => {

                const newTokenDivs = [];
                var account: any;

                try {
                    const providerWallet = new ethers.providers.Web3Provider((window as any).ethereum)
                    const accounts = await providerWallet.listAccounts();
                    account = accounts[0];
                } catch (e) { }

                let fails = 0;

                tokens.forEach(async (token: any, index: number) => {
                    var isAlreadyVoted = false;


                    if (account) {
                        isAlreadyVoted = await protocolContract.finalDecisionVotes(account, token);
                        console.log('Is already voted : ' + isAlreadyVoted)
                    }


                    const fileAddress = await protocolContract.firstSortValidated(token)

                    try {

                        const response = await fetch(
                            'https://gateway.ipfs.io/ipfs/' + fileAddress,
                        )

                        const JSONrep: {
                            name: string
                            symbol: string
                            contract: string
                            chain: string
                            logo: string
                            description: string
                            audit: string
                            kyc: string
                            twitter: string
                            chat: string
                            website: string
                        } = await response.json()

                        if (JSONrep.contract) {
                            newTokenDivs.push(
                                <Token
                                    name={JSONrep.name}
                                    symbol={JSONrep.symbol}
                                    contract={token}
                                    logo={JSONrep.logo}
                                    description={JSONrep.description}
                                    audit={JSONrep.audit}
                                    kyc={JSONrep.kyc}
                                    twitter={JSONrep.twitter}
                                    chat={JSONrep.chat}
                                    website={JSONrep.website}
                                    isFirstSort={false}
                                    alreadyVoted={isAlreadyVoted}
                                    key={token + Math.random()}
                                    chain={JSONrep.chain}
                                />,
                            )

                        } else {
                            fails++;
                        }
                    } catch (e) {
                        console.log('Error with ' + token + ' : ' + e)
                        fails++;
                    }


                    if (newTokenDivs.length + fails == tokens.length) {
                        console.log('DONE')
                        setTokenDivs(newTokenDivs)
                    }
                })

            })
    }

    useEffect(() => {
        getFinalValidations()
    }, []);

    return (
        <div className="final">
            <div className="container">
                <header>
                    <h1>Final Validation</h1>
                    <span>
                        The Final Validation is the last step of the Protocol. Vote wisely. Learn more <a className="link" href="https://docs.mobula.finance/validation">here</a>
                    </span>
                </header>

                <div className="line"></div>

                <div className="tokens-div">
                    {tokenDivs}
                </div>

            </div >
        </div >
    )
}

export default FinaleValidation;