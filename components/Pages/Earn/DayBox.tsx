import React from "react"
import { useAlert } from "react-alert"
import styles from "./Earn.module.scss"
import { Text, Flex, Box, Image } from "@chakra-ui/react"

export default function DayBox({ day, streaks, account, user, setUser }) {
    const alert = useAlert();

    function prizePerDay(day: number) {
        if (day <= 3) {
            return 1
        }
        switch (day) {
            case 4:
                return 2
            case 5:
                return 2
            case 6:
                return 3
            case 7:
                return 4
            case 8:
                return 5
        }
    }
    return (
        <>
            <Flex bg={(streaks === day && (!user.last_claim || Date.parse(user.last_claim) + 20 * 60 * 60 * 1000 < Date.now()) ? "var(--dailybox_active)" : "var(--dailybox_inactive)")}
                opacity={streaks >= day ? "1" : ".4"}
                boxShadow={`1px 2px 12px 3px var(--shadow)`}
                borderRadius="10px"
                justify="center"
                className={styles["daily-box"]}
                cursor={streaks === day ? "pointer" : ""}
                flexDir={"column"}
                onClick={() => {
                    fetch("https://mobulaspark.com/streak?account=" + account)
                        .then(r => r.json())
                        .then(r => {
                            if (r.success) {
                                alert.success("Successfully claimed your MOBL. ")
                                const bufferUser = { ...user };
                                bufferUser.balance += prizePerDay(day);
                                bufferUser.streaks += 1;
                                bufferUser.last_claim = Date.now()
                                setUser(bufferUser)
                            } else {
                                alert.show(r.error)
                            }
                        })
                }}
            >
                <Text fontSize="13px" fontWeight="800" color="white" className={styles["day-text"]}>Day {day}</Text>
                <Flex className={styles["displayN"]} justify="center" align="center" mb="10px">
                    {day === 1 && (
                        <Image src="/reward1.png" h={["19px","19px","28px","28px"]} />
                    )}
                    {day === 2 && (
                        <Image src="/reward2.png" h={["19px","19px","28px","28px"]}  />
                    )}
                    {day === 3 && (
                        <Image src="/reward3.png" h={["19px","19px","28px","28px"]}  />
                    )}
                    {day === 4 && (
                        <Image src="/reward4.png" h={["19px","19px","28px","28px"]}  />
                    )}
                    {day === 5  && (
                        <Image src="/reward5.png" h={["19px","19px","28px","28px"]}  />
                    )}
                    {day === 6  && (
                        <Image src="/reward5.png" h={["19px","19px","28px","28px"]}  />
                    )}
                    {day === 7  && (
                        <Image src="/reward5.png" h={["19px","19px","28px","28px"]}  />
                    )}
                    {day === 8   && (
                        <Image src="/reward5.png" h={["19px","19px","28px","28px"]}  />
                    )}
                    
                    <Text mb="0px !important" fontSize="15px" ml="5px">+{prizePerDay(day)}</Text>
                </Flex>
                <Box justifyContent="center" alignItems="center" mb="10px" className={styles["displayF"]}>
                    <Image src="/reward1.png" h={["19px","19px","28px","28px"]}  />
                    <Text mb="0px !important" fontSize="15px" ml="5px">+{prizePerDay(day)}</Text>
                </Box>
            </Flex>
        </>
    )
}

