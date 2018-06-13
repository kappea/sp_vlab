from __future__ import unicode_literals

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.template import Context, loader

from evenementen.models import Evenement

from .forms import PromoteProposalForm, ScheduleSectionForm, SlotEditForm
from .models import (Day, Presentation, Schedule, Session, SessionRole, Slot,
                     promote_proposal)
from .timetable import TimeTable

# Create your views here.


def fetch_schedule(slug):
    qs = Schedule.objects.all()

    if slug is None:
        if qs.count() > 1:
            raise Http404()
        schedule = next(iter(qs), None)
        if schedule is None:
            raise Http404()
    else:
        schedule = get_object_or_404(qs, section__slug=slug)

    return schedule


def schedule_conference(request, slug):

    evenement = get_object_or_404(Evenement, slug=slug)

    if request.user.is_staff:
        schedules = Schedule.objects.filter(
            hidden=False, section__conference__programma_evenement=evenement)
    else:
        schedules = Schedule.objects.filter(
            published=True, hidden=False, section__conference__programma_evenement=evenement)

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


@login_required
def schedule_edit(request, slug=None):

    if not request.user.is_staff:
        raise Http404()

    schedule = fetch_schedule(slug)

    if request.method == "POST":
        form = ScheduleSectionForm(
            request.POST, request.FILES, schedule=schedule
        )
        if form.is_valid():
            if 'submit' in form.data:
                msg = form.build_schedule()
            elif 'delete' in form.data:
                msg = form.delete_schedule()
            messages.add_message(request, msg[0], msg[1])
    else:
        form = ScheduleSectionForm(schedule=schedule)
    days_qs = Day.objects.filter(schedule=schedule)
    days = [TimeTable(day) for day in days_qs]
    ctx = {
        "schedule": schedule,
        "days": days,
        "form": form
    }
    return render(request, "schedule/schedule_edit.html", ctx)


@login_required
def schedule_slot_edit(request, slug, slot_pk):

    if not request.user.is_staff:
        raise Http404()

    slot = get_object_or_404(
        Slot, day__schedule__section__slug=slug, pk=slot_pk)

    if request.method == "POST":
        form = SlotEditForm(request.POST, slot=slot)
        if form.is_valid():
            save = False
            if "content_override" in form.cleaned_data:
                slot.content_override = form.cleaned_data["content_override"]
                save = True
            if "presentation" in form.cleaned_data:
                presentation = form.cleaned_data["presentation"]
                if presentation is None:
                    slot.unassign()
                else:
                    slot.assign(presentation)
            if save:
                slot.save()
        return redirect("schedule:schedule_edit", slug)
    else:
        form = SlotEditForm(slot=slot)
        ctx = {
            "slug": slug,
            "form": form,
            "slot": slot,
        }
        return render(request, "schedule/_slot_edit.html", ctx)


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


@login_required
def promote(request, slug=None):
    if not request.user.is_staff:
        raise Http404()
    schedule = fetch_schedule(slug)
    if request.method == "POST":
        form = PromoteProposalForm(request.POST)
        if form.is_valid():
            proposal = form.cleaned_data["voorstel"]
            promote_proposal(proposal)
    else:
        form = PromoteProposalForm()
    ctx = {
        "schedule": schedule,
        "form": form
    }
    return render(request, "schedule/promote.html", ctx)
