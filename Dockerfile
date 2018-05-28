#
# Copyright (C) 2014-2017 Ministerie van Infrastructuur en Milieu.
#
FROM python:3.6.4-alpine3.7

LABEL maintainer="Albert Kappe <albert.kappe@rijksoverheid.nl>"

RUN apk update && apk add bash build-base logrotate postgresql-dev libffi-dev jpeg-dev openjpeg-dev libpng-dev zlib-dev nginx

# Create- and set working and logs dir.
ENV INSTALL_PATH /code
RUN mkdir -p $INSTALL_PATH /logs /run/nginx /var/www/vlab /var/www/vlab/logs /var/www/vlab/staticfiles /var/www/vlab/mediafiles
WORKDIR $INSTALL_PATH

COPY ./django.conf /etc/nginx/conf.d/
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

COPY ./gunicorn /etc/logrotate.d/

# Copy sources to working dir.
ADD src $INSTALL_PATH

# In working dir, install Python dependencies from just copied sources.
RUN pip install -r requirements.txt
