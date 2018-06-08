from django.conf.urls import url

from .views import (beschikbaarheid, dashboard, overzicht,
                    plannen, vaststellen, verwijderen, ical)

urlpatterns = [
    url(r'^$', dashboard, name='dashboard'),
    url(r"^plannen/$", plannen, name="plannen"),
    url(r"^overzicht/(?P<token>\w+)/$", overzicht, name="overzicht"),
    url(r"^ical/(?P<token>\w+)/afspraak.ics$", ical, name="ical"),
    url(r"^beschikbaarheid/(?P<token>\w+)/$",
        beschikbaarheid, name="beschikbaarheid"),
    url(r"^vaststellen/(?P<token>\w+)/(?P<optie_id>\d+)/$",
        vaststellen, name="vaststellen"),
    url(r"^verwijderen/(?P<token>\w+)/$",
        verwijderen, name="verwijderen"),
]
