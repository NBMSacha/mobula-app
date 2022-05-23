import React from 'react'
import {ArrowLeft, ArrowRight } from 'react-feather'
import styles from './SkipBtn.module.scss'
import {getUrlFromName} from '../../../helpers/formaters';

const SkipBtn = ({ beforeToken, afterToken }) => {
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