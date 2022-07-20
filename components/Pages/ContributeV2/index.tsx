import React from "react"
import { Text,Flex, Box,Button, Image } from "@chakra-ui/react"

export default function ContributeV2() {

    return(

        <Flex direction="column" align="center" maxWidth="1500px" mx="auto" >
            <Flex direction="column"  width="90%" mx="auto" mt="60px" mb="60px">
                <Text textAlign="center" fontSize={["32px"]}>Join Mobula, the Web3 version of CoinMarketCap</Text>
                <Text textAlign="center" width="60%" mx="auto" color="var(--text-grey)" fontSize={["18px"]}>Discover the next generation data aggregator, owned by users and providing on-chains data’s. Join a revolution in the world of crypto</Text>
            </Flex>
            <Flex w="90%" mx="auto" justify="center"> 
                <Flex justify="center" direction="column" w="30%" mr="-100px" h="180px" my="auto" borderRadius="12px" p="20px" bg="green">
                    <Text fontSize={["30px"]} mb="20px">+ 90 Partners</Text>
                    <Text fontSize={["20px"]}>+ 40 tech partners</Text>
                    <Text fontSize={["20px"]}>+ 20 business partners</Text>
                    <Text fontSize={["20px"]}>+ 30 ambassadors</Text>
                </Flex>
                <Flex justify="center" zIndex="2" direction="column"  borderRadius="12px" p="20px" pl="30px" pr="80px" bg="blue">
                    <Text fontSize={["30px"]} mb="20px">Empowering crypto creators</Text>
                    <Flex>
                        <Box>
                            <Text fontSize={["20px"]} my="5px">+ 4 000 crypto-assets listed</Text>
                            <Text fontSize={["20px"]} my="5px">+ 30 new listing/day in average</Text>
                            <Text fontSize={["20px"]} my="5px">+ 30,000 crypto page view in average</Text>
                        </Box>
                    </Flex>
                </Flex>
                <Flex justify="center"  direction="column" w="30%" ml="-50px" h="180px" my="auto" borderRadius="12px" p="20px" bg="red">
                    <Text fontSize={["24px"]} mb="20px">+ 90 A growing ecosystem</Text>
                    <Text fontSize={["20px"]}>+ 150 000 monthly users</Text>
                    <Text fontSize={["20px"]}>+ 30,000 connected wallet</Text>
                    <Text fontSize={["20px"]}>+ 30,000 connected</Text>
                </Flex>
            </Flex>
            <Text mb="60px" mt="80px" fontSize={["25px"]}>Want to live the Mobula adventure ? Join the ecosystem !</Text>
            <Flex w="90%" mx="auto" justify="space-between">
                <Box w="40%">
                    <Text fontSize={["35px"]}><Box as="span" color="blue">Join Mobula’s Discord</Box><br />Get involved in the ecosystem</Text>
                    <Text mt="30px" color="var(--text-grey)" fontSize={["18px"]}>The first community gathered aggregator with the mission of giving visibility, giving the most reliable and real information of all crypto-assets. We are fighting against centralized solutions and monopolies exercised by private companies that master and control data of crypto-assets.</Text>
                    <Button bg="blue" py="15px" px="30px" mt="30px">Join our Discord</Button>
                </Box>
                <Box position="relative" w="580px" h="380px">
                    <Image src="/discord-screen-2.png" position="absolute" bottom="0px" right="0px"/>
                    <Image src="/discord-screen.png" position="absolute" bottom="-10px"/>
                    <Flex align="center" justify="center" bg="white" boxSize="160px" position="absolute" right="30px" bottom="140px" borderRadius="full">
                        <Image h="110px" src="/discord3.png" />
                    </Flex>
                </Box>
            </Flex>
        </Flex>

    )
}