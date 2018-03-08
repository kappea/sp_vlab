from django.conf.urls import url

from . import views

app_name = 'evenementen'
urlpatterns = [
    url(r'^evenementen/$', views.evenementen, name='evenementen'),
    url(r'^evenement-aanmeldingen/(?P<slug>[-\w\d\_]+)/$', views.evenement_aanmeldingen, name='evenement_aanmeldingen'),
    url(r'^evenement-evaluaties/(?P<slug>[-\w\d\_]+)/$', views.evenement_evaluaties, name='evenement_evaluaties'),
    url(r'^evenement/voegtoe/$', views.evenement_voegtoe, name='evenement_voegtoe'),
    url(r'^evenement/(?P<slug>[-\w\d\_]+)/wijzig/$', views.evenement_wijzig, name='evenement_wijzig'),
    url(r'^evenementen/(?P<slug>[-\w\d\_]+)/$', views.evenement_overzicht, name='evenement_overzicht'),
    ]
