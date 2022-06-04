import React, { useState, useRef } from 'react'
import styles from './ProjectInfo.module.scss'
import { supportedRPCs } from '../../../constants';
import { formatName } from '../../../helpers/formaters';
import { Send, Twitter, Globe } from "react-feather";
import Contract from '../../Utils/Contract';
import {Flex, Button, useColorModeValue, Link } from "@chakra-ui/react"

const ProjectInfo = ({ token, blockchain }) => {

    const [active, setActive] = useState(false);
    const refDescription = useRef(null);
    const refContract = useRef(null)
    
    function getExplorer(chain: string) {
        console.log('chain : ' + chain)
        for (const rpc of supportedRPCs) {
            if (rpc.name === chain) {
                return rpc.explorer;
            }
        }
    }
    const bg = useColorModeValue("none", "kyc")
    const shdw = useColorModeValue("var(--chakra-colors-shadow)", "none")
    return (
        <div className={styles["main-container"]}>
            <div className={styles["left"]}>
                <Flex className={token.kyc == null && token.audit == null ? styles["left-top-box-center"] : styles["left-top-box"]}  >
                    <Flex >
                        <Flex mr="50px" className={styles["social-links"]}>
                            {token.website !== "" ? (
                                <a href={token.website} target="_blank"><Globe className={styles["icons"]} /></a>
                            ) : (<></>)}
                            {token.twitter !== "" ? (
                                <a href={token.twitter} target="_blank"><Twitter className={styles["icons"]} /></a>
                            ) : (<></>)}
                            {token.chat !== "" ? (
                                <a href={token.chat} target="_blank"><Send className={styles["icons"]} /></a>
                            ) : (<></>)}
                        </Flex>

                        <div className={styles["audit-links"]}>
                            {token.kyc !== null ? (
                                <Link href={token.kyc} bg={bg} boxShadow={`1px 2px 12px 3px ${shdw}`} target="_blank" className={styles["kyc"]} onClick={() => console.log(token.kyc)}>KYC</Link>
                            ) : (<></>)}
                            {token.audit !== null ? (
                                <Link href={token.audit} bg={bg} boxShadow={`1px 2px 12px 3px ${shdw}`} target="_blank" className={styles["audit"]} onClick={() => console.log(token.audit)}>Audit</Link>
                            ) : (<></>)}
                        </div>
                    </Flex>
                </Flex>
                <div className={styles["left-top-box"]}>
                    <p className={styles["description"]} id="description" ref={refDescription}>
                        {token.description ? token.description.length > 700 ? formatName(token.description, 700) : token.description : 'No description for this asset.'}
                    </p>

                </div>
                {token.description.length > 700 ? (
                    <button className={styles["more"]}
                        onClick={(e) => {

                            if (active) {
                                setActive(false);
                                refDescription.current.innerText = formatName(token.description, 700);
                            } else {
                                refDescription.current.innerText = token.description;
                                setActive(true)
                            }
                        }
                        }>
                        {active ? (<span>Less</span>) : (<span>More</span>)}
                    </button>
                ) : (
                    <div></div>
                )}

            </div>
           
            <Flex className={styles["right"]} ref={refContract} id="contract">
                {token.contracts[0] && (
                    <h2 className={styles["contract-title"]}>Contract(s)</h2>
                )}
                <Flex  wrap={["wrap","wrap","wrap","nowrap"]} direction={["row","row","row","column"]} justify="space-around" h={["220px","220px","220px","220px"]} className={styles["scroller"]}>
                    {token.contracts.map((contract: string, idx: number) => {
                    
                            return <Contract contract={contract} blockchain={token.blockchains[idx]}></Contract>
                            // return <a href={getExplorer(token.blockchains[idx]) ? getExplorer(token.blockchains[idx]) + '/token/' + token.contracts[idx] : ''} className={styles["contract-address"]}>
                            //     {contract}
                            // </a>

                     
                    })}
                </Flex>
                
            </Flex>
        </div>
    )
}

export default ProjectInfo