# Generated by Django 4.1.3 on 2022-12-03 21:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0012_juego_juego_jugador'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='juego',
            name='categoria',
        ),
        migrations.RemoveField(
            model_name='juego_jugador',
            name='id_Juego',
        ),
        migrations.RemoveField(
            model_name='juego_jugador',
            name='id_Jugador',
        ),
        migrations.DeleteModel(
            name='Categoria',
        ),
        migrations.DeleteModel(
            name='Juego',
        ),
        migrations.DeleteModel(
            name='Juego_Jugador',
        ),
    ]
