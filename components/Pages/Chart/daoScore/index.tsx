import React from 'react';
import { Flex, Image, Button, Text, useColorModeValue, Box } from '@chakra-ui/react';
import { useRouter } from "next/router";
import { Tbody, Tr, Td } from '@chakra-ui/react';
import styles from "../Charts.module.scss"
import { getTokenPrice, getTokenPercentage, getUrlFromName } from '../../../../helpers/formaters';
import { TriangleUpIcon } from '@chakra-ui/icons';

function daoScore({baseAsset}) {

    return (
        <>
              {/* DAO SCORE */}
              {baseAsset.utility_score +
                baseAsset.social_score +
                baseAsset.market_score +
                baseAsset.trust_score !== 0 ? (

                <>
                  <Flex mt={["0px", "0px", "0px", "14px"]}>
                    <Flex align="center" display={["none", "none", "none", "flex"]} mr="150px">
                      <Text fontSize="14px" >DAO Score : <span style={{ color: '#3861FB', marginLeft: "14px" }} > {baseAsset.utility_score +
                        baseAsset.social_score +
                        baseAsset.market_score +
                        baseAsset.trust_score} /20</span></Text>
                    </Flex>


                    <Flex align="center" display={["none", "none", "none", "flex"]}>
                      <Flex fontSize="14px" w="120px" display="flex" justifyContent="space-between" mr="20px">Market :
                        <Text color={baseAsset.market_score >= 4 ? 'green' : baseAsset.market_score <= 2 ? "red" : "none"}> {baseAsset.market_score}/5</Text>
                      </Flex>
                      <Flex fontSize="14px" w="120px" display="flex" justifyContent="space-between" >Reliability :
                        <Text color={baseAsset.trust_score >= 4 ? 'green' : baseAsset.trust_score <= 2 ? "red" : "none"} ml="20px">{baseAsset.trust_score}/5</Text>
                      </Flex>
                      <Flex fontSize="14px" w="120px" display="flex" justifyContent="space-between" ml="20px" mr="20px">Activity :
                        <Text color={baseAsset.social_score >= 4 ? 'green' : baseAsset.social_score <= 2 ? "red" : "none"} >{baseAsset.social_score}/5</Text>
                      </Flex>
                      <Flex fontSize="14px" w="120px" display="flex" justifyContent="space-between">Utility :
                        <Text color={baseAsset.utility_score >= 4 ? 'green' : baseAsset.utility_score <= 2 ? "red" : "none"} ml="20px">{baseAsset.utility_score}/5</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </>

              ) : (
             
                  <Flex mt="10px">
                    <Flex align="center" display={["none", "none", "none", "flex"]} mt="20px">
                      <Text fontSize="14px" marginRight="120px">DAO Score : <span style={{ color: '#3861FB', marginLeft: "14px" }} > --/20</span></Text>
                    </Flex>
                    <Flex align="center" display={["none", "none", "none", "flex"]} mt="20px" >
                      <Flex fontSize="14px" w="128px" display="flex" justifyContent="space-between" mr="20px">Market :
                        <Text color={baseAsset.market_score >= 4 ? 'green' : baseAsset.market_score <= 2 ? "red" : "none"}>-- /5</Text>
                      </Flex>
                      <Flex fontSize="14px" w="128px" display="flex" justifyContent="space-between" >Reliability :
                        <Text color={baseAsset.trust_score >= 4 ? 'green' : baseAsset.trust_score <= 2 ? "red" : "none"} ml="20px">-- /5</Text>
                      </Flex>
                      <Flex fontSize="14px" w="128px" display="flex" justifyContent="space-between" ml="20px" mr="20px">Activity :
                        <Text color={baseAsset.social_score >= 4 ? 'green' : baseAsset.social_score <= 2 ? "red" : "none"} >-- /5</Text>
                      </Flex>
                      <Flex fontSize="14px" w="128px" display="flex" justifyContent="space-between">Utility :
                        <Text color={baseAsset.utility_score >= 4 ? 'green' : baseAsset.utility_score <= 2 ? "red" : "none"} ml="20px">-- /5</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                
              )}
</>
        )
}

export default daoScore;