from __future__ import unicode_literals

from django.conf.urls import url

from .views import (promote, schedule_conference, schedule_edit,
                    schedule_presentation_detail, schedule_slot_edit)

app_name = 'schedule'
urlpatterns = [
    url(r'^(?P<slug>[-\w\d\_]+)/$', schedule_conference,
        name="schedule_conference"),
    url(r"^(?P<slug>[-\w\d\_]+)/presentatie/(?P<pk>[0-9]+)/$",
        schedule_presentation_detail, name="schedule_presentation_detail"),
    url(r"^([\w\-]+)/edit/$", schedule_edit, name="schedule_edit"),
    url(r"^([\w\-]+)/edit/slot/(\d+)/",
        schedule_slot_edit, name="schedule_slot_edit"),
    url(r"^([\w\-]+)/promote/$", promote, name="promote"),
]
