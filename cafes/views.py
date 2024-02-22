from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from cafes.serializers import CafeReviewsSerializer, CafesSerializer, MenuItemsSerializer
from cafes.models import Cafes, CafeReviews, MenuItems

class CafeListAPI(APIView) :
    def get(self, request) :
        queryset = Cafes.objects.all()
        print(queryset)
        serialzer = CafesSerializer(queryset, many=True)
        return Response(serialzer.data)

class CafeReviewsListAPI(APIView) :
    def get(self, request) :
        queryset = CafeReviews.objects.all()
        print(queryset)
        serialzer = CafeReviewsSerializer(queryset, many=True)
        return Response(serialzer.data)

class MenuItemsListAPI(APIView) :
    def get(self, request) :
        queryset = MenuItems.objects.all()
        print(queryset)
        serialzer = MenuItemsSerializer(queryset, many=True)
        return Response(serialzer.data)

# Create your views here.
