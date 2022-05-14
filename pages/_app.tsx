import { useState, useEffect } from 'react'
import App from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { positions, Provider } from 'react-alert'
import { AlertTemplate } from '../components/Utils/AlertTemplate'
import '../styles.scss'
import '../styles/header.scss'
import '../styles/responsive.scss'

const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 12000
  return library
}

export default class Root extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Mobula | The decentralized data aggregator [Alpha]</title>
          <link rel='icon' type='image/png' href='/fullicon.png' />
          <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500;1,600&family=Ubuntu&display=swap' rel='stylesheet' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, maximum-scale=1'
          ></meta>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-FYC9GNY55E"></script>
          <script dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FYC9GNY55E');`}}></script>
        </Head>

        <Provider template={AlertTemplate} {...alertOptions}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Header />

            <Component {...pageProps}></Component>

            <Footer />
          </Web3ReactProvider>
        </Provider>
      </>
    )
  }
}
