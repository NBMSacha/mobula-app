import React, { useState, useEffect } from 'react'
import { useColorModeValue, Flex, Box, Text, Stack,Image, Button } from '@chakra-ui/react'
import Checkboxs from './Checkboxs'
import { CalendarIcon, UpDownIcon } from "@chakra-ui/icons"
import styles from "./Sliders.module.scss"
import RangeContainer from "./RangeContainer"
import DatePicker, { CalendarContainer } from "react-datepicker";
import Top from "../../../Utils/HeaderTable"
import CalendarPicker from 'react-native-calendar-picker';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

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

export default function Sliders({setEvmCheckbox, evmCheckbox, setShowMore, showMore}) {
    const [checkBoxs, setCheckboxs] = useState([])
    const [isSearch, setIsSearch ] = useState(false)
    return (
        <>
            <Flex mx="auto" mt="10px" w="90%" maxWidth="1500px" className={styles["column-wrap"]} mb="30px">
                <RangeContainer showMore={showMore} setShowMore={setShowMore}/>
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
            {/* {isSearch ? (
                <Top title={"Advanced Settings"}/>
            ) : (
                <></>
            )}  */}
        </>
    )
}
