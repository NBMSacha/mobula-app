import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { themeUltime } from '../theme'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <script dangerouslySetInnerHTML={{
          __html: `
        function getInitialColorMode() {
          const persistedColorPreference = window.localStorage.getItem('color-mode');
          const hasPersistedPreference = typeof persistedColorPreference === 'string';
          // If the user has explicitly chosen light or dark,
          // let's use it. Otherwise, this value will be null.
          if (hasPersistedPreference) {
            return persistedColorPreference;
          }
          // If they haven't been explicit, let's check the media
          // query (not for now, only dark theme default)
          // const mql = window.matchMedia('(prefers-color-scheme: dark)');
          // const hasMediaQueryPreference = typeof mql.matches === 'boolean';
          // if (hasMediaQueryPreference) {
          //   return mql.matches ? 'dark' : 'light';
          // }
          // If they are using a browser/OS that doesn't support
          // color themes, let's default to 'light'.
          return 'dark';
        }

        const colorMode = getInitialColorMode();
        const root = document.documentElement;
        root?.style.setProperty("--initial-color-mode", colorMode);
        root?.style.setProperty("--background", colorMode == 'dark' ? "#131727" : "#F5F5F5");
        root?.style.setProperty("--bg-main-box", colorMode == 'dark' ? "#111524" : "#F2F2F2");
        root?.style.setProperty("--bg-secondary-box", colorMode == 'dark' ? "rgba(25, 29, 44, 0.5)" : "#F2F2F2");
        root?.style.setProperty("--bg-listing-box", colorMode== 'dark' ? "rgba(208, 214, 227, 0.3)" : "#F5F5F5");
        root?.style.setProperty("--bg-governance-box", colorMode== 'dark' ? "#171B2B" : "#F5F5F5");
        root?.style.setProperty("--bg-partner", colorMode == 'dark' ? "#171B2B" : "#E5E5E5");
        root?.style.setProperty("--bg-governance-box-decision", colorMode== 'dark' ? "#191D2C" : "#FFFFF");
        root?.style.setProperty("--gradient", colorMode == 'dark' ? "linear-gradient(180deg, rgba(9, 12, 26, 0.27) 0%, rgba(18, 21, 34, 0) 170.92%, rgba(63, 74, 123, 0) 170.94%)" : "linear-gradient(180deg, rgba(9, 12, 26, 0.01) 0%, rgba(18, 21, 34, 0) 170.92%, rgba(63, 74, 123, 0) 170.94%)");
        root?.style.setProperty("--table", colorMode == 'dark' ? "#121525" : "#F5F5F5");
        root?.style.setProperty("--inputs", colorMode == 'dark' ? "rgba(50, 53, 80, 0.25)" : "#F8F8F8");
        root?.style.setProperty("--dailybox_inactive", colorMode == 'dark' ? "linear-gradient(180deg, #5C7DF9 37.08%, #131727 37.55%)" : "linear-gradient(180deg, #5C7DF9 37.08%, rgba(92, 125, 249, 0) 37.55%)");
        root?.style.setProperty("--dailybox_active", colorMode == 'dark' ? "linear-gradient(180deg, #43D19B 37.08%, #141828 37.55%)" : "linear-gradient(180deg, #43D19B 37.08%, #F5F5F5 37.55%)");
        root?.style.setProperty("--btn-outline", colorMode == 'dark' ? "#5C7DF9" : "#5C7DF9");
        root?.style.setProperty("--swap", colorMode == 'dark' ? "rgba(41, 44, 56, 0.29)" : "rgba(255, 255, 255, 0.3)");
        root?.style.setProperty("--btnInfo", colorMode == 'dark' ? "#191D2C" : "#F9F9F9");
        root?.style.setProperty("--circle", colorMode == 'dark' ? "#E9E9E9" : "white");
        root?.style.setProperty("--data-gradient", colorMode == 'dark' ? "linear-gradient(180deg, rgba(92, 125, 249, 0.19) 0%, rgba(17, 21, 36, 0.09) 77.55%, rgba(18, 22, 38, 0) 100%);" : "linear-gradient(180deg, rgba(92, 125, 249, 0.03) 0%, rgba(17, 21, 36, 0.09) 77.55%, rgba(18, 22, 38, 0) 100%)")
        root?.style.setProperty("--connect-menu", colorMode == 'dark' ? "#1C1F34" : "#F5F5F5");
        root?.style.setProperty("--elections", colorMode == 'dark' ? "#273051" : "#5C7DF9");
        root?.style.setProperty("--gradient_airdrop", colorMode == 'dark' ? "linear-gradient(180deg, rgba(28, 32, 47, 0.5) 0%, rgba(28, 32, 47, 0) 100%)" : "#FAFAFA");
        // SHADOW
        root?.style.setProperty("--shadow", colorMode == 'dark' ? "none" : "rgba(208, 214, 227, 0.3)");
        root?.style.setProperty("--widget-shadow", colorMode == 'dark' ? "#161b2e" : "rgba(208, 214, 227, 0.3)");
    
        // BTN BLOCKCHAIN
        root?.style.setProperty("--box_primary", colorMode == 'dark' ? "#151929" : "#F2F2F2");
        root?.style.setProperty("--box_active", colorMode == 'dark' ? "#273051" : "#ededed");
        // border BTN
        root?.style.setProperty("--box_border_active", colorMode == 'dark' ? "#2B3A75" : "rgba(122, 122, 122, 0.1)");
        root?.style.setProperty("--box_border", colorMode == 'dark' ? "rgba(122, 122, 122, 0.1)" : "rgba(122, 122, 122, 0.1)");
        root?.style.setProperty("--daily-border", colorMode == 'dark' ? "#191D2D" : "#E5E5E5");
        // EARN SEARCH ASSET
        root?.style.setProperty("--box-secondary", colorMode == 'dark' ? "rgba(41, 44, 56, 0.3)" : "#F5F5F5");
        // TEXT 
        root?.style.setProperty("--text-grey", colorMode == 'dark' ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)");
        root?.style.setProperty("--text-primary", colorMode == 'dark' ? "white" : "black");
        root?.style.setProperty("--text-secondary", colorMode == 'dark' ? "#808A9D" : "#808A9D");
        root?.style.setProperty("--text-blue", colorMode == 'dark' ? "#5C7DF9" : "#5C7DF9");
        root?.style.setProperty("--text-footer-title", colorMode == 'dark' ? "white" : "#5C7DF9");
        root?.style.setProperty("--text-footer-text", colorMode == 'dark' ? "rgba(88, 102, 126, 0.8)" : "rgba(0, 0, 0, 0.8)");
        root?.style.setProperty("--red", colorMode == 'dark' ? "#EA3943" : "#EA3943");
        root?.style.setProperty("--green", colorMode == 'dark' ? "#16C784" : "#16C784");
        root?.style.setProperty("--blue", colorMode == 'dark' ? "#5C7DF9" : "#5C7DF9");
        root?.style.setProperty("--none", colorMode == 'dark' ? "none" : "none");
        `}}></script>
        <body>
          <ColorModeScript initialColorMode={themeUltime.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
