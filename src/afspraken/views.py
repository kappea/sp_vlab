import datetime
import hashlib
from operator import attrgetter

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render

from .forms import (AfspraakForm, AfspraakOptieFormset, BeschikbaarForm,
                    DeelnemerFormset)
from .generate_ical import gen_ical
from .models import (Afspraak, AfspraakDeelnemer, AfspraakOptie, Beschikbaar,
                     PageContent)
from .send_mail import send_mail


class Beschik:
    def __init__(self, src, alt):
        self.src = src
        self.alt = alt


class Afspr:
    def __init__(self, afspraak, token):
        self.afspraak = afspraak
        self.token = token


def dashboard(request):
    page = get_object_or_404(PageContent, naam='dashboard')
    if not page.published:
        raise Http404()
    afspraak_dict = {}
    afspraken = None
    if request.user.is_authenticated():
        try:
            afspraken = Afspraak.objects.filter(organisator=request.user)
            for afspraak in afspraken:
                afspraak_dict[afspraak] = afspraak.token
            mijnDeelnemingen = AfspraakDeelnemer.objects.filter(invite_email=request.user.email)
            for deelneming in mijnDeelnemingen:
                afspraak_dict[deelneming.afspraak] = deelneming.token
            afspraak_lijst = sorted(
                afspraak_dict, key=attrgetter('aangemaakt'), reverse=True)
            afspraken = []
            for afspraak in afspraak_lijst:
                afspraken.append(Afspr(afspraak, afspraak_dict[afspraak]))
        except:
            pass
    ctx = {
        'page': page,
        'afspraken': afspraken
    }
    return render(request, "afspraken/dashboard.html", ctx)


@login_required
def plannen(request):
    template_name = 'afspraken/plannen.html'
    if request.method == 'POST':
        afspraak_form = AfspraakForm(
            request.POST, prefix='afspraak_form')
        deelnemer_formset = DeelnemerFormset(
            request.POST, prefix='deelnemer_form')
        afspraakoptie_formset = AfspraakOptieFormset(
            request.POST, prefix='afspraakoptie_form')
        if afspraak_form.is_valid() and deelnemer_formset.is_valid() and afspraakoptie_formset.is_valid():
            afspraak = afspraak_form.save(commit=False)
            afspraak.organisator = request.user
            afspraak.token = hashlib.sha1(
                str(afspraak.aangemaakt.isoformat() +
                    afspraak.naam+request.user.email).encode('utf-8')).hexdigest()
            afspraak.save()
            for deelnemer_form in deelnemer_formset:
                email = deelnemer_form.cleaned_data.get('email')
                if email != None:
                    afspraakDeelnemer = AfspraakDeelnemer(
                        afspraak=afspraak,
                        invite_email=email,
                        naam=deelnemer_form.cleaned_data['naam'],
                        token=hashlib.sha1(
                            str(afspraak.aangemaakt.isoformat() +
                                afspraak.naam+email).encode('utf-8')).hexdigest()
                    )
                    try:
                        afspraakDeelnemer.save()
                        if not afspraakDeelnemer.invite_email == request.user.email:
                            # Nodig deelnemer uit
                            mail_ctx = {
                                'afspraak': afspraak,
                                'deelnemer': afspraakDeelnemer,
                                'token': afspraakDeelnemer.token,
                            }
                            send_mail(
                                request,
                                mail_ctx,
                                'uitnodigen',
                                afspraakDeelnemer.invite_email
                            )
                    except IntegrityError:
                        pass
            for afspraakoptie_form in afspraakoptie_formset:
                datum = afspraakoptie_form.cleaned_data.get('datum')
                if datum != None:
                    einde = afspraakoptie_form.cleaned_data['einde']
                    if einde == None:
                        if afspraak.duur != None:
                            tmp_datetime = datetime.datetime.combine(datetime.date(
                                1, 1, 1), afspraakoptie_form.cleaned_data['start'])
                            einde = (tmp_datetime + afspraak.duur).time()
                    afspraakOptie = AfspraakOptie(
                        afspraak=afspraak,
                        datum=afspraakoptie_form.cleaned_data['datum'],
                        start=afspraakoptie_form.cleaned_data['start'],
                        einde=einde,
                    )
                    afspraakOptie.save()
            try:
                mijnDeelneming = AfspraakDeelnemer.objects.get(afspraak=afspraak,
                                                               invite_email=request.user.email)
                # Stuur bevestigingsmail (organisator neemt zelf deel)
                mail_ctx = {
                    'afspraak': afspraak,
                    'deelnemer': mijnDeelneming,
                    'token': mijnDeelneming.token,
                }
                send_mail(
                    request,
                    mail_ctx,
                    'bevestigen',
                    request.user.email
                )
                return redirect("afspraken:overzicht", mijnDeelneming.token)
            except:
                # Stuur bevestigingsmail (organisator neemt zelf niet deel)
                mail_ctx = {
                    'afspraak': afspraak,
                    'deelnemer': None,
                    'token': afspraak.token,
                }
                send_mail(
                    request,
                    mail_ctx,
                    'bevestigen',
                    request.user.email
                )
                return redirect("afspraken:overzicht", afspraak.token)
    else:
        afspraak_form = AfspraakForm(
            prefix='afspraak_form',
        )
        initial = [{'naam': request.user.name,
                    'email': request.user.email}]
        deelnemer_formset = DeelnemerFormset(
            prefix='deelnemer_form',
            initial=initial,
        )
        afspraakoptie_formset = AfspraakOptieFormset(
            prefix='afspraakoptie_form')
    context = {
        'afspraak_form': afspraak_form,
        'deelnemer_formset': deelnemer_formset,
        'afspraakoptie_formset': afspraakoptie_formset,
    }
    return render(request, template_name, context)


