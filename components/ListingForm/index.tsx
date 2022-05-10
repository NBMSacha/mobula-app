import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';
import Tendance from '../Header/Tendance';
import IPFS from "ipfs-api";
import { PROTOCOL_ADDRESS, supportedRPCs } from '../../constants';
import { useAlert } from "react-alert";
import styles from "./ListingForm.module.scss"

function ListAToken(props: any) {
    const alert = useAlert();
    const [excluded, setExcluded] = useState('')
    const [contract, setContract] = useState('')
    const [logo, setLogo] = useState('')
    const [description, setDescription] = useState('')
    const [audit, setAudit] = useState('')
    const [kyc, setKYC] = useState('')
    const [twitter, setTwitter] = useState('')
    const [telegram, setTelegram] = useState('')
    const [website, setWebsite] = useState('');
    const [ipfs, setIPFS] = useState<any>();

    async function submit(e: any) {

        e.preventDefault();

        console.log('submitted')

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
            console.log(tokenContract)

            try {
                name = await tokenContract.name()
                symbol = await tokenContract.symbol()
            } catch (e) {
                console.log('Token is not on the ' + supportedRPCs[i].name)
            }
        }

        const tokenData = {
            contracts: [contract],
            chains: [supportedRPCs[i].name],
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
                    'function submitIPFS(address[] contractAddresses, address[] totalSupplyAddresses, address[] excludedCirculationAddresses, string ipfsHash) external payable',
                ], signer
            ).submitIPFS([contract], [contract], (excluded ? [excluded] : []), hash, {
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

    }

    const mountIPFS = async () => {
        const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" })
        try {
            setIPFS(IPFS('ipfs.infura.io', '5001', { protocol: 'https' }));
            console.log(ipfs)
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

    const [count, setCount] = useState(0);

    function test() {
        try {
            var error;
            var inputs = (document.getElementsByClassName('inputs') as any);
            document.getElementById('myForm').addEventListener("submit", (e) => {
                for (var i = 0; i < inputs.length; i++) {
                    if (!inputs[i].value) {
                        error = "Inputs can't be empty";
                        console.log(error)
                    }
                }
                if (error) {
                    e.preventDefault();
                    // WRITE ERROR
                    return false
                } else {
                    console.log("Send")
                }
            })
        } catch (err) { }
    }



    function moreInput() {
        const parent = document.getElementById("parent") as any;
        setCount(() => count + 1)
        if (count <= 4) {
            var input = document.createElement('input') as any;
            input.classList.add("inputCreated");
            input.placeholder = "0x...";
            input.type = "text"
            // input.value = 
            // value={twitter}
            //                     onChange={(e) => setTwitter(e.target.value)}
            parent.appendChild(input);
        }
    }

    return (
        <div>
            <div className={styles["listToken-container"]}>
                <div className={styles["title-listToken"]}>
                    <h2 className={styles["listingForm-title"]}>Listing Form</h2>
                    <p className={styles["listingForm-text"]}>Try to list an asset on Mobula by submitting it here. Make sure you red the docs before trying to submit. Current charge for submitting : 10 MATIC</p>
                </div>
                <div className={styles["listToken-main"]}>
                    <form className={styles["all-forms"]} id="myForm">
                        <div className={styles["three-forms"]}>
                            <h2>General Data</h2>
                            <div className={styles["form-container-box"]}>
                                <label >Contract Address *</label>
                                <input
                                    type="text"
                                    id="contract"
                                    value={contract}
                                    className={styles["inputs"]}
                                    placeholder="0x"
                                    onChange={(e) => setContract(e.target.value)}
                                    required
                                ></input>
                            </div>

                            <div className={styles["form-container-box"]}>
                                <label >Description *</label>
                                <textarea
                                    id="msg"
                                    name="description"
                                    className={styles["inputs"]}
                                    placeholder="Mobula the first decentralized data aggregator."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                >
                                </textarea>
                            </div >

                        </div>
                        <div className={styles["three-forms"]}>
                            <h2>Social Data</h2>
                            <div className={styles["form-container-box"]}>
                                <label >Twitter *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="twitter"
                                    placeholder="https://twitter.com/MobulaFi"
                                    value={twitter}
                                    required
                                    onChange={(e) => setTwitter(e.target.value)}
                                ></input>
                            </div>
                            <div className={styles["form-container-box"]}>
                                <label >Chat *</label>
                                <input
                                    value={telegram}
                                    required
                                    onChange={(e) => setTelegram(e.target.value)}
                                    type="text"
                                    id="tlg"
                                    name="telegram"
                                    placeholder="https://t.me/WhelerWorld" />
                            </div>
                            <div className={styles["form-container-box"]}>
                                <label >Website *</label>
                                <input
                                    required
                                    id="msg"
                                    name="website"
                                    placeholder="https://mobula.finance"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                ></input>
                            </div>
                            <div className={styles["form-container-box"]} >
                                <label >Logo Link *</label>
                                <input
                                    id="logo"
                                    className={styles["inputs"]}
                                    name="logo"
                                    value={logo}
                                    onChange={(e) => setLogo(e.target.value)}
                                    placeholder="https://app.mobula.finance/logo.png"
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className={styles["three-forms"]}>
                            <h2>Security Data</h2>
                            <div className={styles["form-container-box"]}>
                                <label >Audit Link (Optional) </label>
                                <input
                                    type="text"
                                    id="audit"
                                    name="audit"
                                    placeholder="https://safetin.com/audits/mobula"
                                    value={audit}
                                    onChange={(e) => setAudit(e.target.value)}
                                ></input>
                            </div>
                            <div className={styles["form-container-box"]}>
                                <label >KYC Link (Optional) &nbsp;:</label>
                                <input
                                    type="text"
                                    id="kyc"
                                    name="kyc"
                                    placeholder="https://staysafu.org/kyc/mobula"
                                    value={kyc}
                                    onChange={(e) => setKYC(e.target.value)}
                                ></input>
                            </div>
                            <div className={`${styles["form-container-box"]} ${styles["relative-form"]}`} id='parent'>
                                <label>Excluded from Circulation *</label>
                                <input
                                    name="excluded"
                                    placeholder="0x..."
                                    className={styles["inputPlus"]}
                                    value={excluded}
                                    onChange={(e) => setExcluded(e.target.value)}
                                ></input>
                                <button type="button" className={styles["absolute-btn"]} id="moreInput" onClick={() => moreInput()}>+</button>
                            </div>
                            <div className="button-submit" id="void">
                                <button className={styles["button-submit-form"]} id="submitForm" onClick={(e) => submit(e)}>Submit</button>
                            </div>
                            <div className={styles["button-submit"]} id="mobile-void">
                                <button className={styles["button-submit-form"]} onClick={(e) => submit(e)}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ListAToken;