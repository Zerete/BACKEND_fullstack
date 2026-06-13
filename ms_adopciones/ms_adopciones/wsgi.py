"""
WSGI config for ms_adopciones project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ms_adopciones.settings')

application = get_wsgi_application()
