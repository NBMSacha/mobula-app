import { ChakraProvider, Input, InputLeftElement, InputGroup, Link, Progress, ProgressLabel, ColorModeProvider, useColorModeValue, Image, Button, Flex, Box, Text } from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
export default function DaoScore({baseAsset, Uvalue, Tvalue, Svalue, Mvalue, totalScore}) {
     return (
        <Flex direction="column" align="start">
        <Text fontWeight="600" mr="auto !important" fontSize="20px" m={["5px 10px","10px 20px 10px 20px","15px 20px 5px 20px","8px"]}>DAO Score</Text>
        <Text fontSize="14px"  m={["0px 10px","0px 25px","5px 25px","10px 10px"]}>Total  <Box ml="5px" as="span" color={totalScore > 10 ? "green" : totalScore > 0 ? "red" : "none"}>{totalScore > 0 ? totalScore : "-"}</Box> /20</Text>
        <Flex direction="column" justify="center" align="start" p="10px ">
            
            <Flex align="center" mt="0px"  w={["100%"]} mx="auto">
                <CircularProgress mr={["5px","15px","15px","15px"]} size="45px" color={baseAsset.utility_score < 3 ? "red" : "green"} value={Uvalue} />
                <Text fontSize="15px"><Box as="span" mr="10px" color="var(--text-grey)">{baseAsset.utility_score > 0 ? baseAsset.utility_score : "-"}/5</Box> Utility</Text>
            </Flex>
            <Flex align="center" mt="15px" w={["100%"]}>
                <CircularProgress mr={["5px","15px","15px","15px"]} size="45px" color={baseAsset.social_score < 3 ? "red" : "green"} value={Svalue} />
                <Text fontSize="15px"><Box as="span"  mr="10px" color="var(--text-grey)">{baseAsset.social_score > 0 ? baseAsset.social_score : "-"}/5</Box> Social</Text>
            </Flex>
            <Flex align="center" mt="15px" w={["100%"]}>
                <CircularProgress mr={["5px","15px","15px","15px"]} size="45px" color={baseAsset.trust_score < 3 ? "red" : "green"}  value={Tvalue} />
                <Text fontSize="15px"><Box as="span"  mr="10px" color="var(--text-grey)">{baseAsset.trust_score > 0 ? baseAsset.trust_score : "-"}/5</Box> Security</Text>
            </Flex>
            <Flex align="center" mt="15px" w={["100%"]}>
                <CircularProgress mr={["5px","15px","15px","15px"]} size="45px" color={baseAsset.market_score < 3 ? "red" : "green"} value={Mvalue} />
                <Text fontSize="15px"><Box as="span"  mr="10px" color="var(--text-grey)">{baseAsset.market_score > 0 ? baseAsset.market_score : "-"}/5</Box> Market</Text>
            </Flex>
        </Flex>
    </Flex>
     )
}