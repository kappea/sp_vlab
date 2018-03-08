from __future__ import unicode_literals
from django import forms
from django.contrib import admin
from django_summernote.widgets import SummernoteWidget

from .models import Speaker

# Apply summernote to 'biography' TextField in Speaker.
class SpeakerAdminForm(forms.ModelForm):
    class Meta:
        model = Speaker
        widgets = {
          'biography': SummernoteWidget(),
        }
        fields = '__all__'


class SpeakerAdmin(admin.ModelAdmin):
    form = SpeakerAdminForm
    pass


admin.site.register(Speaker, SpeakerAdmin,
                    list_display=["name", "email", "created", "twitter_username"],
                    search_fields=["name"])
