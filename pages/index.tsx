import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import News from "../components/Main/"

export async function getStaticProps() {
  const supabase = createClient(
    "https://ylcxvfbmqzwinymcjlnx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
  )

  const { data } = await supabase.from('assets')
    .select('market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price,rank_change_24h,id,contracts,liquidity')
    .filter('volume', 'gt', 50000)
    .order('market_cap', { ascending: false }).limit(35);

  return {
    props: {
      tokens: data.filter((token: any) => token.liquidity > 1000 || token.contracts.length == 0),
    },
    revalidate: 120
  }
}

export default function Listing({ tokens }) {

  return (
    <>

      <News tokens={tokens} />

    </>
  )
}