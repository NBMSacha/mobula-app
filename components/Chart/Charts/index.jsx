import React, { useEffect, useState, useRef } from 'react'
import { extendTheme, Flex, Box, Text, Spacer, Image, Button} from '@chakra-ui/react';
import AllCharts from "./AllCharts/index.jsx";

const Charts = ({baseAsset}) => {

     var volume = "Volume";
     var rank = "Rank";
     var liquidity = "Liquidity";
     var holders = "Holders";

     if (baseAsset.volume_history.volume.length <=25) {
         volume = "No Volume"
     }
     if (baseAsset.rank_history.rank.length <=25) {
        rank = "No Rank"
    }
    if (baseAsset.liquidity_history.liquidity.length <=25) {
        liquidity = "No Liquidity"
    }

     const getChart = async (id, timeframe) => {
        const supabase = createClient(
          'https://ylcxvfbmqzwinymcjlnx.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM'
        )
        if (title == "Rank") {
          if (timeframe == '1D') {
            return baseAsset ? baseAsset.rank_history.rank
              .filter((entry) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
              .map((price) => [price[0], price[1] * 1000000000])
              
              : null
          } else if (timeframe == '7D') {
            return baseAsset ? baseAsset.rank_history.rank
              .filter((entry) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
              .map((price) => [price[0], price[1] * 1000000000])
              : null
          }
        }
        if (title == "Liquidity") {
          if (timeframe == '1D') {
            return baseAsset ? baseAsset.liquidity_history.liquidity
              .filter((entry) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
              .map((price) => [price[0], price[1] * 1000000000])
              : null
          } else if (timeframe == '7D') {
            return baseAsset ? baseAsset.liquidity_history.liquidity
              .filter((entry) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
              .map((price) => [price[0], price[1] * 1000000000])
              : setIsTrueDay(null)
              
          }
        }
        if (title == "Volume") {
          if (timeframe == '1D') {
            return baseAsset ? baseAsset.volume_history.volume
              .filter((entry) => entry[0] + 24 * 60 * 60 * 1000 > Date.now())
              .map((price) => [price[0], price[1] * 1000000000])
              : null
          } else if (timeframe == '7D') {
            return baseAsset ? baseAsset.volume_history.volume
              .filter((entry) => entry[0] + 7 * 24 * 60 * 60 * 1000 > Date.now())
              .map((price) => [price[0], price[1] * 1000000000])
              : null
          } else if (timeframe == '1M') {
            const { data: old } = await supabase
              .from('history')
              .select('volume_history')
              .match({ asset: id })
            return old[0] ? old[0].volume_history
              .filter((entry) => entry[0] + 30 * 24 * 60 * 60 * 1000 > Date.now())
              .map((price) => [price[0], price[1] * 1000000000])
              : null
          } else if (timeframe == '3M') {
            const { data: old } = await supabase
              .from('history')
              .select('volume_history')
              .match({ asset: id })
            return old[0] ? old[0].volume_history
              .filter((entry) => entry[0] + 90 * 24 * 60 * 60 * 1000 > Date.now())
              .map((price) => [price[0], price[1] * 1000000000])
              : null
          } else if (timeframe == '1Y') {
            const { data: old } = await supabase
              .from('history')
              .select('volume_history')
              .match({ asset: id })
            return old[0] ? old[0].volume_history
              .filter(
                (entry) => entry[0] + 356 * 24 * 60 * 60 * 1000 > Date.now()
              )
              .map((price) => [price[0], price[1] * 1000000000])
              : null
          } else if (timeframe == 'ALL') {
            const { data: old } = await supabase
              .from('history')
              .select('volume_history')
              .match({ asset: id })
            return old[0] ? old[0].volume_history
              .map((price) => [price[0], price[1] * 1000000000])
              : alert("teeeeeeeeeeeeeeeeeeee")
          }
          if(null) {
            alert("no chart avaible")
          }
          
        }
      }
      console.log(baseAsset.rank_history.rank.length)
      console.log(baseAsset.volume_history.volume.length)
      console.log(baseAsset.liquidity_history.liquidity.length)
    
    return (   
        <Flex w="100%" wrap="wrap" justify="space-around" align="space-around" h="100%" pb={8}>
            <Flex w="100%"  wrap="wrap" justify='space-around' >
                <AllCharts baseAsset={baseAsset} title={volume} idx={0}/>
                <AllCharts baseAsset={baseAsset} title={rank} idx={1}/>
                <AllCharts baseAsset={baseAsset} title={liquidity} idx={3}/>
                <AllCharts baseAsset={baseAsset} title={holders} idx={4}/>
            </Flex>
        </Flex>
    )
}

export default Charts;