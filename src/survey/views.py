# -*- coding: utf-8 -*-

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import View, TemplateView
from .forms import ResponseForm
from .models import Category, Survey, Answer


class SurveyDetail(View):

    def get(self, request, *args, **kwargs):
        survey = get_object_or_404(Survey, is_published=True, id=kwargs['id'])
        if survey.template is not None and len(survey.template) > 4:
            template_name = survey.template
        else:
            if survey.display_by_question:
                template_name = 'survey/survey.html'
            else:
                template_name = 'survey/one_page_survey.html'
        if survey.need_logged_user and not request.user.is_authenticated():
            return redirect('%s?next=%s' % (settings.LOGIN_URL, request.path))
        categories = Category.objects.filter(survey=survey).order_by('order')
        form = ResponseForm(survey=survey, user=request.user,
                            step=kwargs.get('step', 0))
        context = {
            'response_form': form,
            'survey': survey,
            'categories': categories,
        }

        return render(request, template_name, context)

    def post(self, request, *args, **kwargs):
        survey = get_object_or_404(Survey, is_published=True, id=kwargs['id'])
        if survey.need_logged_user and not request.user.is_authenticated():
            return redirect('%s?next=%s' % (settings.LOGIN_URL, request.path))
        categories = Category.objects.filter(survey=survey).order_by('order')
        form = ResponseForm(request.POST, survey=survey, user=request.user,
                            step=kwargs.get('step', 0))
        context = {'response_form': form, 'survey': survey,
                   'categories': categories}
        if form.is_valid():
            session_key = 'survey_%s' % (kwargs['id'],)
            if session_key not in request.session:
                request.session[session_key] = {}
            for key, value in form.cleaned_data.items():
                request.session[session_key][key] = value
                request.session.modified = True

            next_url = form.next_step_url()
            response = None
            if survey.display_by_question:
                if not form.has_next_step():
                    save_form = ResponseForm(request.session[session_key],
                                             survey=survey, user=request.user)
                    response = save_form.save()
            else:
                response = form.save()

            if next_url is not None:
                return redirect(next_url)
            else:
                del request.session[session_key]
                if response is None:
                    return redirect('/')
                else:
                    next_ = request.session.get('next', None)
                    if next_ is not None:
                        if 'next' in request.session:
                            del request.session['next']
                        return redirect(next_)
                    else:
                        return redirect('survey:survey-confirmation',
                                        uuid=response.interview_uuid)
        if survey.template is not None and len(survey.template) > 4:
            template_name = survey.template
        else:
            if survey.display_by_question:
                template_name = 'survey/survey.html'
            else:
                template_name = 'survey/one_page_survey.html'
        return render(request, template_name, context)


class SurveyCompleted(TemplateView):

    template_name = 'survey/completed.html'

    def get_context_data(self, **kwargs):
        context = {}
        survey = get_object_or_404(Survey, is_published=True, id=kwargs['id'])
        context['survey'] = survey
        return context


class ConfirmView(TemplateView):

    template_name = 'survey/confirm.html'

    def get_context_data(self, **kwargs):
        context = super(ConfirmView, self).get_context_data(**kwargs)
        context['uuid'] = kwargs['uuid']
        return context

# https://datatables.net/extensions/responsive/


class SurveyResultData(View):

    def get(self, request, *args, **kwargs):
        survey = get_object_or_404(Survey, is_published=True, id=kwargs['id'])
        template_name = 'survey/result_data.html'
        categories = Category.objects.filter(survey=survey).order_by('order')
        headrow = []
        questions = survey.questions.all()
        for question in questions:
            headrow.append(question.text)
        headrow.append('Datum')
        headrow.append('Gebruiker')
        datarows = []
        responses = survey.responses.all()
        for response in responses:
            row = []
            for question in questions:
                try:
                    answer = Answer.objects.get(
                        question=question, response=response)
                    if len(answer.values) == 1:
                        row.append(answer.values[0])
                    else:
                        lijst = ''
                        for value in answer.values:
                            lijst = lijst + value + ';'
                            row.append(lijst)
                except Answer.DoesNotExist:
                    row.append('')
            row.append(response.updated.strftime('%Y-%m-%d %H:%M'))
            row.append(response.user)
            datarows.append(row)
        context = {
            'headrow': headrow,
            'datarows': datarows,
        }
        return render(request, template_name, context)
