@echo off

set "DJANGO_DEBUG=True"

set "DATABASE_URL=sqlite:////db/db_next2.sqlite3"

set "SECRET_KEY=QqSW**s2y^F6APX$6LU_2Gk%/PP*\!T^h;agI.v7{\5BM_P|?mv2']v~6M-7asH(#i%0H'(mkFt{-.G=.+Z_:OJZbD9:"

echo "Collect static files"
python manage.py collectstatic --noinput

echo "Create new migrations based on the changes to models"
python manage.py makemigrations

echo "Apply database migrations"
python manage.py migrate

echo "If not available, set admin account"
python initadmin.py

echo "python -m smtpd -n -c DebuggingServer localhost:1025"
set "DJANGO_EMAIL_HOST=localhost"
set "DJANGO_EMAIL_PORT=1025"
set "DJANGO_AUTOTASK_IS_ACTIVE=True"

echo "Starting server"
python manage.py runserver 0.0.0.0:8000
