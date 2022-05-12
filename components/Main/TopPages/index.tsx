import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Chart, ChartType, registerables } from 'chart.js'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'react-feather'
import styles from './TopPages.module.scss'
import { PROTOCOL_ADDRESS, supportedRPCs } from '../../../constants';
import {
  formatAmount,
  getTokenPrice,
  getTokenPercentage,
  formatName
} from '../../../helpers/formaters';
import { setTimeout } from 'timers'
import { Send, Twitter, Globe } from "react-feather";

const TopPages = ({token}) => { 
    console.log(token)
    return(
        <>
            <div className={styles["container-pages-btn"]}>
                <div className={styles["pages-btn-box"]}>
                    <ArrowLeft size={20}/>
                    <div>TRj oer jgiohrigh eiog hpi rhiop</div>
                    {}
                </div>
            </div>
        </>
    )
}

export default TopPages;