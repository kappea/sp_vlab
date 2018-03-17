from django.http import Http404
from django.shortcuts import render, get_object_or_404

# Create your views here.

from .models import PageContent

def index(request):
    page = get_object_or_404(PageContent, naam='index')
    if not page.published:
        raise Http404()

    ctx = {
        'page': page,
    }
    return render(request, "designsprints/index.html", ctx)
