import React, { useEffect, useState, useRef } from 'react'
import { extendTheme, Flex, Box, Text, Spacer, Image, Button, Grid, GridItem} from '@chakra-ui/react';
import styles from "./Api.module.scss"
import {Pocket} from "react-feather";
const Api = () => {

     const volume = "Volume";
     const rank = "Rank";
     const liquidity = "Liquidity";
     const holders = "Holders";
    
    return (   
        <Flex w="100%" direction="column" align="center">
            <Box w="75%" mt="60">
                <Box color="white" className={styles["main-title"]} fontWeight="600" textAlign="center" >More detailled, more taster by <span className={styles["span"]}>+330%</span><Spacer />than CoinMarketCap API</Box>
                <Text color="#ffffff4d" className={styles["main-subtitle"]} textAlign="center" mt="35">The world's cryptocurrency Decentralized data aggregator<Spacer /> has two professional API made for you.</Text>
            </Box>
            <Flex  w="75%" mt="30" color="white" className={styles["apis-box"]}>
                <Box className={styles["left-box"]} justify="center">
                    <Text textAlign="center" color="white" fontWeight="600" className={styles["static-title"]}>Static API</Text>
                    <Flex align="center" mt="40" justify="center">
                        <Pocket />
                        <Text  ml="10" my="0" color="white" className={styles["apis-text"]} fontWeight="500">Lorem ipsum dolor sit</Text>
                    </Flex> 
                    <Flex align="center" mt="40" justify="center">
                        <Pocket />
                        <Text  ml="10" my="0" color="white" className={styles["apis-text"]} fontWeight="500">Lorem ipsum dolor sit</Text>
                    </Flex>   
                    <Flex align="center" mt="40" justify="center">
                        <Pocket />
                        <Text  ml="10" my="0" color="white" className={styles["apis-text"]} fontWeight="500">Lorem ipsum dolor sit</Text>
                    </Flex>   
                    <Flex align="center" mt="40" justify="center">
                        <Pocket />
                        <Text  ml="10" my="0" color="white" className={styles["apis-text"]} fontWeight="500">Lorem ipsum dolor sit</Text>
                    </Flex>  
                    
                </Box>    
                <Box mb="70" className={styles["right-box"]} justify="center">
                    <Text textAlign="center" color="white"  fontWeight="600" className={styles["dynamic-title"]}>Dynamic API</Text>
                    <Flex align="center" mt="40" justify="center">
                        <Pocket className={styles["apis-text"]}/>
                        <Text  ml="10" my="0" color="white" fontWeight="500" className={styles["apis-text"]}>Lorem ipsum dolor sit</Text>
                    </Flex> 
                    <Flex align="center" mt="40" justify="center">
                        <Pocket className={styles["apis-text"]}/>
                        <Text className={styles["apis-text"]} ml="10" my="0" className={styles["apis-text"]} color="white" fontWeight="500">Lorem ipsum dolor sit</Text>
                    </Flex>   
                    <Flex align="center" mt="40" justify="center">
                        <Pocket className={styles["apis-text"]}/>
                        <Text className={styles["apis-text"]} ml="10" my="0" className={styles["apis-text"]} color="white" fontWeight="500">Lorem ipsum dolor sit</Text>
                    </Flex>   
                    <Flex align="center" mt="40" justify="center">
                        <Pocket className={styles["apis-text"]}/>
                        <Text className={styles["apis-text"]} ml="10" my="0" className={styles["apis-text"]} color="white"  fontWeight="500">Lorem ipsum dolor sit</Text>
                    </Flex>  
                </Box>    
            </Flex>
            <Button bg="linear-gradient(90deg, #003FE1 8.9%, #64D0FF 87.31%)" py="5" px="10" borderRadius="10px" border="none"  color="white" fontFamily="Poppins" className={styles["request-btn"]}>Request API</Button>
            <Text color="#ffffff4d" mt="60" mb="50" className={styles["trust-title"]} px={25}>Trusted by these fine companies and many more</Text>
            <Box width="75%" pb="30" borderBottom="1px solid  #2E3557" > 
                <Flex wrap="wrap" w="100%" className={styles["responsive-margin"]}>
                    <Box bg="#2E3557" borderRadius="15px"  className={styles["grid"]}></Box>
                    <Box bg="#2E3557" borderRadius="15px"  className={styles["grid"]}></Box>
                    <Box bg="#2E3557" borderRadius="15px"  className={styles["grid"]}></Box>
                    <Box bg="#2E3557" borderRadius="15px"  className={styles["grid"]}></Box>
                </Flex>
                <Flex wrap="wrap" w="100%" >
                    <Box bg="#2E3557" borderRadius="15px"  className={styles["grid"]}></Box>
                    <Box bg="#2E3557" borderRadius="15px"  className={styles["grid"]}></Box>
                    <Box bg="#2E3557" borderRadius="15px"  className={styles["grid"]}></Box>
                    <Box bg="#2E3557" borderRadius="15px"  className={styles["grid"]}></Box>
                </Flex>
            </Box>
            <Box width="75%" pb="50" className={styles["customer"]}> 
                <Flex mb="5%" width="100%" className={styles["container-customer"]}>
                    <Flex bg="rgba(5, 5, 27, 0.5)" borderRadius="15px" h="220px" className={styles["customer-box"]} mr="5%"  direction="column"  align="center">
                        <Flex align="center" borderBottom="1px solid  #2E3557" width="90%" py="10" >
                            <Image src="fullicon.png" className={styles["logo-customer"]}/>
                            <Text color="white" >Customer</Text>
                        </Flex>
                        <Box w="90%">
                            <Text color="#ffffff4d" mt="40px" textAlign="center" >Mobula team OP</Text>
                        </Box>
                    </Flex>
                    <Flex bg="rgba(5, 5, 27, 0.5)" borderRadius="15px" h="220px" className={styles["customer-box"]} mr="5%"  direction="column"  align="center">
                        <Flex align="center" borderBottom="1px solid  #2E3557" width="90%" py="10" >
                            <Image src="fullicon.png" className={styles["logo-customer"]}/>
                            <Text color="white" >Customer</Text>
                        </Flex>
                        <Box w="90%">
                            <Text color="#ffffff4d" mt="40px" textAlign="center" >Mobula team OP</Text>
                        </Box>
                    </Flex>
                    <Flex bg="rgba(5, 5, 27, 0.5)" borderRadius="15px" h="220px" className={styles["customer-box"]} mr="5%"  direction="column"  align="center">
                        <Flex align="center" borderBottom="1px solid  #2E3557" width="90%" py="10" >
                            <Image src="fullicon.png" className={styles["logo-customer"]}/>
                            <Text color="white" >Customer</Text>
                        </Flex>
                        <Box w="90%">
                            <Text color="#ffffff4d" mt="40px" textAlign="center" >Mobula team OP</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

        </Flex>
    )
}

export default Api;