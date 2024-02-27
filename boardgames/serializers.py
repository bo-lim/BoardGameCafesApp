from rest_framework import serializers
from boardgames.models import BoardGames


class BoardGamesSerializer(serializers.ModelSerializer):
    class Meta :
        model = BoardGames
        fields = '__all__'
