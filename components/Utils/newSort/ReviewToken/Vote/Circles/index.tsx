import { Circle, Flex, Text } from "@chakra-ui/react";

function Circles({ score, updateScore, name }) {
  function getColor(index: number) {
    return score >= index ? "var(--green)" : "var(--circle)";
  }

  return (
    <Flex justify="space-between" mt="20px" h="16x">
      <Text fontSize={["12px", "12px", "14px", "14px"]}>{name}</Text>
      <Flex>
        <Circle
          boxShadow="1px 2px 12px 3px var(--shadow)"
          size="18px"
          mx="3px"
          bg={getColor(1)}
          fill={getColor(1)}
          onClick={() => {
            updateScore(1);
          }}
        />
        <Circle
          boxShadow="1px 2px 12px 3px var(--shadow)"
          size="18px"
          mx="3px"
          bg={getColor(2)}
          fill={getColor(2)}
          onClick={() => {
            updateScore(2);
          }}
        />
        <Circle
          boxShadow="1px 2px 12px 3px var(--shadow)"
          size="18px"
          mx="3px"
          bg={getColor(3)}
          fill={getColor(3)}
          onClick={() => {
            updateScore(3);
          }}
        />
        <Circle
          boxShadow="1px 2px 12px 3px var(--shadow)"
          size="18px"
          mx="3px"
          bg={getColor(4)}
          fill={getColor(4)}
          onClick={() => {
            updateScore(4);
          }}
        />
        <Circle
          boxShadow="1px 2px 12px 3px var(--shadow)"
          size="18px"
          mx="3px"
          bg={getColor(5)}
          fill={getColor(5)}
          onClick={() => {
            updateScore(5);
          }}
        />
      </Flex>
    </Flex>
  );
}

export default Circles;
