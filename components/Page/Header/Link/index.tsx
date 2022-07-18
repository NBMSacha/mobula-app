import React from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import Link from "../../../UI/CustomLink";

function CustomLink() {
  const router = useRouter();
  if (router.pathname.includes("dao")) {
    return (
      <Flex
        justify="space-around"
        fontWeight={500}
        fontSize={15}
        width="50%"
        mr={{ base: 0, lg: 10 }}
        maxW={666}
        display={{ base: "none", md: "flex" }}
      >
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/elections">Elections</Link>
        <Link href="/sort">First Sort</Link>
        <Link href="/validation">Final Validation</Link>
      </Flex>
    );
  }
  return (
    <Flex
      justify="space-around"
      fontWeight={500}
      fontSize={15}
      width="50%"
      mr={{ base: 0, lg: 10 }}
      maxW={666}
      display={{ base: "none", md: "flex" }}
    >
      {" "}
      <Link href="/new">New</Link>
      <Link href="/movers">Gainers & Losers</Link>
      <Link href="/dex">DEX</Link>
      <Link href="/dao/dashboard">DAO</Link>
      <Link href="/list">List an asset</Link>
    </Flex>
  );
}

export default CustomLink;
