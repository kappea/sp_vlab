from django.conf.urls import url

from .views import section_list

urlpatterns = [
    url(r'^(?P<slug>[-\w\d\_]+)/$', section_list, name="section_list"),
]
