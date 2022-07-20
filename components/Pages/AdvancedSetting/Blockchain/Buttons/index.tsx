import React from "react"
import { Box, Text, Image, Button } from "@chakra-ui/react"

export default function Buttons({blockchains, setBlockchains, name, symbol, logo, blockchainName}) {
    return (
            <Button variant={blockchains.includes(blockchainName) ? "secondary" : "primary"} my={["5px", "5px", "0px", "0px"]} transition="background 200ms ease-in-out" _hover={{background:"var(--box_active)", transition:"background 200ms ease-in-out", cursor: "pointer", color:"none"}} _focus={{ boxShadow: "none" }} w="auto" minWidth="fit-content" mx={1} fontSize={["12px", "12px", "14px", "14px"]}
            display={["flex", "flex", "flex", "flex", "flex"]} 
            alignItems="center" justifyContent="center" p={[" 5px 10px","5px 10px","5px 10px","5px 10px"]} borderRadius="10px"
            onClick={() => {
                if (blockchains.includes(blockchainName)) {
                    const newBlockchains = [...blockchains];
                    newBlockchains.splice(newBlockchains.indexOf(blockchainName),1);
                    setBlockchains(newBlockchains)
                } else {
                    const newBlockchains = [...blockchains];
                    newBlockchains.push(blockchainName);
                    setBlockchains(newBlockchains)
                }
            }}>
            <Image h={["20px", "20px", "28px", "28px"]} borderRadius="full" src={logo} />
            <Box display={["none", "none", "block", "block"]} as="span" style={{ marginLeft: "10px" }}>{name}</Box>
            <Text display={["flex", "flex", "none", "none"]} ml="10px">{symbol}</Text>
        </Button>
    )
}




