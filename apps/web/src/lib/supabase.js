import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://teyjalbmxnbpiusbycte.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_6dqJPyVC7fJ_00nwMRg9Wg_oB_C5AtY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
