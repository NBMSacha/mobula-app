import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useAlert } from "react-alert";
import { PROTOCOL_ADDRESS } from "../../../../constants";
import styles from "../dashboard.module.scss";

function RankStats({ title, tokensOwed, goodChoices, badChoices, web3React }) {
  const alert = useAlert();

  return (
    <Flex
      direction={["row", "row", "column", "column"]}
      justify={["start", "start", "center", "center"]}
      boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow)", "0px 1px 12px 3px var(--shadow)"]}
      className={styles["padding-resps"]}
      bg={["none", "none", "var(--bg-governance-box)", "var(--bg-governance-box)"]}
      borderRadius="10px"
      w={["100%", "100%", "50%", "50%"]}
      textAlign={["center", "center", "center", "left"]}
      mb={[7, 7, 7, 0]}
      mr={title == "Rank I" ? 3.5 : 0}
      position="relative"
    >
      <Box
        position="absolute"
        display={["block", "block", "none", "none"]}
        bottom="-20px"
        h="1px"
        w="38%"
        bg="var(--border-top-body)"
      />
      <h2 className={styles["title-rank"]}>
        {title} <span className={styles["subtitle-rank"]}>Stats</span>
      </h2>
      <Flex direction={["column", "column", "row", "row"]} w={["50%", "50%", "auto", "auto"]}>
        <Flex
          direction={["row", "row", "column", "column"]}
          fontSize="15px"
          align="center"
          justify="start"
          mb={[0, 0, 5, 5]}
          w="100%"
          position="relative"
        >
          <Text color={["#16C784", "#16C784", "#16C784", "#16C784"]} mb={2} whiteSpace="nowrap" mr="5px">
            Correct Decisions
          </Text>
          <Flex
            color="green"
            align="center"
            justify="center"
            fontWeight="800"
            h="45px"
            bg={["none", "none", "var(--bg-governance-box-decision)", "var(--bg-governance-box-decision)"]}
            boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow)", "0px 1px 12px 3px var(--shadow)"]}
            mt={["0px", "0px", "15px", "15px"]}
            borderRadius="15px"
            w={["30px", "30px", "90px", "90px"]}
          >
            {" "}
            {goodChoices}
          </Flex>
        </Flex>
        <Flex
          direction={["row", "row", "column", "column"]}
          fontSize="15px"
          align="center"
          justify={["start", "start", "start", "start"]}
          mb={[0, 0, 5, 5]}
          w="100%"
          position="relative"
        >
          <Text color={["#4C4C4C", "#4C4C4C", "red", "red"]} mb={2} whiteSpace="nowrap" ml="5px">
            Wrong Decisions
          </Text>
          <Flex
            color="red"
            align="center"
            justify="center"
            h="45px"
            fontWeight="800"
            bg={["none", "none", "var(--bg-governance-box-decision)", "var(--bg-governance-box-decision)"]}
            boxShadow={["none", "none", "0px 1px 12px 3px var(--shadow)", "0px 1px 12px 3px var(--shadow)"]}
            mt={["0px", "0px", "15px", "15px"]}
            borderRadius="15px"
            w={["30px", "30px", "90px", "90px"]}
          >
            {" "}
            {badChoices}
          </Flex>
        </Flex>
      </Flex>
      <Box fontSize="15px" mb={5}>
        <Text
          mb={2}
          textAlign="center"
          fontSize="13px"
          bottom="60px"
          color="var(--protocol)"
          position={["absolute", "absolute", "initial", "initial"]}
        >
          {" "}
          The Protocol currently owes you <span className={styles["color-mobl"]}>{`${tokensOwed}  $MOBL`}</span>
        </Text>
      </Box>
      <Flex
        width={["45%", "45%", "80%", "80%"]}
        mx="auto"
        justifyContent={["center", "center", "center", "center"]}
        className={styles["buttons-claim-box"]}
        borderRadius="12px"
      >
        {" "}
        <Button
          _focus={{ boxShadow: "none" }}
          variant="blue"
          className={styles["buttons-claim"]}
          borderRadius="12px"
          style={{ width: "90%", "font-size": "1rem" } as any}
          onClick={async (e) => {
            e.preventDefault();

            try {
              const provider = new ethers.providers.Web3Provider(web3React.library.provider);
              var signer = provider.getSigner();
            } catch (e) {
              alert.show("You must connect your wallet to access the Dashboard.");
            }

            try {
              const contract = new ethers.Contract(
                PROTOCOL_ADDRESS,
                ["function claimRewards() external", "function claimFinalRewards() external"],
                signer
              );

              if (title == "Rank I") await contract.claimRewards();
              if (title == "Rank II") await contract.claimFinalRewards();
            } catch (e) {
              alert.show("You don't have anything to claim.");
              console.log(e);
            }
          }}
        >
          <Flex justify="center" align="center">
            <Text ml="15px" mr="15px">
              Claim Rewards
            </Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}

export default RankStats;
