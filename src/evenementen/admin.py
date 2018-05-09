from django import forms
from django.contrib import admin
from django_summernote.widgets import SummernoteWidget

# Register your models here.

from .models import PageContent, Evenement

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

# Apply summernote to 'omschrijving' TextField in Evenement.


class EvenementAdminForm(forms.ModelForm):
    class Meta:
        model = Evenement
        widgets = {
            'intro': SummernoteWidget(),
            'omschrijving': SummernoteWidget(),
        }
        fields = '__all__'


class EvenementAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("naam",)}
    form = EvenementAdminForm
    pass


admin.site.register(PageContent, PageContentAdmin)
admin.site.register(Evenement, EvenementAdmin)
