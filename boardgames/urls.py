from django.contrib import admin
from django.urls import include, path
from .views import *

from .views import BoardGameView
from rest_framework import routers

boardgame_router = routers.DefaultRouter()
boardgame_router.register(r'bgv', BoardGameView, basename="BoardGameView")

urlpatterns = [
    path('', include(boardgame_router.urls)),
]