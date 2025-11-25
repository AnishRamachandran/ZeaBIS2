# Local PostgreSQL Setup Guide

This guide will help you set up the ZeaBIS application with a local PostgreSQL database.

## Prerequisites

- PostgreSQL 12 or higher installed on your system
- psql command-line tool available

## Installation Steps

### 1. Install PostgreSQL (if not already installed)

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download from https://www.postgresql.org/download/windows/

### 2. Create Database and User

```bash
# Connect to PostgreSQL as superuser
psql postgres

# Run these commands in psql:
CREATE DATABASE zeabis;
CREATE USER zeabis_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE zeabis TO zeabis_user;

# Grant schema permissions
\c zeabis
GRANT ALL ON SCHEMA public TO zeabis_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO zeabis_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO zeabis_user;

# Exit psql
\q
```

### 3. Run Migration

```bash
# From the project root directory
psql -U zeabis_user -d zeabis -h localhost -f local_postgresql_migration.sql
```

### 4. Verify Tables Were Created

```bash
psql -U zeabis_user -d zeabis -h localhost

# In psql, run:
\dt

# You should see 13 tables:
# - users
# - customers
# - employees
# - projects
# - proposals
# - pos
# - invoices
# - invoice_details
# - timesheets
# - project_team
# - billing_transactions
# - user_roles
# - api_settings
```

### 5. Create Initial Admin User

```bash
# You'll need to hash your password first using bcrypt
# For testing purposes, here's a sample with password 'admin123' (bcrypt hash)

psql -U zeabis_user -d zeabis -h localhost

# In psql:
INSERT INTO users (email, password_hash)
VALUES ('admin@example.com', '$2a$10$X3.O8L1R8jMz5P5MxKjYs.dF5nKGhFoMmC8LqKPnYW0Q5H3zM7Yke');

# Get the user_id for next step
SELECT user_id FROM users WHERE email = 'admin@example.com';

# Insert admin role (replace <user_id> with actual UUID from previous query)
INSERT INTO user_roles (user_id, role, active)
VALUES ('<user_id>', 'Admin', true);
```

## Environment Configuration

Update your `.env` file with the following:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zeabis
DB_USER=zeabis_user
DB_PASSWORD=your_secure_password

# For connection string format (if needed)
DATABASE_URL=postgresql://zeabis_user:your_secure_password@localhost:5432/zeabis
```

## Key Differences from Supabase

1. **No Auto-Generated REST API**: You'll need to create a backend API server
2. **No Built-in Authentication**: You'll need to implement JWT-based auth
3. **No Row Level Security**: Security must be handled in your application code
4. **No Real-time Subscriptions**: Need to implement WebSocket if needed

## Next Steps

### Option 1: Build Custom Backend (Recommended for Production)

You'll need to:
1. Create an Express.js or NestJS backend server
2. Implement authentication with JWT tokens
3. Create REST API endpoints for all tables
4. Add role-based authorization middleware
5. Update frontend to call your API instead of Supabase

### Option 2: Use PostgREST (Quick Solution)

PostgREST can auto-generate a REST API from your PostgreSQL database:

```bash
# Install PostgREST
# macOS
brew install postgrest

# Ubuntu/Debian
sudo apt-get install postgrest

# Configure and run PostgREST
# Create a config file and point it to your database
```

### Option 3: Use Supabase Local (Easiest)

Keep all Supabase features but run locally:

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase locally
supabase init

# Start Supabase local stack (includes PostgreSQL, Auth, API)
supabase start
```

## Testing the Connection

```sql
-- Verify all tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check foreign key constraints
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY';

-- Check indexes
SELECT tablename, indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

## Common Issues

### Issue: "role does not exist"
**Solution:** Make sure you created the zeabis_user and granted proper permissions

### Issue: "permission denied"
**Solution:** Grant schema permissions:
```sql
GRANT ALL ON SCHEMA public TO zeabis_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO zeabis_user;
```

### Issue: "extension pgcrypto does not exist"
**Solution:** Install the extension as superuser:
```sql
psql -U postgres -d zeabis
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

## Password Hashing Example

To generate bcrypt password hashes for testing:

**Node.js:**
```javascript
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('your_password', 10);
console.log(hash);
```

**Python:**
```python
import bcrypt
password = b"your_password"
hashed = bcrypt.hashpw(password, bcrypt.gensalt())
print(hashed.decode())
```

**Online Tool:**
Visit https://bcrypt-generator.com/ (use for testing only, not production passwords)

## Security Reminders

1. **Never expose your database directly to the internet**
2. **Always use strong passwords**
3. **Store passwords hashed with bcrypt (cost factor 10+)**
4. **Use environment variables for credentials**
5. **Implement proper authentication and authorization in your backend**
6. **Use prepared statements to prevent SQL injection**
7. **Enable SSL/TLS for production databases**

## Support

For issues with:
- PostgreSQL installation: https://www.postgresql.org/docs/
- Migration errors: Check the migration file comments
- Application setup: Refer to the main README.md
