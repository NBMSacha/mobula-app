import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { ethers } from "ethers";
import { PROTOCOL_ADDRESS, RPC_URL } from "../../constants";
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
import DaoHeader from "../Utils/DaoHeader";
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
                description={'Decide who deserves to be part of the Protocol DAO, and who should no longer be part of it.'}
                url={'https://docs.mobula.finance/whitepaper'} />

            <Spacer h={'50px'} />
            <Flex mr="auto" ml="auto" justify="space-around" w="90%" maxWidth="1240px" >
                <Vote promote={true} firstInput={membersToPromoteOne} secondInput={membersToPromoteTwo} setFirstInput={setPromoteAddress} firstValue={promoteAddress} />
                <Vote promote={false} firstInput={membersToDemoteOne} secondInput={membersToDemoteTwo} setFirstInput={setDemoteAddress} firstValue={demoteAddress} />
            </Flex>
            {/* <Flex
                paddingTop="60px"
                justifyContent={["space-evenly"]}
                flexDir={["column", "column", "column", "row"]}
                alignItems={["center", "center", "center", "stretch"]}
            >
                <Box
                    p="00px 15px 15px 15px"
                    bg={"#a3d4f440"}
                    borderRadius="10px"
                    w={["90%", "90%", "90%", "30%"]}
                    textAlign={["center", "center", "center", "left"]}
                    mb={[7, 7, 7, 0]}
                >
                    <h2 className={styles.title}>Promotion</h2>
                    <Box fontSize="15px" mb={5}>
                        <Text mb={2}> Amount of Rank I seats</Text>
                        <Text fontWeight="800">
                            {" "}
                            {membersToPromoteOne + " members"}
                        </Text>
                    </Box>
                    <Box fontSize="15px" mb={5}>
                        <Text mb={2}> Amount of Rank II seats</Text>
                        <Text fontWeight="800">
                            {" "}
                            {membersToPromoteTwo + " members"}
                        </Text>
                    </Box>

                    <FormControl>
                        <FormLabel htmlFor="contract">Address to promote</FormLabel>
                        <Input
                            onChange={(e) => setPromoteAddress(e.target.value)}
                            placeholder="0x .."
                            isRequired
                            background="#a3d4f433"
                            border="none"
                            h="32px"
                            mb="45px"
                            fontFamily="Poppins"
                            w="90%"
                        />
                        <Flex
                            width="100%"
                            justifyContent={["center", "center", "center", "left"]}
                        >
                            <button
                                className="button"
                                style={{ width: 150 }}
                                onClick={async (e) => {
                                    e.preventDefault;
                                    try {
                                        var provider = new ethers.providers.Web3Provider(
                                            (window as any).ethereum
                                        );
                                        var signer = provider.getSigner();
                                    } catch (e) {
                                        alert.show(
                                            "You must connect your wallet to access the Dashboard."
                                        );
                                    }

                                    try {
                                        const value = await new ethers.Contract(
                                            PROTOCOL_ADDRESS,
                                            [
                                                "function promote(address promoted) external",
                                                "promoteVotes(address promoted) returns (uint256)",
                                            ],
                                            signer
                                        );
                                        const promotevotes = await value.promoteVotes(
                                            promoteAddress
                                        );
                                        await value.promote(promoteAddress);
                                        alert.show(promotevotes + " votes to promote");
                                    } catch (e) {
                                        alert.show("You can't promote this address");
                                        console.log(e);
                                    }
                                }}
                            >
                                Promote
                            </button>
                        </Flex>
                    </FormControl>
                </Box>

                <Box
                    p="0px 20px 20px 20px"
                    bg={"#a3d4f440"}
                    borderRadius="10px"
                    w={["90%", "90%", "90%", "30%"]}
                    textAlign={["center", "center", "center", "left"]}
                    mb={[7, 7, 7, 0]}
                >
                    <h2 className={styles.title}>Demotion</h2>
                    <Box fontSize="15px" mb={5}>
                        <Text mb={2}> Amount of Rank I to demote</Text>
                        <Text fontWeight="800"> {membersToDemoteOne + " members"}</Text>
                    </Box>
                    <Box fontSize="15px" mb={5}>
                        <Text mb={2}> Amount of Rank II to demote</Text>
                        <Text fontWeight="800"> {membersToDemoteTwo + " members"}</Text>
                    </Box>

                    <FormControl>
                        <FormLabel htmlFor="contract">Address to demote</FormLabel>
                        <Input
                            onChange={(e) => setDemoteAddress(e.target.value)}
                            placeholder="0x .."
                            isRequired
                            background="#a3d4f433"
                            border="none"
                            h="32px"
                            mb="45px"
                            fontFamily="Poppins"
                            w="90%"
                        />
                        <Flex
                            width="100%"
                            justifyContent={["center", "center", "center", "left"]}
                        >
                            <Button
                                className="button"
                                fontFamily="Poppins"
                                style={{ width: 150 }}
                                onClick={async (e) => {
                                    e.preventDefault;
                                    try {
                                        var provider = new ethers.providers.Web3Provider(
                                            (window as any).ethereum
                                        );
                                        var signer = provider.getSigner();
                                    } catch (e) {
                                        alert.show(
                                            "You must connect your wallet to access the Dashboard."
                                        );
                                    }

                                    try {
                                        const value = await new ethers.Contract(
                                            PROTOCOL_ADDRESS,
                                            [
                                                "function demote(address demoted) external",
                                                "demoteVotes(address promoted) returns (uint256)",
                                            ],
                                            signer
                                        );
                                        const demotevotes = await value.demoteVotes(
                                            promoteAddress
                                        );
                                        await value.depromote(demoteAddress);
                                        alert.show(demotevotes + " votes to promote");
                                    } catch (e) {
                                        alert.show("You can't demote this address");
                                        console.log(e);
                                    }
                                }}
                            >
                                Demote
                            </Button>
                        </Flex>
                    </FormControl>
                </Box>
            </Flex> */}

        </>
    );
}

export default Elections;
