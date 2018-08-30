from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render

from .forms import ProgrammaKeuzeForm
from .models import ProgrammaDeelnemer

# Create your views here.


def keuze(request, token):
    deelnemer = get_object_or_404(ProgrammaDeelnemer, token=token)
    programma = deelnemer.programma
    evenement = programma.evenement
    template_name = 'progkeuze/keuze.html'
    if request.method == "POST":
        form = ProgrammaKeuzeForm(
            request.POST, deelnemer=deelnemer, programma=programma)
        if form.is_valid():
            form.save()
            # Stuur notificatiemail
            messages.success(request, "Keuze vastgelegd.")
            return redirect(evenement.get_absolute_url())
    else:
        form = ProgrammaKeuzeForm(deelnemer=deelnemer, programma=programma)
    context = {
        'evenement': evenement,
        'programma': programma,
        'deelnemer': deelnemer,
        'response_form': form,
    }
    return render(request, template_name, context)
