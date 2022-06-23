import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Page/Header'
import Footer from '../components/Page/Footer'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { positions, Provider } from 'react-alert'
import { AlertTemplate } from '../components/Utils/AlertTemplate'
import '../styles.scss'
import '../styles/header.scss'
import '../styles/responsive.scss'
import { ColorModeScript } from '@chakra-ui/react'
import { themeUltime } from '../theme'
import { ChakraProvider } from "@chakra-ui/react"

const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, "any");
  library.pollingInterval = 12000;
  return library;
}

export default function App({ Component, pageProps }) {
  var colorMode = "light"
  useEffect(() => {

    const isDark=true;
    const root = document.documentElement;
    // ===================
    // NEW COLOR Mode
    // ===================

//  MAIN BG
    root?.style.setProperty("--background",isDark ? "#131727" : "#F5F5F5");
    root?.style.setProperty("--bg-main-box",isDark ? "#111524" : "#F2F2F2");
    root?.style.setProperty("--bg-secondary-box",isDark ? "rgba(25, 29, 44, 0.5)" : "#F2F2F2");
    root?.style.setProperty("--bg-listing-box",isDark ? "rgba(208, 214, 227, 0.3)" : "#F5F5F5");
    root?.style.setProperty("--bg-governance-box",isDark ? "#171B2B" : "#F5F5F5");
    root?.style.setProperty("--bg-governance-box-decision",isDark ? "#191D2C" : "#FFFFF");
    root?.style.setProperty("--gradient",isDark ? "linear-gradient(180deg, rgba(9, 12, 26, 0.27) 0%, rgba(18, 21, 34, 0) 170.92%, rgba(63, 74, 123, 0) 170.94%)" : "linear-gradient(180deg, rgba(9, 12, 26, 0.01) 0%, rgba(18, 21, 34, 0) 170.92%, rgba(63, 74, 123, 0) 170.94%)");
    root?.style.setProperty("--table",isDark ? "#121525" : "#F5F5F5");
    root?.style.setProperty("--inputs",isDark ? "rgba(50, 53, 80, 0.25)" : "#F8F8F8");
    root?.style.setProperty("--dailybox_inactive",isDark ? "linear-gradient(180deg, #5C7DF9 37.08%, rgba(92, 125, 249, 0) 37.55%)"  : "linear-gradient(180deg, #5C7DF9 37.08%, rgba(92, 125, 249, 0) 37.55%)" );
    root?.style.setProperty("--dailybox_active",isDark ? "linear-gradient(180deg, #43D19B 37.08%, #131727 37.55%)"  : "linear-gradient(180deg, #43D19B 37.08%, #F5F5F5 37.55%)");
    root?.style.setProperty("--btn-outline",isDark ? "#5C7DF9" : "#5C7DF9");
    root?.style.setProperty("--swap",isDark ? "rgba(41, 44, 56, 0.29)" : "rgba(255, 255, 255, 0.3)");
    root?.style.setProperty("--btnInfo",isDark ? "#191D2C" : "#F9F9F9");
    root?.style.setProperty("--circle",isDark ? "#E9E9E9" : "white");
    root?.style.setProperty("--data-gradient",isDark ? "linear-gradient(180deg, rgba(92, 125, 249, 0.19) 0%, rgba(17, 21, 36, 0.09) 77.55%, rgba(18, 22, 38, 0) 100%);" : "linear-gradient(180deg, rgba(92, 125, 249, 0.03) 0%, rgba(17, 21, 36, 0.09) 77.55%, rgba(18, 22, 38, 0) 100%)")
    root?.style.setProperty("--connect-menu",isDark ? "#1C1F34" : "#F5F5F5");
    
// SHADOW
    root?.style.setProperty("--shadow",isDark ? "none" : "rgba(208, 214, 227, 0.3)");
    root?.style.setProperty("--widget-shadow",isDark ? "#161b2e" : "rgba(208, 214, 227, 0.3)");

// BTN BLOCKCHAIN
    root?.style.setProperty("--box_primary",isDark ? "#151929" : "#F2F2F2");
    root?.style.setProperty("--box_active",isDark ? "#273051" : "#FFFFFF");
        // border BTN
        root?.style.setProperty("--box_border_active",isDark ? "#2B3A75" : "rgba(122, 122, 122, 0.1)");
        root?.style.setProperty("--box_border",isDark ? "rgba(122, 122, 122, 0.1)" : "rgba(122, 122, 122, 0.1)");

// EARN SEARCH ASSET
    root?.style.setProperty("--box-secondary",isDark ? "rgba(41, 44, 56, 0.3)" : "#F5F5F5");
// TEXT 
    root?.style.setProperty("--text-grey",isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)");
    root?.style.setProperty("--text-primary",isDark ? "white" : "black");
    root?.style.setProperty("--text-secondary",isDark ? "#808A9D" : "#808A9D");
    root?.style.setProperty("--text-blue",isDark ? "#5C7DF9" : "#5C7DF9");
    root?.style.setProperty("--text-footer-title",isDark ? "white" : "#5C7DF9");
    root?.style.setProperty("--text-footer-text",isDark ? "rgba(88, 102, 126, 0.8)" : "rgba(0, 0, 0, 0.8)");
    root?.style.setProperty("--red",isDark ? "#EA3943" : "#EA3943");
    root?.style.setProperty("--green",isDark ? "#16C784" : "#16C784");
    root?.style.setProperty("--blue",isDark ? "#5C7DF9" : "#5C7DF9");
    root?.style.setProperty("--none",isDark ? "none" : "none");


    // ===================
    // TRASH CAN UNDER
    // =================== 
   

  }, []);
  return (
    <>
      <ChakraProvider resetCSS theme={themeUltime}>

        <script>
          root.style.setProperty('--color-text',colorMode === 'light'? 'blue': 'orange');    </script>
        <Head>
          <title>Mobula | The decentralized data aggregator [Alpha]</title>
          <link rel='icon' type='image/png' href='/fullicon.png' />
          <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500;1,600&family=Ubuntu&display=swap' rel='stylesheet' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, maximum-scale=1'
          ></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description"
            content="Anyone should be able to query reliable data about any crypto-token. Easily. Directly on-chain. Imagine CoinMarketCap, owned by you." />
          <meta name="image" content="/bg2.png" />
          <meta name="url" content="https://mobula.fi" />
          <meta name="keywords" content="Mobula Crypto Data Aggregator" />
          <meta name="author" content="Mobula" />
          <meta name="copyright" content="Mobula" />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="Mobula: The Decentralized Data Aggregator." />
          <meta property="og:image" content="/bg2.png" />
          <meta name="twitter:title" content="Mobula: The Decentralized Data Aggregator" />
          <meta name="twitter:description"
            content="Anyone should be able to query reliable data about any crypto-token. Easily. Directly on-chain. Imagine CoinMarketCap, owned by you." />
          <meta name="twitter:image" content="/bg2.png" />
          <title>Mobula: The decentralized data aggregator.</title>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-225383575-4"></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-44ZEDM6VY3"></script>

          <script dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-225383575-4');
          `}}></script>
          <script dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-44ZEDM6VY3');
          `}}></script>
          <script dangerouslySetInnerHTML={{
            __html: `  window.smartlook||(function(d) {
              var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
              var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
              c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
              })(document);
              smartlook('init', '609bf41d219fd09b67dda978d9dad1a0c7682abd', { region: 'eu' });          
        `}}></script>
        </Head>
       
        <Provider template={AlertTemplate} {...alertOptions}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Header />
            <ColorModeScript initialColorMode={themeUltime.config.initialColorMode} />
            <Component {...pageProps}></Component>
            <Footer />
          </Web3ReactProvider >
        </Provider >
      </ChakraProvider >
    </>
  )
}
