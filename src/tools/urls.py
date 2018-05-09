from __future__ import unicode_literals
from django.conf.urls import url

from .views import (
    index,
)

urlpatterns = [
    url(r'^$', index, name='index'),
]
