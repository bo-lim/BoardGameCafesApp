from django.db import models
from user.models import User
from cafes.models import Cafes

class BoardGames(models.Model):
    GameID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=100, null=False)
    MinPlayers = models.IntegerField(default=0)
    MaxPlayers = models.IntegerField(default=0)
    AgeLimit = models.IntegerField(default=0)
    Description = models.TextField(default='')
    VideoURL = models.CharField(max_length=100, default='')
    Image = models.FileField(upload_to = 'boardgame/', null=True)
    SearchCount = models.IntegerField(default=0)
    
    def __str__(self):
        return str(self.Name)

class BoardGameReviews(models.Model):
    Board_ReviewID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    BoardGameID = models.ForeignKey(BoardGames, on_delete=models.CASCADE)
    Rating = models.FloatField(max_length=10, null=True, default=0)
    Comment = models.CharField(max_length=200, null=False)
    Image = models.FileField(upload_to = 'review/', null=True)
    Date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.Cafe_ReviewID)

class CafeBoardGames(models.Model):
    CafeID = models.ForeignKey(Cafes, on_delete=models.CASCADE)
    GameID = models.ForeignKey(BoardGames, on_delete=models.CASCADE)
    Quantity = models.FloatField(max_length=10, null=True, default=0)