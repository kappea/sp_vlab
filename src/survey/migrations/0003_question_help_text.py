# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0002_auto_20171022_1513'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='help_text',
            field=models.TextField(blank=True, null=True),
        ),
    ]
