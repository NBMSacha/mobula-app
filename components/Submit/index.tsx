import React, { useEffect, useState } from 'react'
import { useAlert } from "react-alert";
import ipfsAPI from 'ipfs-api';
import { ethers } from 'ethers';

import { PROTOCOL_ADDRESS, supportedRPCs } from '../../constants';

function Submit() {
    const alert = useAlert();
    const [contract, setContract] = useState('')
    const [logo, setLogo] = useState('')
    const [description, setDescription] = useState('')
    const [audit, setAudit] = useState('')
    const [kyc, setKYC] = useState('')
    const [twitter, setTwitter] = useState('')
    const [telegram, setTelegram] = useState('')
    const [website, setWebsite] = useState('')

    const [ipfs, setIPFS] = useState<any>();

    const mountIPFS = async () => {
        try {
            setIPFS(ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' }));
        } catch (e) { }
    }
    useEffect(() => {
        mountIPFS()
    }, []);

    function isUrl(string: string) {
        let url: URL;

        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    return (
        <div className="listing">
            <div className="container">
                <header>
                    <h1>Listing form</h1>
                    <span>
                        Try to list a crypto-asset you support by submitting it here. Please read <a className="link" href="https://docs.mobula.finance/app/list">this</a> before submitting!
                    </span>
                </header>


                <div className="line"></div>
                <form>
                    <div>
                        <h2>General data</h2>
                        <div className="form-input">
                            <label htmlFor="contract">Contract address</label>
                            <div>
                                <input
                                    className="long"
                                    value={contract}
                                    onChange={(e) => setContract(e.target.value)}
                                    placeholder="0x..."
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="form-input">
                            <label htmlFor="logo">Logo link</label>
                            <div className="input-div">
                                <input
                                    className="long"
                                    name="logo"
                                    value={logo}
                                    onChange={(e) => setLogo(e.target.value)}
                                    placeholder="https://whaler.world/logo.png"
                                ></input>
                            </div>
                        </div>

                        <div className="form-input">
                            <label htmlFor="description">Description</label>
                            <div className="input-div">
                                <textarea
                                    className="textarea"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Whaler World is the best token."
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>Security data</h2>
                        <div className="form-input">
                            <label htmlFor="audit">Audit link (optional)</label>
                            <input
                                className="long"
                                name="audit"
                                value={audit}
                                onChange={(e) => setAudit(e.target.value)}
                                placeholder="https://staysafu.org/audits/whalerworld">
                            </input>
                        </div>
                        <div className="form-input">
                            <label htmlFor="KYC">KYC link (optional)</label>
                            <input
                                className="long"
                                name="KYC"
                                value={kyc}
                                onChange={(e) => setKYC(e.target.value)}
                                placeholder="https://staysafu.org/kyc/whalerworld"
                            ></input>
                        </div>
                    </div>

                    <div>
                        <h2>Social data</h2>
                        <div className="form-input">
                            <label htmlFor="twitter">Twitter</label>
                            <input
                                className="long"
                                name="twitter"
                                placeholder="https://twitter.com/WhalerWorld"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                            ></input>
                        </div>
                        <div className="form-input">
                            <label htmlFor="telegram">Chat</label>
                            <input
                                className="long"
                                name="telegram"
                                value={telegram}
                                onChange={(e) => setTelegram(e.target.value)}
                                placeholder="https://t.me/WhalerWorld"
                            ></input>
                        </div>
                        <div className="form-input">
                            <label htmlFor="website">Website</label>
                            <input
                                className="long"
                                name="website"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                placeholder="https://whaler.world"
                            ></input>
                        </div>
                        <button className="button"
                            onClick={async (e) => {

                                e.preventDefault();

                                if (!/0x[a-zA-z0-9]{40}/.test(contract)) {
                                    alert.error('Contract format is invalid.')
                                    return
                                }

                                if (logo === '' || !isUrl(logo)) {
                                    alert.error('The logo must be sent as an URL')
                                    return
                                }

                                if (description === '') {
                                    alert.error('A description must be provided.')
                                    return
                                }

                                if (audit !== '' && !isUrl(audit)) {
                                    alert.error('The audit must be sent as an URL')
                                    return
                                }

                                if (twitter !== '' && !isUrl(twitter)) {
                                    alert.error('The Twitter must be sent as an URL')
                                    return
                                }

                                if (telegram !== '' && !isUrl(telegram)) {
                                    alert.error('The chat must be sent as an URL')
                                    return
                                }

                                if (website !== '' && !isUrl(website)) {
                                    alert.error('The website must be sent as an URL')
                                    return
                                }

                                let name: string;
                                let symbol: string;
                                let i = -1;

                                while (!name && i < supportedRPCs.length - 1) {
                                    i++;
                                    const provider = new ethers.providers.JsonRpcProvider(supportedRPCs[i].url);
                                    const tokenContract = new ethers.Contract(contract, [
                                        'function name() external view returns(string)',
                                        'function symbol() external view returns(string)'
                                    ], provider)

                                    try {
                                        name = await tokenContract.name()
                                        symbol = await tokenContract.symbol()
                                    } catch (e) {
                                        console.log('Token is not on the ' + supportedRPCs[i].name)
                                    }
                                }

                                const tokenData = {
                                    contract: contract,
                                    chain: supportedRPCs[i].name,
                                    name: name,
                                    symbol: symbol,
                                    logo: logo,
                                    description: description,
                                    audit: audit,
                                    kyc: kyc,
                                    twitter: twitter,
                                    chat: telegram,
                                    website: website,
                                }

                                const JSONFile = new Blob([JSON.stringify(tokenData)], { type: 'text/plain' });

                                const bufferFile: any = await new Promise(resolve => {
                                    let fileReader = new FileReader()
                                    fileReader.onload = (event: any) => resolve(event.target.result)
                                    fileReader.readAsArrayBuffer(JSONFile)
                                });

                                let fileReader = new FileReader()
                                fileReader.readAsBinaryString(JSONFile);

                                const file =
                                {
                                    path: contract + '.json',
                                    content: bufferFile
                                }



                                const hash = await new Promise(async resolve => {
                                    ipfs.files.add(Buffer.from(bufferFile), (err: any, file: any) => {
                                        resolve(file[0].hash)
                                    })
                                })

                                try {
                                    var provider = new ethers.providers.Web3Provider((window as any).ethereum)
                                    var signer = provider.getSigner();
                                } catch (e) {
                                    alert.show('You must connect your wallet to submit the form.')
                                }

                                const submitPrice = (await new ethers.Contract(
                                    PROTOCOL_ADDRESS,
                                    [
                                        'function submitPrice() external view returns(uint256)',
                                    ], provider
                                ).submitPrice())

                                console.log(submitPrice, hash)

                                try {
                                    const value = await new ethers.Contract(
                                        PROTOCOL_ADDRESS,
                                        [
                                            'function submitIPFS(address token, string hashString) external payable',
                                        ], signer
                                    ).submitIPFS(contract, hash, {
                                        value: submitPrice
                                    });

                                    alert.show('Successfully submitted data.');
                                } catch (e) {
                                    if (e.data && e.data.message) {
                                        alert.error(e.data.message);
                                    } else {
                                        alert.error('Something went wrong.')
                                    }

                                }

                            }}

                        >Submit</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Submit