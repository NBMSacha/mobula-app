import React, { useState } from "react";
import { Globe} from "react-feather"
import { Text, Flex, Image, Button, Link, Icon } from "@chakra-ui/react";
import { supportedRPCs } from "../../../../constants";
import styles from "./ReviewToken.module.scss"
import Vote from "./Vote"
import Contract from "./Contract"
import MobileContract from "./MobileContract"

function ReviewToken({token, changeDisplay, voteToken }) {

    const [utilityScore, setUtilityScore] = useState(0);
    const [socialScore, setSocialScore] = useState(0);
    const [trustScore, setTrustScore] = useState(0);
    const [marketScore, setMarketScore] = useState(0);

    function getExplorer(chain: string) {
        for (const rpc of supportedRPCs) {
            if (rpc.name === chain) {
                return rpc.explorer;
            }
        }
    }
    return (
        <Flex className={styles["container"]} direction="column" m="auto" justify="center" mt="28px" maxWidth="1400px">
            <Flex justify="center" direction={["column", "column", "column", "row"]} mb="10px">
                {/* COIN INFO */}
                <Flex w={["100%", "100%", "100%", "60%"]} direction="column" bg="var(--bg-governance-box)" boxShadow={`1px 2px 12px 3px var(--shadow)`} borderRadius="12px">
                    <Flex w="100%" justify="space-between" borderBottom={["none", "none", `1px solid var(--box_border)`, `1px solid var(--box_border)`]} py={["15px", "15px", "30px", "30px"]} px={["25px", "25px", "40px", "40px"]}>
                        <Flex align="center">
                            <Flex align="center" >
                                <Image mr="15px" src={token.logo} h={["30px", "30px", "39px", "39px"]} w={["30px", "30px", "39px", "39px"]} />
                                <Text fontSize={["15px", "15px", "30px", "30px"]}>{token.name}</Text>
                            </Flex>
                        </Flex>
                        <Flex align="center">
                            <Flex align="center" px="10px">
                                {token.website && (
                                    <Link _focus={{boxShadow:"none"}} href={token.website} target="_blank">
                                        <Icon mr={["0px", "0px", "0px", "0px"]} fontSize={["15px", "15px", "25px", "25px"]} mt="5px" as={Globe} />
                                    </Link>
                                )}
                                {token.twitter && (
                                    <Link _focus={{boxShadow:"none"}} href={token.twitter} target="_blank">
                                        <Image ml="10px" mr="10px" h={["20px", "20px", "32px", "32px"]} src="/new-twitter.png" />
                                    </Link>
                                )}
                                {token.discord && (
                                    <Link _focus={{boxShadow:"none"}} href={token.discord} target="_blank">
                                        <Image mr="10px" h={["18px", "18px", "30px", "30px"]} w={["18px", "18px", "30px", "30px"]} src="/new-discord.png" />
                                    </Link>
                                )}
                                {token.chat.length > 0 ? (
                                    <Link _focus={{boxShadow:"none"}} href={token.chat} target="_blank">
                                        <Image h={["16px", "16px", "23px", "23px"]} w={["16px", "16px", "23px", "23px"]} src="/new-tlg.png" />
                                    </Link>
                                ) : ( <></>)}
                            </Flex>
                        </Flex>
                        <Flex align="center" display={["none", "none", "flex", "flex"]}>
                            <Flex align="center" px="10px">
                                {token.kyc && (
                                    <Link _focus={{boxShadow:"none"}} href={token.kyc} target="_blank" _hover={{ textDecoration: "none" }}>
                                        <Button variant="primary" mr="15px" borderRadius="8px" py="5px" w="90px" bg="var(--background)">KYC</Button>
                                    </Link>
                                )}
                                {token.audit && (
                                    <Link _focus={{boxShadow:"none"}} href={token.audit} target="_blank" _hover={{ textDecoration: "none" }}>
                                        <Button variant="primary" borderRadius="8px" py="5px" w="90px" bg="var(--background)">Audit</Button>
                                    </Link>
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex align="center" display={["flex", "flex", "none", "none"]}>
                        <Flex fontSize="11px" align="center" justify="space-between" px="10px" w="90%" mx="auto" mt="5px">
                            {token.kyc.length > 0 ?? 
                                <Link href={token.kyc}>
                                    <Button variant="primary" mr="15px" borderRadius="8px" py="5px" w="80px" bg="var(--background)">KYC</Button>
                                </Link> 
                            }
                            {token.audit.length > 0 ??
                                <Link href={token.audit}>
                                     <Button variant="primary" mr="15px" borderRadius="8px" py="5px" w="80px" bg="var(--background)">Audit</Button>
                                </Link> 
                            }
                            {token.chat.length > 0 ?? 
                                <Link href={token.chat}>
                                     <Button variant="primary" borderRadius="8px" py="5px" w="80px" bg="var(--background)">Telegram</Button>
                                </Link>
                            }
                        </Flex>
                    </Flex>
                    <Flex w="100%" p={["15px 25px", "15px 25px", "40px", "40px"]}>
                        <Text width="fit-content" fontSize={["10px", "10px", "15px", "15px"]} >{token.description}</Text>
                    </Flex>
                    {/* MOBILE CONTRACTS */}
                    <MobileContract token={token}/>
                </Flex>
                {/* Vote*/}
                <Vote voteToken={voteToken} token={token} updateScoreUtility={setUtilityScore} updateScoreMarket={setMarketScore} updateScoreTrust={setTrustScore} updateScoreSocial={setSocialScore} marketScore={marketScore} utilityScore={utilityScore} trustScore={trustScore} socialScore={socialScore} />
            </Flex>
            {/* Contract */}
            <Contract token={token}/>
        </Flex>
    )
}

export default ReviewToken; 