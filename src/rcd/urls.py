from django.conf.urls import url

from .views import (AanmeldenView, ConfirmView, EvaluatieView, Huisregels,
                    LoginView, LogoutView, PasswordChangeView,
                    PasswordResetConfirmView, PasswordResetDoneView,
                    PasswordResetView, ShowProfile, SignUpView,
                    evenement_aanmeldingen, evenement_evaluaties, index,
                    schedule_conference, section_list)

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^aanmelden/$', AanmeldenView.as_view(), name='aanmelden'),
    url(r'^evaluatie/$', EvaluatieView.as_view(), name='evaluatie'),
    url(r'^confirm/(?P<uuid>\w+)/', ConfirmView.as_view(),
        name='survey-confirmation'),
    url(r'^aanmeldingen/$', evenement_aanmeldingen, name='evenement_aanmeldingen'),
    url(r'^evaluaties/$', evenement_evaluaties, name='evenement_evaluaties'),
    url(r'^programma/$', schedule_conference, name="schedule_conference"),
    url(r'^programma-delen/$', section_list, name="section_list"),
    url(r'^login/$', LoginView.as_view(), name="login"),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
    url(r'^signup/$', SignUpView.as_view(), name='signup'),
    url(r'^signup/huisregels/$', Huisregels.as_view(), name='huisregels'),
    url(r'^password-change/$', PasswordChangeView.as_view(),
        name='password-change'),
    url(r'^password-reset/$', PasswordResetView.as_view(),
        name='password-reset'),
    url(r'^password-reset-done/$', PasswordResetDoneView.as_view(),
        name='password-reset-done'),
    url(r'^password-reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$$', PasswordResetConfirmView.as_view(),  # NOQA
        name='password-reset-confirm'),
    url(r'^me$', ShowProfile.as_view(), name='show_self'),
]
