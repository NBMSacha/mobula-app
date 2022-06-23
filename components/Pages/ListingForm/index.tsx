import React, { useEffect, useState, useRef } from 'react'
import { ethers } from 'ethers';
import IPFS from "ipfs-api";
import { PROTOCOL_ADDRESS, supportedRPCs } from '../../../constants';
import { useAlert } from "react-alert";
import styles from "./ListingForm.module.scss";
import { ChakraProvider, Input, Image, Flex, Box, Text, useColorModeValue, Textarea, Heading, Button, Link } from '@chakra-ui/react'
import Left from "./Left";
import Mid from "./Mid";
import Right from "./Right";
import { useRouter } from 'next/router'

function ListAToken() {
    const router = useRouter();
    const alert = useAlert();
    const [logo, setLogo] = useState('')
    const [description, setDescription] = useState('')
    const [audit, setAudit] = useState('')
    const [kyc, setKYC] = useState('')
    const [twitter, setTwitter] = useState('')
    const [telegram, setTelegram] = useState('')
    const [website, setWebsite] = useState('');
    const [ipfs, setIPFS] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [discord, setDiscord] = useState("")
    const [addNote, setAddNote] = useState("")
    const [uploadedImage, setUploadedImage]: [any, Function] = useState();
    const [uploadLoading, setUploadLoading] = useState(false);
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [inputListContract, setInputListContract] = useState([{ value: "" }]);
    const [inputListExcluded, setInputListExcluded] = useState([{ value: "" }]);
    const [isSum, setIsSum] = useState('true');
    const [display, setDisplay] = useState('form');

    useEffect(() => {
        console.log(inputListContract)
    }, [inputListContract])

    async function submit(e: any) {

        e.preventDefault();
        setLoading(true);
        console.log('submitted');

        for (const contract of inputListContract.map(entry => entry.value)) {
            if (!/0x[a-zA-z0-9]{40}/.test(contract) || contract.length != 42) {
                alert.error('Contract format is invalid.')
                setLoading(false)
                return
            }
        }

        for (const excluded of inputListExcluded.map(entry => entry.value)) {
            if (excluded && (!/0x[a-zA-z0-9]{40}/.test(excluded) || excluded.length != 42)) {
                alert.error('Excluded from circulation format is invalid.')
                setLoading(false)
                return
            }
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

        let contracts: any = inputListContract.map(entry => entry.value).filter((contract: any) => contract.length == 42);
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

        contracts = contracts.filter((contract: any) => contract);

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

        const totalSupply = isSum === 'true' ? contracts : [contracts[0]];
        const realExcluded = inputListExcluded.map(entry => entry.value).filter((excluded: any) => excluded.length == 42);

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
            setDisplay('success')
        } catch (e) {
            if (e.data && e.data.message) {
                alert.error(e.data.message);
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

    const input = useColorModeValue("white_terciary", "dark_input_list")
    const box = useColorModeValue('white_terciary', "dark_box_list")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const btn = useColorModeValue("white", "black")
    const bg = useColorModeValue("none", "#171B2B")

    return (
        <div>
            <div className={styles["listToken-container"]}>

                <h2 className={styles["title"]} >Listing form</h2>
                <Flex display={["none", "none", "none", "flex"]} fontSize={['12px', '12px', '14px', '14px']} mt="28px" mb="20px" mx="auto" w="80%" align="end" justify="space-between" >
                    <Flex direction="column">
                        <Heading mb={'15px'} fontSize={["18px", "18px", "18px", "24px"]} fontFamily="Inter" >Listing form</Heading>
                        <Text display={["none", "none", "none", "flex"]} whiteSpace="normal" fontSize={['12px', '12px', '14px', '14px']}>
                            Submit your token for a listing for 10 MATIC. You must have them in your wallet on Polygon.
                        </Text>
                    </Flex>
                    <Text display={["none", "none", "none", "flex"]}>
                        Learn more <a style={{ color: "var(--chakra-colors-blue)", marginLeft: "5px", whiteSpace: "nowrap" }} href="https://docs.mobula.finance/list">here</a>.
                    </Text>

                </Flex>

                {display == 'form' ?
                    <Flex className={styles["listToken-main"]} bg="var(--bg-governance-box)" boxShadow={`1px 2px 12px 3px var(--shadow)`}>
                        <form className={`${styles["all-forms"]} ${styles["myForm"]}`} id="myForm" >
                            <Left
                                setSymbol={setSymbol}
                                setName={setName}
                                setLogo={setLogo}
                                inputListContract={inputListContract}
                                setInputListContract={setInputListContract}
                                setDescription={setDescription}
                                uploadLoading={uploadLoading}
                                uploadedImage={uploadedImage}
                                symbol={symbol}
                                logo={logo}
                                name={name}
                                description={description}
                                setUploadLoading={setUploadLoading}
                                setUploadedImage={setUploadedImage}
                                ipfs={ipfs}
                                isSum={isSum}
                                setIsSum={setIsSum}
                            />
                            <Mid
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
                                setAddNote={setAddNote}
                                setAudit={setAudit}
                                setKYC={setKYC}
                                addNote={addNote}
                                kyc={kyc}
                                audit={audit}
                                loading={loading}
                                submit={submit}
                                inputList={inputListExcluded}
                                setInputList={setInputListExcluded}
                            />
                        </form>
                    </Flex> : <div className={styles["listToken-main"]}>
                        <Flex p="30px" flexDirection="column" className={styles["three-forms"]} bg="var(--bg-governance-box)" boxShadow={`1px 2px 12px 3px var(--shadow)`}>
                            <Heading fontSize="xx-large" fontWeight="medium" mb='30px' ml='auto' mr='auto'>Success!</Heading>
                            <Text mb='15px'>Your application has been successfully transmitted (on-chain) to the Mobula DAO.</Text>
                            <Text mb='15px'>You can now track your listing in the DAO tab, starting in the First Sort.</Text>
                            <Text mb='15px'>If your crypto-asset is validated by the Mobula DAO, you will be able to access our <Link color="blue" href="/partners">Partner Ecosystem</Link>.</Text>
                            <Text mb='35px'>Feel free to join our Discord to ask for any kind of support regarding your listing.</Text>
                            <Button bg={'blue'} color={'white'} w='100%' h='30px' onClick={() => {
                                router.push('/dao/sort')
                            }}>Go To First Sort</Button>
                        </Flex>
                    </div>}

            </div>
        </div >
    )
}

export default ListAToken;