@login_required
def vaststellen(request, token, optie_id):
    afspraak = None
    try:
        mijnDeelneming = AfspraakDeelnemer.objects.get(token=token)
        afspraak = mijnDeelneming.afspraak
    except AfspraakDeelnemer.DoesNotExist:
        mijnDeelneming = None
        afspraak = get_object_or_404(Afspraak, token=token)
    if afspraak.organisator == request.user:
        if afspraak.gekozen() != None:
            messages.error(request, "Er is al een optie vastgesteld.")
            return redirect("afspraken:overzicht", token)
        optie = get_object_or_404(AfspraakOptie, pk=optie_id)
        if optie.afspraak != afspraak:
            raise Http404()
    else:
        messages.error(
            request, "U bent niet de organisator van deze datum prikker. Optie is niet vastgesteld.")
        return redirect("afspraken:overzicht", token)
    template_name = 'afspraken/vaststellen.html'
    if request.method == "POST":
        if not optie.gekozen:
            optie.gekozen = True
            optie.save()
            afspraakDeelnemers = AfspraakDeelnemer.objects.filter(
                afspraak=afspraak)
            for afspraakDeelnemer in afspraakDeelnemers:
                # Stuur vaststellingsmail
                mail_ctx = {
                    'afspraak': afspraak,
                    'deelnemer': afspraakDeelnemer,
                    'token': afspraakDeelnemer.token,
                }
                send_mail(
                    request,
                    mail_ctx,
                    'vaststellen',
                    afspraakDeelnemer.invite_email
                )
            messages.success(request, "Afspraakoptie vastgesteld.")
        return redirect("afspraken:overzicht", token)
    context = {
        'afspraak': afspraak,
        'optie': optie,
        'token': token,
    }
    return render(request, template_name, context)


@login_required
def verwijderen(request, token):
    afspraak = None
    try:
        mijnDeelneming = AfspraakDeelnemer.objects.get(token=token)
        afspraak = mijnDeelneming.afspraak
    except AfspraakDeelnemer.DoesNotExist:
        mijnDeelneming = None
        afspraak = get_object_or_404(Afspraak, token=token)
    if not afspraak.organisator == request.user:
        messages.error(
            request, "U bent niet de organisator van deze datum prikker. Afspraak is niet verwijderd.")
        return redirect("afspraken:overzicht", token)
    template_name = 'afspraken/verwijderen.html'
    if request.method == "POST":
        naam = str(afspraak)
        afspraak.delete()
        messages.success(request, "Afspraak {} verwijderd.".format(naam))
        return redirect("afspraken:dashboard")
    context = {
        'afspraak': afspraak,
        'token': token,
    }
    return render(request, template_name, context)


