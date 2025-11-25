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
