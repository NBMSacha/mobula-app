import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { CloseIcon, InfoIcon, QuestionIcon } from "@chakra-ui/icons";
import ErrorIcon from "../AlertTemplate/icons/ErrorIcon";

const buttonStyle = {
  marginLeft: "auto",
  border: "none",
  marginRight: "20px",
  marginTop: "10px",
  backgroundColor: "transparent",
  cursor: "pointer",
  color: "var(--text-primary)",
};

export const AlertTemplate = ({ message, options, style, close }) => (
  <Flex
    w="300px"
    h="140px"
    direction="column"
    p="0px"
    position="absolute"
    top="-700px"
    right="0px"
    bg="var(--background)"
    boxShadow="1px 2px 12px 3px var(--shadow)"
  >
    {options.type === "info" && (
      <Flex borderTop="10px solid #385CBB" w="100%" align="center">
        <Flex ml="10px" mt="10px" mr="10px">
          <QuestionIcon />
        </Flex>
        <Text mt="10px" ml="0px">
          Information
        </Text>
        <button onClick={close} style={buttonStyle}>
          <CloseIcon fontSize="15px" color="none" bg="none" />
        </button>
      </Flex>
    )}
    {options.type === "success" && (
      <Flex borderTop="10px solid #F5BC00" w="100%">
        <Flex ml="10px" mt="10px" mr="10px">
          <InfoIcon />
        </Flex>
        <Text mt="10px" ml="0px">
          Warning
        </Text>
        <button onClick={close} style={buttonStyle}>
          <CloseIcon fontSize="15px" color="none" bg="none" />
        </button>
      </Flex>
    )}
    {options.type === "error" && (
      <Flex borderTop="10px solid #ED474A" w="100%">
        <Flex ml="10px" mt="10px" mr="10px">
          <ErrorIcon />
        </Flex>
        <Text mt="10px" ml="0px">
          Error
        </Text>
        <button onClick={close} style={buttonStyle}>
          <CloseIcon fontSize="15px" color="none" bg="none" />
        </button>
      </Flex>
    )}
  </Flex>
);
