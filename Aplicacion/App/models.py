from django.db import models

# Create your models here.

class Jugador(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=8)

class Juego(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField(null=True)
    URLImagen = models.TextField()

class Juego_Jugador(models.Model):
    id_Jugador = models.ForeignKey(Jugador, on_delete=models.CASCADE)
    id_Juego = models.ForeignKey(Juego, on_delete=models.CASCADE)
    puntaje = models.IntegerField()