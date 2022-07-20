import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from "@chakra-ui/react"
import { Text, Flex, Box, Button, Image } from "@chakra-ui/react"
export default function Main({tokens,isParticipated, setIsParticipated, setDisplay, display, airdropPage, setAirdropPage}) {
    return (
        <>
        <Text mx="auto" w="90%" mt="28px" fontSize={["13px","13px","32px","32px"]} mb="15px">Live Mobula <Box as="span" fontWeight="700">Exclusive</Box> Crypto Airdrops</Text>
        <Text mx="auto" w="90%" mb="28px" fontSize={["10px","10px","18px","18px"]} color="var(--text-grey)">Listed below are all the current live exclusive crypto airdrops, including<br />cryptocurrencies, tokens and other cryptoassets.</Text>
        <Flex direction="column" bg="var(--bg-governance-box)"  borderRadius="15px" boxShadow="1px 2px 13px 3px var(--shadow)" mx="auto" w={["95%","95%","90%","90%"]} p={["20px 0px","20px 0px","30px 0px","30px 0px"]} >
            <Flex w="95%" pb="20px" mx="auto" borderBottom="1px solid var(--box_border) !important">
                <Button boxShadow="1px 2px 13px 3px var(--shadow)" onClick={()=> setDisplay("Ongoing")} _focus={{boxShadow:"none"}} fontSize={["10px","10px","15px","15px"]} borderRadius="5px" ml="2%" px={["10px","10px","20px","20px"]} py={["5px","5px","10px","10px"]} mr="10px" color={display === "Ongoing" ? "white" : "none"} bg={[display === "Ongoing" ? "var(--elections)" : "var(--box-secondary)"]}>Ongoing</Button>
                <Button boxShadow="1px 2px 13px 3px var(--shadow)" onClick={()=> setDisplay("Ended")} _focus={{boxShadow:"none"}} fontSize={["10px","10px","15px","15px"]} borderRadius="5px" px={["10px","10px","20px","20px"]} py={["5px","5px","10px","10px"]} mr="10px" color={display === "Ended" ? "white" : "none"} bg={[display === "Ended" ? "var(--elections)" : "var(--box-secondary)"]}>Ended</Button>
                <Button boxShadow="1px 2px 13px 3px var(--shadow)" onClick={()=> setDisplay("Participated")} _focus={{boxShadow:"none"}} fontSize={["10px","10px","15px","15px"]} borderRadius="5px" px={["10px","10px","20px","20px"]} py={["5px","5px","10px","10px"]} mr="10px" color={display === "Participated" ? "white" : "none"} bg={[display === "Participated" ? "var(--elections)" : "var(--box-secondary)"]}>Participated</Button>
            </Flex>
            <TableContainer w="90%" mx="auto" mt={["10px","10px","20px","20px"]}>
                <Table fontSize={["10px","10px","15px","15px"]} variant="simple">
                    <Thead borderBottom="2px solid none !important">
                        <Tr borderBottom="none !important">
                            <Th p={["8px 8px","8px 8px","",""]} fontWeight={["400","400","500", "600"]} borderBottom="none !important" fontSize={["10px","10px","15px","15px"]}  textTransform="capitalize">Project</Th>
                            <Th  p={["8px 8px","8px 8px","",""]} fontWeight={["400","400","500", "600"]} borderBottom="none !important" fontSize={["10px","10px","15px","15px"]} isNumeric  textTransform="capitalize">Participated</Th>
                            <Th p={["8px 8px","8px 8px","",""]} fontWeight={["400","400","500", "600"]} borderBottom="none !important" fontSize={["10px","10px","15px","15px"]} isNumeric  textTransform="capitalize">Winners</Th>
                            <Th p={["8px 8px","8px 8px","",""]} fontWeight={["400","400","500", "600"]} borderBottom="none !important" fontSize={["10px","10px","15px","15px"]} isNumeric  textTransform="capitalize">Ammount</Th>
                            <Th p={["8px 8px","8px 8px","",""]} fontWeight={["400","400","500", "600"]} borderBottom="none !important" fontSize={["10px","10px","15px","15px"]} textAlign="end" textTransform="capitalize">Time</Th>
                        </Tr>
                    </Thead>
                    {display === "Ended" ? (
                    
                    <>
                        {tokens.filter(token => Date.now() > token.end).map((token:any) => {
                            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                            let now = new Date().getTime();
                            let timeLeft = now - token.end 
                            var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

                            const date = new Date(token.end)
                            var day = date.getDate()
                            var year = date.getFullYear()
                            var month = months[date.getMonth()]

                            return <Tbody borderBottom="1px solid var(--box_border) !important">
                            <Tr>
                                <Td  p={["8px 2px","8px 2px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]}>
                                    <Flex align={["start","start","center","center"]} justify={["center","center","start","start"]} direction={["column", "column","row","row"]}> 
                                        <Image borderRadius="full" mr={["0px","0px","15px","15px"]} mb={["5px","5px","0px","0px"]} src={token.logo} boxSize={["20px","20px","30px","30px"]} />
                                        <Text color="var(--text-grey)"  fontSize={["10px","10px","15px","15px"]} whiteSpace="pre-wrap">{token.name}</Text>
                                    </Flex>
                                </Td>
                                <Td p={["8px 8px","8px 8px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric >{token.participated}</Td>
                                <Td p={["8px 8px","8px 8px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric color="green">{token.winners}</Td>
                                <Td p={["8px 8px","8px 8px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric>{token.amount}</Td>
                                <Td p={["8px 8px","8px 8px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]}>
                                    <Flex direction="column" align="end">
                                        <Text fontWeight="500" fontSize={["10px","10px","15px","15px"]} >
                                            {"Ended " + days + " ago" }
                                        </Text>
                                        <Text fontWeight="400" fontSize={["8px","8px","12px","12px"]}>{month + " " + day  + ", " + year}</Text>
                                    </Flex>
                                </Td>
                            </Tr>
                            </Tbody>
                            })}
                        </>
                  ) : (
                    <>
                        
                    {tokens.filter(token => Date.now() > token.start && Date.now() < token.end).map((token:any) => {
                        
                        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                        let now = new Date().getTime();
                        let timeLeft = token.end - now
                        var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                        const date = new Date(token.end)
                        var day = date.getDate() 
                        var year = date.getFullYear()
                        var month = months[date.getMonth()]

                       return <Tbody borderBottom="1px solid var(--box_border) !important">
                                <Tr>
                                    <Td maxWidth="95px" w="200px" p={["8px 2px","8px 2px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]}>
                                        <Flex align={["start","start","center","center"]} justify={["center","center","start","start"]} direction={["column", "column","row","row"]}> 
                                            <Image borderRadius="full" mr={["0px","0px","15px","15px"]} mb={["5px","5px","0px","0px"]} src={token.logo} boxSize={["20px","20px","30px","30px"]} />
                                            <Text color="var(--text-grey)"  fontSize={["10px","10px","15px","15px"]} whiteSpace="pre-wrap">{token.name}</Text>
                                        </Flex>
                                    </Td>
                                    <Td p={["8px 8px","8px 8px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric >{token.participated}</Td>
                                    <Td p={["8px 8px","8px 8px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric color="green">{token.winners}</Td>
                                    <Td p={["8px 8px","8px 8px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric>{token.amount}</Td>
                                    <Td p={["8px 8px","8px 8px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]}>
                                        <Flex direction="column" align="end">
                                            <Text fontWeight="500" fontSize={["10px","10px","15px","15px"]} >
                                                {days + " " + "days left"}
                                            </Text>
                                            <Text fontWeight="400" fontSize={["8px","8px","12px","12px"]}>{month + " " + day  + ", " + year}</Text>
                                        </Flex>
                                    </Td>
                                </Tr>
                            </Tbody>
                  
                    })}
                 </>
                )}
                </Table>
            </TableContainer>
            <Text w="95%" pb="0px" mx="auto" mb={["20px","20px","20px","20px"]} mt={["20px","20px","40px","40px"]} ml={["20px","20px","50px","50px"]} fontSize={["12px","12px","20px","20px"]}>New Airdrops <Box as="span" fontWeight="700">coming soon</Box></Text>
            <TableContainer w="90%" mx="auto">
                <Table fontSize={["10px","10px","15px","15px"]} variant="simple" mt={["-0px","-0px","0px","0px"]}>
                    <Thead borderTop="0px solid var(--box_border) !important" >
                    <Tr borderBottom="none !important">
                            <Th  p={["8px 8px","8px 8px","",""]}  fontWeight={["400","400","500", "600"]} borderBottom="none !important" fontSize={["10px","10px","15px","15px"]}  textTransform="capitalize">Project</Th>
                            <Th textAlign={["start","start","end","end"]}  display={["none","none","block","block"]} p={["8px 8px","8px 8px","",""]} fontWeight={["400","400","500", "600"]} borderBottom="none !important" fontSize={["10px","10px","15px","15px"]} isNumeric  textTransform="capitalize">Participated</Th>
                            <Th p={["8px 8px","8px 8px","",""]} fontWeight={["400","400","500", "600"]} borderBottom="none !important" fontSize={["10px","10px","15px","15px"]} isNumeric  textTransform="capitalize">Winners</Th>
                            <Th p={["8px 8px","8px 8px","",""]} fontWeight={["400","400","500", "600"]} borderBottom="none !important" fontSize={["10px","10px","15px","15px"]} isNumeric  textTransform="capitalize">Ammount</Th>
                            <Th p={["8px 8px","8px 8px","",""]} fontWeight={["400","400","500", "600"]} borderBottom="none !important" fontSize={["10px","10px","15px","15px"]} textAlign="end" textTransform="capitalize">Time</Th>
                        </Tr>
                    </Thead>
                        {tokens.filter(token => Date.now() < token.start).map((token:any) => {

                            let now = new Date().getTime();
                            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                            const timeAvaible = token.start - now;
                            var days = Math.floor(timeAvaible / (1000 * 60 * 60 * 24));
                            const date = new Date(token.start)
                            var day = date.getDate() 
                            var year = date.getFullYear()
                            var month = months[date.getMonth()]

                            return  <Tbody borderBottom="1px solid var(--box_border) !important">
                                    <Tr>
                                        <Td p={["8px 8px","8px 8px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]}>
                                            <Flex  align={["start","start","center","center"]} justify={["center","center","start","start"]} direction={["column", "column","row","row"]}> 
                                                <Image borderRadius="full" mr={["0px","0px","15px","15px"]} mb={["5px","5px","0px","0px"]} src={token.logo} boxSize={["20px","20px","30px","30px"]} />
                                                <Text color="var(--text-grey)"  fontSize={["10px","10px","15px","15px"]}>{token.name}</Text>
                                            </Flex>
                                        </Td>
                                        <Td p={["0px 0px","0px 0px","",""]} display={["none","none","table-cell","table-cell"]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} w={["100px","100px","110px","110px"]}>
                                            <Button ml="auto" _focus={{boxShadow: "none" }} bg="var(--background)" p={["5px 10px","5px 10px","10px 20px","10px 20px"]} fontSize={["8px","8px","12px","12px"]} border={isParticipated ? "1px solid var(--green)" : "none"} color={isParticipated ? "green" : "none"} onClick={() => setIsParticipated(!isParticipated)}>{isParticipated ? "Involved" : "Participated"}</Button>
                                        </Td>
                                        <Td p={["8px 8px","8px 8px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric color="green">{token.winners}</Td>
                                        <Td p={["8px 8x","8px 8px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]} isNumeric>{token.amount}</Td>
                                        <Td p={["8px 8px","8px 8px","",""]} borderBottom="1px solid var(--box_border) !important" fontSize={["10px","10px","15px","15px"]}>
                                            <Flex direction="column" align="end" w="auto" maxWidth="100px" ml="auto">
                                                <Text fontWeight="500" fontSize={["10px","10px","15px","15px"]}>{days ? "Avaible in " + days + " days" : "Avaible now"}</Text>
                                                <Text fontWeight="400" fontSize={["8px","8px","12px","12px"]} whiteSpace="pre-wrap" wordBreak="break-all">{month + " " + day  + ", " + year}</Text>
                                            </Flex>
                                        </Td>
                                    </Tr>
                            </Tbody>
                    })}
                </Table>
            </TableContainer>
        </Flex>
        <Flex mt={["10px","10px","20px","20px"]} mb={["50px","50px","100px","100px"]} direction="column" bg="var(--bg-governance-box)"  borderRadius="15px" boxShadow="1px 2px 13px 3px var(--shadow)" mx="auto" w={["95%","95%","90%","90%"]} p={["20px 20px","20px 20px","30px 30px","30px 30px"]}>
            <Text fontSize={["13px","13px","23px","23px"]} mb={["5px","5px","10px","10px"]}>Looking to earn more ?</Text>
            <Text fontSize={["10px","10px","16px","16px"]} color="var(--text-grey)">Discover our earning page</Text>
        </Flex>
        </>
    )
}