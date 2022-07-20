import { Flex, Text } from "@chakra-ui/react"
import {
    Tbody,
    Tr,
    Td,
  } from "@chakra-ui/react"
import { ArrowUpIcon } from "@chakra-ui/icons"

export default function Line() {

    return(

                        <Tbody>
                            <Tr>
                                    {/*@ts-ignore */}
                                <Td textAlign="center !important" fontSize={["8px", "8px", "11px", "15px"]} p={["10px 5px","10px 5px","10px 20px","20px 30px"]} borderBottom="1px solid var(--box_border) !important" isNumeric>1.</Td>
                                <Td fontSize={["8px", "8px", "11px", "15px"]} p={["10px 5px","10px 5px","10px 20px","20px 30px"]} borderBottom="1px solid var(--box_border) !important" isNumeric color="var(--text-grey)">0xEF8fD...960C1</Td>
                                <Td fontSize={["8px", "8px", "11px", "15px"]} p={["10px 5px","10px 5px","10px 20px","20px 30px"]} borderBottom="1px solid var(--box_border) !important" isNumeric color="var(--text-grey)">27777 ETH</Td>
                                <Td fontSize={["8px", "8px", "11px", "15px"]} p={["10px 5px","10px 5px","10px 20px","20px 30px"]} borderBottom="1px solid var(--box_border) !important" isNumeric>
                                    <Flex  w="100%" justify="end">
                                        <ArrowUpIcon mr="10px" boxSize={["12px","12px","18px","18px"]} color="green"/>
                                        <Text color="var(--text-grey)">7.75%</Text>
                                    </Flex>
                                </Td>
                            </Tr>
                        </Tbody>

    )
}