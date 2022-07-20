import { Flex, Box, Text } from "@chakra-ui/react"
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react"
export default function Cercle() {
    return (
        <Flex align="center" direction={["column","column","column","row"]}>
                            <Text display={["flex","flex","flex","none"]} fontSize="10px" mb={["0px","0px","0px","0px"]}>$12.516.4548</Text>
                            <Text display={["flex","flex","flex","none"]} fontSize="10px" mb={["10px","10px","10px","0px"]}>ATH Holders</Text>
                            {/*@ts-ignore */}
                            <CircularProgress size={["60px","60px","100px","100px"]} value={40} color="grey">
                                <CircularProgressLabel ><Text fontSize={["10px","10px","14px","14px"]}>40%</Text><Box  fontSize={["6px","6px","10px","10px"]} color="var(--text-grey)">From ATH</Box></CircularProgressLabel>
                            </CircularProgress>
                            <Box ml={["0px","0px","0px","25px"]}>
                                <Text fontSize={["12px","12px","14px","16px"]} mt={["10px","10px","10px","0px"]}>$12.516.4548</Text>
                                <Text display={["none", "none", "none", "flex"]} fontSize={["8px","8px","12px","12px"]} color="var(--text-grey)">Lorem lorem lorem</Text>
                            </Box>
                        </Flex>
    )
}