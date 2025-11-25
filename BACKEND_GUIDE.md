# ZeaBIS Backend API Guide

## Overview

This guide explains how to set up and use the new PostgreSQL backend API for the ZeaBIS application.

## Prerequisites

Before starting, ensure you have:
1. PostgreSQL 15+ installed and running
2. Node.js 18+ installed
3. Database created and migrations applied (see POSTGRESQL_INSTALLATION.md)

## Quick Start

### 1. Install PostgreSQL and Set Up Database

Follow the instructions in `POSTGRESQL_INSTALLATION.md` to:
- Install PostgreSQL
- Create the `zeabis` database and user
- Run the migration file: `local_postgresql_migration.sql`
- Optionally load sample data: `sample_data.sql`

### 2. Start the Backend Server

```bash
# Navigate to backend directory
cd backend

# Dependencies are already installed, but if needed:
npm install

# Start the development server
npm run dev

# The server will start on http://localhost:3001
```

You should see:
```
✅ Server running on port 3001
✅ Environment: development
✅ Database connected
✅ API available at http://localhost:3001/api
```

### 3. Start the Frontend

```bash
# In the project root directory (not in backend/)
npm run dev

# The frontend will start on http://localhost:5173
```

### 4. Create Your First User

Since you're starting fresh, you need to create a user account:

**Option A: Via SQL (Recommended for first admin user)**

```sql
# Connect to database
psql -U zeabis_user -d zeabis -h localhost

# Create a user (password will be hashed automatically by the API)
# You'll create the user through the API registration endpoint instead
```

**Option B: Via API (Use this method)**

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@zeabis.com",
    "password": "Admin@123",
    "firstName": "Admin",
    "lastName": "User"
  }'
```

This will return:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "uuid-here",
    "email": "admin@zeabis.com",
    "firstName": "Admin",
    "lastName": "User"
  }
}
```

**Option C: Use the sample_data.sql file**

The sample_data.sql file includes pre-created users with known passwords (all passwords are "password123"):
- admin@zeabis.com
- john.smith@zeabis.com
- sarah.johnson@zeabis.com
- etc.

### 5. Login to the Application

1. Open http://localhost:5173 in your browser
2. Use the credentials:
   - Email: `admin@zeabis.com`
   - Password: `Admin@123` (or `password123` if using sample data)

## API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication

All endpoints except `/auth/register` and `/auth/login` require authentication.

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Available Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/logout` - Logout (requires auth)

#### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Soft delete customer
- `GET /api/customers/:id/projects` - Get customer's projects

#### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `PATCH /api/employees/:id/status` - Update employee status
- `GET /api/employees/:id/timesheets` - Get employee timesheets
- `GET /api/employees/:id/projects` - Get employee projects

#### Projects
- `GET /api/projects` - Get all projects (supports ?status=Active&customerId=uuid)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `PATCH /api/projects/:id/status` - Update project status
- `GET /api/projects/:id/team` - Get project team
- `POST /api/projects/:id/team` - Add team member
- `DELETE /api/projects/:id/team/:employeeId` - Remove team member

#### Timesheets
- `GET /api/timesheets` - Get all timesheets (supports ?employeeId=uuid&projectId=uuid)
- `GET /api/timesheets/:id` - Get timesheet by ID
- `POST /api/timesheets` - Create timesheet
- `PUT /api/timesheets/:id` - Update timesheet
- `DELETE /api/timesheets/:id` - Delete timesheet

#### Invoices
- `GET /api/invoices` - Get all invoices (supports ?status=Paid&poId=uuid)
- `GET /api/invoices/:id` - Get invoice by ID
- `POST /api/invoices` - Create invoice
- `PUT /api/invoices/:id` - Update invoice
- `PATCH /api/invoices/:id/status` - Update invoice status
- `GET /api/invoices/:id/details` - Get invoice details
- `POST /api/invoices/:id/details` - Add invoice detail

#### Proposals
- `GET /api/proposals` - Get all proposals
- `GET /api/proposals/:id` - Get proposal by ID
- `POST /api/proposals` - Create proposal
- `PUT /api/proposals/:id` - Update proposal

#### Purchase Orders
- `GET /api/pos` - Get all purchase orders
- `GET /api/pos/:id` - Get PO by ID
- `POST /api/pos` - Create PO
- `PUT /api/pos/:id` - Update PO
- `GET /api/pos/:id/utilization` - Get PO utilization stats

#### Dashboard
- `GET /api/dashboard/stats` - Get overview statistics
- `GET /api/dashboard/revenue` - Get revenue analytics

## Frontend Integration

The frontend now uses the new API client (`src/lib/api.ts`) instead of Supabase.

### Example Usage in Components

```typescript
import { api } from '../lib/api';

