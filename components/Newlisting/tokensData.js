const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(
    'https://fupfohzkkzlgqtksonoy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1cGZvaHpra3psZ3F0a3Nvbm95Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0ODU3NDQwNCwiZXhwIjoxOTY0MTUwNDA0fQ.yG_PBOTllUhVvKSNjPQbT6tm6_JZnycI0cZ72MCqxWA',
)

function loadTokens() {
    supabase.from('tokens').select('*').then(r => {
        return r.body
    })
}
loadTokens()