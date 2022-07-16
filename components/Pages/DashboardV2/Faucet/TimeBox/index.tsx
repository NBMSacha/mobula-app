import { Grid, GridItem } from '@chakra-ui/react'
import { Text, Heading, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image } from '@chakra-ui/react'

export default function TimeBox({time}) {
    return (

        <Flex direction="column" align="center" justify="center" mr="15px">
            <Flex align="center" justify="center" h="40px" borderRadius="8px" w="60px" border="1px solid var(--box_border)" bg="rgba(41, 44, 56, 0.3)">
                <Text fontSize="12px">13</Text>
            </Flex>
            <Text fontSize="12px" color="var(--text-grey)"  mt="10px">{time}</Text>
        </Flex>
    )
}