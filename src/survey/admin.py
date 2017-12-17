from django import forms
from django.contrib import admin
from django_summernote.widgets import SummernoteWidget

# Register your models here.

from .models import Answer, Category, Question, Response, Survey
from .actions import make_published

class QuestionInline(admin.TabularInline):
    model = Question
    ordering = ('order', 'category', )
    extra = 1


class CategoryInline(admin.TabularInline):
    model = Category
    extra = 0


# Apply summernote to 'description' TextField in Survey.
class SurveyAdminForm(forms.ModelForm):
    class Meta:
        model = Survey
        widgets = {
          'description': SummernoteWidget(),
        }
        fields = '__all__'

class SurveyAdmin(admin.ModelAdmin):
    form = SurveyAdminForm
    list_display = ('name', 'is_published', 'need_logged_user', 'template')
    list_filter = ('is_published', 'need_logged_user')
    inlines = [CategoryInline, QuestionInline]
    actions = [make_published]


class AnswerBaseInline(admin.StackedInline):
    fields = ('question', 'body')
    readonly_fields = ('question',)
    extra = 0


class AnswerTextInline(AnswerBaseInline):
    model = Answer


class AnswerRadioInline(AnswerBaseInline):
    model = Answer


class AnswerSelectInline(AnswerBaseInline):
    model = Answer


class AnswerSelectMultipleInline(AnswerBaseInline):
    model = Answer


class AnswerIntegerInline(AnswerBaseInline):
    model = Answer


class ResponseAdmin(admin.ModelAdmin):
    list_display = ('interview_uuid', 'survey', 'created', 'user')
    list_filter = ('survey', 'created')
    date_hierarchy = 'created'
    inlines = [
        AnswerTextInline, AnswerRadioInline, AnswerSelectInline,
        AnswerSelectMultipleInline, AnswerIntegerInline
    ]
    # specifies the order as well as which fields to act on
    readonly_fields = (
        'survey', 'created', 'updated', 'interview_uuid', 'user'
    )


#admin.site.register(Question, QuestionInline)
#admin.site.register(Category, CategoryInline)
admin.site.register(Survey, SurveyAdmin)
admin.site.register(Response, ResponseAdmin)
