// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://shcucrzxkoecptlaysto.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoY3Vjcnp4a29lY3B0bGF5c3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MDAyMTQsImV4cCI6MjA1NzI3NjIxNH0.oIx0zMO0lE3IU_qfo6ZdXPBp6aAoEllmYsFrjENv-F0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);