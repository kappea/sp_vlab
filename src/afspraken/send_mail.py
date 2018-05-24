import smtplib
from email.headerregistry import Address
from email.message import EmailMessage
from pathlib import Path

from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_mail(request, mail_ctx, kind, recipient):
    """
    Wrapper for sending a single message to a single recipient.
    """
    base_path = Path(__file__).parent / 'templates' / 'afspraken' / 'emails'
    header_path = base_path / 'header.png'
    header_name = Path(header_path).name
    image002_path = base_path / 'image002.png'
    image002_name = Path(image002_path).name
    footer_path = base_path / 'footer.png'
    footer_name = Path(footer_path).name

    ctx = {
        'protocol': 'https',
        'domain': get_current_site(request),
        'header': header_name,
        'image002': image002_name,
        'footer': footer_name,
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

    # https://stackoverflow.com/questions/3902455/mail-multipart-alternative-vs-multipart-mixed
    # https://docs.python.org/3.6/library/email.examples.html
    # Create the base text message.
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = Address(
        display_name=naam, addr_spec='noreply@v-lab.ubrijk.nl')
    msg['To'] = (Address(addr_spec=recipient),)
    msg['Reply-to'] = (Address(addr_spec=reply_to),)
    msg.set_content(message)
    # Add the html version.  This converts the message into a multipart/alternative
    # container, with the original text message as the first part and the new html
    # message as the second part.
    msg.add_alternative(html_message, subtype='html')

    # Now add the related images to the html part.
    html_part = msg.get_payload()[1]
    with open(header_path, 'rb') as img:
        html_part.add_related(img.read(), 'image', 'png', cid=header_name)
    with open(image002_path, 'rb') as img:
        html_part.add_related(img.read(), 'image', 'png', cid=image002_name)
    with open(footer_path, 'rb') as img:
        html_part.add_related(img.read(), 'image', 'png', cid=footer_name)

    # Send the message via SMTP server.
    with smtplib.SMTP(host=settings.EMAIL_HOST, port=settings.EMAIL_PORT) as s:
        s.send_message(msg)

    return
