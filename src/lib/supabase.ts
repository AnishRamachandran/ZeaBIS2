import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'Admin' | 'Delivery Manager' | 'Project Manager' | 'Finance Manager' | 'Account Manager' | 'Team Member';

export interface UserRoleData {
  user_role_id: string;
  user_id: string;
  employee_id: string;
  role: UserRole;
  active: boolean;
  created_at: string;
  updated_at: string;
}
