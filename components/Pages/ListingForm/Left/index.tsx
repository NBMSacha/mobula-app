import React, { useEffect, useState, useRef } from 'react'
import { Upload } from "react-feather"
import styles from "../ListingForm.module.scss";
import { Spinner } from '@chakra-ui/react'
import { ChakraProvider, Input, Stack, Image, Flex, Box, Text, useColorModeValue, Textarea, Radio, Button } from '@chakra-ui/react'
import axios from 'axios';
import { RadioGroup } from '@chakra-ui/react'
function Left({
    ipfs,
    symbol,
    setSymbol,
    setName,
    uploadLoading,
    uploadedImage,
    setUploadedImage,
    setUploadLoading,
    logo,
    name,
    description,
    setLogo,
    setDescription,
    inputListContract,
    setInputListContract,
    isSum,
    setIsSum
}) {

    const handleInputChangeContract = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputListContract];
        list[index].value = value;
        setInputListContract(list);
        console.log(list)
    };

    const handleAddClickContract = () => {
        setInputListContract([...inputListContract, { value: "" }]);
    };

    return (

        <Flex className={styles["three-forms"]} p="20px" >
            <div className={styles["form-container-box-flex"]}>
                <div className={styles["inputs-container"]}>
                    <label style={{whiteSpace:"nowrap", overflow:"hidden",textOverflow:"ellipsis"}} >Symbol *</label>
                    <Input
                        pl="10px"
                        pr="10px"
                        className={styles["inputs"]}
                        required
                        _placeholder={{ color: "none", textOverflow: "ellipsis", paddingRight: "5px" }}
                        bg="var(--inputs)"
                        id="msg"
                        name="website"
                        boxShadow={`1px 2px 12px 3px var(--shadow)`}
                        placeholder="MOBL"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                    ></Input>
                </div>
                <div className={styles["inputs-container"]}>
                    <label >Name *</label>
                    <Input
                        pl="10px"
                        pr="10px"
                        boxShadow={`1px 2px 12px 3px var(--shadow)`}
                        variant="filled"
                        className={styles["inputs"]}
                        required
                        _placeholder={{ color: "none", textOverflow: "ellipsis" }}
                        id="msg"
                        name="name"
                        bg="var(--inputs)"
                        placeholder="Mobula Finance"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Input>
                </div>
            </div>
            <div className={styles["form-container-box-flex"]}>
                <div>
                    <label>Upload Logo *</label>
                    <Flex boxShadow={`1px 2px 12px 3px var(--shadow)`} className={styles["upload-box"]} bg="var(--inputs)">
                        {uploadLoading ? <Spinner m="auto" width='15px' height="15px" /> : <></>}
                        {uploadedImage || logo ? <img style={{ objectFit: "cover", height: "100%" }} src={uploadedImage ? uploadedImage : logo} /> : <></>}
                    </Flex>
                </div>
                <div className={styles["file"]}>
                    <Input type="file" id="file" name="file" accept="image/png, image/jpg" multiple className={styles["select-file"]}
                        bg="var(--inputs)"
                        _placeholder={{ color: "none", textOverflow: "ellipsis" }}
                        onChange={(e) => {
                            console.log('Dingue')
                            const reader = new FileReader();
                            reader.addEventListener("load", async () => {
                                if (reader.readyState == 2) {
                                    setUploadLoading(true)
                                    const bufferFile = await e.target.files[0].arrayBuffer();
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
                    <Flex display={["flex", "flex", "none", "none"]} className={styles["form-container-box"]} >
                        <Input
                            pl="10px"
                            pr="10px"
                            id="logo"
                            boxShadow={`1px 2px 12px 3px var(--shadow)`}
                            variant="filled"
                            bg="var(--inputs)"
                            className={styles["inputs"]}
                            name="logo"
                            value={logo}
                            _placeholder={{ color: "none", textOverflow: "ellipsis" }}
                            onChange={(e) => setLogo(e.target.value)}
                            placeholder="https://mobula.fi/logo.png"
                            required
                        ></Input>
                    </Flex>
                </div>
            </div>
            <div className={styles["form-container-box"]} id='parents'>
                <label >Contract Address *</label>
                {inputListContract.map((x, i) => {
                    return (
                        <>
                            <Input
                                required
                                pr={["5px", "5px", "30px", "30px"]}
                                pl="10px"
                                boxShadow={`1px 2px 12px 3px var(--shadow)`}
                                name="excluded"
                                className={`${styles["contract"]} ${styles["inputs"]}`}
                                bg="var(--inputs)"
                                type="text"
                                value={x.value}
                                _placeholder={{ color: "none", textOverflow: "ellipsis" }}
                                placeholder="0x5D3e4C0FE11e0..."
                                onChange={e => { handleInputChangeContract(e, i) }}
                            />
                            <div className="btn-box">
                                {inputListContract.length - 1 === i && <Button bg="var(--inputs)" w="30px" right="0px" top="37px" h='30px' borderRadius="10px" position="absolute" className={styles["absolute-btn-address"]} onClick={handleAddClickContract}>+</Button>}
                            </div>
                        </>
                    );
                })}
            </div>
            {inputListContract.length > 1 ?
                <RadioGroup onChange={setIsSum} value={isSum}>
                    <Flex direction="column" fontSize="10px" >
                        <Flex align="center" direction="row">
                            <Text fontSize="10px" w="90%">The total supply is the first contract total supply (native token)</Text>
                            <Radio checked={true} value='true' bg={isSum === "true" ? "blue" : "var(--inputs)"}boxShadow={`1px 2px 12px 3px var(--shadow) !important`}></Radio>
                        </Flex>
                        <Flex align="center" direction="row">
                            <Text fontSize="10px" w="90%">The total supply is the sum of all the contracts</Text>
                            <Radio value='false' mt="10px" bg={isSum === "false" ? "blue" : "var(--inputs)"}boxShadow={`1px 2px 12px 3px var(--shadow) !important`}></Radio>
                        </Flex>
                    </Flex>
                </RadioGroup> : <></>}

            <div className={styles["form-container-box"]}>
                <label >Description *</label>
                <Textarea
                
                    pl="10px"
                    pr="10px"
                    fontSize="13px"
                    textOverflow="ellipsis"
                    _placeholder={{ color: "none", textOverflow: "ellipsis" }}
                    id="msg"
                    boxShadow={`1px 2px 12px 3px var(--shadow) !important`}
                    bg="var(--inputs)"
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