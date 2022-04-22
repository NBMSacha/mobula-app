import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

function top50() {

    const [tokens, setTokens] = useState([]);

    function formatPrice(price: number): string {
        let stringPrice = String(price);
        for (let i = stringPrice.length - 3; i > 0; i -= 3) {
            stringPrice = stringPrice.slice(0, i) + "," + stringPrice.slice(i);
        }
        return '$' + stringPrice
    }

    useEffect(() => {
        const supabase = createClient(
            "https://ylcxvfbmqzwinymcjlnx.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg2MzIwNDQsImV4cCI6MTk2NDIwODA0NH0.DXxmbgg8G8fc2cCLTg923OWFB6MmLyzoxJzd2XHsivQ",
        )

        supabase.from('tokens').select('*').order('market_cap', { ascending: false }).limit(50).then(r => {
            setTokens(r.data)
        })

    }, [])

    return (
        <>
            <div className="listing">
                <div className="container">

                    <header>
                        <h1>Top 50</h1>
                        <span>
                            Cryptocurrency prices by Market cap. On-chain data only (no centralized exchanges).            </span>
                    </header>
                    <div className="line"></div>
                    <div className="coin-table">
                        <table>
                            <thead>
                                <tr className="table-head">
                                    <th className="token-id">#</th>
                                    <th className="token-coin">Coin</th>
                                    <th className="token-price">Price</th>
                                    <th className="token-24">24h</th>
                                    <th className="token-7">7d</th>
                                    <th className="token-volume">Volume (24h)</th>
                                    <th className="token-marketcap">Market Cap</th>

                                </tr>

                            </thead>
                            <tbody>

                                {
                                    tokens.map((token, index) => {
                                        return <tr className="token-container">
                                            <td className="coin-id">{index + 1}</td>
                                            <td className="coin-name"><img src={token.logo} className="token-logo" alt="token logo" />{token.name}</td>
                                            <td className="coin-price">$40,218.58</td>
                                            <td className="coin-24">-2.0%</td>
                                            <td className="coin-7">10.0%</td>
                                            <td className="coin-volume">$400,000,218.58</td>
                                            <td className="coin-marketcap">{formatPrice(token.market_cap)}</td>
                                        </tr>
                                    }
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default top50