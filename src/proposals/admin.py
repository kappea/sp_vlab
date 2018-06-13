from django.contrib import admin

# from symposion.proposals.actions import export_as_csv_action
from .models import (AdditionalSpeaker, ProposalKind, ProposalSection,
                     SupportingDocument, TalkProposal, TutorialProposal)

# admin.site.register(Proposal,
#     list_display = [
#         "id",
#         "title",
#         "speaker",
#         "speaker_email",
#         "kind",
#         "audience_level",
#         "cancelled",
#     ],
#     list_filter = [
#         "kind__name",
#         "result__accepted",
#     ],
#     actions = [export_as_csv_action("CSV Export", fields=[
#         "id",
#         "title",
#         "speaker",
#         "speaker_email",
#         "kind",
#     ])]
# )


admin.site.register(TalkProposal)
admin.site.register(TutorialProposal)
admin.site.register(ProposalSection)
admin.site.register(ProposalKind)
admin.site.register(AdditionalSpeaker)
admin.site.register(SupportingDocument)
