import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Chart, ChartType, registerables } from 'chart.js'
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
    const [description ,setDescription] = useState(null)

    function seeMore() {
        
    }
    
    function getExplorer(chain: string) {
        console.log('chain : ' + chain)
        for (const rpc of supportedRPCs) {
            if (rpc.name === chain) {
                return rpc.explorer;
            }
        }
    }

    return(
        <div className={styles["main-container"]}>
            <div className={styles["left"]}>
                <div className={token.kyc == null && token.audit == null ? styles["left-top-box-center"] : styles["left-top-box"]}>
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
                    <p className={styles["description"]} id="description" ref={refDescription}>
                        {token.description.length > 700? (
                            formatName(token.description, 700)
                        ) : ( 
                            token.description
                            )}
                        

                    </p>
                    
                </div>
                {token.description.length > 700? (
                    <button className={styles["more"]} 
                    onClick={(e) => {
                        
                        if(active) {
                            setActive(false);
                            refDescription.current.innerText = formatName(token.description, 700);
                        } else {
                            refDescription.current.innerText = token.description;
                            setActive(true)
                        }
                        }
                    }>
                    {active? ( <span>Less</span> ) : ( <span>More</span>)}
                </button>
                    ) : ( 
                        <div></div>
                )}
                
            </div>
            <div className={styles["right"]} ref={refContract}id="contract">
            {token.contracts[0] && (
                <h2 className={styles["contract-title"]} >Contract(s)</h2>
            )}
                
                {token.contracts.map((contract: string, idx: number) => {
                    return (
                        <a href={getExplorer(token.blockchains[idx]) + '/token/' + token.contracts[idx]} className={styles["contract-address"]}>
                            {contract}
                        </a>
                    )  
                })}
            </div>
        </div>
    )
} 

export default ProjectInfo