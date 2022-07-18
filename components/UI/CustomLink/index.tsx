import React from "react";
import NextLink from "next/link";
import { Link, LinkProps } from "@chakra-ui/react";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ children, href, ...props }) => (
  <NextLink href={href} passHref>
    <Link {...props}>{children}</Link>
  </NextLink>
);
export default CustomLink;
