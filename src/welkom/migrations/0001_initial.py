# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-04-28 18:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PageContent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('naam', models.SlugField(help_text='Voor de hoofdpagina moet dit "index" zijn', unique=True)),
                ('published', models.BooleanField(default=True, help_text='Aanvinken als pagina getoond moet worden', verbose_name='Published')),
                ('titel', models.CharField(max_length=64)),
                ('intro', models.CharField(blank=True, help_text='Maximaal 2000 characters', max_length=2000)),
                ('content', models.TextField(help_text='De pagina inhoud', verbose_name='Content')),
            ],
        ),
    ]
