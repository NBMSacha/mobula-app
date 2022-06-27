import React, { useEffect, useState, useRef } from 'react'
import styles from './Governance.module.scss';
import { GOVERNOR_ADDRESS, MOBL_ADDRESS } from "../../../constants"
import { ethers } from 'ethers'
import abi from "./governor_abi.json"
import { ChakraProvider, Box, Flex, Button, Image, Input, Spacer, Text, Heading, Textarea, useColorModeValue } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    ColorModeProvider,
    CSSReset
} from '@chakra-ui/react';
import Idea from "./Idea"
import Historys from "./History"
import Vote from "./Vote"
import Power from "./Power"

function Governance() {
    const [liveProposals, setLiveProposals]: [JSX.Element[], any] = useState([<Input
        className="long"
        value={'No proposals currently voted.'}
        onChange={(e) => e}
        placeholder="0x..."
        required
    ></Input>])
    const withdrawRef = useRef();
    const depositRef = useRef();
    const proposalRef = useRef();
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [createProposal, setCreateProposal] = useState("");
    const [proposals, setProposals] = useState([]);
    const [vote, setVote] = useState(0)

    const MOBULA_ABI = [
        "function withdraw(uint256 _amount) external ",
        "function createProposal(string memory name) external ",
        "function balanceOf(address account) external view returns (uint256)",
        " function allowance(address _owner, address spender) external view returns (uint256)",
        "function name() external view returns (string memory)",
        "function decimals() external view returns (uint8)",
        "function deposit(uint256 _amount) external",
        "function approve(address account, uint256 amount) public",
    ]

    async function deposit() {
        try {

            const provider = new ethers.providers.Web3Provider((window as any).ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(GOVERNOR_ADDRESS, MOBULA_ABI, signer);
            const address = await signer.getAddress();

            const mobulaContract = new ethers.Contract(
                MOBL_ADDRESS,
                [
                    "function approve(address account, uint256 amount) public",
                    "function balanceOf(address account) public view returns(uint256)",
                    "function allowance(address _owner, address spender) external view returns (uint256)"
                ],
                signer
            );
            const balance = await mobulaContract.balanceOf(address)
            const formatedBalance = Number(balance) / 10 ** 18;

            if (formatedBalance >= parseInt(depositAmount)) {
                const tx1 = await mobulaContract.approve(GOVERNOR_ADDRESS, depositAmount)
                await tx1.wait();
                console.log(`You own: ${formatedBalance} $MOBL`)

                try {
                    const tx2 = await contract.allowance(MOBL_ADDRESS, address)
                    await tx2.wait()
                    const tx = await contract.deposit(depositAmount);
                    const txResponse = await tx.wait();
                    console.log(txResponse);
                } catch (err) {
                    alert(err.message);
                }
            } else {
                alert("Sorry, balance < value...")

            }

        } catch (err) {
            console.log(err.message)
        }
    }

    async function withdraw() {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(GOVERNOR_ADDRESS, MOBULA_ABI, signer);
        if (provider !== undefined) {
            const mobulaContract = new ethers.Contract(
                MOBL_ADDRESS,
                [
                    "function approve(address account, uint256 amount) public",
                    "function balanceOf(address account) public view returns(uint256)"
                ],
                signer
            );
            try {

                const tx1 = await mobulaContract.approve(GOVERNOR_ADDRESS, depositAmount)
                await tx1.wait();
                const tx = await contract.withdraw(withdrawAmount)
                const txResponse = tx.wait()
                console.log(txResponse)
            } catch (err) {
                alert(err.message);
            }
        }
    }

    async function createProposals() {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        if (provider != undefined) {
            const signer = provider.getSigner();
            const accounts = await provider.listAccounts();
            const account = accounts[0];
            const proposalContract = new ethers.Contract(GOVERNOR_ADDRESS, MOBULA_ABI, signer);
            try {
                const tx = await proposalContract.createProposal(createProposal)
                const txResponse = tx.wait()
                console.log(txResponse);
            } catch (error) {
                alert(error.data.message);
            }
        }
    }

    async function getProposals() {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const accounts = await provider.listAccounts();
        const account = accounts[0];
        try {
            const proposalContract = new ethers.Contract(GOVERNOR_ADDRESS, abi.abi, provider);
            let nextProposals = await proposalContract.proposals(5);
            setProposals(nextProposals)
            console.log(nextProposals)


        } catch (err) {
            console.log(err.message)
        }

    }

    useEffect(() => {
        getProposals()
        if (!proposals) [
            console.log(proposals)
        ]
    }, [!proposals])

    proposals.map((number) => {
        console.log(Number(number))

    })

    return (
        <Flex direction="column" mb={'50px'} mt={'28px'} align="center" justify="center">
            <Flex fontSize={['12px', '12px', '14px', '14px']}  className={styles["stickyFix"]} margin="auto" w="80%" align="end" justify="space-between">
                <Flex  direction="column">
                    <Heading  mb={'15px'}  fontSize={["18px","18px","18px","24px"]} fontFamily="Inter" >Governance Process</Heading>
                    <Text display={["none", "none", "none", "flex"]} whiteSpace="normal" fontSize={['12px', '12px', '14px', '14px']}>
                    See here the tokenq who got validated by the <span style={{color:"var(--chakra-colors-blue)", marginLeft:"5px", whiteSpace:"nowrap"}}>Mobula DAO</span>
                    </Text>
                </Flex>
                <Text display={["none", "none", "none", "flex"]}>
                      See here the lists token who got validated by the Mobula DAO
                </Text>
            </Flex>
            <Flex fontSize={['12px', "12px", "15px", "15px"]} justify="center" mt={'10px'} align={["center", "center", "auto", "auto"]} w="90%" mb="100px" direction={["column-reverse", "column-reverse", "column-reverse", "row"]}>
                <Spacer />
                <Spacer />
                <Flex w={["96%", "90%", "85%", "45%"]} maxWidth="730px" direction="column" >
                    <Idea proposal={proposals} />
                    <Historys proposal={proposals} />
                </Flex>
                <Spacer />
                <Flex w={["96%", "90%", "85%", "45%"]} maxWidth="730px" direction={["column-reverse", "column-reverse", "column-reverse", "column"]} >
                    <Vote proposal={proposals} />
                    <Power proposal={proposals} />
                </Flex>
                <Spacer />
                <Spacer />
                <Box w={["100%","100%","100%","50%"]} h="200px" bg={`linear-gradient(180deg,hsla(0,0%,100%,0) 0, var(--background) 70%,var(--background) 100%,#f5f5f5)`} left="0px" position="absolute" bottom={["1050px","1050px" ,"450px" ,"400px"]}></Box>
            </Flex>
        </Flex>
    )
}

export default Governance
