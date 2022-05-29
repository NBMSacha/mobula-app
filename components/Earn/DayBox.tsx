import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useAlert } from 'react-alert'
import { ethers } from 'ethers'
import styles from './Earn.module.scss'
import { Text, Heading, Flex, Box, Spacer, Button, Image } from '@chakra-ui/react'
import { PROTOCOL_ADDRESS, VAULT_ADDRESS } from '../../constants'

export default function DayBox({ day, streaks, account, darkTheme }) {
    const alert = useAlert();

    function prizePerDay(day: number) {
        if (day <= 3) {
            return 10
        }

        switch (day) {
            case 4:
                return 20
            case 5:
                return 20
            case 6:
                return 25
            case 7:
                return 30
            case 8:
                return 50
        }
    }
    return (
        <>
        {darkTheme ? ( 
            <Flex bg={(streaks == day ? 'linear-gradient(180deg, #43D19B 37.08%, #22283B 37.55%)' : 'linear-gradient(180deg, #5C7DF9 37.08%, #252B3F 37.55%)')}
                
                borderRadius='10px'
                mb="10px"
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
                <Text fontSize='13px'fontWeight='800' color="white" className={styles["day-text"]}>Day {day}</Text>
                <Flex justify="center" align='center' mb="10px">
                    <Image src='fullicon.png' h='30px'   />
                    <Text mb="0px !important" fontSize='15px' ml="5px">+{prizePerDay(day)}</Text>
                </Flex>
            </Flex>
        ) : (
            <Flex bg={(streaks == day ? 'linear-gradient(180deg, #43D19B 37.08%, #F5F5F5 37.55%)' : 'linear-gradient(180deg, #5C7DF9 37.08%, rgba(92, 125, 249, 0) 37.55%)')}
                boxShadow="0px 0 10px #d2d2d2"
                mb="40px"
                
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
    
                <Text fontSize='13px'fontWeight='800' color="white" className={styles["day-text"]}>Day {day}</Text>
                <Flex justify="center" align='center' mb="10px">
                    <Image src='fullicon.png' h='30px'   />
                    <Text mb="0px !important" fontSize='15px' ml="5px">+{prizePerDay(day)}</Text>
                </Flex>
            </Flex>
        )}
        </>
    )
}
