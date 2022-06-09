import React from 'react';
import { Flex, Image, Button, Text, useColorModeValue, Box } from '@chakra-ui/react';
import { useRouter } from "next/router";
import { Tbody, Tr, Td } from '@chakra-ui/react';
import styles from "../Charts.module.scss"
import { getTokenFormattedPrice, getTokenPercentage, getUrlFromName } from '../../../../helpers/formaters';
import { TriangleUpIcon } from '@chakra-ui/icons';

function MobileInfo({ baseAsset, shadowColor, setScoreVisible, scoreVisible, mobile, isPriceWinner, daoMobile }) {
  const router = useRouter();
  const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
  const border = useColorModeValue("var(--chakra-colors-grey_border)", "var(--chakra-colors-border_dark_gainer)")
  const hover = useColorModeValue("white", "var(--chakra-colors-dark_inactive_gainer)")

  return (
    <>
      <Flex mb={["", "", "", "-50px"]} direction="column" className={styles['chart-top-token']}>
        <Flex w={["90%", "100%"]} margin="auto" justify={["space-between", "space-between", "space-between", "space-between"]} align="center">
          <Flex w="45%" h="auto" className={styles['chart-left-top']} justify="center" align={["start", "start", "start", "space-around"]} direction="column">
            <Flex mb="8px" align="center" direction="column">
              <Flex>
                <img style={{ marginRight: "10px", borderRadius: "50%" }} src={baseAsset.logo} className={styles['chart-token-logo']} />
                <Flex className={styles['chart-name-box']} w="60vw">
                  <div className={styles['chart-token-name']}>
                    <Text fontSize={["xs", "x-large"]} className={styles["rank-span"]} mr="5px" color="white_grey">#{baseAsset.rank}</Text>
                    <Text fontSize={["md", "x-large"]}>{baseAsset.name}</Text>
                  </div>
                </Flex>
              </Flex>


            </Flex>
            <Flex>
              <Flex w="50vw" align="center" mt="0px" display={["flex", "flex", "flex", "none"]}>
                <Text boxShadow={`1px 2px 12px 3px ${shadowColor}`} borderRadius="6px" p="2px 5px" bg={daoMobile} fontSize="13px">DAO Score <span style={{
                  color: baseAsset.utility_score +
                    baseAsset.social_score +
                    baseAsset.market_score +
                    baseAsset.trust_score !== 0 ? "#5C7DF9" : "#5C7DF9", marginLeft: "20px"
                }}>{baseAsset.utility_score +
                  baseAsset.social_score +
                  baseAsset.market_score +
                  baseAsset.trust_score || '--'} /20</span></Text>
                <Button fontSize="12px" ml="10px" onClick={() => {

                  setScoreVisible(!scoreVisible)
                }
                }>+</Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="column">
            <Flex whiteSpace="nowrap">
              <Text fontWeight="bold" fontSize={["22px", "22px", "22px", "34px"]} color={isPriceWinner === true ? 'green' : isPriceWinner === false ? 'red' : ''} >
                <span style={{ marginLeft: "10px" }}>{getTokenFormattedPrice(baseAsset.price, '$', { justify: 'right', marginTop: null })}</span></Text>
              {!mobile ? <Flex fontWeight="bold" align="center" ml="10px" color={getTokenPercentage(baseAsset.price_change_24h) > 0 ? "green" : "red"}>
                <Box className={getTokenPercentage(baseAsset.price_change_24h) > 0 ? styles['triangle-green'] : styles['triangle-red']}></Box>
                {getTokenPercentage(baseAsset.price_change_24h)}%
              </Flex> : <></>}
            </Flex>
            {mobile ? <Flex fontWeight="bold" align="center" ml="10px" color={getTokenPercentage(baseAsset.price_change_24h) > 0 ? "green" : "red"}>
              <Box className={getTokenPercentage(baseAsset.price_change_24h) > 0 ? styles['triangle-green'] : styles['triangle-red']} ></Box>
              {getTokenPercentage(baseAsset.price_change_24h)}%
            </Flex> : <></>}

            <Flex>
              <Flex display={["flex", "flex", "flex", "none"]} fontSize="13px" direction="column" justify="center" w="108px">
                {/* <Text display="flex" justifyContent="space-between">High: <span>$2235</span></Text>
                      <Text display="flex" justifyContent="space-between">Low: <span >$2125</span></Text> */}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" justify={["space-between", "space-between", "space-between", "start"]} align="center">
          <Flex w="100%" justify={["space-between", "space-between", "space-between", "space-around"]}>
          </Flex>

        </Flex>
      </Flex>
      {
        scoreVisible ? (
          <Flex w="100%" justify='center' align="center" mt="20px">


            <Flex align="center" w='85%' justify={"center"} direction="column" bg={daoMobile} py="10px" boxShadow={`1px 2px 12px 3px ${shadowColor}`} borderRadius="10px">
              <Flex w="90%" fontSize="12px" display="flex" justifyContent="space-between" mr="20px" m="auto">
                <Flex width="120px" justify="space-between">
                  <Text>Market : </Text>
                  <Text color={baseAsset.market_score >= 4 ? 'green' : baseAsset.market_score == 0 ? "none" : baseAsset.market_score <= 2 ? "red" : "none"} ml="20px"> {baseAsset.market_score > 0 ? baseAsset.market_score : "--"}/5</Text>
                </Flex>
                <Flex width="120px" justify="space-between">
                  <Text>Reliability : </Text>
                  <Text color={baseAsset.trust_score >= 4 ? 'green' : baseAsset.trust_score == 0 ? "none" : baseAsset.trust_score <= 2 ? "red" : "none"}>{baseAsset.trust_score > 0 ? baseAsset.market_score : "--"}/5</Text>
                </Flex>
              </Flex>

              <Flex w="90%" fontSize="12px" display="flex" justifyContent="space-between" mr="20px" m="auto" mt="10px">
                <Flex width="120px" justify="space-between">
                  <Text>Ativity : </Text>
                  <Text color={baseAsset.social_score >= 4 ? 'green' : baseAsset.social_score == 0 ? "none" : baseAsset.social_score <= 2 ? "red" : "none"} ml="20px">{baseAsset.social_score > 0 ? baseAsset.market_score : "--"}/5</Text>
                </Flex>
                <Flex width="120px" justify="space-between">
                  <Text>Utility : </Text>
                  <Text color={baseAsset.utility_score >= 4 ? 'green' : baseAsset.utility_score == 0 ? "none" : baseAsset.utility_score <= 2 ? "red" : "none"} ml="20px">{baseAsset.utility_score > 0 ? baseAsset.market_score : "--"}/5</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        ) : (<></>)
      }
    </>
  )
}

export default MobileInfo;