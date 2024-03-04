from django.contrib import admin
from django.urls import include, path
from .views import *

from .views import BoardGameView, BoardGameReviewView, CafeBoardGamesView
from rest_framework import routers

boardgame_router = routers.DefaultRouter()
boardgame_router.register(r'api', BoardGameView, basename="BoardGameView")

boardgame_view_router = routers.DefaultRouter()
boardgame_view_router.register(r'api', BoardGameReviewView, basename="BoardGameReviewView")

cafe_boardgame_router = routers.DefaultRouter()
cafe_boardgame_router.register(r'api', CafeBoardGamesView, basename="CafeBoardGamesView")

urlpatterns = [
    path('', include(boardgame_router.urls)),
    path('review/', include(boardgame_view_router.urls)),
    path('cafe/', include(cafe_boardgame_router.urls)),
]