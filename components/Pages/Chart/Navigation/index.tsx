import React, { useRef } from 'react';
import { Button, Box, Flex, Image, Text } from '@chakra-ui/react';
import styles from "../Charts.module.scss"
import { formatAmount } from '../../../../helpers/formaters';
import ProjectInfo from "../ProjectInfo"
import Swap from "../Swap";
import Charts from "../Charts"

function Navigation({visible, state, setState, borderBox}) {


    return (
    <>

        <Flex className={styles['chart-header']} borderBottom={["none", "none", `1px solid ${borderBox}`, `1px solid ${borderBox}`]} >

            <Button
            variant={state === 'Overview' ? "secondary" : "none"}
            onClick={() => { setState('Overview'); }}
            className={`${styles['chart-header-link']} ${styles['active-chart']}`}
            >
            Overview
            </Button>

            {state === 'Overview' && visible ? (

            <p className={styles['warning']}>Loading...</p>
            ) : (
            <></>
            )}
            <Button variant={state === 'Details' ? "secondary" : "none"} className={`${styles['chart-header-link']} ${styles['active-chart']}`} onClick={() => { setState('Details'); console.log(state) }}>
            <span>Infos</span>
            </Button>
            <Button variant={state === 'Charts' ? "secondary" : "none"} onClick={() => { setState('Charts'); console.log(state) }} className={`${styles['chart-header-link']} ${styles['active-chart']}`}>
            <span>Market</span>
            </Button>
            <Button disabled variant={state === 'Buy' ? "secondary" : "none"} onClick={() => { setState('Buy'); console.log(state) }} className={`${styles['chart-header-link']} ${styles['active-chart']}`}>
            <span>Buy</span>
            </Button>
            <a
            href='https://discord.gg/2a8hqNzkzN'
            className={`${styles['chart-header-link']} ${styles['report-problem']}`}
            >
            <span id='inner'>A problem ? report to the DAO </span>
            </a>
        </Flex>
        </>
    )
}

export default Navigation;