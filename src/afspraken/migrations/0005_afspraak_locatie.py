# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-05-08 14:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('afspraken', '0004_afspraak_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='afspraak',
            name='locatie',
            field=models.CharField(blank=True, max_length=160),
        ),
    ]
