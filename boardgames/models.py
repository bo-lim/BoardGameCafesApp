from django.db import models

class BoardGames(models.Model):
    GameID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=100, null=False)
    MinPlayers = models.IntegerField(default=0)
    MaxPlayers = models.IntegerField(default=0)
    AgeLimit = models.IntegerField(default=0)
    Description = models.TextField(default='')
    VideoURL = models.CharField(max_length=100, default='')
    Image = models.FileField(upload_to = 'boardgame/', null=True)
    
    def __str__(self):
        return str(self.Name)
