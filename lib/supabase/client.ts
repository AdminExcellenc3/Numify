import { createBrowserClient } from '@supabase/ssr';
import { supabaseConfig, type Database } from './config';

export const supabase = createBrowserClient<Database>(
  supabaseConfig.url,
  supabaseConfig.anonKey
);