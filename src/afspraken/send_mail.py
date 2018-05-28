import smtplib
from email.headerregistry import Address
from email.message import EmailMessage
from email.utils import make_msgid
from pathlib import Path

from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from .generate_ical import gen_ical


def send_mail(request, mail_ctx, kind, recipient):
    """
    Wrapper for sending a single message to a single recipient.
    """
    domain = get_current_site(request)
    base_path = Path(__file__).parent / 'templates' / 'afspraken' / 'emails'
    header_path = base_path / 'header.png'
    header_cid = make_msgid(domain=domain)
    image002_path = base_path / 'image002.png'
    image002_cid = make_msgid(domain=domain)
    footer_path = base_path / 'footer.png'
    footer_cid = make_msgid(domain=domain)

    ctx = {
        'protocol': 'https',
        'domain': domain,
        'header': header_cid[1:-1],
        'image002': image002_cid[1:-1],
        'footer': footer_cid[1:-1],
    }
    ctx.update(mail_ctx)

    subject = render_to_string(
        'afspraken/emails/{}-subject.txt'.format(kind),
        ctx
    ).strip()
    # Email subject *must not* contain newlines
    subject = ''.join(subject.splitlines())
    message = render_to_string(
        'afspraken/emails/{}-email.txt'.format(kind),
        ctx
    )
    html_message = render_to_string(
        'afspraken/emails/{}-email.html'.format(kind),
        ctx
    )
    naam = None
    try:
        naam = mail_ctx['afspraak'].organisator.name
    except:
        pass
    reply_to = None
    try:
        reply_to = mail_ctx['afspraak'].organisator.email
    except:
        pass
    ical = None
    try:
        if recipient == mail_ctx['afspraak'].organisator.email:
            ical = gen_ical(mail_ctx['afspraak'], mail_ctx['token'])
    except:
        pass
    # https://stackoverflow.com/questions/3902455/mail-multipart-alternative-vs-multipart-mixed
    # https://docs.python.org/3.6/library/email.examples.html
    # Create the base text message.
    msg = EmailMessage()
    msg['Message-ID'] = make_msgid(domain=domain)
    msg['Subject'] = subject
    msg['From'] = Address(
        display_name=naam, addr_spec='noreply@v-lab.ubrijk.nl')
    msg['To'] = (Address(addr_spec=recipient),)
    msg['Reply-To'] = (Address(addr_spec=reply_to),)
    msg.set_content(message)
    # Add the html version.  This converts the message into a multipart/alternative
    # container, with the original text message as the first part and the new html
    # message as the second part.
    msg.add_alternative(html_message, subtype='html')

    # Now add the related images to the html part.
    html_part = msg.get_payload()[1]
    with open(header_path, 'rb') as img:
        html_part.add_related(img.read(), 'image', 'png', cid=header_cid)
    with open(image002_path, 'rb') as img:
        html_part.add_related(img.read(), 'image', 'png', cid=image002_cid)
    with open(footer_path, 'rb') as img:
        html_part.add_related(img.read(), 'image', 'png', cid=footer_cid)
    if ical:
        msg.add_attachment(ical, maintype='text', subtype='calendar')
    # Send the message via SMTP server.
    with smtplib.SMTP(host=settings.EMAIL_HOST, port=settings.EMAIL_PORT) as s:
        s.send_message(msg)
    return
