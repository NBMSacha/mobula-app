import { useState, useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import '../styles.css';
import '../styles/header.css'
import '../styles/responsive.css'
import "../styles/SubmitForm.css"
import "../styles/respChart.css"
import "../styles.scss";
import "../styles/header.scss";
import "../styles/responsive.scss";
import "../components/Newlisting/Newlisting.css";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { ChakraProvider } from "@chakra-ui/react";

const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, "any");
  library.pollingInterval = 12000;
  return library;
}

export default class Root extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Mobula | The decentralized data aggregator [Alpha]</title>
          <link rel="icon" type="image/png" href="/fullicon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        </Head>

        <Provider template={AlertTemplate} {...alertOptions}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <ChakraProvider>
              <Header />
              <Component {...pageProps}></Component>
              <Footer />
            </ChakraProvider>
          </Web3ReactProvider>
        </Provider>
      </>
    );
  }
}
