from django.db import models

class Cafes(models.Model):
    CafeID = models.IntegerField(null=False, primary_key=True)
    Name = models.CharField(max_length=15, null=False)
    Location = models.CharField(max_length=100)
    PhoneNumber = models.IntegerField()
    OperatingHour = models.CharField(max_length=20)
    Image = models.FileField(upload_to = 'uploads/')

    def __str__(self):
        return self.CafeID


class CafeReviews(models.Model):
    Cafe_ReviewID = models.IntegerField(null=False, primary_key=True)
    UserID = models.IntegerField(null=False)
    CafeID = models.ForeignKey(Cafes, on_delete=models.CASCADE)
    Comment = models.CharField(max_length=200, null=False)
    Image = models.FileField(upload_to = 'uploads/')

    def __str__(self):
        return self.Cafe_ReviewID


class MenuItems(models.Model):
    MenuItemID = models.IntegerField(null=False, primary_key=True)
    Item = models.CharField(max_length=100, null=False)
    Price = models.IntegerField(null=False)
    CafeID = models.ForeignKey(Cafes, on_delete=models.CASCADE)

    def __str__(self):
        return self.MenuItemID

# Create your models here.
