from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render

from evenementen.models import Evenement

from .models import Section

# Create your views here.


@login_required
def section_list(request, slug):

    evenement = get_object_or_404(Evenement, slug=slug)

    if request.user.is_staff:
        sections = Section.objects.filter(
            conference__programma_evenement=evenement)
    else:
        sections = Section.objects.filter(
            conference__programma_evenement=evenement)
    ctx = {
        'evenement': evenement,
        "sections": sections,
    }
    return render(request, "conference/section_list.html", ctx)
