# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-08-22 09:15
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('progkeuze', '0004_auto_20180821_1707'),
    ]

    operations = [
        migrations.AlterField(
            model_name='programmablokoptie',
            name='programmablok',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='progkeuze.ProgrammaBlok'),
        ),
    ]