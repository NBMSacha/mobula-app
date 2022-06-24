import { mode } from "@chakra-ui/theme-tools"
export const ButtonStyles = {
    // style object for base or default style
    baseStyle: {},
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants ("outline", "solid")
    variants: {
        primary: (props) => ({
            bg: "var(--box_primary)",
            color: "var(--text-primary)",
            border:"1px solid var(--box_border)",
            boxShadow: "1px 2px 12px 3px var(--shadow)",
            _hover:{
                bg: "var(--box_primary)",
                color: "var(--text-primary)",
                border:"1px solid var(--box_border)",
                boxShadow: "1px 2px 12px 3px var(--shadow)",
            }
        }),
        secondary: (props) => ({
            bg: "var(--box_active)",
            color: "var(--text-primary)",
            border:"1px solid var(--box_border_active)",
            boxShadow: "1px 2px 12px 3px var(--shadow)",
            _hover:{
                bg: "var(--box_active)",
                color: "var(--text-primary)",
                border:"1px solid var(--box_border_active)",
                boxShadow: "1px 2px 12px 3px var(--shadow)",
            }
        }),
        blue: (props) => ({
            bg: "var(--blue)",
            color: "white",
            boxShadow: "1px 2px 12px 3px var(--shadow)"
        }),
        elections: (props) => ({
            bg: "var(--btn-elections)",
            color: "white",
            boxShadow: "1px 2px 12px 3px var(--shadow)"
        }),
    },
    // default values for `size` and `variant`
    defaultProps: {
      size: '',
      variant: '',
    },
  }