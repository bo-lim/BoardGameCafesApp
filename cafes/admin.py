from django.contrib import admin

from cafes.models import Cafes, CafeReviews, MenuItems

admin.site.register(Cafes)
admin.site.register(CafeReviews)
admin.site.register(MenuItems)
# Register your models here.
