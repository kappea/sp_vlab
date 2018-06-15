# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-06-15 12:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('speakers', '0003_speaker_akkoordverklaring'),
    ]

    operations = [
        migrations.AlterField(
            model_name='speaker',
            name='biography',
            field=models.TextField(blank=True, help_text='Uw korte introductie', verbose_name='Biografie'),
        ),
        migrations.AlterField(
            model_name='speaker',
            name='photo',
            field=models.ImageField(blank=True, upload_to='speaker_photos', verbose_name='Foto'),
        ),
    ]
