import {
    Table,
    Thead,
    Tr,
    Th,
    TableContainer,
  } from "@chakra-ui/react"
import Tbodys from "./Tbodys"
import { useWeb3React } from "@web3-react/core"

export default function Tables({recentlyAdded, validated, isActive, rejected}) {
    const web3React = useWeb3React()
    const accountUser = web3React.account
    return (
        <TableContainer mt="20px" h="440px" overflowY="scroll" className="scroll">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th borderBottom="1px solid var(--box_border) !important" textTransform="capitalize">Token</Th>
                        <Th borderBottom="1px solid var(--box_border) !important" textTransform="capitalize" isNumeric>Times</Th>
                        <Th borderBottom="1px solid var(--box_border) !important" textTransform="capitalize" isNumeric>Status</Th>
                    </Tr>
                </Thead>
                {isActive === "Validated" && (
                    <>
                        {validated.map((token:any,index:number) => {
                           return <Tbodys isActive={isActive} token={token} index={index} />
                        })}
                    </>
                )}
                {isActive === "Refused" && (
                    <>
                        {rejected.map((token:any,index:number) => {
                           return <Tbodys isActive={isActive} token={token} index={index} />
                        })}
                    </>
                )}
                {isActive === "See all history" || isActive === "See all" && (
                    <>
                        {recentlyAdded.map((token:any,index:number) => {
                           return <Tbodys isActive={isActive} token={token} index={index} />
                        })}
                    </>
                )}
                {isActive === "My history" && (
                    <>
                      
                            {recentlyAdded.filter(entry=> entry.votes.map((vote:any) => vote.member).includes(accountUser)).map((token:any,index:number) => {
                                return <Tbodys isActive={isActive} token={token} index={index} />
                            })}
                        
                    </>
                )}
            </Table>
        </TableContainer>
    )
}