import React, { useEffect, useState, useRef } from "react";
import styles from "./BlockchainBtn.module.scss";
import { Sliders } from "react-feather"
import { Button, IconButton, Flex, Image } from "@chakra-ui/react";

export default function BlockchainBtn({ setWidgetVisibility, blockchain, setBlockchain }) {
  const [textResponsive, setTextResponsive] = useState(false);
  const percentageRef = useRef()
  useEffect(() => {
    if (percentageRef && percentageRef.current) {
      if ((window.matchMedia("(max-width: 768px)").matches)) {
        setTextResponsive(true)
      } else {
        setTextResponsive(false)
      }
    }
  }, [])

  const [display, setDisplay] = useState("ntm FDP")

  return (

    <Flex className={styles["main-blockchain-container"]} w={["100%", "100%", "95%", "95%"]} mx="auto" mb="10px" >
      <Flex className={styles["blockchain-container"]} justify="left" overflowX="scroll" css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        ">*": {
          marginLeft: "10px"
        }
      }} >
        <Button _hover={{bg: "var(--box_active)",color: "var(--text-primary)",border:"1px solid var(--box_border_active)"}} _focus={{ boxShadow: "none" }} w={["80px", "80px", "95px", "110px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["flex", "flex", "flex", "flex"]} variant={blockchain === "Ethereum" ? "secondary" : "primary"} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px" className={`${styles["blockchain-btn"]} ${styles["eth-btn-block"]} ${display === "Ethereum" ? styles["white"] : ""}`}
          onClick={() => setBlockchain(blockchain === "Ethereum" ? "" : "Ethereum")}>
          <Image h={["20px", "20px", "28px", "28px"]} src="/ethereum.png" className={`${styles["blockchain-logo"]}`} />
          <span className={styles["blockchain-name"]} style={{ marginLeft: "10px" }}>ETH</span>
        </Button>
        <Button _hover={{bg: "var(--box_active)",color: "var(--text-primary)",border:"1px solid var(--box_border_active)"}} _focus={{ boxShadow: "none" }} w={["80px", "80px", "95px", "110px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]} variant={blockchain === "BNB Smart Chain (BEP20)" ? "secondary" : "primary"} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px" className={`${styles["blockchain-btn"]}  ${styles["bsc-btn"]} ${blockchain === "BNB Smart Chain (BEP20)" ? styles["white"] : ""}`}
          onClick={() => setBlockchain(blockchain === "BNB Smart Chain (BEP20)" ? "" : "BNB Smart Chain (BEP20)")}>
          <Image h={["20px", "20px", "28px", "28px"]} src="/bnb.png" className={styles["blockchain-logo"]} />
          <span className={styles["blockchain-name"]} style={{ marginLeft: "10px" }}>BNB</span>
        </Button>
        <Button _hover={{bg: "var(--box_active)",color: "var(--text-primary)",border:"1px solid var(--box_border_active)"}} _focus={{ boxShadow: "none" }} w={"110px"} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["flex", "flex", "flex", "flex"]} variant={blockchain === "Avalanche C-Chain" ? "secondary" : "primary"} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="space-around" padding="10px" pl="20px" pr="20px" borderRadius="10px" className={`${styles["blockchain-btn"]} ${styles["avax-btn"]} ${blockchain === "Avalanche C-Chain" ? styles["white"] : ""}`}
          onClick={() => setBlockchain(blockchain === "Avalanche C-Chain" ? "" : "Avalanche C-Chain")}>
          <Image h={["20px", "20px", "28px", "28px"]} src="/avalanche.png" className={styles["blockchain-logo"]} />
          <span className={styles["blockchain-name"]} style={{ marginLeft: "10px" }}>AVAX</span>
        </Button>
        <Button _hover={{bg: "var(--box_active)",color: "var(--text-primary)",border:"1px solid var(--box_border_active)"}} _focus={{ boxShadow: "none" }} w={["80px", "80px", "95px", "110px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["flex", "flex", "flex", "flex"]} variant={blockchain === "Polygon" ? "secondary" : "primary"} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px" className={`${styles["blockchain-btn"]} ${styles["matic-btn"]} ${blockchain === "Polygon" ? styles["white"] : ""}`}
          onClick={() => setBlockchain(blockchain === "Polygon" ? "" : "Polygon")}>
          <Image h={["20px", "20px", "28px", "28px"]} src="/polygon.png" className={styles["blockchain-logo"]} />
          <span className={styles["blockchain-name"]} style={{ marginLeft: "10px" }}>MATIC</span>
        </Button>

        <Button _hover={{bg: "var(--box_active)",color: "var(--text-primary)",border:"1px solid var(--box_border_active)"}} _focus={{ boxShadow: "none" }} w={["80px", "80px", "95px", "110px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["flex", "flex", "flex", "flex"]} variant={blockchain === "Cronos" ? "secondary" : "primary"} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px" className={`${styles["blockchain-btn"]} ${styles["onion-btn"]} ${blockchain === "Cronos" ? styles["white"] : ""}`}
          onClick={() => setBlockchain(blockchain === "Cronos" ? "" : "Cronos")}>
          <Image h={["20px", "20px", "28px", "28px"]} src="/cronos.png" className={`${styles["blockchain-logo"]} ${styles["onion-btn"]}`} />
          <span className={styles["blockchain-name"]} style={{ marginLeft: "10px" }}>Cronos</span>
        </Button>

        <Button _hover={{bg: "var(--box_active)",color: "var(--text-primary)",border:"1px solid var(--box_border_active)"}} _focus={{ boxShadow: "none" }} w={["120px", "120px", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]} display={["flex", "flex", "flex", "flex"]} variant={blockchain === "Arbitrum" ? "secondary" : "primary"} h={["30px", "30px", "40px", "40px"]} alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px" className={`${styles["blockchain-btn"]} ${styles["digi-btn"]} ${display === "Arbitrum" ? styles["white"] : ""}`} onClick={() =>
          setBlockchain(blockchain === "Arbitrum" ? "" : "Arbitrum")}>
          <Image h={["20px", "20px", "28px", "28px"]} src="/arbitrum.png" className={`${styles["blockchain-logo"]} ${styles["digi-btn"]}`} />
          <span className={styles["blockchain-name"]} style={{ marginLeft: "10px" }}>Arbitrum</span>
        </Button>

        <Button _hover={{bg: "var(--box_active)",color: "var(--text-primary)",border:"1px solid var(--box_border_active)"}} _focus={{ boxShadow: "none" }} w={["120px", "120px", "120px", "120px"]} mx={1} fontSize={["12px", "12px", "14px", "14px"]}
          display={["flex", "flex", "flex", "flex", "flex"]} variant={blockchain === "Harmony" ? "secondary" : "primary"} h={["30px", "30px", "40px", "40px"]}
          alignItems="center" justifyContent="center" padding="10px" pl="20px" pr="20px" borderRadius="10px" className={`${styles["blockchain-btn"]} ${styles["digi-btn"]} 
          ${blockchain === "Harmony" ? styles["white"] : ""}`}
          onClick={() => setBlockchain(blockchain === "Harmony" ? "" : "Harmony")}>
          <Image h={["20px", "20px", "28px", "28px"]} src="/harmony.png" className={`${styles["blockchain-logo"]} ${styles["digi-btn"]}`} />
          <span className={styles["blockchain-name"]} style={{ marginLeft: "10px" }}>Harmony</span>
        </Button>

        {/* <Button px="10px" borderRadius="8px" className={styles["btn-loosers"]} style={{ boxShadow: `1px 2px 13px 3px ${shadow}` }} _focus={{ boxShadow: "none" }} border="1px solid rgba(122, 122, 122, 0.1)">
          <ArrowBackIcon w="20px" h="20px" mx="6px" />
          <Image mr="5px" src="/avalanche.png" h={["20px", "20px", "28px", "28px"]} />
          <Image mr="5px" src="/bcw.png" h={["20px", "20px", "28px", "28px"]} />
          <Image mr="5px" src="/polygon.png" h={["20px", "20px", "28px", "28px"]} />
        </Button> */}
        {/* 
     <button className={styles["params"]}>
       <Settings className={styles["colors"]} />
     </button> */}

      </Flex>

      <IconButton _hover={{bg: "var(--box_active)",color: "var(--text-primary)",border:"1px solid var(--box_border_active)"}} _focus={{ boxShadow: "none" }} mx={1} variant={display === "Settings" ? "secondary" : "primary"} display={["flex", "flex", "flex", "flex"]}
        onClick={() => {
          setWidgetVisibility(true)
        }}
        boxShadow={`1px 2px 12px 3px var(--shadow)`}
        border={`1px solid var(--box_border)`}
        colorScheme="teal"
        aria-label="Call Segun"
        boxSize={["29px", "29px", "39px", "39px"]}
        p="6px"
        icon={<Sliders />}
      />
    </Flex >
  )
}