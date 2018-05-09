from django.conf.urls import url

from .views import (autocomplete_email, beschikbaarheid, dashboard, overzicht,
                    plannen, vaststellen, verwijderen)

urlpatterns = [
    url(r'^$', dashboard, name='dashboard'),
    url(r"^plannen/$", plannen, name="plannen"),
    url(r"^overzicht/(?P<token>\w+)/$", overzicht, name="overzicht"),
    url(r"^beschikbaarheid/(?P<token>\w+)/$",
        beschikbaarheid, name="beschikbaarheid"),
    url(r"^vaststellen/(?P<token>\w+)/(?P<optie_id>\d+)/$",
        vaststellen, name="vaststellen"),
    url(r"^verwijderen/(?P<token>\w+)/$",
        verwijderen, name="verwijderen"),
    url(r'^autocomplete-email/$', autocomplete_email, name='autocomplete_email'),
]
