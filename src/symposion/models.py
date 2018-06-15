from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class PageContent(models.Model):
    naam = models.SlugField(unique=True,
                            help_text=(
                                'Voor de hoofdpagina moet dit "dashboard" zijn, andere waarden "spreker-profiel" of "voorstel-indienen"'),
                            )
    published = models.BooleanField(default=True,
                                    verbose_name=_("Published"),
                                    help_text=('Aanvinken als pagina getoond moet worden'),)
    titel = models.CharField(max_length=64)
    intro = models.CharField(max_length=2000,
                             blank=True,
                             help_text=('Maximaal 2000 characters'),)
    content = models.TextField(verbose_name=_("Content"),
                               help_text=('De pagina inhoud'),)

    # https://www.platformrijksoverheiddemo.nl/onderwerpen/algemene-verordening-gegevensbescherming/formulieren

    avg_tekst1 = models.CharField(
        max_length=1000,
        blank=True,
        help_text=('Beschrijf hier bondig, eenvoudig en toegankelijk het primaire doel waarvoor u de persoonsgegevens vraagt, of de gegevens gedeeld worden en hoe lang ze bewaard worden.\nBijvoorbeeld:\nWij gebruiken uw gegevens om uw vraag te beantwoorden, waarna ze vernietigd worden. Uw informatie wordt niet met derden gedeeld.'),
        verbose_name=("Informatie over de verwerking van uw persoonsgegevens"),
    )
    avg_tekst2 = models.CharField(
        max_length=1000,
        blank=True,
        help_text=('De doeleinden en rechtsgrond van de verwerking, en als u zich beroept op een gerechtvaardigd belang: op welk belang u zich beroept.\nIndien nodig: Of en waarom de betrokkene verplicht is de persoonsgegevens te verstrekken en wat de gevolgen zijn als de gegevens niet worden verstrekt.\nBijvoorbeeld:\nWij gebruiken uw gegevens, met uw toestemming, omdat wij anders niet in staat zijn om uw vraag te beantwoorden.'),
        verbose_name=("Waarom worden deze gegevens gevraagd?"),
    )
    avg_tekst3 = models.CharField(
        max_length=1000,
        blank=True,
        help_text=('Wat doet u met de gegevens en met wie worden ze gedeeld. Noem de ontvangers van de persoonsgegevens en, indien van toepassing, of u van plan bent de persoonsgegevens door te geven buiten de EU of een internationale organisatie en op welke juridische grond.\nBijvoorbeeld:\nWij gebruiken uw gegevens om uw vraag te beantwoorden. Uw vraag wordt door onze eigen medewerkers beantwoord. Uw gegevens worden niet met derden gedeeld.'),
        verbose_name=("Op welke manier worden uw gegevens verwerkt?"),
    )
    avg_tekst4 = models.CharField(
        max_length=1000,
        blank=True,
        help_text=('Laat hier weten wanneer de informatie wordt vernietigd. Houd hierbij rekening met wettelijke bewaartermijnen en de selectielijsten van uw organisatie.\nBijvoorbeeld:\nZodra wij uw vraag hebben beantwoord worden uw gegevens uit onze systemen verwijderd.'),
        verbose_name=("Hoelang bewaren we uw gegevens?"),
    )

    def __str__(self):
        return self.titel
