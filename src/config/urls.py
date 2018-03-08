from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
import profiles.urls
import accounts.urls

urlpatterns = [
    url(r'^users/', include(profiles.urls, namespace='profiles')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('mainscreen.urls', namespace="mainscreen")),
    url(r'^', include('evenementen.urls', namespace="evenementen")),
    url(r'^survey/', include('survey.urls', namespace="survey")),
    url(r'^summernote/', include('django_summernote.urls')),
    url(r'^', include(accounts.urls, namespace='accounts')),
    url(r"^schedule/", include("schedule.urls", namespace="schedule")),
    url(r"^speaker/", include("speakers.urls", namespace="speakers")),
]

# User-uploaded files like profile pics need to be served in development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Include django debug toolbar if DEBUG is on
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]

# Enable health checking
if not settings.DEBUG:
    urlpatterns += [
        url(r'^health/?', include('health_check.urls')),
    ]
