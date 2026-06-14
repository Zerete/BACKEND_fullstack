"""
URL configuration for ms_adopciones project.
"""

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/adoptions/', include('gestion_adopciones.urls')),
]
