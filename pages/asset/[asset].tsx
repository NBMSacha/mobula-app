import React, { useState, useEffect } from 'react'
import Chart from '../../components/Chart/index.jsx';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { fromUrlToName } from '../../helpers/formaters'

export async function getStaticPaths() {
    return {
        paths: [
            { params: { asset: 'bitcoin' } } // See the "paths" section below
        ],
        fallback: true
    };
}

export const getStaticProps = async ({ params }) => {
    const supabase = createClient(
        "https://ylcxvfbmqzwinymcjlnx.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM",
    )

    const { data } = await supabase
        .from('assets')
        .select('*')
        .or('name.ilike.' + fromUrlToName(params.asset))

    return {
        props: {
            asset: data[0]
        },
        revalidate: 120
    }
}

function Dataprovider({ asset }) {
    const router = useRouter()

    if (router.isFallback) {
        return <></>
    } else {
        return (
            <Chart baseAsset={asset} />
        )
    }


}

export default Dataprovider