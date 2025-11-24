/*
  # ZeaBIS Application Database Schema

  ## Overview
  This migration creates the complete database schema for the ZeaBIS billing and invoice tracking application.
  
  ## New Tables Created
  
  ### 1. customers
  - customer_id (uuid, primary key)
  - customer_name (text)
  - organization (text)
  - role (text)
  - email_id (text)
  - department (text)
  - active (boolean, default true)
  - remarks (text)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 2. employees
  - employee_id (uuid, primary key)
  - name (text)
  - designation (text)
  - email (text, unique)
  - location (text)
  - bill_rate (decimal)
  - status (text, default 'Active')
  - role (text)
  - company_name (text)
  - employment_type (text)
  - hire_type (text)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 3. projects
  - project_id (uuid, primary key)
  - name (text)
  - project_owner (text)
  - customer_manager (text)
  - project_status (text, default 'Active')
  - billing_type (text)
  - start_date (date)
  - end_date (date)
  - primary_contact (text)
  - department (text)
  - project_type (text)
  - currency_type (text, default 'USD')
  - customer_id (uuid, FK to customers)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 4. proposals
  - proposal_id (uuid, primary key)
  - proposal_name (text)
  - proposal_status (text, default 'Draft')
  - project_id (uuid, FK to projects)
  - start_date (date)
  - end_date (date)
  - amount (decimal)
  - effort (decimal)
  - currency_type (text, default 'USD')
  - usd_amount (decimal)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 5. pos (Purchase Orders)
  - po_id (uuid, primary key)
  - po_name (text)
  - po_status (text, default 'Draft')
  - proposal_id (uuid, FK to proposals)
  - po_effort (decimal)
  - po_amount (decimal)
  - currency_type (text, default 'USD')
  - usd_amount (decimal)
  - po_date (date)
  - effort_utilized (decimal, default 0)
  - effort_billed (decimal, default 0)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 6. invoices
  - invoice_id (uuid, primary key)
  - invoice_number (text, unique)
  - invoice_name (text)
  - po_id (uuid, FK to pos)
  - status (text, default 'Draft')
  - start_date (date)
  - end_date (date)
  - invoice_date (date)
  - due_date (date)
  - remarks (text)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 7. invoice_details
  - invoice_detail_id (uuid, primary key)
  - invoice_id (uuid, FK to invoices)
  - employee_id (uuid, FK to employees)
  - start_date (date)
  - end_date (date)
  - effort (decimal)
  - cost (decimal)
  - total (decimal)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 8. timesheets
  - timesheet_id (uuid, primary key)
  - employee_id (uuid, FK to employees)
  - project_id (uuid, FK to projects)
  - billable_hours (decimal, default 0)
  - non_billable_hours (decimal, default 0)
  - date (date)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 9. project_team
  - project_team_id (uuid, primary key)
  - project_id (uuid, FK to projects)
  - employee_id (uuid, FK to employees)
  - role (text)
  - start_date (date)
  - end_date (date)
  - effort (decimal)
  - bill_rate (decimal)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 10. billing_transactions
  - billing_transaction_id (uuid, primary key)
  - project_id (uuid, FK to projects)
  - proposal_id (uuid, FK to proposals)
  - employee_id (uuid, FK to employees)
  - month (integer)
  - year (integer)
  - effort (decimal)
  - amount (decimal)
  - transaction_type (text)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 11. user_roles
  - user_role_id (uuid, primary key)
  - user_id (uuid, FK to auth.users)
  - employee_id (uuid, FK to employees)
  - role (text) - values: 'Admin', 'Delivery Manager', 'Project Manager', 'Finance Manager', 'Account Manager', 'Team Member'
  - active (boolean, default true)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 12. api_settings
  - setting_id (uuid, primary key)
  - setting_key (text, unique)
  - setting_value (text)
  - description (text)
  - created_at (timestamptz)
  - updated_at (timestamptz)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Policies created for role-based access control
  - Authenticated users can access data based on their assigned roles
  
  ## Important Notes
  - All monetary amounts use decimal type for precision
  - All dates use date type for consistency
  - Foreign key constraints maintain referential integrity
  - Indexes added for frequently queried columns
  - Default values set for status fields and timestamps
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  customer_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  organization text,
  role text,
  email_id text,
  department text,
  active boolean DEFAULT true,
  remarks text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  employee_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text,
  email text UNIQUE NOT NULL,
  location text,
  bill_rate decimal(10, 2),
  status text DEFAULT 'Active',
  role text,
  company_name text,
  employment_type text,
  hire_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  project_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  project_owner text,
  customer_manager text,
  project_status text DEFAULT 'Active',
  billing_type text,
  start_date date,
  end_date date,
  primary_contact text,
  department text,
  project_type text,
  currency_type text DEFAULT 'USD',
  customer_id uuid REFERENCES customers(customer_id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create proposals table
CREATE TABLE IF NOT EXISTS proposals (
  proposal_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_name text NOT NULL,
  proposal_status text DEFAULT 'Draft',
  project_id uuid REFERENCES projects(project_id),
  start_date date,
  end_date date,
  amount decimal(15, 2),
  effort decimal(10, 2),
  currency_type text DEFAULT 'USD',
  usd_amount decimal(15, 2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pos (Purchase Orders) table
CREATE TABLE IF NOT EXISTS pos (
  po_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_name text NOT NULL,
  po_status text DEFAULT 'Draft',
  proposal_id uuid REFERENCES proposals(proposal_id),
  po_effort decimal(10, 2),
  po_amount decimal(15, 2),
  currency_type text DEFAULT 'USD',
  usd_amount decimal(15, 2),
  po_date date,
  effort_utilized decimal(10, 2) DEFAULT 0,
  effort_billed decimal(10, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  invoice_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  invoice_name text NOT NULL,
  po_id uuid REFERENCES pos(po_id),
  status text DEFAULT 'Draft',
  start_date date,
  end_date date,
  invoice_date date,
  due_date date,
  remarks text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create invoice_details table
CREATE TABLE IF NOT EXISTS invoice_details (
  invoice_detail_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES invoices(invoice_id) ON DELETE CASCADE,
  employee_id uuid REFERENCES employees(employee_id),
  start_date date,
  end_date date,
  effort decimal(10, 2),
  cost decimal(15, 2),
  total decimal(15, 2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create timesheets table
CREATE TABLE IF NOT EXISTS timesheets (
  timesheet_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(employee_id),
  project_id uuid REFERENCES projects(project_id),
  billable_hours decimal(5, 2) DEFAULT 0,
  non_billable_hours decimal(5, 2) DEFAULT 0,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(employee_id, project_id, date)
);

-- Create project_team table
CREATE TABLE IF NOT EXISTS project_team (
  project_team_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(project_id),
  employee_id uuid REFERENCES employees(employee_id),
  role text,
  start_date date,
  end_date date,
  effort decimal(10, 2),
  bill_rate decimal(10, 2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(project_id, employee_id, start_date)
);

-- Create billing_transactions table
CREATE TABLE IF NOT EXISTS billing_transactions (
  billing_transaction_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(project_id),
  proposal_id uuid REFERENCES proposals(proposal_id),
  employee_id uuid REFERENCES employees(employee_id),
  month integer,
  year integer,
  effort decimal(10, 2),
  amount decimal(15, 2),
  transaction_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  user_role_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  employee_id uuid REFERENCES employees(employee_id),
  role text NOT NULL CHECK (role IN ('Admin', 'Delivery Manager', 'Project Manager', 'Finance Manager', 'Account Manager', 'Team Member')),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create api_settings table
CREATE TABLE IF NOT EXISTS api_settings (
  setting_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_customer_id ON projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(project_status);
CREATE INDEX IF NOT EXISTS idx_proposals_project_id ON proposals(project_id);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(proposal_status);
CREATE INDEX IF NOT EXISTS idx_pos_proposal_id ON pos(proposal_id);
CREATE INDEX IF NOT EXISTS idx_pos_status ON pos(po_status);
CREATE INDEX IF NOT EXISTS idx_invoices_po_id ON invoices(po_id);
CREATE INDEX IF NOT EXISTS idx_invoice_details_invoice_id ON invoice_details(invoice_id);
CREATE INDEX IF NOT EXISTS idx_invoice_details_employee_id ON invoice_details(employee_id);
CREATE INDEX IF NOT EXISTS idx_timesheets_employee_id ON timesheets(employee_id);
CREATE INDEX IF NOT EXISTS idx_timesheets_project_id ON timesheets(project_id);
CREATE INDEX IF NOT EXISTS idx_timesheets_date ON timesheets(date);
CREATE INDEX IF NOT EXISTS idx_project_team_project_id ON project_team(project_id);
CREATE INDEX IF NOT EXISTS idx_project_team_employee_id ON project_team(employee_id);
CREATE INDEX IF NOT EXISTS idx_billing_transactions_project_id ON billing_transactions(project_id);
CREATE INDEX IF NOT EXISTS idx_billing_transactions_month_year ON billing_transactions(year, month);

-- Enable Row Level Security on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE pos ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE timesheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Customers policies
CREATE POLICY "Authenticated users can view customers"
  ON customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and managers can insert customers"
  ON customers FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Account Manager', 'Delivery Manager')
      AND user_roles.active = true
    )
  );

CREATE POLICY "Admins and managers can update customers"
  ON customers FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Account Manager', 'Delivery Manager')
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Account Manager', 'Delivery Manager')
      AND user_roles.active = true
    )
  );

-- Employees policies
CREATE POLICY "Authenticated users can view employees"
  ON employees FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert employees"
  ON employees FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'Admin'
      AND user_roles.active = true
    )
  );

CREATE POLICY "Admins can update employees"
  ON employees FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'Admin'
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'Admin'
      AND user_roles.active = true
    )
  );

-- Projects policies
CREATE POLICY "Authenticated users can view projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Delivery Manager', 'Project Manager')
      AND user_roles.active = true
    )
  );

CREATE POLICY "Managers can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Delivery Manager', 'Project Manager')
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Delivery Manager', 'Project Manager')
      AND user_roles.active = true
    )
  );

-- Proposals policies
CREATE POLICY "Authenticated users can view proposals"
  ON proposals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can manage proposals"
  ON proposals FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Delivery Manager', 'Project Manager', 'Account Manager')
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Delivery Manager', 'Project Manager', 'Account Manager')
      AND user_roles.active = true
    )
  );

-- POs policies
CREATE POLICY "Authenticated users can view pos"
  ON pos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can manage pos"
  ON pos FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Delivery Manager', 'Finance Manager', 'Account Manager')
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Delivery Manager', 'Finance Manager', 'Account Manager')
      AND user_roles.active = true
    )
  );

-- Invoices policies
CREATE POLICY "Authenticated users can view invoices"
  ON invoices FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Finance team can manage invoices"
  ON invoices FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Finance Manager')
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Finance Manager')
      AND user_roles.active = true
    )
  );

-- Invoice details policies
CREATE POLICY "Authenticated users can view invoice details"
  ON invoice_details FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Finance team can manage invoice details"
  ON invoice_details FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Finance Manager')
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Finance Manager')
      AND user_roles.active = true
    )
  );

-- Timesheets policies
CREATE POLICY "Users can view own timesheets"
  ON timesheets FOR SELECT
  TO authenticated
  USING (
    employee_id IN (
      SELECT employee_id FROM user_roles WHERE user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Delivery Manager', 'Project Manager', 'Finance Manager')
      AND user_roles.active = true
    )
  );

CREATE POLICY "Users can insert own timesheets"
  ON timesheets FOR INSERT
  TO authenticated
  WITH CHECK (
    employee_id IN (
      SELECT employee_id FROM user_roles WHERE user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Project Manager')
      AND user_roles.active = true
    )
  );

CREATE POLICY "Users can update own timesheets"
  ON timesheets FOR UPDATE
  TO authenticated
  USING (
    employee_id IN (
      SELECT employee_id FROM user_roles WHERE user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Project Manager')
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    employee_id IN (
      SELECT employee_id FROM user_roles WHERE user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Project Manager')
      AND user_roles.active = true
    )
  );

-- Project team policies
CREATE POLICY "Authenticated users can view project team"
  ON project_team FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can manage project team"
  ON project_team FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Delivery Manager', 'Project Manager')
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Delivery Manager', 'Project Manager')
      AND user_roles.active = true
    )
  );

-- Billing transactions policies
CREATE POLICY "Authenticated users can view billing transactions"
  ON billing_transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can manage billing transactions"
  ON billing_transactions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Delivery Manager', 'Finance Manager')
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('Admin', 'Delivery Manager', 'Finance Manager')
      AND user_roles.active = true
    )
  );

-- User roles policies
CREATE POLICY "Users can view own role"
  ON user_roles FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role = 'Admin'
      AND ur.active = true
    )
  );

CREATE POLICY "Admins can manage user roles"
  ON user_roles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'Admin'
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'Admin'
      AND user_roles.active = true
    )
  );

-- API settings policies
CREATE POLICY "Admins can view api settings"
  ON api_settings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'Admin'
      AND user_roles.active = true
    )
  );

CREATE POLICY "Admins can manage api settings"
  ON api_settings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'Admin'
      AND user_roles.active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'Admin'
      AND user_roles.active = true
    )
  );