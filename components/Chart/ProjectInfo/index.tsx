import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Chart, ChartType, registerables } from 'chart.js'
import Tendance from '../Header/Tendance'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ArrowUp, ArrowDown } from 'react-feather'
import styles from './ProjectInfo.module.scss'
import { PROTOCOL_ADDRESS, supportedRPCs } from '../../../constants';
import {
  formatAmount,
  getTokenPrice,
  getTokenPercentage,
  formatName
} from '../../../helpers/formaters';
import { setTimeout } from 'timers'
import { Send, Twitter, Globe } from "react-feather";

const ProjectInfo = ({ token }) => {

    const [ active, setActive] = useState(false);
    const refDescription = useRef(null);
    const refContract = useRef(null)

    function seeMore() {
        refDescription.current.innerText = token.description;
        setActive(true)
    }

    function getExplorer(chain: string) {
        console.log('chain : ' + chain)
        for (const rpc of supportedRPCs) {
            if (rpc.name === chain) {
                return rpc.explorer;
            }
        }
    }

    useEffect(() => {
        for(var i=0;i<5;i++) {
            try{
                const newContract = document.createElement("a");
                newContract.classList.add(`${styles["contract-address"]}`);
                refContract.current.appendChild(newContract);
                newContract.href = getExplorer(token.chains) + '/token/' + token.contracts[i];
                newContract.innerHTML = token.contracts[i]
            } catch(err) {
                console.log(err)
            }
        }
    }, [])
    
    return(
        <div className={styles["main-container"]}>
            <div className={styles["left"]}>
                <div className={styles["left-top-box"]}>
                    <div className={styles["social-links"]}>
                        <a href={token.website}><Globe className={styles["icons"]}/></a>
                        <a href={token.twitter}><Twitter className={styles["icons"]}/></a>
                        <a href={token.chat}><Send className={styles["icons"]}/></a>
                    </div>   
                    <div className={styles["audit-links"]}>
                        {token.kyc !== null && (
                            <button className={styles["kyc"]}>KYC</button>
                        )}
                        {token.audit !== null && (
                            <button className={styles["audit"]}>Audit</button>
                        )}
                    </div>
                </div>
                <div className={styles["left-top-box"]}>
                    <p className={styles["description"]} id="description" ref={refDescription}>{formatName(token.description, 700)}
                    </p>
                    
                </div>
                <button className={styles["more"]} 
                    onClick={() => {
                        seeMore()
                        if(active) {
                            setActive(false);
                            refDescription.current.innerText = formatName(token.description, 700);
                            }
                        }
                    }>
                    {active? ( <span>Less</span> ) : ( <span>More</span>)}
                </button>
            </div>
            <div className={styles["right"]} ref={refContract}id="contract">
                <h2 className={styles["contract-title"]} >Contract(s)</h2>
            </div>
        </div>
    )
} 

export default ProjectInfo