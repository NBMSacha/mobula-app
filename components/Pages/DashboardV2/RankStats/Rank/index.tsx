import { Grid, GridItem } from '@chakra-ui/react'
import { Text, Heading, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image } from '@chakra-ui/react'
export default function Rank() {
    return (
        <Flex h="100%" w='50%' align="center" justify="center" direction="column" p="30px 20px">
            <Flex align="center">
                <Flex direction="column" align="center" color="green" mr="25px">
                    <Text fontSize="12px" mb="15px">Correct Decisions</Text>
                    <Flex align="center" justify="center" h="45px" w="85px" bg="#191D2C" borderRadius="10px" >
                        <Text fontSize="15px">34</Text>
                    </Flex>
                </Flex>
                <Box mt="30px">
                    <Image src="/updownarrow.png" />
                </Box>
                <Flex direction="column" align="center" color="red"  ml="25px">
                    <Text fontSize="12px" mb="15px">Wrong Decisions</Text>
                        <Flex align="center" justify="center" h="45px" w="85px" bg="#191D2C" borderRadius="10px" >
                            <Text fontSize="15px">2</Text>
                        </Flex>
                    </Flex>
            </Flex>
            <Text fontSize="12px" color="var(--text-grey)" my="20px">Mobula owes you <Box as="span" fontSize="14px" color="none">30 MOBL</Box></Text>
            <Button fontSize="12px" py="8px" borderRadius="6px" px="25px" bg="var(--elections)" border="2px solid var(--box_border_active)">Claim MOBL</Button>
        </Flex>
    )
}