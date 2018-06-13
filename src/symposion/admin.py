from django import forms
from django.contrib import admin
from django_summernote.widgets import SummernoteWidget

from .models import PageContent

# Register your models here.

# Apply summernote to 'intro' and 'content' TextField in PageContent.


class PageContentAdminForm(forms.ModelForm):
    class Meta:
        model = PageContent
        widgets = {
            'intro': SummernoteWidget(),
            'content': SummernoteWidget(),
        }
        fields = '__all__'


class PageContentAdmin(admin.ModelAdmin):
    form = PageContentAdminForm
    pass


admin.site.register(PageContent, PageContentAdmin)
