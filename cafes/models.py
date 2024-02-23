from django.db import models

class Cafes(models.Model):
    CafeID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=15, null=False)
    Location = models.CharField(max_length=100)
    PhoneNumber = models.CharField(max_length=30)
    OperatingHour = models.CharField(max_length=50)
    Image = models.FileField(upload_to = 'uploads/')

    def __str__(self):
        return self.Name


class CafeReviews(models.Model):
    Cafe_ReviewID = models.AutoField(primary_key=True)
    UserID = models.IntegerField(null=False)
    CafeID = models.ForeignKey(Cafes, on_delete=models.CASCADE)
    Comment = models.CharField(max_length=200, null=False)
    Image = models.FileField(upload_to = 'uploads/')

    def __str__(self):
        return str(self.Cafe_ReviewID)


class MenuItems(models.Model):
    MenuItemID = models.AutoField(primary_key=True)
    Item = models.CharField(max_length=100, null=False)
    Price = models.IntegerField(null=False)
    CafeID = models.ForeignKey(Cafes, on_delete=models.CASCADE)

    def __str__(self):
        return self.Item

# Create your models here.
