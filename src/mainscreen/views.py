from django.shortcuts import render

# Create your views here.

from designsprints.models import PageContent

def index(request):
    try:
        page = PageContent.objects.get(naam='index')
    except PageContent.DoesNotExist:
        page = None

    ctx = {
        'page': page,
    }
    return render(request, 'mainscreen/index.html', ctx)

def welkom(request):
    return render(request, 'mainscreen/welkom.html')
