import React, { useEffect, useState } from 'react'
import { Button, Flex, Box, Text } from "@chakra-ui/react";
import Boxs from "./Boxs"
import { createClient } from "@supabase/supabase-js"
import BtnDesktop from "./BtnDesktop"
import BtnMobile from "./BtnMobile"

export default function NewPartners() {

    const [ display, setDisplay ] = useState("Marketing")
    const [ btn, setBtn ] = useState(false)
    const [ partner, setPartner ] = useState([])
    const [ security, setSecurity ] = useState([])
    async function initNonCryptoValues() {
        const supabase = createClient(
          "https://ylcxvfbmqzwinymcjlnx.supabase.co",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
        )
        supabase
          .from("partners")
          .select("*")
          .then(r => {
            console.log(r.data)
            setPartner(r.data)
          })
        supabase
          .from("partners")
          .select("*")
          .filter("type", "eq", "Marketing")
          .then(r => {
            console.log(r.data)
            setSecurity(r.data)
          })
    }


    useEffect(() => {
        initNonCryptoValues()
       
      
    }, [])

    console.log(partner)

    return (
        <Box maxWidth="1300px" mx="auto">
            <Flex w="90%"  mx="auto" direction="column" align="center" borderBottom="1px solid var(--box_border)" >
                <Box w={["100%", "100%", "100%", "100%"]} mt={["14px", "14px", "30px", "50px"]} mb={["14px", "14px", "20px", "25px"]} mx={["0px", "0px", "0px", "auto"]}>
                    <Text fontFamily="Inter" textAlign={["center","center","start","start"]} fontWeight="500" fontSize={["15px", "15px", "15px", "20px"]} mb="10px">
                        A vibrant data aggregator surrounded by a vibrant ecosystem.
                    </Text>
                    <Text fontFamily="Inter" textAlign={["center","center","start","start"]} fontWeight="400" fontSize={["12px", "12px", "14px", "16px"]} color="grey">
                    Being listed on Mobula means being in line with most of the quality standards required by launchpads and other entities in the crypto ecosystem. That"s why our partners accept to work with tokens if they are listed on Mobula.
                    </Text>
                </Box>
            </Flex>
            {/* BUTTON DESKTOP */}
            <BtnDesktop display={display} setDisplay={setDisplay}/>
            {/* BTN MOBILE */}
            <BtnMobile btn={btn} setBtn={setBtn} display={display} setDisplay={setDisplay}/>
            <Flex flexWrap="wrap" justify={["center","center", "start", "start"]} w="90%"  mx="auto">
                {partner.map((partner:any) => {
                    console.log(partner)
                    if(display === "Security") {
                        return <>
                            {partner.type === "Security\r\n" &&(
                                <Boxs partner={partner}/>
                            )}
                        </>
                    } else if(display === "Marketing") {
                        return <>
                            {partner.type === "Marketing\r\n" &&(
                                <Boxs partner={partner}/>
                            )}
                        </>
                    } else if(display === "Technical") {
                        return <>
                            {partner.type === "Technical\r\n" &&(
                                <Boxs partner={partner}/>
                            )}
                        </>
                    } else {
                        return <></>
                    }
                })}
                
            </Flex>  
        </Box>
          
    )
}