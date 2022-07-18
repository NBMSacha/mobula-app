import { Grid, GridItem } from '@chakra-ui/react'
import { Text, Heading, Flex, Box, Spacer, Button, useColorModeValue, Icon, Image } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { PROTOCOL_ADDRESS, VAULT_ADDRESS } from '../../../../../constants'
import { ethers } from 'ethers'
import { useAlert } from 'react-alert'
import styles from "./Rank.module.scss"

export default function Rank({goodChoices, badChoices, tokensOwed, title}) {
    const web3React = useWeb3React()
    const alert = useAlert()
    return (
        <Flex h="100%" w='50%' align="center" justify="center" direction="column" p="30px 20px">
            <Flex align="center">
                <Flex direction="column" align="center" color="green" mr="25px">
                    <Text className={styles["decisionFont"]}  mb="15px">Correct Decisions</Text>
                    <Flex align="center" justify="center" h="45px" className={styles["decisionBox"]} bg="#191D2C" borderRadius="10px" >
                        <Text fontSize="15px">{goodChoices}</Text>
                    </Flex>
                </Flex>
                <Box mt="30px">
                    <Image src="/updownarrow.png" />
                </Box>
                <Flex direction="column" align="center" color="red"  ml="25px">
                    <Text className={styles["decisionFont"]} mb="15px">Wrong Decisions</Text>
                        <Flex align="center" justify="center" h="45px" className={styles["decisionBox"]} bg="#191D2C" borderRadius="10px" >
                            <Text fontSize="15px">{badChoices}</Text>
                        </Flex>
                    </Flex>
            </Flex>
            <Text fontSize="12px" color="var(--text-grey)" my="20px">Mobula owes you <Box as="span" fontSize="14px" color="var(--text-primary)">{tokensOwed + ' MOBL'}</Box></Text>
            <Button _focus={{ boxShadow: "none" }} fontSize="12px" py="8px" borderRadius="6px" px="25px" bg="var(--elections)" fontWeight="300" border="2px solid var(--box_border_active)"
             onClick={async (e) => {
                e.preventDefault()

                try {
                    var provider = new ethers.providers.Web3Provider(web3React.library.provider);
                    var signer = provider.getSigner()
                } catch (e) {
                    alert.show(
                        'You must connect your wallet to access the Dashboard.'
                    )
                }

                try {
                    const contract = new ethers.Contract(
                        PROTOCOL_ADDRESS,
                        [
                            'function claimRewards() external',
                            'function claimFinalRewards() external'
                        ],
                        signer
                    )

                    if (title == 'Rank I') await contract.claimRewards()
                    if (title == 'Rank II') await contract.claimFinalRewards()

                } catch (e) {
                    alert.show("You don't have anything to claim.")
                    console.log(e.data.message)
                }
            }}
            >Claim MOBL</Button>
        </Flex>
    )
}