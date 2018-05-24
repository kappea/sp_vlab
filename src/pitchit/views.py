# -*- coding: utf-8 -*-
from django.conf import settings
from django.contrib.auth.decorators import permission_required
from django.http import Http404
from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import TemplateView, View

from survey.forms import ResponseForm
from survey.models import Answer, Category, Survey

from .models import PageContent

# Create your views here.


class IndexView(View):

    def get(self, request, *args, **kwargs):
        page = get_object_or_404(PageContent, naam='index')
        if not page.published:
            raise Http404()
        survey = page.formulier
        categories = form = None
        if survey:
            if survey.need_logged_user and not request.user.is_authenticated():
                return redirect('%s?next=%s' % (settings.LOGIN_URL, request.path))
            categories = Category.objects.filter(
                survey=survey).order_by('order')
            form = ResponseForm(survey=survey, user=None,
                                step=kwargs.get('step', 0))
        template_name = "pitchit/index.html"
        context = {
            'page': page,
            'response_form': form,
            'survey': survey,
            'categories': categories,
        }
        return render(request, template_name, context)

    def post(self, request, *args, **kwargs):
        page = get_object_or_404(PageContent, naam='index')
        if not page.published:
            raise Http404()
        survey = page.formulier
        categories = form = None
        if survey:
            if survey.need_logged_user and not request.user.is_authenticated():
                return redirect('%s?next=%s' % (settings.LOGIN_URL, request.path))
            categories = Category.objects.filter(
                survey=survey).order_by('order')
            form = ResponseForm(request.POST, survey=survey, user=None,
                                step=kwargs.get('step', 0))
            if form.is_valid():
                response = form.save()
                return redirect('pitchit:survey-confirmation', uuid=response.interview_uuid)
        template_name = "pitchit/index.html"
        context = {
            'page': page,
            'response_form': form,
            'survey': survey,
            'categories': categories,
        }
        return render(request, template_name, context)


class ConfirmView(TemplateView):

    template_name = 'pitchit/confirm.html'

    def get_context_data(self, **kwargs):
        context = super(ConfirmView, self).get_context_data(**kwargs)
        page = get_object_or_404(PageContent, naam='index')
        if not page.published:
            raise Http404()
        context['uuid'] = kwargs['uuid']
        context['page'] = page
        return context


@permission_required('pitchit.change_pagecontent')
def formulieren(request):
    page = get_object_or_404(PageContent, naam='index')
    survey = page.formulier
    if not survey:
        raise Http404()
    template_name = 'pitchit/formulieren.html'
    context = {
        'page': page,
        'survey': survey,
    }
    return render(request, template_name, context)
