import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineArrowRight } from '@react-icons/all-files/ai/AiOutlineArrowRight'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { HiOutlineGlobeAlt } from '@react-icons/all-files/hi/HiOutlineGlobeAlt'
import { SiDiscord } from '@react-icons/all-files/si/SiDiscord'
import styles from './Governance.module.scss';
import { GOVERNOR_ADDRESS, MOBL_ADDRESS } from "../../constants"
import { ethers } from 'ethers'
import { formatAmount } from "../../helpers/formaters";
import abi from "./governor_abi.json"
import { ChakraProvider, Box, Flex, Button, Image, Input, Text, Heading, Textarea, useMediaQuery} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react';

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
    const [shares, setshares] = useState("0")
    const [depositAmount, setDepositAmount] = useState("");
    const [createProposal, setCreateProposal] = useState([]);

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
        try{
            
            const provider = new ethers.providers.Web3Provider((window as any).ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(GOVERNOR_ADDRESS,MOBULA_ABI, signer);   
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

            // const txs = await contract.allowance(MOBL_ADDRESS, address)
            // await txs.wait();
            if(formatedBalance >= depositAmount) {
                const tx1 = await mobulaContract.approve(GOVERNOR_ADDRESS, depositAmount)
                await tx1.wait();
                console.log(`You own: ${formatedBalance} $MOBL`)
                try {
                    const tx = await contract.deposit(depositAmount);
                    const txResponse = await tx.wait();
                    console.log(txResponse);
                } catch(err) {
                    alert(err.data.message);
                }
            } else {
                alert("Sorry, balance < value...")
               
            }
           
        }catch(err) {
            console.log(err.message)
        }
    }

    async function withdraw() { 
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(GOVERNOR_ADDRESS, MOBULA_ABI, signer);   
        if(provider !== undefined) {
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
        if(provider != undefined) {
            const signer = provider.getSigner();
            const accounts = await provider.listAccounts();
            const account = accounts[0];
            const proposalContract = new ethers.Contract(GOVERNOR_ADDRESS, MOBULA_ABI, signer);    
            try {
                const tx = await  proposalContract.createProposal(createProposal)
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
        try{
            const proposalContract = new ethers.Contract(GOVERNOR_ADDRESS, abi.abi, provider);   
            console.log(proposalContract)
            let nextProposals = await proposalContract.getLiveProposals(0);
            
        } catch(err) {
            console.log(err.message)
        }
        // const newLiveProposals = [];
        // nextProposals.forEach((props, idx) => {
        //     newLiveProposals.push(<div>TEST</div>)
        // })
    }
            
    useEffect(() => {
        getProposals()
    },[])


  return (
    <Flex color="white" direction="column" align="center" >
        <Box borderBottom="1px solid #2E3557" w="90%">
            <Heading>Governance</Heading>
            <Text>You are in charge: deposit MOBL to be able to vote.<a>Learn more here</a></Text>
        </Box>
        <Flex my={70} className={styles['container-box']}>
           
                <Flex direction="column" bg="rgba(163, 212, 244, 0.25)" ml="auto" mr="auto" borderRadius="25px"  mx={10} className={styles["current-vote"]}>
                    <Heading fontSize="25px" color="white" mb="0px">Voting Power</Heading>
                    <Text color="#ffffff99" fontSize="15px" mb="0px">You are currently deposited</Text>
                    <Text fontSize="15px" color="white">0 $MOBL</Text>
                    <FormControl>
                        <FormLabel htmlFor='deposit' color="#ffffff99" fontSize="15px" mb="15px">Deposit New Token</FormLabel>
                        <Input h="32px" w="90%" bg="rgba(163, 212, 244, 0.2)" border="none" id='deposit' fontFamily="Poppins" borderRadius='10px' type='number' placeholder="3000"
                            ref={depositRef}
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                        ></Input>
                    </FormControl>
                    <Button bg="linear-gradient(90deg, #003FE1 8.9%, #64D0FF 87.31%)" border="none" w="40%" py="10px" borderRadius="10px" mt="20px" color="white" fontFamily='Poppins' onClick={() => {console.log(depositAmount);deposit()}}>Deposit</Button>
                    <FormControl>
                        <FormLabel htmlFor='withdraw' mt="25px" color="#ffffff99" fontSize="15px">Withdraw New Token</FormLabel>
                        <Input h="32px" w="90%" bg="rgba(163, 212, 244, 0.2)" border="none" id='withdraw' borderRadius='10px' fontFamily="Poppins" type='number' placeholder="3000" 
                            ref={withdrawRef}
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}             
                        >
                        </Input>
                    </FormControl>
                    <Button  onClick={() => {console.log(withdrawAmount);withdraw()}}  bg="linear-gradient(90deg, #003FE1 8.9%, #64D0FF 87.31%)" border="none" w="40%" py="10px" borderRadius="10px" mt="20px" mb='50px' color="white" fontFamily='Poppins'  >Withdraw</Button>
                </Flex>
                <Flex direction="column" bg="rgba(163, 212, 244, 0.25)"  borderRadius="25px" className={`${styles["current-vote"]} ${styles["x-space"]}`}>
                    <Heading mb="0px">Governance process</Heading>
                    <Text>Create a proposal</Text>
                    <Textarea bg="rgba(163, 212, 244, 0.2)" borderRadius="10px" color="white" placeholder='The listing fee should be reduced to 10$'  h="165px" border="none" p="20px" fontFamily="Poppins" 
                        ref={proposalRef}
                        value={createProposal}
                        onChange={(e) => setCreateProposal(e.target.value)}
                    />
                    <Button bg="linear-gradient(90deg, #003FE1 8.9%, #64D0FF 87.31%)" border="none" w="40%" py="10px" borderRadius="10px" mb="50" mt="30px" color="white" fontFamily='Poppins' onClick={() => {console.log(createProposal);createProposals()}}>Create</Button>
                </Flex>
                <Flex direction="column"  px={0} ml="auto" mr="auto"  mx={10} className={styles["current-vote"]}>
                    <Heading mt="0px" >Vote for current proposals</Heading>
                    <Flex bg="#16C784" align="center" px={15}  justify="space-between" borderRadius="18px" className={styles["proposals"]}>
                        <Text maxWidth="230px" pr="10px" fontSize="15px" my='0px'>The listing fee should be reduced to 10$</Text>
                        <Flex align="center">
                            <Image src="thumbsUp.png" h="25px" mr={15}/>
                            <Image src="thumbsDown.png" h="25px"  ml="15px" opacity=".5"/>
                        </Flex>
                    </Flex>
                    <Flex bg="#16C784" align="center" px={15}  justify="space-between" mt={20} borderRadius="18px" className={styles["proposals"]}>
                        <Text maxWidth="230px" fontSize="15px" pr="10px" my='0px'>The listing fee should be reduced to 10$</Text>
                        <Flex align="center">
                            <Image src="thumbsUp.png" h="25px" mr={15}/>
                            <Image src="thumbsDown.png" h="25px"  ml="15px" opacity=".5"/>
                        </Flex>
                    </Flex>
                
                    <Flex bg="#EA3943" align="center" px={15}  justify="space-between" mt={20} borderRadius="18px" className={styles["proposals"]}>
                        <Text maxWidth="230px" pr="10px" fontSize="15px" my='0px'>The listing fee should be reduced to 10$</Text>
                        <Flex align="center">
                            <Image src="thumbsUp.png" h="25px" mr={15} opacity=".5"/>
                            <Image src="thumbsDown.png" h="25px"  ml="15px" />
                        </Flex>
                    </Flex>
                    <Flex bg="#16C784" align="center" px={15}  justify="space-between" mt={20} borderRadius="18px" className={styles["proposals"]}>
                        <Text maxWidth="230px" pr="10px" fontSize="15px" my='0px'>The listing fee should be reduced to 10$</Text>
                        <Flex align="center">
                            <Image src="thumbsUp.png" h="25px" mr={15}/>
                            <Image src="thumbsDown.png" h="25px"  ml="15px" opacity=".5"/>
                        </Flex>
                    </Flex>
                </Flex>
            
        </Flex>
           
    </Flex>
  )
}

export default Governance
