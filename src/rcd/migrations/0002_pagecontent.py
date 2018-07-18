# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-07-18 14:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rcd', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PageContent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('naam', models.SlugField(help_text='Voor de huisregels moet dit "huisregels" zijn', unique=True)),
                ('published', models.BooleanField(default=True, help_text='Aanvinken als pagina getoond moet worden', verbose_name='Publiceren')),
                ('titel', models.CharField(max_length=64)),
                ('intro', models.CharField(blank=True, help_text='Maximaal 2000 characters', max_length=2000)),
                ('content', models.TextField(help_text='De pagina inhoud', verbose_name='Inhoud')),
            ],
        ),
    ]