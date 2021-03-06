import datetime

from django.contrib import messages
from django.contrib.auth.decorators import login_required, permission_required
from django.core.urlresolvers import reverse
from django.http import Http404
from django.shortcuts import get_object_or_404, redirect, render

from .forms import EvenementForm
from .models import Evenement, PageContent

# Create your views here.


def evenementen(request):
    page = get_object_or_404(PageContent, naam='index')
    if not page.published:
        raise Http404()
    template_name = 'evenementen/evenementen.html'
    evenement_list = Evenement.objects.filter(
        start_datum__gte=datetime.date.today())
    context = {
        'page': page,
        'evenement_list': evenement_list
    }
    return render(request, template_name, context)


def historie(request):
    page = get_object_or_404(PageContent, naam='index')
    if not page.published:
        raise Http404()
    template_name = 'evenementen/historie.html'
    evenement_list = Evenement.objects.filter(
        start_datum__lt=datetime.date.today())
    context = {
        'page': page,
        'evenement_list': evenement_list
    }
    return render(request, template_name, context)


def evenement_overzicht(request, slug):
    template_name = 'evenementen/evenement_overzicht.html'
    evenement = get_object_or_404(Evenement, slug=slug)
    context = {'evenement': evenement}
    return render(request, template_name, context)


@permission_required('evenementen.change_evenement')
def evenement_aanmeldingen(request, slug):
    template_name = 'evenementen/evenement_aanmeldingen.html'
    evenement = get_object_or_404(Evenement, slug=slug)
    context = {'evenement': evenement}
    return render(request, template_name, context)


@permission_required('evenementen.change_evenement')
def evenement_evaluaties(request, slug):
    template_name = 'evenementen/evenement_evaluaties.html'
    evenement = get_object_or_404(Evenement, slug=slug)
    context = {'evenement': evenement}
    return render(request, template_name, context)


@permission_required('evenementen.add_evenement')
def evenement_voegtoe(request):
    template_name = 'evenementen/evenement_voegtoe.html'
    if request.method == 'POST':
        form = EvenementForm(request.POST)
        if form.is_valid():
            evenement = form.save()
            messages.success(request, "Evenement toegevoegd.")
            return redirect(evenement.get_absolute_url())
    else:
        form = EvenementForm()
    context = {'form': form}
    return render(request, template_name, context)


@permission_required('evenementen.change_evenement')
def evenement_wijzig(request, slug):
    template_name = 'evenementen/evenement_wijzig.html'
    evenement = get_object_or_404(Evenement, slug=slug)
    if request.method == 'POST':
        form = EvenementForm(request.POST, instance=evenement)
        if form.is_valid():
            evenement = form.save()
            messages.success(request, "Evenement gewijzigd.")
            return redirect(evenement.get_absolute_url())
    else:
        form = EvenementForm(instance=evenement)
    context = {'evenement': evenement, 'form': form}
    return render(request, template_name, context)
