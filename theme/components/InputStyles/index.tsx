import { mode } from "@chakra-ui/theme-tools"
export const InputStyles = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: (props) => ({
      bg: mode("red", "green")(props),
      color: mode("#000", "#F7F7F7")(props),
    }),
  },
  // default values for `size` and `variant`
  defaultProps: {
    size: '',
    variant: '',
  },
}