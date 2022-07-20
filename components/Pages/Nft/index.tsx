import React, { useState } from "react";
import { Heading, Text, Flex, Box, Grid, GridItem, Image, Button } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
  import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"

function NFT() {
    
    const [ showMore, setShowMore ] = useState(false)

    return (
        <Flex direction="column" maxWidth="1500px" mx="auto">
            <Flex w="90%" mt="28px" mx="auto">
                <Text fontSize="24px" fontWeight="700">NFT Floor Prices</Text> 
            </Flex>
            
            <Grid h="1100" mt="28px" mx="auto" w="90%" templateRows="repeat(15, 1fr)" templateColumns={["repeat(6, 1fr)"]} gap={4}>
                <GridItem  rowStart={1} colSpan={2} rowSpan={2} bg="var(--bg-governance-box)" borderRadius="12px">
                    <Flex align="center" justify="space-around" h="100%">
                        <Flex>
                            <Image boxSize="48px" mr="15px" src="/fullicon.png"/>
                            <Box>
                                <Text fontSize="18px">Gorrilaz Club</Text>
                                <Text fontSize="11px">@MobulaFi</Text>
                            </Box>
                        </Flex>
                        <Image ml="40px" w="85px" h="35px" src="/sparkline.png"/>
                    </Flex>
                </GridItem>
                <GridItem  rowStart={1} colSpan={2} colStart={3} rowSpan={2} bg="var(--bg-governance-box)" borderRadius="12px">
                    <Flex align="center" justify="space-around" h="100%">
                        <Flex>
                            <Image boxSize="48px" mr="15px" src="/fullicon.png"/>
                            <Box>
                                <Text fontSize="18px">Gorrilaz Club</Text>
                                <Text fontSize="11px">@MobulaFi</Text>
                            </Box>
                        </Flex>
                        <Image ml="40px" w="85px" h="35px" src="/sparkline.png"/>
                    </Flex>
                </GridItem>
                <GridItem  rowStart={1} colSpan={2} colStart={5} rowSpan={2} bg="var(--bg-governance-box)" borderRadius="12px">
                    <Flex align="center" justify="space-around" h="100%">
                        <Flex>
                            <Image boxSize="48px" mr="15px" src="/fullicon.png"/>
                            <Box>
                                <Text fontSize="18px">Gorrilaz Club</Text>
                                <Text fontSize="11px">@MobulaFi</Text>
                            </Box>
                        </Flex>
                        <Image ml="40px" w="85px" h="35px" src="/sparkline.png"/>
                    </Flex>
                </GridItem>
                <GridItem  rowStart={3} colSpan={6} colStart={1} rowSpan={8} bg="var(--bg-governance-box)" borderRadius="12px" p="15px 25px">
                    <TableContainer maxHeight="550px"  overflowY="hidden">
                        <Table variant='simple' >
                            <Thead>
                                <Tr>
                                    <Th textTransform="capitalize">Collection</Th>
                                    <Th textTransform="capitalize" isNumeric>Volume</Th>
                                    <Th textTransform="capitalize" isNumeric>24h %</Th>
                                    <Th textTransform="capitalize" isNumeric>Marketcap</Th>
                                    <Th textTransform="capitalize" isNumeric>Owners</Th>
                                    <Th textTransform="capitalize" isNumeric>Items</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>
                                        <Flex align="center"  py="6px">
                                            <Image boxSize="48px" src="/fullicon.png" mr="10px" />
                                            <Box>
                                                <Text fontSize="16px">Cool Cyber Apes</Text>
                                                <Text color="var(--text-grey)" fontSize="12px">@cybasseman</Text>
                                            </Box>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Flex align="center" justify="end">
                                            <Image src="/fullicon.png" mr="10px" boxSize="18px" />
                                            <Text fontSize="14px" color="var(--text-grey)">22.523 ETH</Text>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Flex align="center" justify="end">
                                            <Image src="/sparkline.png" h="25px" w="85px" mr="10px"/>
                                            <Text color="green" fontSize="14px">+25%</Text>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">50.500.000</Text>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">12.500</Text>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">20.000</Text>
                                    </Td>
                                </Tr>
                            </Tbody>
                            <Tbody>
                                <Tr>
                                    <Td>
                                        <Flex align="center"  py="10px">
                                            <Image boxSize="48px" src="/fullicon.png" mr="10px" />
                                            <Box>
                                                <Text fontSize="16px">Cool Cyber Apes</Text>
                                                <Text color="var(--text-grey)" fontSize="12px">@cybasseman</Text>
                                            </Box>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Flex align="center" justify="end">
                                            <Image src="/fullicon.png" mr="10px" boxSize="18px" />
                                            <Text fontSize="14px" color="var(--text-grey)">22.523 ETH</Text>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Flex align="center" justify="end">
                                            <Image src="/sparkline.png" h="25px" w="85px" mr="10px"/>
                                            <Text color="green" fontSize="14px">+25%</Text>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">50.500.000</Text>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">12.500</Text>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">20.000</Text>
                                    </Td>
                                </Tr>
                            </Tbody>
                            <Tbody>
                                <Tr>
                                    <Td>
                                        <Flex align="center"  py="10px">
                                            <Image boxSize="48px" src="/fullicon.png" mr="10px" />
                                            <Box>
                                                <Text fontSize="16px">Cool Cyber Apes</Text>
                                                <Text color="var(--text-grey)" fontSize="12px">@cybasseman</Text>
                                            </Box>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Flex align="center" justify="end">
                                            <Image src="/fullicon.png" mr="10px" boxSize="18px" />
                                            <Text fontSize="14px" color="var(--text-grey)">22.523 ETH</Text>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Flex align="center" justify="end">
                                            <Image src="/sparkline.png" h="25px" w="85px" mr="10px"/>
                                            <Text color="green" fontSize="14px">+25%</Text>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">50.500.000</Text>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">12.500</Text>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">20.000</Text>
                                    </Td>
                                </Tr>
                            </Tbody>
                            <Tbody>
                                <Tr>
                                    <Td>
                                        <Flex align="center"  py="10px">
                                            <Image boxSize="48px" src="/fullicon.png" mr="10px" />
                                            <Box>
                                                <Text fontSize="16px">Cool Cyber Apes</Text>
                                                <Text color="var(--text-grey)" fontSize="12px">@cybasseman</Text>
                                            </Box>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Flex align="center" justify="end">
                                            <Image src="/fullicon.png" mr="10px" boxSize="18px" />
                                            <Text fontSize="14px" color="var(--text-grey)">22.523 ETH</Text>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Flex align="center" justify="end">
                                            <Image src="/sparkline.png" h="25px" w="85px" mr="10px"/>
                                            <Text color="green" fontSize="14px">+25%</Text>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">50.500.000</Text>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">12.500</Text>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">20.000</Text>
                                    </Td>
                                </Tr>
                            </Tbody>
                            <Tbody>
                                <Tr>
                                    <Td>
                                        <Flex align="center"  py="10px">
                                            <Image boxSize="48px" src="/fullicon.png" mr="10px" />
                                            <Box>
                                                <Text fontSize="16px">Cool Cyber Apes</Text>
                                                <Text color="var(--text-grey)" fontSize="12px">@cybasseman</Text>
                                            </Box>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Flex align="center" justify="end">
                                            <Image src="/fullicon.png" mr="10px" boxSize="18px" />
                                            <Text fontSize="14px" color="var(--text-grey)">22.523 ETH</Text>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Flex align="center" justify="end">
                                            <Image src="/sparkline.png" h="25px" w="85px" mr="10px"/>
                                            <Text color="green" fontSize="14px">+25%</Text>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">50.500.000</Text>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">12.500</Text>
                                    </Td>
                                    <Td isNumeric>
                                        <Text color="var(--text-grey)" fontSize="14px">20.000</Text>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </GridItem>
                <GridItem  rowStart={11} colSpan={6} colStart={1} rowSpan={showMore ? 4 : 1} bg="var(--bg-governance-box)" borderRadius="12px">
                    <Flex align="center" direction="column" h="100%" px="40px" justify="center">
                        <Flex align="center" justify="space-between" w="100%">
                            <Text fontSize="20px" pt={showMore ? "0px" : "0px"}>What Are NFTs</Text>
                            <Button onClick={() => { setShowMore(!showMore)}} _focus={{ boxShadow: "none" }}>
                                {showMore ? (
                                    <ChevronUpIcon  boxSize="30px" />
                                ) : (
                                    <ChevronDownIcon  boxSize="30px" /> 
                                )}
                            </Button>
                        </Flex>
                        {showMore && (
                            <>
                                <Text color="var(--text-grey)" fontSize="12px" mt="20px">
                                    A non-fungible token (NFT) is a digital asset or a unique identifier that assigns, links, or proves ownership
                                    of unique physical and digital goods. These goods can be anything ranging from artwork, music, digital real estate, or videos.
                                </Text>
                                <Text color="var(--text-grey)" fontSize="12px" mt="20px" w="100%">In simple terms, NFTs are unique crypto tokens managed on a blockchain and they can be considered as modern-day collectibles.
                                </Text>
                                <Text color="var(--text-grey)" fontSize="12px" mt="20px">
                                    Each NFT is coded with a unique ID and other metadata that are impossible to replicate on other tokens. The blockchain acts as
                                    a decentralized ledger that is used to track the transaction history and ownership of the NFT, and this makes it difficult to be counterfeited or altered.
                                </Text>
                                <Text color="var(--text-grey)" fontSize="12px" mt="20px" mb="20px">
                                    Any digital object can become an NFT and anyone can make an NFT. To convert a digital object to an NFT, you just need to mint or put the object on
                                    the blockchain as a token and put the digital artwork for sale. NFT creators can choose to attach a commission to the file and get paid for every sale or resale of the file.
                                </Text>
                            </>
                        )}
                    </Flex>
                </GridItem>
            </Grid>
        </Flex>
    )
}

export default NFT;
