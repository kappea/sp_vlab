# -*- coding: utf-8 -*-
import datetime
from django import forms
from django.core.validators import validate_email
from django.forms import models, formsets, modelformset_factory
from django_summernote.widgets import SummernoteWidget

from .models import Afspraak, Beschikbaar, AfspraakOptie, AfspraakDeelnemer


class BeschikbaarField(forms.ChoiceField):
    def __init__(self, *args, **kwargs):
        self.optie = kwargs.pop('optie')
        super(BeschikbaarField, self).__init__(*args, **kwargs)


class AfspraakForm(models.ModelForm):

    class Meta:
        model = Afspraak
        fields = [
            'naam',
            'intro',
            'locatie',
            # 'duur',
        ]
        widgets = {
            'intro': SummernoteWidget(attrs={'width': '100%', 'height': '300px'}),
            # 'duur': forms.TimeInput(format='%H:%M', attrs={'placeholder': 'HH:MM', }),
        }


class AfspraakOptieForm(forms.Form):
    datum = forms.DateField(
        widget=forms.DateInput(
            attrs={
                'class': 'date',
                'size': 20,
                'placeholder': 'DD-MM-JJJJ',
                'data-format': 'DD-MM-JJJJ',
                'data-nextmonth': 'Maand later',
                'data-nextyear': 'Jaar later',
                'data-prevmonth': 'Maand eerder',
                'data-prevyear': 'Jaar eerder',
                'data-close': 'Sluiten',
                'data-button': 'Datum kiezen',
                'data-tablecaption': 'Kies uit kalender',
                'data-months': 'Januari, Februari, Maart, April, Mei, Juni, Juli, Augustus, September, Oktober, November, December',
                'data-monthsshort': 'Jan, Feb, Maa, Apr, Mei, Jun, Jul, Aug, Sep, Okt, Nov, Dec',
                'data-days': 'Zondag, Maandag, Dinsdag, Woensdag, Donderdag, Vrijdag, Zaterdag',
                'data-daysshort': 'Zon, Maa, Din, Woe, Don, Vrij, Zat',
                'data-daysmin': 'ZO, MA, DI, WO, DO, VR, ZA',
            }),
    )
    start = forms.TimeField(
        widget=forms.TimeInput(attrs={'placeholder': 'HH:MM', })
    )
    einde = forms.TimeField(
        required=False,
        widget=forms.TimeInput(attrs={'placeholder': 'HH:MM', })
    )

    def clean_datum(self):
        date = self.cleaned_data['datum']
        if date < datetime.date.today():
            raise forms.ValidationError("Deze datum ligt in het verleden!")
        return date


AfspraakOptieFormset = formsets.formset_factory(
    AfspraakOptieForm, extra=3, min_num=2)


class AfspraakDeelnemerForm(forms.Form):
    email = forms.EmailField(widget=forms.TextInput(
        attrs={'class': 'autocomplete-me'}), max_length=150)
    naam = forms.CharField(max_length=150)


DeelnemerFormset = formsets.formset_factory(
    AfspraakDeelnemerForm, extra=3, min_num=2)


class BeschikbaarForm(forms.ModelForm):

    class Meta:
        model = Beschikbaar
        fields = ()

    def __init__(self, *args, **kwargs):
        self.deelnemer = kwargs.pop('deelnemer')
        self.afspraak = kwargs.pop('afspraak')
        super(BeschikbaarForm, self).__init__(*args, **kwargs)
        afspraakOpties = AfspraakOptie.objects.filter(afspraak=self.afspraak)
        for optie in afspraakOpties:
            self.add_option(optie)

    def add_option(self, optie):
        kwargs = {}
        kwargs["required"] = False
        kwargs["label"] = ''
        kwargs["widget"] = forms.RadioSelect(
            attrs={'style': 'display:block;position:relative;top:8px;left:50%;margin-left:-6px;'})
        kwargs["choices"] = [('V', ''), ('?', ''), ('X', '')]
        initial = None
        try:
            beschikbaar = Beschikbaar.objects.get(deelnemer=self.deelnemer,
                                                  afspraakoptie=optie)
            initial = beschikbaar.status
        except Beschikbaar.DoesNotExist:
            pass
        kwargs["initial"] = initial
        kwargs["optie"] = optie
        field = BeschikbaarField(**kwargs)
        self.fields['optie_%d' % optie.pk] = field

    def save(self, commit=True):
        for field_name, field_value in self.cleaned_data.items():
            if field_name.startswith("optie_"):
                optie_id = int(field_name.split("_")[1])
                optie = AfspraakOptie.objects.get(pk=optie_id)
                try:
                    beschikbaar = Beschikbaar.objects.get(deelnemer=self.deelnemer,
                                                          afspraakoptie=optie)
                except Beschikbaar.DoesNotExist:
                    beschikbaar = Beschikbaar(deelnemer=self.deelnemer,
                                              afspraakoptie=optie)
                beschikbaar.status = field_value
                beschikbaar.save()
