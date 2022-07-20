import { Flex, Box, Text, Image, Link, Button } from "@chakra-ui/react";

export default function BtnDesktop({display, setDisplay}) {

    return(
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
    )
}