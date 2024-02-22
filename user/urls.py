from django.contrib import admin
from django.urls import include, path
from .views import RegisterView, AuthView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('auth/', AuthView.as_view())
]