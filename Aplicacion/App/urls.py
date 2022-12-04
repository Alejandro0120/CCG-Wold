from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('login_register/', views.login, name='Login'), 
    path('login_register/loginUsuario/', views.loginUsuario), 
    path('login_register/registrarUsuario/', views.registrarUsuario),
    path('screenGames/<userName>/', views.screenGames, name='ScreenGames'),
    path('screenGames/<userName>/screenGame/<int:value>', views.screenGame, name='ScreenGame'),
    path('screenGames/<userName>/screenGame/<int:value>/ranking/', views.ranking, name='ranking'),
    path('screenGames/<userName>/screenGame/<game>/game/',views.game, name="Game"),
    path('screenGames/<userName>/screenGame/<game>/game/<int:puntaje>/',views.agregarPunctuacion)
]