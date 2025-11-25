# Quick Start - PostgreSQL Not Running

## ⚠️ Current Issue

Your backend is configured but **PostgreSQL is not running** on localhost:5432.

## Backend Configuration (Already Set)
- Host: `localhost`
- Port: `5432`
- Database: `zeabis`
- User: `zeabis_user`
- Password: `zeabis`

## Quick Solutions

### Option 1: Docker (Fastest - 30 seconds)

```bash
docker run --name zeabis-postgres \
  -e POSTGRES_USER=zeabis_user \
  -e POSTGRES_PASSWORD=zeabis \
  -e POSTGRES_DB=zeabis \
  -p 5432:5432 \
  -d postgres:15 && \
sleep 5 && \
docker cp /tmp/cc-agent/60664971/project/local_postgresql_migration.sql zeabis-postgres:/tmp/ && \
docker exec zeabis-postgres psql -U zeabis_user -d zeabis -f /tmp/local_postgresql_migration.sql && \
echo "✅ PostgreSQL ready!"
```

### Option 2: Install PostgreSQL

```bash
sudo apt-get update
sudo apt-get install -y postgresql-15
sudo systemctl start postgresql
```

Then create database:
```bash
sudo -u postgres psql -c "CREATE DATABASE zeabis;"
sudo -u postgres psql -c "CREATE USER zeabis_user WITH PASSWORD 'zeabis';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE zeabis TO zeabis_user;"
sudo -u postgres psql -d zeabis -c "GRANT ALL ON SCHEMA public TO zeabis_user;"
```

Run migrations:
```bash
psql -U zeabis_user -d zeabis -h localhost -f /tmp/cc-agent/60664971/project/local_postgresql_migration.sql
```

## After PostgreSQL is Running

### Start Backend
```bash
cd /tmp/cc-agent/60664971/project/backend
npm run dev
```

### Start Frontend (new terminal)
```bash
cd /tmp/cc-agent/60664971/project
npm run dev
```

### Create First User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@zeabis.com","password":"Admin@123","firstName":"Admin","lastName":"User"}'
```

### Login
Open http://localhost:5173 and login with:
- Email: admin@zeabis.com
- Password: Admin@123

## Prerequisites Checklist

- [ ] PostgreSQL installed (v12+)
- [ ] psql command available
- [ ] Database port 5432 available

## 3-Step Setup

### Step 1: Create Database
```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE zeabis;
CREATE USER zeabis_user WITH PASSWORD 'change_this_password';
GRANT ALL PRIVILEGES ON DATABASE zeabis TO zeabis_user;

# Exit
\q
```

### Step 2: Run Migration
```bash
# From project root directory
psql -U zeabis_user -d zeabis -h localhost -f local_postgresql_migration.sql
```

### Step 3: Add Sample Data (Optional)
```bash
# Load test data
psql -U zeabis_user -d zeabis -h localhost -f sample_data.sql
```

## Verify Installation

```bash
# Connect to database
psql -U zeabis_user -d zeabis -h localhost

# List all tables
\dt

# Check data
SELECT COUNT(*) FROM users;
```

## Test Credentials (from sample data)

- **Admin**: admin@zeabis.com / password123
- **Manager**: john.manager@zeabis.com / password123
- **Finance**: jane.finance@zeabis.com / password123
- **Developer**: bob.developer@zeabis.com / password123

## Key Files

1. **local_postgresql_migration.sql** - Database schema (run this first)
2. **sample_data.sql** - Test data (optional, for testing)
3. **local_postgresql_setup.md** - Detailed setup instructions

## What Changed from Supabase?

| Feature | Supabase | Local PostgreSQL |
|---------|----------|------------------|
| Database | PostgreSQL (cloud) | PostgreSQL (local) |
| Auth | Built-in (auth.users) | Custom (users table) |
| REST API | Auto-generated | Need to build |
| Row Level Security | Enabled | Removed (app-level) |
| Real-time | Built-in | Need to implement |

## Next Steps

You'll need to:

1. **Build a backend API** to connect frontend to database
   - Options: Express.js, NestJS, Fastify
   - Implement JWT authentication
   - Create REST endpoints for all tables

2. **Update frontend code** to call your API instead of Supabase
   - Replace `supabase.from()` calls with `fetch()` calls
   - Handle authentication in your backend

3. **Implement security** at application level
   - JWT token validation
   - Role-based access control
   - Input validation

## Connection String Format

```
postgresql://zeabis_user:your_password@localhost:5432/zeabis
```

## Troubleshooting

**"relation does not exist"**
- Run the migration file first

**"permission denied"**
- Grant schema permissions: `GRANT ALL ON SCHEMA public TO zeabis_user;`

**"password authentication failed"**
- Check your password in the CREATE USER command

**"extension pgcrypto does not exist"**
- Run as superuser: `psql -U postgres -d zeabis -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;"`

## Alternative: Supabase Local

If you want to keep Supabase features but run locally:

```bash
npm install -g supabase
supabase init
supabase start
```

This gives you:
- Local PostgreSQL
- Supabase Auth (local)
- Auto-generated REST API
- Row Level Security
- Minimal code changes

## Need Help?

- Full setup guide: `local_postgresql_setup.md`
- PostgreSQL docs: https://www.postgresql.org/docs/
- Supabase Local: https://supabase.com/docs/guides/cli/local-development
