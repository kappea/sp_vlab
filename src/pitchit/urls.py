# -*- coding: utf-8 -*-

from django.conf.urls import url

from .views import IndexView, ConfirmView, formulieren

app_name = 'pitchit'

urlpatterns = [
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^confirm/(?P<uuid>\w+)/', ConfirmView.as_view(),
        name='survey-confirmation'),
    url(r'^formulieren/$', formulieren, name='formulieren'),
]
