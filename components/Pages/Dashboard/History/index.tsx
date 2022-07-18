import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { ThumbsDown, ThumbsUp, XCircle } from "react-feather";
import Countdown from "react-countdown";
import styles from "../dashboard.module.scss";

function History({ recentlyAdded, validated }) {
  console.log(recentlyAdded.created_at);
  const CountdownAny = Countdown as any;
  return (
    <Box
      h="100%"
      bg="var(--bg-governance-box)"
      boxShadow={[
        "0px 1px 12px 3px var(--shadow)",
        "0px 1px 12px 3px var(--shadow)",
        "0px 1px 12px 3px var(--shadow)",
        "0px 1px 12px 3px var(--shadow)",
      ]}
      mx="auto"
      w={["88%", "88%", "100%", "100%"]}
      borderRadius="10px"
      mt={["16px", "16px", "10px", "10px"]}
      p={["15px", "15px", "40px", "40px"]}
      mb={["50px", "50px", "0px", "0px"]}
      className={styles.noneDis}
    >
      <Text color="var(--beli)" pb="15px" fontSize={["16px", "16px", "22px", "22px"]} fontWeight="500">
        Latest DAO Decisions
      </Text>
      <Box pr="20px" maxHeight="220px" overflowY="scroll" className={styles.scroll}>
        {validated.map((token: any, idx: number) => {
          const date = new Date(token.timestamp * 1000);
          const seconds = date.getTime();
          const postedDate = Math.round((Date.now() - seconds) / 1000);
          let format = "";
          if (postedDate < 60) {
            format = "seconds";
          } else if (postedDate >= 60 && postedDate < 120) {
            format = "minute";
          } else if (postedDate >= 120 && postedDate < 3600) {
            format = "minutes";
          } else if (postedDate >= 3600 && postedDate < 7200) {
            format = "hour";
          } else if (postedDate >= 7200 && postedDate < 86400) {
            format = "hours";
          } else if (postedDate >= 86400 && postedDate < 172800) {
            format = "day";
          } else if (postedDate >= 172800) {
            format = "days";
          }

          return (
            <Flex fontSize="14px" align="center" mb="20px">
              <Image
                rounded={50}
                src={token.logo}
                h={["20px", "20px", "25px", "25px"]}
                w={["20px", "20px", "25px", "25px"]}
              />
              <Text color="grey" fontSize={["12px", "12px", "15px", "15px"]} mx="10px">
                {token.name}
              </Text>
              <Text color="#D3D3D3" fontSize={["12px", "12px", "15px", "15px"]} mr="15px">
                {token.symbol}
              </Text>
              <Box display={["none", "none", "block", "block"]}>
                {format == "seconds" && (
                  <Box whiteSpace="nowrap" mr="10px" fontSize={["11px", "11px", "15px", "15px"]} bg="red" as="span">
                    {postedDate} seconds ago
                  </Box>
                )}
                {format == "minute" && (
                  <Box whiteSpace="nowrap" mr="10px" fontSize={["11px", "11px", "15px", "15px"]} as="span">
                    {Math.floor(postedDate / 60)} minute ago
                  </Box>
                )}
                {format == "minutes" && (
                  <Box whiteSpace="nowrap" mr="10px" fontSize={["11px", "11px", "15px", "15px"]} as="span">
                    {Math.floor(postedDate / 60)} minutes ago
                  </Box>
                )}
                {format == "hour" && (
                  <Box whiteSpace="nowrap" mr="10px" fontSize={["11px", "11px", "15px", "15px"]} as="span">
                    {Math.floor(postedDate / 3600)} hour ago
                  </Box>
                )}
                {format == "hours" && (
                  <Box whiteSpace="nowrap" mr="10px" fontSize={["11px", "11px", "15px", "15px"]} as="span">
                    {Math.floor(postedDate / 3600)} hours ago
                  </Box>
                )}
                {format == "day" && (
                  <Box whiteSpace="nowrap" mr="10px" fontSize={["11px", "11px", "15px", "15px"]} as="span">
                    {Math.floor(postedDate / 86400)} day ago
                  </Box>
                )}
                {format == "days" && (
                  <Box whiteSpace="nowrap" mr="10px" fontSize={["11px", "11px", "15px", "15px"]} as="span">
                    {Math.floor(postedDate / 86400)} days ago
                  </Box>
                )}
              </Box>
              {/* <Text color="grey" mr="20px">{Date(token.created_at).getTime()}</Text> */}
              <Flex color={token.validated ? "green" : "red"} ml="auto" justify="center" align="center">
                <Text display={["none", "none", "flex", "flex"]} fontSize="12px" mr="10px">
                  {token.votes.filter((vote) => vote.validated).length}/{token.votes.length}
                </Text>
                <Text fontSize="12px" whiteSpace="nowrap">
                  {token.validated ? "Validated" : "Rejected"} by DAO
                </Text>
                <Flex display={["none", "none", "flex", "flex"]}>
                  {token.validated ? (
                    <CheckCircleIcon ml="10px" boxSize={["12px", "12px", "18px", "18px"]} />
                  ) : (
                    <Icon
                      bg="red"
                      ml="10px"
                      boxSize={["14px", "14px", "20px", "20px"]}
                      color="var(--bg-governance-box)"
                      borderRadius="full"
                      as={XCircle}
                    />
                  )}
                </Flex>
                <Flex display={["flex", "flex", "none", "none"]}>
                  {token.validated ? <Icon mb="4px" ml="5px" as={ThumbsUp} /> : <Icon ml="5px" as={ThumbsDown} />}
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}

export default History;
