#!/bin/bash

echo "🚀 Starting PostgreSQL with Docker for ZeaBIS..."

# Stop and remove existing container if it exists
docker stop zeabis-postgres 2>/dev/null
docker rm zeabis-postgres 2>/dev/null

# Start PostgreSQL container
echo "📦 Creating PostgreSQL container..."
docker run --name zeabis-postgres \
  -e POSTGRES_USER=zeabis_user \
  -e POSTGRES_PASSWORD=zeabis \
  -e POSTGRES_DB=zeabis \
  -p 5432:5432 \
  -d postgres:15

if [ $? -ne 0 ]; then
  echo "❌ Failed to start PostgreSQL container"
  echo "Make sure Docker is installed and running"
  exit 1
fi

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Copy and run migration
echo "📋 Running database migrations..."
docker cp local_postgresql_migration.sql zeabis-postgres:/tmp/

docker exec zeabis-postgres psql -U zeabis_user -d zeabis -f /tmp/local_postgresql_migration.sql

if [ $? -ne 0 ]; then
  echo "❌ Failed to run migrations"
  exit 1
fi

# Load sample data if it exists
if [ -f "sample_data.sql" ]; then
  echo "📊 Loading sample data..."
  docker cp sample_data.sql zeabis-postgres:/tmp/
  docker exec zeabis-postgres psql -U zeabis_user -d zeabis -f /tmp/sample_data.sql
fi

echo ""
echo "✅ PostgreSQL is ready!"
echo ""
echo "Database Info:"
echo "  Host: localhost"
echo "  Port: 5432"
echo "  Database: zeabis"
echo "  User: zeabis_user"
echo "  Password: zeabis"
echo ""
echo "Next steps:"
echo "  1. Start backend:  cd backend && npm run dev"
echo "  2. Start frontend: npm run dev"
echo ""
echo "To stop PostgreSQL: docker stop zeabis-postgres"
echo "To start PostgreSQL: docker start zeabis-postgres"
