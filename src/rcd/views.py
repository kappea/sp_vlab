from django.contrib.auth.decorators import login_required, permission_required
from django.core.urlresolvers import reverse_lazy
from django.http import Http404
from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import TemplateView, View

from accounts import views as accountsviews
from conference.models import Section
from profiles import views as profilesviews
from schedule.models import (Day, Presentation, Schedule, Session, SessionRole,
                             Slot, promote_proposal)
from schedule.timetable import TimeTable
from survey.forms import ResponseForm
from survey.models import Answer, Category, Survey

from . import forms
from .models import Evenement, PageContent

# Create your views here.


def index(request):
    template_name = 'rcd/evenement_overzicht.html'
    evenement = get_object_or_404(Evenement, slug='rijksconsultatiedag-2018')
    context = {'evenement': evenement}
    return render(request, template_name, context)


class AanmeldenView(View):

    def get(self, request, *args, **kwargs):
        template_name = 'rcd/aanmelden.html'
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        survey = evenement.aanmelding_formulier
        categories = form = None
        if survey:
            if survey.need_logged_user and not request.user.is_authenticated():
                return redirect('%s?next=%s' % (reverse_lazy('rcd:login'), request.path))
            categories = Category.objects.filter(
                survey=survey).order_by('order')
            form = ResponseForm(survey=survey, user=request.user,
                                step=kwargs.get('step', 0))
        context = {
            'evenement': evenement,
            'response_form': form,
            'survey': survey,
            'categories': categories,
        }
        return render(request, template_name, context)

    def post(self, request, *args, **kwargs):
        template_name = 'rcd/aanmelden.html'
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        survey = evenement.aanmelding_formulier
        categories = form = None
        if survey:
            if survey.need_logged_user and not request.user.is_authenticated():
                return redirect('%s?next=%s' % (reverse_lazy('rcd:login'), request.path))
            categories = Category.objects.filter(
                survey=survey).order_by('order')
            form = ResponseForm(request.POST, survey=survey, user=request.user,
                                step=kwargs.get('step', 0))
            if form.is_valid():
                response = form.save()
                return redirect('rcd:survey-confirmation', uuid=response.interview_uuid)
        context = {
            'evenement': evenement,
            'response_form': form,
            'survey': survey,
            'categories': categories,
        }
        return render(request, template_name, context)


class EvaluatieView(View):

    def get(self, request, *args, **kwargs):
        template_name = 'rcd/evaluatie.html'
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        survey = evenement.evaluatie_formulier
        categories = form = None
        if survey:
            if survey.need_logged_user and not request.user.is_authenticated():
                return redirect('%s?next=%s' % (reverse_lazy('rcd:login'), request.path))
            categories = Category.objects.filter(
                survey=survey).order_by('order')
            form = ResponseForm(survey=survey, user=request.user,
                                step=kwargs.get('step', 0))
        context = {
            'evenement': evenement,
            'response_form': form,
            'survey': survey,
            'categories': categories,
        }
        return render(request, template_name, context)

    def post(self, request, *args, **kwargs):
        template_name = 'rcd/evaluatie.html'
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        survey = evenement.evaluatie_formulier
        categories = form = None
        if survey:
            if survey.need_logged_user and not request.user.is_authenticated():
                return redirect('%s?next=%s' % (reverse_lazy('rcd:login'), request.path))
            categories = Category.objects.filter(
                survey=survey).order_by('order')
            form = ResponseForm(request.POST, survey=survey, user=request.user,
                                step=kwargs.get('step', 0))
            if form.is_valid():
                response = form.save()
                return redirect('rcd:survey-confirmation', uuid=response.interview_uuid)
        context = {
            'evenement': evenement,
            'response_form': form,
            'survey': survey,
            'categories': categories,
        }
        return render(request, template_name, context)


class ConfirmView(TemplateView):
    template_name = 'rcd/confirm.html'

    def get_context_data(self, **kwargs):
        context = super(ConfirmView, self).get_context_data(**kwargs)
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        context['uuid'] = kwargs['uuid']
        context['evenement'] = evenement
        return context


@permission_required('rcd.change_evenement')
def evenement_aanmeldingen(request):
    template_name = 'rcd/evenement_aanmeldingen.html'
    evenement = get_object_or_404(Evenement, slug='rijksconsultatiedag-2018')
    context = {'evenement': evenement}
    return render(request, template_name, context)


@permission_required('rcd.change_evenement')
def evenement_evaluaties(request):
    template_name = 'rcd/evenement_evaluaties.html'
    evenement = get_object_or_404(Evenement, slug='rijksconsultatiedag-2018')
    context = {'evenement': evenement}
    return render(request, template_name, context)


