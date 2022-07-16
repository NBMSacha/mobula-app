import { Grid, GridItem } from '@chakra-ui/react'
import { Text, Heading, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image } from '@chakra-ui/react'
import Rank from "./Rank"
import RankTitle from "./RankTitle"

export default function RankStats() {
    return (
        <GridItem rowStart={1} colSpan={3} rowSpan={2} >
            <Flex h="40px" bg='rgba(41, 44, 56, 0.3)' borderRadius="12px 12px 0px 0px">
                <RankTitle title={"Rank 1"} />
                <RankTitle title={"Rank 2"} />
            </Flex>
            <Flex h="85%" bg="var(--bg-governance-box)" borderRadius="0px 0px 12px 12px">
                <Rank />
                <Rank />
            </Flex>
        </GridItem>
    )
}