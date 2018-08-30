# -*- coding: utf-8 -*-
from django import forms
from django.utils.text import slugify

from .models import (BlokSelectie, PageContent, Programma, ProgrammaBlok,
                     ProgrammaBlokOptie, ProgrammaDeelnemer, ProgrammaKeuze)


class RadioSelectWithDisabled(forms.RadioSelect):
    """
    Subclass of Django's select widget that allows disabling options.
    To disable an option, pass a dict instead of a string for its label,
    of the form: {'label': 'option label', 'disabled': True}

    Disable choice: https://djangosnippets.org/snippets/2453/

    """

    def create_option(self, name, value, label, selected, index, subindex=None, attrs=None):
        disabled = False
        if isinstance(label, dict):
            label, disabled = label['label'], label['disabled']
        option_dict = super(RadioSelectWithDisabled, self).create_option(
            name, value, label, selected, index, subindex=subindex, attrs=attrs)
        if disabled:
            option_dict['attrs']['disabled'] = True
        return option_dict


class BlokSelectieField(forms.ChoiceField):
    def __init__(self, *args, **kwargs):
        self.programmaBlok = kwargs.pop('question')
        super(BlokSelectieField, self).__init__(*args, **kwargs)


class ProgrammaKeuzeForm(forms.ModelForm):

    class Meta:
        model = ProgrammaKeuze
        fields = ()

    def __init__(self, *args, **kwargs):
        self.deelnemer = kwargs.pop('deelnemer')
        self.programma = kwargs.pop('programma')
        super(ProgrammaKeuzeForm, self).__init__(*args, **kwargs)
        # add a field for each survey question.
        data = kwargs.get('data')
        for question in self.programma.questions.all():
            self.add_question(question, data)
        # self.add_akkoordverklaring(data)

    def _get_preexisting_response(self):
        """ Recover a pre-existing response in database.

        :rtype: Response or None"""
        try:
            return ProgrammaKeuze.objects.get(user=self.deelnemer, programma=self.programma)
        except ProgrammaKeuze.DoesNotExist:
            return None

    def _get_preexisting_answer(self, question):
        """ Recover a pre-existing answer in database.

        A Response containing the Answer must exists.

        :param Question question: The question we want to recover in the
        response.
        :rtype: Answer or None"""
        response = self._get_preexisting_response()
        if response is None:
            return None
        try:
            return BlokSelectie.objects.get(question=question, response=response)
        except BlokSelectie.DoesNotExist:
            return None

    def get_question_initial(self, question, data):
        """ Get the initial value that we should use in the Form

        :param Question question: The question
        :param dict data: Value from a POST request.
        :rtype: String or None  """
        initial = None
        answer = self._get_preexisting_answer(question)
        if answer:
            # Initialize the field with value from the database if any
            initial = []
            initial.append(slugify(u"{} ({})".format(
                answer.selectie.presentatie.title, answer.selectie.presentatie.speaker)))
        if data:
            # Initialize the field field from a POST request, if any.
            # Replace values from the database
            initial = data.get('question_%d' % question.pk)
        return initial

    def get_question_help_text(self, question):
        """ Return the help text we should use for a question.

        :param Question question: The question
        :rtype: String or None  """
        help_text = question.help_text
        if help_text and help_text.strip():
            return help_text
        else:
            return None

    def get_question_choices(self, question):
        """ Return the choices we should use for a question.

        :param Question question: The question
        :rtype: List of String or None """
        choices_list = []
        for choice in question.choices.all():
            if choice.aantal() < choice.maxaantal:
                choices_list.append((slugify(choice), choice))
            else:
                disabled = {'label': choice +
                            ' ** Volgeboekt **', 'disabled': True}
                choices_list.append((slugify(choice), disabled))
        qchoices = tuple(choices_list)
        return qchoices

    def add_question(self, question, data):
        """ Add a question to the form.

        :param Question question: The question to add.
        :param dict data: The pre-existing values from a post request. """
        kwargs = {"label": question.text,
                  "required": question.required, }
        help_text = self.get_question_help_text(question)
        if help_text:
            kwargs["help_text"] = help_text
        initial = self.get_question_initial(question, data)
        if initial:
            kwargs["initial"] = initial
        choices = self.get_question_choices(question)
        if choices:
            kwargs["choices"] = choices
        kwargs["widget"] = RadioSelectWithDisabled()
        kwargs["question"] = question
        field = BlokSelectieField(**kwargs)
        self.fields['question_%d' % question.pk] = field

    def add_akkoordverklaring(self, data):
        field = forms.BooleanField()
        self.fields['akkoordverklaring'] = field

    def save(self, commit=True):
        print('Saving...')
        response = self._get_preexisting_response()
        if response is None:
            response = super(ProgrammaKeuzeForm, self).save(commit=False)
        response.programma = self.programma
        response.user = self.deelnemer
        response.save()
        for field_name, field_value in self.cleaned_data.items():
            if field_name.startswith("question_"):
                q_id = int(field_name.split("_")[1])
                question = ProgrammaBlok.objects.get(pk=q_id)
                answer = self._get_preexisting_answer(question)
                if answer is None:
                    answer = BlokSelectie(question=question, response=response)
                for choice in question.choices.all():
                    if choice.aantal() < choice.maxaantal:
                        if field_value == slugify(choice):
                            answer.selectie = choice
                            answer.save()
