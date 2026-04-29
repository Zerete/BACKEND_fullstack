from django.db import models

class Mascota(models.Model):  
    TIPO_CHOICES = [
        ('dog', 'Perro'),
        ('cat', 'Gato'),
        ('other', 'Otro'),
    ]

    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    descripcion = models.TextField()
    ubicacion_nombre = models.CharField(max_length=200)
    latitud = models.FloatField()
    longitud = models.FloatField()
    fecha_reporte = models.DateTimeField(auto_now_add=True)
    is_found = models.BooleanField(default=False, verbose_name="¿Encontrado?")
    def __str__(self):
        return f"{self.nombre} - {self.tipo}"