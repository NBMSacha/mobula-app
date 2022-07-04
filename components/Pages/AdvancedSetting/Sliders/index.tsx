import React, { useEffect, useState, useRef, useContext } from 'react'
import { useColorModeValue, Flex, Box, Text, Stack,Image, Button } from '@chakra-ui/react'
import Checkboxs from './Checkboxs'
import { CalendarIcon, UpDownIcon } from "@chakra-ui/icons"
import styles from "./Sliders.module.scss"
import RangeContainer from "./RangeContainer"
import DatePicker, { CalendarContainer } from "react-datepicker";
import HeaderTable from "../../../Utils/HeaderTable"
import CalendarPicker from 'react-native-calendar-picker';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import axios from 'axios';

const Calendar = () => {
    const [startDate, setStartDate] = useState(null);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
   
    return (
      <DatePicker calendarClassName={styles["calendar"]} selected={startDate} onChange={(date:Date) => setStartDate(date)} placeholderText="From all (Defaut)"/>
    );
  };

export const ContextObject = React.createContext(undefined);

export default function Sliders({setEvmCheckbox, evmCheckbox, setShowMore, showMore, tokens, setTokens, blockchains}) {

    const [checkBoxs, setCheckboxs] = useState([])
    const [isSearch, setIsSearch ] = useState(false)

    const [display, setDisplay] = useState('default');
    const { account } = useWeb3React();
    const [textResponsive, setTextResponsive] = useState(false);
    const router = useRouter();
    const [orderBy, setOrderBy]: [any, Function] = useState();

    const [volume, setVolume] = useState([0, 1_000_000])
    const [liquidity, setLiquidity] = useState([0, 1_000_000])
    const [marketCap, setMarketCap] = useState([15_263,1_000_000])
    const [holders, setHolders] = useState([54_221,545_221])
    const [tlgUsers, setTlgUsers] = useState([4522,152_856])
    const [price, setPrice] = useState([4551, 54_666])
    const [setting, setSetting] = useState({ 
        liquidity,
        volume: volume,
        market_cap: marketCap,
        holders,
        tlg_users: tlgUsers,
        price_change:price,
        onChainOnly: false,
        default: true 
    })

    const [ isActiveVolume, setIsActiveVolume] = useState(false)
    const [isActiveLiquidity, setIsActiveLiquidity] = useState(false)
    const [ isActiveMarketCap, setIsActiveMarketCap ] = useState(false)
    
   
  
    function getTokensToDisplay() {
        return tokens;
    }
    async function showCheckBoxAudited() {
        const supabase = createClient(
            "https://ylcxvfbmqzwinymcjlnx.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
        )
        supabase
        .from('assets')
        .select('kyc,audit,blockchains,market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price,rank_change_24h,id,contracts,blockchains,pairs,liquidity,rank')
        .filter('kyc', 'neq', checkBoxs.includes("kyc") ? null : 1 )
        .filter('kyc', 'neq', checkBoxs.includes("kyc") ? "" : 1 )
        .filter('audit', 'neq', checkBoxs.includes("audited") ? null : 1 )
        .filter('audit', 'neq', checkBoxs.includes("audited") ? "" : 1 )
        .filter('volume', 'lte', isActiveVolume ? setting.volume[1] : "10000000000000000" )
        .filter('volume', 'gte', isActiveVolume ? setting.volume[0] :  0)
        .filter('liquidity', 'lte', isActiveLiquidity ? setting.liquidity[1] : "10000000000000000")
        .filter('liquidity', 'gte', isActiveLiquidity ? setting.liquidity[0] :  0)
        .filter('market_cap', 'lte', isActiveMarketCap ? setting.market_cap[1] : "10000000000000000" )
        .filter('market_cap', 'gte', isActiveMarketCap ? setting.market_cap[0] :  0)
        .then(r => {
            setTokens(r.data)
            console.log(r.data, r.error)
        })
    }

   useEffect(()=> {
    showCheckBoxAudited()
   },[isSearch])

    return (
        <ContextObject.Provider value={{
            setting,
            setSetting,
            setLiquidity,
            setMarketCap,
            setVolume,
            setHolders,
            setPrice,
            setTlgUsers,
            liquidity,
            volume,
            tlgUsers,
            marketCap,
            price,
            holders,
            isActiveVolume,
            setIsActiveVolume,
            isActiveLiquidity,
            setIsActiveLiquidity,
            isActiveMarketCap,
            setIsActiveMarketCap,
        }}>
            <Flex mx="auto" mt="10px" w="90%" maxWidth="1500px" className={styles["column-wrap"]} mb="30px">
                <RangeContainer setShowMore={setShowMore} showMore={showMore} />
                <Flex className={styles["row-wrap"]}>
                    <Flex direction="column" mr="10px" w="100%" className={styles["checkboxs"]}> 
                        <Flex  direction="column" p="20px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px" > 
                            <Checkboxs setCheckboxs={setCheckboxs} checkBoxs={checkBoxs} condition={"three"} />
                        </Flex>
                        <Flex mt="10px" pt="10px" direction="column" p="20px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px" > 
                            <Checkboxs setCheckboxs={setCheckboxs} checkBoxs={checkBoxs} condition={"two"}/>
                        </Flex>
                    </Flex>
                    
                    <Flex direction="column" align="center" w="100%" mt={["10px", "10px","0px", "0px"]}> 
                        <Flex h="100%" direction="column" align="center" p="20px" border="1px solid var(--box_border)" _focus={{ boxShadow: "none"}} borderRadius="12px" w="100%"> 
                            <Text fontSize="14px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">First on-chain trade activity</Text>
                            <Button display="flex" justifyContent="center" color="var(--text-primary) !important" fontSize="14px !important" _focus={{ boxShadow: "none" }} opacity="1" py="10px" px="10px" borderRadius="10px" mt="20px" border="1px solid var(--box_border)" >
                                <CalendarIcon ml="20px" mr="10px" />
                                <Calendar />
                            </Button>
                            <Button fontSize="14px !important" _focus={{ boxShadow: "none" }} color="var(--text-primary) !important" opacity="1" py="10px" px="10px" borderRadius="10px" mt="20px" border="1px solid var(--box_border)" >
                                <CalendarIcon ml="20px" mr="10px"/>
                                <Calendar />
                            </Button>
                        </Flex>   
                        <Flex  direction="column" justify="center" align="center" py="19px" px="20px" border="1px solid var(--box_border)" mt="10px" _focus={{ boxShadow: "none"}} borderRadius="12px" w="100%"className={styles["button-box"]}> 
                            <Button onClick={() => setIsSearch(!isSearch)} color="white" _focus={{ boxShadow: "none" }} py="14px" px="20px" borderRadius="10px" mt="0px" w={["90%","90%","100%","100%"]} border="1px solid var(--box_border)" bg="var(--elections)">
                                Search
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>  
            {isSearch ? (
                 <HeaderTable title={"Advanced Settings"} setOrderBy={setOrderBy} textResponsive={textResponsive} display={display} orderBy={orderBy} getTokensToDisplay={getTokensToDisplay}/>
             
            ) : (
                <></>
            )} 
        </ContextObject.Provider>
    )
}
