import { Box, Flex } from '@chakra-ui/react'
import Dex from '../components/Utils/Swap'

export default function () {
  return (
    <Flex mb="50vh" w="90%" mr="auto" ml="auto" justify="center" display={["flex"]} mt={["20px", "20px", "20px", "0px"]} >
      <Dex />
    </Flex>
  )
}