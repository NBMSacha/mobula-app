import { Flex, Icon, Input} from "@chakra-ui/react"
import {Search2Icon} from "@chakra-ui/icons"

export default function Search({search, setSearch}) {

    return (
                    <Flex ml="auto" bg="var(--box-secondary)" border={`1px solid var(--box_border)`}
                        align="center" position="relative" borderRadius="8px"
                        display={["none", "none", "flex", "flex"]}  
                        boxShadow={`1px 2px 12px 3px var(--shadow)`} w="140px"
                    >
                        <Flex ml="10px" mr="5px" opacity=".6" _placeholder={{ overflow: "hidden", whiteSpace: "nowrap", marginRight: "10px", textOverflow: "ellipsis" }}>
                            <Icon boxSize="15px" mr="10px" as={Search2Icon} />
                        </Flex>
                        <Input
                            // value={token}
                            type="text"
                            bg="none"
                            border="none"
                            name="search"
                            fontSize="14px"
                            _placeholder={{ color: "none" }}
                            placeholder="Search"
                            onChange={(e) => setSearch(e.target.value)}
                            id="search"
                            autoFocus
                        ></Input>
                    
                    </Flex>
    )
}