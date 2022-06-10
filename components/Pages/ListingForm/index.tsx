import React, { useEffect, useState, useRef } from 'react'
import { ethers } from 'ethers';
import IPFS from "ipfs-api";
import { PROTOCOL_ADDRESS, supportedRPCs } from '../../../constants';
import { useAlert } from "react-alert";
import styles from "./ListingForm.module.scss";
import { ChakraProvider, Input, Image, Flex, Box, Text, useColorModeValue, Textarea } from '@chakra-ui/react'
import Left from "./Left";
import Mid from "./Mid";
import Right from "./Right";

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
    const [uploadLoading, setUploadLoading] = useState(false);
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');

    async function submit(e: any) {

        e.preventDefault();
        setLoading(true);
        console.log('submitted');

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
        try {
            var provider = new ethers.providers.Web3Provider((window as any).ethereum)
            var signer = provider.getSigner();
        } catch (e) {
            alert.show('You must connect your wallet to submit the form.')
        }
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

    var finalSubmit = {
        // contract: objectForContract,
        // excluded: objectForExcluded,
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

    const [tableauContract, setTableauContract] = useState([])

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
                        <Left 
                            input={input}
                            box={box}
                            shadow={shadow}
                            setSymbol={setSymbol}
                            setName={setName}
                            setLogo={setLogo}
                            setContract={setContract}
                            setDescription={setDescription}
                            uploadLoading={uploadLoading}
                            uploadedImage={uploadedImage}
                            symbol={symbol}
                            logo={logo} 
                            contract={contract}
                            name={name}
                            tableauContract={tableauContract}
                            setTableauContract={setTableauContract}
                            description={description}
                            isSum={isSum}
                            setIsSum={setIsSum}
                            setUploadLoading={setUploadLoading}
                            setUploadedImage={setUploadedImage}
                            ipfs={ipfs}
                        />
                        <Mid 
                            input={input}
                            box={box}
                            shadow={shadow}
                            website={website}
                            setWebsite={setWebsite}
                            setDiscord={setDiscord}
                            discord={discord}
                            telegram={telegram}
                            setTelegram={setTelegram}
                            twitter={twitter}
                            setTwitter={setTwitter}
                        />
                        
                        <Right 
                            input={input}
                            box={box}
                            shadow={shadow}
                            setAddNote={setAddNote}
                            setAudit={setAudit}
                            setKYC={setKYC}
                            addNote={addNote}
                            kyc={kyc}
                            audit={audit}
                            btn={btn}
                            loading={loading}
                            submit={submit}
                          />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ListAToken;