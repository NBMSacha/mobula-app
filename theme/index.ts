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
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: '#05062a',
      },
      button: {
        fontFamily: 'Inter',
      },
      '*::placeholder': {},
      '*, *::before, &::after': {},
    }),
  },
}

// 3. extend the theme
const customTheme = extendTheme(overrides)

export default customTheme
