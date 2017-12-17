# -*- coding: utf-8 -*-

from django.conf.urls import url
from .views import SurveyDetail, SurveyCompleted, ConfirmView, SurveyResultData

app_name = 'survey'
urlpatterns = [
    url(r'^(?P<id>\d+)/', SurveyDetail.as_view(), name='survey-detail'),
    url(r'^(?P<id>\d+)-(?P<step>\d+)/', SurveyDetail.as_view(),
        name='survey-detail-step'),
    url(r'^(?P<id>\d+)/completed/', SurveyCompleted.as_view(),
        name='survey-completed'),
    url(r'^confirm/(?P<uuid>\w+)/', ConfirmView.as_view(),
        name='survey-confirmation'),
    url(r'^resultdata/(?P<id>\d+)/', SurveyResultData.as_view(), name='survey-result-data'),
]
