# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0002_auto_20171022_1513'),
        ('evenementen', '0004_evenement_locatie'),
    ]

    operations = [
        migrations.AddField(
            model_name='evenement',
            name='aanmelding_formulier',
            field=models.ForeignKey(blank=True, null=True, related_name='evenementen', to='survey.Survey'),
        ),
    ]
