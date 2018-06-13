from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import Http404
from django.shortcuts import get_object_or_404, redirect, render

from proposals.models import ProposalSection

from .models import PageContent
from .signup import generate_username

# Create your views here.


@login_required
def dashboard(request):
    page = get_object_or_404(PageContent, naam='dashboard')
    if not page.published:
        raise Http404()
    if request.session.get("pending-token"):
        return redirect("speaker_create_token",
                        request.session["pending-token"])
    context = {
        'page': page,
        'proposals_are_open': bool(ProposalSection.available()),
    }
    # context.update(financial_aid(request))
    template_name = "symposion/dashboard.html"
    return render(request, template_name, context)
