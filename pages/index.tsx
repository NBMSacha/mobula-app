import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';

import News from "../components/Main/"
export default function Listing() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg2MzIwNDQsImV4cCI6MTk2NDIwODA0NH0.DXxmbgg8G8fc2cCLTg923OWFB6MmLyzoxJzd2XHsivQ",
    )

    supabase.from('tokens').select('*').order('id', { ascending: false }).limit(50).then(r => {
      setTokens(r.data)
    })

  }, [])
  return (
    <>

      <News />

    </>
  )
}