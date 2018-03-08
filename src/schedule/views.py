from __future__ import unicode_literals

from django.core.urlresolvers import reverse
from django.http import Http404, HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.template import loader, Context

# Create your views here.

from .forms import SlotEditForm, ScheduleSectionForm
from .models import Schedule, Day, Slot, Presentation, Session, SessionRole
from .timetable import TimeTable
from evenementen.models import Evenement

def schedule_conference(request, slug):

    evenement = get_object_or_404(Evenement, slug=slug)

    if request.user.is_staff:
        schedules = Schedule.objects.filter(hidden=False, section__conference__programma_evenement=evenement)
    else:
        schedules = Schedule.objects.filter(published=True, hidden=False, section__conference__programma_evenement=evenement)

    sections = []
    for schedule in schedules:
        days_qs = Day.objects.filter(schedule=schedule)
        days = [TimeTable(day) for day in days_qs]
        sections.append({
            "schedule": schedule,
            "days": days,
        })

    ctx = {
        'evenement': evenement,
        "sections": sections,
    }
    return render(request, "schedule/schedule_conference.html", ctx)

def schedule_presentation_detail(request, slug, pk):

    evenement = get_object_or_404(Evenement, slug=slug)

    presentation = get_object_or_404(Presentation, pk=pk)
    if presentation.slot:
        schedule = presentation.slot.day.schedule
        if not schedule.published and not request.user.is_staff:
            raise Http404()
    else:
        schedule = None

    ctx = {
        'evenement': evenement,
        "presentation": presentation,
        "schedule": schedule,
    }
    return render(request, "schedule/presentation_detail.html", ctx)
