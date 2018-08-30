from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.utils.translation import ugettext_lazy as _

from evenementen.models import Evenement
from schedule.models import Presentation

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


class Programma(models.Model):
    evenement = models.OneToOneField(
        Evenement, related_name="programmablokken")
    published = models.BooleanField(default=True,
                                    verbose_name=_("Published"),
                                    help_text=('Aanvinken als pagina getoond moet worden'),)
    need_logged_user = models.BooleanField()

    def __str__(self):
        return u"{}".format(self.evenement)


class ProgrammaDeelnemer(models.Model):
    programma = models.ForeignKey(Programma)
    invite_email = models.CharField(max_length=200)
    naam = models.CharField(max_length=200)
    token = models.CharField(max_length=40, db_index=True)

    def __str__(self):
        return "{0}, {1}".format(
            self.programma,
            self.naam)

    class Meta:
        unique_together = [("programma", "invite_email")]
        ordering = ["programma", "naam"]


class ProgrammaBlok(models.Model):
    programma = models.ForeignKey(Programma, related_name="questions")
    text = models.TextField()
    help_text = models.TextField(blank=True, null=True)
    order = models.IntegerField()
    required = models.BooleanField()

    class Meta:
        ordering = ["programma", "order"]

    def get_choices(self):
        """
        Parse the choices field and return a tuple formatted appropriately
        for the 'choices' argument of a form widget.
        """
        choices_list = []
        for choice in self.choices.all():
            choices_list.append((slugify(choice), choice))
        choices_tuple = tuple(choices_list)
        return choices_tuple

    def __str__(self):
        msg = u"Question '{}' ".format(self.text)
        if self.required:
            msg += u"(*) "
        return msg


class ProgrammaBlokOptie(models.Model):
    programmablok = models.ForeignKey(ProgrammaBlok, related_name="choices")
    presentatie = models.ForeignKey(Presentation)
    order = models.IntegerField()
    maxaantal = models.IntegerField(blank=True, null=True)

    class Meta:
        ordering = ["programmablok", "order"]

    def aantal(self):
        return BlokSelectie.objects.filter(selectie=self).count()

    def __str__(self):
        return u"{} ({})".format(self.presentatie.title, self.presentatie.speaker)


class ProgrammaKeuze(models.Model):

    """
        A ProgrammaKeuze object is a collection of blokselecties of a eventdeelnemer.
    """

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    programma = models.ForeignKey(Programma)
    user = models.ForeignKey(ProgrammaDeelnemer)
    akkoordverklaring = models.BooleanField(default=False)

    class Meta(object):
        verbose_name = _('programmakeuze')
        verbose_name_plural = _('programmakeuzes')

    def __str__(self):
        msg = u"Keuze voor {} van {}".format(self.programma, self.user.naam)
        msg += u" gemaakt op {}".format(timezone.localtime(
            self.updated).strftime('%Y-%m-%d %H:%M'))
        return msg


class BlokSelectie(models.Model):

    question = models.ForeignKey(ProgrammaBlok, related_name="answers")
    response = models.ForeignKey(ProgrammaKeuze, related_name="answers")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    selectie = models.ForeignKey(ProgrammaBlokOptie, blank=True, null=True)

    def __str__(self):
        return u"{} to '{}' : '{}'".format(
            self.__class__.__name__, self.question, self.selectie
        )