def schedule_conference(request):

    evenement = get_object_or_404(Evenement, slug='rijksconsultatiedag-2018')

    if request.user.is_staff:
        schedules = Schedule.objects.filter(
            hidden=False, section__conference__programma_rcd=evenement)
    else:
        schedules = Schedule.objects.filter(
            published=True, hidden=False, section__conference__programma_rcd=evenement)

    sections = []
    for schedule in schedules:
        days_qs = Day.objects.filter(schedule=schedule)
        days = [TimeTable(day) for day in days_qs]
        sections.append({
            "schedule": schedule,
            "days": days,
        })

    ctx = {
        'evenement': evenement,
        "sections": sections,
    }
    return render(request, "rcd/schedule_conference.html", ctx)


@login_required
def section_list(request):

    evenement = get_object_or_404(Evenement, slug='rijksconsultatiedag-2018')

    if request.user.is_staff:
        sections = Section.objects.filter(
            conference__programma_rcd=evenement)
    else:
        sections = Section.objects.filter(
            conference__programma_rcd=evenement)
    ctx = {
        'evenement': evenement,
        "sections": sections,
    }
    return render(request, "rcd/section_list.html", ctx)


class LoginView(accountsviews.LoginView):
    template_name = "rcd/login.html"
    form_class = forms.LoginForm
    success_url = reverse_lazy('rcd:index')

    def get_context_data(self, **kwargs):
        kwargs = super(LoginView, self).get_context_data(**kwargs)
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        kwargs.update({'evenement': evenement})
        return kwargs


class LogoutView(accountsviews.LogoutView):
    url = reverse_lazy('rcd:index')


class SignUpView(accountsviews.SignUpView):
    form_class = forms.SignupForm
    template_name = 'rcd/signup.html'
    success_url = reverse_lazy('rcd:index')

    def get_context_data(self, **kwargs):
        kwargs = super(SignUpView, self).get_context_data(**kwargs)
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        kwargs.update({'evenement': evenement})
        return kwargs


class Huisregels(TemplateView):
    template_name = "rcd/huisregels.html"
    http_method_names = ['get']

    def get_context_data(self, **kwargs):
        context = super(Huisregels, self).get_context_data(**kwargs)
        page = get_object_or_404(PageContent, naam='huisregels')
        if not page.published:
            raise Http404()
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        context['page'] = page
        context['evenement'] = evenement
        return context


class PasswordChangeView(accountsviews.PasswordChangeView):
    form_class = forms.PasswordChangeForm
    template_name = 'rcd/password-change.html'
    success_url = reverse_lazy('rcd:index')

    def get_context_data(self, **kwargs):
        kwargs = super(PasswordChangeView, self).get_context_data(**kwargs)
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        kwargs.update({'evenement': evenement})
        return kwargs


class PasswordResetView(accountsviews.PasswordResetView):
    form_class = forms.PasswordResetForm
    template_name = 'rcd/password-reset.html'
    success_url = reverse_lazy('rcd:password-reset-done')
    subject_template_name = 'accounts/emails/password-reset-subject.txt'
    email_template_name = 'accounts/emails/password-reset-email.html'

    def get_context_data(self, **kwargs):
        kwargs = super(PasswordResetView, self).get_context_data(**kwargs)
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        kwargs.update({'evenement': evenement})
        return kwargs


class PasswordResetDoneView(accountsviews.PasswordResetDoneView):
    template_name = 'rcd/password-reset-done.html'

    def get_context_data(self, **kwargs):
        kwargs = super(PasswordResetDoneView, self).get_context_data(**kwargs)
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        kwargs.update({'evenement': evenement})
        return kwargs


class PasswordResetConfirmView(accountsviews.PasswordResetConfirmView):
    template_name = 'rcd/password-reset-confirm.html'
    form_class = forms.SetPasswordForm

    def get_context_data(self, **kwargs):
        kwargs = super(PasswordResetConfirmView,
                       self).get_context_data(**kwargs)
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        kwargs.update({'evenement': evenement})
        return kwargs


class ShowProfile(profilesviews.ShowProfile):
    template_name = "rcd/show_profile.html"

    def get_context_data(self, **kwargs):
        kwargs = super(ShowProfile, self).get_context_data(**kwargs)
        evenement = get_object_or_404(
            Evenement, slug='rijksconsultatiedag-2018')
        kwargs.update({'evenement': evenement})
        return kwargs
