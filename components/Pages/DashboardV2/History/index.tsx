import { Grid, GridItem } from '@chakra-ui/react'
import { Text, Heading, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image, Input} from '@chakra-ui/react'
import Title from "../Title"
import Buttons from "./Buttons"
import { useState } from "react"
import Search from "./Search"
import Tables from "./Tables"

export default function History() {

    const [ isActive, setIsActive ] = useState("Validated")
    const [ search, setSearch ] = useState('')

    return (
        <GridItem rowStart={3} colSpan={3} rowSpan={4} >
            <Title title={'History'} />
            <Flex h="542px" w='100%' direction="column" p="30px 30px" bg="var(--bg-governance-box)" borderRadius="0px 0px 12px 12px">
                <Flex w="100%">
                    <Buttons title={"Validated"} isActive={isActive} setIsActive={setIsActive} />
                    <Buttons title={"Refused"} isActive={isActive} setIsActive={setIsActive}/>
                    <Buttons title={"My history"} isActive={isActive} setIsActive={setIsActive}/>
                    <Buttons title={"See all history"} isActive={isActive} setIsActive={setIsActive}/>
                    <Search search={search} setSearch={setSearch} />
                </Flex>
                <Tables />
            </Flex>
        </GridItem>
    )
}