from __future__ import unicode_literals
from django import forms
from django_summernote.widgets import SummernoteWidget

from speakers.models import Speaker


class SpeakerForm(forms.ModelForm):

    class Meta:
        model = Speaker
        widgets = {
            'biography': SummernoteWidget(attrs={'width': '100%', 'height': '300px'}),
        }
        fields = [
            "name",
            "biography",
            "photo",
            "akkoordverklaring",
        ]
