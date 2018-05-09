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
    url(r"^welkom/", include("welkom.urls", namespace="welkom")),
    url(r'^', include('evenementen.urls', namespace="evenementen")),
    url(r'^survey/', include('survey.urls', namespace="survey")),
    url(r'^summernote/', include('django_summernote.urls')),
    url(r'^', include(accounts.urls, namespace='accounts')),
    url(r"^schedule/", include("schedule.urls", namespace="schedule")),
    url(r"^speaker/", include("speakers.urls", namespace="speakers")),
    url(r"^design-sprints/", include("designsprints.urls", namespace="designsprints")),
    url(r'^afspraak/', include('afspraken.urls', namespace="afspraken")),
    url(r"^e-learning/", include("elearning.urls", namespace="elearning")),
    url(r"^pitch-je-idee/", include("pitchit.urls", namespace="pitchit")),
    url(r"^tools/", include("tools.urls", namespace="tools")),
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
