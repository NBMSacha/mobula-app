import React from 'react';
import { Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { Circle } from "react-feather";

const Score = ({ name, score, updateScore }) => {

    function getColor(index: number) {
        return score >= index ? 'var(--chakra-colors-green)' : useColorModeValue("#E9E9E9", 'white')
    }
    return <Flex
        marginTop="0px"
        justifyContent={["left"]}
        alignItems={["center"]}
        mr={["30px", "30px", "30px", "0px"]} ml={["30px", "30px", "30px", "0px"]}
        height='50px'
    >
        <Text fontWeight="500" fontSize="1.2rem">{name}</Text>
        <Flex width="60%" ml="auto"
            justifyContent={["space-between"]}
            alignItems={["center"]}>
            <Circle color={getColor(1)} fill={getColor(1)} size='25px' onClick={() => updateScore(1)} />
            <Circle color={getColor(2)} fill={getColor(2)} size='25px' onClick={() => updateScore(2)} />
            <Circle color={getColor(3)} fill={getColor(3)} size='25px' onClick={() => updateScore(3)} />
            <Circle color={getColor(4)} fill={getColor(4)} size='25px' onClick={() => updateScore(4)} />
            <Circle color={getColor(5)} fill={getColor(5)} size='25px' onClick={() => updateScore(5)} />
        </Flex>

    </Flex>

}

export default Score