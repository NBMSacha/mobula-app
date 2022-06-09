import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import News from "../components/Pages/Main"

export async function getStaticProps() {
  const supabase = createClient(
    "https://ylcxvfbmqzwinymcjlnx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
  )

  const { data } = await supabase.from('assets')
    .select('market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price,rank_change_24h,id,contracts,blockchains,pairs,liquidity')
    .filter('volume', 'gt', 50000)
    .order('market_cap', { ascending: false }).limit(35);

  const { data: metrics } = await supabase.from('metrics').select('*').match({ id: 1 })

  const { data: gainers } = await supabase.from('assets').select('name,price_change_24h,logo,id,liquidity,contracts').filter('volume', 'gt', 50000).order('price_change_24h', { ascending: false }).limit(40)

  // supabase.from('assets').select('name,price_change_24h,logo,id').filter('volume', 'gt', 50000).order('price_change_24h', { ascending: true }).limit(3).then(r => {
  //   setLosers(r.data)
  // });

  const { data: recents } = await supabase.from('assets').select('name,price_change_24h,logo,id').order('created_at', { ascending: false }).limit(3);

  const { data: trendings } = await supabase.from('assets').select('name,price_change_24h,logo,id,views_change_24h').order('views_change_24h', { ascending: false }).limit(3);


  console.log({
    trendings
  })

  return {
    props: {
      tokens: data.filter((token: any) => token.liquidity > 1000 || token.contracts.length == 0),
      gainers: gainers.filter((token: any) => token.liquidity > 10000 || token.contracts.length == 0),
      recents,
      trendings,
      top: (Math.floor(metrics[0].total_assets / 100)),
      ethereum: (Math.floor(metrics[0].total_ethereum_assets / 100)),
      bnb: (Math.floor(metrics[0].total_bnb_assets / 100)),
      polygon: (Math.floor(metrics[0].total_polygon_assets / 100)),
      avalanche: (Math.floor(metrics[0].total_avalanche_assets / 100)),
    },
    revalidate: 120
  }
}

export default function Listing({ darkTheme, tokens, gainers, recents, trendings, top, ethereum, bnb, avalanche, polygon }) {

  return (
    <>

      <News
        darkTheme={darkTheme}
        tokens={tokens} gainers={gainers}
        recents={recents} trendings={trendings} top={top}
        ethereum={ethereum} bnb={bnb}
        avalanche={avalanche} polygon={polygon}
      />

    </>
  )
}