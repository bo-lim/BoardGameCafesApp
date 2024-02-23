from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets

from cafes.serializers import CafeReviewsSerializer, CafesSerializer, MenuItemsSerializer
from cafes.models import Cafes, CafeReviews, MenuItems

class CafeAPI(viewsets.ModelViewSet):
    queryset = Cafes.objects.all()
    serializer_class = CafesSerializer

    @action(detail=False, methods=['get'])
    def search_by_field(self, request):
        field_name = request.query_params.get('field_name')
        field_value = request.query_params.get('field_value')
        
        if not field_name or not field_value:
            return Response({'error': 'Both field_name and field_value are required'}, status=400)

        queryset = Cafes.objects.filter(**{field_name: field_value})
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class CafeReviewAPI(viewsets.ModelViewSet):
    queryset = CafeReviews.objects.all()
    serializer_class = CafeReviewsSerializer

class MenuItemAPI(viewsets.ModelViewSet):
    queryset = MenuItems.objects.all()
    serializer_class = MenuItemsSerializer

'''
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
'''
# Create your views here.
