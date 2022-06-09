import RecentlyAdded from '../components/Pages/RecentlyAdded';
import React, { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { cp } from 'fs/promises';


export default function () {
  const [tokens, setTokens] = useState([])
  async function getCreatedAt() {

    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )
    supabase.from('assets').select('market_cap,volume,logo,volume,name,symbol,twitter,website,chat,discord,price_change_24h,price_change_7d,price,rank_change_24h,id,contracts,liquidity,created_at, rank').order('created_at', { ascending: false }).limit(100).then(r => {
      if (r.data) {
        setTokens(r.data)
      }
    })
  }

  useEffect(() => {
    getCreatedAt()
  }, [tokens])


  return (
    <>
      <RecentlyAdded tokens={tokens} />
    </>
  )


}
