from django.urls import path

from .views import adoption_detail, adoptions

urlpatterns = [
    path('', adoptions, name='adoptions'),
    path('<int:listing_id>/', adoption_detail, name='adoption_detail'),
]
