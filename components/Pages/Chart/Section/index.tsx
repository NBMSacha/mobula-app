import React, { useRef } from 'react';
import { Button, Box, Flex, Image, Text } from '@chakra-ui/react';
import styles from "../Charts.module.scss"
import { formatAmount } from '../../../../helpers/formaters';
import ProjectInfo from "../ProjectInfo"
import Swap from "../Swap";
import Charts from "../Charts"

function Section({baseAsset, state, timeFormat, dateChangerBg, setTimeFormat, day, week, month, active, year, all}) {


    return (
    <>

                {state === 'Charts' && (
                    <Charts baseAsset={baseAsset} />
                  )}
                <div className={styles['chart-content']}>
                    <div className={styles['canvas-container']}>

                      {state === 'Details' && (
                        <ProjectInfo token={baseAsset} blockchain={baseAsset.blockchains} />
                      )}
                      {state === 'Buy' && (
                        <Swap baseAsset={baseAsset} />
                      )}
                      {state === 'Overview' && (
                        <Box mt={["0px", "0px", "50px"]}>
                          <canvas id='chart' className={styles["chartCanvas"]}></canvas>
                          <Flex
                            bg={dateChangerBg}
                            className={styles['change-chart-date']}
                            style={{
                              display: 'flex',
                              justifyContent: 'end',
                              marginLeft: 'auto',
                            }}
                          >
                            {(!day || (day.price && day.price.length != 0)) ? timeFormat === "1D" ? (
                              <Button
                                onClick={() => {
                                  setTimeFormat('1D')
                                }}
                                className={`${styles['button-chart']} ${styles['button-chart-active']} ${styles['d']}`} color={active} style={{ margin: "0px !important" }}
                                id='1d'
                              >
                                1D
                              </Button>
                            ) : (
                              <button
                                onClick={() => {
                                  setTimeFormat('1D')
                                }}
                                className={`${styles['button-chart']} ${styles['d']}`}
                                color="grey"
                              >
                                1D
                              </button>
                            ) : <></>}
                            {(!week || (week.price && week.price.length)) ? timeFormat === "7D" ? (
                              <Button
                                color={active}
                                onClick={() => {
                                  setTimeFormat('7D')
                                }}
                                className={`${styles['button-chart']} ${styles['button-chart-active']}`}

                                id='7d'
                              >
                                7D
                              </Button>
                            ) : (
                              <button
                                onClick={() => {
                                  setTimeFormat('7D')
                                }}
                                className={styles['button-chart']}
                                color="grey"

                              >
                                7D
                              </button>
                            ) : <></>}


                            {(!month || (month.price && month.price.length)) ? timeFormat === "30D" ? (
                              <Button
                                color={active}
                                onClick={() => {
                                  setTimeFormat('30D')
                                }}
                                className={`${styles['button-chart']} ${styles['button-chart-active']}`}

                                id='30d'
                              >
                                1M
                              </Button>
                            ) : (
                              <button
                                onClick={() => {
                                  setTimeFormat('30D')
                                }}
                                className={styles['button-chart']}
                                color="grey"
                                id='30d'
                              >
                                1M
                              </button>
                            ) : <></>}

                            {(!year || (year.price && year.price.length)) ? timeFormat === "1Y" ? (
                              <Button
                                color={active}
                                onClick={() => {
                                  setTimeFormat('1Y')
                                }}
                                className={`${styles['button-chart']} ${styles['button-chart-active']}`}
                                id='1Y'
                              >
                                1Y
                              </Button>
                            ) : (
                              <button
                                onClick={() => {
                                  setTimeFormat('1Y')
                                }}
                                className={styles['button-chart']}
                                color="grey"
                                id='1Y'
                              >
                                1Y
                              </button>
                            ) : <></>}
                            {(!all || (all.price && all.price.length)) ? timeFormat === "ALL" ? (
                              <Button
                                color={active}
                                onClick={() => {
                                  setTimeFormat('ALL')
                                }}
                                className={`${styles['button-chart']} ${styles['button-chart-active']}`}

                                id='ALL'
                              >
                                ALL
                              </Button>
                            ) : (
                              <button
                                onClick={() => {
                                  setTimeFormat('ALL')
                                }}
                                className={styles['button-chart']}
                                color="grey"
                                id='ALL'
                              >
                                ALL
                              </button>
                            ) : <></>}
                          </Flex>

                        </Box>
                      )}

                    </div>
                  </div>
        </>
    )
}

export default Section;