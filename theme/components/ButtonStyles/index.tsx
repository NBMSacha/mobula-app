import { mode } from "@chakra-ui/theme-tools"
export const ButtonStyles = {
    // style object for base or default style
    baseStyle: {},
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants ("outline", "solid")
    variants: {
        primary: (props) => ({
            bg: mode("white_terciary", "var(--chakra-colors-dark_secondary)")(props),
            color: mode("#000","#F7F7F7")(props),
            border:mode("1px solid var(--chakra-colors-dark_border)", "1px solid var(--chakra-colors-border_dark_gainer)"),
            _hover: {
                bg: mode("white", "rgba(255, 255, 255, 0.1)")(props),
                color:mode("black", "white")(props),
                border:mode(" 1px solid var(--chakra-colors-border_dark_gainer)", "1px solid var(--chakra-colors-grey_border)"),
            },
            _active: {
                border:"none",
                boxShadow: "none"
            },
            _focus: {
                boxShadow: "none",
                border:"none",
            },
            boxShadow: mode("1px 2px 12px 3px rgba(208, 214, 227, 0.3)", "none")(props)
        }),
        secondary: (props) => ({
            bg: mode("white", "#2B3A75")(props),
            color: mode("#000","#F7F7F7")(props),
            border:mode("1px solid var(--chakra-colors-dark_border)", "1px solid var(--chakra-colors-border_dark_gainer)"),
            _hover: {
                bg: mode("white", "rgba(255, 255, 255, 0.1)")(props),
                
                border:mode(" 1px solid var(--chakra-colors-border_dark_gainer)", "1px solid var(--chakra-colors-grey_border)"),
                color:mode("black", "white")(props)
            },
            _active: {
                border:"none"
            },
            _focus: {
                boxShadow: "none"
            },
            boxShadow: mode("1px 2px 12px 3px rgba(208, 214, 227, 0.3)", "none")(props)
        }),
    },
    // default values for `size` and `variant`
    defaultProps: {
      size: '',
      variant: '',
    },
  }