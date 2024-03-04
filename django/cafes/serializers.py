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
    Name = serializers.CharField()
    review_count = serializers.IntegerField()

class ReviewAvgSerializer(serializers.Serializer):
    Name = serializers.CharField()
    avg_rating = serializers.FloatField()