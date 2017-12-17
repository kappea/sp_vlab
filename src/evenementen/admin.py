from django import forms
from django.contrib import admin
from django_summernote.widgets import SummernoteWidget

# Register your models here.

from .models import Evenement

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

admin.site.register(Evenement, EvenementAdmin)
