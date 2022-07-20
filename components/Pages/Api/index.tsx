import React from "react"
import { Flex} from "@chakra-ui/react";
import TopSection from "./TopSection";
import BottomSection from "./BottomSection"

const Api = () => {
    return (
        <>
            <Flex w="100%" direction="column" align="center"pb="50px">
                <TopSection />
                <BottomSection />
            </Flex>
        </>
    )
}
export default Api;