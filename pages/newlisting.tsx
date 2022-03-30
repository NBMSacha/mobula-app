import Newlisting from '../components/Newlisting'
import { createClient } from '@supabase/supabase-js'

export async function getStaticProps() {
const supabase = createClient(
    "",
    "",
)

const { data } = await supabase.from('tokens').select('*').order('id', {ascending: false})
return {
    props: {
        tokens: data,
        },
    }
}

export default function ({tokens}) {
    return (
        <>
        <Newlisting tokens={tokens}/>
        </>
    )
}