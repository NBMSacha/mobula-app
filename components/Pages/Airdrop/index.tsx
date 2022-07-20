import { useState, useEffect } from "react"
import { Text, Flex, Button} from "@chakra-ui/react"
import { createClient } from "@supabase/supabase-js"
import Main from "./Main"
import styles from "./Airdrop.module.scss"
import {formatName} from "../../../helpers/formaters"
import TopInfo from "./TopInfo";
import AirdropInfo from "./AirdropInfo"
import TopInfoMobile from "./TopInfoMobile"
import AirdropInfoMobile from "./AirdropInfoMobile"
import Timer from "./Timer"
import Tables from "./Tables"
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers";
import { getBlockchainFromId, mobulaRouter, supportedRPCs } from "../../../constants";
import { useAlert } from "react-alert";

export default function Airdrop({ tokenInBuffer, tokenOutBuffer }: { tokenInBuffer?: any, tokenOutBuffer?: any }) {
  
    const [ display, setDisplay ] = useState("Ongoing")
    const [tokens, setTokens] = useState([])
    const [isParticipated, setIsParticipated] = useState(false)
    const [ airdropPage, setAirdropPage] = useState(true)
    const [amountBurn, setAmountBurn] = useState(330)
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [showDescription, setShowDescription] = useState(false)
    const [needApprove, setNeedApprove] = useState(false)
    const web3React = useWeb3React()
    const [baseAsset, setBaseAsset] = useState(null)
    const [tokenIn, setTokenIn] = useState(baseAsset);
    const [tokenOut, setTokenOut] = useState(baseAsset)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [buttonStatus, setButtonStatus] = useState("Loading...")
    const alert = useAlert()
    
    async function showToken() {
        const supabase = createClient(
            "https://ylcxvfbmqzwinymcjlnx.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
        )
        supabase
        .from("airdrops")
        .select("*")
        .then(r => {
            if(display !== "Ended") {
                setTokens(r.data)
            } 
        })
    }

    useEffect(() => {
        showToken()
    }, [])

    let provider;
    
    function Approval() {
        provider = new ethers.providers.Web3Provider(web3React.library.provider);
        const contract = new ethers.Contract(mobulaPerBlockchain[getBlockchainFromId[web3React.chainId]], [
            "function approve(address spender, uint256 amount) public"], provider?.getSigner?.())

        contract.approve(mobulaRouter[web3React.chainId], BigInt("1000000000000000000000000000000000000000000")).then(async (r: any) => {
            alert.info("Transaction to approve MOBL is pending...")
            setButtonLoading(true)
            await r.wait()
            setButtonLoading(false)
            alert.success("Successfully approved MOBL" )
        }).catch(() => {
            alert.error("Something went wrong while trying to allow MOBL")
        })

        setNeedApprove(false)
    }

    useEffect(() => {

        try {
            const chain = web3React.chainId;
            if (tokenOut && !tokenOut.address && tokenOut.contracts) {
                const address = tokenOut.contracts[tokenOut.blockchains.indexOf(getBlockchainFromId[web3React.chainId])];
                //setTokenOut({ symbol: tokenOut.symbol, address, logo: tokenOut.logo })
                const RPC = supportedRPCs.filter(entry => entry.name === getBlockchainFromId[web3React.chainId])[0];
                const provider = new ethers.providers.JsonRpcProvider(RPC);
                const contract = new ethers.Contract(address, [
                    "function decimals() public view returns (uint256)"], provider)
                contract.decimals().then((r: ethers.BigNumber) => {
                    setTokenOut({ symbol: tokenOut.symbol, address, logo: tokenOut.logo, decimals: r.toNumber() })
                })
            }

            if (chain === 137) {
                setTokenIn({ symbol: "MATIC", logo: "/polygon.png", decimals: 18 })
                if (tokenOut) {
                    setButtonStatus("Swap")
                } else {
                    setButtonStatus("Select token out.")
                }
            } else if (chain === 56) {
                setTokenIn({ symbol: "BNB", logo: "/bnb.png", decimals: 18 })
                if (tokenOut) {
                    setButtonStatus("Swap")
                } else {
                    setButtonStatus("Select token out.")
                }
            } else if (chain) {
                setTokenIn(null)
                setButtonStatus("Unsupported chain.")
            } else {
                setButtonStatus("Connect wallet")

            }
        } catch (e) {
            if (web3React?.chainId) {
                setButtonStatus("Asset not on " + getBlockchainFromId[web3React.chainId].split(" ")[0])
            } else {
                setButtonStatus("Connect wallet")
            }
        }

    }, [web3React.chainId])

    const mobulaPerBlockchain = { 
        "BNB Smart Chain (BEP20)": "0x33b3a50c766Dd3e61b1e90b251390e7C28AeFb7C",
        "Polygon": "0x5FeF39b578DeEefa4485A7E5944c7691677d5dd4",
        "Avalanche C-Chain": "0xaE85d5aA526b1ECC5e90E466CbD2bdeC22c606Ff",
     }

    // useEffect(() => {
    //     const RPC = supportedRPCs.filter(entry => entry.name === getBlockchainFromId[web3React.chainId])[0];
    //     const provider = new ethers.providers.JsonRpcProvider(RPC);
    //         const contract = new ethers.Contract(mobulaPerBlockchain[getBlockchainFromId[web3React.chainId]], [
    //             "function balanceOf(address account) public view returns (uint256)",
    //             "function allowance(address account, address spender) public view returns (uint256)",
    //             "function decimals() public view returns (uint256)"], provider)

    //         contract.allowance(web3React.account, mobulaRouter[web3React.chainId]).then((r: any) => {
    //             try {
    //                 if (!r.toNumber()) {
    //                     setNeedApprove(true)
    //                     setButtonStatus("Approve")
    //                 }
    //             } catch (e) {
    //                 setNeedApprove(false)
    //             }
    //         })
    // }, [tokenIn])

    return(
        <>
            <Flex direction="column" maxWidth="1400px" mx="auto" >
                {airdropPage ? (
                    <>
                    {tokens.filter(token => token.name === "Coming").map((token:any) => {
                        var x = setInterval(() => {
                            var now = new Date().getTime();
                            var distance = token.start - now
                            setDays(Math.floor(distance / (1000 * 60 *60 *24)));
                            setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
                            setMinutes(Math.floor((distance % (1000 * 60 *60)) / (1000 * 60)))
                            setSeconds(Math.floor((distance % (1000 * 60)) / (1000)))
                        })
                        return <><Flex mt={["20px","20px","50px","50px"]} mx="auto" className={styles["main"]}>
                            <Flex direction="column" bg="var(--bg-governance-box)" className={styles["padBox-info"]} borderRadius="12px" boxShadow="1px 2px 13px 3px var(--shadow)">
                                <TopInfo token={token}/>
                                <AirdropInfo token={token}/>
                                <Text display={["none","none","flex","flex"]} m="20px" mb="20px"  fontSize="15px" color="var(--text-grey)" maxHeight="180px" overflowY="scroll" className={styles["scroll"]}>{token.description}</Text>
                                <Text display={["flex","flex","none","none"]} m="20px" mb="0px" fontSize="10px" color="var(--text-grey)"  >{token.description.length > 190 && !showDescription ? formatName(token.description, 190) : token.description } </Text>
                                {token.description.length > 190 &&(
                                    <Button display={["flex","flex","none","none"]} fontSize="10px" mt="2px" ml="20px" mr="auto" _focus={{ boxShadow: "none" }} onClick={()=>setShowDescription(!showDescription)}>{showDescription ? "Read less..." : "Read more..." }</Button>
                                )}
                                <TopInfoMobile token={token} />
                            </Flex>
                            <AirdropInfoMobile token={token} />
                            <Timer approval={Approval} token={token} days={days} hours={hours} minutes={minutes} seconds={seconds} amountBurn={amountBurn} setAmountBurn={setAmountBurn}/>
                        </Flex>
                        <Tables token={token} />
                   </> })}
                   </>
                ) : (
                     <Main airdropPage={airdropPage} setAirdropPage={setAirdropPage} tokens={tokens} isParticipated={isParticipated} setIsParticipated={setIsParticipated} setDisplay={setDisplay} display={display}/>
                )}
            </Flex>
        </>
    )
}
