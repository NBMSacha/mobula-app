import { useState, useEffect } from 'react'
import { Text, Heading, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image, useMediaQuery } from '@chakra-ui/react'
import styles from "./Contribute.module.scss"
export default function Contribute() {
  
    
    return(

        <Flex direction="column" align="center" maxWidth="1500px" mx="auto" >
            <Flex direction="column"  width="90%" mx="auto" my={["30px","30px","60px","60px"]} >
                <Text textAlign="center" fontSize={["15px","15px","40px","40px"]} fontWeight="500" mb="10px">Mobula, the <Box color="blue" as="span">next generation</Box> data aggregator</Text>
                <Text textAlign="center" width={["95%","90%","60%","60%"]} mx="auto" color="var(--text-grey)" fontSize={["10px","10px","18px","18px"]}>Discover the next generation data aggregator, owned by users and providing on-chains data’s. Join a revolution in the world of crypto</Text>
            </Flex>
            <Flex w={["80%", "80%","90%","90%"]} mb={["0px","0px","0px","0px"]} justify="center" position="relative">
                <Image borderRadius="20px" src="/contribute.png" />
                <Text position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" fontSize={["12px", "12px","32px","32px"]} color="white" fontWeight="800">Join the wave.</Text>
            </Flex>
            

            <Text mt={["30px","30px","100px","100px"]} fontSize={["13px","13px","25px","25px"]} mb={["10px","10px","30px","30px"]} color="var(--text-grey)">Ecosystem</Text>
            <Box w="40%" h="2px" bg="var(--box_border)" mb={["40px","40px","60px","60px"]}></Box>
            <Flex w={["90%","90%","80%","80%"]} mx="auto" direction={["column","column", "row", "row"]} align="center" justify="space-between" h="auto">
                <Box w={["95%","92%","40%","40%"]} h="100%" pr={["20px","20px","0px","0px"]}>
                    <Text fontWeight="600" className={styles["title"]}><Box as="span" color="blue" >Mobula’s Discord</Box><Text mt="-5px">Get involved</Text></Text>
                    <Box className={styles["descriptions"]}  mt={["10px","10px","20px","20px"]} color="var(--text-grey)">Interact with Mobula community: thousands of crypto lovers and builders making decentralization and seamless data access their top priority.</Box>
                    <Button display={["none","none","flex","flex"]} fontWeight="400" color="white" bg="blue" py={["5px","5px","10px","10px"]} px={["20px","20px","30px","30px"]} mt={["10px","20px","30px","30px"]} className={styles["button"]}>
                    <Image src="./discord-logo.png" h="24px" mr="10px"/> 
                    Join the Mobula Discord</Button>
                    
                </Box>
                <Flex h="100%" w={["90%","90%","50%","50%"]} direction="column" align="center" mt={["20px","20px","0px","0px"]}>
                    <Flex  maxWidth={["auto","auto","100%","100%"]} display="column" align="center" boxSize={["auto","auto","auto","auto"]}  justify="center" h="100%">
                        <Image src="/screen1.png" />
                        <Button display={["flex","flex","none","none"]} fontWeight="400" color="white" bg="blue" borderRadius="10px" h="35px" mb="20px" px={["20px","20px","30px","30px"]} mt="15px" ml="auto" mr="auto" w="100%" fontSize={["10px","10px","25px","25px"]}>
                            <Image src="./discord-logo.png" h="22px" mr="10px"/> 
                            Join our Discord</Button>
                    </Flex>
                </Flex>
            </Flex>


            <Text mt={["20px","40px","100px","100px"]} fontSize={["13px","13px","25px","25px"]} mb={["10px","10px","30px","30px"]} color="var(--text-grey)">Governance</Text>
            <Box w="40%" h="2px" bg="var(--box_border)" mb={["40px","40px","60px","60px"]}></Box>
            <Flex w={["90%","90%","80%","80%"]} direction={["column-reverse","column-reverse", "row", "row"]} align="center"  justify="space-between" h="auto">
                
                <Flex position="relative" h="100%" w={["90%","90%","50%","50%"]} direction="column" align="center" mt={["20px","20px","0px","0px"]}>
                    <Flex display="column" maxWidth={["auto","auto","100%","100%"]} boxSize={["auto","auto","auto","auto"]}  align="center" justify="center" h="100%">
                        <Image ml={["5px","5px","0px","0px"]} src="/screen2.png" />
                        <Button display={["flex","flex","none","none"]} fontWeight="400" color="white" bg="blue" borderRadius="10px" h="35px" mb="20px" px={["20px","20px","30px","30px"]} mr="auto" ml="auto" mt="15px" w="100%" fontSize={["10px","10px","25px","25px"]}>Discover Governance </Button>
                    </Flex>
                </Flex>
                <Box w={["95%","92%","45%","40%"]} h="100%" px="5px" pl={["20px","20px","auto","auto"]}>
                    <Text  fontWeight="600" className={styles["title"]}><Box as="span" color="blue">The Governance DAO</Box><Text mt="-5px">Decide what’s next.</Text></Text>
                    <Box className={styles["descriptions"]} mt={['10px','10px','20px','20px']} color="var(--text-grey)" >Contribute to the future of Mobula. Submit proposals, or vote for existing ones, about Treasury management, next features, Protocol DAO tweaks.</Box>
                    <Button className={styles["button"]} display={["none","none","flex","flex"]} fontWeight="400" color="white" bg="blue" py={["5px","5px","10px","10px"]} px={["20px","20px","30px","30px"]} mt={["10px","20px","30px","30px"]} >Discover the Governance DAO</Button>
                </Box>
            </Flex>





            <Text mt={["20px","40px","100px","100px"]} fontSize={["13px","13px","25px","25px"]} mb={["10px","10px","30px","30px"]} color="var(--text-grey)">Protocol</Text>
            <Box w="40%" h="2px" bg="var(--box_border)" mb={["40px","40px","60px","60px"]}></Box>
            <Flex direction={["column","column", "row", "row"]} w={["90%","90%","80%","80%"]} align="center" mx="auto" justify="space-between" h="auto" mb="100px">
                <Box w={["95%","92%","40%","40%"]} h="100%" pr={["20px","20px","0px","0px"]}>
                    <Text fontWeight="600" className={styles["title"]}><Box as="span" color="blue">The Protocol DAO</Box><Text mt="-5px">Decide what’s listed.</Text></Text>
                    <Box className={styles["descriptions"]}  mt={['10px','10px','20px','20px']} color="var(--text-grey)" >Aanalyze the projects requesting for a listing, vote for or against the validation of their listing, attribute them a score from 0 to 5. </Box>
                    <Button display={["none","none","flex","flex"]} fontWeight="400" color="white" bg="blue" py={["5px","5px","10px","10px"]} px={["20px","20px","30px","30px"]} mt={["10px","20px","30px","30px"]} className={styles["button"]}>Discover the Protocol DAO</Button>
                </Box>
                <Flex position="relative" h="100%" w={["90%","90%","50%","50%"]}  direction="column" align="center" mt={["20px","20px","0px","0px"]}>
                    <Flex  maxWidth={["auto","auto","100%","100%"]} display="column" boxSize={["auto","auto","auto","auto"]} align="center" justify="center" h="100%">
                        <Image  src="/screen3.png" />
                        <Button display={["flex","flex","none","none"]} borderRadius="10px" h="35px" mb="20px" fontWeight="400" ml="auto" mr="8px" color="white" bg="blue" px={["20px","20px","30px","30px"]} mt="15px" w="100%" fontSize={["10px","10px","25px","25px"]}>Discover DAO</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>

    )
}