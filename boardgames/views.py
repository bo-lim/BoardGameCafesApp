from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from boardgames.models import BoardGames
from boardgames.serializers import BoardGamesSerializer

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
