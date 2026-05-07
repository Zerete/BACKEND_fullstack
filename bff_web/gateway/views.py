from django.shortcuts import render

import requests
from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['GET'])
def obtener_mascotas(request):
    url_ms_mascotas = "http://127.0.0.1:8001/api/v1/mascota/"

    try:
        response = requests.get(url_ms_mascotas)
        return JsonResponse(response.json(), safe=False)
    except Exception:
        return JsonResponse({"error": "No se pudo conectar con el microservicio"}, status=503)