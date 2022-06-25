import React, { useState } from 'react';
import styles from "../ListingForm.module.scss";
import { Input, Flex, Button, Text } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons"

function Right({
    audit,
    setAudit,
    kyc,
    setKYC,
    addNote,
    setAddNote,
    loading,
    submit,
    inputList,
    setInputList,
}) {

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index].value = value;
        setInputList(list);
        console.log(list)
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { value: "" }]);
    };

    return (
        <Flex className={styles["three-forms"]} p="20px" >
            <div className={styles["form-container-box"]}>
                <label >Audit Link (Optional) </label>
                <Input
                    pl="10px"
                    pr="10px"
                    _placeholder={{ color: "none" }}
                    boxShadow={`1px 2px 12px 3px var(--shadow)`}
                    bg="var(--inputs)"
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
                    pr="10px"
                    _placeholder={{ color: "none" }}
                    bg="var(--inputs)"
                    boxShadow={`1px 2px 12px 3px var(--shadow)`}
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
                    pr="10px"
                    _placeholder={{ color: "none" }}
                    bg="var(--inputs)"
                    boxShadow={`1px 2px 12px 3px var(--shadow)`}
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
                {inputList.map((x, i) => {
                    return (
                        <>
                            <Input
                                pl="10px"
                                value={x.value}
                                boxShadow={`1px 2px 12px 3px var(--shadow)`}
                                name="excluded"
                                bg="var(--inputs)"
                                color="none"
                                _placeholder={{ color: "none" }}
                                placeholder="0x5D3e4C0FE11e0..."
                                className={styles["inputPlus"]}
                                pr={["5px", "5px", "30px", "30px"]}
                                onChange={e => handleInputChange(e, i)}
                            />
                            <div className="btn-box">
                                {/* {inputList.length !== 1 && <Button onClick={() => handleRemoveClick(i)}>-</Button>} */}
                                {inputList.length - 1 === i && <Button bg="none" w="30px" right="0px" top="-3px" h='30px' borderRadius="10px" position="absolute" className={styles["absolute-btn"]} onClick={handleAddClick}><AddIcon boxSize="10px"/></Button>}
                            </div>
                        </>
                    );
                })}
            </div>
            <div className={`${styles["void"]} ${styles["button-submit"]}`} id="void">
                <Text textAlign="end" fontSize="10px" mb="10px" opacity=".2" ml="auto">Mendatory Fields *</Text>
                <button style={{ color: "white" }} className={styles["button-submit-form"]} id="submitForm" onClick={(e) => submit(e)}> {loading ? <Spinner width='15px' height="15px" mr={15} /> : <></>} Submit to the DAO</button>
            </div>
            <div className={`${styles["mobile-void"]} ${styles["button-submit"]}`} id="mobile-void">
                <button style={{ color: "white" }} className={styles["button-submit-form"]} onClick={(e) => submit(e)}> {loading ? <Spinner width='15px' height="15px" mr={15} /> : <></>} Submit to the DAO</button>
            </div>
        </Flex>
    )
}

export default Right;
