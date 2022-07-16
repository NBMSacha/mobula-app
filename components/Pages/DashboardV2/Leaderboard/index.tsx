import { Grid, GridItem } from '@chakra-ui/react'
import { Text, Heading, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image, Input} from '@chakra-ui/react'
import Title from "../Title"
import { useState } from "react"
import Buttons from "../History/Buttons"
import Line from "./Line"

export default function Leaderboard() {

    return (
        <GridItem rowStart={3} colStart={4} colSpan={2} rowSpan={4}>
            <Title title={"Leaderboard"} />
            <Flex h="542px" w='100%' direction="column" p="30px 30px" bg="var(--bg-governance-box)" borderRadius="0px 0px 12px 12px">
                <Flex align="center" mb="20px">
                    <Button fontSize="12px" py="6px" mr="35px" _focus={{ boxShadow: "none" }}
                            borderRadius="8px" w="105px" bg={"var(--elections)"} fontWeight="300"
                    >
                        Your Rank #5
                    </Button>
                    <Text fontSize="10px" mr="35px" color="green">68 Good decisions</Text>
                    <Text fontSize="10px" color="red">2 Bad decisions</Text>
                </Flex>
                <Box h="450px" overflowY="scroll" className="scroll">
                    <Line />
                    <Line />
                    <Line />
                    <Line />
                    <Line />
                    <Line />
                    <Line />
                    <Line />
                </Box>
            </Flex>
        </GridItem>
    )
}