#!/bin/bash

# Collect static files
#echo "Collect static files"
#python manage.py collectstatic --noinput

sleep 10

# Apply database migrations
echo "Apply database migrations"
python3 manage.py migrate

# Start server
echo "Starting server"
#python3 manage.py runserver 0.0.0.0:8000
gunicorn vlab.wsgi:application -b 0.0.0.0:8000
