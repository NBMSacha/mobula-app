import React, { useEffect, useState } from "react"
import InfoIcon from "./icons/InfoIcon"
import SuccessIcon from "./icons/SuccessIcon"
import ErrorIcon from "./icons/ErrorIcon"
import { X } from "react-feather"
import { Flex, Text, Box } from "@chakra-ui/react";

const alertStyle = {
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.03)",
    fontFamily: "Arial",
    width: "250px",
    color: "var(--text-primary)",
    position: "fixed",
    top: "100px"
}

const buttonStyle = {
    marginLeft: "20px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: "var(--text-primary)"
}

export const AlertTemplate = ({ message, options, style, close }) => {
    const [pixels, setPixels] = useState(0);
    const [total, setTotal] = useState(100);

    useEffect(() => {
        if (pixels <= 50) {
            setTimeout(() => {
                setPixels(pixels + 2)
            }, 20)
        }
    }, [pixels])

    useEffect(() => {
        if (total > 0) {
            setTimeout(() => {
                setTotal(total - 0.5)
            }, 20)
        }
    }, [total])
    return (
        <div style={{
            ...alertStyle, ...style, "backgroundColor": "var(--bg-governance-box)", color: "var(--text-primary)",
            right: pixels + "px"
        }}>
            <Box mr="auto" borderRadius={`10px ${"0px"} 0px 0px`} bg={
                options.type === "info" ? "blue" : options.type === "success" ? "green" : "red"
            } top="0px" w={total + "%"} h="10px"></Box>
            <Flex p="10px" direction="column" w="100%">
                <Flex w="100%" align="center" justify="space-between">
                    <Flex align="center" justify="center">
                        {options.type === "info" && <InfoIcon />}
                        {options.type === "success" && <SuccessIcon />}
                        {options.type === "error" && <ErrorIcon />}
                        <Text ml="-12px" fontWeight="semibold">
                            {options.type === "info" ? "Information" : options.type === "success" ? "Success" : "Error"}
                        </Text>
                    </Flex>

                    <button onClick={close} style={buttonStyle}>
                        <X />
                    </button>
                </Flex>
            </Flex>


            <span style={{ flex: 2, padding: "0px 10px 5px", color: "grey", fontSize: "1rem" }}>{message}</span>
        </div >
    )
}