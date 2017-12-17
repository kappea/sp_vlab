# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evenementen', '0005_evenement_aanmelding_formulier'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='aanmelding',
            name='evenement',
        ),
        migrations.DeleteModel(
            name='Aanmelding',
        ),
    ]
