import { Text, Heading,Input,Link, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image, useMediaQuery } from '@chakra-ui/react'
import styles from "../Airdrop.module.scss"
import {ArrowDownIcon} from "@chakra-ui/icons"

export default function Timer({token, amountBurn, setAmountBurn, days, hours, minutes, seconds}) {

    return (
        <Flex  boxShadow="1px 2px 13px 3px var(--shadow)" direction="column" bg="var(--bg-governance-box)" className={styles["padBox"]} borderRadius="12px">
            <Text mb="20px" color="var(--text-grey)" mx="auto" fontSize={["13px","13px","15px","15px"]} mt="10px">Time remaining</Text>
            <Flex color="var(--text-grey)" borderBottom="1px solid var(--box_border)" pb="20px" className={styles["timeRemaining"]} mx="auto">
                <Box mx="auto">
                    <Box w="50px" bg="var(--box-secondary)" border="1px solid var(--box_border)" p={["10px 10px"]} borderRadius="10px" textAlign="center" className={styles["fontSize"]}>{days}</Box>
                    <Text align="center" mt="10px" color="var(--text-grey)" fontSize="10px">Days</Text>
                </Box>
                <Box mx="auto">
                    <Box w="50px" bg="var(--box-secondary)" border="1px solid var(--box_border)" p="10px 10px" borderRadius="10px" textAlign="center" className={styles["fontSize"]}>{hours}</Box>
                    <Text align="center" mt="10px" color="var(--text-grey)" fontSize="10px">Hours</Text>
                </Box>
                <Box mx="auto">
                    <Box w="50px" bg="var(--box-secondary)" border="1px solid var(--box_border)" p="10px 10px" borderRadius="10px" textAlign="center" className={styles["fontSize"]}>{minutes}</Box>
                    <Text align="center" mt="10px" color="var(--text-grey)" fontSize="10px">Min</Text>
                </Box>
                <Box mx="auto">
                    <Box w="50px" bg="var(--box-secondary)" border="1px solid var(--box_border)" p="10px 10px" borderRadius="10px" textAlign="center" className={styles["fontSize"]}>{seconds}</Box>
                    <Text align="center" mt="10px" color="var(--text-grey)" fontSize="10px">Sec</Text>
                </Box>
            </Flex>
            <Flex w="90%" color="var(--text-grey)" align="center" mt="10px" mx="auto" p="10px">
                <Text mr="20px" fontSize={["13px","13px","15px","15px"]}>Burn</Text>
                <Flex  ml="auto" maxWidth={["260px","500px","500px","260px"]} w='100%' align="center" p={["5px","5px","8px","8px"]} borderRadius="10px" bg="var(--box-secondary)" border="1px solid var(--box_border)">
                    <Input fontSize={["13px","13px","15px","15px"]} value={amountBurn} placeholder="330" type="number" textAlign="end" mr={["5px","5px","10px","10px"]} onChange={(e) => {setAmountBurn(e.target.value)}}/>
                    <Text mr={["5px","5px","10px","10px"]} fontSize={["13px","13px","15px","15px"]}>MOBL</Text>
                    <Image src="/fullicon.png" boxSize="18px" borderRadius="full"/>
                </Flex>
            </Flex>
            <Box mx="auto"><ArrowDownIcon color="var(--text-grey)"/></Box>
            <Flex color="var(--text-grey)" w="90%" align="center" mt="0px" mx="auto" p="10px" >
                <Text mr="20px" w="35px" fontSize={["13px","13px","15px","15px"]}>Get</Text>
                <Flex ml="auto" maxWidth={["260px","500px","500px","260px"]} w='100%' align="center" p={["5px","5px","8px","8px"]} borderRadius="10px" bg="var(--box-secondary)" border="1px solid var(--box_border)">
                    <Input fontSize={["13px","13px","15px","15px"]} value={amountBurn * token.taux} type="number" placeholder="330" textAlign="end" mr={["5px","5px","10px","10px"]}/>
                    <Text mr={["5px","5px","10px","10px"]} fontSize={["13px","13px","15px","15px"]}>{token.symbol}</Text>
                    <Image src={token.logo} boxSize="18px" borderRadius="full"/>
                </Flex>
            </Flex>
            <Flex w="90%" align="center" mt="10px" mx="auto" p="5px">
                <Button py="12px" w="100%" fontSize={["13px","13px","15px","15px"]} border="1px solid var(--box_border_active)" bg="var(--elections)" color="white" borderRadius="8px">Approve Mobula</Button>
            </Flex>
        </Flex>
    )

}