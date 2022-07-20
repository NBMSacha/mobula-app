import { Text,Flex, Box, Image } from "@chakra-ui/react"
import {
    Tbody,
    Tr,
    Td,
  } from "@chakra-ui/react"
import {CheckIcon,CloseIcon} from "@chakra-ui/icons"

export default function Tbodys({ index, token ,isActive}) {
        let date = new Date(token.timestamp * 1000);
        let seconds = date.getTime();
        let postedDate = Math.round((Date.now() - seconds) / 1000);
        let format = "";
        if (postedDate < 60) {
          format = "seconds";
        }
        else if (60 <= postedDate && postedDate < 120) {
          format = "minute"
        }
        else if (120 <= postedDate && postedDate < 3600) {
          format = "minutes"
        }
        else if (3600 <= postedDate && postedDate < 7200) {
          format = "hour"
        }
        else if (7200 <= postedDate && postedDate < 86400) {
          format = "hours"
        }
        else if (86400 <= postedDate && postedDate < 172800) {
          format = "day"
        }
        else if (172800 <= postedDate) {
          format = "days"
        }
    return (
                <Tbody>
                    <Tr>
                        <Td borderBottom="1px solid var(--box_border) !important" isNumeric>
                            <Flex align="center">
                                <Image boxSize="23px" src={token.logo} mr="10px"/>
                                <Flex direction={["column", "column","column","row"]} align="start">
                                  <Text fontSize="12px" mr="10px">{token.name}</Text>
                                  <Text fontSize="12px" color="var(--text-grey)">{token.symbol}</Text>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td borderBottom="1px solid var(--box_border) !important" fontSize="12px" color="var(--text-grey)">
                            <Flex justify="end">
                            {format === "seconds" &&  <Box whiteSpace="nowrap" fontSize="12px" bg="red"as="span">{postedDate} seconds ago</Box>}
                            {format === "minute" && <Box whiteSpace="nowrap" fontSize="12px" as="span">{Math.floor(postedDate / 60)} minute ago</Box>}
                            {format === "minutes" &&  <Box whiteSpace="nowrap" fontSize="12px" as="span">{Math.floor(postedDate / 60)} minutes ago</Box>}
                            {format === "hour" &&  <Box whiteSpace="nowrap" fontSize="12px" as="span">{Math.floor(postedDate / 3600)} hour ago</Box>}
                            {format === "hours" &&  <Box whiteSpace="nowrap" fontSize="12px" as="span">{Math.floor(postedDate / 3600)} hours ago</Box>}
                            {format === "day" &&  <Box whiteSpace="nowrap" fontSize="12px" as="span">{Math.floor(postedDate / 86400)} day ago</Box>}
                            {format === "days" &&  <Box whiteSpace="nowrap" fontSize="12px" as="span">{Math.floor(postedDate / 86400)} days ago</Box>}
                            </Flex>
                        </Td>
                        <Td borderBottom="1px solid var(--box_border) !important" isNumeric>
                            <Flex align="center" justify="end">
                                {token.validated && (
                                    <>
                                        <Text fontSize="12px" color="green">{token.votes.filter(vote => vote.validated).length} Validations</Text>
                                        <CheckIcon color="green" ml="10px" boxSize="15px" />
                                    </>
                                )} 
                                {token.validated === false && (
                                    <>
                                        <Text fontSize="12px" color="red">{token.votes.filter(vote => vote.validated).length} Rejections</Text>
                                        <CloseIcon color="red" ml="10px" boxSize="15px" />
                                    </>
                                )}
                            </Flex>
                        </Td>
                    </Tr>
                </Tbody>
    )
}