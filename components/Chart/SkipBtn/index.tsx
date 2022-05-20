import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Chart, ChartType, registerables } from 'chart.js'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'react-feather'
import styles from './SkipBtn.module.scss'
import { PROTOCOL_ADDRESS, supportedRPCs } from '../../../constants';
import {
    formatAmount,
    getTokenPrice,
    getTokenPercentage,
    formatName,
    getUrlFromName
} from '../../../helpers/formaters';
import { setTimeout } from 'timers'
import { Send, Twitter, Globe } from "react-feather";
import { useRouter } from 'next/router'

const SkipBtn = ({ beforeToken, afterToken }) => {
    const router = useRouter()

    console.log(afterToken.id)

    return (
        <>
            <div className={styles["skip-btn-container"]}>
                <div className={styles["left-skip-btn"]} onClick={() => document.location.href = getUrlFromName(beforeToken.name)}>
                    <button className={styles["blue-skip-btn"]}><ArrowLeft className={styles["arrows"]} /></button>
                    <div className={styles["rank-box-left"]}>
                        <span className={styles["grey-rank"]}>RANK #{beforeToken.rank}</span>
                        <span className={styles["white-name"]}>{beforeToken.name}</span>
                    </div>
                </div>
                <div className={styles["right-skip-btn"]} onClick={() => document.location.href = getUrlFromName(afterToken.name)}>
                    <div className={styles["rank-box-right"]}>
                        <span className={styles["grey-rank"]}>RANK #{afterToken.rank}</span>
                        <span className={styles["white-name"]}>{afterToken.name}</span>
                    </div>
                    <button className={styles["blue-skip-btn"]}><ArrowRight size={40} className={styles["arrows"]} /></button>
                </div>
            </div>
        </>
    )
}

export default SkipBtn;