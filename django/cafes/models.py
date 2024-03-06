from django.db import models
from user.models import User

class Cafes(models.Model):
    CafeID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=50, null=False)
    Location = models.CharField(max_length=100)
    PhoneNumber = models.CharField(max_length=30)
    OperatingHour = models.CharField(max_length=50)
    Image = models.FileField(upload_to = 'cafe/', null=True)

    def __str__(self):
        return str(self.CafeID)


class CafeReviews(models.Model):
    CafeReviewID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    CafeID = models.ForeignKey(Cafes, on_delete=models.CASCADE)
    Rating = models.FloatField(max_length=10, null=True, default=0)
    Comment = models.CharField(max_length=200, null=False)
    Image = models.FileField(upload_to = 'cafereview/', null=True)
    Date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.Cafe_ReviewID)


class MenuItems(models.Model):
    MenuItemID = models.AutoField(primary_key=True)
    Item = models.CharField(max_length=100, null=False)
    Price = models.IntegerField(null=False)
    CafeID = models.ForeignKey(Cafes, on_delete=models.CASCADE)

    def __str__(self):
        return self.Item