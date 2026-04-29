from rest_framework import serializers
from .models import Mascota

class MascotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mascota

        fields = ['id', 'nombre', 'tipo', 'descripcion', 'ubicacion_nombre', 'latitud', 'longitud', 'fecha_reporte', 'is_found']
        
        
        