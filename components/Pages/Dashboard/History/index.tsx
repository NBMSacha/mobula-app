import { Flex, Box, Text, Image,useColorModeValue } from "@chakra-ui/react";
import styles from '../dashboard.module.scss'

function History({ recentlyAdded }) {

    const input =  useColorModeValue("white_sun_moon", "dark_decision")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    const bg = useColorModeValue("bg_white", "dark_box_list")
   
    return (
    <Box bg={["none", "none", bg, bg]} boxShadow={["none", "none",  `0px 1px 12px 3px ${shadow}`,  `0px 1px 12px 3px ${shadow}`]} w="100%" borderRadius="10px" mt="10px" p={"40px 40px 40px 40px"} className={styles["noneDis"]}>
        <Text color="var(--beli)" fontSize="22px" fontWeight="500">History</Text>
        <Box pt="15px">

            {recentlyAdded.map((token: any) => {
                return <Flex fontSize="14px" align="center" mb="20px">
                    <Image rounded={50} src={token.logo} height="25px" width="25px" />
                    <Text color="grey" mx="10px">{token.name}</Text>
                    <Text color="#D3D3D3" mr="15px">{token.symbol}</Text>
                    <Text color="grey" mr="20px">{token.creation_date}</Text>
                    <Flex ml='auto' justify="center" align="center">
                        <Box h="13px" w="13px" mr="10px" borderRadius="50%" bg="#16C784"></Box>
                        <Text color="grey">Validated by DAO</Text>
                    </Flex>
                </Flex>
            })}

        </Box>
    </Box>)
}

export default History;