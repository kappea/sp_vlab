# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evenementen', '0002_evenement_intro'),
    ]

    operations = [
        migrations.CreateModel(
            name='Aanmelding',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('voornaam', models.CharField(max_length=200)),
                ('achternaam', models.CharField(max_length=200)),
                ('evenement', models.ForeignKey(to='evenementen.Evenement')),
            ],
        ),
    ]
