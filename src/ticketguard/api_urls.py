from django.conf.urls import include, url

from .api_views import callback

urlpatterns = [
    url(r'^(?P<handle>[\w\-]+)/(?P<keydigest>[\w\-]+)$', callback,
        name='callback'),
]
