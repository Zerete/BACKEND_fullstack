from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MascotaViewSet

router = DefaultRouter()
router.register(r'mascota', MascotaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]