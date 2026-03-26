import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

type AppSupabaseClient = ReturnType<typeof createConfiguredClient>;

let cachedClient: AppSupabaseClient | null = null;

function createConfiguredClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    db: { schema: "trustxverify" },
  });
}

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  if (!cachedClient) {
    cachedClient = createConfiguredClient();
  }

  return cachedClient;
}
