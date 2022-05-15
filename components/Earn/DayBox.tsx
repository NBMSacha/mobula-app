import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useAlert } from 'react-alert'
import { ethers } from 'ethers'
import styles from './Earn.module.scss'
import { Text, Heading, Flex, Box, Spacer, Button, Image } from '@chakra-ui/react'
import { PROTOCOL_ADDRESS, VAULT_ADDRESS } from '../../constants'

export default function DayBox({ day, streaks, account }) {
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
    return <Flex bg={(streaks == day ? '#32C784' : '#2D3A5C')}
        w='140px' h='140px'
        borderRadius='5px'
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

        <Text fontSize='13px' mt={2} mb={4} fontWeight='800' >Day {day}</Text>
        <Image src={'reward' + Math.min(day, 5) + '.png'} h='30%' ml='auto' mr='auto' />
        <Text fontSize='15px' mt={3} >+{prizePerDay(day)}</Text>
    </Flex>
}
