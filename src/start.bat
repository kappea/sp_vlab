@echo off

set "DJANGO_DEBUG=True"

set "DATABASE_URL=sqlite:////db/db_next2.sqlite3"

set "SECRET_KEY=QqSW**s2y^F6APX$6LU"_2Gk%/PP*\!T^h;agI.v7{\5BM_P|?mv2']v~6M-7asH(#i%0H'(mkFt{-.G=.+Z_:OJZ"bD9:"

echo "Collect static files"
python manage.py collectstatic --noinput

echo "Create new migrations based on the changes to models"
python manage.py makemigrations

echo "Apply database migrations"
python manage.py migrate

echo "If not available, set admin account"
python initadmin.py

echo "Starting server"
python manage.py runserver 0.0.0.0:8000
