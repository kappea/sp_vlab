"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 1.11.8.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/

Django project skeleton: http://django-edge.readthedocs.io/en/latest/
Also: https://github.com/djstein/modern-django
"""

import os

import django
import environ
from django.contrib import messages
from django.core.urlresolvers import reverse_lazy

# Build paths inside the project like this: os.path.join(ROOT_DIR, ...)
ROOT_DIR = environ.Path('/var/www/vlab/')
APPS_DIR = environ.Path(__file__) - 3

env = environ.Env()
# This section added from an update to standards in CookieCutter Django to ensure no errors are encountered at runserver/migrations
READ_DOT_ENV_FILE = env.bool('DJANGO_READ_DOT_ENV_FILE', default=False)
if READ_DOT_ENV_FILE:
    env_file = str(ROOT_DIR.path('.env'))
    print('Loading : {}'.format(env_file))
    env.read_env(env_file)
    print('The .env file has been loaded. See base.py for more information')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('DJANGO_SECRET_KEY',
                 default='c5@mt%9mh(@uv^vgrcwdk4!k5q=l+ay1vhj#w&f-i7z)#$zt#y')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DJANGO_DEBUG', False)

AUTOTASK_IS_ACTIVE = env.bool('DJANGO_AUTOTASK_IS_ACTIVE', False)

# Application definition

DJANGO_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

THIRD_PARTY_APPS = (
    'django_admin_bootstrapped',
    'django.contrib.admin',
    'authtools',
    'crispy_forms',
    'easy_thumbnails',
    'django_summernote',
    'autotask',
)

LOCAL_APPS = (
    'mainscreen',
    'welkom',
    'evenementen',
    'survey',
    'profiles',
    'accounts',
    'conference',
    'schedule',
    'proposals',
    'speakers',
    'symposion',
    'designsprints',
    'afspraken',
    'elearning',
    'pitchit',
    'tools',
    'progkeuze',
)

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'config.urls'

FORM_RENDERER = 'django.forms.renderers.TemplatesSetting'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [str(APPS_DIR('templates')),
                 django.__path__[0] + '/forms/templates',
                 ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                # Insert your TEMPLATE_CONTEXT_PROCESSORS here or use this
                # list if you haven't customized them:
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

# Substitute postgres password if DATABASE_URL contains {password}
os.environ['DATABASE_URL'] = env('DATABASE_URL').format(
    password=env('POSTGRES_PASSWORD', default=''))

DATABASES = {
    # Raises ImproperlyConfigured exception if DATABASE_URL not in
    # os.environ
    'default': env.db(),
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'nl-nl'

TIME_ZONE = 'Europe/Amsterdam'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = str(ROOT_DIR('staticfiles'))
STATICFILES_DIRS = (
    str(APPS_DIR.path('static')),
)
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
MEDIA_URL = '/media/'
MEDIA_ROOT = str(ROOT_DIR('mediafiles'))

# Crispy Form Theme - Bootstrap 3
CRISPY_TEMPLATE_PACK = 'bootstrap3'

# For Bootstrap 3, change error alert to 'danger'
MESSAGE_TAGS = {
    messages.ERROR: 'danger'
}

# Authentication Settings
AUTH_USER_MODEL = 'authtools.User'
LOGIN_REDIRECT_URL = reverse_lazy("mainscreen:index")
LOGIN_URL = reverse_lazy("accounts:login")

THUMBNAIL_EXTENSION = 'png'     # Or any extn for your thumbnails

STATICFILES_STORAGE = 'mainscreen.util.DjsCompressedManifestStaticFilesStorage'

# outgoing mail SMTP host
EMAIL_HOST = env('DJANGO_EMAIL_HOST', default='localhost')
EMAIL_PORT = env.int('DJANGO_EMAIL_PORT', default=25)

PROPOSAL_FORMS = {
    "tutorial": "proposals.forms.TutorialProposalForm",
    "talk": "proposals.forms.TalkProposalForm",
    "poster": "proposals.forms.PosterProposalForm",
}
BASE_DIR = str(APPS_DIR)
