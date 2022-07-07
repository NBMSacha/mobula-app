import { Button, useColorMode, IconButton, useColorModeValue, Flex, Box, Text, Heading, Input, Image, Link } from "@chakra-ui/react";

export default function Boxs() {
    
    return(
        
                <Box mr={["0px","0px","20px","20px"]}  my="10px" w={["100%","100%","310px","31%"]} borderRadius="12px" border="1px solid var(--box_border)" boxShadow="1px 2px 13px 3px var(--shadow)">
                    <Flex h="110px" align="center" justify="center" bg="var(--bg-partner)">
                        <Image src="/fullicon.png" boxSize="50px"/>
                    </Flex>
                    <Box p="20px 20px" textAlign={["center","center","start","start"]}>
                        <Text fontWeight="600" mb="10px">StaySAFU</Text>
                        <Text fontSize="12px" mb="8px">The security leader for the BNB Chain. Protecting millions of crypto investors with the SAFU Scanner, securing millions of USD worth of assets with the SAFU Audits & KYC.</Text>
                        <Text fontSize="10px" display={["none","none","flex","flex"]}>staysafu.org</Text>
                    </Box>
                </Box>
 
    )
}