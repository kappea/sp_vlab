# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-10-19 11:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('send_mail', '0004_emailtemplate_naam'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emailtemplate',
            name='from_email_name',
            field=models.CharField(blank=True, default='V-Lab team', help_text='Naam van de organisatie van het evenement, dit wordt getoond als verzender van de email', max_length=254, null=True),
        ),
    ]
