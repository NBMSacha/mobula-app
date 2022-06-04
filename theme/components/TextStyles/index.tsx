import { mode } from "@chakra-ui/theme-tools"

export const TextStyles = {
    // style object for base or default style
    baseStyle: {},
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants ("outline", "solid")
    variants: {
        primary: (props) => ({
            mb: "15px",
            fontSize: "xl",
            color: mode("gray.600", "gray.400")(props)
        }),
    },
    // default values for `size` and `variant`
    defaultProps: {
        size: '',
        variant: '',
    },
}