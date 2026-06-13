"""
ASGI config for ms_adopciones project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ms_adopciones.settings')

application = get_asgi_application()
