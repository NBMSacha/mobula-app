import React, { useEffect, useState } from "react";
import { Heading, Text, Flex, Box, Image, Button, Link, useColorModeValue, Icon } from "@chakra-ui/react";

function Line({title, number}) {
  
    return (
        <Flex mt="20px" fontSize="16px" align="center" justify="space-between" opacity=".9">
            <Text mr="15px">{title}</Text>
            <Text>{number}</Text>
        </Flex>
    )
   
}

export default Line;
