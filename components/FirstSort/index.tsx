import React, { useEffect, useState } from 'react';
import Token from '../Token';
import { ethers } from 'ethers';
import { PROTOCOL_ADDRESS, RPC_URL } from '../../constants';

function FirstSort() {
    const [tokenDivs, setTokenDivs]: [JSX.Element[], any] = useState([])

    function getFirstSorts() {
        console.log('Starting the first sort')
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

        const protocolContract = new ethers.Contract(
            PROTOCOL_ADDRESS,
            [
                'function submittedData(address token) public view returns (string)',
                'function getSubmittedTokens() external view returns (address[])',
                'function firstSortVotes(address voter, address token) external view returns (bool)'
            ],
            provider,
        )

        protocolContract
            .getSubmittedTokens()
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
                        isAlreadyVoted = await protocolContract.firstSortVotes(account, token);
                        console.log('Is already voted : ' + isAlreadyVoted)
                    }


                    const fileAddress = await protocolContract.submittedData(token)

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
                            console.log('Pushing')
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
                                    isFirstSort={true}
                                    alreadyVoted={isAlreadyVoted}
                                    key={token + Math.random()}
                                    chain={JSONrep.chain}
                                />,
                            )

                        } else {
                            fails++;
                        }

                        if (newTokenDivs.length + fails == tokens.length) {
                            console.log('DONE')
                            setTokenDivs(newTokenDivs)
                        }
                    } catch (e) {
                        console.log('Error with ' + token + ' : ' + e)
                        fails++;
                    }



                })

            })
    }

    useEffect(() => {
        getFirstSorts()
    }, []);

    return (
        <div className="final">
            <div className="container">
                <header>
                    <h1>First Sort</h1>
                    <span>
                        The First Sort is a key step of the Protocol. Vote wisely. Learn more <a className="link" href="https://docs.mobula.finance/app/sort">here</a>
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

export default FirstSort;