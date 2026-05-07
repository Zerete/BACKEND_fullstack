from django.urls import path
from .views import obtener_mascotas

urlpatterns = [
    path('mapa/', obtener_mascotas),
]