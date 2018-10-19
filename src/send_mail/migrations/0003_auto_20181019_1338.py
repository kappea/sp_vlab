# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-10-19 11:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('send_mail', '0002_auto_20181019_1329'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emailtemplate',
            name='html_template',
            field=models.TextField(blank=True, default='{% extends "send_mail/emails/base.html" %}\n\n{% block content %}\n<h4>Geachte {{ voornaam }} {{ achternaam }},</h4>\n{% if survey.confirm %}\n<div>\n    <p>{{ survey.confirm|safe }}</p>\n</div>\n{% endif %}\n<p>Ingevulde gegevens:</p>\n<table>\n    <tbody>\n        {% for vraag in vragen %}\n        <tr>\n            <td>{{ vraag.vraag }}:</td>\n            <td>{{ vraag.antwoord }}</td>\n        </tr>\n        {% endfor %}\n    </tbody>\n</table>\n{% endblock content %}\n\n{% block greeting %}\n<p>Met vriendelijke groet,\n    <br />\n    <br />V-Lab team\n</p>\n{% endblock greeting %}', help_text='HTML versie van de mail. Opmaak volgens https://docs.djangoproject.com/en/1.11/ref/templates/', null=True),
        ),
        migrations.AlterField(
            model_name='emailtemplate',
            name='plain_text',
            field=models.TextField(blank=True, default='{% load i18n %}{% autoescape off %}\nGeachte {{ voornaam }} {{ achternaam }},\n\n{% if survey.confirm %}{{ survey.confirm|striptags }}\n{% endif %}\n\nIngevulde gegevens:\n{% for vraag in vragen %}{{ vraag.vraag }}: {{ vraag.antwoord }}\n{% endfor %}\n\nMet vriendelijke groet,\n\nV-Lab team\n{% endautoescape %}', help_text='Tekst versie van de mail voor email readers die geen HTML ondersteunen.', null=True),
        ),
    ]