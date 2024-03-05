from rest_framework import serializers
from .models import Cafes, CafeReviews, MenuItems


class CafesSerializer(serializers.ModelSerializer):
    class Meta :
        model = Cafes
        fields = '__all__'

class CafeReviewsSerializer(serializers.ModelSerializer):
    class Meta :
        model = CafeReviews
        fields = '__all__'

class MenuItemsSerializer(serializers.ModelSerializer) :
    class Meta :
        model = MenuItems
        fields = '__all__'

class ReviewCountSerializer(serializers.Serializer):
    CafeID = serializers.IntegerField()
    Name = serializers.CharField()
    review_count = serializers.IntegerField()

class ReviewAvgSerializer(serializers.Serializer):
    CafeID = serializers.IntegerField()
    Name = serializers.CharField()
    avg_rating = serializers.FloatField()

class SearchByGameSerializer(serializers.Serializer):
    CafeID = serializers.IntegerField()
    Name = serializers.CharField()
    Location = serializers.CharField()
    PhoneNumber = serializers.CharField()
    OperatingHour = serializers.CharField()
    Image = serializers.FileField()
    review_count = serializers.IntegerField()