from django import forms
from django_summernote.widgets import SummernoteWidget

from .models import Evenement

class EvenementForm(forms.ModelForm):
    def __init__(self, evenement_id=None, *args, **kwargs):
        super(EvenementForm, self).__init__(*args, **kwargs)
            
    class Meta:
        model = Evenement
        fields = '__all__'
        widgets = {
            # https://github.com/summernote/django-summernote
            'intro': SummernoteWidget(attrs={'width': '100%', 'height': '300px'}),
            'omschrijving': SummernoteWidget(attrs={'width': '100%', 'height': '300px'}),
            'start_datum': forms.DateInput(attrs={'class': 'date',
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
                                                  }
                                           ),
            'einde_datum': forms.DateInput(attrs={'class': 'date',
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
                                                  }
                                           ),
            }
    error_css_class = 'error'
    required_css_class = 'required'
