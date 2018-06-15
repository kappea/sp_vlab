from django import forms
from django.db.models import Q
from django.utils.translation import ugettext_lazy as _
from django_summernote.widgets import SummernoteWidget

from .models import SupportingDocument, TalkProposal, TutorialProposal


class ProposalForm(forms.ModelForm):

    def clean_description(self):
        value = self.cleaned_data["description"]
        if len(value) > 400:
            raise forms.ValidationError(
                u"De samenvatting mag maximaal 400 karakters zijn"
            )
        return value


class TalkProposalForm(ProposalForm):

    class Meta:
        model = TalkProposal
        fields = [
            "title",
            "audience_level",
            "description",
            "abstract",
            "additional_notes",
            "akkoordverklaring",
        ]
        widgets = {
            'abstract': SummernoteWidget(attrs={'width': '100%', 'height': '300px'}),
            "additional_notes": SummernoteWidget(attrs={'width': '100%', 'height': '300px'}),
        }

    def __init__(self, *args, **kwargs):
        super(TalkProposalForm, self).__init__(*args, **kwargs)
        self.fields["akkoordverklaring"].required = True


class TutorialProposalForm(ProposalForm):

    class Meta:
        model = TutorialProposal
        fields = [
            "title",
            "audience_level",
            "description",
            "abstract",
            "additional_notes",
            "akkoordverklaring",
        ]
        widgets = {
            "abstract": SummernoteWidget(attrs={'width': '100%', 'height': '300px'}),
            "additional_notes": SummernoteWidget(attrs={'width': '100%', 'height': '300px'}),
        }

    def __init__(self, *args, **kwargs):
        super(TutorialProposalForm, self).__init__(*args, **kwargs)
        self.fields["akkoordverklaring"].required = True


# @@@ generic proposal form


class AddSpeakerForm(forms.Form):

    email = forms.EmailField(
        label=_("Email")
    )

    def __init__(self, *args, **kwargs):
        self.proposal = kwargs.pop("proposal")
        super(AddSpeakerForm, self).__init__(*args, **kwargs)

    def clean_email(self):
        value = self.cleaned_data["email"]
        exists = self.proposal.additional_speakers.filter(
            Q(user=None, invite_email=value) |
            Q(user__email=value)
        ).exists()
        if exists:
            raise forms.ValidationError(
                _("This email address has already been invited to your talk proposal")
            )
        return value


class SupportingDocumentCreateForm(forms.ModelForm):

    class Meta:
        model = SupportingDocument
        fields = [
            "file",
            "description",
        ]
