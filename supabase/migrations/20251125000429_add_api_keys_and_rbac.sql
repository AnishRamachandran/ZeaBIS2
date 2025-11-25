/*
  # Add API Keys and RBAC Tables

  1. New Tables
    - `api_keys`
      - `id` (uuid, primary key)
      - `table_name` (text, not null)
      - `api_key` (text, not null, encrypted)
      - `description` (text)
      - `created_at` (timestamptz)
      - `created_by` (uuid, references auth.users)
      - `is_active` (boolean)

    - `role_permissions`
      - `id` (uuid, primary key)
      - `role_id` (text, not null)
      - `module_id` (text, not null)
      - `can_view` (boolean)
      - `can_edit` (boolean)
      - `can_delete` (boolean)
      - `is_hidden` (boolean)
      - `updated_at` (timestamptz)

    - `employee_roles`
      - `id` (uuid, primary key)
      - `employee_id` (uuid, references employees)
      - `role_id` (text, not null)
      - `assigned_at` (timestamptz)
      - `assigned_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on roles
*/

-- Create api_keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL UNIQUE,
  api_key text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  is_active boolean DEFAULT true
);

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view API keys"
  ON api_keys
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
      AND user_roles.active = true
    )
  );

CREATE POLICY "Only admins can insert API keys"
  ON api_keys
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
      AND user_roles.active = true
    )
  );

CREATE POLICY "Only admins can update API keys"
  ON api_keys
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
      AND user_roles.active = true
    )
  );

CREATE POLICY "Only admins can delete API keys"
  ON api_keys
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
      AND user_roles.active = true
    )
  );

-- Create role_permissions table
CREATE TABLE IF NOT EXISTS role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id text NOT NULL,
  module_id text NOT NULL,
  can_view boolean DEFAULT false,
  can_edit boolean DEFAULT false,
  can_delete boolean DEFAULT false,
  is_hidden boolean DEFAULT false,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(role_id, module_id)
);

ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated users can view role permissions"
  ON role_permissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage role permissions"
  ON role_permissions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
      AND user_roles.active = true
    )
  );

-- Create employee_roles table
CREATE TABLE IF NOT EXISTS employee_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL,
  role_id text NOT NULL,
  assigned_at timestamptz DEFAULT now(),
  assigned_by uuid REFERENCES auth.users(id),
  is_active boolean DEFAULT true,
  UNIQUE(employee_id, role_id)
);

ALTER TABLE employee_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated users can view employee roles"
  ON employee_roles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins and managers can manage employee roles"
  ON employee_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'delivery_manager')
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'delivery_manager')
      AND user_roles.active = true
    )
  );

-- Insert default role permissions for all roles and modules
INSERT INTO role_permissions (role_id, module_id, can_view, can_edit, can_delete, is_hidden) VALUES
-- Admin (full access to everything)
('admin', 'dashboard', true, true, true, false),
('admin', 'projects', true, true, true, false),
('admin', 'customers', true, true, true, false),
('admin', 'employees', true, true, true, false),
('admin', 'timesheets', true, true, true, false),
('admin', 'proposals', true, true, true, false),
('admin', 'billing_tracker', true, true, true, false),
('admin', 'invoice_tracker', true, true, true, false),
('admin', 'settings', true, true, true, false),

-- Delivery Manager
('delivery_manager', 'dashboard', true, false, false, false),
('delivery_manager', 'projects', true, true, false, false),
('delivery_manager', 'customers', true, false, false, false),
('delivery_manager', 'employees', true, true, false, false),
('delivery_manager', 'timesheets', true, true, false, false),
('delivery_manager', 'proposals', true, true, false, false),
('delivery_manager', 'billing_tracker', true, false, false, false),
('delivery_manager', 'invoice_tracker', true, false, false, false),
('delivery_manager', 'settings', false, false, false, true),

-- Project Manager
('project_manager', 'dashboard', true, false, false, false),
('project_manager', 'projects', true, true, false, false),
('project_manager', 'customers', true, false, false, false),
('project_manager', 'employees', true, false, false, false),
('project_manager', 'timesheets', true, true, false, false),
('project_manager', 'proposals', true, false, false, false),
('project_manager', 'billing_tracker', true, false, false, false),
('project_manager', 'invoice_tracker', true, false, false, false),
('project_manager', 'settings', false, false, false, true),

-- Finance Manager
('finance_manager', 'dashboard', true, false, false, false),
('finance_manager', 'projects', true, false, false, false),
('finance_manager', 'customers', true, true, false, false),
('finance_manager', 'employees', true, false, false, false),
('finance_manager', 'timesheets', true, false, false, false),
('finance_manager', 'proposals', true, true, false, false),
('finance_manager', 'billing_tracker', true, true, false, false),
('finance_manager', 'invoice_tracker', true, true, false, false),
('finance_manager', 'settings', false, false, false, true),

-- Account Manager
('account_manager', 'dashboard', true, false, false, false),
('account_manager', 'projects', true, false, false, false),
('account_manager', 'customers', true, true, false, false),
('account_manager', 'employees', true, false, false, false),
('account_manager', 'timesheets', false, false, false, true),
('account_manager', 'proposals', true, true, false, false),
('account_manager', 'billing_tracker', true, false, false, false),
('account_manager', 'invoice_tracker', true, false, false, false),
('account_manager', 'settings', false, false, false, true),

-- Team Member
('team_member', 'dashboard', true, false, false, false),
('team_member', 'projects', true, false, false, false),
('team_member', 'customers', false, false, false, true),
('team_member', 'employees', false, false, false, true),
('team_member', 'timesheets', true, true, false, false),
('team_member', 'proposals', false, false, false, true),
('team_member', 'billing_tracker', false, false, false, true),
('team_member', 'invoice_tracker', false, false, false, true),
('team_member', 'settings', false, false, false, true)
ON CONFLICT (role_id, module_id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_api_keys_table_name ON api_keys(table_name);
CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active);
CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_module_id ON role_permissions(module_id);
CREATE INDEX IF NOT EXISTS idx_employee_roles_employee_id ON employee_roles(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_roles_role_id ON employee_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_employee_roles_is_active ON employee_roles(is_active);

-- Create updated_at trigger for role_permissions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_role_permissions_updated_at
  BEFORE UPDATE ON role_permissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
