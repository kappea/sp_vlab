from __future__ import unicode_literals

import os
import uuid

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.core.urlresolvers import reverse
from django.db import models
from django.db.models import Q
from django.utils.encoding import python_2_unicode_compatible
from django.utils.timezone import now
from django.utils.translation import ugettext_lazy as _
from model_utils.managers import InheritanceManager
from reversion import revisions as reversion

from conference.models import Section
from speakers.models import Speaker


@python_2_unicode_compatible
class ProposalSection(models.Model):
    """
    configuration of proposal submissions for a specific Section.

    a section is available for proposals iff:
      * it is after start (if there is one) and
      * it is before end (if there is one) and
      * closed is NULL or False
    """

    section = models.OneToOneField(Section, verbose_name=_("Section"))

    start = models.DateTimeField(
        null=True, blank=True, verbose_name=_("Start"))
    end = models.DateTimeField(null=True, blank=True, verbose_name=_("End"))
    closed = models.NullBooleanField(verbose_name=_("Closed"))
    published = models.NullBooleanField(verbose_name=_("Published"))

    @classmethod
    def available(cls):
        return cls._default_manager.filter(
            Q(start__lt=now()) | Q(start=None),
            Q(end__gt=now()) | Q(end=None),
            Q(closed=False) | Q(closed=None),
        )

    def is_available(self):
        if self.closed:
            return False
        if self.start and self.start > now():
            return False
        if self.end and self.end < now():
            return False
        return True

    def __str__(self):
        return self.section.name


@python_2_unicode_compatible
class ProposalKind(models.Model):
    """
    e.g. talk vs panel vs tutorial vs poster

    Note that if you have different deadlines, reviewers, etc. you'll want
    to distinguish the section as well as the kind.
    """

    section = models.ForeignKey(
        Section, related_name="proposal_kinds", verbose_name=_("Section"))

    name = models.CharField(_("Name"), max_length=100)
    slug = models.SlugField(verbose_name=_("Slug"))

    def __str__(self):
        return self.name


@python_2_unicode_compatible
class ProposalBase(models.Model):

    objects = InheritanceManager()

    kind = models.ForeignKey(
        ProposalKind,
        verbose_name='Type',
    )
    title = models.CharField(
        max_length=100,
        verbose_name='Titel',
    )
    description = models.TextField(
        'Samenvatting',
        max_length=400,  # @@@ need to enforce 400 in UI
        help_text='Text wordt gepubliceerd. Maximaal 400 karakters.',
    )
    abstract = models.TextField(
        'Gedetailleerde beschrijving',
        help_text='Text wordt gepubliceerd.',
    )
    additional_notes = models.TextField(
        'Notities',
        blank=True,
        help_text='Interne notities. Text wordt niet gepubliceerd.',
    )
    submitted = models.DateTimeField(
        default=now,
        editable=False,
        verbose_name='Ingediend',
    )
    speaker = models.ForeignKey(
        Speaker,
        related_name="proposals",
        verbose_name='Spreker',
    )

    # @@@ this validation used to exist as a validators keyword on additional_speakers
    #     M2M field but that is no longer supported by Django. Should be moved to
    #     the form level
    def additional_speaker_validator(self, a_speaker):
        if a_speaker.speaker.email == self.speaker.email:
            raise ValidationError(
                _("%s is same as primary speaker.") % a_speaker.speaker.email)
        if a_speaker in [self.additional_speakers]:
            raise ValidationError(
                _("%s has already been in speakers.") % a_speaker.speaker.email)

    additional_speakers = models.ManyToManyField(Speaker, through="AdditionalSpeaker",
                                                 blank=True, verbose_name=_("Addtional speakers"))
    cancelled = models.BooleanField(default=False, verbose_name=_("Cancelled"))

    def can_edit(self):
        return True

    @property
    def section(self):
        return self.kind.section

    @property
    def speaker_email(self):
        return self.speaker.email

    @property
    def number(self):
        return str(self.pk).zfill(3)

    @property
    def status(self):
        try:
            return self.result.status
        except ObjectDoesNotExist:
            return _('Undecided')

    def speakers(self):
        yield self.speaker
        speakers = self.additional_speakers.exclude(
            additionalspeaker__status=AdditionalSpeaker.SPEAKING_STATUS_DECLINED)
        for speaker in speakers:
            yield speaker

    def notification_email_context(self):
        return {
            "title": self.title,
            "speaker": self.speaker.name,
            "speakers": ', '.join([x.name for x in self.speakers()]),
            "kind": self.kind.name,
        }

    def __str__(self):
        return self.title


reversion.register(ProposalBase)


@python_2_unicode_compatible
class AdditionalSpeaker(models.Model):

    SPEAKING_STATUS_PENDING = 1
    SPEAKING_STATUS_ACCEPTED = 2
    SPEAKING_STATUS_DECLINED = 3

    SPEAKING_STATUS = [
        (SPEAKING_STATUS_PENDING, _("Pending")),
        (SPEAKING_STATUS_ACCEPTED, _("Accepted")),
        (SPEAKING_STATUS_DECLINED, _("Declined")),
    ]

    speaker = models.ForeignKey(Speaker, verbose_name=_("Speaker"))
    proposalbase = models.ForeignKey(
        ProposalBase, verbose_name=_("Proposalbase"))
    status = models.IntegerField(
        choices=SPEAKING_STATUS, default=SPEAKING_STATUS_PENDING, verbose_name=_("Status"))

    class Meta:
        unique_together = ("speaker", "proposalbase")
        verbose_name = _("Addtional speaker")
        verbose_name_plural = _("Additional speakers")

    def __str__(self):
        if self.status is self.SPEAKING_STATUS_PENDING:
            return _(u"pending speaker (%s)") % self.speaker.email
        elif self.status is self.SPEAKING_STATUS_DECLINED:
            return _(u"declined speaker (%s)") % self.speaker.email
        else:
            return self.speaker.name


def uuid_filename(instance, filename):
    ext = filename.split(".")[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join("document", filename)


class SupportingDocument(models.Model):

    proposal = models.ForeignKey(
        ProposalBase, related_name="supporting_documents", verbose_name=_("Proposal"))

    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name=_("Uploaded by"))

    created_at = models.DateTimeField(
        default=now, verbose_name=_("Created at"))

    file = models.FileField(upload_to=uuid_filename, verbose_name=_("File"))
    description = models.CharField(
        max_length=140, verbose_name=_("Description"))

    def download_url(self):
        return reverse("proposals:proposal_document_download",
                       args=[self.pk, os.path.basename(self.file.name).lower()])


class Proposal(ProposalBase):

    AUDIENCE_LEVEL_NOVICE = 1
    AUDIENCE_LEVEL_EXPERIENCED = 2
    AUDIENCE_LEVEL_INTERMEDIATE = 3

    AUDIENCE_LEVELS = [
        (AUDIENCE_LEVEL_NOVICE, "Novice"),
        (AUDIENCE_LEVEL_INTERMEDIATE, "Intermediate"),
        (AUDIENCE_LEVEL_EXPERIENCED, "Experienced"),
    ]

    audience_level = models.IntegerField(choices=AUDIENCE_LEVELS)

    recording_release = models.BooleanField(
        default=True,
        help_text="By submitting your proposal, you agree to give permission to the conference organizers to record, edit, and release audio and/or video of your presentation. If you do not agree to this, please uncheck this box."
    )

    class Meta:
        abstract = True


class TalkProposal(Proposal):
    class Meta:
        verbose_name = "talk proposal"


class TutorialProposal(Proposal):
    class Meta:
        verbose_name = "tutorial proposal"
