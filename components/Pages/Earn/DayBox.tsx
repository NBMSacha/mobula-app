import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useAlert } from 'react-alert'
import { ethers } from 'ethers'
import styles from './Earn.module.scss'
import { Text, Heading, Flex, Box, Spacer, Button, Image, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import { PROTOCOL_ADDRESS, VAULT_ADDRESS } from '../../../constants'

export default function DayBox({ day, streaks, account, darkTheme }) {
    const alert = useAlert();
    const [mobile] = useMediaQuery('(max-width: 768px)')

    function prizePerDay(day: number) {
        if (day <= 3) {
            return 1
        }

        switch (day) {
            case 4:
                return 2
            case 5:
                return 2
            case 6:
                return 3
            case 7:
                return 4
            case 8:
                return 5
        }
    }
    console.log(prizePerDay(day), mobile)
    const inactive = useColorModeValue("linear-gradient(180deg, #5C7DF9 37.08%, #FFFFFF 37.55%)", "linear-gradient(180deg, #5C7DF9 37.08%, #252B3F 37.55%)")
    const active = useColorModeValue("linear-gradient(180deg, #43D19B 37.08%, #FFFFFF 37.55%)", "linear-gradient(180deg, #43D19B 37.08%, #22283B 37.55%)")
    const shadow = useColorModeValue("var(--chakra-colors-shadow)", "none")
    return (
        <>
            {darkTheme ? (
                <Flex bg={(streaks == day ? active : inactive)}

                    borderRadius='10px'
                    mb="0px"
                    justify='center'
                    className={styles['daily-box']}
                    cursor={streaks == day ? 'pointer' : ''}
                    flexDir={'column'}
                    onClick={() => {
                        if (streaks == day) {
                            fetch('https://mobulaspark.com/streak?account=' + account)
                                .then(r => r.json())
                                .then(r => {
                                    if (r.success) {
                                        alert.success('Successfully claimed your MOBL. ')
                                    } else {
                                        alert.show(r.error)
                                    }

                                })
                        }
                    }}
                >
                    <Text fontSize='13px' fontWeight='800' color="white" className={styles["day-text"]}>Day {day}</Text>
                    <Flex justify="center" align='center' mb="10px">
                        {prizePerDay(day) == 1 && (
                            <Image src={mobile ? 'reward1.png' : 'reward1.png'} h='30px' />
                        )}
                        {prizePerDay(day) == 2 && (
                            <Image src={mobile ? 'reward1.png' : 'reward2.png'} h='30px' />
                        )}
                        {prizePerDay(day) == 3 && (
                            <Image src={mobile ? 'reward1.png' : 'reward3.png'} h='30px' />
                        )}
                        {prizePerDay(day) == 4 && (
                            <Image src={mobile ? 'reward1.png' : 'reward4.png'} h='30px' />
                        )}
                        {prizePerDay(day) == 5 && (
                            <Image src={mobile ? 'reward1.png' : 'reward4.png'} h='30px' />
                        )}

                        <Text mb="0px !important" fontSize='15px' ml="5px">+{prizePerDay(day)}</Text>
                    </Flex>
                </Flex>
            ) : (
                <Flex bg={(streaks == day ? active : inactive)}
                    boxShadow={`1px 2px 12px 3px ${shadow}`}

                    borderRadius='10px'
                    justify='center'
                    className={styles['daily-box']}
                    cursor={streaks == day ? 'pointer' : ''}
                    flexDir={'column'}
                    onClick={() => {
                        if (streaks == day) {
                            fetch('https://mobulaspark.com/streak?account=' + account)
                                .then(r => r.json())
                                .then(r => {
                                    if (r.success) {
                                        alert.success('Successfully claimed your MOBL. ')
                                    } else {
                                        alert.show('You already claim today\'s rewards.')
                                    }

                                })
                        }
                    }}
                >

                    <Text fontSize='13px' fontWeight='800' color="white" className={styles["day-text"]}>Day {day}</Text>
                    <Flex justify="center" align='center' mb="10px">
                        <Image src='fullicon.png' h='30px' />
                        <Text mb="0px !important" fontSize='15px' ml="5px">+{prizePerDay(day)}</Text>
                    </Flex>
                </Flex>
            )}
        </>
    )
}