// Fetch customers
const customers = await api.customers.getAll();

// Create customer
const newCustomer = await api.customers.create({
  customerName: 'Acme Corp',
  contactPerson: 'John Doe',
  contactEmail: 'john@acme.com',
  contactPhone: '123-456-7890',
  address: '123 Main St'
});

// Update project status
await api.projects.updateStatus(projectId, 'In Progress');
```

### Migrating from Supabase to API

**OLD (Supabase):**
```typescript
const { data, error } = await supabase
  .from('customers')
  .select('*')
  .eq('active', true);
```

**NEW (API):**
```typescript
try {
  const customers = await api.customers.getAll();
  // customers is the data array
} catch (error) {
  // handle error
  console.error(error.message);
}
```

## Environment Variables

### Backend (.env in backend/)
```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zeabis
DB_USER=zeabis_user
DB_PASSWORD=zeabis_secure_pass_2024
JWT_SECRET=zeabis-jwt-secret-key-2024-change-in-production
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env in project root)
```env
VITE_API_URL=http://localhost:3001/api
```

## Troubleshooting

### Backend won't start

**Issue:** Database connection failed
```
Solution: Check that PostgreSQL is running
$ sudo systemctl status postgresql
$ sudo systemctl start postgresql
```

**Issue:** Port 3001 already in use
```
Solution: Change PORT in backend/.env or kill the process
$ lsof -ti:3001 | xargs kill -9
```

### Frontend can't connect to backend

**Issue:** CORS errors
```
Solution: Verify CORS_ORIGIN in backend/.env matches your frontend URL
```

**Issue:** 401 Unauthorized errors
```
Solution: Login again to get a fresh token
```

### Database issues

**Issue:** Tables don't exist
```
Solution: Run the migration file
$ psql -U zeabis_user -d zeabis -h localhost -f local_postgresql_migration.sql
```

**Issue:** Password authentication failed
```
Solution: Check credentials in backend/.env match your PostgreSQL setup
```

## Security Notes

1. **Change default passwords** - Update JWT_SECRET and database passwords in production
2. **Use HTTPS** - In production, always use HTTPS for API endpoints
3. **Environment variables** - Never commit .env files to version control
4. **Rate limiting** - Backend has rate limiting enabled (100 requests per 15 minutes)
5. **JWT expiration** - Tokens expire after 24 hours by default

## Development Workflow

1. **Backend changes:** Modify files in `backend/src/`, server auto-restarts with nodemon
2. **Database schema changes:** Create new migration files and run them
3. **Frontend changes:** Vite auto-reloads, no restart needed
4. **API changes:** Update both backend endpoint and frontend API client

## Production Deployment

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
npm run build
# Serve dist/ folder with nginx or similar
```

### Database
- Use a managed PostgreSQL service (AWS RDS, DigitalOcean, etc.)
- Update backend/.env with production database credentials
- Run migrations on production database
- Set up automated backups

## Next Steps

1. ✅ PostgreSQL installed and configured
2. ✅ Backend API running
3. ✅ Frontend connected to backend
4. 🔄 Update remaining frontend components to use API
5. 🔄 Add role-based access control to frontend
6. 🔄 Implement proper error handling and loading states
7. 🔄 Add data validation and business logic
8. 🔄 Create comprehensive tests

## Support

For issues or questions:
1. Check this guide first
2. Review POSTGRESQL_INSTALLATION.md
3. Check backend logs: `cd backend && npm run dev`
4. Check browser console for frontend errors
5. Verify database connection: `psql -U zeabis_user -d zeabis -h localhost`
