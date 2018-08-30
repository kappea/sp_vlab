from django import forms
from django.contrib import admin
from django_summernote.widgets import SummernoteWidget

# Register your models here.
from .models import (BlokSelectie, PageContent, Programma, ProgrammaBlok,
                     ProgrammaBlokOptie, ProgrammaDeelnemer, ProgrammaKeuze)

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


class ProgrammaBlokInline(admin.TabularInline):
    model = ProgrammaBlok
    ordering = ('order', )
    fields = ('text', 'order', 'required', 'help_text')
    extra = 1


class ProgrammaAdmin(admin.ModelAdmin):
    list_display = ('evenement', 'published', 'need_logged_user')
    inlines = [ProgrammaBlokInline, ]


admin.site.register(PageContent, PageContentAdmin)
admin.site.register(ProgrammaDeelnemer)
admin.site.register(Programma, ProgrammaAdmin)
admin.site.register(ProgrammaBlokOptie)
admin.site.register(ProgrammaKeuze)
admin.site.register(BlokSelectie)
