import { useState, useEffect } from 'react'
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

export default function App ({ Component, pageProps }) {

  const [darkThemes, setDarkThemes] = useState(false);
  // const [darkThemes, setDarkThemes] = useState( !isDark || false );

      // var isDark = localStorage.getItem("isDark"); 

    useEffect(() => {
     
      var isDark = localStorage.getItem("isDark") == "true"; 
      const root = document.documentElement;
      root?.style.setProperty("--bg-earn",isDark ? "#2D3A5C" : "linear-gradient(180deg, #5C7DF9 37.08%, rgba(92, 125, 249, 0) 37.55%)");

      background: ;


      root?.style.setProperty("--bg-search",isDark ? "#252742" : "#F7F7F7");

      root?.style.setProperty("--bg-color",isDark ? "#05062a" : "#F5F5F5");
      root?.style.setProperty("--text-color", isDark ? "#F5F5F5" : "#05062a");
      root?.style.setProperty("--text-color-tendance", isDark ? "#64D1FF" : "#3861FB");
      root?.style.setProperty("--text-tendance", isDark ? "#b4cfff" : "#58667E");
      root?.style.setProperty("--hover-", isDark ? "#b4cfff" : "#58667E");
      root?.style.setProperty("--bg-top", isDark ? "#05062a" : "#f1f1f1");
      root?.style.setProperty("--border-top", isDark ? "#2E3557" : "#DADADA");
      root?.style.setProperty("--border-top-body", isDark ? "#2e35574d" : "#dadada6b");

     
      root?.style.setProperty("--brand-title", isDark ? "#F5F5F5" : "#3753B3");
      root?.style.setProperty("--bg-white", isDark ? "none" : "#F7F7F7");
      root?.style.setProperty("--brand-title", isDark ? "#F5F5F5" : "#3753B3");
      root?.style.setProperty("--bg-wallet", isDark ? "#5C7DF9" : "#6B5DE0");
      root?.style.setProperty("--border-color", isDark ? "#262a4d" : "rgb(250 250 250 / 100%)");
      root?.style.setProperty("--hover-top",isDark  ? "#2E3557" : "#F1F1F1");
      root?.style.setProperty("--shadow-color-btn", isDark ? "#c8c8c821" : "rgb(208 214 227 / 30%)");
      root?.style.setProperty("--shadow-color", isDark ? "none" : "rgb(208 214 227 / 30%)");
      root?.style.setProperty("--shadow-search", isDark ? "none" : "#b1b1b196");
      root?.style.setProperty("--bg-main", isDark ? "none" : "linear-gradient(180deg,  rgba(248, 250, 252, 0) 0%, #EEEEEE 170.94%)");
      root?.style.setProperty("--active-btn", isDark ? "#DEE9FF" : "white");
      root?.style.setProperty("--bg-news", isDark ? "#05062a" : "#F5F5F5");
      root?.style.setProperty("--bg-earn", isDark ? "rgba(37, 39, 66, 0.3)" : "#f5f5f5");
      root?.style.setProperty("--subtitle", isDark ? "#B1CEFF" : "#05062a");
      root?.style.setProperty("--up-down", isDark ? "#B1CEFF" : "#05062a");
      root?.style.setProperty("--pagination", isDark ? "#F5F5F5" : "#E5E5E5");
      root?.style.setProperty("--btn-hover", isDark ? "#41425a" : "white");
      root?.style.setProperty("--main-mobile", isDark ? "none" : "#ffffff9e");
      
      root?.style.setProperty("--bg-news-box", isDark ? "linear-gradient(180deg, rgba(92, 92, 92, 0.17) 50%, rgba(1, 0, 34, 0.25) 75.97%, #010042 170.91%)" : "linear-gradient(180deg, #EEEEEE 0%, rgba(248, 250, 252, 0) 170.94%)");
      root?.style.setProperty("--border-header", isDark ? "rgba(19, 28, 71, 0.5)" : "rgb(244 244 244 / 50%)");
      root?.style.setProperty("--bg-gainer", isDark ? "rgba(163, 212, 244, 0.05)" : "white");
      root?.style.setProperty("--border-tendance", isDark ? "#2b5177" : "rgb(232, 230, 230)");

      root?.style.setProperty("--input-focus-bg", isDark ? "#05062a" : "white");
      console.log(`Inside UseEffect : ${isDark}`)
      setDarkThemes(isDark)
    }, [darkThemes]);
    console.log(`_app darkThemes : ${darkThemes}`)
  
   
    // useEffect(() => {
    //   const root = document.documentElement;
    //   root?.style.setProperty("--bg-color",darkThemes ? "#05062a" : "#fff");
    //   root?.style.setProperty("--text-color", darkThemes ? "#FFF" : "#05062a");
    //   root?.style.setProperty("--text-color-tendance", darkThemes ? "#b4cfff" : "#05062a");
    //   root?.style.setProperty("--brand-title", darkThemes ? "#fff" : "#3753B3");
    //   root?.style.setProperty("--bg-white", darkThemes ? "#262A4D" : "#fff");
    //   root?.style.setProperty("--brand-title", darkThemes ? "#fff" : "#3753B3");
    //   root?.style.setProperty("--bg-wallet", darkThemes ? "#5C7DF9" : "#6B5DE0");
    //   root?.style.setProperty("--border-color", darkThemes ? "#262a4d" : "rgb(250 250 250 / 100%)");
    //   root?.style.setProperty("--hover-top", darkThemes ? "#2E3557" : "#F1F1F1");
    //   root?.style.setProperty("--shadow-color-btn", darkThemes ? "#b1b1b196" : "#F1F1F1");
    //   root?.style.setProperty("--shadow-color", darkThemes ? "#c8c8c863" : "#c8c8c863");
    //   root?.style.setProperty("--shadow-search", darkThemes ? "none" : "#b1b1b196");
    //   root?.style.setProperty("--bg-main", darkThemes ? "none" : "#f6f6f62b");
    //   root?.style.setProperty("--active-btn", darkThemes ? "none" : "#f6f6f6");
    //   root?.style.setProperty("--border-header", darkThemes ? "#rgb(46 53 87 / 80%)" : "rgb(244 244 244 / 50%)");
    //   root?.style.setProperty("--bg-gainer", darkThemes ? "rgba(163, 212, 244, 0.05)" : "white");
    //   root?.style.setProperty("--border-tendance", darkThemes ? "#2b5177" : "rgb(232, 230, 230)");
    //   console.log(`Inside UseEffect : ${darkThemes}`)
    // }, [darkThemes]);
    // console.log(`_app darkThemes : ${darkThemes}`)

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
          <script dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || [];

            function gtag(){dataLayer.push(arguments);}
          
            gtag('js', new Date());
          
            gtag('config', 'G-44ZEDM6VY3');
          `}}></script>
          <script dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];

            function gtag(){dataLayer.push(arguments);}
          
            gtag('js', new Date());
          
            gtag('config', 'UA-225383575-4');
          `}}></script>
        </Head>

        <Provider template={AlertTemplate} {...alertOptions}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Header darkTheme={darkThemes} />

            <Component darkTheme={darkThemes} {...pageProps}></Component>


            <Footer darkTheme={darkThemes} setDarkTheme={setDarkThemes}/>

          </Web3ReactProvider>
        </Provider>
      </>
    )
  }
