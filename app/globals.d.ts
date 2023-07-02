import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/utils/db_types";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
      PORT?: string;
      PWD: string;
    }
  }
}

export interface AppContext {
  supabase: SupabaseClient<Database>;
}
