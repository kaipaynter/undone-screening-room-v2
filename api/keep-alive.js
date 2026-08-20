import { createClient } from '@supabase/supabase-js';

export default async function handler(request, response) {
  const authHeader = request.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return response.status(401).send('Unauthorized');
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response.status(500).json({ error: 'Supabase environment variables are not configured.' });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase
    .from('access_passcodes')
    .select('id')
    .limit(1);

  if (error) {
    return response.status(500).json({ error: error.message });
  }

  return response.status(200).json({ ok: true, data });
}