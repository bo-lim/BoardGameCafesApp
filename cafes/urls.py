from django.contrib import admin
from django.urls import include, path
from .views import MenuItemsListAPI, SearchCafeReviewsAPI, CafeListAPI, CafeReviewsListAPI, SearchMenuItemAPI

urlpatterns = [
    path('cafeList', CafeListAPI.as_view()),
    path('cafeReviewList', CafeReviewsListAPI.as_view()),
    path('menuItemList', MenuItemsListAPI.as_view()),
    path('searchCafeReview/<int:pk>', SearchCafeReviewsAPI.as_view()),
    path('searchMenuItemReview/<int:pk>', SearchMenuItemAPI.as_view()),
]