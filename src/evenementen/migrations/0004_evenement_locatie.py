# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evenementen', '0003_aanmelding'),
    ]

    operations = [
        migrations.AddField(
            model_name='evenement',
            name='locatie',
            field=models.CharField(max_length=160, blank=True),
        ),
    ]
