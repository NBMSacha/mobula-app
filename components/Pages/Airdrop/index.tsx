import { useState, useEffect } from 'react'
import { Text, Heading,Input,Link, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image, useMediaQuery } from '@chakra-ui/react'

  import {ArrowDownIcon} from "@chakra-ui/icons"
  import { createClient, SupabaseClient } from '@supabase/supabase-js'
import Main from "./Main"
import styles from "./Airdrop.module.scss"
import {formatName} from "../../../helpers/formaters"
import TopInfo from "./TopInfo";
import AirdropInfo from "./AirdropInfo"
import TopInfoMobile from "./TopInfoMobile"
import AirdropInfoMobile from "./AirdropInfoMobile"
import Timer from "./Timer"
import Tables from "./Tables"

export default function Contribute() {
  
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

    async function showToken() {
        const supabase = createClient(
            "https://ylcxvfbmqzwinymcjlnx.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
        )
        supabase
        .from('airdrops')
        .select('*')
        .then(r => {
            if(display !== "Ended") {
                setTokens(r.data)
            } 
            console.log(r.data, r.error)
        })
    }

    useEffect(() => {
        showToken()
    }, [])


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
                        <Timer token={token} days={days} hours={hours} minutes={minutes} seconds={seconds} amountBurn={amountBurn} setAmountBurn={setAmountBurn}/>
                   </Flex>
                   <Tables token={token}/>
                   </> })}
                   
                   </>
                ) : (
                     <Main tokens={tokens} isParticipated={isParticipated} setIsParticipated={setIsParticipated} setDisplay={setDisplay} display={display}/>
                )}
               
            </Flex>
            
        </>
    )
}
