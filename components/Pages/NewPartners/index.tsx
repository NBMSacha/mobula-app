import { Button, useColorMode, IconButton, useColorModeValue, Flex, Box, Text, Heading, Input, Image, Link } from "@chakra-ui/react";
import Boxs from "./Boxs"
import React, { useState } from "react"

export default function NewPartners() {

    const [ display, setDisplay ] = useState("Marketing")
    const [ btn, setBtn ] = useState(false)
    return (
        <Box maxWidth="1300px" mx="auto">
            <Flex w="90%"  mx="auto" direction="column" align="center" borderBottom="1px solid var(--box_border)" >
                <Box w={["100%", "100%", "100%", "100%"]} mt={["14px", "14px", "30px", "50px"]} mb={["14px", "14px", "20px", "30px"]} mx={["0px", "0px", "0px", "auto"]}>
                    <Text fontFamily='Inter' textAlign={["center","center","start","start"]} fontWeight="500" fontSize={["15px", "15px", "15px", "25px"]} mb="15px">
                        A vibrant data aggregator surrounded by a vibrant ecosystem.
                    </Text>
                    <Text fontFamily='Inter' textAlign={["center","center","start","start"]} fontWeight="400" fontSize={["12px", "12px", "14px", "18px"]} color="grey">
                    Being listed on Mobula means being in line with most of the quality standards required by launchpads and other entities in the crypto ecosystem. That's why our partners accept to work with tokens if they are listed on Mobula.
                    </Text>
                </Box>
            </Flex>
            <Flex display={["none", "none", "flex","flex"]} w="90%" justify="start" align="center" mt="30px" mb="40px" mx="auto">
                <Button _focus={{ boxShadow: "none" }} minWidth="90px" fontWeight="400" w="130px" p="8px" mr="15px" border="1px solid var(--box_border)" color={display === "Marketing" ? "white" : "none"} 
                bg={display === "Marketing" ? "var(--elections)" : "var(--box_primary)"} 
                onClick={() =>setDisplay("Marketing")}
                fontSize={["12px", "12px", "15px", "15px"]}
                >Marketing</Button>
                <Button color={display === "Technical" ? "white" : "none"}  _focus={{ boxShadow: "none" }} minWidth="90px" fontWeight="400" w="130px" p="8px" mr="15px" border="1px solid var(--box_border)"
                bg={display === "Technical" ? "var(--elections)" : "var(--box_primary)"} 
                onClick={() =>setDisplay("Technical")}
                fontSize={["12px", "12px", "15px", "15px"]}
                >Technical</Button>
                <Button color={display === "Security" ? "white" : "none"}  _focus={{ boxShadow: "none" }} minWidth="90px" fontWeight="400" w="130px" p="8px" mr="15px" border="1px solid var(--box_border)" 
                bg={display === "Security" ? "var(--elections)" : "var(--box_primary)"} 
                onClick={() =>setDisplay("Security")}
                fontSize={["12px", "12px", "15px", "15px"]}
                >Security</Button>
                <Button color={display === "Launch" ? "white" : "none"}  _focus={{ boxShadow: "none" }} minWidth="90px" fontWeight="400" w="130px" p="8px" mr="15px" border="1px solid var(--box_border)" 
                bg={display === "Launch" ? "var(--elections)" : "var(--box_primary)"} 
                onClick={() =>setDisplay("Launch")}
                fontSize={["12px", "12px", "15px", "15px"]}
                >Launch</Button>
                <Button color={display === "Listing" ? "white" : "none"}  _focus={{ boxShadow: "none" }} minWidth="90px" fontWeight="400" w="130px" p="8px" mr="15px" border="1px solid var(--box_border)"
                bg={display === "Listing" ? "var(--elections)" : "var(--box_primary)"} 
                onClick={() =>setDisplay("Listing")}
                fontSize={["12px", "12px", "15px", "15px"]}
                >Listing</Button>
            </Flex>
            <Flex w="90%" justify="start" align="center" mt="20px" mb="10px" mx="auto" display={["flex", "flex", "none","none"]} position="relative" my="30px"  overflow="hidden">

                    <Flex  left="0px" align="center" transition='transform 300ms ease-in-out' transform={btn ? "translateX(-110%)" : "translateX(0%)"} w="90vw">
                        <Button _focus={{ boxShadow: "none" }} minWidth="90px" fontWeight="400" w="130px" p="8px" mr="15px" border="1px solid var(--box_border)" color={display === "Marketing" ? "white" : "none"} 
                        bg={display === "Marketing" ? "var(--elections)" : "var(--box_primary)"} 
                        onClick={() =>setDisplay("Marketing")}
                        fontSize={["12px", "12px", "15px", "15px"]}
                        >Marketing</Button>
                        <Button color={display === "Technical" ? "white" : "none"}  _focus={{ boxShadow: "none" }} minWidth="90px" fontWeight="400" w="130px" p="8px" mr="15px" border="1px solid var(--box_border)"
                        bg={display === "Technical" ? "var(--elections)" : "var(--box_primary)"} 
                        onClick={() =>setDisplay("Technical")}
                        fontSize={["12px", "12px", "15px", "15px"]}
                        >Technical</Button>
                        <Button color={display === "Security" ? "white" : "none"}  _focus={{ boxShadow: "none" }} minWidth="90px" fontWeight="400" w="130px" p="8px" mr="15px" border="1px solid var(--box_border)" 
                        bg={display === "Security" ? "var(--elections)" : "var(--box_primary)"} 
                        onClick={() =>setDisplay("Security")}
                        fontSize={["12px", "12px", "15px", "15px"]}
                        >Security</Button>
                        <Button w="30px" onClick={()=>setBtn(!btn)} _focus={{ boxShadow: "none" }} >{">"}</Button>
                    </Flex>
                    <Flex align="center" transition='transform 300ms ease-in-out'  transform={btn ? "translateX(-105%)" : "translateX(10%)"} w="90vw">
                        <Button onClick={()=>setBtn(!btn)} w="30px" mx="10px" _focus={{ boxShadow: "none" }}>{"<"}</Button>
                        <Button color={display === "Launch" ? "white" : "none"}  _focus={{ boxShadow: "none" }} minWidth="90px" fontWeight="400" w="130px" p="8px" mr="15px" border="1px solid var(--box_border)" 
                        bg={display === "Launch" ? "var(--elections)" : "var(--box_primary)"} 
                        onClick={() =>setDisplay("Launch")}
                        fontSize={["12px", "12px", "15px", "15px"]}
                        >Launch</Button>
                        <Button color={display === "Listing" ? "white" : "none"}  _focus={{ boxShadow: "none" }} minWidth="90px" fontWeight="400" w="130px" p="8px" mr="15px" border="1px solid var(--box_border)"
                        bg={display === "Listing" ? "var(--elections)" : "var(--box_primary)"} 
                        onClick={() =>setDisplay("Listing")}
                        fontSize={["12px", "12px", "15px", "15px"]}
                        >Listing</Button>
                    </Flex>
        
                
                
            </Flex>
            <Flex flexWrap="wrap" justify={["center","center", "start", "start"]} w="90%"  mx="auto">
                <Boxs />
                <Boxs />
                <Boxs />
                <Boxs />
                <Boxs />  
            </Flex>  
        </Box>
          
    )
}