def overzicht(request, token):
    afspraak = None
    organisator = None
    try:
        mijnDeelneming = AfspraakDeelnemer.objects.get(token=token)
        afspraak = mijnDeelneming.afspraak
        if mijnDeelneming.invite_email == afspraak.organisator.email:
            organisator = afspraak.organisator
    except AfspraakDeelnemer.DoesNotExist:
        mijnDeelneming = None
        afspraak = get_object_or_404(Afspraak, token=token)
        organisator = afspraak.organisator
    afspraakOpties = AfspraakOptie.objects.filter(afspraak=afspraak)
    afspraakDeelnemers = AfspraakDeelnemer.objects.filter(afspraak=afspraak)
    template_name = 'afspraken/overzicht.html'
    headrow = []
    for optie in afspraakOpties:
        headrow.append(optie)
    datarows = []
    for deelnemer in afspraakDeelnemers:
        row = []
        row.append(deelnemer)
        for optie in afspraakOpties:
            try:
                beschikbaar = Beschikbaar.objects.get(deelnemer=deelnemer,
                                                      afspraakoptie=optie)
                if beschikbaar.status == Beschikbaar.JA:
                    b = Beschik(
                        'afspraken/yes.png', '{0} kan op {1} uur'.format(deelnemer.naam, optie.get_optie()))
                    row.append(b)
                elif beschikbaar.status == Beschikbaar.MISSCHIEN:
                    b = Beschik('afspraken/maybe.png', '{0} kan misschien op {1} uur'.format(
                        deelnemer.naam, optie.get_optie()))
                    row.append(b)
                else:
                    b = Beschik(
                        'afspraken/no.png', '{0} kan niet op {1} uur'.format(deelnemer.naam, optie.get_optie()))
                    row.append(b)
            except:
                row.append(None)
        datarows.append(row)
    context = {
        'afspraak': afspraak,
        'token': token,
        'headrow': headrow,
        'datarows': datarows,
        'mijnDeelneming': mijnDeelneming,
        'organisator': organisator,
    }
    return render(request, template_name, context)


def ical(request, token):
    afspraak = None
    organisator = None
    try:
        mijnDeelneming = AfspraakDeelnemer.objects.get(token=token)
        afspraak = mijnDeelneming.afspraak
        if mijnDeelneming.invite_email == afspraak.organisator.email:
            organisator = afspraak.organisator
    except AfspraakDeelnemer.DoesNotExist:
        mijnDeelneming = None
        afspraak = get_object_or_404(Afspraak, token=token)
        organisator = afspraak.organisator
    if afspraak.gekozen() == None:
        raise Http404()
    response = HttpResponse(gen_ical(afspraak, token))
    response['Content-Type'] = 'text/calendar'
    return response


def beschikbaarheid(request, token):
    mijnDeelneming = get_object_or_404(AfspraakDeelnemer, token=token)
    afspraak = mijnDeelneming.afspraak
    if afspraak.gekozen() != None:
        return redirect("afspraken:overzicht", token)
    template_name = 'afspraken/beschikbaarheid.html'
    datarows = []
    afspraakOpties = AfspraakOptie.objects.filter(afspraak=afspraak)
    for optie in afspraakOpties:
        datarows.append(optie)
    if request.method == "POST":
        form = BeschikbaarForm(
            request.POST, deelnemer=mijnDeelneming, afspraak=afspraak)
        if form.is_valid():
            form.save()
            # Stuur notificatiemail
            mail_ctx = {
                'afspraak': afspraak,
                'deelnemer': mijnDeelneming,
                'token': afspraak.token,
            }
            send_mail(
                request,
                mail_ctx,
                'notificeren',
                afspraak.organisator.email
            )
            messages.success(request, "Beschikbaarheid vastgelegd.")
            return redirect("afspraken:overzicht", token)
    else:
        form = BeschikbaarForm(deelnemer=mijnDeelneming, afspraak=afspraak)
    context = {
        'afspraak': afspraak,
        'mijnDeelneming': mijnDeelneming,
        'datarows': datarows,
        'form': form,
    }
    return render(request, template_name, context)
