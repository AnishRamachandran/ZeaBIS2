/*
  # Add Mock Data for ZeaBIS Application

  ## Overview
  This migration adds sample data for testing and demonstration purposes.

  ## Data Added
  
  ### Customers
  - 5 sample customer organizations
  
  ### Employees
  - 10 sample employees with various designations and roles
  
  ### Projects
  - 5 sample projects linked to customers
  
  ### Proposals
  - Sample proposals linked to projects
  
  ### POs (Purchase Orders)
  - Sample POs linked to proposals
  
  ### Invoices
  - Sample invoices with various statuses
  
  ### Timesheets
  - Sample timesheet entries
  
  ### Project Team
  - Sample project team assignments
  
  ### Billing Transactions
  - Sample billing transaction records

  ## Important Notes
  - This is sample data for UI/UX testing
  - All monetary values are in USD
  - Dates are set relative to current period
*/

-- Insert sample customers
INSERT INTO customers (customer_name, organization, role, email_id, department, active, remarks)
VALUES
  ('TechCorp Inc', 'TechCorp', 'Primary Contact', 'contact@techcorp.com', 'IT', true, 'Long-term partner'),
  ('StartupXYZ', 'StartupXYZ Ltd', 'CTO', 'info@startupxyz.com', 'Engineering', true, 'Growing startup'),
  ('Enterprise Solutions', 'Enterprise Corp', 'Project Manager', 'projects@enterprise.com', 'Digital', true, 'Enterprise client'),
  ('FinTech Global', 'FinTech Inc', 'Tech Lead', 'dev@fintech.com', 'Technology', true, 'Financial services'),
  ('RetailMart', 'RetailMart LLC', 'IT Manager', 'it@retailmart.com', 'IT', false, 'Past client')
ON CONFLICT DO NOTHING;

-- Insert sample employees
INSERT INTO employees (name, designation, email, location, bill_rate, status, role, company_name, employment_type, hire_type)
VALUES
  ('John Smith', 'Senior Developer', 'john.smith@zeabis.com', 'New York', 150.00, 'Active', 'Developer', 'ZeaBIS Tech', 'Full-time', 'Direct'),
  ('Sarah Johnson', 'Project Manager', 'sarah.j@zeabis.com', 'San Francisco', 175.00, 'Active', 'Manager', 'ZeaBIS Tech', 'Full-time', 'Direct'),
  ('Michael Chen', 'Tech Lead', 'michael.c@zeabis.com', 'Seattle', 165.00, 'Active', 'Lead', 'ZeaBIS Tech', 'Full-time', 'Direct'),
  ('Emily Davis', 'UI/UX Designer', 'emily.d@zeabis.com', 'Austin', 125.00, 'Active', 'Designer', 'ZeaBIS Tech', 'Contract', 'Contract'),
  ('David Wilson', 'DevOps Engineer', 'david.w@zeabis.com', 'Boston', 140.00, 'Active', 'Engineer', 'ZeaBIS Tech', 'Full-time', 'Direct'),
  ('Lisa Anderson', 'Business Analyst', 'lisa.a@zeabis.com', 'Chicago', 130.00, 'Active', 'Analyst', 'ZeaBIS Tech', 'Full-time', 'Direct'),
  ('Robert Brown', 'QA Engineer', 'robert.b@zeabis.com', 'Denver', 120.00, 'Active', 'QA', 'ZeaBIS Tech', 'Full-time', 'Direct'),
  ('Jennifer Lee', 'Frontend Developer', 'jennifer.l@zeabis.com', 'Portland', 145.00, 'Active', 'Developer', 'ZeaBIS Tech', 'Contract', 'Contract'),
  ('James Taylor', 'Backend Developer', 'james.t@zeabis.com', 'Miami', 155.00, 'Active', 'Developer', 'ZeaBIS Tech', 'Full-time', 'Direct'),
  ('Amanda White', 'Data Analyst', 'amanda.w@zeabis.com', 'Atlanta', 135.00, 'Inactive', 'Analyst', 'ZeaBIS Tech', 'Full-time', 'Direct')
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (name, project_owner, customer_manager, project_status, billing_type, start_date, end_date, primary_contact, department, project_type, currency_type, customer_id)
SELECT 
  'E-Commerce Platform', 
  'John Smith', 
  'Sarah Johnson', 
  'Active', 
  'T&M', 
  '2024-01-15', 
  '2024-12-31', 
  'contact@techcorp.com', 
  'Development', 
  'Web Application', 
  'USD',
  customer_id
FROM customers WHERE customer_name = 'TechCorp Inc'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO projects (name, project_owner, customer_manager, project_status, billing_type, start_date, end_date, primary_contact, department, project_type, currency_type, customer_id)
SELECT 
  'Mobile App Development', 
  'Sarah Johnson', 
  'Michael Chen', 
  'Active', 
  'Fixed', 
  '2024-02-01', 
  '2024-08-31', 
  'info@startupxyz.com', 
  'Mobile', 
  'Mobile Application', 
  'USD',
  customer_id
