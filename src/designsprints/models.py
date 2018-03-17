from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.

class PageContent(models.Model):
    naam = models.SlugField(unique=True,
                            help_text=('Voor de hoofdpagina moet dit "index" zijn'),)
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
