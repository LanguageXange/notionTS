
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY

if(!supabaseURL || !supabaseKey){
    throw new Error('Missing url or key')
}
export const supabase = createClient(supabaseURL, supabaseKey)