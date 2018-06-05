from __future__ import unicode_literals
from django.contrib.auth.forms import AuthenticationForm
from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Div, Submit, HTML, Button, Row, Field
from crispy_forms.bootstrap import AppendedText, PrependedText, FormActions
from authtools import forms as authtoolsforms
from django.contrib.auth import forms as authforms
from django.core.urlresolvers import reverse


class LoginForm(AuthenticationForm):
    remember_me = forms.BooleanField(required=False, initial=False)

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.fields["username"].widget.input_type = "email"  # ugly hack

        self.helper.layout = Layout(
            Field('username', placeholder="Voer Email in", autofocus=""),
            Field('password', placeholder="Voer wachtwoord in"),
            HTML('<a href="{}">Wachtwoord vergeten?</a>'.format(
                reverse("accounts:password-reset"))),
            Field('remember_me'),
            Submit('sign_in', 'Aanmelden',
                   css_class="btn btn-lg btn-primary btn-block"),
        )


class SignupForm(authtoolsforms.UserCreationForm):

    def __init__(self, *args, **kwargs):
        super(SignupForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.fields["email"].widget.input_type = "email"  # ugly hack
        self.fields["password2"].help_text = ''
        self.fields['akkoordverklaring'] = forms.BooleanField()

        self.helper.layout = Layout(
            Field('email', placeholder="Voer Email in", autofocus=""),
            Field('name', placeholder="Voer volledige naam in"),
            Field('password1', placeholder="Voer wachtwoord in"),
            Field('password2', placeholder="Herhaal wachtwoord"),
            HTML('<p>Uw persoonsgegevens worden alleen gebruikt voor het aanmaken van het account waarmee u kunt inloggen.</p>'),
            PrependedText('akkoordverklaring',
                          'Ik ga akkoord met de huisregels<br />en verwerking van persoonsgegevens<br />voor het aanmaken van het account'),
            HTML('<a href="{% url \'accounts:huisregels\' %}" target="_blank" class="external" aria-label="Toon de huisregels (opent externe website)">Toon de huisregels</a>'),
            HTML('<p>&nbsp;</p>'),
            Submit('sign_up', 'Maak account aan', css_class="btn-warning"),
        )


class PasswordChangeForm(authforms.PasswordChangeForm):

    def __init__(self, *args, **kwargs):
        super(PasswordChangeForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()

        self.helper.layout = Layout(
            Field('old_password', placeholder="Voer oude wachtwoord in",
                  autofocus=""),
            Field('new_password1', placeholder="Voer nieuwe wachtwoord in"),
            Field('new_password2', placeholder="Herhaal nieuwe wachtwoord"),
            Submit('pass_change', 'Wijzig wachtwoord',
                   css_class="btn-warning"),
        )


class PasswordResetForm(authtoolsforms.FriendlyPasswordResetForm):

    def __init__(self, *args, **kwargs):
        super(PasswordResetForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()

        self.helper.layout = Layout(
            Field('email', placeholder="Voer Email in",
                  autofocus=""),
            Submit('pass_reset', 'Herstel wachtwoord',
                   css_class="btn-warning"),
        )


class SetPasswordForm(authforms.SetPasswordForm):
    def __init__(self, *args, **kwargs):
        super(SetPasswordForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()

        self.helper.layout = Layout(
            Field('new_password1', placeholder="Voer nieuwe wachtwoord in",
                  autofocus=""),
            Field('new_password2', placeholder="Herhaal nieuwe wachtwoord"),
            Submit('pass_change', 'Wijzig wachtwoord',
                   css_class="btn-warning"),
        )
