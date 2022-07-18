import React from "react";
import { useAlert } from "react-alert";
import { Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import styles from "./Earn.module.scss";

export default function DayBox({ day, streaks, account, user, setUser }) {
  const alert = useAlert();
  const [mobile] = useMediaQuery("(max-width: 768px)");

  function prizePerDay(day: number) {
    if (day <= 3) {
      return 1;
    }
    switch (day) {
      case 4:
        return 2;
      case 5:
        return 2;
      case 6:
        return 3;
      case 7:
        return 4;
      case 8:
        return 5;
    }
  }

  console.log(prizePerDay(day), mobile);
  return (
    <Flex
      bg={
        streaks == day && (!user.last_claim || Date.parse(user.last_claim) + 20 * 60 * 60 * 1000 < Date.now())
          ? "var(--dailybox_active)"
          : "var(--dailybox_inactive)"
      }
      opacity={streaks >= day ? "1" : "0.1"}
      boxShadow="1px 2px 12px 3px var(--shadow)"
      borderRadius="10px"
      justify="center"
      className={styles["daily-box"]}
      cursor={streaks == day ? "pointer" : ""}
      flexDir="column"
      onClick={() => {
        fetch(`https://mobulaspark.com/streak?account=${account}`)
          .then((r) => r.json())
          .then((r) => {
            if (r.success) {
              alert.success("Successfully claimed your MOBL. ");
              const bufferUser = { ...user };
              bufferUser.balance += prizePerDay(day);
              bufferUser.streaks += 1;
              bufferUser.last_claim = Date.now();
              setUser(bufferUser);
            } else {
              alert.show(r.error);
            }
          });
      }}
    >
      <Text fontSize="13px" fontWeight="800" color="white" className={styles["day-text"]}>
        Day
        {day}
      </Text>
      <Flex justify="center" align="center" mb="10px">
        <Image src="fullicon.png" h="30px" />
        <Text mb="0px !important" fontSize="15px" ml="5px">
          +{prizePerDay(day)}
        </Text>
      </Flex>
    </Flex>
  );
}
