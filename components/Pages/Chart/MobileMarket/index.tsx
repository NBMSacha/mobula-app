import React, { useRef, useState } from 'react';
import { Button } from '@chakra-ui/react';
import styles from "../Charts.module.scss"
import { formatAmount } from '../../../../helpers/formaters';
import { Flex } from "@chakra-ui/react"

function MobileMarket({ baseAsset, shadowColor, liquidity, volume }) {

    const hideRef: any = useRef();
    const hidedaoRef: any = useRef();
    const changeRef: any = useRef();

    function moreStats() {
        try {
            if (hideRef.current.style.display == 'none') {
                console.log('changin style to flex')
                changeRef.current.innerHTML = ' Show Less Stats -'
                hidedaoRef.current.style.display = 'flex'

                return (hideRef.current.style.display = 'flex')
            } else {

                changeRef.current.innerHTML = 'Show More Stats +'
                hidedaoRef.current.style.setProperty('display', 'none', 'important')
                return (hideRef.current.style.display = 'none')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className={styles['mobile-showInfo-container']}>
                <div
                    style={{ 'display': 'none' }}
                    className={styles['mobile-info-element']}
                    id='hide'
                    ref={hideRef}
                >
                    <div className={styles['mobile-info-left-column']}>
                        <div className={styles['mobbox']}>
                            <span className={styles['grey']}>MARKET CAP</span>
                            <p className={(!baseAsset.circulating_supply_addresses || baseAsset.circulating_supply_addresses.length == 0 ? `${styles['numbers']} ${styles['unsure']}` : styles['numbers'])}>
                                ${formatAmount(baseAsset.market_cap)}
                            </p>
                        </div>
                        <div className={styles['mobbox']}>
                            <span className={styles['grey']}>VOLUME (24H)</span>
                            <p className={styles['numbers']}>
                                ${formatAmount(volume || baseAsset.volume)}
                            </p>
                        </div>
                        <div className={styles['mobbox']}>
                            <span className={styles['grey']}>
                                FULLY DILUTED MARKET CAP
                            </span>
                            <p className={styles['numbers']}>
                                $
                                {baseAsset.market_cap_diluted
                                    ? formatAmount(baseAsset.market_cap_diluted)
                                    : '???'}
                            </p>
                        </div>
                    </div>
                    <div className={styles['mobile-info-right-column']}>
                        <div className={styles['mobboxx']}>
                            <span className={styles['grey']}>CIRCULATING SUPPLY</span>
                            <p className={(!baseAsset.circulating_supply_addresses || baseAsset.circulating_supply_addresses.length == 0 ? `${styles['numbers']} ${styles['unsure']}` : styles['numbers'])}>
                                {baseAsset.circulating_supply
                                    ? formatAmount(baseAsset.circulating_supply)
                                    : '???'}{' '}
                                {baseAsset.symbol}
                            </p>
                        </div>
                        <div className={styles['mobboxx']}>
                            <span className={styles['grey']}>TOTAL SUPPLY </span>
                            <p className={styles['numbers']}>
                                {baseAsset.total_supply
                                    ? formatAmount(baseAsset.total_supply)
                                    : '???'}{' '}
                                {baseAsset.symbol}
                            </p>
                        </div>
                        <div className={styles['mobboxx']}>
                            <span className={styles['grey']}>LIQUIDITY </span>
                            <p className={styles['numbers']}>

                                {baseAsset.liquidity
                                    ? '$' + formatAmount(parseInt(liquidity || baseAsset.liquidity))
                                    : '???'}
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    id='hidedao'
                    ref={hidedaoRef}
                    onClick={() => {
                        // mobileDaoBtn()
                    }}
                >
                </button>
                <Button
                    w="90%"
                    display={["flex", "flex", "none", "none"]}
                    boxShadow={`1px 2px 13px 3px ${shadowColor}`}
                    className={styles['btn-more-less']}
                    onClick={() => moreStats()}
                >
                    <span id='change' ref={changeRef} >Show More Stats +</span>
                </Button>
            </div>
        </>
    )
}

export default MobileMarket;