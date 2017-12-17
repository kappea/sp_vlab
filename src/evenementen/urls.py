from django.conf.urls import url

from . import views

app_name = 'evenementen'
urlpatterns = [
    url(r'^evenementen/$', views.evenementen, name='evenementen'),
    url(r'^evenement-aanmeldingen/(?P<slug>[-\w\d\_]+)/$', views.evenement_aanmeldingen, name='evenement_aanmeldingen'),
    url(r'^evenementen/(?P<slug>[-\w\d\_]+)/$', views.evenement_overzicht, name='evenement_overzicht'),
    url(r'^evenementen/voegtoe/$', views.evenement_voegtoe, name='evenement_voegtoe'),
    url(r'^evenementen/(?P<slug>[-\w\d\_]+)/wijzig/$', views.evenement_wijzig, name='evenement_wijzig'),
    ]
