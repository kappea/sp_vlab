from django.shortcuts import render

from afspraken.models import PageContent as AfsprakenContent
from designsprints.models import PageContent as DesignsprintsContent
from elearning.models import PageContent as ElearningContent
from evenementen.models import PageContent as EvenementenContent
from pitchit.models import PageContent as PitchitContent
from tools.models import PageContent as ToolsContent
from welkom.models import PageContent as WelkomContent


def index(request):
    try:
        afsprakenContent = AfsprakenContent.objects.get(naam='dashboard')
    except AfsprakenContent.DoesNotExist:
        afsprakenContent = None
    try:
        designsprintsContent = DesignsprintsContent.objects.get(naam='index')
    except DesignsprintsContent.DoesNotExist:
        designsprintsContent = None
    try:
        elearningContent = ElearningContent.objects.get(naam='index')
    except ElearningContent.DoesNotExist:
        elearningContent = None
    try:
        evenementenContent = EvenementenContent.objects.get(naam='index')
    except EvenementenContent.DoesNotExist:
        evenementenContent = None
    try:
        pitchitContent = PitchitContent.objects.get(naam='index')
    except PitchitContent.DoesNotExist:
        pitchitContent = None
    try:
        toolsContent = ToolsContent.objects.get(naam='index')
    except ToolsContent.DoesNotExist:
        toolsContent = None
    try:
        welkomContent = WelkomContent.objects.get(naam='index')
    except WelkomContent.DoesNotExist:
        welkomContent = None

    context = {
        'afsprakenContent': afsprakenContent,
        'designsprintsContent': designsprintsContent,
        'elearningContent': elearningContent,
        'evenementenContent': evenementenContent,
        'pitchitContent': pitchitContent,
        'toolsContent': toolsContent,
        'welkomContent': welkomContent,
    }
    return render(request, 'mainscreen/index.html', context)
