import { supabase } from './lib/supabaseClient.js/supabaseClient';

export async function smokeTestSupabase() {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

  console.log('[SUPABASE] REACT_APP_SUPABASE_URL:', supabaseUrl);

  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('[SUPABASE] SESSION ERROR:', error);
      return;
    }

    console.log('[SUPABASE] SESSION:', data);
  } catch (err) {
    console.error('[SUPABASE] smokeTest exception:', err);
  }
}
