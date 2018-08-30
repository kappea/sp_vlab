from .base import *
import logging.config
from concurrent_log_handler import ConcurrentRotatingFileHandler

ALLOWED_HOSTS = ['v-lab.ubrijk.nl',
                 'acc.v-lab.external-cloud.nl',
                 'rijksconsultatiedag.nl',
                 'acc.rijksconsultatiedag.external-cloud.nl',
                 'localhost',
                 ]

CSRF_TRUSTED_ORIGINS = ['v-lab.ubrijk.nl',
                        'acc.v-lab.external-cloud.nl',
                        'rijksconsultatiedag.nl',
                        'acc.rijksconsultatiedag.external-cloud.nl',
                        'v-lab',
                        'localhost',
                        ]

DEFAULT_FROM_EMAIL = 'noreply@v-lab.ubrijk.nl'
SERVER_EMAIL = 'django@v-lab.ubrijk.nl'
ADMINS = [('Albert', 'albert.kappe@rijksoverheid.nl'), ]

SECURE_CONTENT_TYPE_NOSNIFF = True

SECURE_BROWSER_XSS_FILTER = True

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_HTTPONLY = True

CSRF_COOKIE_SECURE = True

# Enable health checking
INSTALLED_APPS += (
    'health_check',
    'health_check.db',
    'health_check.cache',
    'health_check.storage',
)

# Log everything to the logs directory at the top
LOGFILE_ROOT = ROOT_DIR.path('logs')

# Reset logging
# (see http://www.caktusgroup.com/blog/2015/01/27/Django-Logging-Configuration-logging_config-default-settings-logger/)

LOGGING_CONFIG = None
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': "[%(asctime)s] %(levelname)s [%(pathname)s:%(lineno)s] %(message)s",
            'datefmt': "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'django_log_file': {
            'level': 'DEBUG',
            'class': 'logging.handlers.ConcurrentRotatingFileHandler',
            'maxBytes': 1024 * 1024,  # 1024 * 1024 = 1MB
            'backupCount': 5,
            'filename': str(LOGFILE_ROOT('django.log')),
            'formatter': 'verbose'
        },
        'proj_log_file': {
            'level': 'DEBUG',
            'class': 'logging.handlers.ConcurrentRotatingFileHandler',
            'maxBytes': 1024 * 1024,  # 1024 * 1024 = 1MB
            'backupCount': 5,
            'filename': str(LOGFILE_ROOT('project.log')),
            'formatter': 'verbose'
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        }
    },
    'loggers': {
        'django': {
            'handlers': ['django_log_file'],
            'propagate': True,
            'level': 'DEBUG',
        },
        'django.template': {
            'handlers': ['django_log_file'],
            'level': 'INFO',
            'propagate': True,
        },
        'project': {
            'handlers': ['proj_log_file'],
            'level': 'DEBUG',
        },
    }
}

logging.config.dictConfig(LOGGING)
