from django.contrib import admin
from django.urls import include, path, re_path
from django.conf.urls.static import static

from diceBackendProject import settings
'''
from .views import MenuItemsListAPI, SearchCafeReviewsAPI, CafeListAPI, CafeReviewsListAPI, SearchMenuItemAPI
'''
from .views import CafeAPI, CafeReviewAPI, MenuItemAPI
from rest_framework import routers

cafe_router = routers.DefaultRouter()
cafe_router.register(r'api', CafeAPI, basename="cafe_post")

cafe_review_router = routers.DefaultRouter()
cafe_review_router.register(r'api', CafeReviewAPI, basename="review_post")

menu_router = routers.DefaultRouter()
menu_router.register(r'api', MenuItemAPI, basename="menu_post")

urlpatterns = [
    path('', include(cafe_router.urls)),
    path('review/', include(cafe_review_router.urls)),
    path('menuItem/', include(menu_router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)