# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-06-08 14:04
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('afspraken', '0007_auto_20180608_1533'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='afspraakdeelnemer',
            unique_together=set([('afspraak', 'invite_email')]),
        ),
    ]
