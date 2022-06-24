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
        color: "var(--text-primary)",
        bg: "var(--background)",
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
    blue: "var(--blue)",
    none: "var(--none)",
    green: 'var(--green)',
    red: 'var(--red)',
  },
  components: {
    Button,
    Input,
    Text
  }
})



