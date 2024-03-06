from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import viewsets, status
from boardgames.models import BoardGames, BoardGameReviews, CafeBoardGames
from boardgames.serializers import BoardGamesSerializer, BoardGameReviewSerializer, CafeBoardGamesSerializer, CafeGamesSerializer, SearchGameReviewSerializer
from django.db.models import Count, Avg, F, Value
from cafes.models import Cafes

class BoardGameView(viewsets.ModelViewSet):
    queryset = BoardGames.objects.all()
    serializer_class = BoardGamesSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['get'])
    def search_by_id(self, request):
        game_id = request.query_params.get('game_id')

        if not game_id:
            return Response({'error': 'boardgame id is required'}, status=400)

        queryset = BoardGames.objects.filter(GameID=game_id)
        serializer = self.get_serializer(queryset, many=True)
        
        for game in queryset:
            game.SearchCount += 1
            game.save()


        return Response(serializer.data)
    
        
    @action(detail=False, methods=['get'])
    def search_by_name(self, request):
        boardgame_name = request.query_params.get('boardgame_name')

        if not boardgame_name:
            return Response({'error': 'boardgame name is required'}, status=400)

        queryset = BoardGames.objects.filter(Name__icontains=boardgame_name.lower()).order_by('Name')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search_by_number(self, request):
        number_of_people = request.query_params.get('number_of_people')

        if not number_of_people:
            return Response({'error': 'number of people is reauired'}, status=400)
        
        queryset = BoardGames.objects.filter(MinPlayers__lte=number_of_people).filter(MaxPlayers__gte=number_of_people)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search_gmae_by_cafe(self, request):
        cafe_name = request.query_params.get('cafe_name')

        if not cafe_name:
            return Response({'error': 'cafe name is reauired'}, status=400)
        
        cafe_id = Cafes.objects.get(Name=cafe_name)
        queryset = BoardGames.objects.filter(cafeboardgames__CafeID=cafe_id)
        serializer = BoardGamesSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def boardgame_limit(self, request):
        age_limit = request.query_params.get('age')

        if not age_limit:
            return Response({'error': 'age is reauired'}, status=400)
        
        queryset = BoardGames.objects.filter(AgeLimit__lte=age_limit).order_by('-AgeLimit')
        serializer = BoardGamesSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search_rank(self, request):
        queryset = BoardGames.objects.order_by('-SearchCount')
        serializer = BoardGamesSerializer(queryset, many=True)
        return Response(serializer.data)

class BoardGameReviewView(viewsets.ModelViewSet):
    queryset = BoardGameReviews.objects.all()
    serializer_class = BoardGameReviewSerializer

    @action(detail=False, methods=['get'])
    def search_by_userid(self, request):
        user_id = request.query_params.get('user_id')

        if not user_id:
            return Response({'error': 'userid is required'}, status=400)
        
        queryset = BoardGameReviews.objects.filter(UserID__contains= user_id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


    @action(detail=False, methods=['get'])
    def find_cafe_with_game(self, request):
        game_name = request.query_params.get('user_name')

        if not game_name:
            return Response({'error': 'userid is required'}, status=400)
        
    @action(detail=False, methods=['get'])
    def search_by_id(self, request):
        game_id = request.query_params.get('game_id')

        if not game_id:
            return Response({'error': 'cafe name is reauired'}, status=400)
        
        queryset = BoardGameReviews.objects.filter(BoardGameID=game_id)
        serializer = SearchGameReviewSerializer(queryset, many=True)
        return Response(serializer.data)

class CafeBoardGamesView(viewsets.ModelViewSet):
    queryset = CafeBoardGames.objects.all()
    serializer_class = CafeBoardGamesSerializer

    @action(detail=False, methods=['get'])
    def search_by_cafeid(self, request):
        cafe_id = request.query_params.get('cafe_id')

        if not cafe_id:
            return Response({'error': 'cafeid is required'}, status=400)
        
        queryset = CafeBoardGames.objects.filter(CafeID= cafe_id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def cafe_game(self, request):
        cafe_id = request.query_params.get('cafe_id')

        if not cafe_id:
            return Response({'error': 'cafeid is required'}, status=400)
        
        queryset = CafeBoardGames.objects.filter(CafeID=cafe_id)
        serializer = CafeGamesSerializer(queryset, many=True)
        return Response(serializer.data)