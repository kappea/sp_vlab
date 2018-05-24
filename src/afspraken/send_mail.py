from email.mime.image import MIMEImage
from pathlib import Path

from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives
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
    message = render_to_string(
        'afspraken/emails/{}-email.txt'.format(kind),
        ctx
    )
    html_message = render_to_string(
        'afspraken/emails/{}-email.html'.format(kind),
        ctx
    )
    from_email = 'noreply@v-lab.ubrijk.nl'
    try:
        naam = mail_ctx['afspraak'].organisator.name
        if naam:
            from_email = '{} <{}>'.format(naam, from_email)
    except:
        pass
    recipient_list = [recipient]
    reply_to_list = None
    try:
        reply_to_list = [mail_ctx['afspraak'].organisator.email]
    except:
        pass
    email = EmailMultiAlternatives(
        subject,
        message,
        from_email,
        recipient_list,
        reply_to=reply_to_list,
    )
    email.attach_alternative(html_message, 'text/html')
    # set primary content to be text/html
    email.content_subtype = 'html'
    # it is important part that ensures embedding of image
    email.mixed_subtype = 'related'
    with open(header_path, mode='rb') as f:
        image = MIMEImage(f.read())
        email.attach(image)
        image.add_header('Content-ID', f'<{header_name}>')
    with open(image002_path, mode='rb') as f:
        image = MIMEImage(f.read())
        email.attach(image)
        image.add_header('Content-ID', f'<{image002_name}>')
    with open(footer_path, mode='rb') as f:
        image = MIMEImage(f.read())
        email.attach(image)
        image.add_header('Content-ID', f'<{footer_name}>')

    return email.send()
