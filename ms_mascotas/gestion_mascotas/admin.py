from django.contrib import admin
from .models import Mascota

@admin.register(Mascota)
class MascotaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'is_found', 'fecha_reporte')
    list_filter = ('tipo', 'is_found')
    search_fields = ('nombre', 'descripcion')
    
    