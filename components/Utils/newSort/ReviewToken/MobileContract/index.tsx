import React, { useEffect, useState } from "react";
import { Heading, Text, Flex, Box, Image, Button, Link, useColorModeValue, Icon } from "@chakra-ui/react";
import { TimeIcon, CopyIcon } from "@chakra-ui/icons"

function Contract({ }) {

    return (
        <Flex direction="column" px="25px" display={["flex", "flex", "none", "none"]}>
            <Box>
                <Text fontSize="12px" mb="10px">Contract(s)</Text>
                <Flex w="100%" direction="column">
                    <Flex my="10px" align="center" px="10px">
                        <Image mr="5px" src="/fullicon.png" h="12px" />
                        <Text mr="5px" mt="2px" opacity=".8" fontSize="9px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">0x 8301934180740139239481</Text>
                        <Button _focus={{ boxShadow: "none" }}><CopyIcon h="12px" /></Button>
                    </Flex>
                </Flex>
                <Text ml="10px" mb="10px" fontSize="11px">Excluded from circulation</Text>
                <Flex w="100%" direction="column">
                    <Flex my="10px" align="center" px="10px">
                        <Image mr="5px" src="/fullicon.png" h="12px" />
                        <Text mr="5px" mt="2px" opacity=".8" fontSize="9px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">0x 8301934180740139239481</Text>
                        <Button _focus={{ boxShadow: "none" }}><CopyIcon h="12px" /></Button>
                    </Flex>
                </Flex>
                <Text ml="10px" mb="10px" fontSize="11px">Total supply contract(s)</Text>
                <Flex mb="10px" w="100%" direction="column">
                    <Flex my="10px" align="center" px="10px">
                        <Image mr="5px" src="/fullicon.png" h="12px" />
                        <Text mr="5px" mt="2px" opacity=".8" fontSize="9px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">0x 8301934180740139239481</Text>
                        <Button _focus={{ boxShadow: "none" }}><CopyIcon h="12px" /></Button>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Contract