from django.contrib import admin
from .models import Mascota

@admin.register(Mascota)
class MascotaAdmin(admin.ModelAdmin):
 
    list_display = ('nombre', 'tipo', 'ubicacion_nombre', 'is_found')
    list_filter = ('tipo', 'is_found')
    search_fields = ('nombre', 'descripcion')