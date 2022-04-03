import Newlisting from '../components/Newlisting'
import { createClient } from '@supabase/supabase-js'
import Token from '../components/Newlisting'

export async function getServerSideProps() {
const supabase = createClient(
    "https://ylcxvfbmqzwinymcjlnx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg2MzIwNDQsImV4cCI6MTk2NDIwODA0NH0.DXxmbgg8G8fc2cCLTg923OWFB6MmLyzoxJzd2XHsivQ",
)

const { data } = await supabase.from('tokens').select('*').order('id', {ascending: false}).limit(15)
return {
    props: {
        tokens: data,
        },
    }
}

export default function Listing ({tokens}) {
    return (
        <>
        <div className="listing">
    <div className="container">
    
        <header>
            <h1>Recently Added</h1>
            <span>
            Find out what are the latest tokens listed on Mobula!
            </span>
        </header>
        <div className="line"></div>
    <table>
<thead>
<tr className="table-head">
  <th className="token-id">#</th>
  <th className="token-name">Name</th>
  <th className="token-links">Links</th>
  <th className="token-contract">Contract</th>
  <th className="token-blockchain">Blockchain</th>
  <th className="token-timestamp">Added</th>
</tr>

</thead>
<tbody>
{
    tokens.map((token) => {
    return <Token key={token.id} id={tokens.indexOf(token) + 1}  logo={token.logo} name={token.name} symbol={token.symbol} chat={token.chat} discord={token.discord} website={token.website} twitter={token.twitter} contract={token.contract} blockchain={token.blockchain} created_at={token.created_at} />
    }
    )
}
</tbody>
</table>
    </div>
    </div>
        </>
    )
}