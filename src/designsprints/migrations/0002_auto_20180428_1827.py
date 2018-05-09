# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-04-28 16:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('designsprints', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pagecontent',
            name='content',
            field=models.TextField(help_text='De pagina inhoud', verbose_name='Content'),
        ),
        migrations.AlterField(
            model_name='pagecontent',
            name='intro',
            field=models.CharField(blank=True, help_text='Maximaal 2000 characters', max_length=2000),
        ),
        migrations.AlterField(
            model_name='pagecontent',
            name='naam',
            field=models.SlugField(help_text='Voor de hoofdpagina moet dit "index" zijn', unique=True),
        ),
        migrations.AlterField(
            model_name='pagecontent',
            name='published',
            field=models.BooleanField(default=True, help_text='Aanvinken als pagina getoond moet worden', verbose_name='Published'),
        ),
    ]
