#!/bin/bash

set -e

# usage: file_env VAR [DEFAULT]
#    ie: file_env 'XYZ_DB_PASSWORD' 'example'
# (will allow for "$XYZ_DB_PASSWORD_FILE" to fill in the value of
#  "$XYZ_DB_PASSWORD" from a file, especially for Docker's secrets feature)
file_env() {
	local var="$1"
	local fileVar="${var}_FILE"
	local def="${2:-}"
	if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
		echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
		exit 1
	fi
	local val="$def"
	if [ "${!var:-}" ]; then
		val="${!var}"
	elif [ "${!fileVar:-}" ]; then
		val="$(< "${!fileVar}")"
	fi
	export "$var"="$val"
	unset "$fileVar"
}

file_env 'POSTGRES_PASSWORD'
file_env 'DJANGO_SECRET_KEY'

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

export DJANGO_AUTOTASK_IS_ACTIVE=True

# Start server
echo "Starting server"
#python3 manage.py runserver 0.0.0.0:8000
#gunicorn --access-logfile=- config.wsgi:application -b 0.0.0.0:8000
gunicorn --workers 4 --access-logfile /var/www/vlab/logs/web.access.log --error-logfile /var/www/vlab/logs/web.error.log --bind unix:django_app.sock config.wsgi:application &
nginx
