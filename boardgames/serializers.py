from rest_framework import serializers
from boardgames.models import BoardGames, BoardGameReviews


class BoardGamesSerializer(serializers.ModelSerializer):
    class Meta :
        model = BoardGames
        fields = '__all__'

class BoardGamesSerializer(serializers.ModelSerializer):
    class Meta :
        model = BoardGameReviews
        field = '__all__'