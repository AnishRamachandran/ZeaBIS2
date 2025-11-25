# PostgreSQL Installation Guide

## Step 1: Install PostgreSQL (Linux)

Since you're on Linux, run these commands:

```bash
# Update package list
sudo apt-get update

# Install PostgreSQL 15 and contrib modules
sudo apt-get install -y postgresql-15 postgresql-contrib-15

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify installation
psql --version
```

## Step 2: Create Database and User

```bash
# Switch to postgres user
sudo -u postgres psql

# Then run these SQL commands in the PostgreSQL prompt:
```

```sql
-- Create the database
CREATE DATABASE zeabis;

-- Create the user with password
CREATE USER zeabis_user WITH PASSWORD 'zeabis_secure_pass_2024';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE zeabis TO zeabis_user;

-- Connect to the zeabis database
\c zeabis

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO zeabis_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO zeabis_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO zeabis_user;

-- Exit
\q
```

## Step 3: Run Database Migrations

```bash
# Navigate to your project directory
cd /tmp/cc-agent/60664971/project

# Run the migration file
psql -U zeabis_user -d zeabis -h localhost -f local_postgresql_migration.sql

# Optional: Load sample data
psql -U zeabis_user -d zeabis -h localhost -f sample_data.sql
```

When prompted for password, enter: `zeabis_secure_pass_2024`

## Step 4: Verify Database Setup

```bash
# Connect to database
psql -U zeabis_user -d zeabis -h localhost

# List all tables
\dt

# You should see 13 tables:
# - users
# - employees
# - customers
# - projects
# - project_team_members
# - proposals
# - purchase_orders
# - invoices
# - invoice_details
# - timesheets
# - billing_transactions
# - user_roles
# - audit_log

# Exit
\q
```

## Step 5: Update Backend .env File

After completing the above steps, your database connection info will be:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zeabis
DB_USER=zeabis_user
DB_PASSWORD=zeabis_secure_pass_2024
```

## Troubleshooting

### Issue: "peer authentication failed"
Edit `/etc/postgresql/15/main/pg_hba.conf`:
```bash
sudo nano /etc/postgresql/15/main/pg_hba.conf
```

Change this line:
```
local   all             all                                     peer
```

To:
```
local   all             all                                     md5
```

Then restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

### Issue: "Connection refused"
Check if PostgreSQL is running:
```bash
sudo systemctl status postgresql
```

Start it if needed:
```bash
sudo systemctl start postgresql
```

### Issue: "Password authentication failed"
Reset the password:
```bash
sudo -u postgres psql
ALTER USER zeabis_user WITH PASSWORD 'zeabis_secure_pass_2024';
\q
```

## Next Steps

Once PostgreSQL is installed and configured:
1. The backend server will be created in the `backend/` directory
2. Start the backend with `cd backend && npm start`
3. The frontend will be updated to connect to the backend API
4. The backend will connect to your local PostgreSQL database
