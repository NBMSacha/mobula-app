import { Flex, Box, Text, Image, Link, Button } from "@chakra-ui/react";

export default function BtnMobile({display, setDisplay, btn, setBtn}) {

    return(
        <Flex w="90%" justify="start" align="center" mt="20px" mb="10px" mx="auto" display={["flex", "flex", "none","none"]} position="relative" my="30px"  overflow="hidden">
                    <Flex left="0px" align="center" transition="transform 300ms ease-in-out" transform={btn ? "translateX(-110%)" : "translateX(0%)"} w="90vw">
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
                    <Flex align="center" transition="transform 300ms ease-in-out"  transform={btn ? "translateX(-105%)" : "translateX(10%)"} w="90vw">
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
    )
}