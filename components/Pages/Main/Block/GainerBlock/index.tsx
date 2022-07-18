import React from "react";
import { useRouter } from "next/router";
import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { getUrlFromName } from "../../../../../helpers/formaters";
import styles from "./GainerBlock.module.scss";

function GainerBlock(tokens: {
  title: string;
  logo1: string;
  name1: string;
  id1: number;
  change1: number;
  logo2: string;
  name2: string;
  id2: number;
  change2: number;
  logo3: string;
  name3: string;
  id3: number;
  change3: number;
}) {
  console.log(tokens.title);
  const router = useRouter();
  return (
    <Box className={styles["gainer-box"]}>
      <div className={styles["container-title-flex"]}>
        <h3 className={styles["gainer-main-title"]}>{tokens.title}</h3>
        <Link
          _focus={{ boxShadow: "none" }}
          cursor="pointer"
          color="grey"
          href={tokens.title == "Top Gainers" ? "/movers" : tokens.title == "Trendings" ? "trends" : "new"}
        >
          More {">"}
        </Link>
      </div>

      <Flex
        bg="var(--bg-secondary-box)"
        border="2px solid var(--box_border)"
        className={styles["gainer-container"]}
        borderRadius="25px"
        mt="15px"
      >
        <div className={styles["left-gainer"]}>
          <Flex
            mt="0px"
            className={styles["line-gainer"]}
            onClick={() => router.push(`/asset/${getUrlFromName(tokens.name1)}`)}
          >
            <div className={styles["token-info-pack"]}>
              <Image h="20px" w="20px" src={tokens.logo1} className={styles["logo-inBox"]} />
              <span className={styles["crypto-assests"]}>{tokens.name1}</span>
            </div>
            {tokens.change1 >= 0 ? (
              <span className={styles.green}>
                <div className={styles["triangle-green"]} />
                {tokens.change1}%
              </span>
            ) : (
              <span className={styles.red}>
                <div className={styles["triangle-red"]} />
                {tokens.change1}%
              </span>
            )}
          </Flex>
          <div className={styles["line-gainer"]} onClick={() => router.push(`/asset/${getUrlFromName(tokens.name2)}`)}>
            <div className={styles["token-info-pack"]}>
              <Image h="30px" src={tokens.logo2} className={styles["logo-inBox"]} />
              <span className={styles["crypto-assests"]}>{tokens.name2}</span>
            </div>
            {tokens.change2 >= 0 ? (
              <span className={styles.green}>
                <div className={styles["triangle-green"]} />
                {tokens.change2}%
              </span>
            ) : (
              <span className={styles.red}>
                <div className={styles["triangle-red"]} />
                {tokens.change2}%
              </span>
            )}
          </div>
          <div className={styles["line-gainer"]} onClick={() => router.push(`/asset/${getUrlFromName(tokens.name3)}`)}>
            <div className={styles["token-info-pack"]}>
              <Image h="30px" src={tokens.logo3} className={styles["logo-inBox"]} />
              <span className={styles["crypto-assests"]}>{tokens.name3}</span>
            </div>

            {tokens.change3 >= 0 ? (
              <span className={styles.green}>
                <div className={styles["triangle-green"]} />
                {tokens.change3}%
              </span>
            ) : (
              <span className={styles.red}>
                <div className={styles["triangle-red"]} />
                {tokens.change3}%
              </span>
            )}
          </div>
        </div>
      </Flex>
    </Box>
  );
}

export default GainerBlock;
