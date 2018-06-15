import datetime

from autotask.tasks import cron_task
from django.conf import settings
from django.db import models
from django.template.defaultfilters import date as _date
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class PageContent(models.Model):
    naam = models.SlugField(unique=True,
                            help_text=('Voor de hoofdpagina moet dit "dashboard" zijn'),)
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


class Afspraak(models.Model):
    naam = models.CharField(verbose_name=('Onderwerp'),
                            max_length=200,
                            )
    intro = models.CharField(max_length=2000,
                             blank=True,
                             help_text=(
                                 'Geef korte toelichting op uitnodiging bericht.'),
                             )
    locatie = models.CharField(max_length=160, blank=True)
    duur = models.DurationField(null=True,
                                blank=True,
                                help_text=(
                                    'Invullen indien automatisch vooringevulde eindtijd gewenst is.'),
                                )
    organisator = models.ForeignKey(settings.AUTH_USER_MODEL)
    token = models.CharField(max_length=40, db_index=True)
    aangemaakt = models.DateTimeField(default=timezone.now)
    akkoordverklaring = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Afspraken'

    def __str__(self):
        return self.naam

    def gekozen(self):
        try:
            keuze = AfspraakOptie.objects.get(afspraak=self, gekozen=True)
        except:
            keuze = None
        return keuze

    def vanaf(self):
        return AfspraakOptie.objects.filter(afspraak=self).first()

    def tot(self):
        return AfspraakOptie.objects.filter(afspraak=self).last()


class AfspraakOptie(models.Model):
    afspraak = models.ForeignKey(Afspraak)
    datum = models.DateField()
    start = models.TimeField()
    einde = models.TimeField(blank=True, null=True)
    gekozen = models.BooleanField(default=False)

    class Meta:
        ordering = ["afspraak", "datum", "start"]

    def get_optie(self):
        if self.einde:
            return "{0}: {1} - {2}".format(
                _date(self.datum, "l j F"),
                _date(self.start, "H:i"),
                _date(self.einde, "H:i"),
            )
        return "{0}: {1}".format(
            _date(self.datum, "l j F"),
            _date(self.start, "H:i"),
        )

    def __str__(self):
        if self.einde:
            return "{0}, {1}: {2} - {3}".format(
                self.afspraak,
                _date(self.datum, "l j F"),
                _date(self.start, "H:i"),
                _date(self.einde, "H:i"),
            )
        return "{0}, {1}: {2}".format(
            self.afspraak,
            _date(self.datum, "l j F"),
            _date(self.start, "H:i"),
        )

    def get_ja_count(self):
        return Beschikbaar.objects.filter(afspraakoptie=self).filter(status=Beschikbaar.JA).count()


class AfspraakDeelnemer(models.Model):
    afspraak = models.ForeignKey(Afspraak)
    invite_email = models.CharField(max_length=200)
    naam = models.CharField(max_length=200)
    token = models.CharField(max_length=40, db_index=True)

    def __str__(self):
        return "{0}, {1}".format(
            self.afspraak,
            self.naam)

    class Meta:
        unique_together = [("afspraak", "invite_email")]
        ordering = ["afspraak", "naam"]


class Beschikbaar(models.Model):
    JA = 'V'
    MISSCHIEN = '?'
    NEE = 'X'

    STATUS = [
        (JA, 'Ja'),
        (MISSCHIEN, 'Misschien'),
        (NEE, 'Nee'),
    ]

    deelnemer = models.ForeignKey(AfspraakDeelnemer)
    afspraakoptie = models.ForeignKey(AfspraakOptie)
    status = models.CharField(max_length=1,
                              choices=STATUS,
                              default=JA)

    def __str__(self):
        return "{0}, {1}".format(
            self.deelnemer,
            self.afspraakoptie)

    class Meta:
        verbose_name_plural = 'Beschikbaar'
        ordering = ["deelnemer", "afspraakoptie"]

# https://bitbucket.org/kbr/autotask/overview


@cron_task(minutes=[30], hours=[6], dow=[0, 1, 2, 3, 4])
def clean_up_afspraken():
    # delete when afspraak.gekozen
    qs = Afspraak.objects.all()
    for afspraak in qs:
        if afspraak.gekozen() != None:
            date = afspraak.gekozen().datum
            if date < datetime.date.today() - datetime.timedelta(7):
                afspraak.delete()
    return
