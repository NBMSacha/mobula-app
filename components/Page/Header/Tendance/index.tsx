import React from "react"
import styles from "./tendance.module.scss"
import { Flex } from "@chakra-ui/react";
function Tendance(props: any) {

  return (
    <Flex className={styles["info-tendance"]} borderTop={`2px solid var(--box_border)`} borderBottom={["2px solid var(--box_border)", "2px solid var(--box_border)", "none", "none"]} >
      <div className={styles["info-left"]}>
        <p className={styles["info-text"]}>
          Crypto: <span className={styles["blue-data"]}>{props.assets}</span>
        </p>
        <p className={styles["info-text"]}>
          DEX: <span className={styles["blue-data"]}>Coming soon</span>
        </p>
        <p className={styles["info-text"]}>
          MOBL: <span className={styles["blue-data"]}>Coming soon</span>
        </p>
      </div>
      <div className={styles["info-left"]}>
        <p className={styles["info-text"]}>
          DAO member: <span className={styles["blue-data"]}>{props.dao}</span>
        </p>
        <p className={styles["info-text"]}>
          New listings in the last 7 days:{" "}
          <span className={styles["blue-data"]}>{props.listings}</span>
        </p>
      </div>
    </Flex>
  )
}

export default Tendance
