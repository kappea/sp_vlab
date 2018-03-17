@echo off

set "DJANGO_DEBUG=True"

set "DATABASE_URL=sqlite:////db/db_next.sqlite3"

set "SECRET_KEY=QqSW**s2y^F6APX$6LU"_2Gk%/PP*\!T^h;agI.v7{\5BM_P|?mv2']v~6M-7asH(#i%0H'(mkFt{-.G=.+Z_:OJZ"bD9:"

python manage.py migrate

python manage.py runserver 0.0.0.0:8000
