from django.conf.urls import url

from .views import keuze

urlpatterns = [
    url(r"^keuze/(?P<token>\w+)/$", keuze, name="keuze"),
]
