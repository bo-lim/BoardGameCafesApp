from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics

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

class SearchCafeReviewsAPI(generics.ListAPIView):
    serialzer = CafeReviewsSerializer
    def get(self) :
        obj = CafeReviews.objects.get(pk = self.kwargs['pk'])
        return obj

class SearchMenuItemAPI(generics.ListAPIView):
    serialzer = MenuItemsSerializer
    def get(self) :
        obj = MenuItems.objects.get(pk = self.kwargs['pk'])
        return obj

# Create your views here.
