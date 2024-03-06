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
    id = serializers.IntegerField()
    CafeID = serializers.IntegerField(source='CafeID.CafeID')
    GameID = serializers.IntegerField(source='GameID.GameID')
    Quantity = serializers.FloatField()
    Name = serializers.CharField(source='GameID.Name')

    class Meta:
        model = CafeBoardGames
        fields = ['id', 'CafeID', 'GameID', 'Quantity', 'Name']

class SearchGameReviewSerializer(serializers.ModelSerializer):
    Board_ReviewID = serializers.IntegerField()
    UserID = serializers.IntegerField(source='UserID.id')
    BoardGameID = serializers.IntegerField(source='BoardGameID.GameID')
    Rating = serializers.FloatField()
    Comment = serializers.CharField()
    Image = serializers.FileField()
    Date = serializers.DateTimeField()
    nickname = serializers.CharField(source='UserID.nickname')
    class Meta:
        model = BoardGameReviews
        fields = ['Board_ReviewID', 'UserID', 'BoardGameID', 'Rating', 'Comment', 'Image', 'Date', 'nickname']
