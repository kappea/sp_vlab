from django import forms
from django.contrib import admin
from django_summernote.widgets import SummernoteWidget

# Register your models here.
from .models import PageContent, Afspraak, AfspraakOptie, AfspraakDeelnemer, Beschikbaar


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
admin.site.register(Afspraak)
admin.site.register(AfspraakOptie)
admin.site.register(AfspraakDeelnemer)
admin.site.register(Beschikbaar)
