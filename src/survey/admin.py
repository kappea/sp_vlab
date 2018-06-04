from django import forms
from django.contrib import admin
from django_summernote.widgets import SummernoteWidget

from .actions import make_published
from .models import Answer, Category, Question, Response, Survey

# Register your models here.


class QuestionInline(admin.TabularInline):
    model = Question
    ordering = ('order', 'category', )
    fields = ('text', 'order', 'type', 'required',
              'category', 'choices', 'help_text')
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
            'avg_tekst1': forms.Textarea(attrs={'cols': '80', 'rows': '3'}),
            'avg_tekst2': forms.Textarea(attrs={'cols': '80', 'rows': '3'}),
            'avg_tekst3': forms.Textarea(attrs={'cols': '80', 'rows': '3'}),
            'avg_tekst4': forms.Textarea(attrs={'cols': '80', 'rows': '3'}),
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
    model = Answer


class ResponseAdmin(admin.ModelAdmin):
    list_display = ('interview_uuid', 'survey', 'created', 'user')
    list_filter = ('survey', 'created')
    date_hierarchy = 'created'
    inlines = [AnswerBaseInline]
    # specifies the order as well as which fields to act on
    readonly_fields = (
        'survey', 'created', 'updated', 'interview_uuid', 'user'
    )


#admin.site.register(Question, QuestionInline)
#admin.site.register(Category, CategoryInline)
admin.site.register(Survey, SurveyAdmin)
admin.site.register(Response, ResponseAdmin)
