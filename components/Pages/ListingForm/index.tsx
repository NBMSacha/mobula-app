import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';
import Tendance from '../../Page/Header/Tendance';
import IPFS from "ipfs-api";
import { PROTOCOL_ADDRESS, supportedRPCs } from '../../../constants';
import { useAlert } from "react-alert";
import { Upload } from "react-feather"
import styles from "./ListingForm.module.scss";
import { Spinner } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"
import { ChakraProvider, Input, Image, Flex, Box, Text, useColorModeValue, Textarea } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Radio, RadioGroup, Button } from '@chakra-ui/react'

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
    const [isSum, setIsSum] = useState(false);
    const [loading, setLoading] = useState(false);
    const [discord, setDiscord] = useState("")
    const [addNote, setAddNote] = useState("")
    const [uploadedImage, setUploadedImage]: [any, Function] = useState();

    async function submit(e: any) {

        e.preventDefault();

        setLoading(true);
        console.log('submitted')

        if (!/0x[a-zA-z0-9]{40}/.test(contract) || contract.length != 42) {
            alert.error('Contract format is invalid.')
            setLoading(false)
            return
        }

        if (excluded && (!/0x[a-zA-z0-9]{40}/.test(excluded) || excluded.length != 42)) {
            alert.error('Excluded from circulation format is invalid.')
            setLoading(false)
            return
        }

        if (logo === '' || !isUrl(logo)) {
            alert.error('The logo must be sent as an URL')
            setLoading(false)
            return
        }

        if (description === '') {
            alert.error('A description must be provided.')
            setLoading(false)
            return
        }

        if (audit !== '' && !isUrl(audit)) {
            alert.error('The audit must be sent as an URL')
            setLoading(false)
            return
        }

        if (kyc !== '' && !isUrl(kyc)) {
            alert.error('The KYC must be sent as an URL')
            setLoading(false)
            return
        }

        if (twitter !== '' && !isUrl(twitter)) {
            alert.error('The Twitter must be sent as an URL')
            setLoading(false)
            return
        }

        if (telegram !== '' && !isUrl(telegram)) {
            alert.error('The chat must be sent as an URL')
            setLoading(false)
            return
        }

        if (website !== '' && !isUrl(website)) {
            alert.error('The website must be sent as an URL')
            setLoading(false)
            return
        }

        let contracts = Object.values(objectForContract).filter((contract: any) => contract.length == 42);
        const chains = []

        for (const contract of contracts) {
            let name: string;
            let i = -1;

            while (!name && i < supportedRPCs.length - 1) {
                i++;
                const provider = new ethers.providers.JsonRpcProvider(supportedRPCs[i].url);
                const tokenContract = new ethers.Contract(contract, [
                    'function name() external view returns(string)',
                ], provider)
                console.log(tokenContract)

                try {
                    name = await tokenContract.name()
                } catch (e) {
                    console.log('Token is not on the ' + supportedRPCs[i].name)
                }
            }

            if (supportedRPCs[i]?.name) {
                chains.push(supportedRPCs[i].name)
            } else {
                contracts[contracts.indexOf(contract)] = null
            }

        }

        contracts = contracts.filter(contract => contract);

        const tokenData = {
            contracts,
            chains,
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

        console.log(provider, signer)

        const submitPrice = (await new ethers.Contract(
            PROTOCOL_ADDRESS,
            [
                'function submitPrice() external view returns(uint256)',
            ], provider
        ).submitPrice())

        console.log(submitPrice, hash)

        const totalSupply = isSum ? contracts : [contract];
        const realExcluded = Object.values(objectForExcluded).filter((excluded: any) => excluded.length == 42);

        try {

            const value = await new ethers.Contract(
                PROTOCOL_ADDRESS,
                [
                    'function submitIPFS(address[] contractAddresses, address[] totalSupplyAddresses, address[] excludedCirculationAddresses, string ipfsHash) external payable',
                ], signer
            ).submitIPFS(contracts, totalSupply, realExcluded, hash, {
                value: submitPrice
            });

            alert.show('Successfully submitted data.');
        } catch (e) {
            if (e.data && e.data.message) {
                alert.error('You don\'t have 10 MATIC in your wallet.');
            } else {
                alert.error('Something went wrong.')
                console.log(e)
            }

        }

        setLoading(false)

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
    const [counts, setCounts] = useState(0);
    // const [excluded, setExcluded ] = useState()

    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [excluded1, setExcluded1] = useState('');
    const [excluded2, setExcluded2] = useState('');
    const [excluded3, setExcluded3] = useState('');
    const [excluded4, setExcluded4] = useState('');
    const [excluded5, setExcluded5] = useState('');

    function moreInputExcluded() {
        const parent = document.getElementById("parent") as any;
        setCount(() => count + 1)
        if (count <= 4) {
            var inputs = document.createElement('input') as any;
            inputs.classList.add("inputCreated");
            inputs.placeholder = "0x...";
            inputs.style.background = input
            inputs.style.paddingLeft = "10px"
            inputs.style.color = "none"
            inputs.type = "text"
            parent.appendChild(inputs);
        }
        if (count == 0) {
            inputs.addEventListener("change", () => {
                setExcluded1(inputs.value);
            })
            inputs.value = excluded1;
        }
        if (count == 1) {
            inputs.addEventListener("change", () => {
                setExcluded2(inputs.value);
            })
            inputs.value = excluded2;
        }
        if (count == 2) {
            inputs.addEventListener("change", () => {
                setExcluded3(inputs.value);
            })
            inputs.value = excluded3;
        }
        if (count == 3) {
            inputs.addEventListener("change", () => {
                setExcluded4(inputs.value);
            })
            inputs.value = excluded4;
        }
        if (count == 4) {
            inputs.addEventListener("change", () => {
                setExcluded5(inputs.value);
            })
            inputs.value = excluded5;
        }
    }

    var objectForExcluded = {
        excluded: excluded,
        excluded1: excluded1,
        excluded2: excluded2,
        excluded3: excluded3,
        excluded4: excluded4,
        excluded5: excluded5
    }
    console.log(objectForExcluded)

    const [contract1, setContract1] = useState('');
    const [contract2, setContract2] = useState('');
    const [contract3, setContract3] = useState('');
    const [contract4, setContract4] = useState('');
    const [contract5, setContract5] = useState('');

    function moreInputAddress() {
        const contracts = document.getElementById('parents') as any;
        setCounts(() => counts + 1);
        const appears = document.getElementById('noappears') as any;
        if (counts <= 4) {
            var addressCreated = document.createElement('input') as any;
            addressCreated.classList.add("inputCreatedAddress");
            addressCreated.placeholder = "0x";
            addressCreated.type = "text"
            addressCreated.style.background = input
            addressCreated.style.paddingLeft = "10px"
            appears.style.display = "flex"
            contracts.appendChild(addressCreated)
        }
        if (counts == 0) {
            addressCreated.addEventListener("change", () => {
                setContract1(addressCreated.value);
            })
            addressCreated.value = contract1;
        }
        if (counts == 1) {
            addressCreated.addEventListener("change", () => {
                setContract2(addressCreated.value);
            })
            addressCreated.value = contract2;
        }
        if (counts == 2) {
            addressCreated.addEventListener("change", () => {
                setContract3(addressCreated.value);
            })
            addressCreated.value = contract3;
        }
        if (counts == 3) {
            addressCreated.addEventListener("change", () => {
                setContract4(addressCreated.value);
            })
            addressCreated.value = contract4;
        }
        if (counts == 4) {
            addressCreated.addEventListener("change", () => {
                setContract5(addressCreated.value);
            })
            addressCreated.value = contract5;
        }
    }

    var objectForContract = {
        contract: contract,
        contract1: contract1,
        contract2: contract2,
        contract3: contract3,
        contract4: contract4,
        contract5: contract5
    }

    var finalSubmit = {
        contract: objectForContract,
        excluded: objectForExcluded,
        symbol: symbol,
        name: name,
        website: website,
        twitter: twitter,
        description: description,
        telegram: telegram,
        logo: logo,
        audit: audit,
        kyc: kyc,
        isSumTotalSupply: isSum,
        discord: discord,
        addNote: addNote
    }

    function isSumOfTotalSupply() {
        var sumTotalSupply = document.getElementById("sumTotalSupply") as any;
        if (sumTotalSupply.checked) {
            setIsSum(true)
            console.log(`isSum : ${isSum}`)
            console.log(`sum is checked `)
        } else {
            setIsSum(false)
            console.log(`Sum not checked ${isSum}`)
        }
    }

    const input = useColorModeValue("white_terciary", "dark_input_list")
    const box = useColorModeValue('white_terciary', "dark_box_list")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const btn = useColorModeValue("white", "black")

    return (
        <div>
            <div className={styles["listToken-container"]}>
                <h2 className={styles["title"]}>Listing form</h2>
                <div className={styles["listToken-main"]}>
                    <form className={`${styles["all-forms"]} ${styles["myForm"]}`} id="myForm">
                        <Flex className={styles["three-forms"]} bg={box} boxShadow={`1px 2px 12px 3px ${shadow}`}>
                            <div className={styles["form-container-box-flex"]}>
                                <div className={styles["inputs-container"]}>
                                    <label >Symbol *</label>
                                    <Input
                                        pl="10px"
                                        className={styles["inputs"]}
                                        required
                                        _placeholder={{ color: "none" }}
                                        bg={input}
                                        id="msg"
                                        name="website"
                                        boxShadow={`1px 2px 12px 3px ${shadow}`}
                                        placeholder="MOBL"
                                        value={symbol}
                                        onChange={(e) => setSymbol(e.target.value)}
                                    ></Input>
                                </div>
                                <div className={styles["inputs-container"]}>
                                    <label >Name *</label>
                                    <Input
                                        pl="10px"
                                        boxShadow={`1px 2px 12px 3px ${shadow}`}
                                        variant="filled"
                                        className={styles["inputs"]}
                                        required
                                        _placeholder={{ color: "none" }}
                                        id="msg"
                                        name="name"
                                        bg={input}
                                        placeholder="Mobula Finance"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Input>
                                </div>
                            </div>
                            <div className={styles["form-container-box-flex"]}>
                                <div>
                                    <label>Upload Logo *</label>
                                    <Flex boxShadow={`1px 2px 12px 3px ${shadow}`} className={styles["upload-box"]} bg={input}>
                                        {uploadedImage || logo ? <img src={uploadedImage ? uploadedImage : logo} /> : <></>}
                                    </Flex>
                                </div>
                                <div className={styles["file"]}>
                                    <Input type="file" id="file" name="file" accept="image/png, image/jpg" multiple className={styles["select-file"]}
                                        bg={input}

                                        _placeholder={{ color: "none" }}

                                        onChange={(e) => {
                                            console.log('Dingue')
                                            const reader = new FileReader();
                                            reader.addEventListener("load", () => {
                                                if (reader.readyState == 2) {
                                                    setUploadedImage(reader.result);
                                                    fetch('https://mobulaspark.com/upload?' + reader.result);
                                                }
                                            })
                                            reader.readAsDataURL(e.target.files[0])
                                        }}
                                    />
                                    <span className={styles["waapu"]}>
                                        <Upload className={styles["upload-logo"]} />
                                        Browse to upload
                                    </span>
                                    <div className={styles["form-container-box"]} >
                                        <Input
                                            pl="10px"
                                            id="logo"
                                            boxShadow={`1px 2px 12px 3px ${shadow}`}
                                            variant="filled"
                                            bg={input}
                                            className={styles["inputs"]}
                                            name="logo"
                                            value={logo}
                                            _placeholder={{ color: "none" }}
                                            onChange={(e) => setLogo(e.target.value)}
                                            placeholder="https://mobula.fi/logo.png"
                                            required
                                        ></Input>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["form-container-box"]} id='parents'>
                                <label >Contract Address *</label>
                                <Input
                                    pl="10px"
                                    type="text"
                                    id="contract"
                                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                                    bg={input}
                                    value={contract}
                                    className={`${styles["contract"]} ${styles["inputs"]}`}
                                    placeholder="0x9ad6c38be94206.."
                                    _placeholder={{ color: "none" }}
                                    onChange={(e) => setContract(e.target.value)}
                                    required
                                ></Input>
                                <button type="button" style={{ background: input }} className={styles["absolute-btn-address"]} id="moreInput" onClick={() => moreInputAddress()}>+</button>
                            </div>
                            <div className={styles["noappears"]} id="noappears">
                                <div className={styles["flex"]} style={{ flexDirection: "row-reverse" }}>
                                    <Radio bg={input} type="radio" id="totalSupply" pl="10px" _placeholder={{ color: "none" }} name="scales" onClick={() => isSumOfTotalSupply()} />
                                    <label htmlFor="scales">The total supply is the first contract total supply (native token)</label>
                                </div>
                                <div className={styles["flex"]} style={{ flexDirection: "row-reverse" }}>
                                    <Radio pl="10px" _placeholder={{ color: "none" }} bg={input} type="radio" variant="primary" id="sumTotalSupply" name="scales" onClick={() => isSumOfTotalSupply()}
                                        onChange={(e) => {
                                            var sumTotalSupply = document.getElementById("sumTotalSupply") as any;
                                            var totalSupply = document.getElementById("totalSupply") as any;
                                            if (totalSupply.checked == false) {
                                                if (sumTotalSupply.checked == true)
                                                    setIsSum(true)
                                            } else {
                                                setIsSum(false)
                                            }
                                            console.log(isSum)
                                        }}
                                    />
                                    <label htmlFor="scale">The total supply is the sum of all the contracts</label>
                                </div>
                            </div>
                            <div className={styles["form-container-box"]}>
                                <label >Description *</label>
                                <Textarea
                                    pl="10px"
                                    _placeholder={{ color: "none" }}
                                    id="msg"
                                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                                    bg={input}
                                    name="description"
                                    className={styles["inputs"]}
                                    placeholder="Mobula Finance is the first decentralized data aggregator supporting all chains ..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></Textarea>
                            </div >
                        </Flex>
                        <Flex className={styles["three-forms"]} bg={box} boxShadow={`1px 2px 12px 3px ${shadow}`}>
                            <div className={styles["form-container-box"]}>
                                <label >Website *</label>
                                <Input
                                    pl="10px"
                                    _placeholder={{ color: "none" }}
                                    variant="primary"
                                    required
                                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                                    id="msg"
                                    bg={input}
                                    name="website"
                                    placeholder="https:/app.mobula.finance"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                ></Input>
                            </div>
                            <div className={styles["form-container-box"]}>
                                <label >Twitter *</label>
                                <Input
                                    pl="10px"
                                    _placeholder={{ color: "none" }}
                                    bg={input}
                                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                                    type="text"
                                    id="name"
                                    name="twitter"
                                    placeholder="https://twitter.com/MobulaFi"
                                    value={twitter}
                                    required
                                    onChange={(e) => setTwitter(e.target.value)}
                                ></Input>
                            </div>
                            <div className={styles["form-container-box"]}>
                                <label >Telegram *</label>
                                <Input
                                    pl="10px"
                                    _placeholder={{ color: "none" }}
                                    bg={input}
                                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                                    value={telegram}
                                    required
                                    onChange={(e) => setTelegram(e.target.value)}
                                    type="text"
                                    id="tlg"
                                    name="telegram"
                                    placeholder="https://t.me/MobulaFinance" />
                            </div>
                            <div className={styles["form-container-box"]} >
                                <label >Discord *</label>
                                <Input
                                    pl="10px"
                                    _placeholder={{ color: "none" }}
                                    bg={input}
                                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                                    id="discord"
                                    className={styles["inputs"]}
                                    name="discord"
                                    value={discord}
                                    onChange={(e) => setDiscord(e.target.value)}
                                    placeholder="https://t.me/MobulaFi"
                                    required
                                ></Input>
                            </div>
                        </Flex>
                        <Flex className={styles["three-forms"]} bg={box} boxShadow={`1px 2px 12px 3px ${shadow}`}>
                            <div className={styles["form-container-box"]}>
                                <label >Audit Link (Optional) </label>
                                <Input
                                    pl="10px"
                                    _placeholder={{ color: "none" }}
                                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                                    bg={input}
                                    type="text"
                                    id="audit"
                                    name="audit"
                                    placeholder="https://safetin.com/audits/mobula"
                                    value={audit}
                                    onChange={(e) => setAudit(e.target.value)}
                                ></Input>
                            </div>
                            <div className={styles["form-container-box"]}>
                                <label >KYC Link (Optional) </label>
                                <Input
                                    pl="10px"
                                    _placeholder={{ color: "none" }}
                                    bg={input}
                                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                                    type="text"
                                    id="kyc"
                                    name="kyc"
                                    placeholder="https://staysafu.org/kyc/mobula"
                                    value={kyc}
                                    onChange={(e) => setKYC(e.target.value)}
                                ></Input>
                            </div>
                            <div className={styles["form-container-box"]}>
                                <label >Additionnal notes (Optional) </label>
                                <Input
                                    pl="10px"
                                    _placeholder={{ color: "none" }}
                                    bg={input}
                                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                                    type="text"
                                    id="kyc"
                                    name="kyc"
                                    placeholder="Other links , missing infos , notes ..."
                                    value={addNote}
                                    onChange={(e) => setAddNote(e.target.value)}
                                ></Input>
                            </div>

                            <div className={`${styles["form-container-box"]} ${styles["relative-form"]}`} id='parent'>
                                <label>Excluded from Circulation </label>
                                <Input
                                    pl="10px"
                                    _placeholder={{ color: "none" }}
                                    bg={input}
                                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                                    name="excluded"
                                    placeholder="0x5D3e4C0FE11e0..."
                                    className={styles["inputPlus"]}
                                    value={excluded}
                                    id="excluded"
                                    onChange={(e) => setExcluded(e.target.value)}
                                ></Input>
                                <button type="button" className={styles["absolute-btn"]} style={{ background: input }} id="moreInput" onClick={() => moreInputExcluded()}>+</button>
                            </div>
                            <div className={`${styles["void"]} ${styles["button-submit"]}`} id="void">
                                <button style={{ color: btn }} className={styles["button-submit-form"]} id="submitForm" onClick={(e) => submit(e)}> {loading ? <Spinner width='15px' height="15px" mr={15} /> : <></>} Submit</button>
                            </div>
                            <div className={`${styles["mobile-void"]} ${styles["button-submit"]}`} id="mobile-void">
                                <button style={{ color: btn }} className={styles["button-submit-form"]} onClick={(e) => submit(e)}> {loading ? <Spinner width='15px' height="15px" mr={15} /> : <></>} Submit</button>
                            </div>
                        </Flex>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ListAToken;