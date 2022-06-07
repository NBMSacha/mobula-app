import React, { useRef } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import styles from "../Charts.module.scss"
import { formatAmount } from '../../../../helpers/formaters';

function DesktopMarket({baseAsset, liquidity, volume}) {

    return (
    <>
        <Flex className={styles['chart-bottom-left']} display={["none", "none", "none", "flex"]}>
                <div className={styles['left-top-box']}>
                  <span>
                    <p
                      className={`${styles['text-top-chart']} ${styles['topOne']}`}
                    >
                      MARKET CAP
                    </p>
                    <p className={(!baseAsset.circulating_supply_addresses || baseAsset.circulating_supply_addresses.length == 0 ? `${styles['text-bottom-chart']} ${styles['unsure']}` : styles['text-bottom-chart'])}>
                      ${formatAmount(baseAsset.market_cap)}
                      {/* {(!baseAsset.circulating_supply_addresses || baseAsset.circulating_supply_addresses.length == 0 ? <div className={styles['tooltip']}>This data may not be accurate.</div> : <></>)} */}
                    </p>
                  </span>
                  <span>
                    <p className={styles['text-top-chart']}>VOLUME (24H)</p>
                    <p className={styles['text-bottom-chart']}>
                      ${formatAmount(volume > 0 ? volume : baseAsset.volume || '???')}
                    </p>
                  </span>
                  <span>
                    <p className={styles['text-top-chart']}>
                      FULLY DILUTED MARKET CAP
                    </p>
                    <p className={styles['text-bottom-chart']}>
                      $
                      {baseAsset.market_cap_diluted
                        ? formatAmount(baseAsset.market_cap_diluted)
                        : '???'}
                    </p>
                  </span>
                  <span>
                    <p className={styles['text-top-chart']}>CIRCULATING SUPPLY</p>
                    <p className={(!baseAsset.circulating_supply_addresses || baseAsset.circulating_supply_addresses.length == 0 ? `${styles['text-bottom-chart']} ${styles['unsure']}` : styles['text-bottom-chart'])}>
                      {baseAsset.circulating_supply
                        ? formatAmount(baseAsset.circulating_supply)
                        : '???'}{' '}
                      {baseAsset.symbol}
                    </p>
                  </span>
                  <span>
                    <p className={styles['text-top-chart']}>TOTAL SUPPLY </p>
                    <p className={styles['text-bottom-chart']}>
                      {baseAsset.total_supply
                        ? formatAmount(baseAsset.total_supply)
                        : '???'}{' '}
                      {baseAsset.symbol}
                    </p>
                  </span>
                  <span>
                    <p className={styles['text-top-chart']}>LIQUIDITY</p>
                    <p className={styles['text-bottom-chart']}>

                      {baseAsset.liquidity
                        ? '$' + formatAmount(parseInt(liquidity || baseAsset.liquidity))
                        : '???'}
                    </p>
                  </span>
                </div>

              </Flex>
        </>
    )
}

export default DesktopMarket;