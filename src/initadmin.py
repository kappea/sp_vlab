#!/usr/bin/env python
import os

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
    import django
    django.setup()
    from authtools.models import User
    if User.objects.count() == 0:
        User.objects.create_superuser(email='albert.kappe@rijksoverheid.nl', password='Dinsdag24!')
