import React from 'react'
import ErrorIcon from '../AlertTemplate/icons/ErrorIcon'
import { Flex, Text, Box, useColorModeValue } from "@chakra-ui/react";
import { InfoIcon, CloseIcon, QuestionIcon, WarningIcon } from "@chakra-ui/icons";

const buttonStyle = {
    marginLeft: 'auto',
    border: 'none',
    marginRight:"20px",
    marginTop:"10px",
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#FFFFFF'
}

export const AlertTemplate = ({ message, options, style, close, darkTheme }) => {
    const shadowColor = useColorModeValue("var(--chakra-colors-shadow)", "var(--chakra-colors-shadow)")
    const bg = useColorModeValue("var(--chakra-colors-bg_white)", "var(--chakra-colors-dark_primary)")
    return (
        <Flex w="300px" h="140px" direction="column" p="0px" position="absolute" top="-700px" right="0px" bg={bg} boxShadow={`1px 2px 12px 3px ${shadowColor}`}>
            {options.type === 'info' && (
                <Flex borderTop="10px solid #385CBB" w="100%" align="center">
                    <Flex ml="10px" mt="10px" mr="10px"><QuestionIcon /></Flex>
                    <Text mt="10px" ml="0px">Information</Text>
                    <button onClick={close} style={buttonStyle} >
                        <CloseIcon fontSize="15px" color="none" bg="none" />
                    </button>
                </Flex>
            )}
            {options.type === 'success' && (
                <Flex borderTop="10px solid #F5BC00" w="100%" > 
                    <Flex ml="10px" mt="10px" mr="10px"><InfoIcon /></Flex>
                    <Text mt="10px" ml="0px">Warning</Text>
                    <button onClick={close} style={buttonStyle} >
                        <CloseIcon  fontSize="15px" color="none" bg="none" />
                    </button>
                </Flex>
            )}
            {options.type === 'error' && (
                <Flex borderTop="10px solid #ED474A" w="100%">
                    <Flex ml="10px" mt="10px" mr="10px"><ErrorIcon /></Flex>
                    <Text mt="10px" ml="0px">Error</Text>
                    <button onClick={close} style={buttonStyle} >
                        <CloseIcon fontSize="15px" color="none" bg="none" />
                    </button>
                </Flex>
            )}

            <span style={{ flex: 2, fontSize:"14px", marginLeft: "20px", marginTop: "10px", opacity: .7}}>{message}</span>
            
        </Flex>
    )
}