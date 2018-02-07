#!/bin/sh

# Collect static files
echo "Collect static files"
mkdir -p /var/www/vlab/staticfiles /var/www/vlab/mediafiles /var/www/vlab/logs
python manage.py collectstatic --noinput

sleep 5

# Apply database migrations
echo "Apply database migrations"
python3 manage.py migrate
echo "If not available, set admin account"
python3 initadmin.py
cp -ru media/* /var/www/vlab/mediafiles/
# Start server
echo "Starting server"
#python3 manage.py runserver 0.0.0.0:8000
#gunicorn --access-logfile=- config.wsgi:application -b 0.0.0.0:8000
gunicorn --access-logfile=- --bind unix:django_app.sock config.wsgi:application &
nginx