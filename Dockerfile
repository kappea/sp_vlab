#
# Copyright (C) 2014-2017 Ministerie van Infrastructuur en Milieu.
#
FROM sp-ontwikkel-docker-registry.external-cloud.nl:5000/ienm/sp/components/lang/python:3.7.0a2-alpine

MAINTAINER Albert Kappe <albert.kappe@rijksoverheid.nl>

RUN apk update && apk add build-base postgresql-dev libffi-dev jpeg-dev openjpeg-dev libpng-dev zlib-dev

# Create- and set working and logs dir.
ENV INSTALL_PATH /code
RUN mkdir -p $INSTALL_PATH /logs
WORKDIR $INSTALL_PATH

# Copy sources to working dir.
ADD src $INSTALL_PATH

# In working dir, install Python dependencies from just copied sources.
RUN pip install -r requirements.txt
