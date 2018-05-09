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


class Deelnemer(models.Model):
    invite_email = models.CharField(max_length=200, unique=True, db_index=True)
    naam = models.CharField(max_length=200)

    def __str__(self):
        return self.naam


class AfspraakDeelnemer(models.Model):
    afspraak = models.ForeignKey(Afspraak)
    deelnemer = models.ForeignKey(Deelnemer)
    token = models.CharField(max_length=40, db_index=True)

    def __str__(self):
        return "{0}, {1}".format(
            self.afspraak,
            self.deelnemer)

    class Meta:
        unique_together = [("afspraak", "deelnemer")]
        ordering = ["afspraak", "deelnemer__naam"]


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
