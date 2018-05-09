from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_mail(request, mail_ctx, kind, recipient):
    """
    Wrapper for sending a single message to a single recipient.
    """
    ctx = {
        'protocol': 'https',
        'domain': get_current_site(request),
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
    return email.send()
