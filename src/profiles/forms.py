from __future__ import unicode_literals

from crispy_forms.bootstrap import AppendedText, FormActions, PrependedText
from crispy_forms.helper import FormHelper
from crispy_forms.layout import HTML, Button, Div, Field, Layout, Row, Submit
from django import forms
from django.contrib.auth import get_user_model

from . import models

User = get_user_model()


class UserForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False
        self.helper.layout = Layout(
            Field('name'),
        )

    class Meta:
        model = User
        fields = ['name']


class ProfileForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(ProfileForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.fields['akkoordverklaring'] = forms.BooleanField()
        self.helper.form_tag = False
        self.helper.layout = Layout(
            Field('picture'),
            Field('bio', lines=4),
            HTML('<p>&nbsp;</p>'),
            PrependedText('akkoordverklaring',
                          ' Ik ga akkoord met de huisregels '),
            HTML('<a href="{% url \'accounts:huisregels\' %}" target="_blank" class="external" aria-label="Toon de huisregels (opent externe website)">Toon de huisregels</a>'),
            HTML('<p>&nbsp;</p>'),
            Submit('update', 'Opslaan', css_class="btn-success"),
        )

    class Meta:
        model = models.Profile
        fields = ['picture', 'bio', 'akkoordverklaring']
        widgets = {'bio': forms.Textarea(attrs={'rows': '2', }), }
