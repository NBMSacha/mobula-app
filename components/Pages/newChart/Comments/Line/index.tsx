import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'

export default function Line() {

    return(
        
                <Box borderBottom="1px solid var(--box_border)" py="5px" w="90%" mx="auto">
                    <Text fontSize={["10px" ,"10px" ,"12px" ,"15px" ]}color="#AAE0D6" mb="2px">David Lafarge</Text>
                    <Text fontSize={["8px" ,"8px" ,"10px" ,"12px" ]} color="var(--text-grey)" mb="5px">Hey salut à tous les amis c'est David Lafarge Pokemon</Text>
                </Box>
        
    )
}