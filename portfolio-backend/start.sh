#!/bin/bash

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Creating superuser if none exists..."
python manage.py create_superuser_if_none

echo "Starting Gunicorn..."
gunicorn portfolio.wsgi:application --bind 0.0.0.0:${PORT:-8000}
