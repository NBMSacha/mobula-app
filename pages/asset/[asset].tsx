import React, { useState, useEffect } from 'react'
import Chart from '../../components/Pages/Chart/index.jsx';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { fromUrlToName } from '../../helpers/formaters'
import { ethers } from 'ethers';

export async function getStaticPaths() {
    return {
        paths: [
            { params: { asset: 'Pundi X' } } // See the "paths" section below
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

    useEffect(() => {

        try {
            const provider = new ethers.providers.Web3Provider((window as any).ethereum)

            if (asset && asset.id && provider) {
                provider.listAccounts().then(accounts => {
                    fetch('https://mobulaspark.com/ping?id=' + asset.id + "&name=" + asset.name + "&account=" + accounts[0]).catch(r => { })
                })
            } else if (asset && asset.id) {
                fetch('https://mobulaspark.com/ping?id=' + asset.id + "&name=" + asset.name).catch(r => { })
            }
        } catch (e) {
            fetch('https://mobulaspark.com/ping?id=' + asset.id + "&name=" + asset.name).catch(r => { })
        }

    }, [])


    if (router.isFallback) {
        return <></>
    } else {
        return (
            <Chart baseAsset={asset} />
        )
    }


}

export default Dataprovider