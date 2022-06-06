import React, { useEffect, useState, useRef } from 'react'
import { Upload } from "react-feather"
import styles from "../ListingForm.module.scss";
import { Spinner } from '@chakra-ui/react'
import { ChakraProvider, Input, Image, Flex, Box, Text, useColorModeValue, Textarea, Radio} from '@chakra-ui/react'
import axios from 'axios';

function Left({
        input,
        ipfs,
        box,
        symbol,
        shadow,
        setSymbol,
        setName,
        uploadLoading,
        isSum,
        setIsSum,
        uploadedImage,
        setUploadedImage,
        setUploadLoading,
        logo,
        contract,
        name,
        description,
        setLogo,
        setContract, 
        setDescription
    }) {

    const [inputListContract, setInputListContract] = useState([{ excluded: "Exclude from Circulation"}]);

    const handleInputChangeContract = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputListContract];
        list[index][name] = value;
        setInputListContract(list);
    };
         
    const handleRemoveClickContract = index => {
        const list = [...inputListContract];
        list.splice(index, 1);
        setInputListContract(list);
    };
         
    const handleAddClickContract = () => {
        setInputListContract([...inputListContract, { excluded: "Exclude from Circulation"}]);
    };

    return (
        
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
                        {uploadLoading ? <Spinner m="auto" width='15px' height="15px" /> : <></>}
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
                            reader.addEventListener("load", async () => {
                                if (reader.readyState == 2) {
                                    setUploadLoading(true)
                                    const bufferFile = await e.target.files[0].arrayBuffer();
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
                                    setUploadedImage(reader.result);
                                    await axios.get('https://mobulaspark.com/upload?hash=' + hash);
                                    setUploadLoading(false)
                                    setLogo('https://gateway.ipfs.io/ipfs/' + hash)
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
                {inputListContract.map((x, i) => {
                    return (
                        <>
                            <Input
                                required
                                pl="10px"
                                boxShadow={`1px 2px 12px 3px ${shadow}`}
                                name="excluded"
                                className={`${styles["contract"]} ${styles["inputs"]}`}
                                bg={input}
                                type="text"
                                value={contract}
                                _placeholder={{ color: "none" }}
                                placeholder="0x5D3e4C0FE11e0..."
                                onChange={e => {handleInputChangeContract(e, i);
                                    setContract(e.target.value)
                                }}
                            />
                            <div className="btn-box">
                                {/* {inputList.length !== 1 && <Button onClick={() => handleRemoveClick(i)}>-</Button>} */}
                                {inputListContract.length - 1 === i && <button className={styles["absolute-btn-address"]} onClick={handleAddClickContract}>+</button>}
                            </div>
                        </>
                        );
                    })}
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
    )
}

export default Left;