import React, { useEffect, useState } from "react";
import { Heading, Text, Flex, Box, Image, Button, Link, useColorModeValue, Icon } from "@chakra-ui/react";

function Boxs({rank}) {
  
    return (
        <Flex mt="15px" mb="15px" w="100%" justify="space-between" py="23px" px="30px" bg="var(--background)" borderRadius="14px" boxShadow="1px 2px 13px 3px var(--shadow)">
            <Flex align="center">
                <Text color="var(--text-grey)" mr="15px">{rank}.</Text>
                <Text>0x37d0..6ddb</Text>
            </Flex>
            {rank === "1" ? (
                <Box px="8px" py="2px" borderRadius="10px" border="1px solid var(--green)" color="green">10,047.44</Box>
            ) : ( 
                <Box px="8px" py="2px" borderRadius="10px" color="blue">10,047.44</Box>
            )}  
        </Flex>
    )
}

export default Boxs;
