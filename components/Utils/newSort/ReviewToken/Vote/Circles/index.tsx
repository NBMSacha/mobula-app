import { Text, Flex, useColorModeValue, } from "@chakra-ui/react";
import { Circle } from '@chakra-ui/react';

function Circles({ score, updateScore, name }) {

    function getColor(index: number) {
        return score >= index ? 'var(--chakra-colors-green)' : useColorModeValue("#E9E9E9", 'white')
    }
    return (
                <Flex justify="space-between" mt="15px" h="16x">
                    <Text fontSize={["12px", "12px", "14px", "14px"]}>{name}</Text>
                    <Flex>
                        <Circle size='18px' mx="3px" bg={getColor(1)} fill={getColor(1)} onClick={() => { updateScore(1)}} />
                        <Circle size='18px' mx="3px" bg={getColor(2)} fill={getColor(2)} onClick={() => { updateScore(2)}} />
                        <Circle size='18px' mx="3px" bg={getColor(3)} fill={getColor(3)} onClick={() => { updateScore(3)}} />
                        <Circle size='18px' mx="3px" bg={getColor(4)} fill={getColor(4)} onClick={() => { updateScore(4)}} />
                        <Circle size='18px' mx="3px" bg={getColor(5)} fill={getColor(5)} onClick={() => { updateScore(5)}} />
                    </Flex>
                </Flex>
    )
}

export default Circles