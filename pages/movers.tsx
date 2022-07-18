import {createClient} from '@supabase/supabase-js';
import GainersLosers from '../components/Pages/GainersLosers'

export async function getStaticProps() {
    const settings = {liquidity: 1000, volume: 1000, onChainOnly: false, default: true}
    const supabase = createClient(
        "https://ylcxvfbmqzwinymcjlnx.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )

    const {data: gainers} = await supabase
        .from('assets')
        .select('id,name,price_change_24h,volume,symbol,logo,market_cap, price, rank,contracts,blockchains')
        .gte('liquidity', settings.liquidity)
        .gte('volume', settings.volume)
        .gte('price_change_24h', 0)
        .order('price_change_24h', {ascending: false})
        .limit(100);

    const {data: losers} = await supabase
        .from('assets')
        .select('id,name,price_change_24h,volume,symbol,logo,market_cap, price, rank,contracts,blockchains')
        .gte('liquidity', settings.liquidity)
        .gte('volume', settings.volume)
        .gte('price_change_24h', 0)
        .order('price_change_24h', {ascending: true})
        .limit(100);


    return {
        props: {
            gainers: gainers || [],
            losers: losers || []
        },
        revalidate: 120
    }
}

export default function ({gainers, losers}) {
    return (
        <>
            <GainersLosers gainersBuffer={gainers} losersBuffer={losers}/>
        </>
    )
}
