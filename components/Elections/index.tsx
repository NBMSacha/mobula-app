import React, { useEffect, useState } from 'react'
import { useAlert } from "react-alert";
import { ethers } from 'ethers';
import { PROTOCOL_ADDRESS, RPC_URL } from '../../constants';

function Elections() {
    const alert = useAlert();
    const [membersToPromoteOne, setMembersToPromoteOne] = useState(0)
    const [membersToPromoteTwo, setMembersToPromoteTwo] = useState(0)
    const [membersToDemoteOne, setMembersToDemoteOne] = useState(0)
    const [membersToDemoteTwo, setMembersToDemoteTwo] = useState(0)
    const [promoteAddress, setPromoteAddress] = useState("")
    const [demoteAddress, setDemoteAddress] = useState("")
    var provider: any;
    var account: string;
    async function initValues() {
        try {
            const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
            const accounts = await provider.listAccounts();
            account = accounts[0];

            const protocolContract = new ethers.Contract(
                PROTOCOL_ADDRESS,
                [
                    "function membersToPromoteToRankI() external view returns(uint256)",
                    "function membersToPromoteToRankII() external view returns(uint256)",
                    "function membersToDemoteFromRankI() external view returns(uint256)",
                    "function membersToDemoteFromRankII() external view returns(uint256)"
                ], provider)
            const membersToPromoteToRankI = (await protocolContract.membersToPromoteToRankI()).toNumber();
            const membersToPromoteToRankII = (await protocolContract.membersToPromoteToRankII()).toNumber();
            const membersToDemoteFromRankI = (await protocolContract.membersToDemoteFromRankI()).toNumber();
            const membersToDemoteFromRankII = (await protocolContract.membersToDemoteFromRankII()).toNumber();
            setMembersToPromoteOne(membersToPromoteToRankI)
            setMembersToPromoteTwo(membersToPromoteToRankII)
            setMembersToDemoteOne(membersToDemoteFromRankI)
            setMembersToDemoteTwo(membersToDemoteFromRankII)

        } catch (e) {
            //alert.show('You must connect your wallet to access your Dashboard.')
        }
    }
    useEffect(() => {
        initValues()
    }, [])

    return (
        <>
            <div className="listing">
                <div className="container">
                    <header>
                        <h1>Elections</h1>
                        <span>
                            Decide who deserves to be part of the Protocol DAO, and who should no longer be part of it.
                        </span>
                    </header>
                    <div className="line"></div>
                    <form>

                        <h2>Promotion</h2>
                        <div className="form-input">
                            <label htmlFor="amount">Amount of Rank I seats</label>
                            <div>
                                <input
                                    className="long"
                                    value={membersToPromoteOne + " members"}
                                    onChange={(e) => e}
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="form-input">
                            <label htmlFor="contract">Amount of Rank II seats</label>
                            <div>
                                <input
                                    className="long"
                                    value={membersToPromoteTwo + " members"}
                                    onChange={(e) => e}
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="form-input">
                            <label htmlFor="address">Address to promote</label>
                            <div>
                                <input
                                    className="long"
                                    onChange={(e) => setPromoteAddress(e.target.value)}
                                    placeholder="0x..."
                                    required
                                ></input>
                            </div>
                        </div>
                        <button className="button" style={{ width: 150 }} onClick={async (e) => {
                            e.preventDefault
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
                                        'function promote(address promoted) external',
                                        'promoteVotes(address promoted) returns (uint256)'

                                    ], signer
                                )
                                const promotevotes = await value.promoteVotes(promoteAddress)
                                await value.promote(promoteAddress)
                                alert.show(promotevotes + " votes to promote")

                            } catch (e) {
                                alert.show('You can\'t promote this address')
                                console.log(e)
                            }

                        }

                        }>Promote</button>




                    </form>


                    <form>

                        <h2>Demotion</h2>
                        <div className="form-input">
                            <label htmlFor="amount">Amount of Rank I to demote</label>
                            <div>
                                <input
                                    className="long"
                                    value={membersToDemoteOne + " members"}
                                    onChange={(e) => e}
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="form-input">
                            <label htmlFor="contract">Amount of Rank II to demote</label>
                            <div>
                                <input
                                    className="long"
                                    value={membersToDemoteTwo + " members"}
                                    onChange={(e) => e}
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="form-input">
                            <label htmlFor="address">Address to demote</label>
                            <div>
                                <input
                                    className="long"
                                    onChange={(e) => setDemoteAddress(e.target.value)}
                                    placeholder="0x..."
                                    required
                                ></input>
                            </div>
                        </div>
                        <button className="button" style={{ width: 150 }} onClick={async (e) => {
                            e.preventDefault
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
                                        'function demote(address demoted) external',
                                        'demoteVotes(address promoted) returns (uint256)'

                                    ], signer
                                )
                                const demotevotes = await value.demoteVotes(promoteAddress)
                                await value.depromote(demoteAddress)
                                alert.show(demotevotes + " votes to promote")

                            } catch (e) {
                                alert.show('You can\'t demote this address')
                                console.log(e)
                            }

                        }
                        }>Demote</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Elections