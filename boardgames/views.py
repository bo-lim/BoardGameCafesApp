from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import viewsets, status
from boardgames.models import BoardGames
from boardgames.serializers import BoardGamesSerializer
from django.db.models import Count, Avg

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
    def search_by_name(self, request):
        boardgame_name = request.query_params.get('boardgame_name')

        if not boardgame_name:
            return Response({'error': 'boardgame name is required'}, status=400)

        queryset = BoardGames.objects.filter(Name__contains=boardgame_name).order_by('Name')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search_by_number(self, request):
        number_of_people = request.query_params.get('number_of_people')

        if not number_of_people:
            return Response({'error': 'number of people is reauired'}, status=400)
        
        queryset = BoardGames.objects.filter(MinPlayers__gte=number_of_people).filter(MaxPlayers__lte=number_of_people)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

