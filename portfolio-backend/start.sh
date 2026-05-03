#!/bin/bash

set -e  # Exit on error

echo "========================================="
echo "Starting Django Application Setup"
echo "========================================="

echo ""
echo "Step 1: Running database migrations..."
python manage.py migrate --noinput || { echo "Migration failed!"; exit 1; }
echo "✓ Migrations completed successfully"

echo ""
echo "Step 2: Collecting static files..."
python manage.py collectstatic --noinput || { echo "Collectstatic failed!"; exit 1; }
echo "✓ Static files collected successfully"

echo ""
echo "Step 3: Creating superuser if none exists..."
python manage.py create_superuser_if_none || { echo "Superuser creation failed!"; exit 1; }
echo "✓ Superuser check completed"

echo ""
echo "========================================="
echo "Starting Gunicorn Server"
echo "========================================="
gunicorn portfolio.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 2 --log-level info
