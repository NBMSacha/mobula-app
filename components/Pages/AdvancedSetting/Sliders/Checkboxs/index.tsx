import { Checkbox, CheckboxGroup, Stack, Text, Flex } from '@chakra-ui/react'
import {useState} from "react"
export default function Checkboxs({condition, checkBoxs, setCheckboxs}) {

    
    
    return (
        <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']} >
            <Stack fontSize="14px !important"  spacing={[2]} direction={['column', 'column']} minWidth="190px">
                {condition === "two" ? (
                    <>
                        <Flex align="center" mt="0px !important" justify="space-between" >
                            <Text maxWidth="260px" >Only assets with EVM-compatible pegs</Text>
                            <Checkbox _focus={{ boxShadow: "none" }} value={"evm"} onChange={() => { 
                                if (checkBoxs.includes("evm")) {
                                    const newBlockchains = [...checkBoxs];
                                    newBlockchains.splice(newBlockchains.indexOf("evm"),1);
                                    setCheckboxs(newBlockchains)
                                } else {
                                    const newBlockchains = [...checkBoxs];
                                    newBlockchains.push("evm");
                                    setCheckboxs(newBlockchains)
                                }
                            }} bg={checkBoxs.includes("evm") ? "var(--text-secondary)" : "none"} borderRadius="25%"></Checkbox>
                        </Flex>
                        <Flex align="center" mb="0px !important" mt="19px !important" justify="space-between">
                            <Text maxWidth="260px">Only native assets (no bridged/pegged)</Text>
                            <Checkbox _focus={{ boxShadow: "none" }} value={"native"} onChange={() => { 
                                if (checkBoxs.includes("native")) {
                                    const newBlockchains = [...checkBoxs];
                                    newBlockchains.splice(newBlockchains.indexOf("native"),1);
                                    setCheckboxs(newBlockchains)
                                } else {
                                    const newBlockchains = [...checkBoxs];
                                    newBlockchains.push("native");
                                    setCheckboxs(newBlockchains)
                                }
                            }} bg={checkBoxs.includes("native") ? "var(--text-secondary)" : "none"}  borderRadius="25%"></Checkbox>
                        </Flex>
                    </>
                ) : (
                    <>
                        <Flex align="center" justify="space-between" >
                            <Text >Only audited assets</Text>
                            <Checkbox _focus={{ boxShadow: "none !important" }} mb="0px" value="audited" onChange={() => { 
                                if (checkBoxs.includes("audited")) {
                                    const newBlockchains = [...checkBoxs];
                                    newBlockchains.splice(newBlockchains.indexOf("audited"),1);
                                    setCheckboxs(newBlockchains)
                                } else {
                                    const newBlockchains = [...checkBoxs];
                                    newBlockchains.push("audited");
                                    setCheckboxs(newBlockchains)
                                }
                            }} bg={checkBoxs.includes("audited") ? "var(--text-secondary)" : "none"}></Checkbox>
                        </Flex>
                        <Flex align="center" mt="17px !important" justify="space-between" >
                            <Text>Only assets with a kyc</Text>
                            <Checkbox _focus={{ boxShadow: "none" }} value='kyc' onChange={() => { 
                                if (checkBoxs.includes("kyc")) {
                                    const newBlockchains = [...checkBoxs];
                                    newBlockchains.splice(newBlockchains.indexOf("kyc"),1);
                                    setCheckboxs(newBlockchains)
                                } else {
                                    const newBlockchains = [...checkBoxs];
                                    newBlockchains.push("kyc");
                                    setCheckboxs(newBlockchains)
                                }
                            }} bg={checkBoxs.includes("kyc") ? "var(--text-secondary)" : "none"}></Checkbox>
                        </Flex>
                        <Flex align="center" mt="17px !important" justify="space-between">
                            <Text>Only tradable assets</Text>
                            <Checkbox _focus={{ boxShadow: "none" }} value='tradable' onChange={() => { 
                                if (checkBoxs.includes("tradable")) {
                                    const newBlockchains = [...checkBoxs];
                                    newBlockchains.splice(newBlockchains.indexOf("tradable"),1);
                                    setCheckboxs(newBlockchains)
                                } else {
                                    const newBlockchains = [...checkBoxs];
                                    newBlockchains.push("tradable");
                                    setCheckboxs(newBlockchains)
                                }
                            }} bg={checkBoxs.includes("tradable") ? "var(--text-secondary)" : "none"}></Checkbox>
                        </Flex>
                    </>
                )}
            </Stack>
        </CheckboxGroup>
    )
}
