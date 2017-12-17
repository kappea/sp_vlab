# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Evenement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('naam', models.CharField(max_length=200)),
                ('omschrijving', models.TextField()),
                ('start_datum', models.DateField()),
                ('einde_datum', models.DateField(blank=True, null=True)),
                ('slug', models.SlugField(unique=True)),
            ],
        ),
    ]
