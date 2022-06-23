// Global Style overrides
import { mode } from '@chakra-ui/theme-tools'

export const styles = {
  global: (props) => ({
    body: {
      fontFamily: 'body',
      color: "var(--text-primary)",
      bg: "#F5F5F5",
      lineHeight: 'base',
    },
    '*::placeholder': {
      color: "var(--text-primary)",
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    },
  }),
}
