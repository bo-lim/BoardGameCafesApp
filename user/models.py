from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
'''
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=3-50, unique=True, null=False, blank=False)
    userName = models.CharField(max_length=30)
    #password = 
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()
    USERID_FIELD = 'email'

class UserManager(BaseUserManager):
    def create_user(self, email, password, **kwargs):
        if not email:
            raise ValueError('Users must have an email address')
        
        user = self.model(
            email=email,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
'''