import React, { useEffect, useState } from 'react'
import { useAlert } from "react-alert";
import { ethers } from 'ethers';

import { PROTOCOL_ADDRESS } from '../../constants';

function Dashboard() {
    const alert = useAlert();
    const [tokensOwed, setTokensOwed] = useState(0);
    const [goodChoice, setGoodChoice] = useState(0);
    const [badChoice, setBadChoice] = useState(0);

    var provider: any;
    var account: string;


    async function initValues() {
        try {
            provider = new ethers.providers.Web3Provider((window as any).ethereum)
            const accounts = await provider.listAccounts();
            account = accounts[0];

            const protocolContract = new ethers.Contract(
                PROTOCOL_ADDRESS,
                [
                    'function paidFirstVotes(address voter) external view returns(uint256)',
                    'function goodFirstVotes(address voter) external view returns(uint256)',
                    'function badFirstVotes(address voter) external view returns(uint256)'
                ], provider
            )
            const paidVotes = (await protocolContract.paidFirstVotes(account)).toNumber();
            const goodVotes = (await protocolContract.goodFirstVotes(account)).toNumber();
            const badVotes = (await protocolContract.badFirstVotes(account)).toNumber();

            setTokensOwed(goodVotes - paidVotes);
            setGoodChoice(goodVotes)
            setBadChoice(badVotes);
        } catch (e) {
            alert.show('You must connect your wallet to access your Dashboard.')
        }
    }

    useEffect(() => {
        initValues()
    }, [])

    return (
        <div className="listing">
            <div className="container">
                <header>
                    <h1>Dashboard</h1>
                    <span>
                        If you helped the Protocol, you deserve a reward. You're free to claim your tokens. Learn more <a className="link" href="https://docs.mobula.finance/app/dashboard">here</a>
                    </span>
                </header>


                <div className="line"></div>
                <form>
                    <div>
                        <h2>Stats</h2>
                        <div className="form-input">
                            <label htmlFor="contract">The Protocol owes currently owes you</label>
                            <div>
                                <input
                                    className="long"
                                    value={tokensOwed + ' $MOBL'}
                                    onChange={(e) => e}
                                    placeholder="0x..."
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="form-input">
                            <label htmlFor="contract">You made a good choice</label>
                            <div>
                                <input
                                    className="long"
                                    value={goodChoice + ' times'}
                                    onChange={(e) => e}
                                    placeholder="0x..."
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="form-input">
                            <label htmlFor="contract">You made a bad choice</label>
                            <div>
                                <input
                                    className="long"
                                    value={badChoice + ' times'}
                                    onChange={(e) => e}
                                    placeholder="0x..."
                                    required
                                ></input>
                            </div>
                        </div>
                        <button className="button"
                            onClick={async (e) => {
                                e.preventDefault();

                                try {
                                    var provider = new ethers.providers.Web3Provider((window as any).ethereum)
                                    var signer = provider.getSigner();
                                } catch (e) {
                                    alert.show('You must connect your wallet to access the Dashboard.')
                                }

                                try {
                                    const value = await new ethers.Contract(
                                        PROTOCOL_ADDRESS,
                                        [
                                            'function claimRewards() external',
                                        ], signer
                                    ).claimRewards();
                                } catch (e) {
                                    alert.show('You don\'t have anything to claim.')
                                    console.log(e)
                                }

                            }}

                        >Claim</button>
                    </div>



                </form>
            </div >
        </div >
    )
}

export default Dashboard