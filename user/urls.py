from django.contrib import admin
from django.urls import include, path
from .views import RegisterAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view())
]