import { useState } from "react"
import { Flex, Box, Text, Image, Link, Button } from "@chakra-ui/react";
import { formatName } from "../../../../helpers/formaters"

export default function Boxs({partner}) {

    const [ readMore, setReadMore ] = useState(false)

    return(
                <Box mr={["0px","0px","20px","20px"]}  my="10px" w={["100%","100%","310px","31%"]} borderRadius="12px" border="1px solid var(--box_border)" boxShadow="1px 2px 13px 3px var(--shadow)">
                    <Flex h="110px" align="center" w="100%" justify="center" bg="var(--bg-partner)">
                        <Image w="100%" h="110px" objectFit="cover" src={partner.logo} />
                    </Flex>
                    <Box p="20px 20px" textAlign={["center","center","start","start"]}>
                        <Text fontWeight="600" mb="10px">{partner.name}</Text>
                        {!readMore ? (
                            <Text fontSize="12px" color="var(--text-grey)">{partner.description.length > 250 ? formatName(partner.description, 200) : partner.description}</Text>
                        ) : (
                            <Text fontSize="12px" color="var(--text-grey)">{partner.description}</Text>
                        )}
                         {partner.description.length > 250  && (
                            <Button _focus={{ boxShadow: "none" }} mb="10px" fontSize="12px" onClick={() => { setReadMore(!readMore)}}>Read more</Button>
                         )}
                        <Link target="_blank"  href={partner.website} >
                            <Text fontSize="10px" mt={partner.description.length > 250 ? "0px" : "10px"} color="var(--text-grey)" display={["none","none","flex","flex"]}>{partner.website}</Text>
                        </Link>
                    </Box>
                </Box>
    )
}