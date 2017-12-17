# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evenementen', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='evenement',
            name='intro',
            field=models.CharField(max_length=2000, blank=True),
        ),
    ]
