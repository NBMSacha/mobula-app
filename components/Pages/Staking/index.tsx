import React from "react";
import { Heading, Text, Flex, Box } from "@chakra-ui/react";
import Cards from "./Cards"
import Boxs from "./Boxs"

function Staking() {
  
    return <>
        <Flex mx="auto" fontSize={["12px", "12px", "14px", "14px"]} w="85%" align="end" justify="space-between" mt="50px" maxWidth="1400px">
            <Flex direction="column">
                <Heading mb={"15px"} fontSize={["18px", "18px", "18px", "24px"]} fontFamily="Inter" >Staking</Heading>
                <Text display={["none", "none", "none", "flex"]} whiteSpace="normal" fontSize={["12px", "12px", "14px", "14px"]}>
                    The First Sort is the first step of validation for tokens wanting to be listed on Mobula.
                </Text>
            </Flex>
            <Text display={["none", "none", "none", "flex"]}>
                Learn more <a href="https://docs.mobula.finance/app/sort"><span style={{ color: "var(--chakra-colors-blue)", marginLeft: "5px", whiteSpace: "nowrap" }}>here</span></a>.
            </Text>
        </Flex>
        <Flex maxWidth="1400px" w="85%" mx="auto" mt="28px" mb="28px">
            <Cards />
            <Cards />
            <Cards />
        </Flex>
        <Flex direction="column" maxWidth="1400px" w="85%" mx="auto" mt="40px" mb="100px">
            <Box w="100%">
                <Text ml="0px" mb="30px" fontSize="20px" fontWeight="600"> Leaderboard</Text>
                <Flex justify="space-between" bg="var(--bg-governance-box)" w="95%" mx="auto" py="25px" px="35px" borderRadius="14px" boxShadow="1px 2px 13px 3px var(--shadow)">
                    <Flex direction="column" w="45%">
                        <Boxs rank={"1"} />
                        <Boxs rank={"2"} />
                        <Boxs rank={"3"} />
                        <Boxs rank={"4"} />
                        <Boxs rank={"5"} />
                    </Flex>
                    <Flex direction="column" w="45%">
                        <Boxs rank={"6"} />
                        <Boxs rank={"7"} />
                        <Boxs rank={"8"} />
                        <Boxs rank={"9"} />
                        <Boxs rank={"10"} />
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    </>
}

export default Staking;
