# Generated by Django 4.1.3 on 2022-11-24 22:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Juego',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('URLImagen', models.TextField()),
            ],
        ),
        migrations.AlterField(
            model_name='jugador',
            name='name',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.CreateModel(
            name='Juego_Jugador',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('puntaje', models.IntegerField()),
                ('id_Juego', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='App.juego')),
                ('id_Jugador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='App.jugador')),
            ],
        ),
    ]
