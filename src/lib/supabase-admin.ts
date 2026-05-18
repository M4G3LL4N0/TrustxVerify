import { createClient } from "@supabase/supabase-js";

type LooseTable = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: [];
};

type TrustxVerifyDatabase = {
  trustxverify: {
    Tables: Record<string, LooseTable>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type TrustxVerifyAdminClient = ReturnType<typeof createClient<TrustxVerifyDatabase, "trustxverify">>;

let cachedAdminClient: TrustxVerifyAdminClient | null = null;

export function getSupabaseAdminClient() {
  if (cachedAdminClient) {
    return cachedAdminClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  cachedAdminClient = createClient(supabaseUrl, serviceRoleKey, {
    db: { schema: "trustxverify" },
  });

  return cachedAdminClient;
}
