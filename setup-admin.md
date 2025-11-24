# Admin User Setup Instructions

To set up the admin user for ZeaBIS, follow these steps:

## Step 1: Create Admin Auth User

The admin user needs to be created in Supabase Auth first. You can do this in two ways:

### Option A: Through Supabase Dashboard
1. Go to your Supabase Dashboard: https://eztmgcyxpnzzfntgrzfw.supabase.co
2. Navigate to Authentication > Users
3. Click "Add User"
4. Enter:
   - Email: `admin@zeabis.com`
   - Password: `123`
   - Auto Confirm User: Yes

### Option B: Through the Application
1. The application will automatically allow sign-up
2. Use the login page and enter:
   - Email: `admin@zeabis.com`
   - Password: `123`

## Step 2: Link User to Admin Role

After creating the auth user, you need to link them to the admin role in the database.

Run this SQL in your Supabase SQL Editor:

```sql
-- Get the auth user ID
-- First, find the user_id from auth.users table
-- Then insert into user_roles

-- Insert admin role (replace 'USER_ID_HERE' with actual auth.users.id)
INSERT INTO user_roles (user_id, employee_id, role, active)
SELECT
  (SELECT id FROM auth.users WHERE email = 'admin@zeabis.com'),
  (SELECT employee_id FROM employees WHERE email = 'john.smith@zeabis.com'),
  'Admin',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'admin@zeabis.com')
);
```

## Default Login Credentials

- **Email**: admin@zeabis.com
- **Password**: 123

## Notes

- The admin user will have full access to all features
- You can create additional users through the Settings page once logged in as admin
- Make sure to change the default password in production environments
