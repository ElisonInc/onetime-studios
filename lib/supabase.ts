import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;
let supabaseServerInstance: SupabaseClient | null = null;

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getSupabaseKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

function getServiceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    const url = getSupabaseUrl();
    const key = getSupabaseKey();
    if (!url || !key) {
      throw new Error('Missing Supabase environment variables');
    }
    supabaseInstance = createClient(url, key);
  }
  return supabaseInstance;
}

export function getSupabaseServer(): SupabaseClient {
  if (!supabaseServerInstance) {
    const url = getSupabaseUrl();
    const key = getSupabaseKey();
    if (!url || !key) {
      throw new Error('Missing Supabase environment variables');
    }
    const serviceKey = getServiceKey();
    supabaseServerInstance = createClient(url, serviceKey || key);
  }
  return supabaseServerInstance;
}

// Backwards compatibility exports
export const supabase = getSupabase;
export const supabaseServer = getSupabaseServer;
