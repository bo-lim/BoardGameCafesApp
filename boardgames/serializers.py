from rest_framework import serializers
from boardgames.models import BoardGames, BoardGameReviews, CafeBoardGames


class BoardGamesSerializer(serializers.ModelSerializer):
    class Meta :
        model = BoardGames
        fields = '__all__'

class BoardGameReviewSerializer(serializers.ModelSerializer):
    class Meta :
        model = BoardGameReviews
        fields = '__all__'

class CafeBoardGamesSerializer(serializers.ModelSerializer):
    class Meta :
        model = CafeBoardGames
        fields = '__all__'

class CafeGamesSerializer(serializers.ModelSerializer):
    CafeID = serializers.IntegerField(source='CafeID.CafeID')
    GameID = serializers.IntegerField(source='GameID.GameID')
    Quantity = serializers.FloatField()
    Name = serializers.CharField(source='GameID.Name')

    class Meta:
        model = CafeBoardGames
        fields = ['CafeID', 'GameID', 'Quantity', 'Name']
