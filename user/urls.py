from django.contrib import admin
from django.urls import include, path
from .views import RegisterView, AuthView, CheckView, MyPageView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('auth', AuthView.as_view()),
    path('checkemail',CheckView.as_view()),
    path('mypage',MyPageView.as_view()),
]