FROM customers WHERE customer_name = 'StartupXYZ'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO projects (name, project_owner, customer_manager, project_status, billing_type, start_date, end_date, primary_contact, department, project_type, currency_type, customer_id)
SELECT 
  'Cloud Migration', 
  'Michael Chen', 
  'David Wilson', 
  'On Hold', 
  'T&M', 
  '2023-11-10', 
  '2024-06-30', 
  'projects@enterprise.com', 
  'Infrastructure', 
  'Cloud Services', 
  'USD',
  customer_id
FROM customers WHERE customer_name = 'Enterprise Solutions'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO projects (name, project_owner, customer_manager, project_status, billing_type, start_date, end_date, primary_contact, department, project_type, currency_type, customer_id)
SELECT 
  'Data Analytics Dashboard', 
  'Emily Davis', 
  'Lisa Anderson', 
  'Active', 
  'Fixed', 
  '2024-03-05', 
  '2024-09-30', 
  'dev@fintech.com', 
  'Analytics', 
  'Dashboard', 
  'USD',
  customer_id
FROM customers WHERE customer_name = 'FinTech Global'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO projects (name, project_owner, customer_manager, project_status, billing_type, start_date, end_date, primary_contact, department, project_type, currency_type, customer_id)
SELECT 
  'API Integration', 
  'David Wilson', 
  'James Taylor', 
  'Completed', 
  'T&M', 
  '2023-09-20', 
  '2024-03-20', 
  'contact@techcorp.com', 
  'Integration', 
  'API Development', 
  'USD',
  customer_id
FROM customers WHERE customer_name = 'TechCorp Inc'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Insert sample proposals
INSERT INTO proposals (proposal_name, proposal_status, project_id, start_date, end_date, amount, effort, currency_type, usd_amount)
SELECT 
  'E-Commerce Platform Proposal Q1 2024', 
  'Active',
  project_id,
  '2024-01-01',
  '2024-06-30',
  250000.00,
  1500.00,
  'USD',
  250000.00
FROM projects WHERE name = 'E-Commerce Platform'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO proposals (proposal_name, proposal_status, project_id, start_date, end_date, amount, effort, currency_type, usd_amount)
SELECT 
  'Mobile App Phase 1', 
  'Active',
  project_id,
  '2024-02-01',
  '2024-07-31',
  180000.00,
  1200.00,
  'USD',
  180000.00
FROM projects WHERE name = 'Mobile App Development'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Insert sample POs
INSERT INTO pos (po_name, po_status, proposal_id, po_effort, po_amount, currency_type, usd_amount, po_date, effort_utilized, effort_billed)
SELECT 
  'PO-2024-001', 
  'Active',
  proposal_id,
  1500.00,
  250000.00,
  'USD',
  250000.00,
  '2024-01-05',
  1020.00,
  825.00
FROM proposals WHERE proposal_name = 'E-Commerce Platform Proposal Q1 2024'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Insert sample invoices
INSERT INTO invoices (invoice_number, invoice_name, po_id, status, start_date, end_date, invoice_date, due_date, remarks)
SELECT 
  'INV-2024-001', 
  'January 2024 Billing',
  po_id,
  'Paid',
  '2024-01-01',
  '2024-01-31',
  '2024-01-31',
  '2024-02-15',
  'Q1 billing cycle'
FROM pos WHERE po_name = 'PO-2024-001'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Insert sample timesheets
INSERT INTO timesheets (employee_id, project_id, billable_hours, non_billable_hours, date)
SELECT 
  e.employee_id,
  p.project_id,
  8.0,
  0.0,
  CURRENT_DATE
FROM employees e
CROSS JOIN projects p
WHERE e.name = 'John Smith' AND p.name = 'E-Commerce Platform'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO timesheets (employee_id, project_id, billable_hours, non_billable_hours, date)
SELECT 
  e.employee_id,
  p.project_id,
  7.0,
  1.0,
  CURRENT_DATE
FROM employees e
CROSS JOIN projects p
WHERE e.name = 'Sarah Johnson' AND p.name = 'Mobile App Development'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Insert sample project team
INSERT INTO project_team (project_id, employee_id, role, start_date, effort, bill_rate)
SELECT 
  p.project_id,
  e.employee_id,
  'Lead Developer',
  '2024-01-15',
  160.0,
  150.00
FROM projects p
CROSS JOIN employees e
WHERE p.name = 'E-Commerce Platform' AND e.name = 'John Smith'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO project_team (project_id, employee_id, role, start_date, effort, bill_rate)
SELECT 
  p.project_id,
  e.employee_id,
  'Project Manager',
  '2024-02-01',
  160.0,
  175.00
FROM projects p
CROSS JOIN employees e
WHERE p.name = 'Mobile App Development' AND e.name = 'Sarah Johnson'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Insert sample billing transactions
INSERT INTO billing_transactions (project_id, proposal_id, employee_id, month, year, effort, amount, transaction_type)
SELECT 
  p.project_id,
  pr.proposal_id,
  e.employee_id,
  11,
  2024,
  160.0,
  24000.00,
  'Billed'
FROM projects p
CROSS JOIN proposals pr
CROSS JOIN employees e
WHERE p.name = 'E-Commerce Platform' 
  AND pr.proposal_name = 'E-Commerce Platform Proposal Q1 2024'
  AND e.name = 'John Smith'
LIMIT 1
ON CONFLICT DO NOTHING;
