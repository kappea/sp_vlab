# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-06-08 13:33
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('afspraken', '0006_auto_20180607_1815'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='afspraakdeelnemer',
            unique_together=set([]),
        ),
    ]
