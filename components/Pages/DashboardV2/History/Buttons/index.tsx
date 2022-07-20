import { Button } from '@chakra-ui/react'

export default function Buttons({title, isActive, setIsActive}) {
    return (
            <Button fontSize={["10px","10px","12px","12px"]} py="6px" mr="10px" _focus={{ boxShadow: "none" }} fontWeight="300"
                    borderRadius="8px" w="105px" bg={isActive === title ? "var(--elections)" : "var(--box-secondary)"}
                    border={isActive === title ? "2px solid var(--box_border_active)" : "0px solid white"}
                    onClick={() => {
                        setIsActive(title)
                    }}
            >
                {title}
            </Button>
    )
}