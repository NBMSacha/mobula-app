import RecentlyAdded from '../components/Pages/RecentlyAdded';
import React, { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { cp } from 'fs/promises';

export async function getStaticProps() {
  const settings = { liquidity: 0, volume: 0, onChainOnly: false, default: true }
  const supabase = createClient(
    "https://ylcxvfbmqzwinymcjlnx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
  )

  const { data } = await supabase
    .from('assets')
    .select('id,name,price_change_24h,volume,symbol,logo,market_cap,price,rank,contracts,blockchains,twitter,website,chat,created_at')
    .gte('liquidity', settings.liquidity)
    .gte('volume', settings.volume)
    .order('created_at', { ascending: false })
    .limit(100);

  return {
    props: {
      tokens: data || [],
    },
    revalidate: 120
  }
}

export default function ({ tokens }) {
  return (
    <>
      <RecentlyAdded tokensBuffer={tokens} />
    </>
  )


}
