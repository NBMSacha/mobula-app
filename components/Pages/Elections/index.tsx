import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { ethers } from "ethers";
import { PROTOCOL_ADDRESS, RPC_URL } from "../../../constants";
import { ThumbsUp, ThumbsDown } from "react-feather"
import Left from "./Left"
import Mid from "./Mid"
import Right from "./Right"
import {
    Heading,
    Text,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Spacer
} from "@chakra-ui/react";
import styles from "./Elections.module.scss";
import DaoHeader from "../../Utils/DaoHeader";
import Vote from "./Vote";

function Elections() {
    const alert = useAlert();
    const [membersToPromoteOne, setMembersToPromoteOne] = useState(0);
    const [membersToPromoteTwo, setMembersToPromoteTwo] = useState(0);
    const [membersToDemoteOne, setMembersToDemoteOne] = useState(0);
    const [membersToDemoteTwo, setMembersToDemoteTwo] = useState(0);
    const [promoteAddress, setPromoteAddress] = useState("");
    const [demoteAddress, setDemoteAddress] = useState("");
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
                    "function membersToDemoteFromRankII() external view returns(uint256)",
                ],
                provider
            );
            const membersToPromoteToRankI = (
                await protocolContract.membersToPromoteToRankI()
            ).toNumber();
            const membersToPromoteToRankII = (
                await protocolContract.membersToPromoteToRankII()
            ).toNumber();
            const membersToDemoteFromRankI = (
                await protocolContract.membersToDemoteFromRankI()
            ).toNumber();
            const membersToDemoteFromRankII = (
                await protocolContract.membersToDemoteFromRankII()
            ).toNumber();
            setMembersToPromoteOne(membersToPromoteToRankI);
            setMembersToPromoteTwo(membersToPromoteToRankII);
            setMembersToDemoteOne(membersToDemoteFromRankI);
            setMembersToDemoteTwo(membersToDemoteFromRankII);
        } catch (e) {
            //alert.show('You must connect your wallet to access your Dashboard.')
        }
    }
    useEffect(() => {
        initValues();
    }, []);

    return (
        <Flex direction={"column"} w="100%" align="center" mt="50px" mb="50px">
            <Flex fontSize={['12px', '12px', '14px', '14px']} margin="auto" w="85%" align="end" justify="space-between" maxWidth="1400px">
                <Flex  direction="column">
                    <Heading  mb={'15px'}  fontSize={["18px","18px","18px","24px"]} fontFamily="Inter" >Elections</Heading>
                    <Text display={["none", "none", "none", "flex"]} whiteSpace="normal" fontSize={['12px', '12px', '14px', '14px']}>
                    See here the tokenss who got validated by the <span style={{color:"var(--chakra-colors-blue)", marginLeft:"5px", whiteSpace:"nowrap"}}>Mobula DAO</span>
                    </Text>
                </Flex>
                <Text display={["none", "none", "none", "flex"]}>
                      See here the lists token who got validated by the Mobula DAO
                </Text>
              
            </Flex>
            <Flex direction={["column-reverse","column-reverse","column-reverse","row"]} mt={["0px","0px","0px","50px"]} w="85%" maxWidth="1400px">
                <Flex w={["100%","100%","100%","75%"]}>
                    {/* LEFT COMPONENT */}
                    <Left promote={true} firstInput={membersToPromoteOne} secondInput={membersToPromoteTwo} setFirstInput={setPromoteAddress} firstValue={promoteAddress} />
                    <Mid promote={false} firstInput={membersToDemoteOne} secondInput={membersToDemoteTwo} setFirstInput={setDemoteAddress} firstValue={demoteAddress} />
                </Flex>
                <Flex w={["100%","100%","100%","25%"]} mt={["0px","0px","0px", "0px"]} mb={["10px","10px","10px", "0px"]}>
                    <Right />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Elections;
