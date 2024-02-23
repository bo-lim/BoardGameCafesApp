from django.db import models

class BoardGames(models.Model):
    GameID = models.IntegerField(primary_key=True)
    Name = models.CharField(max_length=100, null=False)
    MinPlayers = models.IntegerField(default=0)
    MaxPlayers = models.IntegerField(default=0)
    AgeLimit = models.IntegerField(default=0)
    Description = models.TextField(default='')
    
