from __future__ import unicode_literals
from django.conf.urls import url

from .views import (
    schedule_conference,
    schedule_presentation_detail,
)

app_name = 'schedule'
urlpatterns = [
    url(r'^(?P<slug>[-\w\d\_]+)/$', schedule_conference, name="schedule_conference"),
    url(r"^(?P<slug>[-\w\d\_]+)/presentatie/(?P<pk>[0-9]+)/$", schedule_presentation_detail, name="schedule_presentation_detail"),
]
