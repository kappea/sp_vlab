import itertools
import logging
import smtplib
from email.headerregistry import Address
from email.message import EmailMessage
from email.utils import make_msgid
from pathlib import Path

from django import template
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.text import slugify

# Create your models here.

logger = logging.getLogger("project")


class EmailTemplate(models.Model):
    """
    Email templates get stored in database so that admins can change emails on the fly

    https://blog.anvileight.com/posts/django-email-templates-with-context-stored-in-database/
    """
    naam = models.CharField(
        max_length=200,
    )
    subject = models.CharField(
        max_length=300,
        blank=True,
        null=True,
        default='Bevestiging aanmelding: {{ evenement.naam }}',
        help_text=(
            'Mail onderwerp. Er kunnen variabelen worden gebruikt zoals bijvoorbeeld: {{ evenement.naam }}'),
    )
    to_email = models.EmailField(max_length=254, blank=True, null=True)
    from_email = models.EmailField(
        max_length=254,
        blank=True,
        null=True,
        default='noreply@v-lab.ubrijk.nl',
        help_text=(
            'Het email domein moet gelijk zijn aan de domeinnaam van de website'),
    )
    from_email_name = models.CharField(
        max_length=254,
        blank=True,
        null=True,
        default='V-Lab team',
        help_text=(
            'Naam van de organisatie van het evenement, dit wordt getoond als verzender van de email'),
    )
    replyto_email = models.EmailField(
        max_length=254,
        blank=True,
        null=True,
        default='v-lab@rijksoverheid.nl',
        help_text=('Algemene mailbox van de organisatie van het evenement'),
    )
    html_template = models.TextField(
        blank=True,
        null=True,
        default='{% extends "send_mail/emails/base.html" %}\n\
\n\
{% block content %}\n\
<h4>Geachte {{ voornaam }} {{ achternaam }},</h4>\n\
{% if survey.confirm %}\n\
<div>\n\
    <p>{{ survey.confirm|safe }}</p>\n\
</div>\n\
{% endif %}\n\
<p>Ingevulde gegevens:</p>\n\
<table>\n\
    <tbody>\n\
        {% for vraag in vragen %}\n\
        <tr>\n\
            <td>{{ vraag.vraag }}:</td>\n\
            <td>{{ vraag.antwoord }}</td>\n\
        </tr>\n\
        {% endfor %}\n\
    </tbody>\n\
</table>\n\
{% endblock content %}\n\
\n\
{% block greeting %}\n\
<p>Met vriendelijke groet,\n\
    <br />\n\
    <br />V-Lab team\n\
</p>\n\
{% endblock greeting %}',
        help_text=(
            'HTML versie van de mail. Opmaak volgens https://docs.djangoproject.com/en/1.11/ref/templates/'),
    )
    plain_text = models.TextField(
        blank=True,
        null=True,
        default='{% load i18n %}{% autoescape off %}\n\
Geachte {{ voornaam }} {{ achternaam }},\n\
\n\
{% if survey.confirm %}{{ survey.confirm|striptags }}\n\
{% endif %}\n\
\n\
Ingevulde gegevens:\n\
{% for vraag in vragen %}{{ vraag.vraag }}: {{ vraag.antwoord }}\n\
{% endfor %}\n\
\n\
Met vriendelijke groet,\n\
\n\
V-Lab team\n\
{% endautoescape %}',
        help_text=(
            'Tekst versie van de mail voor email readers die geen HTML ondersteunen.'),
    )
    is_text = models.BooleanField(
        default=False,
        help_text=('Aanvinken als HTML versie niet gewenst is.'),
    )

    # unique identifier of the email template
    template_key = models.SlugField(unique=True,
                                    help_text=('Dit veld niet wijzigen omdat er naar wordt verwezen'),)

    def get_rendered_template(self, tpl, context):
        return self.get_template(tpl).render(context)

    def get_template(self, tpl):
        return template.Template(tpl)

    def get_subject(self, subject, context):
        return subject or self.get_rendered_template(self.subject, context)

    def get_sender(self):
        return self.from_email or settings.DEFAULT_FROM_EMAIL

    def get_recipient(self, emails, context):
        return emails or [self.get_rendered_template(self.to_email, context)]

    @staticmethod
    def send(*args, **kwargs):
        EmailTemplate._send(*args, **kwargs)

    @staticmethod
    def _send(template_key, request, mail_ctx, subject=None, body=None, sender=None, naam=None,
              emails=None, bcc=None, reply_to=None, attachments=None):
        mail_template = EmailTemplate.objects.get(template_key=template_key)
        domain = get_current_site(request)
        base_path = Path(__file__).parent / 'templates' / \
            'send_mail' / 'emails'
        header_path = base_path / 'header.png'
        header_cid = make_msgid(domain=domain)
        image002_path = base_path / 'image002.png'
        image002_cid = make_msgid(domain=domain)
        footer_path = base_path / 'footer.png'
        footer_cid = make_msgid(domain=domain)

        context = template.Context({
            'protocol': 'https',
            'domain': domain,
            'header': header_cid[1:-1],
            'image002': image002_cid[1:-1],
            'footer': footer_cid[1:-1],
        })
        context.update(mail_ctx)

        subject = mail_template.get_subject(subject, context)
        # Email subject *must not* contain newlines
        subject = ''.join(subject.splitlines())
        recipient = mail_template.get_recipient(emails, context)
        message = mail_template.get_rendered_template(
            mail_template.plain_text, context)
        if not mail_template.is_text:
            html_message = mail_template.get_rendered_template(
                mail_template.html_template, context)
        else:
            html_message = None

        # https://stackoverflow.com/questions/3902455/mail-multipart-alternative-vs-multipart-mixed
        # https://docs.python.org/3.6/library/email.examples.html
        # Create the base text message.
        msg = EmailMessage()
        msg['Message-ID'] = make_msgid(domain=domain)
        msg['Subject'] = subject
        msg['From'] = Address(
            display_name=naam or mail_template.from_email_name, addr_spec=sender or mail_template.get_sender())
        msg['To'] = (Address(addr_spec=recipient),)
        if reply_to == None:
            reply_to = mail_template.replyto_email
        if reply_to != None:
            msg['Reply-To'] = (Address(addr_spec=reply_to),)
        msg.set_content(message)
        if html_message != None:
            # Add the html version.  This converts the message into a multipart/alternative
            # container, with the original text message as the first part and the new html
            # message as the second part.
            msg.add_alternative(html_message, subtype='html')

            # Now add the related images to the html part.
            html_part = msg.get_payload()[1]
            with open(header_path, 'rb') as img:
                html_part.add_related(
                    img.read(), 'image', 'png', cid=header_cid)
            with open(image002_path, 'rb') as img:
                html_part.add_related(
                    img.read(), 'image', 'png', cid=image002_cid)
            with open(footer_path, 'rb') as img:
                html_part.add_related(
                    img.read(), 'image', 'png', cid=footer_cid)
        if attachments:
            for name, content, mimetype in attachments:
                maintype, subtype = mimetype.split('/', 1)
                msg.add_attachment(content, maintype=maintype,
                                   subtype=subtype, filename=name)
        # Send the message via SMTP server.
        try:
            with smtplib.SMTP(host=settings.EMAIL_HOST, port=settings.EMAIL_PORT) as s:
                s.send_message(msg)
            logger.info('Mail "{}" verzonden naar: {}'.format(
                subject, recipient))
        except Exception as e:
            logger.error('Mail sturen niet gelukt: {}'.format(e))
        return

    def __str__(self):
        return "<{}> {}".format(self.template_key, self.subject)

    def save(self, *args, **kwargs):
        if not self.pk:
            max_length = EmailTemplate._meta.get_field(
                'template_key').max_length
            self.template_key = orig = slugify(self.naam)[:max_length]
            for x in itertools.count(1):
                if not EmailTemplate.objects.filter(template_key=self.template_key).exists():
                    break
                self.template_key = "%s-%d" % (
                    orig[:max_length - len(str(x)) - 1], x)
        # Call the "real" save() method.
        super(EmailTemplate, self).save(*args, **kwargs)
