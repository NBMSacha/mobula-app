import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { theme as ChakraTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const overrides = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: () => ({
      body: {
        fontFamily: 'Poppins',
      },
      button: {
        fontFamily: 'Poppins',
      },
    }),
  },
}

const themeUltime = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('', "")(props),
      }
    })
  },
})

export default themeUltime;
