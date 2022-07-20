import { Flex, Text } from "@chakra-ui/react"
import styles from "./Line.module.scss"
export default function Line() {

    return(
                        <Flex borderTop="1px solid var(--box_border)" py="12px" align="center" justify="space-between" pr="10px">
                            <Text fontSize={["8px", "8px","10px","12px"]} color="var(--text-grey)" mr={["30px","0px","20px","0px"]} className={styles["pad"]}>10 sec.</Text>
                                <Text color="green" fontSize={["11px", "11px","12px","15px"]} mr={["0px","0px","10px","0px"]}>$0.22</Text>
                                <Text color="green" fontSize={["11px", "11px","12px","15px"]}>0.0002 ETH</Text>
                        </Flex>
    )
}