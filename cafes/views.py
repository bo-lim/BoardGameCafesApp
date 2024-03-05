from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from django.db.models import Count, Avg, F, Value
from django.db.models.functions import Coalesce

from cafes.serializers import CafeReviewsSerializer, CafesSerializer, MenuItemsSerializer, ReviewCountSerializer, ReviewAvgSerializer, SearchByGameSerializer
from cafes.models import Cafes, CafeReviews, MenuItems
from boardgames.models import BoardGames, CafeBoardGames

class CafeAPI(viewsets.ModelViewSet):
    queryset = Cafes.objects.all()
    serializer_class = CafesSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        try:
            cafe = self.queryset.get(pk=pk)
            cafe.delete()
            return Response({"message": "Cafe deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Cafes.DoesNotExist:
            return Response({"error": "Cafe not found"}, status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=False, methods=['get'])
    def search_by_name(self, request):
        name_value = request.query_params.get('cafe_name')

        if not name_value:
            return Response({'error': 'Name_value are required'}, status=400)
        queryset = Cafes.objects.filter(Name__contains=name_value)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def search_by_field(self, request):
        field_name = request.query_params.get('field_name')
        field_value = request.query_params.get('field_value')
        
        if not field_name or not field_value:
            return Response({'error': 'Both field_name and field_value are required'}, status=400)

        queryset = Cafes.objects.filter(**{field_name: field_value})
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def location_contains(self, request):
        location = request.query_params.get('location')

        if not location:
            return Response({'error': 'location is required'}, status=400)

        queryset = Cafes.objects.filter(Location__contains=location).order_by('Name')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def cafe_review_rank(self, request):
        queryset = Cafes.objects.values('CafeID', 'Name').annotate(review_count=Count('cafereviews')).order_by('-review_count')

        serializer = ReviewCountSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def cafe_review_count(self, request):
        cafe_name = request.query_params.get('cafe_name')
        
        if not cafe_name:
            return Response({'error': 'cafe name is required'}, status=400)

        queryset = Cafes.objects.values('CafeID', 'Name').annotate(review_count=Count('cafereviews')).filter(Name=cafe_name)
        
        serializer = ReviewCountSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def cafe_review_avg_rank(self, request):
        #queryset = Cafes.objects.values('Name').annotate(avg_rating=Avg('cafereviews__Rating')).order_by('-avg_rating')
        queryset = Cafes.objects.values('CafeID', 'Name').prefetch_related("cafereviews").annotate(avg_rating=Coalesce(Avg('cafereviews__Rating'), Value(0.0))).order_by('-avg_rating')

        serializer = ReviewAvgSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def cafe_review_avg(self, request):
        cafe_name = request.query_params.get('cafe_name')

        if not cafe_name:
            return Response({'error': 'cafe name is required'}, status=400)
        
        #queryset = Cafes.objects.values('Name').annotate(avg_rating=Avg('cafereviews__Rating')).filter(Name=cafe_name)
        queryset = Cafes.objects.values('CafeID', 'Name').prefetch_related("cafereviews").annotate(avg_rating=Avg('cafereviews__Rating')).filter(Name=cafe_name)

        serializer = ReviewAvgSerializer(queryset, many=True)
        return Response(serializer.data)
    
    
    @action(detail=False, methods=['get'])
    def search_cafe_by_game(self, request):
        game_name = request.query_params.get('game_name')

        if not game_name:
            return Response({'error': 'game name is required'}, status=400)
        
        game_id = BoardGames.objects.get(Name=game_name)
        
        queryset = Cafes.objects.filter(cafeboardgames__GameID=game_id).annotate(review_count=Count('cafereviews'))

        serializer = SearchByGameSerializer(queryset, many=True)
        return Response(serializer.data)


class CafeReviewAPI(viewsets.ModelViewSet):
    queryset = CafeReviews.objects.all()
    serializer_class = CafeReviewsSerializer

    @action(detail=False, methods=['get'])
    def review_cnt(self, request):
        cafe_id = request.query_params.get('cafe_id')
        if cafe_id is None:
            return Response({"error": "Cafe ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        reviews_count = CafeReviews.objects.filter(CafeID=cafe_id).count()
        return Response(reviews_count, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def search_by_userid(self, request):
        user_id = request.query_params.get('user_id')

        if not user_id:
            return Response({'error': 'userid is required'}, status=400)
        
        queryset = CafeReviews.objects.filter(**{'UserID': user_id})
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


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
