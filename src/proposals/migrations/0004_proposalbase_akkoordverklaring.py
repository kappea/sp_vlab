# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-06-15 14:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proposals', '0003_auto_20180613_1601'),
    ]

    operations = [
        migrations.AddField(
            model_name='proposalbase',
            name='akkoordverklaring',
            field=models.BooleanField(default=False),
        ),
    ]
