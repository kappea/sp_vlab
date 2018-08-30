from __future__ import unicode_literals

from authtools import views as authviews
from braces import views as bracesviews
from django.conf import settings
from django.contrib import auth, messages
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse_lazy
from django.http import Http404
from django.shortcuts import get_object_or_404, render
from django.views import generic

from . import forms
from .models import PageContent

User = get_user_model()


class LoginView(bracesviews.AnonymousRequiredMixin,
                authviews.LoginView):
    template_name = "accounts/login.html"
    form_class = forms.LoginForm

    def form_valid(self, form):
        redirect = super(LoginView, self).form_valid(form)
        remember_me = form.cleaned_data.get('remember_me')
        if remember_me is True:
            ONE_MONTH = 30*24*60*60
            expiry = getattr(settings, "KEEP_LOGGED_DURATION", ONE_MONTH)
            self.request.session.set_expiry(expiry)
        return redirect


class LogoutView(authviews.LogoutView):
    url = reverse_lazy('mainscreen:index')


class SignUpView(bracesviews.AnonymousRequiredMixin,
                 bracesviews.FormValidMessageMixin,
                 generic.CreateView):
    form_class = forms.SignupForm
    model = User
    template_name = 'accounts/signup.html'
    success_url = reverse_lazy('mainscreen:index')
    form_valid_message = "Uw account is aangemaakt!"

    def form_valid(self, form):
        r = super(SignUpView, self).form_valid(form)
        username = form.cleaned_data["email"]
        password = form.cleaned_data["password1"]
        user = auth.authenticate(email=username, password=password)
        auth.login(self.request, user)
        return r


class Huisregels(generic.TemplateView):
    template_name = "accounts/huisregels.html"
    http_method_names = ['get']

    def get_context_data(self, **kwargs):
        context = super(Huisregels, self).get_context_data(**kwargs)
        page = get_object_or_404(PageContent, naam='huisregels')
        if not page.published:
            raise Http404()
        context['page'] = page
        return context


class Privacy(generic.TemplateView):
    template_name = "accounts/privacy.html"
    http_method_names = ['get']

    def get_context_data(self, **kwargs):
        context = super(Privacy, self).get_context_data(**kwargs)
        page = get_object_or_404(PageContent, naam='privacy')
        if not page.published:
            raise Http404()
        context['page'] = page
        return context


class PasswordChangeView(authviews.PasswordChangeView):
    form_class = forms.PasswordChangeForm
    template_name = 'accounts/password-change.html'
    success_url = reverse_lazy('mainscreen:index')

    def form_valid(self, form):
        form.save()
        messages.success(self.request,
                         "Uw wachtwoord is gewijzigd, "
                         "log opnieuw in")
        return super(PasswordChangeView, self).form_valid(form)


class PasswordResetView(authviews.PasswordResetView):
    form_class = forms.PasswordResetForm
    template_name = 'accounts/password-reset.html'
    success_url = reverse_lazy('accounts:password-reset-done')
    subject_template_name = 'accounts/emails/password-reset-subject.txt'
    email_template_name = 'accounts/emails/password-reset-email.html'
    from_email = 'noreply@v-lab.ubrijk.nl'


class PasswordResetDoneView(authviews.PasswordResetDoneView):
    template_name = 'accounts/password-reset-done.html'


class PasswordResetConfirmView(authviews.PasswordResetConfirmAndLoginView):
    template_name = 'accounts/password-reset-confirm.html'
    form_class = forms.SetPasswordForm
