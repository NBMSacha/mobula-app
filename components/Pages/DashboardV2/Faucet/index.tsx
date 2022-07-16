import { Grid, GridItem } from '@chakra-ui/react'
import { Text, Heading, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image } from '@chakra-ui/react'
import TimeBox from "./TimeBox"
import Title from "../Title"
export default function Faucet() {
    return (
        <GridItem rowStart={1} colSpan={2} colStart={4} rowSpan={2}>
            <Title title={'MATIC for DAO'} />
            <Flex h="85%" bg="var(--bg-governance-box)" direction="column" borderRadius="0px 0px 12px 12px" align="center" justify="center">
                <Text fontSize="12px" color="var(--text-grey)" mb="25px">Your next claim is available in</Text>         
                <Flex>
                    <TimeBox time={"Days"} />
                    <TimeBox time={"Hours"} />
                    <TimeBox time={"Minutes"} />
                    <TimeBox time={"Seconds"} />
                </Flex>
                <Flex mt="30px" w="80%" justify="space-around" align="end">
                    <Button fontSize="12px" py="8px" borderRadius="6px" px="25px" bg="var(--elections)" border="2px solid var(--box_border_active)">Claim MOBL</Button>
                    <Text fontSize="12px" color="var(--text-grey)">You already claimed <Box as="span" fontSize="14px" color="var(--text-primary)" >2 MATIC</Box></Text>
                </Flex>
            </Flex>
        </GridItem>
    )
}