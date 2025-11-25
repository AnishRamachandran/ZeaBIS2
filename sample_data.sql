/*
  Sample Data for ZeaBIS Application - Local PostgreSQL Version

  This file contains sample data to help you test the application.
  Run this AFTER running the main migration file.

  Usage:
    psql -U zeabis_user -d zeabis -h localhost -f sample_data.sql
*/

-- Clear existing data (if any)
TRUNCATE TABLE billing_transactions CASCADE;
TRUNCATE TABLE invoice_details CASCADE;
TRUNCATE TABLE invoices CASCADE;
TRUNCATE TABLE pos CASCADE;
TRUNCATE TABLE proposals CASCADE;
TRUNCATE TABLE timesheets CASCADE;
TRUNCATE TABLE project_team CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE user_roles CASCADE;
TRUNCATE TABLE customers CASCADE;
TRUNCATE TABLE employees CASCADE;
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE api_settings CASCADE;

-- Insert sample users (passwords are 'password123' hashed with bcrypt)
-- Password hash for 'password123': $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
INSERT INTO users (user_id, email, password_hash) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'admin@zeabis.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
  ('550e8400-e29b-41d4-a716-446655440001', 'john.manager@zeabis.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
  ('550e8400-e29b-41d4-a716-446655440002', 'jane.finance@zeabis.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
  ('550e8400-e29b-41d4-a716-446655440003', 'bob.developer@zeabis.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');

-- Insert sample employees
INSERT INTO employees (employee_id, name, email, designation, location, bill_rate, status, company_name, employment_type) VALUES
  ('650e8400-e29b-41d4-a716-446655440000', 'Admin User', 'admin@zeabis.com', 'System Administrator', 'New York', 0, 'Active', 'ZeaBIS Inc', 'Full-time'),
  ('650e8400-e29b-41d4-a716-446655440001', 'John Manager', 'john.manager@zeabis.com', 'Delivery Manager', 'New York', 150.00, 'Active', 'ZeaBIS Inc', 'Full-time'),
  ('650e8400-e29b-41d4-a716-446655440002', 'Jane Finance', 'jane.finance@zeabis.com', 'Finance Manager', 'New York', 120.00, 'Active', 'ZeaBIS Inc', 'Full-time'),
  ('650e8400-e29b-41d4-a716-446655440003', 'Bob Developer', 'bob.developer@zeabis.com', 'Senior Developer', 'Remote', 100.00, 'Active', 'ZeaBIS Inc', 'Contractor'),
  ('650e8400-e29b-41d4-a716-446655440004', 'Alice Smith', 'alice.smith@zeabis.com', 'Project Manager', 'Boston', 130.00, 'Active', 'ZeaBIS Inc', 'Full-time'),
  ('650e8400-e29b-41d4-a716-446655440005', 'Charlie Brown', 'charlie.brown@zeabis.com', 'Developer', 'San Francisco', 90.00, 'Active', 'ZeaBIS Inc', 'Full-time');

-- Insert user roles
INSERT INTO user_roles (user_id, employee_id, role, active) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440000', 'Admin', true),
  ('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'Delivery Manager', true),
  ('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', 'Finance Manager', true),
  ('550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440003', 'Team Member', true);

-- Insert sample customers
INSERT INTO customers (customer_id, customer_name, organization, role, email_id, department, active) VALUES
  ('750e8400-e29b-41d4-a716-446655440000', 'Acme Corporation', 'Acme Corp', 'CTO', 'cto@acme.com', 'Engineering', true),
  ('750e8400-e29b-41d4-a716-446655440001', 'TechStart Inc', 'TechStart', 'VP Engineering', 'vp@techstart.com', 'Development', true),
  ('750e8400-e29b-41d4-a716-446655440002', 'Global Systems', 'Global Systems Ltd', 'Director', 'director@globalsys.com', 'IT', true);

-- Insert sample projects
INSERT INTO projects (project_id, name, project_owner, customer_manager, project_status, billing_type, start_date, end_date, currency_type, customer_id) VALUES
  ('850e8400-e29b-41d4-a716-446655440000', 'Acme Web Portal', 'John Manager', 'Alice Smith', 'Active', 'Time & Material', '2024-01-01', '2024-12-31', 'USD', '750e8400-e29b-41d4-a716-446655440000'),
  ('850e8400-e29b-41d4-a716-446655440001', 'TechStart Mobile App', 'John Manager', 'Alice Smith', 'Active', 'Fixed Price', '2024-02-01', '2024-08-31', 'USD', '750e8400-e29b-41d4-a716-446655440001'),
  ('850e8400-e29b-41d4-a716-446655440002', 'Global ERP Integration', 'John Manager', 'Alice Smith', 'Active', 'Time & Material', '2024-03-01', '2025-03-31', 'USD', '750e8400-e29b-41d4-a716-446655440002');

-- Insert sample proposals
INSERT INTO proposals (proposal_id, proposal_name, proposal_status, project_id, start_date, end_date, amount, effort, currency_type, usd_amount) VALUES
  ('950e8400-e29b-41d4-a716-446655440000', 'Acme Web Portal - Phase 1', 'Approved', '850e8400-e29b-41d4-a716-446655440000', '2024-01-01', '2024-06-30', 250000.00, 2000.00, 'USD', 250000.00),
  ('950e8400-e29b-41d4-a716-446655440001', 'TechStart Mobile App Development', 'Approved', '850e8400-e29b-41d4-a716-446655440001', '2024-02-01', '2024-08-31', 180000.00, 1500.00, 'USD', 180000.00),
  ('950e8400-e29b-41d4-a716-446655440002', 'Global ERP - Year 1', 'Approved', '850e8400-e29b-41d4-a716-446655440002', '2024-03-01', '2025-03-31', 500000.00, 4000.00, 'USD', 500000.00);

-- Insert sample POs
INSERT INTO pos (po_id, po_name, po_status, proposal_id, po_effort, po_amount, currency_type, usd_amount, po_date, effort_utilized, effort_billed) VALUES
  ('a50e8400-e29b-41d4-a716-446655440000', 'PO-2024-001', 'Active', '950e8400-e29b-41d4-a716-446655440000', 2000.00, 250000.00, 'USD', 250000.00, '2024-01-15', 500.00, 400.00),
  ('a50e8400-e29b-41d4-a716-446655440001', 'PO-2024-002', 'Active', '950e8400-e29b-41d4-a716-446655440001', 1500.00, 180000.00, 'USD', 180000.00, '2024-02-15', 300.00, 250.00),
  ('a50e8400-e29b-41d4-a716-446655440002', 'PO-2024-003', 'Active', '950e8400-e29b-41d4-a716-446655440002', 4000.00, 500000.00, 'USD', 500000.00, '2024-03-15', 800.00, 600.00);

-- Insert sample invoices
INSERT INTO invoices (invoice_id, invoice_number, invoice_name, po_id, status, start_date, end_date, invoice_date, due_date) VALUES
  ('b50e8400-e29b-41d4-a716-446655440000', 'INV-2024-001', 'Acme Web Portal - Jan 2024', 'a50e8400-e29b-41d4-a716-446655440000', 'Paid', '2024-01-01', '2024-01-31', '2024-02-01', '2024-03-01'),
  ('b50e8400-e29b-41d4-a716-446655440001', 'INV-2024-002', 'Acme Web Portal - Feb 2024', 'a50e8400-e29b-41d4-a716-446655440000', 'Sent', '2024-02-01', '2024-02-29', '2024-03-01', '2024-04-01'),
  ('b50e8400-e29b-41d4-a716-446655440002', 'INV-2024-003', 'TechStart Mobile - Feb 2024', 'a50e8400-e29b-41d4-a716-446655440001', 'Draft', '2024-02-01', '2024-02-29', '2024-03-01', '2024-04-01');

-- Insert sample invoice details
INSERT INTO invoice_details (invoice_id, employee_id, start_date, end_date, effort, cost, total) VALUES
  ('b50e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440003', '2024-01-01', '2024-01-31', 160.00, 100.00, 16000.00),
  ('b50e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440005', '2024-01-01', '2024-01-31', 160.00, 90.00, 14400.00),
  ('b50e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003', '2024-02-01', '2024-02-29', 152.00, 100.00, 15200.00),
  ('b50e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440005', '2024-02-01', '2024-02-29', 152.00, 90.00, 13680.00);

-- Insert sample timesheets
INSERT INTO timesheets (employee_id, project_id, billable_hours, non_billable_hours, date) VALUES
  ('650e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440000', 8.0, 0.0, '2024-01-15'),
  ('650e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440000', 7.5, 0.5, '2024-01-16'),
  ('650e8400-e29b-41d4-a716-446655440005', '850e8400-e29b-41d4-a716-446655440000', 8.0, 0.0, '2024-01-15'),
  ('650e8400-e29b-41d4-a716-446655440005', '850e8400-e29b-41d4-a716-446655440000', 8.0, 0.0, '2024-01-16'),
  ('650e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001', 8.0, 0.0, '2024-02-15'),
  ('650e8400-e29b-41d4-a716-446655440005', '850e8400-e29b-41d4-a716-446655440001', 7.0, 1.0, '2024-02-15');

-- Insert sample project team
INSERT INTO project_team (project_id, employee_id, role, start_date, effort, bill_rate) VALUES
  ('850e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440004', 'Project Manager', '2024-01-01', 500.00, 130.00),
  ('850e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440003', 'Lead Developer', '2024-01-01', 1000.00, 100.00),
  ('850e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440005', 'Developer', '2024-01-01', 800.00, 90.00),
  ('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440004', 'Project Manager', '2024-02-01', 300.00, 130.00),
  ('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003', 'Lead Developer', '2024-02-01', 800.00, 100.00);

-- Insert sample billing transactions
INSERT INTO billing_transactions (project_id, proposal_id, employee_id, month, year, effort, amount, transaction_type) VALUES
  ('850e8400-e29b-41d4-a716-446655440000', '950e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440003', 1, 2024, 160.00, 16000.00, 'Billed'),
  ('850e8400-e29b-41d4-a716-446655440000', '950e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440005', 1, 2024, 160.00, 14400.00, 'Billed'),
  ('850e8400-e29b-41d4-a716-446655440000', '950e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440003', 2, 2024, 152.00, 15200.00, 'Billed'),
  ('850e8400-e29b-41d4-a716-446655440000', '950e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440005', 2, 2024, 152.00, 13680.00, 'Billed');

-- Insert sample API settings
INSERT INTO api_settings (setting_key, setting_value, description) VALUES
  ('jwt_secret', 'your-secret-key-change-in-production', 'JWT signing secret'),
  ('jwt_expiry', '24h', 'JWT token expiration time'),
  ('bcrypt_rounds', '10', 'Bcrypt hashing rounds'),
  ('max_login_attempts', '5', 'Maximum login attempts before lockout'),
  ('session_timeout', '3600', 'Session timeout in seconds');

-- Display summary
SELECT 'Sample data inserted successfully!' as status;
SELECT 'Users: ' || COUNT(*) as summary FROM users
UNION ALL
SELECT 'Employees: ' || COUNT(*) FROM employees
UNION ALL
SELECT 'Customers: ' || COUNT(*) FROM customers
UNION ALL
SELECT 'Projects: ' || COUNT(*) FROM projects
UNION ALL
SELECT 'Proposals: ' || COUNT(*) FROM proposals
UNION ALL
SELECT 'Purchase Orders: ' || COUNT(*) FROM pos
UNION ALL
SELECT 'Invoices: ' || COUNT(*) FROM invoices
UNION ALL
SELECT 'Timesheets: ' || COUNT(*) FROM timesheets;

-- Display login credentials
SELECT '=== Test User Credentials ===' as info
UNION ALL
SELECT 'Email: admin@zeabis.com | Password: password123 | Role: Admin'
UNION ALL
SELECT 'Email: john.manager@zeabis.com | Password: password123 | Role: Delivery Manager'
UNION ALL
SELECT 'Email: jane.finance@zeabis.com | Password: password123 | Role: Finance Manager'
UNION ALL
SELECT 'Email: bob.developer@zeabis.com | Password: password123 | Role: Team Member';
