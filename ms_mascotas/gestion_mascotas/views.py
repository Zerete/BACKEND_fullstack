from django.shortcuts import render

from rest_framework import viewsets
from .models import Mascota
from .serializers import MascotaSerializer

class MascotaViewSet(viewsets.ModelViewSet):
    
    queryset = Mascota.objects.filter(is_found=False)
    serializer_class = MascotaSerializer