import datetime

import icalendar
import pytz
from django.utils import timezone
from django.utils.html import strip_tags

from .models import AfspraakDeelnemer


def gen_ical(afspraak, token):
    tzinfo = timezone.get_current_timezone()
    cal = icalendar.Calendar()
    cal.add('prodid', '-// V-Lab afspraak planner //')
    cal.add('version', '2.0')
    event = icalendar.Event()
    event.add('uid', token)
    event.add('dtstamp', timezone.localtime())
    event.add('dtstart', tzinfo.localize(datetime.datetime.combine(
        afspraak.gekozen().datum, afspraak.gekozen().start)).astimezone(pytz.UTC))
    if afspraak.gekozen().einde:
        event.add('dtend', tzinfo.localize(datetime.datetime.combine(afspraak.gekozen(
        ).datum, afspraak.gekozen().einde)).astimezone(pytz.UTC))
    organizer = icalendar.vCalAddress(
        'MAILTO:{}'.format(afspraak.organisator.email))
    organizer.params['cn'] = icalendar.vText(afspraak.organisator.name)
    event.add('organizer', organizer)
    afspraakDeelnemers = AfspraakDeelnemer.objects.filter(afspraak=afspraak)
    for deelnemer in afspraakDeelnemers:
        attendee = icalendar.vCalAddress(
            'MAILTO:{}'.format(deelnemer.deelnemer.invite_email))
        attendee.params['cn'] = icalendar.vText(deelnemer.deelnemer.naam)
        event.add('attendee', attendee)
    event.add('summary', afspraak.naam)
    if afspraak.intro:
        event.add('description', strip_tags(afspraak.intro))
    if afspraak.locatie:
        event.add('location', icalendar.vText(afspraak.locatie))
    cal.add_component(event)
    return cal.to_ical()
