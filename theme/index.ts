import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { theme as ChakraTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { ButtonStyles as Button } from "./components/ButtonStyles";
import { InputStyles as Input } from "./components/InputStyles"
import { TextStyles as Text } from "./components/TextStyles"


const overrides = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: () => ({
      body: {
        fontFamily: 'Poppins',
        bg: "dark_primary"
      },
      button: {
        fontFamily: 'Poppins',
      },
    }),
  },
}

export const themeUltime = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'Poppins',
        color: mode('#000', 'whiteAlpha.900')(props),
        bg: mode("bg_white", "dark_primary")(props),
        lineHeight: 'base',
      },
      '*::placeholder': {
        color: mode('gray.400', 'whiteAlpha.400')(props),
      },
      '*, *::before, &::after': {
        borderColor: mode('#000', 'whiteAlpha.300')(props),
        wordWrap: 'break-word',
      },
    }),

  },
  fontFamily: 'Poppins',
  colors: {

    // pagination: "rgba(255, 255, 255, 0.62)",
    // DARK
    dark_primary: "#131727",
    dark_box: "#161A2A",
    dark_btn_election: "#21263A",
    dark_secondary: "rgba(25, 29, 44, 0.5)",
    dark_tertiary: "#111521",
    dark_border: "rgba(239, 242, 245, 0.05)",
    dark_header: "rgba(41, 44, 56, 0.3)",
    dark_input: "#111521",
    dark_input_secondary: '#1A1E2F',
    dark_active: "rgba(255, 255, 255, 0.1)",
    dark_mobile_bg: "rgba(50, 53, 80, 0.25)",
    dark_grey: "rgba(255, 255, 255, 0.62)",
    dark_input_list: '#0C1421',
    dark_box_list: "#191D2C",
    white_grey: "#939393",
    white_mobile_bg: "rgba(255, 255, 255, 0.25)",
    white_border_tendance: "#E5E5E5",
    dark_border_tendance: "rgba(229, 229, 229, 0.1)",
    white_border_title: '#DADADA',
    dark_border_title: "rgb(218, 218, 218, .05)",
    white_sun_moon: '#F8F8F8',
    dark_sun_moon: '#f8f8f86e',
    white_text_tendance: "#3861FB",
    white_border: "#EFF2F5",
    dark_text_tendance: "#5C7DF9",
    sun_moon_color: "#313131",
    subtitle: "#58667E",
    white_chart: "#d5d7dc",
    dark_chart: "#171c2f",
    dark_date_changer: "#6C6C6C",
    white_date_changer: "#EFEFEF",
    kyc: "#262A4D",
    white_secondary_input: "#F3F3F3",
    white_voting: "#FDFDFD",
    dark_decision: "#202433",
    grey_border: "#E5E5E5",
    border_dark_gainer: "rgba(40, 44, 58, 0.5)",
    dark_inactive_gainer:"rgba(50, 53, 80, 0.46)",
    dark_active_gainer:"#405472",
    grey_loser:"#E9E9E9",

    // WHITE
    white_gradient: "linear-gradient(180deg, #EEEEEE 20%, rgba(248, 250, 252, 0) 100.94%)",
    bg_white: "#F5F5F5",
    bg_white_2:"#F2F2F2",
    white_terciary: "#F7F7F7",
    white_input: "rgba(255, 255, 255, 0.3)",
    blue: "#5C7DF9",
    blue_title: "#3753B3",
    shadow_2: '#d0d6e3',
    shadow: 'rgba(208, 214, 227, 0.3)',
    none: "none",
    green: '#16C784',
    red: '#EA3943',

    dark_blue: "#111525",
    btn_border:"rgba(122, 122, 122, 0.1)"

  },

  components: {
    Button,
    Input,
    Text
  }


})



