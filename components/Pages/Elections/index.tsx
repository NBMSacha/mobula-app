import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { ethers } from "ethers";
import { PROTOCOL_ADDRESS, RPC_URL } from "../../../constants";
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
        <>
            <DaoHeader title={'Elections'}
                description={'Decide who deserves to be part of the Protocol DAO.'}
                url={'https://docs.mobula.finance/whitepaper'} />

            <Flex mb="10vh" pl="20px" pr="15px" flexWrap="wrap" mr="auto" ml="auto" justify="space-around" w="90%" maxWidth="1240px" >
                <Vote promote={true} firstInput={membersToPromoteOne} secondInput={membersToPromoteTwo} setFirstInput={setPromoteAddress} firstValue={promoteAddress} />
                <Vote promote={false} firstInput={membersToDemoteOne} secondInput={membersToDemoteTwo} setFirstInput={setDemoteAddress} firstValue={demoteAddress} />
            </Flex>
        </>
    );
}

export default Elections;
