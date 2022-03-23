import React, { useEffect, useState } from 'react'
import { useAlert } from "react-alert";
import { ethers } from 'ethers';

import { MOBL_ADDRESS, GOVERNOR_ADDRESS, RPC_URL } from '../../constants';

function Governance() {
    const alert = useAlert();
    const [shares, setShares] = useState('0');
    const [deposit, setDeposit] = useState('')
    const [withdrawal, setWithdrawal] = useState('')
    const [proposal, setProposal] = useState('')
    const [liveProposals, setLiveProposals]: [JSX.Element[], any] = useState([<input
        className="long"
        value={'No proposals currently voted.'}
        onChange={(e) => e}
        placeholder="0x..."
        required
    ></input>])

    var provider: any;
    var account: string;


    async function initValues() {
        try {

            provider = new ethers.providers.JsonRpcProvider(RPC_URL);

            const governorContract = new ethers.Contract(
                GOVERNOR_ADDRESS,
                [
                    {
                        "inputs": [
                            {
                                //@ts-ignore
                                "internalType": "uint256",
                                "name": "top",
                                "type": "uint256"
                            }
                        ],
                        "name": "getLiveProposals",
                        "outputs": [
                            {
                                "components": [
                                    {
                                        "internalType": "uint256",
                                        "name": "id",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "author",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "createdAt",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "votesForYes",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "votesForNo",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "enum MobulaGovernor.Status",
                                        "name": "status",
                                        "type": "uint8"
                                    }
                                ],
                                //@ts-ignore
                                "internalType": "struct MobulaGovernor.Proposal[]",
                                "name": "",
                                "type": "tuple[]"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                //@ts-ignore
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "name": "shares",
                        "outputs": [
                            {
                                //@ts-ignore
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                //@ts-ignore
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "name": "proposals",
                        "outputs": [
                            {
                                //@ts-ignore
                                "internalType": "uint256",
                                "name": "id",
                                "type": "uint256"
                            },
                            {
                                //@ts-ignore
                                "internalType": "address",
                                "name": "author",
                                "type": "address"
                            },
                            {
                                //@ts-ignore
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                //@ts-ignore
                                "internalType": "uint256",
                                "name": "createdAt",
                                "type": "uint256"
                            },
                            {
                                //@ts-ignore
                                "internalType": "uint256",
                                "name": "votesForYes",
                                "type": "uint256"
                            },
                            {
                                //@ts-ignore
                                "internalType": "uint256",
                                "name": "votesForNo",
                                "type": "uint256"
                            },
                            {
                                //@ts-ignore
                                "internalType": "enum MobulaGovernor.Status",
                                "name": "status",
                                "type": "uint8"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    }
                ], provider
            )

            try {
                const walletProvider = new ethers.providers.Web3Provider((window as any).ethereum)
                const accounts = await provider.listAccounts();
                account = accounts[0];

                if (account) {
                    const shares = ethers.utils.formatEther((await governorContract.shares(account)));
                    setShares(shares);
                }
            } catch (e) { }

            let nextProposals = await governorContract.getLiveProposals(5);

            const newLiveProposals = []

            console.log(nextProposals)

            nextProposals.forEach((prop, index) => {
                if (prop.name) {
                    newLiveProposals.push(
                        <div key={index}>
                            <div className="form-input">
                                <div>
                                    <input
                                        className="long"
                                        value={prop.name}
                                        onChange={(e) => e}
                                        placeholder="0x..."
                                        required
                                    ></input>
                                </div>
                            </div>
                            <div className="buttonsDiv">
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
                                                GOVERNOR_ADDRESS,
                                                [
                                                    {
                                                        "inputs": [
                                                            {
                                                                //@ts-ignore
                                                                "internalType": "uint256",
                                                                "name": "_proposalId",
                                                                "type": "uint256"
                                                            },
                                                            {
                                                                //@ts-ignore
                                                                "internalType": "enum MobulaGovernor.VotingOptions",
                                                                "name": "_vote",
                                                                "type": "uint8"
                                                            }
                                                        ],
                                                        "name": "vote",
                                                        "outputs": [],
                                                        "stateMutability": "nonpayable",
                                                        "type": "function"
                                                    },], signer
                                            ).vote(prop.id.toNumber(), 1);
                                        } catch (e) {
                                            if (e.data && e.data.message) {
                                                alert.error(e.data.message.split('\'')[1]);
                                            } else {
                                                alert.error('Something went wrong.')
                                            } console.log(e)
                                        }

                                    }}

                                >No</button>
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
                                                GOVERNOR_ADDRESS,
                                                [
                                                    {
                                                        "inputs": [
                                                            {
                                                                //@ts-ignore
                                                                "internalType": "uint256",
                                                                "name": "_proposalId",
                                                                "type": "uint256"
                                                            },
                                                            {
                                                                //@ts-ignore
                                                                "internalType": "enum MobulaGovernor.VotingOptions",
                                                                "name": "_vote",
                                                                "type": "uint8"
                                                            }
                                                        ],
                                                        "name": "vote",
                                                        "outputs": [],
                                                        "stateMutability": "nonpayable",
                                                        "type": "function"
                                                    },], signer
                                            ).vote(prop.id.toNumber(), 0);
                                        } catch (e) {
                                            if (e.data && e.data.message) {
                                                alert.error(e.data.message.split('\'')[1]);
                                            } else {
                                                alert.error('Something went wrong.')
                                            } console.log(e)
                                        }

                                    }}

                                >Yes</button>
                            </div>
                        </div>);
                }
            })

            setLiveProposals(newLiveProposals);

        } catch (e) {
            //alert.show('You must connect your wallet to submit the form.')
            console.log(e)
        }
    }

    useEffect(() => {
        initValues()
    }, [])

    return (
        <div className="listing">
            <div className="container">
                <header>
                    <h1>Governance</h1>
                    <span>
                        You are in charge : deposit MOBL to be able to vote. Learn more <a className="link" href="https://docs.mobula.finance/governance">here</a>
                    </span>
                </header>

                <div className="line"></div>
                <form>
                    <div>
                        <h2>Voting power</h2>
                        <div className="form-input" >
                            <label htmlFor="contract">You currently deposited</label>
                            <div>
                                <input
                                    className="long"
                                    value={shares + ' $MOBL'}
                                    onChange={(e) => e}
                                    placeholder="0x..."
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="form-input">
                            <label htmlFor="contract">Deposit new tokens</label>
                            <div>
                                <input
                                    className="long"
                                    value={deposit}
                                    onChange={(e) => setDeposit(e.target.value)}
                                    placeholder="2000"
                                    required
                                ></input>
                            </div>
                        </div>
                        <button className="button" style={{ marginBottom: "1.5rem" }}
                            onClick={async (e) => {
                                e.preventDefault();

                                try {
                                    var provider = new ethers.providers.Web3Provider((window as any).ethereum)
                                    var signer = provider.getSigner();
                                } catch (e) {
                                    alert.show('You must connect your wallet to access the Dashboard.')
                                }

                                try {

                                    const approval = await new ethers.Contract(
                                        MOBL_ADDRESS,
                                        [
                                            'function approve(address spender, uint256 amount) public returns (bool)',
                                        ],
                                        signer,
                                    ).approve(GOVERNOR_ADDRESS, ethers.utils.parseEther(deposit));

                                    const success = await new ethers.Contract(
                                        GOVERNOR_ADDRESS,
                                        [
                                            'function deposit(uint256 amount) external',
                                        ], signer
                                    ).deposit(ethers.utils.parseEther(deposit));

                                    console.log(parseFloat(deposit))
                                    const newShares = parseFloat(shares) + parseFloat(deposit);
                                    setShares(String(newShares));
                                    setDeposit('0')
                                    alert.show('Deposit successful.')
                                } catch (e) {
                                    if (e.data && e.data.message) {
                                        alert.error(e.data.message.split('\'')[1]);
                                    } else {
                                        alert.error('Something went wrong.')
                                    }
                                }

                            }}

                        >Deposit</button>

                        <div className="form-input">
                            <label htmlFor="contract">Withdraw your tokens</label>
                            <div>
                                <input
                                    className="long"
                                    value={withdrawal}
                                    onChange={(e) => setWithdrawal(e.target.value)}
                                    placeholder="150"
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

                                    const success = await new ethers.Contract(
                                        GOVERNOR_ADDRESS,
                                        [
                                            'function withdraw(uint256 amount) external',
                                        ], signer
                                    ).withdraw(ethers.utils.parseEther(withdrawal));

                                    const newShares = parseFloat(shares) - parseFloat(withdrawal);
                                    setShares(String(newShares));
                                    setWithdrawal('0');
                                    alert.show('Withdrawal successful.');
                                } catch (e) {
                                    if (e.data && e.data.message) {
                                        alert.error(e.data.message.split('\'')[1]);
                                    } else {
                                        alert.error('Something went wrong.')
                                    }
                                }

                            }}

                        >Withdraw</button>
                    </div>



                </form>

                <form>
                    <div>
                        <h2>Governance process</h2>
                        <div className="form-input" >
                            <label htmlFor="contract">Create a proposal</label>
                            <div>
                                <input
                                    className="long"
                                    value={proposal}
                                    onChange={(e) => setProposal(e.target.value)}
                                    placeholder="The listing fee should be reduced to 10$"
                                    required
                                ></input>
                            </div>
                        </div>
                        <button className="button" style={{ marginBottom: "1.5rem" }}
                            onClick={async (e) => {
                                e.preventDefault();

                                try {
                                    var provider = new ethers.providers.Web3Provider((window as any).ethereum)
                                    var signer = provider.getSigner();
                                } catch (e) {
                                    alert.show('You must connect your wallet to access the Dashboard.')
                                }

                                try {

                                    const success = await new ethers.Contract(
                                        GOVERNOR_ADDRESS,
                                        [
                                            'function createProposal(string name) external',
                                        ], signer
                                    ).createProposal(proposal);

                                    setProposal('');
                                    initValues()
                                    alert.show('Proposal created successfully.');
                                } catch (e) {
                                    if (e.data && e.data.message) {
                                        alert.error(e.data.message.split('\'')[1]);
                                    } else {
                                        alert.error('Something went wrong.')
                                    }
                                }

                            }}

                        >Create</button>
                        <h2>Vote for current proposals</h2>

                        {liveProposals}

                    </div>



                </form>
            </div >
        </div >
    )
}

export default Governance