from django.shortcuts import render, redirect
from .models import Jugador, Categoria, Juego, Juego_Jugador
from django.core.exceptions import ObjectDoesNotExist
from django.db import connection
# Create your views here.

def inicio(request):
    
    return render(request, "index.html")

def login(request):
    
    return render(request, "login_register.html")

def loginUsuario(request):
    nameUser = request.POST['user']
    userPass = request.POST['pass']
    if nameUser != '' and userPass != '':
        try:
            Jugador.objects.get(name=nameUser, password=userPass)
            return redirect('ScreenGames',userName=nameUser)
        except ObjectDoesNotExist:
            return redirect('/login_register/')

def registrarUsuario(request):
    nameUser = request.POST['userReg']
    userPass = request.POST['passReg']
    userComprPass = request.POST['passReg2']
    red = ''
    if nameUser != '' and userPass != '' and userComprPass == userPass:
        try:
            Jugador.objects.get(name=nameUser)
            return redirect('/login_register/')
        except ObjectDoesNotExist:
            Jugador.objects.create(name=nameUser, password=userPass)
            return redirect('/screenGames/',userName=nameUser)
    else:
        return redirect('/login_register/')

    
    


def screenGames(request,userName):
    categoria = Categoria.objects.all()
    games = Juego.objects.all()
    return render(request, "screenGames.html",{
        'userName':userName,
        'categorias': categoria,
        'juegos': games
        })

def screenGame(request,userName,value):
    game = Juego.objects.get(id=value).URLGame
    return render(request, "screenGame.html",{
        'userName': userName,
        'game':value,
        'urlGame': game
    })

def ranking(request,userName,value):
    # Jugador.objects.create(name="prueba",password="123")
    
    rank = Juego_Jugador.objects.all().filter(id_Juego=value).order_by('-puntaje')
    
    return render(request, "ranking.html",{
        'rank': rank
    })

def game(request, userName, game):
    htmlGame = "games/game"+game+".html"
    return render(request, htmlGame, {
        'userName': userName
    })

def agregarPunctuacion(request,userName,game,puntaje):
    if userName != 'Invitado':
        var1= Jugador.objects.get(name=userName)
        intId = int(var1.id)
        var = Juego_Jugador.objects.all().filter(id_Jugador=intId, id_Juego=int(game))
        
        if var.count() > 0:
            if var.get().puntaje < int(puntaje):
                update = var.get() 
                update.puntaje = puntaje
                update.save()
        else:
            Juego_Jugador.objects.create(id_Juego_id=game,id_Jugador_id=intId,puntaje=puntaje)
    
    return redirect("/screenGames/"+userName+"/screenGame/"+game)