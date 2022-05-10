import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { theme as ChakraTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const overrides = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'Poppins',
        bg: '#05062a',
      },
      button: {
        fontFamily: 'Poppins',
      },
    }),
  },
}

// 3. extend the theme
const customTheme = extendTheme(overrides)

export default customTheme
